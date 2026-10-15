import { readFileSync } from "node:fs";
import path from "node:path";
import { getGuides } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideRouteEntries } from "@/lib/guides";

export const dynamic = "force-static";
export function GET() {
  const base = readFileSync(path.resolve("resources/docs/llms.txt"), "utf8");
  const guides = guideRouteEntries(getGuides())
    .map(
      (guide) =>
        `- [${guide.title.replace(/\s*\|.*$/, "")}](${GUIDE_BASE}${guide.url}): ${guide.description}`,
    )
    .join("\n");
  return new Response(`${base}\n## Guide topics and articles\n${guides}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
