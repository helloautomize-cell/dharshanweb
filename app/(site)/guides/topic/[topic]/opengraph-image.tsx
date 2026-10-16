import { notFound } from "next/navigation";
import { guideTopicMeta, guideTopics } from "@/lib/guides";
import { renderPageImage } from "@/lib/og-image";

export const alt = "A guide topic from Rehabify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return guideTopics.map((topic) => ({ topic: topic.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const slug = (await params).topic;
  const topic = guideTopics.find((entry) => entry.slug === slug);
  if (!topic) notFound();
  return renderPageImage(
    guideTopicMeta(topic).h1.replaceAll("*", ""),
    "Guides",
  );
}
