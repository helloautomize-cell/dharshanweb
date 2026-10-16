import { renderPageImage } from "@/lib/og-image";

export const alt = "Guides from Rehabify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage() {
  return renderPageImage(
    "Plain answers about pain, movement and recovery.",
    "Guides",
  );
}
