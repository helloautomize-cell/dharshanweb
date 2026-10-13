import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("artifacts/lighthouse", { recursive: true });
const browser = await chromium.launch({
  args: ["--remote-debugging-port=9230"],
});
try {
  const result = await lighthouse("http://127.0.0.1:3000/styleguide/", {
    port: 9230,
    output: ["json", "html"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    logLevel: "error",
  });
  await writeFile("artifacts/lighthouse/styleguide.json", result.report[0]);
  await writeFile("artifacts/lighthouse/styleguide.html", result.report[1]);
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([name, category]) => [
      name,
      category.score * 100,
    ]),
  );
  const failed = Object.entries(result.lhr.audits)
    .filter(([, audit]) => audit.score !== null && audit.score < 1)
    .map(([name, audit]) => ({
      name,
      title: audit.title,
      score: audit.score,
      details: audit.details,
    }));
  await writeFile(
    "artifacts/lighthouse/summary.json",
    JSON.stringify(
      {
        scores,
        metrics: {
          lcpMs: result.lhr.audits["largest-contentful-paint"].numericValue,
          cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
          tbtMs: result.lhr.audits["total-blocking-time"].numericValue,
        },
        failed,
      },
      null,
      2,
    ),
  );
  process.stdout.write(JSON.stringify(scores, null, 2) + "\n");
} finally {
  await browser.close();
}
