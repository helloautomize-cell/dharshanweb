import { notFound } from "next/navigation";
import { allRoutes, getPage } from "@/lib/content";
import { renderPageImage } from "@/lib/og-image";

export const dynamic = "force-static";
export const dynamicParams = false;

function paramsFor(url: string) {
  const parts = url.split("/").filter(Boolean);
  parts[parts.length - 1] = `${parts[parts.length - 1]}.png`;
  return { slug: parts };
}

export function generateStaticParams() {
  return allRoutes()
    .filter(
      (url) =>
        url !== "/" &&
        url !== "/contact/" &&
        !url.startsWith("/guides/") &&
        !url.startsWith("/styleguide"),
    )
    .map(paramsFor);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const parts = (await params).slug;
  const last = parts.at(-1) ?? "";
  if (!last.endsWith(".png")) notFound();
  parts[parts.length - 1] = last.slice(0, -4);
  const url = "/" + parts.join("/") + "/";
  const page = getPage(url);
  if (!page) notFound();
  const title = (page.meta.h1 ?? page.meta.title).replaceAll("*", "");
  return renderPageImage(title);
}
