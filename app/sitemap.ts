import type { MetadataRoute } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

type ManifestPage = {
  url: string;
  lastReviewed?: string | null;
  lastUpdated?: string | null;
  dateModified?: string | null;
  datePublished?: string | null;
  noindex?: boolean;
};
const BASE = "https://www.rehabify.in";
export default function sitemap(): MetadataRoute.Sitemap {
  const manifest = JSON.parse(
    readFileSync(path.resolve("content/manifest.json"), "utf8"),
  ) as ManifestPage[];
  return manifest
    .filter((p) => !p.noindex && p.url !== "/404/")
    .map((p) => {
      const last =
        p.dateModified ?? p.lastReviewed ?? p.lastUpdated ?? p.datePublished;
      return {
        url: `${BASE}${p.url}`,
        ...(last && !last.includes("[CONFIRM") ? { lastModified: last } : {}),
      };
    });
}
export const dynamic = "force-static";
