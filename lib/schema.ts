import { siteConfig } from "@/lib/site-config";
import type { PageMeta } from "@/lib/content";

const BASE = "https://www.rehabify.in";

// Any value still holding [CONFIRM] is stripped from JSON-LD output so
// placeholders can never leak into schema.
function clean<T>(value: T): T | null {
  if (value == null) return null;
  if (typeof value === "string")
    return value.includes("[CONFIRM") ? null : value;
  if (Array.isArray(value)) {
    const items = value.map(clean).filter((v) => v !== null);
    return items.length ? (items as T) : null;
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const c = clean(v);
      if (c !== null) out[k] = c;
    }
    return Object.keys(out).length ? (out as T) : null;
  }
  return value;
}

export function organisation() {
  return {
    "@type": "MedicalClinic",
    "@id": `${BASE}/#practice`,
    name: siteConfig.name,
    url: `${BASE}/`,
    description:
      "Physical medicine and rehabilitation practice in Bengaluru, with video consultations across India.",
    telephone: siteConfig.phone,
    logo: `${BASE}/images/brand/mark-blue.png`,
    image: `${BASE}/images/brand/og-base.png`,
  };
}
export function physician(id: string) {
  const doctors: Record<string, Record<string, unknown>> = {
    "dr-dharshan-n-a": {
      "@type": "Physician",
      "@id": `${BASE}/dr-dharshan-n-a/#physician`,
      name: "Dr. Dharshan N A",
      url: `${BASE}/dr-dharshan-n-a/`,
      image: `${BASE}/images/doctors/dr-dharshan-hero.jpg`,
      jobTitle: "Consultant in Physical Medicine and Rehabilitation",
      medicalSpecialty: "PhysicalMedicineAndRehabilitation",
      worksFor: { "@id": `${BASE}/#practice` },
      alumniOf: [
        "Annapoorana Medical College and Hospitals, Salem",
        "Regional Institute of Medical Sciences, Imphal",
      ],
    },
    "dr-selina-kh": {
      "@type": "Physician",
      "@id": `${BASE}/dr-selina-kh/#physician`,
      name: "Dr. Selina Kh",
      url: `${BASE}/dr-selina-kh/`,
      image: `${BASE}/images/doctors/dr-selina-hero.jpg`,
      jobTitle: "Consultant in Physical Medicine and Rehabilitation",
      medicalSpecialty: "PhysicalMedicineAndRehabilitation",
      worksFor: { "@id": `${BASE}/#practice` },
    },
  };
  return doctors[id] ?? null;
}
export function physicianRef(id: string | undefined) {
  const p = id ? physician(id) : null;
  return p ? { "@id": p["@id"] } : { "@id": `${BASE}/#practice` };
}
export function medicalWebPage(meta: PageMeta) {
  return clean({
    "@type": "MedicalWebPage",
    "@id": `${BASE}${meta.url}#webpage`,
    url: `${BASE}${meta.url}`,
    name: meta.title,
    description: meta.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE}/#website` },
    about: meta.about ?? { "@id": `${BASE}/#practice` },
    reviewedBy: physicianRef(meta.reviewer),
    lastReviewed: meta.lastReviewed,
    mainContentOfPage: { "@id": `${BASE}${meta.url}#content` },
  });
}
export function webPage(meta: PageMeta, type = "WebPage") {
  return clean({
    "@type": type,
    "@id": `${BASE}${meta.url}#webpage`,
    url: `${BASE}${meta.url}`,
    name: meta.title,
    description: meta.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE}/#website` },
    about: meta.about ?? { "@id": `${BASE}/#practice` },
    reviewedBy: physicianRef(meta.reviewer),
    lastReviewed: meta.lastReviewed,
  });
}
export function faqPage(faqs: { question: string; answer: string }[]) {
  return clean({
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}
export function blogPosting(meta: PageMeta) {
  return clean({
    "@type": "BlogPosting",
    "@id": `${BASE}${meta.url}#post`,
    headline: meta.title,
    description: meta.description,
    url: `${BASE}${meta.url}`,
    inLanguage: "en-IN",
    author: physicianRef(meta.author),
    reviewedBy: physicianRef(meta.reviewedBy ?? meta.reviewer),
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.lastReviewed,
    publisher: { "@id": `${BASE}/#practice` },
    isPartOf: { "@id": `${BASE}/health-library/#webpage` },
  });
}
export function breadcrumb(items: { label: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${BASE}${item.href}`,
    })),
  };
}
export function website() {
  return {
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: `${BASE}/`,
    name: siteConfig.name,
    publisher: { "@id": `${BASE}/#practice` },
    inLanguage: "en-IN",
  };
}
export function careItemList(
  areas: {
    title: string;
    href: string;
    topics: { title: string; href: string }[];
  }[],
) {
  return {
    "@type": "ItemList",
    "@id": `${BASE}/care/#areas`,
    name: "Areas of care",
    numberOfItems: areas.length,
    itemListElement: areas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CollectionPage",
        name: area.title,
        url: `${BASE}${area.href}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: area.topics.length,
          itemListElement: area.topics.map((topic, topicIndex) => ({
            "@type": "ListItem",
            position: topicIndex + 1,
            name: topic.title,
            url: `${BASE}${topic.href}`,
          })),
        },
      },
    })),
  };
}

export function graph(meta: PageMeta, extras: unknown[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": clean([website(), organisation(), webPage(meta), ...extras]),
  };
}
