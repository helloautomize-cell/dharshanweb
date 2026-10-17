import {
  agencyCredit,
  entityStatement,
  guideMarkdown,
  pageList,
  pageMarkdown,
} from "@/lib/llms";
import { allRoutes } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const articleUrls = new Set(
    pageList()
      .map((page) => page.url)
      .filter((url) => /^\/guides\/[^/]+\/$/.test(url)),
  );
  const urls = allRoutes().filter(
    (url) => !["/thank-you/", "/404/"].includes(url) && url !== "/styleguide/",
  );
  const pages = urls.filter((url) => !articleUrls.has(url)).map(pageMarkdown);
  const guides = [...articleUrls].map(guideMarkdown);
  const body = `# Rehabify

> ${entityStatement()}

Information on this site is for general education and does not replace a consultation. Medical emergency in India: call 108 or 112.

${[...pages, ...guides].filter(Boolean).join("\n\n---\n\n")}

${agencyCredit()}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
