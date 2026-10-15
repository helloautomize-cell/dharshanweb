import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allRoutes, getPage } from "@/lib/content";
import { SITE_INDEXABLE } from "@/lib/site-config";
import { DoctorsIndexPage } from "@/components/pages/doctors-index-page";
import { VisitPage } from "@/components/pages/visit-page";
import {
  CareIndexPage,
  ContentPage,
  DoctorPage,
  PostPage,
} from "@/components/pages/templates";

const KICKERS: Record<string, string> = {
  "/about/": "About",
  "/doctors/": "Our doctors",
  "/video-consultation/": "Video consultation",
  "/plan-your-visit/": "Plan your visit",
  "/contact/": "Contact and book",
  "/faqs/": "FAQs",
  "/health-library/": "Health library",
  "/thank-you/": "Thank you",
  "/privacy-policy/": "Legal",
  "/terms-of-use/": "Legal",
  "/medical-disclaimer/": "Legal",
  "/editorial-policy/": "Editorial policy",
  "/patient-rights/": "Legal",
  "/appointments-cancellation-refund/": "Legal",
  "/accessibility/": "Accessibility",
  "/pain-and-spine/": "Pain and spine",
  "/neuro-rehabilitation/": "Neuro rehabilitation",
  "/joints-and-sports/": "Joints and sports",
  "/childrens-rehabilitation/": "Children's rehabilitation",
  "/older-adults/": "Older adults",
};
function hubKicker(url: string) {
  const first = "/" + url.split("/").filter(Boolean)[0] + "/";
  return KICKERS[first] ?? "Rehabify";
}
export function generateStaticParams() {
  return allRoutes()
    .filter((url) => url !== "/")
    .map((url) => ({ slug: url.split("/").filter(Boolean) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const url = "/" + (await params).slug.join("/") + "/";
  const page = getPage(url);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: url },
    robots: page.meta.noindex
      ? { index: false, follow: false }
      : SITE_INDEXABLE
        ? { index: true, follow: true }
        : { index: false, follow: false },
  };
}
export default async function RoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const url = "/" + (await params).slug.join("/") + "/";
  const page = getPage(url);
  if (!page) notFound();
  if (url === "/care/") return <CareIndexPage page={page} />;
  if (url === "/doctors/") return <DoctorsIndexPage page={page} />;
  if (url === "/plan-your-visit/") return <VisitPage page={page} />;
  if (url.startsWith("/dr-")) return <DoctorPage page={page} />;
  if (url.startsWith("/health-library/")) return <PostPage page={page} />;
  return <ContentPage page={page} kicker={hubKicker(url)} />;
}
