import { notFound } from "next/navigation";
import { getGuide, getGuides } from "@/lib/guide-content.mjs";
import { renderGuideImage } from "@/lib/guide-og";

export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return renderGuideImage(guide);
}
