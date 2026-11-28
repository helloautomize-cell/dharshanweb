import { readFileSync } from "node:fs";
import path from "node:path";
import { allRoutes, getPage } from "@/lib/content";
import { getGuides, guideDoctor } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideRouteEntries, plainGuide } from "@/lib/guides";
import { cleanBody } from "@/lib/care-pages";

const DASHES = new RegExp("[\\u2013\\u2014]", "g");

export function entityStatement(): string {
  const facts = readFileSync(
    path.resolve("content/data/entity-facts.md"),
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

export function agencyCredit(): string {
  return "Website powered by Automize Media Labs (https://www.automizemedialabs.com/)";
}

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

const DROP_LINE = new RegExp(
  "^(?:" +
    [
      "Buttons?",
      "Fields?",
      "Behaviour",
      "Tiles?",
      "Also row",
      "Link under(?: the track)?",
      "Mobile short line(?: \\(under portrait\\))?",
      "Floating chip",
      "Goniometer widget",
      "Arch portrait caption",
      "Kicker",
      "Pill",
      "Fact row",
      "Key facts card",
      "Photo caption",
      "Help card",
      "Under the form",
      "Failure state",
      "Emergency line",
      "Links",
      "Callout",
      "Shared for all posts",
      "H1",
      "H2",
    ].join("|") +
    ")\\b",
  "i",
);
const VALUE_LINE = /^(Sub|Lede|Line|Text|Bio|Intro|Timeline|Three principles):\s*(.+)$/i;

export function cleanHeading(heading: string): string {
  return heading
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/^Hero$/i, "Overview")
    .replace(/^WHY REHABIFY$/i, "Why Rehabify")
    .replace(/^Marquee$/i, "Common conditions")
    .replace(/^FIND CARE BY CONCERN$/i, "Find care by concern")
    .replace(/^HOW WE CAN HELP$/i, "How we can help")
    .replace(/^YOUR RECOVERY$/i, "Your recovery")
    .replace(/^WAYS TO SEE US$/i, "Ways to see us")
    .replace(/^MEET YOUR DOCTOR$/i, "Meet your doctor")
    .replace(/^CONDITIONS A TO Z$/i, "Conditions A to Z")
    .replace(/^QUICK ANSWERS$/i, "Quick answers")
    .trim();
}

export function cleanText(text: string): string {
  return cleanBody(text)
    .replace(DASHES, "-")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function cleanExportBody(text: string): string {
  return cleanText(text)
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (DROP_LINE.test(trimmed)) return "";
      const value = trimmed.match(VALUE_LINE);
      if (value) return value[2].trim();
      return line;
    })
    .filter((line, index, lines) => line.trim() || lines[index - 1]?.trim())
    .join("\n")
    .replace(/^Cards \(group · title · line\):$/gm, "")
    .replace(/^Groups as in .+$/gm, "")
    .replace(/Quote tile:\s*/g, "")
    .replace(/ · TRY IT/g, "")
    .replace(/ \(tickable, labelled "example"\)/g, "")
    .replace(/ · Ring: "2 of 4 goals reached"/g, "")
    .replace(/ \(switch\)/g, "")
    .replace(/\[(?:Book|Request|See|Where does it hurt)[^\]]*\]/g, "")
    .replace(/\*\*\d+\s*·\s*([^*]+)\*\*/g, "**$1**")
    .replace(/ · Byline:/g, " -")
    .replace(/\s*·\s*(?=\n|$)/gm, "")
    .replace(/\n{3,}/g, "\n\n")
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
    ...page.sections
      .map((section) => {
        const body = cleanExportBody(section.body);
        if (!body) return "";
        return section.heading === "_prelude"
          ? body
          : `## ${cleanHeading(section.heading)}\n${body}`;
      })
      .filter(Boolean),
  ];
  return parts.filter(Boolean).join("\n\n");
}

export function guideMarkdown(url: string): string {
  const guide = getGuides().find((entry) => entry.url === url);
  if (!guide) return "";
  const title = plainGuide(guide.h1);
  const author = guideDoctor(guide.author);
  const reviewer = guideDoctor(guide.reviewedBy);
  const details = [
    `Author: ${author.name}`,
    guide.author === guide.reviewedBy
      ? `Medical review: ${reviewer.name}`
      : `Medically reviewed by: ${reviewer.name}`,
    guide.lastReviewed ? `Last reviewed: ${guide.lastReviewed}` : "",
    guide.dateModified ? `Last updated: ${guide.dateModified}` : "",
    `Reading time: ${guide.readingTime}`,
  ].filter(Boolean);
  const parts = [
    `# ${title}`,
    `${GUIDE_BASE}${url}`,
    details.join("\n"),
    ...guide.inBrief.map((line) => cleanText(line)),
    ...guide.body.map(
      (section) =>
        `## ${cleanHeading(section.heading)}\n${cleanExportBody(section.body)}`,
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
