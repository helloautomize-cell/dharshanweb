import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const ROUTES = [
  "/about/",
  "/doctors/",
  "/dr-dharshan-n-a/",
  "/dr-selina-kh/",
  "/care/",
  "/conditions/",
  "/video-consultation/",
  "/plan-your-visit/",
  "/contact/",
  "/faqs/",
  "/health-library/",
  "/pain-and-spine/",
  "/pain-and-spine/back-pain/",
  "/neuro-rehabilitation/stroke/",
  "/joints-and-sports/knee-pain/",
  "/childrens-rehabilitation/",
  "/older-adults/falls-and-balance/",
  "/privacy-policy/",
  "/accessibility/",
  "/health-library/what-is-a-physiatrist/",
];

test("every route renders h1, noindex and the emergency line", async ({
  page,
}) => {
  for (const route of ROUTES) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1").first(), route).toBeVisible();
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots, `${route} robots`).toContain("noindex");
  }
});

test("care leaf page has reviewer, FAQ, urgent callout and schema", async ({
  page,
}) => {
  await page.goto("/pain-and-spine/back-pain/");
  await expect(page.locator(".reviewer-box")).toBeVisible();
  await expect(page.locator(".faq-item").first()).toBeVisible();
  await expect(page.locator(".is-urgent")).toBeVisible();
  await expect(page.locator(".emergency-strip")).toBeVisible();
  const jsonld = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(jsonld.join("")).toContain("MedicalWebPage");
  expect(jsonld.join("")).toContain("FAQPage");
  expect(jsonld.join("")).not.toContain("[CONFIRM");
});

test("doctor page has portrait and Physician schema", async ({ page }) => {
  await page.goto("/dr-dharshan-n-a/");
  await expect(page.locator(".doctor-arch img")).toBeVisible();
  const jsonld = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(jsonld.join("")).toContain("Physician");
});

test("conditions A to Z lists every registered condition", async ({
  page,
}) => {
  await page.goto("/conditions/");
  const count = await page.locator(".az-group li a").count();
  expect(count).toBeGreaterThan(30);
});

test("old URLs redirect and removed ones return 410", async ({
  request,
}) => {
  let response = await request.get("/about-us", { maxRedirects: 0 });
  for (let i = 0; i < 4 && [301, 302, 307, 308].includes(response.status()); i++) {
    const location = response.headers()["location"];
    if (!location) break;
    response = await request.get(location, { maxRedirects: 0 });
  }
  expect(response.url()).toContain("/about/");
  const gone = await request.get("/ai-tools");
  expect(gone.status()).toBe(410);
});

test("robots disallows and sitemap, llms.txt respond", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  expect(await llms.text()).toContain("Rehabify");
});

test("content pages stay accessible at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pain-and-spine/back-pain/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
});
