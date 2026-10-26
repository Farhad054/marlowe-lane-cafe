import Link from "next/link";
import { HOURS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark bg-espresso text-cream/85">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-cream">{SITE.name}</p>
          <p className="mt-2 max-w-xs">{SITE.tagline}</p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-crema">
            Find us
          </h2>
          <address className="mt-3 not-italic">
            {SITE.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <a
              className="focus-light mt-2 block underline underline-offset-4"
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
            >
              {SITE.phone}
            </a>
            <a
              className="focus-light block underline underline-offset-4"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>
          </address>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-crema">
            Hours
          </h2>
          <ul className="mt-3 space-y-1">
            {HOURS.map((h) => (
              <li key={h.days}>
                {h.days}: {h.open}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-cream/80">
          <strong className="text-cream">Sample project.</strong> {SITE.name} is
          a fictional business created for a portfolio. Photos are CC0 from
          Wikimedia Commons; see{" "}
          <Link
            className="focus-light underline underline-offset-4"
            href="/credits"
          >
            credits
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
