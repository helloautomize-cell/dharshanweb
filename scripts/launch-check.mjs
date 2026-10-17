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
const { conditions } = await import("../content/care-conditions.ts");
const manifest = JSON.parse(await readFile("content/manifest.json", "utf8"));
const banned =
  /\b(delve|embark|realm|tapestry|seamless|comprehensive|holistic|robust|leverage|empower|elevate|unlock|tailored|cutting-edge|state-of-the-art|world-class|top-notch|game-changer|peace of mind|rest assured|one-stop|guaranteed)\b|(?<!no )(?<!not )(?<!permanent )\bcure\b(?! claims)/i;
const urls = new Set(manifest.map((p) => p.url));
for (const page of manifest) {
  if (page.url.startsWith("/guides/topic/") || page.url === "/guides/")
    continue;
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
// --- launch gate table (P8): each check must pass before launch ---
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const built = existsSync(".next/server/app");
const gates = [
  {
    name: "check-dashes",
    cmd: ["node", "scripts/check-dashes.mjs"],
    needsBuild: true,
  },
  {
    name: "export-seo",
    cmd: ["node", "scripts/export-seo.mjs"],
    needsBuild: true,
  },
  {
    name: "check-initial-html",
    cmd: ["node", "scripts/check-initial-html.mjs"],
    needsBuild: true,
  },
  {
    name: "schema",
    cmd: ["node", "scripts/check-schema.mjs"],
    needsBuild: true,
  },
  {
    name: "alt-text",
    cmd: ["node", "scripts/check-alt.mjs"],
    needsBuild: true,
  },
  {
    name: "redirects",
    cmd: ["node", "scripts/check-redirects.mjs"],
    needsBuild: false,
  },
  {
    name: "image-metadata",
    cmd: ["node", "scripts/check-image-meta.mjs"],
    needsBuild: false,
  },
  {
    name: "robots-rules",
    cmd: ["node", "--test", "tests/robots.test.mjs"],
    needsBuild: false,
  },
];

const gateRows = gates.map((gate) => {
  if (gate.needsBuild && !built)
    return { name: gate.name, status: "BLOCKED", note: "no build output" };
  const run = spawnSync(gate.cmd[0], gate.cmd.slice(1), {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const ok = run.status === 0;
  return {
    name: gate.name,
    status: ok ? "pass" : "BLOCKED",
    note: ok
      ? ""
      : ((run.stderr || run.stdout).split("\n").filter(Boolean)[0] ?? "failed"),
  };
});

for (const row of gateRows.filter((row) => row.status !== "pass"))
  blockers.push(`launch gate ${row.name}: ${row.note}`);

process.stdout.write("\nLaunch gates\n------------\n");
for (const row of gateRows)
  process.stdout.write(
    `${row.status === "pass" ? "pass" : "BLOCKED"}  ${row.name}${row.note ? `  (${row.note})` : ""}\n`,
  );

if (blockers.length) {
  process.stderr.write(
    `\nLaunch blocked (${blockers.length} items):\n${blockers.map((item) => `- ${item}`).join("\n")}\n`,
  );
  process.exitCode = 1;
} else process.stdout.write("Launch checks passed\n");
