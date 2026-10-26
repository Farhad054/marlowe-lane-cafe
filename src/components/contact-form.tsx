"use client";

import { useRef, useState } from "react";
import {
  TOPICS,
  contactSchema,
  fieldErrors,
  type FieldErrors,
} from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const fe = fieldErrors(parsed.error);
      setErrors(fe);
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      const first = Object.keys(fe)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        formRef.current?.reset();
        return;
      }
      setErrors(data.fields ?? {});
      setMessage(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-moss/40 bg-white p-8 text-center"
      >
        <p className="font-display text-2xl text-moss">
          Thank you, we got your inquiry.
        </p>
        <p className="mt-2">
          We usually reply within one working day. This is a sample site, so no
          real message was sent to a person.
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-6 text-espresso"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  const field = (name: keyof FieldErrors) => ({
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: "field",
  });
  const err = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={`${name}-error`} className="field-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="mb-1 block font-semibold">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          required
          {...field("name")}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          {...field("email")}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor="topic" className="mb-1 block font-semibold">
          What&rsquo;s this about?
        </label>
        <select id="topic" defaultValue={TOPICS[0]} {...field("topic")}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err("topic")}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block font-semibold">
          Phone <span className="font-normal text-roast">(optional)</span>
        </label>
        <input id="phone" type="tel" autoComplete="tel" {...field("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="date" className="mb-1 block font-semibold">
          Preferred date{" "}
          <span className="font-normal text-roast">(optional)</span>
        </label>
        <input id="date" type="date" min={today} {...field("date")} />
        {err("date")}
      </div>
      <div>
        <label htmlFor="guests" className="mb-1 block font-semibold">
          Guests <span className="font-normal text-roast">(optional)</span>
        </label>
        <input
          id="guests"
          type="number"
          inputMode="numeric"
          min={1}
          max={40}
          {...field("guests")}
        />
        {err("guests")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block font-semibold">
          Message
        </label>
        <textarea id="message" rows={5} required {...field("message")} />
        {err("message")}
      </div>
      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <div role="alert" aria-live="assertive" className="mt-3 min-h-6">
          {status === "error" && (
            <p className="field-error !mt-0 font-semibold">{message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
