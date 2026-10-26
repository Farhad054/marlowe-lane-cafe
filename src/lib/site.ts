export const SITE = {
  name: "Marlowe Lane Café",
  short: "Marlowe Lane",
  tagline: "Slow mornings, honest coffee.",
  description:
    "A neighbourhood café serving single-origin coffee, laminated pastries and all-day brunch. Sample project: a fictional business.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@marlowelane.example",
  phone: "+1 (555) 010-0142",
  address: ["21 Marlowe Lane", "Riverside District"],
  // Neutral coordinates for the illustrative map embed
  map: { lat: 45.5231, lon: -122.6765 },
} as const;

export const NAV = [
  { href: "/#menu", label: "Menu" },
  { href: "/#hours", label: "Hours" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Visit" },
  { href: "/#faq", label: "FAQ" },
] as const;

export type MenuItem = { name: string; note: string; price: number };
export type MenuSection = {
  id: string;
  title: string;
  blurb: string;
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    id: "coffee",
    title: "Coffee",
    blurb:
      "Roasted in small batches by our partner roaster. Oat, soy or whole milk, same price.",
    items: [
      { name: "Espresso", note: "Double shot, bright and syrupy", price: 3.0 },
      { name: "Flat white", note: "Silky microfoam, 5 oz", price: 4.5 },
      { name: "Cappuccino", note: "Cocoa-dusted, 6 oz", price: 4.5 },
      { name: "Latte", note: "Mellow and milky, 8 oz", price: 4.75 },
      {
        name: "Pour-over",
        note: "Rotating single origin, brewed to order",
        price: 5.5,
      },
      { name: "Cold brew", note: "Steeped 18 hours, over ice", price: 4.75 },
    ],
  },
  {
    id: "bakery",
    title: "Bakery",
    blurb: "Baked each morning. When it's gone, it's gone.",
    items: [
      {
        name: "Butter croissant",
        note: "Three-day laminated dough",
        price: 3.75,
      },
      {
        name: "Pistachio croissant",
        note: "Pistachio cream, crushed nuts",
        price: 5.25,
      },
      { name: "Morning bun", note: "Orange zest, cinnamon sugar", price: 4.5 },
      {
        name: "Raspberry layer cake",
        note: "By the slice, vanilla buttercream",
        price: 6.25,
      },
      { name: "Seeded sourdough loaf", note: "Whole loaf, 650 g", price: 8.0 },
    ],
  },
  {
    id: "brunch",
    title: "Brunch",
    blurb: "Served until 2 pm on weekends, until 11:30 am on weekdays.",
    items: [
      {
        name: "Smashed avocado toast",
        note: "Sourdough, chilli flakes, lime",
        price: 11.5,
      },
      {
        name: "Soft scramble",
        note: "Chives, butter, toasted brioche",
        price: 10.5,
      },
      {
        name: "Shakshuka",
        note: "Baked eggs, peppers, feta, bread",
        price: 12.5,
      },
      {
        name: "Granola bowl",
        note: "Yoghurt, roasted fruit, honey",
        price: 9.0,
      },
    ],
  },
];

export const HOURS: { days: string; open: string }[] = [
  { days: "Monday – Friday", open: "7:00 am – 4:00 pm" },
  { days: "Saturday", open: "8:00 am – 5:00 pm" },
  { days: "Sunday", open: "8:00 am – 3:00 pm" },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need to book a table?",
    a: "Walk-ins are always welcome. For groups of five or more, or for weekend brunch, send a booking inquiry and we'll confirm by email.",
  },
  {
    q: "Do you have vegan and gluten-free options?",
    a: "Yes. Oat and soy milk are always available at no extra charge, and several bakery and brunch items are vegan. Gluten-free items are made in a kitchen that also handles wheat, so we can't guarantee zero cross-contact.",
  },
  {
    q: "Is the café dog-friendly?",
    a: "Well-behaved dogs are welcome on the front patio. Service animals are welcome everywhere.",
  },
  {
    q: "Can I hire the café for a private event?",
    a: "Evenings after 5 pm on weekdays are available for small private events. Choose “Private event” in the form below and tell us what you have in mind.",
  },
  {
    q: "Is there step-free access?",
    a: "Yes. The entrance and main seating area are step-free, and there is an accessible restroom.",
  },
];

export const GALLERY: {
  src: string;
  alt: string;
  w: number;
  h: number;
  span?: string;
}[] = [
  {
    src: "/images/interior.jpg",
    alt: "Brick-vaulted café interior with wooden tables and chairs",
    w: 1920,
    h: 1446,
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/pistachio-croissant.jpg",
    alt: "Pistachio croissant on a blue ceramic plate",
    w: 1280,
    h: 964,
  },
  {
    src: "/images/pour-over.jpg",
    alt: "Barista pouring hot water over a pour-over coffee",
    w: 1280,
    h: 852,
  },
  {
    src: "/images/cake-slice.jpg",
    alt: "Slice of raspberry layer cake on a metal plate",
    w: 1280,
    h: 964,
  },
  {
    src: "/images/swirl-pastry.jpg",
    alt: "Swirled morning bun beside a cup of coffee",
    w: 1280,
    h: 964,
  },
];

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
