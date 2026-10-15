import {
  breadcrumb,
  organisation,
  physician,
  physicianRef,
  website,
} from "@/lib/schema";
import { GUIDE_BASE, guideTopic, plainGuide, type Guide } from "@/lib/guides";
import { guideDoctor } from "@/lib/guide-content.mjs";

export function guidesIndexSchema(
  meta: { url: string; title: string; description: string },
  guides: Guide[],
  topic?: string,
) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides/" },
    ...(topic ? [{ label: guideTopic(topic).label, href: meta.url }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      organisation(),
      {
        "@type": "CollectionPage",
        "@id": `${GUIDE_BASE}${meta.url}#page`,
        url: `${GUIDE_BASE}${meta.url}`,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${GUIDE_BASE}/#website` },
        publisher: { "@id": `${GUIDE_BASE}/#practice` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: guides.length,
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${GUIDE_BASE}${guide.url}`,
            name: plainGuide(guide.h1),
          })),
        },
      },
      breadcrumb(crumbs),
    ],
  };
}
export function guideArticleSchema(guide: Guide) {
  const url = `${GUIDE_BASE}${guide.url}`;
  const topic = guideTopic(guide.topic);
  const crumbs = breadcrumb([
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides/" },
    { label: topic.label, href: `/guides/topic/${topic.slug}/` },
    { label: plainGuide(guide.h1), href: guide.url },
  ]);
  const words = plainGuide(
    [
      ...guide.inBrief,
      ...guide.body.map((section) => section.body),
      guide.emergency,
      ...guide.faqs.flatMap((faq) => [faq.q, faq.a]),
      ...guide.sources.map((source) => `${source.publisher} ${source.title}`),
    ].join(" "),
  )
    .trim()
    .split(/\s+/).length;
  const physicians = [...new Set([guide.author, guide.reviewedBy])].map(
    (id) => ({
      ...physician(id),
      "@type": ["Physician", "Person"],
      name: guideDoctor(id).name,
    }),
  );
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      organisation(),
      ...physicians,
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#page`,
        url,
        name: plainGuide(guide.h1),
        inLanguage: "en-IN",
        audience: { "@type": "Audience", audienceType: "Patient" },
        ...(guide.about ? { about: guide.about } : {}),
        reviewedBy: physicianRef(guide.reviewedBy),
        ...(guide.lastReviewed ? { lastReviewed: guide.lastReviewed } : {}),
        mainEntity: { "@id": `${url}#article` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        isPartOf: { "@id": `${GUIDE_BASE}/#website` },
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: plainGuide(guide.h1),
        description: guide.description,
        image: `${url}opengraph-image/`,
        ...(guide.datePublished ? { datePublished: guide.datePublished } : {}),
        ...(guide.dateModified ? { dateModified: guide.dateModified } : {}),
        author: physicianRef(guide.author),
        publisher: { "@id": `${GUIDE_BASE}/#practice` },
        mainEntityOfPage: { "@id": `${url}#page` },
        articleSection: topic.label,
        wordCount: words,
        timeRequired: `PT${parseInt(guide.readingTime)}M`,
        inLanguage: "en-IN",
        citation: guide.sources.map(
          (source) => `${source.publisher}. ${source.title}`,
        ),
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: plainGuide(faq.q),
          acceptedAnswer: { "@type": "Answer", text: plainGuide(faq.a) },
        })),
      },
      { ...crumbs, "@id": `${url}#breadcrumb` },
    ],
  };
}
