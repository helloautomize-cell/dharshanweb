import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidesIndexPage } from "@/components/pages/guides-index-page";
import { guideTopics, guideTopicMeta } from "@/lib/guides";

export const dynamicParams = false;
export const dynamic = "force-static";
export function generateStaticParams() {
  return guideTopics.map((topic) => ({ topic: topic.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const slug = (await params).topic;
  const topic = guideTopics.find((item) => item.slug === slug);
  if (!topic) return {};
  const meta = guideTopicMeta(topic);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.url },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url: meta.url,
    },
  };
}
export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const slug = (await params).topic;
  const topic = guideTopics.find((item) => item.slug === slug);
  if (!topic) notFound();
  return <GuidesIndexPage topic={topic} />;
}
