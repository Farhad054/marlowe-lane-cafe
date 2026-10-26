// Usage: BASE_URL=http://localhost:3417 node scripts/screenshots.mjs <outDir>
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3417";
const out = process.argv[2] ?? "screenshots";
mkdirSync(out, { recursive: true });
const sizes = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};
const pages = { home: "/", menu: "/menu" };

const browser = await chromium.launch();
for (const [sname, viewport] of Object.entries(sizes)) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: sname === "mobile",
  });
  const page = await ctx.newPage();
  const problems = [];
  page.on("console", (m) => m.type() === "error" && problems.push(m.text()));
  page.on("requestfailed", (r) => problems.push(`failed: ${r.url()}`));
  for (const [pname, path] of Object.entries(pages)) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // trigger lazy images
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${out}/${pname}-${sname}-full.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `${out}/${pname}-${sname}-fold.png` });
  }
  console.log(sname, "problems:", problems.length ? problems : "none");
  await ctx.close();
}
await browser.close();
