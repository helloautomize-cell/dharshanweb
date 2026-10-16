// Verifies every <img> in the built HTML carries an alt attribute, and that
// non-empty alts match public/images/alt-text.json for the served file.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const app = join(process.cwd(), ".next", "server", "app");
const alts = JSON.parse(
  readFileSync(join(process.cwd(), "public/images/alt-text.json"), "utf8"),
);
const fail = [];
let scanned = 0;
let imgs = 0;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else if (name.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function srcKey(tag) {
  const src = tag.match(/\ssrc="([^"]*)"/)?.[1] ?? "";
  const url = src.match(/url=([^&]+)/);
  const file = decodeURIComponent(url ? url[1] : src);
  const m = file.match(/\/images\/(.+?)$/);
  return m ? m[1] : null;
}

for (const file of walk(app)) {
  scanned++;
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    imgs++;
    const tag = m[0];
    const where = relative(app, file);
    const alt = tag.match(/\salt="([^"]*)"/);
    if (!/\salt=/.test(tag)) {
      fail.push(`${where}: img without alt attribute (${tag.slice(0, 80)})`);
      continue;
    }
    const key = srcKey(tag);
    // Brand marks, icons and small avatars render next to visible names, so
    // alt="" is the correct treatment for them.
    const decorative =
      /^(brand|icons)\//.test(key ?? "") || /-avatar/.test(key ?? "");
    if (
      key &&
      !decorative &&
      key in alts &&
      alts[key].trim() &&
      alt &&
      alt[1] !== alts[key]
    )
      fail.push(
        `${where}: alt "${alt[1]}" does not match alt-text.json for ${key}`,
      );
  }
}

if (fail.length) {
  console.error(`Alt-text check failed (${imgs} images, ${scanned} pages):`);
  for (const f of fail.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`Alt-text check passed: ${imgs} images across ${scanned} pages.`);
