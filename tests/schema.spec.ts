import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

type Json = Record<string, unknown>;

const manifest = JSON.parse(readFileSync("content/manifest.json", "utf8")) as {
  url: string;
  noindex?: boolean;
}[];
const routes = manifest
  .map((page) => page.url)
  .filter(
    (url) =>
      url !== "/404/" &&
      url !== "/thank-you/" &&
      !url.startsWith("/styleguide"),
  );

function nodes(payload: Json): Json[] {
  const graph = (payload["@graph"] ?? [payload]) as Json[];
  return Array.isArray(graph) ? graph : [graph];
}

function collectIds(node: unknown, ids: Set<string>) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item) => collectIds(item, ids));
    return;
  }
  const record = node as Json;
  if (typeof record["@id"] === "string") ids.add(record["@id"] as string);
  for (const value of Object.values(record)) collectIds(value, ids);
}

function collectRefs(node: unknown, refs: string[]) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item) => collectRefs(item, refs));
    return;
  }
  const record = node as Json;
  for (const [key, value] of Object.entries(record)) {
    if (key === "@id") continue;
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof (value as Json)["@id"] === "string" &&
      Object.keys(value as Json).length === 1
    )
      refs.push((value as Json)["@id"] as string);
    collectRefs(value, refs);
  }
}

test("JSON-LD is valid, resolves and is clean on every route", async ({
  request,
}) => {
  const failures: string[] = [];
  for (const url of routes) {
    const res = await request.get(url);
    if (!res.ok()) {
      failures.push(`${url}: HTTP ${res.status()}`);
      continue;
    }
    const html = await res.text();
    const blocks = [
      ...html.matchAll(
        /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => m[1]);
    if (!blocks.length) {
      failures.push(`${url}: no JSON-LD block`);
      continue;
    }
    for (const raw of blocks) {
      let data: Json;
      try {
        data = JSON.parse(raw) as Json;
      } catch {
        failures.push(`${url}: invalid JSON-LD`);
        continue;
      }
      const json = JSON.stringify(data);
      if (json.includes("[CONFIRM"))
        failures.push(`${url}: CONFIRM in JSON-LD`);
      if (/"@type":\s*"?(AggregateRating|Review)\b/.test(json))
        failures.push(`${url}: AggregateRating/Review present`);
      const ids = new Set<string>();
      const list = nodes(data);
      list.forEach((node) => collectIds(node, ids));
      const refs: string[] = [];
      list.forEach((node) => collectRefs(node, refs));
      for (const ref of refs) {
        if (!ids.has(ref))
          failures.push(`${url}: unresolved @id reference ${ref}`);
      }
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("FAQPage questions match the visible FAQ text", async ({ page }) => {
  const checks = [
    "/faqs/",
    "/pain-and-spine/back-pain/",
    "/video-consultation/",
  ];
  for (const url of checks) {
    await page.goto(url);
    const html = await page.content();
    const faqBlocks = [
      ...html.matchAll(
        /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ]
      .map((m) => {
        try {
          return JSON.parse(m[1]) as Json;
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    const faqNode = faqBlocks
      .flatMap((b) => nodes(b as Json))
      .find((n) => n["@type"] === "FAQPage");
    expect(faqNode, `${url}: FAQPage node missing`).toBeTruthy();
    const questions = (faqNode!.mainEntity as Json[]).map(
      (q) => q.name as string,
    );
    const visible = await page
      .locator("summary > span:first-of-type")
      .allTextContents();
    const visibleNorm = visible.map((t) => t.replace(/\s+/g, " ").trim());
    const missing = questions.filter(
      (q) => !visibleNorm.some((v) => v.replace(/\s+/g, " ") === q.trim()),
    );
    expect(missing, `${url}: schema questions not visible`).toEqual([]);
  }
});
