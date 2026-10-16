// Reports first-load JS (gzipped) per route by parsing built HTML for script
// tags and summing the gzip size of the referenced client chunks.
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const appDir = join(process.cwd(), ".next", "server", "app");
const staticDir = join(process.cwd(), ".next", "static");

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const gzSize = new Map();
async function gzipOf(src) {
  if (gzSize.has(src)) return gzSize.get(src);
  const rel = src.replace(/^\/_next\/static\//, "");
  const file = join(staticDir, rel);
  if (!existsSync(file)) {
    gzSize.set(src, 0);
    return 0;
  }
  const size = gzipSync(await readFile(file), { level: 9 }).length;
  gzSize.set(src, size);
  return size;
}

const rows = [];
for (const file of await walk(appDir)) {
  const rel = relative(appDir, file).replaceAll("\\", "/");
  if (
    /404|not-found|global-error|_not-found|opengraph-image|og-image|icon|apple-icon|llms/.test(
      rel,
    )
  )
    continue;
  const html = await readFile(file, "utf8");
  const srcs = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map(
    (m) => m[1],
  );
  let total = 0;
  for (const s of new Set(srcs)) total += await gzipOf(s);
  const url =
    "/" +
    rel
      .replace(/\.html$/, "")
      .replace(/\/index$/, "")
      .replace(/^index$/, "");
  rows.push({ url: url === "/" ? "/" : url + "/", kb: total / 1024 });
}

rows.sort((a, b) => b.kb - a.kb);
let fail = false;
for (const r of rows) {
  const flag =
    r.url === "/"
      ? r.kb > 120
        ? " OVER-120"
        : ""
      : r.kb > 150
        ? " OVER-150"
        : "";
  if (flag) fail = true;
  console.log(`${r.kb.toFixed(1).padStart(7)} kB  ${r.url}${flag}`);
}
console.log(
  `\nHome: ${rows.find((r) => r.url === "/")?.kb.toFixed(1)} kB (budget 120)`,
);
process.exit(fail ? 1 : 0);
