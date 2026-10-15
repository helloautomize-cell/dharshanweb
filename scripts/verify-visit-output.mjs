import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = [".next/server", ".vercel/output"];
const pages = ["plan-your-visit", "video-consultation"];
const files = new Map(pages.map((page) => [page, []]));
const tree = [];
async function scan(dir, depth = 0) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (depth < 4 && tree.length < 400)
        tree.push(`${"  ".repeat(depth)}${entry.name}/`);
      await scan(full, depth + 1);
    } else {
      const normalized = full.replaceAll("\\", "/");
      for (const page of pages)
        if (
          normalized.endsWith(`/${page}.html`) ||
          normalized.endsWith(`/${page}/index.html`)
        )
          files.get(page).push(full);
    }
  }
}
for (const root of roots) await scan(root);
for (const [page, matches] of files) {
  if (!matches.length)
    throw new Error(
      `Could not find prerendered ${page} output under ${roots.join(", ")}.\nTop-level entries found:\n${tree.slice(0, 120).join("\n")}`,
    );
  for (const file of matches) {
    const html = await readFile(file, "utf8");
    const count = html.match(/CONFIRM/g)?.length ?? 0;
    if (count)
      throw new Error(`${file} contains ${count} unconfirmed placeholders`);
  }
  process.stdout.write(
    `${page} rendered output: zero CONFIRM matches (${matches.join(", ")})\n`,
  );
}
