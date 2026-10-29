# Results

Measured October 2026 on the production deployment (https://marlowe-lane-cafe.vercel.app).

## PageSpeed Insights (mobile, home page)

Performance: **98**

## Lighthouse 12 (mobile, production build, `sh scripts/lighthouse.sh`)

| Page       | Performance | Accessibility | Best Practices | SEO |
| ---------- | ----------- | ------------- | -------------- | --- |
| `/`        | 91–95       | 100           | 100            | 100 |
| `/menu`    | 91          | 100           | 100            | 100 |
| `/credits` | 94          | 100           | 100            | 100 |

CLS is 0 on every page. The hero image is preloaded with `fetchpriority="high"`, which cut mobile LCP from about 3.2 s to about 2.4 s in local runs.

## Tests

- Unit (Vitest): 9 passed (contact schema, rate limiter)
- E2E (Playwright, 390px and 1440px): 26 tests covering navigation, the contact form (validation, honeypot, rate limit, success state), axe accessibility checks with zero violations, and no console errors or failed requests
- Lint and typecheck: clean
