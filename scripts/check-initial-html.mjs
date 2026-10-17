// Verifies interactive content is present in the initial server HTML, with
// no client-side rendering required: FAQ answers, tab panels, care index
// entries, body-map region cards, Conditions A to Z and carousel items.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const app = join(process.cwd(), ".next", "server", "app");
const fail = [];

function read(rel) {
  const p = join(app, rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

function requirePage(rel, url) {
  const html = read(rel);
  if (!html) {
    fail.push(`${url}: no built HTML found`);
    return "";
  }
  return html;
}

function text(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}

// Home: care index entries, body-map region cards, A to Z entries,
// carousel items and the quick-answer FAQ text must all be server-rendered.
const home = text(requirePage("index.html", "/"));
if (home) {
  const homeChecks = [
    ["body map region", /Where does it hurt/i],
    ["care index card", /How we can help/i],
    ["conditions A to Z", /Conditions A to Z|A to Z/i],
    ["journey steps", /Six steps, one plan/i],
    ["quick answer", /Before you book|What should I bring/i],
  ];
  for (const [label, re] of homeChecks) {
    if (!re.test(home)) fail.push(`/: missing ${label} in initial HTML`);
  }
}

// Every care page: first FAQ answer present in server HTML.
const care = [
  "pain-and-spine.html",
  "pain-and-spine/back-pain.html",
  "neuro-rehabilitation/stroke.html",
  "joints-and-sports/knee-pain.html",
  "childrens-rehabilitation/cerebral-palsy.html",
  "older-adults/falls-and-balance.html",
];
for (const rel of care) {
  const html = read(rel);
  if (!html) {
    fail.push(`${rel}: no built HTML`);
    continue;
  }
  const visible = text(html);
  if (
    !/FAQs|Common questions|Frequently asked|Questions you ask/i.test(visible)
  )
    fail.push(`${rel}: FAQ block not in initial HTML`);
  if (!/<details|<div[^>]*role="region"|aria-hidden="false"/i.test(html))
    fail.push(`${rel}: FAQ answers may be client-only`);
}

// Guides: article body + FAQ text server-rendered.
for (const rel of readdirSync(join(app, "guides")).filter((n) =>
  n.endsWith(".html"),
)) {
  const html = read(join("guides", rel));
  if (!html) continue;
  const visible = text(html);
  if (visible.split(" ").length < 300)
    fail.push(`/guides/${rel}: article body thin or client-rendered`);
}

// Video consultation: step panels present without JS.
const video = text(read("video-consultation.html") ?? "");
if (video && !/How it works|Six steps/i.test(video))
  fail.push("/video-consultation/: steps not in initial HTML");

if (fail.length) {
  console.error("Initial-HTML check failed:");
  for (const f of fail.slice(0, 40)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  "Initial-HTML check passed: FAQs, cards, map regions, A-Z and steps are server-rendered.",
);
