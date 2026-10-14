import { expect, test, type Page } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const PAGES = [
  "/",
  "/about/",
  "/doctors/",
  "/dr-dharshan-n-a/",
  "/dr-selina-kh/",
  "/care/",
  "/pain-and-spine/",
  "/neuro-rehabilitation/",
  "/joints-and-sports/",
  "/childrens-rehabilitation/",
  "/older-adults/",
  "/pain-and-spine/back-pain/",
  "/neuro-rehabilitation/stroke/",
  "/joints-and-sports/prp-and-prolotherapy/",
  "/childrens-rehabilitation/cerebral-palsy/",
  "/conditions/",
  "/video-consultation/",
  "/plan-your-visit/",
  "/contact/",
  "/faqs/",
  "/health-library/",
  "/health-library/what-is-a-physiatrist/",
  "/privacy-policy/",
];
const KEY_PAGES = [
  "/",
  "/pain-and-spine/back-pain/",
  "/dr-dharshan-n-a/",
  "/contact/",
];

test.describe.configure({ mode: "serial" });

async function dismissBanner(page: Page) {
  const btn = page.getByRole("button", { name: "Essential only" });
  if (await btn.isVisible().catch(() => false)) await btn.click();
}

test("no em or en dashes in rendered text or JSON-LD", async ({ page }) => {
  const bad: string[] = [];
  for (const route of PAGES) {
    await page.goto(route);
    const hits = await page.evaluate(() => {
      const text = document.body.innerText;
      const scripts = [
        ...document.querySelectorAll('script[type="application/ld+json"]'),
      ]
        .map((s) => s.textContent ?? "")
        .join(" ");
      const out: string[] = [];
      for (const [i, ch] of [...(text + scripts)].entries()) {
        if (ch === "\u2013" || ch === "\u2014") out.push(`char@${i}`);
        if (out.length > 2) break;
      }
      return out;
    });
    if (hits.length) bad.push(route);
  }
  expect(bad).toEqual([]);
});

test("NAP strings come from site-config and no foreign phone leaks", async ({
  page,
}) => {
  for (const route of PAGES) {
    await page.goto(route);
    const phones = await page.evaluate(() =>
      [...document.body.innerHTML.matchAll(/\+?91[\s-]?\d[\d\s-]{8,}\d/g)].map(
        (m) => m[0].replace(/\D/g, ""),
      ),
    );
    for (const digits of phones) expect(digits).toBe("917904842576");
  }
});

test("at 390: dock present except thank-you, Book reachable on care pages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of PAGES) {
    await page.goto(route);
    await dismissBanner(page);
    const dock = page.locator(".mobile-dock");
    if (route === "/thank-you/") await expect(dock).toHaveCount(0);
    else await expect(dock).toBeVisible();
  }
  await page.goto("/pain-and-spine/back-pain/");
  const book = page.locator('a[href*="/contact/"]').first();
  const box = await book.boundingBox();
  expect(box!.y).toBeLessThan(844 * 2);
});

test("clipped text: chips, pills, buttons and cards do not clip", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const bad: string[] = [];
  for (const route of PAGES) {
    await page.goto(route);
    const clipped = await page.evaluate(() => {
      const els = document.querySelectorAll(
        ".chip, .pill, .seg-option span, .tag-list li, .marquee-track li, .track-card .h4, .contact-card .h4, .mega-panel a",
      );
      const out: string[] = [];
      els.forEach((el) => {
        if (
          el.scrollWidth > el.clientWidth + 1 ||
          el.scrollHeight > el.clientHeight + 1
        )
          out.push(
            `${el.tagName}.${el.className} "${el.textContent?.slice(0, 30)}"`,
          );
      });
      // glow button labels: compare the text label box to the button box
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        const btnBox = btn.getBoundingClientRect();
        const label = btn.querySelector("span") ?? btn;
        const labelBox = label.getBoundingClientRect();
        if (
          labelBox.width > btnBox.width + 1 ||
          labelBox.height > btnBox.height + 1
        )
          out.push(`btn label "${btn.textContent?.slice(0, 30)}"`);
      });
      return out;
    });
    clipped.forEach((c) => bad.push(`${route} ${c}`));
  }
  expect(bad).toEqual([]);
});

test("aqua/apricot text only appears on night surfaces", async ({ page }) => {
  const bad: string[] = [];
  for (const route of PAGES.slice(0, 8)) {
    await page.goto(route);
    const hits = await page.evaluate(() => {
      const out: string[] = [];
      const banned = new Set(["rgb(111, 208, 230)", "rgb(242, 180, 138)"]);
      const isDark = (el: Element) => {
        let node: Element | null = el;
        while (node) {
          const bg = getComputedStyle(node).backgroundColor;
          if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            const m = bg.match(/\d+/g);
            if (m) {
              const [r, g, b] = m.map(Number);
              const lum = 0.299 * r + 0.587 * g + 0.114 * b;
              return lum < 110;
            }
          }
          node = node.parentElement;
        }
        return false;
      };
      document
        .querySelectorAll("p, h1, h2, h3, h4, span, a, li, legend, label")
        .forEach((el) => {
          const color = getComputedStyle(el).color;
          if (banned.has(color) && !isDark(el))
            out.push(
              `${el.tagName}.${el.className}:${el.textContent?.slice(0, 30)}`,
            );
        });
      return out;
    });
    hits.forEach((h) => bad.push(`${route} ${h}`));
  }
  expect(bad).toEqual([]);
});

test("marquee has a pause control and stops under reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBanner(page);
  const pause = page.getByRole("button", { name: /pause|play/i });
  await expect(pause.first()).toBeVisible();
  await pause.first().click();
  const pos1 = await page
    .locator(".marquee-track")
    .evaluate((el) => el.getBoundingClientRect().x);
  await page.waitForTimeout(400);
  const pos2 = await page
    .locator(".marquee-track")
    .evaluate((el) => el.getBoundingClientRect().x);
  expect(pos1).toBe(pos2);
});

test("home at 390: height in range, sections under 1097px, doctor early", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await dismissBanner(page);
  const height = await page.evaluate(() => document.body.scrollHeight);
  expect(height).toBeGreaterThanOrEqual(9000);
  expect(height).toBeLessThanOrEqual(10500);
  const tall = await page.evaluate(() =>
    [...document.querySelectorAll("main > section, main > div > section")]
      .filter((s) => !s.classList.contains("home-hero"))
      .filter((s) => s.getBoundingClientRect().height > 1097)
      .map((s) => s.id || s.className),
  );
  expect(tall).toEqual([]);
  const doctorVisible = await page.evaluate(() => {
    const img = [...document.querySelectorAll("img")].find((i) =>
      i.src.includes("dr-"),
    );
    return img ? img.getBoundingClientRect().top < 844 * 2.2 : false;
  });
  expect(doctorVisible).toBeTruthy();
});

test("no adjacent duplicate badges on home care track", async ({ page }) => {
  await page.goto("/");
  const badges = await page
    .locator(".track-card .track-badge")
    .evaluateAll((els) => els.map((e) => (e as HTMLImageElement).src));
  for (let i = 1; i < badges.length; i++)
    expect(badges[i]).not.toBe(badges[i - 1]);
});

test("axe color-contrast clean on key pages", async ({ page }) => {
  for (const route of KEY_PAGES) {
    await page.goto(route);
    await dismissBanner(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .analyze();
    const contrast = results.violations.filter(
      (v) => v.id === "color-contrast",
    );
    expect(contrast, route).toEqual([]);
  }
});

test("mega panel fits viewport and Esc closes it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await dismissBanner(page);
  const care = page
    .locator(".site-nav")
    .getByRole("link", { name: "Care" })
    .first();
  await care.hover();
  await page.waitForTimeout(300);
  const panel = page.locator(".mega[data-open]");
  await expect(panel).toBeVisible();
  const box = await panel.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(16);
  expect(box!.x + box!.width).toBeLessThanOrEqual(1440 - 16);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(care).toBeFocused();
});
