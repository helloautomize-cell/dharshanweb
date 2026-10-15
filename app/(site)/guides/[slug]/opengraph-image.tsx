import { notFound } from "next/navigation";
import { getGuide, getGuides } from "@/lib/guide-content.mjs";
import { renderGuideImage } from "@/lib/guide-og";

export const alt = "A guide from Rehabify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return renderGuideImage(guide);
}
