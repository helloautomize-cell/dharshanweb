import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

function parts(value) {
  const out = [];
  let start = 0,
    depth = 0,
    quoted = false;
  for (let i = 0; i <= value.length; i++) {
    const char = value[i];
    if (char === '"' && value[i - 1] !== "\\") quoted = !quoted;
    if (!quoted && (char === "[" || char === "{")) depth++;
    if (!quoted && (char === "]" || char === "}")) depth--;
    if (i === value.length || (char === "," && !quoted && depth === 0)) {
      out.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  return out;
}
function value(raw) {
  raw = raw.trim();
  if (raw.startsWith('"')) return JSON.parse(raw);
  if (raw.startsWith("["))
    return parts(raw.slice(1, -1)).filter(Boolean).map(value);
  if (raw.startsWith("{"))
    return Object.fromEntries(
      parts(raw.slice(1, -1)).map((entry) => {
        const at = entry.indexOf(":");
        return [entry.slice(0, at).trim(), value(entry.slice(at + 1))];
      }),
    );
  return raw;
}
const posts = [];
for (const file of [
  "resources/docs/new-website-content.md",
  "resources/docs/posts-batch-2.md",
]) {
  const source = (await readFile(file, "utf8")).replaceAll("\r\n", "\n");
  const heads = [...source.matchAll(/^## Post (\d+) · .+$/gm)];
  for (let i = 0; i < heads.length; i++) {
    const block = source
      .slice(heads[i].index, heads[i + 1]?.index ?? source.length)
      .split(/^# Part |^### Confirmations raised/m)[0];
    const match = block.match(/```yaml\n([\s\S]*?)```/);
    if (!match) throw new Error(`No post metadata: ${heads[i][0]}`);
    const meta = Object.fromEntries(
      match[1]
        .trim()
        .split("\n")
        .map((line) => {
          const at = line.indexOf(":");
          return [line.slice(0, at), value(line.slice(at + 1))];
        }),
    );
    const body = block
      .slice(match.index + match[0].length)
      .replace(/^Medically reviewed by .+$/gm, "")
      .replace(/^---\s*$/gm, "")
      .trim()
      .replace(/^### Intro \(answer-first\)$/m, "### In brief");
    posts.push({ meta, body, order: Number(heads[i][1]) });
  }
}
posts.sort((a, b) => a.order - b.order);
if (posts.length !== 9 || posts.some((post, index) => post.order !== index + 1))
  throw new Error("Expected Posts 1 to 9 exactly once");
const oldPrefix = `/${posts[0].meta.url.split("/").filter(Boolean)[0]}/`;
const manifest = JSON.parse(
  await readFile("content/manifest.json", "utf8"),
).filter(
  (entry) =>
    !entry.url.startsWith(oldPrefix) && !entry.url.startsWith("/guides/"),
);
const topics = [
  { id: "basics", slug: "understanding-rehab", label: "Understanding rehab" },
  { id: "pain", slug: "pain-and-spine", label: "Pain and spine" },
  { id: "neuro", slug: "neuro-rehabilitation", label: "Neuro rehabilitation" },
  { id: "children", slug: "children", label: "Children" },
  { id: "older", slug: "older-adults", label: "Older adults" },
];
const indexMeta = {
  url: "/guides/",
  title: "Guides on Pain, Movement and Recovery | Rehabify",
  description:
    "Plain answers about pain, movement and recovery, written and medically reviewed by a rehabilitation doctor in Bengaluru.",
  h1: "Plain answers about pain, movement and *recovery*.",
};
manifest.push(
  indexMeta,
  ...topics.map((topic) => ({
    url: `/guides/topic/${topic.slug}/`,
    title: `${topic.label} Guides | Rehabify`,
    description: `Guides on ${topic.label.toLowerCase()} from a rehabilitation doctor in Bengaluru, medically reviewed.`,
    h1: topic.label,
  })),
);
await mkdir("content/pages/guides", { recursive: true });
for (const post of posts) {
  const meta = { ...post.meta };
  const slug = meta.url.split("/").filter(Boolean).at(-1);
  meta.url = `/guides/${slug}/`;
  meta.topic =
    post.order === 1
      ? "basics"
      : post.order === 2
        ? "neuro"
        : post.order === 3
          ? "pain"
          : post.order <= 6
            ? "children"
            : "older";
  meta.featured = post.order === 1;
  meta.order = post.order;
  for (const key of ["datePublished", "dateModified", "lastReviewed"])
    meta[key] = /^\d{4}-\d{2}-\d{2}$/.test(meta[key] ?? "") ? meta[key] : "";
  if (meta.about)
    meta.about = {
      "@type": "MedicalCondition",
      name: meta.about.name,
      ...(meta.about.alternateName
        ? { alternateName: meta.about.alternateName }
        : {}),
    };
  meta.keywords = [
    ...new Set(
      [
        meta.about?.name,
        ...(meta.about?.alternateName ?? []),
        ...meta.h1
          .replaceAll("*", "")
          .toLowerCase()
          .split(/[^a-z0-9]+/),
      ].filter(Boolean),
    ),
  ];
  const brief = post.body.split("### In brief\n")[1]?.split("\n### ")[0].trim();
  if (!brief) throw new Error(`Missing In brief for ${slug}`);
  meta.inBrief = brief.startsWith("- ")
    ? brief
        .split("\n")
        .filter(Boolean)
        .map((line) => line.replace(/^- /, ""))
    : [brief];
  if (post.order === 7) {
    meta.relatedIntro =
      "More on staying steady and strong, from the same doctor.";
    meta.keyTakeaways = [
      "Start with the bathroom and the path from the bed to the toilet at night.",
      "Grab rails, non-slip floors, night lights and firm footwear cost little and lower the risk.",
      "Remove loose mats and clutter, and mark steps and thresholds so they are easy to see.",
      "Pair home changes with strength and balance exercise, a medicine review and eye checks.",
      "After a fall with a head injury, severe pain or new weakness, call 108 or 112.",
    ];
  }
  const frontmatter = Object.entries(meta)
    .map(([key, data]) => `${key}: ${JSON.stringify(data)}`)
    .join("\n");
  await writeFile(
    path.join("content/pages/guides", `${slug}.mdx`),
    `---\n${frontmatter}\n---\n\n${post.body}\n`,
  );
  manifest.push(meta);
}
await writeFile(
  "content/manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
process.stdout.write(
  `Imported ${posts.length} guides from the two approved sources\n`,
);
