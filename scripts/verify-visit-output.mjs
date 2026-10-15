import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = [".next/server", ".vercel/output"];
const files = [];
const tree = [];
async function scan(dir, depth = 0) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (depth < 4 && tree.length < 400)
        tree.push(`${"  ".repeat(depth)}${entry.name}/`);
      await scan(full, depth + 1);
    } else if (/plan-your-visit([\\/]index)?\.html$/.test(full)) {
      files.push(full);
    }
  }
}
for (const root of roots) await scan(root);
if (!files.length) {
  throw new Error(
    `Could not find prerendered plan-your-visit output under ${roots.join(", ")}.\nTop-level entries found:\n${tree.slice(0, 120).join("\n")}`,
  );
}
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
