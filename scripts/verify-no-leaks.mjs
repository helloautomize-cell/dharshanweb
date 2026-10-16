// Fails the build if internal authoring markers leak into built HTML.
// Scans rendered markup only: script and style blocks are removed first so
// serialized RSC flight data (which embeds prop text) is not scanned.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), ".next", "server", "app");
const fail = [];

const patterns = [
  [/\bCONFIRM\b/, "CONFIRM"],
  [/\bDECISION\b/, "DECISION"],
  [/website_information/i, "website_information"],
  [/not yet written/i, "not yet written"],
  [/Mobile: 6 chips/i, "Mobile: 6 chips"],
  [/\(Home Q\d/i, "(Home Qn)"],
  [/\(Profile Q\d/i, "(Profile Qn)"],
  [/\(Video Q\d/i, "(Video Qn)"],
  [/Last reviewed:\s*<\/(time|span|p)>/i, "empty Last reviewed"],
  [/Last reviewed:\s{0,20}[,·.]/i, "empty Last reviewed"],
  [/,\s*,/i, "empty field (', ,')"],
];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else if (name.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function visibleMarkup(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "");
}

let scanned = 0;
for (const file of walk(root)) {
  const html = visibleMarkup(readFileSync(file, "utf8"));
  scanned++;
  for (const [re, label] of patterns) {
    if (re.test(html)) {
      const short = file.split(/\bapp\b/).pop() ?? file;
      fail.push(`${short}: contains ${label}`);
    }
  }
}

if (fail.length) {
  console.error(`Leaked-strings check failed (${scanned} pages scanned):`);
  for (const f of fail.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `Leaked-strings check passed: ${scanned} pages clean of CONFIRM, internal notes, cross-refs and empty review dates.`,
);
