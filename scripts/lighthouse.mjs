import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const ROUTES = [
  "/",
  "/pain-and-spine/",
  "/pain-and-spine/back-pain/",
  "/dr-dharshan-n-a/",
  "/contact/",
  "/guides/what-is-a-physiatrist/",
];
const RUNS = Number(process.env.LH_RUNS || 3);
const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";

await mkdir("artifacts/lighthouse", { recursive: true });
const browser = await chromium.launch({
  args: ["--remote-debugging-port=9230"],
});

const median = (nums) => {
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};
const slug = (r) =>
  r === "/" ? "home" : r.replace(/^\/|\/$/g, "").replaceAll("/", "-");

try {
  const summary = {};
  for (const route of ROUTES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const result = await lighthouse(`${BASE}${route}`, {
        port: 9230,
        output: ["json", "html"],
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        logLevel: "error",
        formFactor: "mobile",
        screenEmulation: { mobile: true },
      });
      runs.push(result);
    }
    const med = median(
      runs.map((r) => r.lhr.categories.performance.score * 100),
    );
    const pick = runs.reduce((a, b) =>
      Math.abs(b.lhr.categories.performance.score * 100 - med) <
      Math.abs(a.lhr.categories.performance.score * 100 - med)
        ? b
        : a,
    );
    const name = slug(route);
    await writeFile(`artifacts/lighthouse/${name}.json`, pick.report[0]);
    await writeFile(`artifacts/lighthouse/${name}.html`, pick.report[1]);
    summary[route] = {
      performance: median(
        runs.map((r) => r.lhr.categories.performance.score * 100),
      ),
      accessibility: median(
        runs.map((r) => r.lhr.categories.accessibility.score * 100),
      ),
      bestPractices: median(
        runs.map((r) => r.lhr.categories["best-practices"].score * 100),
      ),
      seo: median(runs.map((r) => r.lhr.categories.seo.score * 100)),
      lcpMs: Math.round(
        median(
          runs.map(
            (r) => r.lhr.audits["largest-contentful-paint"].numericValue,
          ),
        ),
      ),
      cls: Number(
        median(
          runs.map((r) => r.lhr.audits["cumulative-layout-shift"].numericValue),
        ).toFixed(3),
      ),
      runs: runs.map((r) =>
        Math.round(r.lhr.categories.performance.score * 100),
      ),
    };
    console.log(
      `${route}  perf:${summary[route].performance} a11y:${summary[route].accessibility} bp:${summary[route].bestPractices} seo:${summary[route].seo} lcp:${summary[route].lcpMs}ms cls:${summary[route].cls} runs:[${summary[route].runs}]`,
    );
  }
  await writeFile(
    "artifacts/lighthouse/summary.json",
    JSON.stringify(summary, null, 2),
  );
} finally {
  await browser.close();
}
