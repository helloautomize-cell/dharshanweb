import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { getPage, parseContentFile } from "./content.ts";

const text = z.string().trim().min(1);
const date = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (value) =>
        !Number.isNaN(Date.parse(value)) &&
        new Date(value).toISOString().slice(0, 10) === value,
      "Invalid calendar date",
    )
    .optional(),
);
const doctorId = z.enum(["dr-dharshan-n-a", "dr-selina-kh"]);
const group = z.object({ title: text, items: z.array(text).min(1) });
export const guideSchema = z
  .object({
    title: text.max(60),
    description: text.max(160),
    slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    url: text,
    h1: text.refine(
      (value) =>
        (value.match(/\*[^*\s]+\*/g) ?? []).length === 1 &&
        (value.match(/\*/g) ?? []).length === 2,
      "Mark exactly one accent word",
    ),
    topic: z.enum(["basics", "pain", "neuro", "children", "older"]),
    readingTime: text.regex(/^\d+ min$/),
    author: doctorId,
    reviewedBy: doctorId,
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
    datePublished: date,
    dateModified: date,
    lastReviewed: date,
    about: z
      .object({
        "@type": z.literal("MedicalCondition"),
        name: text,
        alternateName: z.array(text).optional(),
      })
      .optional(),
    links: z.array(text.regex(/^\/(?!\/)[^?#]*\/$|^\/$/)),
    keywords: z.array(text).min(1),
    inBrief: z.array(text).min(1),
    keyTakeaways: z.array(text).min(1).optional(),
    relatedIntro: text.optional(),
    faqs: z.array(z.object({ q: text, a: text })).min(1),
    sources: z
      .array(
        z.object({
          publisher: text,
          title: text,
          url: z.string().url().optional(),
        }),
      )
      .min(1),
    emergency: text,
    emergencyHeading: text,
    relatedCare: z
      .array(z.object({ label: text, href: text, description: text }))
      .min(1),
    relatedGuides: z.array(text).length(2).optional(),
    body: z
      .array(
        z.object({
          heading: text,
          id: text,
          body: text,
          checklist: z.boolean(),
          intro: z.string(),
          groups: z.array(group),
        }),
      )
      .min(1),
  })
  .superRefine((guide, context) => {
    if (guide.url !== `/guides/${guide.slug}/`)
      context.addIssue({
        code: "custom",
        message: "Guide URL must match its slug",
      });
    if (guide.featured && guide.slug !== "what-is-a-physiatrist")
      context.addIssue({
        code: "custom",
        message: "Only the introductory guide may be featured",
      });
    if (
      guide.keyTakeaways &&
      guide.slug !== "making-a-home-safer-against-falls"
    )
      context.addIssue({
        code: "custom",
        message: "Only the falls guide has key takeaways",
      });
    if (/CONFIRM/.test(JSON.stringify(guide)))
      context.addIssue({
        code: "custom",
        message: "Guide contains an unresolved placeholder",
      });
    const ids = guide.body.map((section) => section.id);
    if (new Set(ids).size !== ids.length)
      context.addIssue({
        code: "custom",
        message: "Duplicate section anchors",
      });
  });
export function guideAnchor(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
export function guideGroups(body) {
  const lines = body.split("\n");
  const first = lines.findIndex((line) => /^\*\*[^*]+\*\*$/.test(line.trim()));
  if (first < 0) return { checklist: false, intro: "", groups: [] };
  const groups = [];
  for (const line of lines.slice(first)) {
    const heading = line.trim().match(/^\*\*([^*]+)\*\*$/);
    if (heading) groups.push({ title: heading[1], items: [] });
    else if (line.startsWith("- ") && groups.length)
      groups.at(-1).items.push(line.slice(2));
    else if (line.trim()) return { checklist: false, intro: "", groups: [] };
  }
  return groups.every((item) => item.items.length)
    ? {
        checklist: true,
        intro: lines.slice(0, first).join("\n").trim(),
        groups,
      }
    : { checklist: false, intro: "", groups: [] };
}
export function getGuides() {
  const dir = path.resolve("content/pages/guides");
  const guides = readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const page = parseContentFile(readFileSync(path.join(dir, file), "utf8"));
      const meta = page.meta;
      const find = (pattern) =>
        page.sections.find((section) => pattern.test(section.heading));
      const faqBody = find(/^FAQs?$/i)?.body ?? "";
      const faqs = [
        ...faqBody.matchAll(/^\d+\.\s*\*\*(.+?)\*\*\s*(.+)$/gm),
      ].map((match) => ({ q: match[1], a: match[2] }));
      const sources = (find(/^Sources$/i)?.body ?? "")
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => {
          const comma = line.indexOf(",");
          return {
            publisher: line.slice(2, comma < 0 ? undefined : comma).trim(),
            title: comma < 0 ? "" : line.slice(comma + 1).trim(),
          };
        });
      const urgent = find(/urgently|warning signs to act on/i);
      const body = page.sections
        .filter(
          (section) =>
            !/^(?:In brief|Intro|FAQs?|Sources|When to get help urgently|The warning signs to act on now)/i.test(
              section.heading,
            ),
        )
        .map((section) => ({
          ...section,
          id: guideAnchor(section.heading),
          ...guideGroups(section.body),
        }));
      const relatedCare = (meta.links ?? [])
        .filter((href) =>
          /^\/(?:care|pain-and-spine|neuro-rehabilitation|joints-and-sports|childrens-rehabilitation|older-adults)\//.test(
            href,
          ),
        )
        .map((href) => {
          const care = getPage(href);
          if (!care) throw new Error(`${file}: unknown care route ${href}`);
          return {
            href,
            label: (
              care.meta.careTitle ??
              care.meta.h1 ??
              care.meta.title.split("|")[0]
            )
              .replaceAll("*", "")
              .trim(),
            description: care.meta.description,
          };
        });
      const result = guideSchema.safeParse({
        ...meta,
        slug: file.replace(/\.mdx$/, ""),
        faqs,
        sources,
        body,
        emergency: urgent?.body
          .replace(/^Callout:\s*\n?/, "")
          .replace(/^>\s?/gm, "")
          .trim(),
        emergencyHeading: urgent?.heading,
        relatedCare,
      });
      if (!result.success) throw new Error(`${file}: ${result.error.message}`);
      return result.data;
    })
    .sort(
      (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
    );
  if (
    guides.length !== 9 ||
    new Set(guides.map((guide) => guide.slug)).size !== guides.length
  )
    throw new Error("Expected nine unique guides");
  for (const guide of guides) {
    if (!getPage(`/${guide.author}/`) || !getPage(`/${guide.reviewedBy}/`))
      throw new Error(`Unknown doctor in ${guide.slug}`);
    for (const slug of guide.relatedGuides ?? [])
      if (slug === guide.slug || !guides.some((other) => other.slug === slug))
        throw new Error(`Invalid related guide ${slug}`);
  }
  return guides;
}
export function getGuide(slug) {
  return getGuides().find((guide) => guide.slug === slug);
}
export function guideDoctor(id) {
  const meta = getPage(`/${id}/`)?.meta;
  if (!meta?.doctor || !meta.avatar || !meta.credentials)
    throw new Error(`Incomplete guide reviewer ${id}`);
  return {
    id,
    name: meta.h1.replaceAll("*", ""),
    href: meta.url,
    avatar: `/images/doctors/${meta.avatar}-160.jpg`,
    credentials: meta.credentials,
    shortCredentials: meta.doctor.videoCredentials ?? meta.credentials,
  };
}
