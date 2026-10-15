import type { getGuides, guideDoctor } from "./guide-content.mjs";

export type Guide = ReturnType<typeof getGuides>[number];
export type GuideDoctor = ReturnType<typeof guideDoctor>;
export type GuideCardData = Pick<
  Guide,
  | "slug"
  | "url"
  | "title"
  | "h1"
  | "description"
  | "topic"
  | "readingTime"
  | "keywords"
  | "featured"
> & { reviewer: GuideDoctor };
export const GUIDE_BASE = "https://www.rehabify.in";
export const guideTopics = [
  { id: "basics", slug: "understanding-rehab", label: "Understanding rehab" },
  { id: "pain", slug: "pain-and-spine", label: "Pain and spine" },
  { id: "neuro", slug: "neuro-rehabilitation", label: "Neuro rehabilitation" },
  { id: "children", slug: "children", label: "Children" },
  { id: "older", slug: "older-adults", label: "Older adults" },
] as const;
export type GuideTopic = (typeof guideTopics)[number]["id"];
export const guideIndexMeta = {
  title: "Guides on Pain, Movement and Recovery | Rehabify",
  description:
    "Plain answers about pain, movement and recovery, written and medically reviewed by a rehabilitation doctor in Bengaluru.",
  h1: "Plain answers about pain, movement and *recovery*.",
  url: "/guides/",
};
export function guideTopic(id: string) {
  return guideTopics.find((topic) => topic.id === id)!;
}
export function guideTopicMeta(topic: (typeof guideTopics)[number]) {
  const words = topic.label.split(" ");
  words[words.length - 1] = `*${words.at(-1)}*`;
  return {
    title: `${topic.label} Guides | Rehabify`,
    description: `Guides on ${topic.label.toLowerCase()} from a rehabilitation doctor in Bengaluru, medically reviewed.`,
    h1: words.join(" "),
    url: `/guides/topic/${topic.slug}/`,
  };
}
export function filterGuides(
  guides: GuideCardData[],
  topic: string,
  query: string,
) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return guides.filter((guide) => {
    const haystack = [
      guide.title,
      guide.h1.replaceAll("*", ""),
      guide.description,
      guideTopic(guide.topic).label,
      ...guide.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return (
      (topic === "all" || guide.topic === topic) &&
      words.every((word) => haystack.includes(word))
    );
  });
}
export function guideRouteEntries(guides: Guide[]) {
  return [
    guideIndexMeta,
    ...guideTopics.map(guideTopicMeta),
    ...guides.map(({ url, title, description, dateModified }) => ({
      url,
      title,
      description,
      dateModified,
    })),
  ];
}
export function guideDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
export function plainGuide(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replaceAll("*", "")
    .replace(/^>\s?/gm, "");
}
