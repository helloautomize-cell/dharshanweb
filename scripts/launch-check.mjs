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
if (blockers.length) {
  process.stderr.write(
    `Launch blocked (${blockers.length} items):\n${blockers.map((item) => `- ${item}`).join("\n")}\n`,
  );
  process.exitCode = 1;
} else process.stdout.write("Launch checks passed\n");
