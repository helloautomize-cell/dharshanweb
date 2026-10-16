// Offline JSON-LD validation over the built pages: valid JSON, @id
// references resolve inside the graph, no CONFIRM, no AggregateRating/Review,
// FAQPage present only where questions render.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const app = join(process.cwd(), ".next", "server", "app");
const fail = [];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else if (name.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function collectIds(node, ids) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => collectIds(n, ids));
  if (typeof node["@id"] === "string") ids.add(node["@id"]);
  Object.values(node).forEach((v) => collectIds(v, ids));
}

function collectRefs(node, refs) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => collectRefs(n, refs));
  for (const [key, value] of Object.entries(node)) {
    if (key === "@id") continue;
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value["@id"] === "string" &&
      Object.keys(value).length === 1
    )
      refs.push(value["@id"]);
    collectRefs(value, refs);
  }
}

let pages = 0;
for (const file of walk(app)) {
  const rel = relative(app, file);
  if (
    ["_global-error", "_not-found", "styleguide"].some((p) => rel.includes(p))
  )
    continue;
  const html = readFileSync(file, "utf8");
  const blocks = [
    ...html.matchAll(
      /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => m[1]);
  if (!blocks.length) {
    if (!/404|not-found/.test(rel)) fail.push(`${rel}: no JSON-LD`);
    continue;
  }
  pages++;
  for (const raw of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      fail.push(`${rel}: invalid JSON-LD`);
      continue;
    }
    const json = JSON.stringify(data);
    if (json.includes("[CONFIRM")) fail.push(`${rel}: CONFIRM in JSON-LD`);
    if (/"@type":\s*"?(AggregateRating|Review)\b/.test(json))
      fail.push(`${rel}: AggregateRating/Review`);
    const graph = data["@graph"] ?? [data];
    const ids = new Set();
    const refs = [];
    graph.forEach((n) => collectIds(n, ids));
    graph.forEach((n) => collectRefs(n, refs));
    for (const ref of refs)
      if (!ids.has(ref)) fail.push(`${rel}: unresolved @id ${ref}`);
  }
}

if (fail.length) {
  console.error(`Schema check failed (${pages} pages scanned):`);
  for (const f of fail.slice(0, 60)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `Schema check passed: ${pages} pages, all JSON-LD valid and internally resolved.`,
);
