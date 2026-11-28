import type { MetadataRoute } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getGuides } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideTopics } from "@/lib/guides";
import { latestGitDate } from "@/lib/gitdate";

type ManifestPage = {
  url: string;
  lastReviewed?: string | null;
  lastUpdated?: string | null;
  dateModified?: string | null;
  datePublished?: string | null;
  noindex?: boolean;
};

type Frequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

const EXCLUDED = new Set(["/404/", "/thank-you/"]);

const confirmedDate = (value?: string | null) =>
  value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;

function contentFile(url: string) {
  const rel = url === "/" ? "home" : url.replace(/^\/|\/$/g, "");
  return `content/pages/${rel}.mdx`;
}

function routeFiles(url: string) {
  const files = [contentFile(url)];
  if (url === "/") files.push("app/(site)/page.tsx");
  if (url === "/contact/")
    files.push("app/(site)/contact/page.tsx", "components/booking-form.tsx");
  if (url === "/video-consultation/")
    files.push("components/pages/video-page.tsx");
  return files;
}

function priorityFor(url: string): number {
  if (url === "/") return 1;
  if (/^\/(pain-and-spine|neuro-rehabilitation|joints-and-sports|childrens-rehabilitation|older-adults)\/[^/]+\/$/.test(url))
    return 0.9;
  if (/^\/(pain-and-spine|neuro-rehabilitation|joints-and-sports|childrens-rehabilitation|older-adults)\/$/.test(url))
    return 0.85;
  if (url === "/care/") return 0.9;
  if (/^\/guides\/[^/]+\/$/.test(url) && !url.startsWith("/guides/topic/"))
    return 0.8;
  if (url === "/guides/") return 0.8;
  if (url.startsWith("/guides/topic/")) return 0.6;
  if (/^\/dr-[^/]+\/$/.test(url)) return 0.8;
  if (["/contact/", "/video-consultation/"].includes(url)) return 0.8;
  if (["/doctors/", "/faqs/", "/plan-your-visit/"].includes(url)) return 0.7;
  if (["/privacy-policy/", "/terms-of-use/", "/accessibility/"].includes(url))
    return 0.2;
  if (["/medical-disclaimer/", "/editorial-policy/", "/patient-rights/", "/appointments-cancellation-refund/"].includes(url))
    return 0.3;
  return 0.6;
}

function frequencyFor(url: string): Frequency {
  if (url === "/" || url === "/care/" || url.startsWith("/guides/"))
    return "monthly";
  if (["/contact/", "/video-consultation/", "/doctors/", "/faqs/"].includes(url))
    return "monthly";
  return "yearly";
}


function guideContentFile(url: string) {
  return `content/pages/guides/${url.replace(/^\/guides\/|\/$/g, "")}.mdx`;
}

function doctorImages(url: string): string[] {
  if (url === "/dr-dharshan-n-a/")
    return [
      `${GUIDE_BASE}/images/doctors/dr-dharshan-hero.jpg`,
      `${GUIDE_BASE}/images/doctors/dr-dharshan-portrait.jpg`,
    ];
  if (url === "/dr-selina-kh/")
    return [
      `${GUIDE_BASE}/images/doctors/dr-selina-hero.jpg`,
      `${GUIDE_BASE}/images/doctors/dr-selina-portrait.jpg`,
    ];
  return [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const manifest = JSON.parse(
    readFileSync(path.resolve("content/manifest.json"), "utf8"),
  ) as ManifestPage[];
  const guides = getGuides();
  const guideUrls = new Set(guides.map((guide) => guide.url));

  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const put = (entry: MetadataRoute.Sitemap[number]) => {
    entries.set(entry.url, entry);
  };

  const guideLastModified = (url: string) => {
    const guide = guides.find((entry) => entry.url === url);
    if (!guide) return null;
    return (
      confirmedDate(guide.dateModified) ??
      confirmedDate(guide.datePublished) ??
      latestGitDate([guideContentFile(url)])
    );
  };
  const allGuideDates = guides
    .map((guide) => guideLastModified(guide.url))
    .filter((date): date is string => !!date)
    .sort();

  for (const page of manifest) {
    if (
      page.noindex ||
      EXCLUDED.has(page.url) ||
      page.url.startsWith("/styleguide") ||
      guideUrls.has(page.url)
    )
      continue;

    let lastModified =
      confirmedDate(page.dateModified) ??
      confirmedDate(page.lastReviewed) ??
      confirmedDate(page.lastUpdated) ??
      confirmedDate(page.datePublished) ??
      latestGitDate(routeFiles(page.url));

    if (page.url === "/guides/") {
      lastModified = allGuideDates.at(-1) ?? lastModified;
    }

    if (page.url.startsWith("/guides/topic/")) {
      const topic = guideTopics.find(
        (item) => `/guides/topic/${item.slug}/` === page.url,
      );
      const topicDates = guides
        .filter((guide) => guide.topic === topic?.id)
        .map((guide) => guideLastModified(guide.url))
        .filter((date): date is string => !!date)
        .sort();
      lastModified = topicDates.at(-1) ?? lastModified;
    }

    const images = doctorImages(page.url);
    put({
      url: `${GUIDE_BASE}${page.url}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: frequencyFor(page.url),
      priority: priorityFor(page.url),
      ...(images.length ? { images } : {}),
    });
  }

  for (const guide of guides) {
    put({
      url: `${GUIDE_BASE}${guide.url}`,
      ...(guideLastModified(guide.url)
        ? { lastModified: guideLastModified(guide.url)! }
        : {}),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return [...entries.values()];
}

export const dynamic = "force-static";
