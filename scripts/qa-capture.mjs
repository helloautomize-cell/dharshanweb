// Captures THE PAGES at four widths into qa/phase-7/<set>/.
// Usage: node scripts/qa-capture.mjs before|after
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const set = process.argv[2] ?? "before";
const dir = `qa/phase-7/${set}`;
await mkdir(dir, { recursive: true });

const PAGES = [
  "/",
  "/about/",
  "/doctors/",
  "/dr-dharshan-n-a/",
  "/dr-selina-kh/",
  "/care/",
  "/pain-and-spine/",
  "/neuro-rehabilitation/",
  "/joints-and-sports/",
  "/childrens-rehabilitation/",
  "/older-adults/",
  "/pain-and-spine/back-pain/",
  "/neuro-rehabilitation/stroke/",
  "/joints-and-sports/prp-and-prolotherapy/",
  "/childrens-rehabilitation/cerebral-palsy/",
  "/conditions/",
  "/video-consultation/",
  "/plan-your-visit/",
  "/contact/",
  "/faqs/",
  "/health-library/",
  "/health-library/what-is-a-physiatrist/",
  "/thank-you/",
  "/privacy-policy/",
  "/this-page-does-not-exist/",
];
const WIDTHS = [390, 768, 1024, 1440];
const slug = (u) =>
  u === "/" ? "home" : u.replaceAll("/", "-").replace(/^-|-$/g, "");

const browser = await chromium.launch();
for (const width of WIDTHS) {
  const page = await browser.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
    isMobile: width < 768,
    hasTouch: width < 768,
    reducedMotion: "reduce",
  });
  for (const route of PAGES) {
    const res = await page
      .goto(`http://127.0.0.1:3000${route}`, { waitUntil: "load" })
      .catch(() => null);
    if (!res || res.status() >= 500) {
      console.log(`${route} at ${width}: HTTP ${res?.status()}`);
      continue;
    }
    await page.waitForTimeout(700);
    await page.screenshot({
      path: `${dir}/${slug(route)}-${width}.png`,
      fullPage: true,
    });
    process.stdout.write(".");
  }
  await page.close();
  console.log(` ${width} done`);
}
await browser.close();
