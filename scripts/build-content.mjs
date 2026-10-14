// Parses resources/docs/new-website-content.md into content/pages/**.mdx.
// Each file keeps the page's YAML block as frontmatter and its ### sections
// verbatim, so content/*.mdx stays the single human-reviewed source.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const source = await readFile("resources/docs/new-website-content.md", "utf8");

function parseValue(raw) {
  raw = raw.trim();
  if (raw.startsWith('"') && raw.endsWith('"')) return raw.slice(1, -1);
  if (raw.startsWith("[") && raw.endsWith("]"))
    return raw
      .slice(1, -1)
      .split(",")
      .map((x) => parseValue(x))
      .filter((x) => x !== "");
  if (raw.startsWith("{") && raw.endsWith("}")) {
    const obj = {};
    let depth = 0;
    let start = 0;
    const inner = raw.slice(1, -1);
    const parts = [];
    for (let i = 0; i <= inner.length; i++) {
      const c = inner[i];
      if (c === "[" || c === "{") depth++;
      if (c === "]" || c === "}") depth--;
      if ((c === "," && depth === 0) || i === inner.length) {
        parts.push(inner.slice(start, i));
        start = i + 1;
      }
    }
    for (const part of parts) {
      const idx = part.indexOf(":");
      if (idx === -1) continue;
      obj[part.slice(0, idx).trim()] = parseValue(part.slice(idx + 1));
    }
    return obj;
  }
  return raw;
}

export function parseFrontmatter(yaml) {
  const meta = {};
  // Join continuation lines so wrapped [arrays] / {maps} parse correctly.
  const lines = [];
  for (const line of yaml.split("\n")) {
    const open = (lines.at(-1)?.match(/[[{]/g) ?? []).length;
    const close = (lines.at(-1)?.match(/[\]}]/g) ?? []).length;
    if (lines.length && open > close)
      lines[lines.length - 1] += " " + line.trim();
    else lines.push(line);
  }
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = parseValue(line.slice(idx + 1));
  }
  return meta;
}

const pages = [];
const pattern = /^## (?:Page|Post) \d+\w* · (.+)$/gm;
const heads = [];
let match;
while ((match = pattern.exec(source)))
  heads.push({ title: match[1].trim(), at: match.index });
for (let i = 0; i < heads.length; i++) {
  const end = heads[i + 1] ? heads[i + 1].at : source.length;
  const block = source.slice(heads[i].at, end);
  const yamlMatch = block.match(/```yaml\n([\s\S]*?)```/);
  const fallbackMeta = {
    "Thank you (noindex)": {
      title: "Thank you | Rehabify",
      description: "We have received your request and will confirm your time.",
      url: "/thank-you/",
      noindex: true,
    },
    404: {
      title: "Page not found | Rehabify",
      description: "The page may have moved. Try these links instead.",
      url: "/404/",
      noindex: true,
    },
  };
  const meta = yamlMatch
    ? parseFrontmatter(yamlMatch[1])
    : (fallbackMeta[heads[i].title] ??
      (() => {
        throw new Error(`No YAML block in: ${heads[i].title}`);
      })());
  const body = (
    yamlMatch
      ? block.slice(yamlMatch.index + yamlMatch[0].length)
      : block.replace(/^## (?:Page|Post) \d+\w* · .+\n/, "")
  ).trim();
  // Drop trailing "part" headers and horizontal rules.
  const clean = body
    .split("\n")
    .filter((line) => !line.startsWith("# Part") && line.trim() !== "---")
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!meta.url) throw new Error(`No url in: ${heads[i].title}`);
  if (!meta.title) throw new Error(`No title in: ${heads[i].title}`);
  if (!meta.description)
    throw new Error(`No description in: ${heads[i].title}`);
  pages.push({ meta, body: clean, heading: heads[i].title });
}

const required = ["title", "description", "url"];
for (const page of pages)
  for (const field of required)
    if (!page.meta[field])
      throw new Error(`Missing ${field} for ${page.heading}`);

for (const page of pages) {
  const url = page.meta.url;
  const rel = url === "/" ? "home" : url.replace(/^\/|\/$/g, "");
  const file = path.resolve("content/pages", `${rel}.mdx`);
  await mkdir(path.dirname(file), { recursive: true });
  const yaml = Object.entries(page.meta)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
  await writeFile(file, `---\n${yaml}\n---\n\n${page.body}\n`);
}

const manifest = pages.map(({ meta }) => ({
  url: meta.url,
  title: meta.title,
  description: meta.description,
  h1: meta.h1 ?? null,
  badge: meta.badge ?? null,
  reviewer: meta.reviewer ?? null,
  lastReviewed: meta.lastReviewed ?? null,
  lastUpdated: meta.lastUpdated ?? null,
  schema: meta.schema ?? null,
  about: meta.about ?? null,
  related: meta.related ?? null,
  posts: meta.posts ?? null,
  author: meta.author ?? null,
  reviewedBy: meta.reviewedBy ?? null,
  datePublished: meta.datePublished ?? null,
  dateModified: meta.dateModified ?? null,
  readingTime: meta.readingTime ?? null,
  links: meta.links ?? null,
}));
await writeFile(
  "content/manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
process.stdout.write(
  `Parsed ${pages.length} pages into content/pages/. Routes:\n${manifest.map((p) => p.url).join("\n")}\n`,
);
