import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(900);
const btn = page.locator(".cookie-banner button", { hasText: /accept/i });
if (await btn.count()) await btn.first().click().catch(() => {});
const r = await page.evaluate(() => {
  const g = (s) => { const e=document.querySelector(s); if(!e) return null; const b=e.getBoundingClientRect(); return {top:Math.round(b.top+scrollY),h:Math.round(b.height)}; };
  return { hero:g("section.stage"), why:g("#why"), where:g("#where"), care:g("#care"), ciGroup:g(".ci-group"), ciK:g(".ci-k"), journey:g("#journey"), ways:g("#ways"), doctor:g("#doctor"), doc2:g(".doc2"), faq:g("#faq"), book:g(".care-book"), footer:g(".site-footer"), pageH:Math.round(document.documentElement.scrollHeight) };
});
console.log(JSON.stringify(r,null,1));
await browser.close();
