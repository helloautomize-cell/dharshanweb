import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + String(e).slice(0, 160)));
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const btn = page.locator(".cookie-banner button", { hasText: /accept/i });
if (await btn.count()) await btn.first().click().catch(() => {});

const before = await page.evaluate(() => ({
  front: [...document.querySelectorAll(".arch")].findIndex(a => a.classList.contains("is-front")),
}));
// click the second dot to swap
await page.locator(".fan-dot").nth(1).click();
await page.waitForTimeout(1400);
const after = await page.evaluate(() => ({
  front: [...document.querySelectorAll(".arch")].findIndex(a => a.classList.contains("is-front")),
}));

// header solidity: scroll to a light section and a dark section, check what's under the nav
async function headerCheck(scrollTo) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollTo);
  await page.waitForTimeout(400);
  return await page.evaluate(() => {
    const nav = document.querySelector(".site-nav");
    const r = nav.getBoundingClientRect();
    const cs = getComputedStyle(nav);
    const el = document.elementFromPoint(innerWidth / 2, r.top + r.height + 4);
    return {
      navBg: cs.backgroundColor,
      top: Math.round(r.top), h: Math.round(r.height),
      belowEl: el ? el.tagName + "." + String(el.className).slice(0, 40) : null,
    };
  });
}
const hdrHero = await headerCheck(100);      // over night hero
const hdrLight = await headerCheck(2500);    // over a light section
const hdrDark = await headerCheck(12000);    // over doctor/visit area
console.log(JSON.stringify({ before, after, hdrHero, hdrLight, hdrDark, errors }, null, 2));
await browser.close();
