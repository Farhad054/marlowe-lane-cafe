import Image from "next/image";
import Link from "next/link";
import { FAQ, GALLERY, HOURS, MENU, SITE, formatPrice } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-espresso text-cream">
      <Image
        src="/images/latte-pour.jpg"
        alt="Milk being poured into a cup of coffee to make latte art"
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso via-espresso/75 to-espresso/20 sm:via-espresso/60" />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32 lg:py-40">
        <p className="eyebrow !text-crema">
          Neighbourhood café · Riverside District
        </p>
        <h1 className="mt-4 max-w-2xl text-5xl sm:text-6xl lg:text-7xl">
          {SITE.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream/90">
          Single-origin coffee, pastries laminated by hand and a brunch menu
          that takes its time. Pull up a chair.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/#contact" className="btn btn-primary focus-light">
            Book a table
          </Link>
          <Link href="/menu" className="btn btn-ghost focus-light">
            See the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16">
      <div>
        <p className="eyebrow">Our approach</p>
        <h2 className="mt-3 text-4xl">Small batches, no shortcuts.</h2>
        <p className="mt-5">
          We buy coffee in small lots from a partner roaster and change the
          pour-over every few weeks. Pastries are laminated over three days and
          baked before we open. It is a small menu, done properly.
        </p>
        <p className="mt-4">
          The room is warm, the chairs are comfortable, and nobody minds if you
          stay for a second cup.
        </p>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rotate-1">
        <Image
          src="/images/beans.jpg"
          alt="Close-up of freshly roasted coffee beans"
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function MenuPreview() {
  return (
    <section id="menu" className="bg-paper py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">Menu</p>
        <h2 className="mt-3 text-4xl">What&rsquo;s good right now</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {MENU.map((s) => (
            <div key={s.id}>
              <h3 className="text-2xl">{s.title}</h3>
              <p className="mt-2 text-roast">{s.blurb}</p>
              <ul className="mt-6 divide-y divide-sand">
                {s.items.slice(0, 4).map((i) => (
                  <li
                    key={i.name}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span>
                      <span className="block font-semibold">{i.name}</span>
                      <span className="block text-sm text-roast">{i.note}</span>
                    </span>
                    <span className="font-semibold tabular-nums">
                      {formatPrice(i.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href="/menu" className="btn btn-primary mt-12">
          View the full menu
        </Link>
      </div>
    </section>
  );
}

export function Hours() {
  return (
    <section id="hours" className="on-dark bg-moss text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="eyebrow !text-cream">Opening hours</p>
          <h2 className="mt-3 text-4xl">Open every day.</h2>
          <dl className="mt-8 divide-y divide-cream/25 border-y border-cream/25">
            {HOURS.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 py-4">
                <dt>{h.days}</dt>
                <dd className="font-semibold tabular-nums">{h.open}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="self-center rounded-2xl bg-espresso/30 p-7">
          <h3 className="text-2xl">Good to know</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Last orders are 15 minutes before closing.</li>
            <li>Groups of five or more: please send a booking inquiry.</li>
            <li>Card and contactless only; we don&rsquo;t take cash.</li>
            <li>Weekday brunch ends at 11:30 am, weekend brunch at 2 pm.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-20">
      <p className="eyebrow">Gallery</p>
      <h2 className="mt-3 text-4xl">A look inside</h2>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:gap-4">
        {GALLERY.map((g, i) => (
          <figure
            key={g.src}
            className={`relative overflow-hidden rounded-2xl bg-sand ${g.span ?? ""} ${i === 0 ? "col-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-square"}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes={
                i === 0
                  ? "(min-width: 640px) 50vw, 100vw"
                  : "(min-width: 640px) 25vw, 50vw"
              }
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Visit() {
  const { lat, lon } = SITE.map;
  const d = 0.006;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
  const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;
  return (
    <section id="visit" className="bg-paper py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="eyebrow">Visit</p>
          <h2 className="mt-3 text-4xl">Find us on the lane.</h2>
          <address className="mt-6 text-lg not-italic">
            {SITE.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <p className="mt-4">
            Two minutes from the riverside tram stop. Bike racks out front,
            step-free entrance.
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6"
          >
            Open in OpenStreetMap
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="mt-4 text-sm text-roast">
            Sample project: the address is fictional and the map pin is
            illustrative.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-sand md:col-span-3">
          <iframe
            title="Map showing the café's neighbourhood"
            src={embed}
            loading="lazy"
            className="h-80 w-full md:h-full md:min-h-96"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <p className="eyebrow">FAQ</p>
      <h2 className="mt-3 text-4xl">Good questions</h2>
      <div className="mt-8 divide-y divide-sand border-y border-sand">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="text-2xl text-clay transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-roast">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-sand py-20">
      <div className="mx-auto max-w-3xl px-5">
        <p className="eyebrow">Booking & inquiries</p>
        <h2 className="mt-3 text-4xl">Reserve a table or ask us anything.</h2>
        <p className="mt-4 mb-8">
          Send us a few details and we&rsquo;ll confirm by email. For same-day
          seating just walk in.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
