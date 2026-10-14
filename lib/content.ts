import { readFileSync } from "node:fs";
import path from "node:path";

export type PageMeta = {
  url: string;
  title: string;
  description: string;
  h1?: string;
  badge?: string;
  reviewer?: string;
  lastReviewed?: string;
  lastUpdated?: string;
  schema?: string | string[];
  about?: Record<string, unknown>;
  related?: string[];
  posts?: string[];
  author?: string;
  reviewedBy?: string;
  datePublished?: string;
  dateModified?: string;
  readingTime?: string;
  links?: string[];
  noindex?: boolean;
};
export type PageSection = { heading: string; body: string };
export type PageContent = { meta: PageMeta; sections: PageSection[] };

export function parseContentFile(raw: string): PageContent {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("content file missing frontmatter");
  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = JSON.parse(line.slice(idx + 1).trim());
  }
  const sections: PageSection[] = [];
  let current: PageSection | null = null;
  for (const line of match[2].split("\n")) {
    const head = line.match(/^### (.+)$/);
    if (head) {
      current = { heading: head[1].trim(), body: "" };
      sections.push(current);
    } else if (current) current.body += line + "\n";
    else if (line.trim())
      sections.push({ heading: "_prelude", body: line + "\n" });
  }
  for (const s of sections) s.body = s.body.trim();
  return { meta: meta as PageMeta, sections };
}

const manifest = JSON.parse(
  readFileSync(path.resolve("content/manifest.json"), "utf8"),
) as PageMeta[];
export function allRoutes(): string[] {
  return manifest.map((p) => p.url);
}
export function routeExists(url: string): boolean {
  return manifest.some((p) => p.url === url);
}
export function knownLinks(urls?: string[]): string[] {
  return (urls ?? []).filter(routeExists);
}
export function getPage(url: string): PageContent | null {
  const rel = url === "/" ? "home" : url.replace(/^\/|\/$/g, "");
  const file = path.resolve("content/pages", `${rel}.mdx`);
  try {
    return parseContentFile(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}
export function section(
  page: PageContent,
  name: string,
): PageSection | undefined {
  return page.sections.find(
    (s) => s.heading.toLowerCase() === name.toLowerCase(),
  );
}
export function sectionsMatching(
  page: PageContent,
  pattern: RegExp,
): PageSection[] {
  return page.sections.filter((s) => pattern.test(s.heading));
}
