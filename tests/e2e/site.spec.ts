import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

function watch(page: Page) {
  const problems: string[] = [];
  page.on(
    "console",
    (m) => m.type() === "error" && problems.push(`console: ${m.text()}`),
  );
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (r) =>
    problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`),
  );
  page.on(
    "response",
    (r) => r.status() >= 400 && problems.push(`http ${r.status()}: ${r.url()}`),
  );
  return problems;
}

const PAGES = ["/", "/menu", "/credits"];

for (const path of PAGES) {
  test(`${path}: no console errors or failed requests, no axe violations`, async ({
    page,
  }) => {
    const problems = watch(page);
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`,
      ),
    ).toEqual([]);
    expect(problems).toEqual([]);
  });
}

test("home exposes SEO essentials", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Marlowe Lane Café/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /.{50,}/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/icon.svg")).status()).toBe(200);
});

test("footer labels the site as a sample project", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("contentinfo")).toContainText("Sample project");
});

test("navigation works on this viewport", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "FAQ" })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "FAQ" })
      .click();
  }
  await expect(page).toHaveURL(/#faq$/);
  await expect(
    page.getByRole("heading", { name: "Good questions" }),
  ).toBeInViewport();
});

test("no horizontal scroll", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test.describe("contact form", () => {
  test("shows client-side validation errors and focuses the first", async ({
    page,
  }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByLabel("Name")).toBeFocused();
    await expect(page.getByText("Tell us a little more")).toBeVisible();
  });

  test("submits successfully", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByLabel("Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page
      .getByLabel("Message")
      .fill("Booking for six on Saturday morning.");
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(
      page.getByText("Thank you, we got your inquiry."),
    ).toBeVisible();
  });

  test("shows a server error state when the API fails", async ({ page }) => {
    await page.route("**/api/contact", (r) =>
      r.fulfill({
        status: 502,
        json: { ok: false, error: "We couldn't send your message just now." },
      }),
    );
    await page.goto("/#contact");
    await page.getByLabel("Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    await page
      .getByLabel("Message")
      .fill("Booking for six on Saturday morning.");
    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.locator("form [role=alert]")).toContainText(
      "couldn't send",
    );
  });
});

test.describe("contact API", () => {
  const body = {
    name: "API Test",
    email: "api@example.com",
    topic: "General question",
    message: "Hello from a test request.",
  };

  test("rejects invalid payloads with field errors (422)", async ({
    request,
  }) => {
    const res = await request.post("/api/contact", {
      data: { ...body, email: "bad" },
      headers: { "x-forwarded-for": "10.0.0.1" },
    });
    expect(res.status()).toBe(422);
    expect((await res.json()).fields.email).toBeTruthy();
  });

  test("honeypot gets a silent success", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...body, website: "http://spam.example" },
      headers: { "x-forwarded-for": "10.0.0.2" },
    });
    expect(res.status()).toBe(200);
  });

  test("rate limits after 5 requests per IP (429)", async ({ request }) => {
    const headers = {
      "x-forwarded-for": `10.9.${Date.now() % 250}.${Math.floor(Math.random() * 250)}`,
    };
    const codes: number[] = [];
    for (let i = 0; i < 7; i++)
      codes.push(
        (await request.post("/api/contact", { data: body, headers })).status(),
      );
    expect(codes.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(codes.slice(5)).toEqual([429, 429]);
  });
});
