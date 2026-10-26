import type { Metadata } from "next";
import Link from "next/link";
import { MENU, formatPrice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Coffee, bakery and brunch at Marlowe Lane Café, a fictional sample business.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow">Menu</p>
      <h1 className="mt-3 text-5xl">Coffee, bakery & brunch</h1>
      <p className="mt-4 text-roast">
        Prices in USD (sample). Ask us about allergens; we&rsquo;ll gladly walk
        you through them.
      </p>
      {MENU.map((s) => (
        <section key={s.id} aria-labelledby={`${s.id}-h`} className="mt-14">
          <h2 id={`${s.id}-h`} className="text-3xl">
            {s.title}
          </h2>
          <p className="mt-2 text-roast">{s.blurb}</p>
          <ul className="mt-6 divide-y divide-sand border-y border-sand">
            {s.items.map((i) => (
              <li
                key={i.name}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <span>
                  <span className="block text-lg font-semibold">{i.name}</span>
                  <span className="block text-roast">{i.note}</span>
                </span>
                <span className="text-lg font-semibold tabular-nums">
                  {formatPrice(i.price)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Link href="/#contact" className="btn btn-primary mt-14">
        Book a table
      </Link>
    </div>
  );
}
