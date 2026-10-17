import { readFileSync } from "node:fs";
import path from "node:path";
import { allRoutes, getPage } from "@/lib/content";
import { getGuides } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideRouteEntries, plainGuide } from "@/lib/guides";
import { cleanBody } from "@/lib/care-pages";

const DASHES = new RegExp("[\\u2013\\u2014]", "g");

export function entityStatement(): string {
  const facts = readFileSync(
    path.resolve("resources/docs/entity-facts.md"),
    "utf8",
  );
  const row = facts
    .split("\n")
    .find((line) => line.includes("Long description"));
  if (!row) throw new Error("entity-facts.md: Long description row missing");
  const statement = row.split("|")[2]?.trim();
  if (!statement || statement.includes("[CONFIRM"))
    throw new Error("entity-facts.md: Long description not confirmed");
  return statement;
}

const EXCLUDED = ["/thank-you/", "/404/"];

export function pageList() {
  const pages = allRoutes()
    .map((url) => getPage(url))
    .filter(
      (page): page is NonNullable<typeof page> =>
        !!page &&
        !page.meta.noindex &&
        !EXCLUDED.includes(page.meta.url) &&
        !page.meta.url.startsWith("/styleguide"),
    )
    .map((page) => ({
      url: page.meta.url,
      title: (page.meta.h1 ?? page.meta.title)
        .replaceAll("*", "")
        .replace(/\s*\|.*$/, ""),
      description: page.meta.description ?? "",
    }))
    .filter((page) => !page.url.startsWith("/guides/"));
  const guides = guideRouteEntries(getGuides()).map((guide) => ({
    url: guide.url,
    title: guide.title.replace(/\s*\|.*$/, ""),
    description: guide.description,
  }));
  return [...pages, ...guides];
}

export function cleanText(text: string): string {
  return cleanBody(text)
    .replace(DASHES, "-")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

export function pageMarkdown(url: string): string {
  const page = getPage(url);
  if (!page) return "";
  const title = (page.meta.h1 ?? page.meta.title)
    .replaceAll("*", "")
    .replace(/\s*\|.*$/, "");
  const parts = [
    `# ${title}`,
    `${GUIDE_BASE}${url}`,
    ...page.sections.map((section) =>
      section.heading === "_prelude"
        ? cleanText(section.body)
        : `## ${section.heading}\n${cleanText(section.body)}`,
    ),
  ];
  return parts.filter(Boolean).join("\n\n");
}

export function guideMarkdown(url: string): string {
  const guide = getGuides().find((entry) => entry.url === url);
  if (!guide) return "";
  const title = plainGuide(guide.h1);
  const parts = [
    `# ${title}`,
    `${GUIDE_BASE}${url}`,
    ...guide.inBrief.map((line) => cleanText(line)),
    ...guide.body.map(
      (section) => `## ${section.heading}\n${cleanText(section.body)}`,
    ),
    guide.faqs.length
      ? `## Common questions\n${guide.faqs
          .map((faq) => `### ${plainGuide(faq.q)}\n${cleanText(faq.a)}`)
          .join("\n\n")}`
      : "",
    guide.sources.length
      ? `## Sources\n${guide.sources
          .map((source) => `- ${source.publisher}. ${source.title}`)
          .join("\n")}`
      : "",
  ];
  return parts.filter(Boolean).join("\n\n");
}
