import type { Metadata } from "next";
import { CREDITS } from "@/lib/credits";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Image credits and licenses for the Marlowe Lane Café sample project.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Sample project</p>
      <h1 className="mt-3 text-5xl">Credits</h1>
      <p className="mt-4">
        Marlowe Lane Café is a fictional business made for a portfolio. All
        photos are CC0 (public domain dedication) from Wikimedia Commons.
        Attribution is not required but is given here anyway.
      </p>
      <ul className="mt-8 divide-y divide-sand border-y border-sand">
        {CREDITS.map((c) => (
          <li key={c.file} className="py-4">
            <span className="block font-semibold">{c.file}</span>
            <span className="block text-roast">
              {c.artist}, {c.license}.{" "}
              <a
                className="underline underline-offset-4"
                href={c.page}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
