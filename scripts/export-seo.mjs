// Exports qa/seo-titles-descriptions.csv from the built pages and fails on
// duplicate titles or descriptions, over-length fields, or a missing H1.
import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";

const root = join(process.cwd(), ".next", "server", "app");
const EXCLUDED = new Set([
  "/404/",
  "/_404/",
  "/thank-you/",
  "/styleguide/",
  "/_global-error/",
  "/_not-found/",
  "/not-found/",
]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else if (name.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function urlFor(file) {
  const rel = relative(root, file).replaceAll("\\", "/");
  const path = rel.replace(/\.html$/, "");
  if (path === "index") return "/";
  return `/${path}/`;
}

const pick = (html, re) => html.match(re)?.[1]?.trim() ?? "";
const decode = (s) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const rows = [];
const seen = new Map();
const fail = [];

for (const file of walk(root).sort()) {
  const url = urlFor(file);
  if (EXCLUDED.has(url)) continue;
  const html = readFileSync(file, "utf8");
  const title = decode(pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = decode(
    pick(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
  );
  const h1 = decode(
    pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " "),
  );
  const canonical = pick(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const robots = pick(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
  const schemaTypes = [
    ...new Set(
      [
        ...html.matchAll(
          /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
        ),
      ].flatMap((m) => {
        try {
          const data = JSON.parse(m[1]);
          return (data["@graph"] ?? [data]).map((n) => n["@type"]).flat();
        } catch {
          return [];
        }
      }),
    ),
  ].join("|");
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (!title) fail.push(`${url}: missing title`);
  if (!description) fail.push(`${url}: missing description`);
  if (!h1) fail.push(`${url}: missing H1`);
  if (title.length > 60) fail.push(`${url}: title ${title.length} > 60`);
  if (description.length > 155)
    fail.push(`${url}: description ${description.length} > 155`);
  if (title && seen.has(`t:${title}`)) fail.push(`${url}: duplicate title`);
  if (description && seen.has(`d:${description}`))
    fail.push(`${url}: duplicate description`);
  seen.set(`t:${title}`, url);
  seen.set(`d:${description}`, url);
  if (canonical !== `https://www.rehabify.in${url}`)
    fail.push(`${url}: canonical "${canonical}"`);

  rows.push({
    url,
    title,
    title_length: title.length,
    description,
    description_length: description.length,
    h1,
    canonical,
    robots,
    schema_types: schemaTypes,
    word_count: wordCount,
  });
}

const csv = [
  "url,title,title_length,description,description_length,h1,canonical,robots,schema_types,word_count",
  ...rows.map((row) =>
    [
      row.url,
      row.title,
      row.title_length,
      row.description,
      row.description_length,
      row.h1,
      row.canonical,
      row.robots,
      row.schema_types,
      row.word_count,
    ]
      .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
      .join(","),
  ),
].join("\n");
mkdirSync(join(process.cwd(), "qa"), { recursive: true });
writeFileSync(join(process.cwd(), "qa", "seo-titles-descriptions.csv"), csv);
console.log(`Wrote qa/seo-titles-descriptions.csv (${rows.length} rows).`);

if (fail.length) {
  console.error("SEO export check failed:");
  for (const f of fail.slice(0, 60)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  "SEO export check passed: unique titles/descriptions, lengths and H1s all within limits.",
);
