import { chromium } from "@playwright/test";
import { mkdir, access } from "node:fs/promises";
import sharp from "sharp";

await mkdir("artifacts/reference", { recursive: true });
const browser = await chromium.launch();
for (const width of [1440, 390]) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  await page.route("**/rehabify-design-v3.html", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        "content-type": "text/html; charset=utf-8",
      },
    });
  });
  await page.goto("http://127.0.0.1:4174/rehabify-design-v3.html", {
    waitUntil: "networkidle",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.screenshot({
    path: `artifacts/reference/full-${width}.png`,
    fullPage: true,
  });
  for (const [name, selector] of [
    ["hero", ".hero"],
    ["body-map", ".bm"],
    ["bento", ".bento"],
    ["doctors", ".doc2"],
  ]) {
    await page
      .locator(selector)
      .screenshot({ path: `artifacts/reference/${name}-${width}.png` });
  }
  await page.close();
}
await browser.close();
await mkdir("artifacts/comparisons", { recursive: true });
for (const width of [1440, 390])
  for (const name of ["hero", "body-map", "bento", "doctors"]) {
    const reference = `artifacts/reference/${name}-${width}.png`;
    const implementation = `artifacts/styleguide/${name}-${width}.png`;
    try {
      await access(implementation);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    const left = await sharp(reference)
      .resize({ width, withoutEnlargement: true })
      .png()
      .toBuffer({ resolveWithObject: true });
    const right = await sharp(implementation)
      .resize({ width, withoutEnlargement: true })
      .png()
      .toBuffer({ resolveWithObject: true });
    await sharp({
      create: {
        width: width * 2,
        height: Math.max(left.info.height, right.info.height),
        channels: 4,
        background: "#F5F8FA",
      },
    })
      .composite([
        { input: left.data, left: 0, top: 0 },
        { input: right.data, left: width, top: 0 },
      ])
      .png()
      .toFile(`artifacts/comparisons/${name}-${width}.png`);
  }
