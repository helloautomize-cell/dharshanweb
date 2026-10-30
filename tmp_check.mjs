import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
const b = page.getByRole("button", { name: "Essential only" });
if (await b.isVisible().catch(() => false)) await b.click();
const m = await page.evaluate(() => {
  const card = document.querySelector(".care-book-card");
  const sec = document.querySelector(".care-book");
  const footer = document.querySelector(".site-footer");
  const firstH = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")][0];
  return {
    avatars: [...card.querySelectorAll("img")].map((i) => ({ nat: i.naturalWidth, rend: Math.round(i.getBoundingClientRect().width), dpr: devicePixelRatio })),
    cardBottom: Math.round(card.getBoundingClientRect().bottom),
    secBottom: Math.round(sec.getBoundingClientRect().bottom),
    footerTop: Math.round(footer.getBoundingClientRect().top),
    firstHeading: firstH ? { tag: firstH.tagName, text: firstH.textContent.slice(0, 40), cls: firstH.className, inEl: firstH.closest("header,nav,main,footer")?.tagName } : null,
  };
});
console.log(JSON.stringify(m, null, 1));
await browser.close();
