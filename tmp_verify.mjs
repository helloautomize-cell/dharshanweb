import { chromium } from "@playwright/test";
const BASE = "http://127.0.0.1:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const btn = page.locator(".cookie-banner button", { hasText: /accept/i });
if (await btn.count()) await btn.first().click().catch(() => {});

const out = {};

// accordion state in DOM
out.accordions = await page.evaluate(() =>
  [...document.querySelectorAll(".ci-acc")].map((b) => ({
    name: b.querySelector(".ci-acc-name")?.textContent?.trim(),
    expanded: b.getAttribute("aria-expanded"),
    controls: b.getAttribute("aria-controls"),
    h: Math.round(b.getBoundingClientRect().height),
    panelHidden: document.getElementById(b.getAttribute("aria-controls"))?.getAttribute("hidden"),
  })),
);

// keyboard toggle: focus first accordion button, press Enter to close, Space to open
const first = page.locator(".ci-acc").first();
await first.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(300);
out.afterEnter = await page.evaluate(() => {
  const b = document.querySelector(".ci-acc");
  return {
    expanded: b.getAttribute("aria-expanded"),
    panelHidden: document.getElementById(b.getAttribute("aria-controls"))?.hasAttribute("hidden"),
  };
});
await page.keyboard.press(" ");
await page.waitForTimeout(300);
out.afterSpace = await page.evaluate(() => {
  const b = document.querySelector(".ci-acc");
  return {
    expanded: b.getAttribute("aria-expanded"),
    panelHidden: document.getElementById(b.getAttribute("aria-controls"))?.hasAttribute("hidden"),
  };
});

// tap targets < 44px among interactive elements
out.smallTargets = await page.evaluate(() => {
  const bad = [];
  document.querySelectorAll("a, button, select, input, [role=button]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.height < 44 || r.width < 44) {
      // only flag standalone controls, not inline text links
      const cs = getComputedStyle(el);
      if (cs.display === "inline") return;
      bad.push({ tag: el.tagName, cls: (el.className.baseVal || el.className).toString().slice(0, 50), w: Math.round(r.width), h: Math.round(r.height) });
    }
  });
  return bad.slice(0, 20);
});

// served image widths: which URL the ways/doctor images actually loaded
out.imgSrcs = await page.evaluate(() =>
  [...document.querySelectorAll(".sc .ui.photo img, .doc-ph img, .dcard .dph img")].map((i) => i.currentSrc.slice(0, 140)),
);

// where/journey/doctor internal breakdown
out.whereBreakdown = await page.evaluate(() => {
  const g = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : null; };
  return { head: g("#where .head"), bmL: g(".bm-l"), bmTop: g(".bm-top"), fig: g(".fig"), hint: g(".bm-hint"), bmR: g(".bm-r"), regs: g(".regs"), bmPanel: g(".bm-panel") };
});
out.journeyBreakdown = await page.evaluate(() => {
  const g = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : null; };
  const steps = [...document.querySelectorAll("#journey .step")].map((s) => Math.round(s.getBoundingClientRect().height));
  return { head: g("#journey .head"), steps };
});
out.doctorBreakdown = await page.evaluate(() => {
  const g = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : null; };
  return { docPh: g(".doc-ph"), textCol: g(".doc > div:last-of-type"), doc2: g(".doc2"), ways: g(".doc .ways"), tl: g(".doc .tl"), btns: g(".doc .btns"), bio: g(".doc .bio"), head: g(".doc h2"), secHead: g("#doctor > .head") };
});

// dock vs last element / finder button
out.dockCheck = await page.evaluate(async () => {
  const dock = document.querySelector(".mobile-dock");
  const dockHidden = () => dock?.hasAttribute("data-hidden");
  const res = {};
  // scroll finder to bottom of screen
  document.querySelector(".finder").scrollIntoView({ block: "end", behavior: "instant" });
  await new Promise((r) => setTimeout(r, 700));
  const f = document.querySelector(".finder").getBoundingClientRect();
  const d = dock?.getBoundingClientRect();
  res.finderAtBottom = { finderBottom: Math.round(f.bottom), dockTop: d ? Math.round(d.top) : null, dockHidden: dockHidden() };
  // scroll to absolute bottom
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
  await new Promise((r) => setTimeout(r, 1200));
  const fl = document.querySelector(".site-footer").getBoundingClientRect();
  const d2 = document.querySelector(".mobile-dock")?.getBoundingClientRect();
  res.atPageEnd = { footerBottom: Math.round(fl.bottom), innerH: innerHeight, dockTop: d2 ? Math.round(d2.top) : null, dockHidden: dockHidden(), scrollY: Math.round(scrollY) };
  return res;
});

// served image widths after scrolling them into view
await page.locator("#ways .sc .ui.photo img").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
out.imgSrcsAfterScroll = await page.evaluate(() =>
  [...document.querySelectorAll(".sc .ui.photo img, .doc-ph img")].map((i) => i.currentSrc.slice(0, 150)),
);

console.log(JSON.stringify(out, null, 2));
await browser.close();
