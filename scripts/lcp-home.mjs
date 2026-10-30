// lcp-home.mjs — measures Home LCP with Playwright chromium (mobile 390x844),
// reports the LCP element and the median of N runs.
import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const RUNS = Number(process.env.LCP_RUNS || 3);

const browser = await chromium.launch();
const results = [];
for (let i = 0; i < RUNS; i++) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.addInitScript(() => {
    window.__lcp = [];
    new PerformanceObserver((list) => {
      window.__lcp.push(...list.getEntries());
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const lcp = await page.evaluate(() => {
    const e = window.__lcp.at(-1);
    return e
      ? {
          ms: Math.round(e.startTime),
          el: e.element
            ? `${e.element.tagName} ${e.element.src || e.element.className}`
            : "?",
        }
      : null;
  });
  results.push(lcp);
  console.log(`run ${i + 1}:`, JSON.stringify(lcp));
  await page.close();
}
await browser.close();
const sorted = results
  .filter(Boolean)
  .map((r) => r.ms)
  .sort((a, b) => a - b);
console.log(
  `median LCP: ${sorted[Math.floor(sorted.length / 2)]}ms · element: ${results[0]?.el}`,
);
