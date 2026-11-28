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

export function organization() {
  return clean({
    "@type": "MedicalOrganization",
    "@id": `${BASE}/#organization`,
    name: siteConfig.name,
    url: `${BASE}/`,
    logo: `${BASE}/images/brand/mark-blue.png`,
    description:
      "Physical medicine and rehabilitation practice in Bengaluru, with video consultations across India.",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    founder: { "@id": `${BASE}/#dr-dharshan-n-a` },
    foundingDate: siteConfig.foundingYear,
    sameAs: [],
  });
}

export function clinic() {
  const languages = [
    ...new Set(
      siteConfig.doctors.flatMap((doctor) => doctor.languages ?? []),
    ),
  ].filter((language) => language && !language.includes("[CONFIRM"));
  const services = [
    ["Pain and spine", "/pain-and-spine/"],
    ["Neuro rehabilitation", "/neuro-rehabilitation/"],
    ["Joints and sports", "/joints-and-sports/"],
    ["Children's rehabilitation", "/childrens-rehabilitation/"],
    ["Older adults", "/older-adults/"],
  ] as const;
  return clean({
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${BASE}/#clinic`,
    name: siteConfig.name,
    alternateName: "Rehabify Bengaluru",
    url: `${BASE}/`,
    description:
      "Physical medicine and rehabilitation practice in Bengaluru, with video consultations across India.",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    logo: `${BASE}/images/brand/mark-blue.png`,
    image: `${BASE}/images/brand/og-base.png`,
    medicalSpecialty: ["Musculoskeletal", "Neurologic"],
    isAcceptingNewPatients: true,
    parentOrganization: { "@id": `${BASE}/#organization` },
    employee: [
      { "@id": `${BASE}/#dr-dharshan-n-a` },
      { "@id": `${BASE}/#dr-selina-kh` },
    ],
    knowsAbout: [
      "Physical medicine and rehabilitation",
      "Pain and spine care",
      "Neuro rehabilitation",
      "Joint and sports rehabilitation",
      "Children's rehabilitation",
      "Rehabilitation for older adults",
    ],
    availableService: services.map(([name, href]) => ({
      "@type": ["MedicalTherapy", "Service"],
      name,
      url: `${BASE}${href}`,
      provider: { "@id": `${BASE}/#clinic` },
      areaServed: [
        { "@type": "City", name: "Bengaluru" },
        { "@type": "Country", name: "India" },
      ],
    })),
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      url: siteConfig.whatsapp,
      contactType: "patient enquiries",
      availableLanguage: languages,
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
      "@type": ["Physician", "Person"],
      "@id": `${BASE}/#dr-dharshan-n-a`,
      name: "Dr. Dharshan N A",
      url: `${BASE}/dr-dharshan-n-a/`,
      image: `${BASE}/images/doctors/dr-dharshan-hero.jpg`,
      jobTitle: "Consultant in Physical Medicine and Rehabilitation",
      description:
        "Physiatrist in Bengaluru practising physical medicine and rehabilitation, neuro rehabilitation and interventional pain management for adults, children and older adults.",
      honorificSuffix: "MBBS, MD",
      medicalSpecialty: ["Musculoskeletal", "Neurologic"],
      knowsAbout: [
        "Physical Medicine and Rehabilitation",
        "Interventional pain management",
        "Neurorehabilitation",
        "Spasticity rehabilitation",
        "Stroke rehabilitation",
        "Musculoskeletal pain",
        "Paediatric rehabilitation",
        "Geriatric rehabilitation",
      ],
      knowsLanguage: siteConfig.doctors[0].languages,
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MBBS",
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: "Annapoorana Medical College and Hospitals, Salem, Tamil Nadu",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MD, Physical Medicine and Rehabilitation",
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: "Regional Institute of Medical Sciences, Imphal, Manipur",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "Fellowship in Interventional Pain Management",
          recognizedBy: {
            "@type": "Organization",
            name: "Delhi Pain Management Centre",
          },
        },
      ],
      memberOf: [
        {
          "@type": "Organization",
          name: "Indian Association of Physical Medicine and Rehabilitation",
          alternateName: "IAPMR",
        },
        {
          "@type": "Organization",
          name: "Karnataka Association of Rehabilitation Medicine",
          alternateName: "KARM",
        },
        {
          "@type": "Organization",
          name: "Global Regenerative Orthopedic Sciences Foundation",
        },
      ],
      worksFor: { "@id": `${BASE}/#clinic` },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Annapoorana Medical College and Hospitals, Salem",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Regional Institute of Medical Sciences, Imphal",
        },
        { "@type": "Organization", name: "Delhi Pain Management Centre" },
      ],
    },
    "dr-selina-kh": {
      "@type": ["Physician", "Person"],
      "@id": `${BASE}/#dr-selina-kh`,
      name: "Dr. Selina Kh",
      url: `${BASE}/dr-selina-kh/`,
      image: `${BASE}/images/doctors/dr-selina-hero.jpg`,
      jobTitle: "Consultant in Physical Medicine and Rehabilitation",
      description:
        "Physiatrist in Bengaluru looking after stroke rehabilitation, spinal cord injury rehabilitation, spasticity care, joint and rheumatic pain, and long-term pain.",
      medicalSpecialty: ["Musculoskeletal", "Neurologic"],
      knowsAbout: [
        "Physical Medicine and Rehabilitation",
        "Stroke rehabilitation",
        "Spinal cord injury rehabilitation",
        "Spasticity rehabilitation",
        "Rheumatology-related pain",
      ],
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
    publisher: { "@id": `${BASE}/#organization` },
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
    publisher: { "@id": `${BASE}/#organization` },
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
        organization(),
        clinic(),
        physician("dr-dharshan-n-a"),
        physician("dr-selina-kh"),
        pageNode,
        ...extras,
      ].filter(Boolean),
    ),
  };
}
