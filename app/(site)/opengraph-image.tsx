import { getPage } from "@/lib/content";
import { renderPageImage } from "@/lib/og-image";

export const alt = "Rehabify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const page = getPage("/");
  const title = (page?.meta.h1 ?? "Rehab that moves with you.").replaceAll(
    "*",
    "",
  );
  return renderPageImage(title);
}
