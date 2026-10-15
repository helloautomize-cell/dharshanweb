import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = ".next/server/app";
const files = [];
async function scan(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await scan(full);
    else if (/plan-your-visit([\\/]index)?\.html$/.test(full)) files.push(full);
  }
}
await scan(root);
if (!files.length)
  throw new Error(
    `Could not find prerendered plan-your-visit.html under ${root}`,
  );
for (const file of files) {
  const html = await readFile(file, "utf8");
  const matches = html.match(/CONFIRM/g) ?? [];
  if (matches.length)
    throw new Error(
      `${file} contains ${matches.length} unconfirmed placeholders`,
    );
}
process.stdout.write(
  `Visit page rendered output: zero CONFIRM matches (${files.join(", ")})\n`,
);
