// Unit test for robots.ts in both SITE_INDEXABLE states.
// Run: node --test tests/robots.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { robotsRules } from "../lib/robots-rules.ts";

test("robots disallows everything while SITE_INDEXABLE is false", () => {
  const rules = robotsRules(false).rules;
  const all = Array.isArray(rules) ? rules : [rules];
  const star = all.find((rule) => rule.userAgent === "*");
  assert.equal(star.disallow, "/");
  assert.equal(star.allow, undefined);
});

test("robots allowlist and sitemap when SITE_INDEXABLE is true", () => {
  const out = robotsRules(true);
  const all = Array.isArray(out.rules) ? out.rules : [out.rules];
  const star = all.find((rule) => rule.userAgent === "*");
  assert.equal(star.allow, "/");
  assert.ok(star.disallow.includes("/thank-you/"));
  assert.ok(star.disallow.includes("/styleguide/"));
  const allowed = new Set(all.flatMap((r) => r.userAgent));
  for (const bot of [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
  ])
    assert.ok(allowed.has(bot), `${bot} missing from allowlist`);
  assert.equal(out.sitemap, "https://www.rehabify.in/sitemap.xml");
});
