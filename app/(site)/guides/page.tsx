import type { Metadata } from "next";
import { GuidesIndexPage } from "@/components/pages/guides-index-page";
import { guideIndexMeta } from "@/lib/guides";

export const dynamic = "force-static";
export const dynamicParams = false;
export const metadata: Metadata = {
  title: guideIndexMeta.title,
  description: guideIndexMeta.description,
  alternates: { canonical: "/guides/" },
  openGraph: {
    type: "website",
    title: guideIndexMeta.title,
    description: guideIndexMeta.description,
    url: "/guides/",
  },
};
export default function GuidesPage() {
  return <GuidesIndexPage />;
}
