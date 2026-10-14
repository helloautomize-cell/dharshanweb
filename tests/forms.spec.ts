import { expect, test } from "@playwright/test";

const validDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
};

async function fillValid(page: import("@playwright/test").Page) {
  await page
    .locator('input[name="format"][value="clinic"]')
    .check({ force: true });
  await page.selectOption("#f-reason", "Back pain");
  await page.fill("#f-name", "Test Patient");
  await page.fill("#f-mobile", "9876543210");
  await page.fill("#f-age", "45");
  await page.fill("#f-date", validDate());
  await page
    .locator('input[name="time"][value="morning"]')
    .check({ force: true });
  await page.check("#f-consent", { force: true });
}

test.describe("booking form", () => {
  test("required fields show a focused error summary with links", async ({
    page,
  }) => {
    await page.goto("/contact/");
    await page.waitForTimeout(3400);
    await page.locator(".submit-btn").click();
    const summary = page.locator(".error-summary");
    await expect(summary).toBeVisible();
    await expect(summary).toBeFocused();
    const link = summary.locator("a").first();
    const href = await link.getAttribute("href");
    await link.click();
    const target = page.locator(href!);
    await expect(target).toBeFocused();
  });

  test("mobile normalisation accepts Indian formats", async ({ page }) => {
    await page.goto("/contact/");
    for (const input of [
      "+91 98765 43210",
      "098765 43210",
      "919876543210",
      "98765-43210",
    ]) {
      await page.fill("#f-mobile", input);
      await page.locator("#f-mobile").blur();
      await expect(page.locator("#f-mobile-error")).toHaveCount(0);
    }
    for (const bad of ["5876543210", "98765432", "+1 2025550123"]) {
      await page.fill("#f-mobile", bad);
      await page.locator("#f-mobile").blur();
      await expect(page.locator("#f-mobile-error")).toBeVisible();
    }
  });

  test("under-18 flow requires the box and guardian details", async ({
    page,
  }) => {
    await page.goto("/contact/");
    await page.waitForTimeout(3400);
    await fillValid(page);
    await page.fill("#f-age", "16");
    await page.locator(".submit-btn").click();
    await expect(page.locator("#f-u18-error")).toBeVisible();
    await page.check("#f-u18");
    await page.locator(".submit-btn").click();
    await expect(page.locator("#f-guardian-error")).toBeVisible();
    await expect(page.locator("#f-gconsent-error")).toBeVisible();
    await page.fill("#f-guardian", "Guardian Test");
    await page.check("#f-gconsent");
    await page.locator(".submit-btn").click();
    await page.waitForURL(/thank-you/);
  });

  test("consent checkbox blocks submission when unticked", async ({ page }) => {
    await page.goto("/contact/");
    await page.waitForTimeout(3400);
    await fillValid(page);
    await page.uncheck("#f-consent", { force: true });
    await page.locator(".submit-btn").click();
    await expect(page.locator("#f-consent-error")).toBeVisible();
    expect(await page.locator("#f-consent").isChecked()).toBe(false);
  });

  test("honeypot silently succeeds without sending mail", async ({ page }) => {
    await page.goto("/contact/");
    await fillValid(page);
    await page.evaluate(() => {
      (document.querySelector('[name="website"]') as HTMLInputElement).value =
        "spam";
    });
    await page.locator(".submit-btn").click();
    await page.waitForURL(/thank-you/);
  });

  test("under-3-second submission silently succeeds", async ({ page }) => {
    await page.goto("/contact/");
    await fillValid(page);
    await page.locator(".submit-btn").click();
    await page.waitForURL(/thank-you/);
  });
});
