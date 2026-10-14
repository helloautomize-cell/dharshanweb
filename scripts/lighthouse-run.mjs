// Runs Lighthouse mobile against a route N times and reports medians.
// Usage: node scripts/lighthouse-run.mjs <route> [runs]
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const arg = process.argv[2] ?? "index";
const route = arg === "index" ? "/" : arg.startsWith("/") ? arg : `/${arg}/`;
const runs = Number(process.argv[3] ?? 3);
const slug =
  route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-|-$/g, "");
await mkdir("artifacts/lighthouse", { recursive: true });

const browser = await chromium.launch({
  args: ["--remote-debugging-port=9231"],
});
const rows = [];
try {
  for (let i = 1; i <= runs; i++) {
    const result = await lighthouse(`http://127.0.0.1:3000${route}`, {
      port: 9231,
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      logLevel: "error",
    });
    await writeFile(`artifacts/lighthouse/${slug}-${i}.html`, result.report[1]);
    const { audits, categories } = result.lhr;
    rows.push({
      run: i,
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
      lcpMs: audits["largest-contentful-paint"].numericValue,
      cls: audits["cumulative-layout-shift"].numericValue,
      tbtMs: audits["total-blocking-time"].numericValue,
    });
  }
} finally {
  await browser.close();
}
const median = (key) =>
  rows.map((r) => r[key]).sort((a, b) => a - b)[Math.floor(rows.length / 2)];
const out = {
  route,
  runs: rows,
  medians: {
    performance: median("performance"),
    accessibility: median("accessibility"),
    bestPractices: median("bestPractices"),
    seo: median("seo"),
    lcpMs: Math.round(median("lcpMs")),
    cls: median("cls"),
    tbtMs: Math.round(median("tbtMs")),
  },
};
await writeFile(
  `artifacts/lighthouse/${slug}-median.json`,
  JSON.stringify(out, null, 2),
);
console.log(JSON.stringify(out.medians, null, 2));
