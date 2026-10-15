import { readFile } from "node:fs/promises";

const html = await readFile(".next/server/app/plan-your-visit.html", "utf8");
const matches = html.match(/CONFIRM/g) ?? [];
if (matches.length) {
  throw new Error(
    `Visit page output contains ${matches.length} unconfirmed placeholders`,
  );
}
process.stdout.write("Visit page rendered output: zero CONFIRM matches\n");
