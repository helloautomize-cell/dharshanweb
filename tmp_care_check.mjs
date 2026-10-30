import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
const btn = page.locator(".cookie-banner button", { hasText: /accept/i });
if (await btn.count()) await btn.first().click().catch(() => {});
await page.locator("#care").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const vis = await page.evaluate(() => {
  const g = (s) => { const e=document.querySelector(s); const r=e?.getBoundingClientRect(); const cs=e?getComputedStyle(e):null; return e?{h:Math.round(r.height),op:cs.opacity,disp:cs.display}:null; };
  return {
    acc0: g(".ci-acc"),
    k0: g(".ci-k"),
    row0: g(".ci-row"),
    groups: [...document.querySelectorAll(".ci-group")].map(x => ({
      id: x.id, in: x.classList.contains("in"),
      kOp: getComputedStyle(x.querySelector(".ci-k")).opacity,
    })),
  };
});
await page.locator("#care").screenshot({ path: "tmp-view/care-390.png" });
console.log(JSON.stringify(vis, null, 2));
await browser.close();
