// IndexNow submission: posts URLs whose sitemap lastModified changed since
// the last run to api.indexnow.org. Refuses unless SITE_INDEXABLE is on and
// the target host is www.rehabify.in. Launch-only tool; not run in CI.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const INDEXABLE = process.env.VERCEL_ENV === "production";
const HOST = "www.rehabify.in";
const KEY = "6eab66c3f6214c47a3bb7e9de51465c0";
const STATE = join(process.cwd(), ".indexnow-state.json");
const SITEMAP = join(
  process.cwd(),
  ".next",
  "server",
  "app",
  "sitemap.xml.body",
);

const targetHost = process.argv.includes("--host")
  ? process.argv[process.argv.indexOf("--host") + 1]
  : HOST;

if (!INDEXABLE) {
  console.error(
    "IndexNow refused: SITE_INDEXABLE is off (VERCEL_ENV is not production).",
  );
  process.exit(1);
}
if (targetHost !== HOST) {
  console.error(`IndexNow refused: host ${targetHost} is not ${HOST}.`);
  process.exit(1);
}
if (!existsSync(SITEMAP)) {
  console.error("IndexNow refused: build first (no sitemap.xml.body found).");
  process.exit(1);
}

const xml = readFileSync(SITEMAP, "utf8");
const entries = [
  ...xml.matchAll(/<loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g),
].map((m) => ({ url: m[1], lastmod: m[2] ?? "" }));
const previous = existsSync(STATE)
  ? JSON.parse(readFileSync(STATE, "utf8"))
  : {};
const changed = entries
  .filter((entry) => previous[entry.url] !== entry.lastmod)
  .map((entry) => entry.url);

if (!changed.length) {
  console.log("IndexNow: nothing changed since the last run.");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: changed,
  }),
});
if (!res.ok) {
  console.error(`IndexNow failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
writeFileSync(
  STATE,
  JSON.stringify(Object.fromEntries(entries.map((e) => [e.url, e.lastmod]))),
);
console.log(`IndexNow: submitted ${changed.length} URLs.`);
