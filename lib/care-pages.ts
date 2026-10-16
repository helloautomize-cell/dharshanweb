import {
  getPage,
  section,
  type PageContent,
  type PageSection,
} from "@/lib/content";

export const CARE_AREAS = [
  { slug: "pain-and-spine", name: "Pain and spine" },
  { slug: "neuro-rehabilitation", name: "Neuro rehabilitation" },
  { slug: "joints-and-sports", name: "Joints and sports" },
  { slug: "childrens-rehabilitation", name: "Children's rehabilitation" },
  { slug: "older-adults", name: "Older adults" },
] as const;

export type CareArea = (typeof CARE_AREAS)[number];

// Child-page order matches the approved "Care in this area" list on each
// area page (list order there; names in the list differ slightly from
// careTitle, so the order is kept explicit here).
export const AREA_CHILDREN: Record<CareArea["slug"], string[]> = {
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

export const CARE_PAGE_ROUTES = [
  ...CARE_AREAS.map((a) => `/${a.slug}/`),
  ...CARE_AREAS.flatMap((a) =>
    AREA_CHILDREN[a.slug].map((slug) => `/${a.slug}/${slug}/`),
  ),
];

export function careArea(url: string): CareArea | undefined {
  const first = url.split("/").filter(Boolean)[0];
  return CARE_AREAS.find((a) => a.slug === first);
}
export function isCareAreaUrl(url: string) {
  return CARE_AREAS.some((a) => url === `/${a.slug}/`);
}
export function isCareConditionUrl(url: string) {
  const parts = url.split("/").filter(Boolean);
  if (parts.length !== 2) return false;
  const slugs = AREA_CHILDREN[parts[0] as CareArea["slug"]];
  return !!slugs?.includes(parts[1]);
}
export function areaPages() {
  return CARE_AREAS.map((a) => getPage(`/${a.slug}/`)).filter(
    (p): p is PageContent => !!p,
  );
}
export function areaChildren(area: CareArea): PageContent[] {
  return AREA_CHILDREN[area.slug]
    .map((slug) => getPage(`/${area.slug}/${slug}/`))
    .filter((p): p is PageContent => !!p);
}

const CONFIRM = /CONFIRM/i;
export const hasConfirm = (text: string) => CONFIRM.test(text);

// A [CONFIRM] marks a fact that has no approved value, so the whole
// sentence or list item that carries it is removed.
export function cleanSentences(text: string): string {
  return text
    .replace(/\r/g, "")
    .split(/(?<=[.!?])(?=\s|$)/)
    .map((s) => s.trim())
    .filter((s) => s && !hasConfirm(s))
    .join(" ");
}
export function cleanBody(body: string): string {
  return body
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      if (/^(- |\d+\.\s|>)/.test(trimmed)) {
        if (hasConfirm(line)) return null;
        return line;
      }
      return hasConfirm(line) ? cleanSentences(line) : line;
    })
    .filter((line): line is string => line !== null && line !== "")
    .join("\n");
}

export function findSections(page: PageContent, re: RegExp): PageSection[] {
  return page.sections.filter((s) => re.test(s.heading));
}
export function sectionBody(page: PageContent, re: RegExp): string | null {
  const s = page.sections.find((sec) => re.test(sec.heading));
  return s ? cleanBody(s.body) : null;
}

const GLANCE_LABELS: Record<string, string> = {
  "Who it is for": "Who for",
  "Main treatments": "Treatments",
  "Common causes": "Causes",
  "At Rehabify": "Treatment",
};
export function atAGlance(page: PageContent) {
  const s = section(page, "At a glance");
  if (!s) return [];
  return s.body
    .split("\n")
    .filter((line) => line.trim().startsWith("- ") && !hasConfirm(line))
    .map((line) => {
      const item = line.trim().slice(2);
      const m = item.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
      if (!m) return null;
      const label = m[1].trim();
      let value = m[2].trim();
      value = value.charAt(0).toUpperCase() + value.slice(1);
      return { label: GLANCE_LABELS[label] ?? label, value };
    })
    .filter((row): row is { label: string; value: string } => !!row);
}

export function dashList(body: string | null): string[] {
  if (!body) return [];
  return body
    .split("\n")
    .filter((line) => line.trim().startsWith("- ") && !hasConfirm(line))
    .map((line) => line.trim().slice(2).replace(/\*\*/g, "").trim());
}

export function numberedSteps(body: string | null) {
  if (!body) return { steps: [], note: "" };
  const steps: { lead: string; text: string }[] = [];
  const rest: string[] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const item = trimmed.match(/^\d+\.\s+(.+)$/);
    if (item) {
      if (hasConfirm(item[1])) continue;
      const m = item[1].match(/^\*\*([^*]+)\*\*\.?\s*(.*)$/);
      if (m)
        steps.push({
          lead: m[1].trim().replace(/\.$/, ""),
          text: m[2].trim(),
        });
      else steps.push({ lead: "", text: item[1].replace(/\*\*/g, "").trim() });
    } else if (!hasConfirm(trimmed)) {
      rest.push(cleanSentences(trimmed));
    }
  }
  return { steps, note: rest.join(" ").trim() };
}

export function paragraphText(body: string | null): string {
  if (!body) return "";
  const paras: string[] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("- ") || /^\d+\.\s/.test(trimmed))
      continue;
    const cleaned = cleanSentences(trimmed.replace(/^>\s?/, ""));
    if (cleaned && cleaned !== "Callout:") paras.push(cleaned);
  }
  return paras.join(" ");
}

export function urgentText(page: PageContent): string {
  const s = page.sections.find((sec) => /when to get help/i.test(sec.heading));
  if (!s) return "";
  const quote = s.body
    .split("\n")
    .filter((line) => line.trim().startsWith(">"))
    .map((line) => line.trim().replace(/^>\s?/, ""))
    .join(" ");
  return cleanSentences(quote);
}

export function sourceList(body: string | null) {
  return (body ?? "")
    .split("\n")
    .filter((line) => line.trim().startsWith("- ") && !hasConfirm(line))
    .map((line) => {
      const text = line.trim().slice(2).trim();
      const comma = text.indexOf(",");
      if (comma === -1) return { publisher: "", title: text };
      return {
        publisher: text.slice(0, comma).trim(),
        title: text.slice(comma + 1).trim(),
      };
    });
}

const NUM_WORDS = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];
export const countWord = (n: number) => NUM_WORDS[n] ?? String(n);

export function accentTitle(h1: string): string {
  const raw = h1.trim();
  if (/\*[^*]+\*/.test(raw)) {
    return raw.replace(
      /\*([^*]+)\*/,
      (_m, inner: string) => `*${inner.replace(/\.*\s*$/, "")}.*`,
    );
  }
  const words = raw.split(/\s+/);
  const last = words.pop()!;
  return `${words.join(" ")} *${last.replace(/\.*$/, "")}.*`;
}
