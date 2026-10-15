import { allRoutes, getPage } from "@/lib/content";

export type CareTopic = {
  href: string;
  title: string;
  summary: string;
  keywords: string[];
  area: string;
};
export type CareArea = {
  id: string;
  href: string;
  title: string;
  summary: string;
  audience: string;
  firstStep: string;
  topics: CareTopic[];
};
export type CareRegion = {
  name: string;
  x: number;
  y: number;
  links: { href: string; title: string; line: string }[];
};

export function getCareAreas(): CareArea[] {
  const pages = allRoutes().map((url) => getPage(url)!.meta);
  return pages
    .filter((meta) => meta.areaId)
    .sort((a, b) => a.careOrder! - b.careOrder!)
    .map((hub) => {
      const title = hub.h1!.replaceAll("*", "");
      return {
        id: hub.areaId!,
        href: hub.url,
        title,
        summary: hub.summary!,
        audience: hub.audience!,
        firstStep: hub.firstStep!,
        topics: pages
          .filter(
            (meta) => meta.url.startsWith(hub.url) && meta.url !== hub.url,
          )
          .map((meta) => ({
            href: meta.url,
            title: meta.careTitle!,
            summary: meta.summary!,
            keywords: meta.keywords!,
            area: title,
          })),
      };
    });
}

export function getCareRegions(topics: CareTopic[]): CareRegion[] {
  const bySlug = (slug: string, line?: string) => {
    const topic = topics.find((item) => item.href.endsWith(`/${slug}/`));
    if (!topic) throw new Error(`Missing care topic: ${slug}`);
    return { href: topic.href, title: topic.title, line: line ?? topic.area };
  };
  return [
    {
      name: "Head",
      x: 50,
      y: 7,
      links: [bySlug("stroke"), bySlug("head-injury"), bySlug("parkinsons")],
    },
    {
      name: "Neck",
      x: 50,
      y: 14.5,
      links: [bySlug("neck-pain"), bySlug("image-guided-injections")],
    },
    {
      name: "Shoulder",
      x: 64,
      y: 18.5,
      links: [
        bySlug("shoulder-pain"),
        bySlug("stroke", "Shoulder pain after a stroke"),
        bySlug("sports-injuries"),
      ],
    },
    {
      name: "Arm and hand",
      x: 21,
      y: 47,
      links: [
        bySlug("stroke", "Arm and hand use"),
        bySlug("spasticity"),
        bySlug("after-fracture-or-surgery"),
      ],
    },
    {
      name: "Lower back",
      x: 50,
      y: 37,
      links: [
        bySlug("back-pain"),
        bySlug("sciatica"),
        bySlug("image-guided-injections"),
      ],
    },
    {
      name: "Hip",
      x: 39,
      y: 44,
      links: [
        bySlug("after-fracture-or-surgery", "Hip replacement and fractures"),
        bySlug("osteoporosis"),
        bySlug("falls-and-balance"),
      ],
    },
    {
      name: "Knee",
      x: 42,
      y: 62.5,
      links: [
        bySlug("knee-pain"),
        bySlug("sports-injuries"),
        bySlug("prp-and-prolotherapy"),
      ],
    },
    {
      name: "Feet and balance",
      x: 57,
      y: 92,
      links: [
        bySlug("falls-and-balance"),
        bySlug("prosthetic-rehab"),
        bySlug("cerebral-palsy", "Toe walking in children"),
      ],
    },
  ];
}
