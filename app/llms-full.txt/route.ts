import {
  agencyCredit,
  entityStatement,
  guideMarkdown,
  pageList,
  pageMarkdown,
} from "@/lib/llms";
import { allRoutes } from "@/lib/content";
import { GUIDE_BASE } from "@/lib/guides";

export const dynamic = "force-static";

function exportBlock(kind: "PAGE" | "GUIDE", url: string, markdown: string) {
  if (!markdown.trim()) return "";
  const title = markdown.split("\n", 1)[0].replace(/^#\s*/, "");
  const rule = "=".repeat(78);
  return `${rule}\n${kind}: ${title}\nURL: ${GUIDE_BASE}${url}\n${rule}\n\n${markdown}`;
}

export function GET() {
  const articleUrls = new Set(
    pageList()
      .map((page) => page.url)
      .filter((url) => /^\/guides\/[^/]+\/$/.test(url)),
  );
  const urls = allRoutes().filter(
    (url) => !["/thank-you/", "/404/"].includes(url) && url !== "/styleguide/",
  );
  const pages = urls
    .filter((url) => !articleUrls.has(url))
    .map((url) => exportBlock("PAGE", url, pageMarkdown(url)))
    .filter(Boolean);
  const guides = [...articleUrls]
    .sort()
    .map((url) => exportBlock("GUIDE", url, guideMarkdown(url)))
    .filter(Boolean);
  const body = `# Rehabify - complete website content export

> ${entityStatement()}

This file is the complete machine-readable content export for https://www.rehabify.in/. It is intended for search engines, AI assistants and indexing systems that prefer one document over crawling every page. Canonical URLs remain the individual pages on the website.

Information on this site is for general education and does not replace a consultation. Medical emergency in India: call 108 or 112.

Summary index: https://www.rehabify.in/llms.txt
Sitemap: https://www.rehabify.in/sitemap.xml

${[...pages, ...guides].join("\n\n")}

${agencyCredit()}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
