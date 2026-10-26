import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (
    fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown"
  );
}

async function deliver(text: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(
      "[contact] RESEND_API_KEY not set; logging inquiry instead of emailing:\n" +
        text,
    );
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM_EMAIL ??
        `${SITE.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL ?? SITE.email],
      reply_to: replyTo,
      subject: "New website inquiry",
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export async function POST(req: Request) {
  const limited = rateLimit(`contact:${clientIp(req)}`, LIMIT, WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again in a few minutes.",
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: pretend success so bots learn nothing, and send nothing.
  if (
    typeof body === "object" &&
    body &&
    "website" in body &&
    (body as { website?: unknown }).website
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        fields: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const d = parsed.data;
  const text = [
    `Topic: ${d.topic}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    d.date ? `Preferred date: ${d.date}` : null,
    d.guests ? `Guests: ${d.guests}` : null,
    "",
    d.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    await deliver(text, d.email);
  } catch (err) {
    console.error(
      "[contact] delivery failed",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message just now. Please try again or call us.",
      },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
