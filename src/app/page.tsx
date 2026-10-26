import {
  Contact,
  Faq,
  Gallery,
  Hero,
  Hours,
  MenuPreview,
  Story,
  Visit,
} from "@/components/sections";
import { FAQ, HOURS, SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CafeOrCoffeeShop",
      name: SITE.name,
      description: SITE.description,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address[0],
        addressLocality: SITE.address[1],
      },
      openingHours: HOURS.map((h) => `${h.days}: ${h.open}`),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Story />
      <MenuPreview />
      <Hours />
      <Gallery />
      <Visit />
      <Faq />
      <Contact />
    </>
  );
}
