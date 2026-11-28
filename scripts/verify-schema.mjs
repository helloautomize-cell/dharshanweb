// Validates JSON-LD emitted into the static build: parseability, placeholder
// leaks, empty values, entity reference integrity, and core entity coverage.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const appRoot = join(process.cwd(), ".next", "server", "app");
const routeCacheRoot = join(
  process.cwd(),
  ".next",
  "server",
  "route-cache",
  "APP_PAGE",
);
const BASE = "https://www.rehabify.in";
const EXCLUDED = new Set([
  "/404/",
  "/_404/",
  "/thank-you/",
  "/_global-error/",
  "/_not-found/",
  "/not-found/",
]);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else if (entry.name.endsWith(".html")) out.push(file);
  }
  return out;
}

function urlFor(file) {
  const normalized = file.replaceAll("\\", "/");
  const routeCacheMarker = "/$/";
  const rel = normalized.includes(routeCacheMarker)
    ? normalized.split(routeCacheMarker).pop()
    : relative(appRoot, file).replaceAll("\\", "/");
  const pathname = rel.replace(/\.html$/, "").replace(/\/index$/, "");
  return pathname === "index" || pathname === "" ? "/" : `/${pathname}/`;
}

function htmlFiles() {
  const files = new Map();
  for (const root of [appRoot, routeCacheRoot]) {
    for (const file of walk(root)) {
      const url = urlFor(file);
      if (!files.has(url)) files.set(url, file);
    }
  }
  return [...files.entries()].map(([url, file]) => ({ url, file }));
}

function flatten(nodes, out = []) {
  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;
    out.push(node);
    if (Array.isArray(node["@graph"])) flatten(node["@graph"], out);
  }
  return out;
}

function emptyPaths(value, path = "", out = []) {
  if (value === null || value === "") out.push(path || "$");
  else if (Array.isArray(value)) {
    if (!value.length) out.push(path || "$");
    value.forEach((item, index) => emptyPaths(item, `${path}[${index}]`, out));
  } else if (value && typeof value === "object") {
    if (!Object.keys(value).length) out.push(path || "$");
    for (const [key, item] of Object.entries(value))
      emptyPaths(item, path ? `${path}.${key}` : key, out);
  }
  return out;
}


function collectRefs(value, refs, ids) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) collectRefs(item, refs, ids);
    return;
  }
  if (typeof value["@id"] === "string") {
    if (Object.keys(value).length > 1) ids.add(value["@id"]);
    else refs.push(value["@id"]);
  }
  for (const item of Object.values(value)) collectRefs(item, refs, ids);
}

const fail = [];
const typeCounts = new Map();
let pageCount = 0;
let scriptCount = 0;
let homeNodes = [];

for (const { url, file } of htmlFiles().sort((a, b) => a.url.localeCompare(b.url))) {
  if (EXCLUDED.has(url)) continue;
  const html = readFileSync(file, "utf8");
  const scripts = [
    ...html.matchAll(
      /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => match[1]);
  pageCount++;
  if (!scripts.length) fail.push(`${url}: no JSON-LD script`);

  for (const raw of scripts) {
    scriptCount++;
    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      fail.push(`${url}: invalid JSON-LD (${error.message})`);
      continue;
    }
    const serialized = JSON.stringify(data);
    if (serialized.includes("[CONFIRM"))
      fail.push(`${url}: schema contains an unconfirmed placeholder`);
    if (serialized.includes("undefined"))
      fail.push(`${url}: schema contains the string undefined`);

    const graphNodes = Array.isArray(data["@graph"])
      ? data["@graph"]
      : [data];
    const nodes = flatten(graphNodes);
    if (url === "/") homeNodes = nodes;
    const ids = new Set(nodes.map((node) => node["@id"]).filter(Boolean));
    const refs = [];

    for (const node of nodes) {
      const types = [node["@type"]].flat().filter(Boolean);
      for (const type of types)
        typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
      const empty = emptyPaths(node);
      if (empty.length)
        fail.push(`${url}: empty schema value at ${empty.slice(0, 3).join(", ")}`);
      collectRefs(node, refs, ids);
    }

    const siteIds = new Set([
      `${BASE}/#website`,
      `${BASE}/#organization`,
      `${BASE}/#clinic`,
      `${BASE}/#dr-dharshan-n-a`,
      `${BASE}/#dr-selina-kh`,
    ]);
    for (const ref of refs) {
      if (!ids.has(ref) && !siteIds.has(ref))
        fail.push(`${url}: unresolved entity reference ${ref}`);
    }
  }
}

for (const [entity, type] of [
  [`${BASE}/#website`, "WebSite"],
  [`${BASE}/#organization`, "MedicalOrganization"],
  [`${BASE}/#clinic`, "MedicalClinic"],
  [`${BASE}/#dr-dharshan-n-a`, "Physician"],
  [`${BASE}/#dr-selina-kh`, "Physician"],
]) {
  const node = homeNodes.find((item) => item["@id"] === entity);
  if (!node) fail.push(`/: missing core entity ${entity}`);
  else if (![node["@type"]].flat().includes(type))
    fail.push(`/: ${entity} is not typed as ${type}`);
}

const counts = [...typeCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([type, count]) => `${type}:${count}`)
  .join(" ");
console.log(
  `Schema scan: ${pageCount} pages, ${scriptCount} JSON-LD scripts. Types: ${counts}`,
);

if (fail.length) {
  console.error("Schema verification failed:");
  for (const item of fail.slice(0, 100)) console.error(`  - ${item}`);
  if (fail.length > 100) console.error(`  ... ${fail.length - 100} more`);
  process.exit(1);
}
console.log("Schema verification passed.");
