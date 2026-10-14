import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";
export function GET() {
  const base = readFileSync(path.resolve("resources/docs/llms.txt"), "utf8");
  const manifest = JSON.parse(
    readFileSync(path.resolve("content/manifest.json"), "utf8"),
  ) as { url: string; title: string; description: string; noindex?: boolean }[];
  const list = manifest
    .filter((p) => !p.noindex)
    .map(
      (p) =>
        `- [${p.title.replace(/\s*\|.*$/, "")}](https://www.rehabify.in${p.url}): ${p.description}`,
    )
    .join("\n");
  return new Response(`${base}\n## All pages\n${list}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
