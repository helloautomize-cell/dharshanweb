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

export function clinic() {
  return clean({
    "@type": "MedicalClinic",
    "@id": `${BASE}/#clinic`,
    name: siteConfig.name,
    url: `${BASE}/`,
    description:
      "Physical medicine and rehabilitation practice in Bengaluru, with video consultations across India.",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: `${BASE}/images/brand/mark-blue.png`,
    image: `${BASE}/images/brand/og-base.png`,
    medicalSpecialty: "PhysicalMedicineAndRehabilitation",
    knowsAbout: [
      "Physical medicine and rehabilitation",
      "Pain and spine care",
      "Neuro rehabilitation",
      "Joint and sports rehabilitation",
      "Children's rehabilitation",
      "Rehabilitation for older adults",
    ],
    availableService: [
      "Pain and spine",
      "Neuro rehabilitation",
      "Joints and sports",
      "Children's rehabilitation",
      "Older adults",
    ].map((name) => ({ "@type": "MedicalTherapy", name })),
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "patient enquiries",
      availableLanguage: siteConfig.doctors[0].languages,
    },
    founder: { "@id": `${BASE}/#dr-dharshan-n-a` },
    foundingDate: siteConfig.foundingYear,
    sameAs: [],
    openingHoursSpecification: siteConfig.hours,
    address: siteConfig.address,
    geo: siteConfig.geo,
  });
}

export function physician(id: string) {
  const doctors: Record<string, Record<string, unknown>> = {
    "dr-dharshan-n-a": {
      "@type": "Physician",
      "@id": `${BASE}/#dr-dharshan-n-a`,
      name: "Dr. Dharshan N A",
      url: `${BASE}/dr-dharshan-n-a/`,
      image: `${BASE}/images/doctors/dr-dharshan-hero.jpg`,
      jobTitle: "Consultant in Physical Medicine and Rehabilitation",
      honorificSuffix: "MBBS, MD",
      medicalSpecialty: "PhysicalMedicineAndRehabilitation",
      knowsAbout: [
        "Physical Medicine and Rehabilitation",
        "Interventional pain management",
        "Neurorehabilitation",
      ],
      knowsLanguage: siteConfig.doctors[0].languages,
      hasCredential: [
        "MBBS",
        "MD Physical Medicine and Rehabilitation",
        "Fellowship in Interventional Pain Management",
      ].map((name) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name,
      })),
      worksFor: { "@id": `${BASE}/#clinic` },
      alumniOf: [
        "Annapoorana Medical College and Hospitals, Salem",
        "Regional Institute of Medical Sciences, Imphal",
        "Delhi Pain Management Centre",
      ],
    },
    "dr-selina-kh": {
      "@type": "Physician",
      "@id": `${BASE}/#dr-selina-kh`,
      name: "Dr. Selina Kh",
      url: `${BASE}/dr-selina-kh/`,
      image: `${BASE}/images/doctors/dr-selina-hero.jpg`,
      jobTitle: "Consultant in Physical Medicine and Rehabilitation",
      medicalSpecialty: "PhysicalMedicineAndRehabilitation",
      knowsAbout: ["Physical Medicine and Rehabilitation"],
      worksFor: { "@id": `${BASE}/#clinic` },
    },
  };
  return doctors[id] ?? null;
}
export function physicianRef(id: string | undefined) {
  const p = id ? physician(id) : null;
  return p ? { "@id": p["@id"] } : { "@id": `${BASE}/#clinic` };
}

function normalizeAbout(about: Record<string, unknown> | undefined) {
  if (!about) return { "@id": `${BASE}/#clinic` };
  const { type, ...rest } = about as Record<string, unknown> & {
    type?: string;
  };
  return clean({ "@type": type ?? "MedicalCondition", ...rest });
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
    about: normalizeAbout(meta.about),
    reviewedBy: physicianRef(meta.reviewer),
    lastReviewed: meta.lastReviewed,
    mainContentOfPage: { "@id": `${BASE}${meta.url}#content` },
  });
}
export function webPage(
  meta: PageMeta,
  type = "WebPage",
  extra: Record<string, unknown> = {},
) {
  return clean({
    "@type": type,
    "@id": `${BASE}${meta.url}#webpage`,
    url: `${BASE}${meta.url}`,
    name: meta.title,
    description: meta.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE}/#website` },
    about: normalizeAbout(meta.about),
    reviewedBy: physicianRef(meta.reviewer),
    lastReviewed: meta.lastReviewed,
    ...extra,
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
export function howTo(
  name: string,
  url: string,
  steps: { title: string; detail: string }[],
) {
  return {
    "@type": "HowTo",
    "@id": `${BASE}${url}#how`,
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.detail,
      url: `${BASE}${url}#video-step-${index + 1}`,
    })),
  };
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
    publisher: { "@id": `${BASE}/#clinic` },
    isPartOf: { "@id": `${BASE}/guides/#webpage` },
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
    publisher: { "@id": `${BASE}/#clinic` },
    creator: {
      "@type": "Organization",
      name: siteConfig.project.agency,
      url: siteConfig.project.agencyUrl,
    },
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

export function doctorsItemList(doctors: PageMeta[]) {
  return {
    "@type": "ItemList",
    "@id": `${BASE}/doctors/#doctors`,
    numberOfItems: doctors.length,
    itemListElement: doctors.map((doctor, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        ...physician(doctor.url.split("/")[1]),
        name: doctor.h1?.replaceAll("*", ""),
        url: `${BASE}${doctor.url}`,
        image: `${BASE}/images/doctors/${doctor.doctor!.portrait}.jpg`,
        knowsLanguage: doctor.doctor?.languages?.filter(
          (language) => language.trim() && !language.includes("[CONFIRM"),
        ),
      },
    })),
  };
}

export function graph(
  meta: PageMeta,
  extras: unknown[] = [],
  pageNode: unknown = webPage(meta),
) {
  return {
    "@context": "https://schema.org",
    "@graph": clean(
      [
        website(),
        clinic(),
        physician("dr-dharshan-n-a"),
        physician("dr-selina-kh"),
        pageNode,
        ...extras,
      ].filter(Boolean),
    ),
  };
}
