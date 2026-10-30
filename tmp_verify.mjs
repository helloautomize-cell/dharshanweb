import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const BASE = "http://127.0.0.1:3000";
await mkdir("artifacts/phase7q", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

async function dismiss() {
  const b = page.getByRole("button", { name: "Essential only" });
  if (await b.isVisible().catch(() => false)) await b.click();
}

const report = {};

// ---- Item 1 & 2: card on paper, footer on paper, steps gone, avatars sharp
for (const [w, h] of [[1440, 900], [1024, 768], [390, 844]]) {
  await page.setViewportSize({ width: w, height: h });
  const key = `${w}x${h}`;
  report[key] = {};
  for (const route of ["/", "/doctors/", "/care/", "/medical-disclaimer/"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await dismiss();
    const m = await page.evaluate(() => {
      const card = document.querySelector(".care-book-card");
      const sec = document.querySelector(".care-book");
      const footer = document.querySelector(".site-footer");
      const px = (el, prop) => getComputedStyle(el)[prop];
      const lum = (rgb) => {
        const v = rgb.match(/\d+/g).map(Number);
        return 0.299 * v[0] + 0.587 * v[1] + 0.114 * v[2];
      };
      const out = {};
      if (!card || !footer) { out.missing = !card ? "card" : "footer"; return out; }
      out.cardBg = px(card, "backgroundColor");
      out.cardRadius = px(card, "borderRadius");
      out.footerBg = px(footer, "backgroundColor");
      out.secBg = px(sec, "backgroundColor");
      const cr = card.getBoundingClientRect();
      const fr = footer.getBoundingClientRect();
      out.gapCardToFooter = Math.round(fr.top - cr.bottom);
      out.cardOffLeft = Math.round(cr.left);
      out.viewportW = innerWidth;
      out.steps = document.querySelectorAll(".care-book-steps, .cta-steps, .cta-facts, ol.care-book-steps").length;
      const cardText = card.innerText;
      out.confirmMentions = (cardText.match(/confirms? (your time|by phone)/gi) || []).length;
      out.avatars = [...card.querySelectorAll("img")].map((i) => ({
        nat: i.naturalWidth, rend: Math.round(i.getBoundingClientRect().width), dpr: devicePixelRatio,
      }));
      out.arrowHrefs = [...card.querySelectorAll(".care-book-doctor-link")].map((a) => a.getAttribute("href"));
      out.footerNight = lum(out.footerBg) < 110;
      out.cardNight = lum(out.cardBg) < 110;
      // any element with dark bg between card bottom and footer top?
      out.hOverflow = document.documentElement.scrollWidth > innerWidth;
      return out;
    });
    report[key][route] = m;
  }
}

// ---- Item 3: footer links resolve + identical footer across routes
await page.setViewportSize({ width: 1440, height: 900 });
const routes = ["/", "/doctors/", "/care/", "/medical-disclaimer/", "/guides/", "/contact/", "/privacy-policy/", "/plan-your-visit/"];
const footers = {};
const hrefs = new Set();
for (const r of routes) {
  await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
  const f = await page.evaluate(() => {
    const el = document.querySelector(".site-footer");
    return el ? el.innerHTML : null;
  });
  footers[r] = f;
  const hs = await page.evaluate(() =>
    [...document.querySelectorAll(".site-footer a[href]")].map((a) => a.getAttribute("href"))
  );
  hs.forEach((h) => hrefs.add(h));
}
const uniq = new Set(Object.values(footers).map((f) => f && f.length));
report.footerIdentical = uniq.size === 1 && !footers[Object.keys(footers)[0]]?.includes("undefined");
report.footerLinkCount = hrefs.size;
const linkResults = {};
for (const h of [...hrefs].filter((h) => h && !h.startsWith("tel:") && !h.startsWith("http") && !h.startsWith("#"))) {
  const res = await page.request.get(BASE + h.split("#")[0]);
  linkResults[h] = res.status();
}
report.linkStatuses = linkResults;

// ---- Item 4 & 5: tap targets at 390, dock coverage, heading order
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await dismiss();
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(600);
report.mobile = await page.evaluate(() => {
  const out = {};
  const zones = [...document.querySelectorAll(".care-book-card a, .care-book-card button, .site-footer a, .site-footer button")];
  out.smallTargets = zones.filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.width < 44 || r.height < 44);
  }).map((el) => `${el.tagName}.${el.className} "${(el.textContent || "").trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
  const dock = document.querySelector(".mobile-dock");
  const fb = document.querySelector(".f-bottom");
  const fbRect = fb.getBoundingClientRect();
  out.dockHidden = dock ? dock.hasAttribute("data-hidden") : "no-dock";
  out.lastLineVisible = fbRect.bottom <= innerHeight;
  out.hOverflow = document.documentElement.scrollWidth > innerWidth;
  return out;
});

// heading order on a few routes
report.headings = {};
for (const r of ["/", "/doctors/", "/care/", "/medical-disclaimer/", "/guides/", "/contact/"]) {
  await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
  report.headings[r] = await page.evaluate(() => {
    const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
    const skips = [];
    levels.reduce((prev, cur) => { if (cur > prev + 1) skips.push(`${prev}->${cur}`); return cur; }, 0);
    return { skips, count: levels.length };
  });
}

// ---- Screenshots
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await dismiss();
await page.screenshot({ path: "artifacts/phase7q/home-1440.png", fullPage: true });
await page.locator(".care-book").screenshot({ path: "artifacts/phase7q/card-1440.png" });
await page.locator(".site-footer").screenshot({ path: "artifacts/phase7q/footer-1440.png" });
await page.goto(BASE + "/doctors/", { waitUntil: "networkidle" });
await page.screenshot({ path: "artifacts/phase7q/doctors-1440.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await dismiss();
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "artifacts/phase7q/home-390.png", fullPage: true });
await page.locator(".care-book").screenshot({ path: "artifacts/phase7q/card-390.png" });
await page.locator(".site-footer").screenshot({ path: "artifacts/phase7q/footer-390.png" });
await page.goto(BASE + "/doctors/", { waitUntil: "networkidle" });
await page.screenshot({ path: "artifacts/phase7q/doctors-390.png", fullPage: true });

report.consoleErrors = errors;
console.log(JSON.stringify(report, null, 1));
await browser.close();
