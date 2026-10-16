import { readdir, readFile } from "node:fs/promises";

// Phase 7o: the five area pages and every condition page under them.
const AREAS = [
  "pain-and-spine",
  "neuro-rehabilitation",
  "joints-and-sports",
  "childrens-rehabilitation",
  "older-adults",
];
const CONDITIONS = {
  "pain-and-spine": [
    "back-pain",
    "neck-pain",
    "sciatica",
    "image-guided-injections",
  ],
  "neuro-rehabilitation": [
    "stroke",
    "spinal-cord-injury",
    "head-injury",
    "parkinsons",
    "spasticity",
  ],
  "joints-and-sports": [
    "knee-pain",
    "shoulder-pain",
    "sports-injuries",
    "after-fracture-or-surgery",
    "prp-and-prolotherapy",
    "prosthetic-rehab",
  ],
  "childrens-rehabilitation": [
    "cerebral-palsy",
    "muscular-dystrophy",
    "developmental-delay",
  ],
  "older-adults": ["falls-and-balance", "osteoporosis"],
};
const expected = [
  ...AREAS.map((area) => `/${area}/`),
  ...AREAS.flatMap((area) =>
    CONDITIONS[area].map((slug) => `/${area}/${slug}/`),
  ),
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
    const at = AREAS.map((area) => file.lastIndexOf(`/${area}`)).filter(
      (index) => index >= 0,
    );
    if (!at.length) continue;
    const relative = file.slice(Math.max(...at));
    const url = relative.replace(/\/index\.html$/, "/").replace(/\.html$/, "/");
    if (!expected.includes(url)) continue;
    const html = await readFile(file, "utf8");
    for (const pattern of [
      { name: "CONFIRM", re: /CONFIRM/ },
      { name: "Confirmations raised", re: /Confirmations raised/ },
      {
        name: "empty Last reviewed",
        re: /Last reviewed:\s*(<\/|$)/,
      },
      { name: "spine badge", re: /page-badge/ },
      { name: "emergency strip", re: /emergency-strip/ },
    ]) {
      if (pattern.re.test(html))
        throw new Error(`${url}: forbidden output (${pattern.name})`);
    }
    found.add(url);
  }
}
for (const dir of [".next/server", ".vercel/output"]) await scan(dir);
const missing = expected.filter((url) => !found.has(url));
if (missing.length)
  throw new Error(`Missing prerendered care output: ${missing.join(", ")}`);
process.stdout.write(
  `Care pages check passed: ${found.size} routes clean of CONFIRM, confirmations sections, empty review dates, badge and strip markup\n`,
);
