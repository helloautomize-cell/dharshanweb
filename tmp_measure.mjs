import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "http://127.0.0.1:3000";
const tag = process.argv[2] || "before";
await mkdir(`artifacts/phase7r`, { recursive: true });

const browser = await chromium.launch();
const report = {};

async function dismissCookie(page) {
  const btn = page.locator(".cookie-banner button", { hasText: /accept/i });
  if (await btn.count()) await btn.first().click().catch(() => {});
  await page.locator(".cookie-banner").waitFor({ state: "detached", timeout: 3000 }).catch(() => {});
}

// ---- mobile measurements ----
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => {
  window.__lcp = [];
  new PerformanceObserver((list) => {
    window.__lcp.push(...list.getEntries());
  }).observe({ type: "largest-contentful-paint", buffered: true });
});
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1400);
const lcp = await page.evaluate(() => {
  const e = (window.__lcp || []).at(-1);
  return e
    ? { ms: Math.round(e.startTime), el: e.element ? e.element.src || e.element.className : "?" }
    : null;
});
await dismissCookie(page);

const m = await page.evaluate(() => {
  const sel = (s) => {
    const el = document.querySelector(s);
    return el ? Math.round(el.getBoundingClientRect().height) : null;
  };
  const r = (s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height) };
  };
  return {
    pageH: Math.round(document.documentElement.scrollHeight),
    overflowX: document.documentElement.scrollWidth > innerWidth,
    heroStage: r("section.stage"),
    fan: r(".fan-box"),
    fanCtl: r(".fan-ctl"),
    pill: r(".hero .pill"),
    h1: r(".hero h1"),
    lede: r(".hero .lede"),
    heroBtns: r(".hero .btns"),
    facts: r(".hero .facts"),
    finder: r(".finder"),
    condStrip: r(".cond-strip"),
    why: r("#why"),
    where: r("#where"),
    care: r("#care"),
    ciSide: r(".ci-side"),
    journey: r("#journey"),
    ways: r("#ways"),
    doctor: r("#doctor"),
    visit: r("#visit"),
    faq: r("#faq"),
    book: r(".care-book"),
    footer: r(".site-footer"),
    navH: r(".site-nav"),
    swipeStrips: [...document.querySelectorAll("*")].filter(
      (el) => el.scrollWidth > el.clientWidth + 4 && /auto|scroll/.test(getComputedStyle(el).overflowX),
    ).map((el) => el.className.toString().slice(0, 60)),
  };
});
await page.screenshot({ path: `artifacts/phase7r/home-390-${tag}.png`, fullPage: true });
report.mobile390 = { lcp, ...m };
await page.close();

// ---- 360 and 430 ----
for (const [w, h] of [[360, 780], [430, 932]]) {
  const p = await browser.newPage({ viewport: { width: w, height: h } });
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  await dismissCookie(p);
  const info = await p.evaluate(() => ({
    pageH: Math.round(document.documentElement.scrollHeight),
    overflowX: document.documentElement.scrollWidth > innerWidth,
    fanRight: (() => {
      const back = document.querySelector(".arch.is-back, .arch.anim-back");
      const b = back?.getBoundingClientRect();
      return b ? Math.round(b.right) : null;
    })(),
    fanTop: document.querySelector(".fan-box")?.getBoundingClientRect().top,
    navBottom: document.querySelector(".site-nav")?.getBoundingClientRect().bottom,
  }));
  report[`m${w}`] = info;
  await p.screenshot({ path: `artifacts/phase7r/home-${w}-${tag}.png`, fullPage: true });
  await p.close();
}

// ---- desktop comparisons ----
for (const w of [1440, 1024]) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await p.waitForTimeout(900);
  await dismissCookie(p);
  await p.screenshot({ path: `artifacts/phase7r/home-${w}-${tag}.png`, fullPage: true });
  await p.close();
}

await browser.close();
await writeFile(`artifacts/phase7r/measure-${tag}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
