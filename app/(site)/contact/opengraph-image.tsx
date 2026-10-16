import { getPage } from "@/lib/content";
import { renderPageImage } from "@/lib/og-image";

export const alt = "Contact Rehabify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const page = getPage("/contact/");
  const title = (page?.meta.h1 ?? "Contact and book").replaceAll("*", "");
  return renderPageImage(title, "Contact");
}
