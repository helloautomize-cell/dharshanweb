import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [w, h] of [[1440, 900], [1440, 800], [1024, 768]]) {
  await page.setViewportSize({ width: w, height: h });
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  const banner = page.locator(".cookie-banner");
  if (await banner.isVisible().catch(() => false))
    await page.getByRole("button", { name: "Essential only" }).click();
  const m = await page.evaluate(() => {
    const pin = document.querySelector(".jr-pin");
    const svg = pin?.querySelector("svg");
    const verts = [...document.querySelectorAll("#jverts .v")].map((v) => {
      const r = v.getBoundingClientRect();
      return { label: v.textContent, top: Math.round(r.top), bottom: Math.round(r.bottom) };
    });
    return {
      pin: pin && { top: Math.round(pin.getBoundingClientRect().top), height: Math.round(pin.getBoundingClientRect().height), bottom: Math.round(pin.getBoundingClientRect().bottom) },
      svg: svg && { top: Math.round(svg.getBoundingClientRect().top), height: Math.round(svg.getBoundingClientRect().height), bottom: Math.round(svg.getBoundingClientRect().bottom), width: Math.round(svg.getBoundingClientRect().width) },
      verts,
      vh: innerHeight,
    };
  });
  console.log(`=== ${w}x${h} ===`);
  console.log("pin:", JSON.stringify(m.pin), "svg:", JSON.stringify(m.svg));
  console.log("verts:", JSON.stringify(m.verts));
}
await browser.close();
