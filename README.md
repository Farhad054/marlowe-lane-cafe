# Marlowe Lane Café — sample marketing site

> **Sample project.** Marlowe Lane Café is a fictional business made for a freelance portfolio. The address, phone number, menu and prices are invented. No real client work is shown.

A polished, mobile-first marketing site for a small neighbourhood café: hero with a clear call to action, menu, hours, gallery, location map, FAQ and a booking-inquiry form.

**Live:** _pending first deploy_ (see [Deployment](#deployment))

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · zod · Resend (optional) · Vitest · Playwright + axe-core

## Features

- Pages: `/` (single-page marketing site), `/menu`, `/credits`
- Contact / booking-inquiry form with:
  - client-side validation and identical server-side validation (one shared zod schema)
  - hidden honeypot field (bots get a silent fake success, no email is sent)
  - per-IP rate limiting (5 requests / 10 min, in-memory; swap for Redis/Upstash for strict limits on serverless)
  - clear idle / sending / success / error states with focus management and `aria-live` announcements
  - email via [Resend](https://resend.com) when `RESEND_API_KEY` is set, otherwise the inquiry is logged on the server and the visitor still sees success
- SEO: per-page `<title>` and description, Open Graph image, `sitemap.xml`, `robots.txt`, favicon, JSON-LD (`CafeOrCoffeeShop`, `FAQPage`)
- Accessibility: semantic landmarks, skip link, visible focus states, keyboard-operable nav and FAQ, reduced-motion support
- Map: OpenStreetMap embed and link, no API key

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: add a Resend key
npm run dev                  # http://localhost:3000
```

| Script                               | What it does                                                       |
| ------------------------------------ | ------------------------------------------------------------------ |
| `npm run lint`                       | ESLint                                                             |
| `npm run typecheck`                  | `tsc --noEmit`                                                     |
| `npm test`                           | Vitest unit tests (schema, rate limiter)                           |
| `npm run build`                      | Production build                                                   |
| `npm run test:e2e`                   | Playwright at 390px and 1440px, incl. axe                          |
| `sh scripts/lighthouse.sh`           | Lighthouse mobile on every page (needs `npm run start -- -p 3417`) |
| `node scripts/screenshots.mjs <dir>` | Full-page screenshots at 390px and 1440px                          |

