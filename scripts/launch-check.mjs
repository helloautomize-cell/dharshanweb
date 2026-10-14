import {
  TODO_CONFIRM,
  imageApprovals,
  SITE_INDEXABLE,
} from "../lib/site-config.ts";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
await writeFile(
  "artifacts/confirmations.json",
  JSON.stringify(TODO_CONFIRM, null, 2) + "\n",
);
const blockers = TODO_CONFIRM.map((item) => `${item.path}: ${item.value}`);
if (!SITE_INDEXABLE)
  blockers.push("SITE_INDEXABLE is false until launch approval");
for (const [name, approved] of Object.entries(imageApprovals))
  if (!approved) blockers.push(`Image not approved: ${name}`);
for (const directory of ["app", "components", "lib"])
  for (const file of await readdir(directory, { recursive: true })) {
    if (!/\.(tsx|ts)$/.test(file)) continue;
    const text = await readFile(`${directory}/${file}`, "utf8");
    if (/[\u2013\u2014]/.test(text))
      blockers.push(`Forbidden dash in ${directory}/${file}`);
  }
// --- content checks (P3) ---
const { parseContentFile } = await import("../lib/content.ts");
const { conditions } = await import("../lib/conditions.ts");
const manifest = JSON.parse(await readFile("content/manifest.json", "utf8"));
const banned =
  /\b(delve|embark|realm|tapestry|seamless|comprehensive|holistic|robust|leverage|empower|elevate|unlock|tailored|cutting-edge|state-of-the-art|world-class|top-notch|game-changer|peace of mind|rest assured|one-stop|guaranteed)\b|(?<!no )(?<!not )(?<!permanent )\bcure\b(?! claims)/i;
const urls = new Set(manifest.map((p) => p.url));
for (const page of manifest) {
  const rel = page.url === "/" ? "home" : page.url.replace(/^\/|\/$/g, "");
  const file = `content/pages/${rel}.mdx`;
  let raw;
  try {
    raw = await readFile(file, "utf8");
  } catch {
    blockers.push(`Missing content file ${file}`);
    continue;
  }
  if (/[–—]/.test(raw)) blockers.push(`Forbidden dash in ${file}`);
  const match = raw.match(banned);
  if (match) blockers.push(`Banned term "${match[0]}" in ${file}`);
  const parsed = parseContentFile(raw);
  if (!parsed.sections.length) blockers.push(`No sections parsed in ${file}`);
  for (const link of [
    ...(page.related ?? []),
    ...(page.posts ?? []),
    ...(page.links ?? []),
  ])
    if (!urls.has(link)) blockers.push(`Broken link ${link} from ${page.url}`);
}
for (const condition of conditions)
  if (!urls.has(condition.href))
    blockers.push(
      `Condition ${condition.name} points at missing ${condition.href}`,
    );
try {
  await readFile("resources/docs/llms.txt", "utf8");
} catch {
  blockers.push("Missing resources/docs/llms.txt");
}
if (blockers.length) {
  process.stderr.write(
    `Launch blocked (${blockers.length} items):\n${blockers.map((item) => `- ${item}`).join("\n")}\n`,
  );
  process.exitCode = 1;
} else process.stdout.write("Launch checks passed\n");
