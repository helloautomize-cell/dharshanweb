import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

for (const width of [390, 768, 1024, 1440])
  test(`layout and accessibility at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    const external: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("request", (request) => {
      if (
        !request.url().startsWith("http://127.0.0.1:3000") &&
        !request.url().startsWith("data:")
      )
        external.push(request.url());
    });
    const response = await page.goto("/styleguide/", {
      waitUntil: "networkidle",
    });
    expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator(
          "a a, a button, button a, button button, summary a, summary button",
        )
        .count(),
    ).toBe(0);
    expect(await page.locator("body").innerText()).not.toMatch(
      /[\u2013\u2014]/,
    );
    for (const label of await page.locator(".button-label").all()) {
      const sizes = await label.evaluate((element) => ({
        height: element.getBoundingClientRect().height,
        line: parseFloat(getComputedStyle(element).lineHeight),
      }));
      expect(sizes.height).toBeLessThanOrEqual(sizes.line + 1);
    }
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(
      violations.map((item) => ({
        id: item.id,
        targets: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    if (width === 390) {
      const tall = await page
        .locator("main > section:not(.hero-demo)")
        .evaluateAll((sections) =>
          sections
            .filter(
              (element) =>
                element.getBoundingClientRect().height > innerHeight * 1.3,
            )
            .map((element) => ({
              id: element.id,
              height: element.getBoundingClientRect().height,
            })),
        );
      expect(tall).toEqual([]);
    }
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });

test("mobile regions and section heights at 390 by 844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/styleguide/");
  await page.getByRole("button", { name: "Hip and knee", exact: true }).click();
  await expect(page.locator("#body-panel h3")).toHaveText("Hip and knee");
  expect(
    await page
      .locator("main > section:not(.hero-demo)")
      .evaluateAll((sections) =>
        sections
          .filter(
            (section) =>
              section.getBoundingClientRect().height > innerHeight * 1.3,
          )
          .map((section) => section.id),
      ),
  ).toEqual([]);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("keyboard body map, goals, finder and native FAQ", async ({ page }) => {
  await page.goto("/styleguide/");
  const head = page.getByRole("button", { name: "Head", exact: true });
  await head.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#body-panel h3")).toHaveText("Brain and nerves");
  await page.getByRole("button", { name: "Back", exact: true }).first().click();
  await expect(page.locator(".body-figure")).toHaveAttribute(
    "aria-label",
    "Back body areas",
  );
  await page.getByRole("button", { name: "Hip and knee", exact: true }).click();
  await expect(page.locator("#body-panel h3")).toHaveText("Hip and knee");
  await page.getByRole("button", { name: "Climb two floors" }).click();
  await expect(
    page.getByRole("status", { name: "Example goal progress" }),
  ).toContainText("3 of 4");
  await page.getByRole("button", { name: "By video", exact: true }).click();
  await expect(page.locator('input[name="format"]')).toHaveValue("video");
  await page.getByText("Do I need a referral?", { exact: true }).click();
  await expect(page.locator(".faq-item[open]")).toContainText(
    "No. You can book directly.",
  );
});

test("reduced motion, glow labels and review screenshots", async ({ page }) => {
  await mkdir("artifacts/styleguide", { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/styleguide/", { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      window.scrollTo(0, 0);
    });
    expect(
      await page
        .locator(".btn-glow")
        .first()
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
    ).toBe("none");
    await page.locator(".goniometer").scrollIntoViewIfNeeded();
    await expect(page.locator(".degrees")).toHaveText("95°");
    await page.screenshot({
      path: `artifacts/styleguide/full-${width}.png`,
      fullPage: true,
    });
    for (const [name, selector] of [
      ["hero", ".hero-demo"],
      ["body-map", ".body-map"],
      ["bento", ".bento-demo"],
      ["doctors", ".doctor-cards"],
      ["badges", ".badge-gallery"],
      ["glow", ".hero-demo .btn-glow"],
    ])
      await page
        .locator(selector)
        .screenshot({ path: `artifacts/styleguide/${name}-${width}.png` });
    const properties = await page
      .locator(".btn-glow")
      .first()
      .evaluate((element) => ({
        isolation: getComputedStyle(element).isolation,
        transform: getComputedStyle(element).transform,
      }));
    expect(properties).toEqual({ isolation: "auto", transform: "none" });
  }
});

test("manual motion toggle stops animation and goniometer", async ({
  page,
}) => {
  await page.goto("/styleguide/");
  await page.getByRole("checkbox", { name: "Reduced motion" }).check();
  await page.locator(".goniometer").scrollIntoViewIfNeeded();
  await expect(page.locator(".degrees")).toHaveText("95°");
  expect(
    await page
      .locator(".btn-glow")
      .first()
      .evaluate(
        (element) => getComputedStyle(element, "::before").animationName,
      ),
  ).toBe("none");
});

test("navigation keyboard entry and glow label pixels", async ({ page }) => {
  await page.goto("/styleguide/");
  const trigger = page.getByRole("button", { name: "Care", exact: true });
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator(".mega-panel a").first()).toBeFocused();
  const label = page.locator(".hero-demo .button-label").first();
  const image = await label.screenshot();
  const { data, info } = await sharp(image)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let light = 0;
  for (let i = 0; i < data.length; i += info.channels)
    if (data[i] > 160 && data[i + 1] > 180 && data[i + 2] > 180) light++;
  expect(light / (info.width * info.height)).toBeGreaterThan(0.05);
  expect(light / (info.width * info.height)).toBeLessThan(0.6);
});

test("content and native FAQ work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/styleguide/");
  await expect(page.locator("#body-panel")).toContainText("Back and spine");
  await page.locator(".faq-item summary").first().click();
  await expect(page.locator(".faq-item[open]")).toContainText(
    "A physiatrist is a doctor",
  );
  await expect(page.locator(".front-arch img")).toBeVisible();
  await context.close();
});

test("approved theme remains consistent with system dark preference", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/styleguide/");
  expect(
    await page
      .locator(".hero-demo")
      .evaluate((element) => getComputedStyle(element).color),
  ).toBe("rgb(217, 237, 243)");
  expect(
    await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
  ).toBe("rgb(245, 248, 250)");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
});
