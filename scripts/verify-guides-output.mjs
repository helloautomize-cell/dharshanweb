import { readdir, readFile } from "node:fs/promises";
import { getGuides } from "../lib/guide-content.mjs";

const guides = getGuides();
const slugs = [
  "understanding-rehab",
  "pain-and-spine",
  "neuro-rehabilitation",
  "children",
  "older-adults",
];
const expected = [
  "/guides/",
  ...slugs.map((slug) => `/guides/topic/${slug}/`),
  ...guides.map((guide) => guide.url),
];
const found = new Set();
async function scan(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const entry of entries) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      await scan(file);
      continue;
    }
    if (!file.endsWith(".html")) continue;
    const at = file.lastIndexOf("/guides");
    if (at < 0) continue;
    const relative = file.slice(at);
    const url =
      relative === "/guides.html"
        ? "/guides/"
        : relative.replace(/\/index\.html$/, "/").replace(/\.html$/, "/");
    if (!expected.includes(url)) continue;
    const html = await readFile(file, "utf8");
    if (/CONFIRM/.test(html))
      throw new Error(
        `${file}: unresolved placeholder in rendered guide output`,
      );
    found.add(url);
  }
}
for (const dir of [".next/server", ".vercel/output"]) await scan(dir);
const missing = expected.filter((url) => !found.has(url));
if (missing.length)
  throw new Error(`Missing prerendered Guides output: ${missing.join(", ")}`);
process.stdout.write(
  `Guides validation passed: ${guides.length} valid articles, ${found.size} prerendered pages, zero CONFIRM matches\n`,
);
