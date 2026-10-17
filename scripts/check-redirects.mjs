// Structural check that every redirects.json row is implemented in
// next.config.ts as a single-hop permanent redirect to the final URL, and
// that proxy.ts returns 410 for the gone paths. Set BASE_URL to also run
// live HTTP checks.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const redirects = JSON.parse(
  readFileSync(join(root, "resources/docs/redirects.json"), "utf8"),
);
const config = readFileSync(join(root, "next.config.ts"), "utf8");
const proxy = readFileSync(join(root, "proxy.ts"), "utf8");
const fail = [];

const named = redirects.redirects.filter((r) => !r.source.includes(":"));
for (const row of named) {
  const escaped = row.source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `source:\\s*"${escaped}"[\\s\\S]*?destination:\\s*"${row.destination.replace(/[.*+?^${}()|[\]\\#]/g, "\\$&")}"`,
  );
  if (!re.test(config) && !proxy.includes(`"${row.source}"`))
    fail.push(`missing redirect ${row.source} -> ${row.destination}`);
}
for (const pattern of ["/health-library/:slug", "/blogs/:slug"]) {
  if (!config.includes(pattern))
    fail.push(`missing pattern redirect ${pattern}`);
}
for (const gone of redirects.gone) {
  const base = gone.source.split(":")[0].replace(/\/$/, "");
  if (!proxy.includes(base.replace(/^\//, "")) && !proxy.includes(base))
    fail.push(`missing 410 for ${gone.source}`);
}
if (!/status:\s*410/.test(proxy)) fail.push("proxy.ts does not return 410");

const notfileIdx = config.indexOf("/:notfile(");
for (const row of redirects.redirects) {
  const clean = row.source.split(":")[0].replace(/\/$/, "");
  const idx = config.indexOf(`"${clean}"`);
  if (idx > -1 && notfileIdx > -1 && idx > notfileIdx)
    fail.push(`${row.source} is shadowed by the generic trailing-slash rule`);
}

const base = process.env.BASE_URL;
if (base) {
  for (const row of redirects.redirects) {
    const source = row.source
      .replace(":slug*", "sample")
      .replace(":slug", "sample");
    const res = await fetch(`${base}${source}`, { redirect: "manual" });
    const location = res.headers.get("location") ?? "";
    if (res.status !== 301)
      fail.push(`${source}: expected 301, got ${res.status}`);
    else if (!location.endsWith(row.destination.replace(":slug", "sample")))
      fail.push(`${source}: lands on ${location}, expected ${row.destination}`);
  }
  for (const gone of redirects.gone) {
    const source = gone.source.replace(":path*", "x").replace(/\/$/, "");
    const res = await fetch(`${base}${source}`, { redirect: "manual" });
    if (res.status !== 410)
      fail.push(`${source}: expected 410, got ${res.status}`);
  }
}

if (fail.length) {
  console.error("Redirect check failed:");
  for (const f of fail) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `Redirect check passed: ${redirects.redirects.length} redirects and ${redirects.gone.length} gone rules` +
    (base ? ` verified live at ${base}` : " verified structurally"),
);
