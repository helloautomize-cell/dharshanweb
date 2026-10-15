import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticlePage } from "@/components/pages/guide-article-page";
import { getGuide, getGuides } from "@/lib/guide-content.mjs";
import { GUIDE_BASE, guideTopic, plainGuide } from "@/lib/guides";

export const dynamicParams = false;
export const dynamic = "force-static";
export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: guide.url },
    openGraph: {
      type: "article",
      title: plainGuide(guide.h1),
      description: guide.description,
      url: guide.url,
      section: guideTopic(guide.topic).label,
      ...(guide.datePublished ? { publishedTime: guide.datePublished } : {}),
      ...(guide.dateModified ? { modifiedTime: guide.dateModified } : {}),
      images: [
        {
          url: `${GUIDE_BASE}${guide.url}opengraph-image/`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <GuideArticlePage guide={guide} />;
}
