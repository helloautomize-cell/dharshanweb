import { expect, test } from "@playwright/test";

const THIRD_PARTY =
  /googletagmanager|google-analytics|analytics\.google|google\.com\/maps|youtube|youtube-nocookie|ytimg/;

test.describe("consent gating", () => {
  test("zero third-party requests before and after reject", async ({
    page,
  }) => {
    const hits: string[] = [];
    page.on("request", (r) => {
      if (THIRD_PARTY.test(r.url())) hits.push(r.url());
    });
    await page.goto("/");
    await page.waitForTimeout(1500);
    await expect(page.locator(".cookie-banner")).toBeVisible();
    await page.getByRole("button", { name: "Essential only" }).click();
    await page.waitForTimeout(800);
    await page.goto("/pain-and-spine/back-pain/");
    await page.waitForTimeout(800);
    expect(hits).toEqual([]);
  });
});

test.describe("security headers", () => {
  for (const route of ["/", "/contact/", "/pain-and-spine/back-pain/"]) {
    test(`headers on ${route}`, async ({ request }) => {
      const res = await request.get(route);
      const h = res.headers();
      expect(h["strict-transport-security"]).toContain("max-age=31536000");
      expect(h["x-content-type-options"]).toBe("nosniff");
      expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(h["permissions-policy"]).toContain("camera=()");
      expect(h["x-frame-options"]).toBe("DENY");
      expect(h["content-security-policy"]).toContain("default-src 'self'");
      expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
      expect(h["x-robots-tag"]).toContain("noindex");
    });
  }
});
