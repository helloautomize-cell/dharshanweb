import { readFileSync } from "node:fs";
import path from "node:path";
import { getGuides } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideRouteEntries } from "@/lib/guides";

export const dynamic = "force-static";
export function GET() {
  const base = readFileSync(path.resolve("resources/docs/llms.txt"), "utf8");
  const manifest = JSON.parse(
    readFileSync(path.resolve("content/manifest.json"), "utf8"),
  ) as { url: string; title: string; description: string; noindex?: boolean }[];
  const list = [
    ...manifest.filter(
      (page) => !page.noindex && !page.url.startsWith("/guides/"),
    ),
    ...guideRouteEntries(getGuides()),
  ]
    .map(
      (page) =>
        `- [${page.title.replace(/\s*\|.*$/, "")}](${GUIDE_BASE}${page.url}): ${page.description}`,
    )
    .join("\n");
  return new Response(`${base}\n## All pages\n${list}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
