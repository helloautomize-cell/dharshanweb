// Fails on U+2013 (en dash) or U+2014 (em dash) in rendered HTML, JSON-LD,
// llms outputs, sitemap, OG-image strings and the email template.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const app = join(process.cwd(), ".next", "server", "app");
const DASH = /[–—]/;
const fail = [];

function walk(dir, match, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, match, out);
    else if (match(name.name)) out.push(p);
  }
  return out;
}

const targets = [
  ...walk(app, (n) => n.endsWith(".html")),
  ...walk(app, (n) => n.endsWith(".body") && /llms|robots|sitemap/.test(n)),
  join(process.cwd(), "lib/og-image.tsx"),
  join(process.cwd(), "lib/guide-og.tsx"),
  join(process.cwd(), "app/(site)/contact/actions.ts"),
];

let scanned = 0;
for (const file of targets) {
  if (!existsSync(file)) continue;
  scanned++;
  const text = readFileSync(file, "utf8");
  const hit = text.match(DASH);
  if (hit) {
    const at = text.slice(0, hit.index).split("\n").length;
    fail.push(
      `${relative(process.cwd(), file)} line ~${at}: ${JSON.stringify(hit[0])}`,
    );
  }
}

if (fail.length) {
  console.error(`Em/en dash check failed (${scanned} files scanned):`);
  for (const f of fail.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `Em/en dash check passed: ${scanned} rendered and source files clean.`,
);
