import type { MetadataRoute } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getGuides } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideRouteEntries } from "@/lib/guides";

type ManifestPage = {
  url: string;
  lastReviewed?: string | null;
  lastUpdated?: string | null;
  dateModified?: string | null;
  datePublished?: string | null;
  noindex?: boolean;
};
export default function sitemap(): MetadataRoute.Sitemap {
  const manifest = JSON.parse(
    readFileSync(path.resolve("content/manifest.json"), "utf8"),
  ) as ManifestPage[];
  const pages = manifest
    .filter(
      (page) =>
        !page.noindex &&
        page.url !== "/404/" &&
        page.url !== "/thank-you/" &&
        !page.url.startsWith("/guides/") &&
        !page.url.startsWith("/styleguide"),
    )
    .map((page) => {
      const last =
        page.dateModified ??
        page.lastReviewed ??
        page.lastUpdated ??
        page.datePublished;
      return {
        url: `${GUIDE_BASE}${page.url}`,
        ...(last && !last.includes("[CONFIRM") ? { lastModified: last } : {}),
      };
    });
  return [
    ...pages,
    ...guideRouteEntries(getGuides()).map((page) => ({
      url: `${GUIDE_BASE}${page.url}`,
      ...("dateModified" in page && page.dateModified
        ? { lastModified: page.dateModified }
        : {}),
    })),
  ];
}
export const dynamic = "force-static";
