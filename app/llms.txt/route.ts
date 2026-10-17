import { entityStatement, pageList } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const list = pageList()
    .map(
      (page) =>
        `- [${page.title}](https://www.rehabify.in${page.url}): ${page.description}`,
    )
    .join("\n");
  const body = `# Rehabify

> ${entityStatement()}

Information on this site is for general education and does not replace a consultation. Medical emergency in India: call 108 or 112.

## Pages

${list}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
