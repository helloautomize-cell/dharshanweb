export const SITE_INDEXABLE = process.env.VERCEL_ENV === "production";
const confirm = (item: string) => `[CONFIRM: ${item}]` as const;

export const siteConfig = {
  name: "Rehabify",
  url: "https://www.rehabify.in/",
  locale: "en-IN",
  city: "Bengaluru",
  state: "Karnataka",
  country: "India",
  specialty: "Physical Medicine and Rehabilitation",
  tagline: confirm("keep Restoring Lives, Renewing Hope tagline"),
  phone: "+91 79048 42576",
  phoneHref: "tel:+917904842576",
  whatsapp: "https://wa.me/917904842576",
  phoneConfirmed: confirm("confirm phone and WhatsApp number"),
  email: confirm("single contact email"),
  address: confirm("clinic address and landmark"),
  mapsUrl: confirm("Google Maps link"),
  videos: [] as { id: string; title: string; channel: string; thumb: string }[],
  geo: confirm("clinic coordinates"),
  clinicType: confirm("own clinic or consulting inside a hospital or clinic"),
  hours: confirm("consultation days, hours, Sundays and holidays"),
  videoHours: confirm("video consultation hours"),
  answeringHours: confirm("phone and WhatsApp answering hours"),
  confirmationTime: confirm("booking confirmation time"),
  foundingYear: confirm("founding year"),
  legalEntity: confirm("legal entity name"),
  legalLastUpdated: confirm("legal policy date at launch"),
  accessibility: confirm("lift, wheelchair access, ramp and parking"),
  catchment: confirm("patient catchment areas"),
  feesVisible: false,
  fees: confirm("payment methods and fees told at booking"),
  insurance: confirm("insurance or cashless"),
  advancePayment: confirm("advance payment for video consultations"),
  formats: {
    clinic: confirm("clinic consultations offered"),
    video: confirm("video consultations offered"),
    homeProgramme: confirm("home programmes offered"),
    homeVisits: confirm("home visits, area and charge"),
  },
  services: {
    carePages: confirm("approve care page list"),
    cardiopulmonary: confirm("cardiac and pulmonary services at Rehabify"),
    oncology: confirm("oncology rehabilitation offered"),
    pelvic: confirm("pelvic rehabilitation offered"),
    womens: confirm("women's rehabilitation offered"),
    postCovid: confirm("post-COVID rehabilitation offered"),
    ultrasound: confirm("ultrasound available at Rehabify"),
    fluoroscopy: confirm("fluoroscopy at Rehabify or hospital only"),
    prp: confirm("PRP and prolotherapy offered"),
    botulinum: confirm("botulinum toxin for spasticity offered"),
    therapyGym: confirm("therapy gym"),
    team: confirm("in-house versus partner therapists"),
    packages: confirm("rehabilitation programmes or packages"),
  },
  privacy: {
    contactName: "Dr. Dharshan N A",
    contactConfirmed: confirm("privacy contact"),
    processors: confirm("booking, video, SMS and WhatsApp processors"),
    recordRetention: confirm("records at least 3 years"),
    enquiryRetention: confirm("enquiries without a visit 12 months"),
    complaintAcknowledgement: confirm("complaints acknowledged in 24 hours"),
    complaintResolution: confirm("complaints resolved in 7 days"),
    rightsCharter: confirm("Patient Rights charter displayed"),
    patientStaffConsent: confirm("patient and staff consent"),
    excludedImages: confirm("images not to use"),
  },
  project: {
    oldPlatform: confirm("old site platform, Neurolearn Media footer credit"),
    contentExport: confirm("old pages and blog export"),
    fullSizeMedia: confirm("largest logo and original media"),
    screenshots: "Capture existing site",
    businessProfiles: confirm(
      "Rehabify Google Business Profile, Practo and Justdial links",
    ),
    registrarDnsMx: confirm("domain registrar, DNS access and MX provider"),
    hostingOwner: confirm("Vercel account owner"),
    referenceDecision:
      "Design v2 approved as base; implement design v3 with both doctors",
    badgePhase: "P1b",
    agency: "Automize Media Labs",
    codingAgent: "Devin",
    repository: confirm("GitHub repository"),
    integrationOwners: confirm(
      "Resend, Turnstile, GA4 and Search Console owners",
    ),
    socialAccounts: confirm("social accounts"),
    canonicalConfirmed: confirm("confirm www.rehabify.in canonical"),
    launchDate: confirm("launch date"),
    oldAiTools: "Remove at launch with 410 responses",
    hospitalNamesAllowed: false,
    hospitalPermission: confirm(
      "Manipal role current and permission to name hospital (D2)",
    ),
    legalReview: confirm("legal review of seven legal pages"),
    feesDecision: "No fees on site; fee told at booking",
    ratingsDecision: "Links only, no rating widgets",
  },
  doctors: [
    {
      id: "dr-dharshan",
      name: "Dr. Dharshan N A",
      slug: "/dr-dharshan-n-a/",
      role: "Consultant physiatrist",
      title: "Consultant in Physical Medicine and Rehabilitation",
      qualifications:
        "MBBS, MD (PMR), Fellowship in Interventional Pain Management",
      qualificationConfirmation: confirm(
        "confirm qualifications and MD completion year",
      ),
      education: [
        {
          qualification: "MBBS",
          institution: "Annapoorana Medical College and Hospitals, Salem",
          years: "2013 to 2019",
        },
        {
          qualification: "MD Physical Medicine and Rehabilitation",
          institution: "Regional Institute of Medical Sciences, Imphal",
          years: "2020 to 2023",
        },
        {
          qualification: "Fellowship in Interventional Pain Management",
          institution: "Delhi Pain Management Centre",
          years: confirm("fellowship year and institution details"),
        },
      ],
      council: "Karnataka Medical Council",
      registration: confirm(
        "Dr. Dharshan Karnataka Medical Council registration number",
      ),
      consultantSince: "2023",
      consultantSinceConfirmation: confirm("confirm consultant since 2023"),
      experience: confirm("total years of experience"),
      languages: ["Tamil", "Telugu", "Kannada", "English", "Manipuri", "Hindi"],
      memberships: [
        "IAPMR",
        "KARM",
        "Global Regenerative Orthopedic Sciences Foundation",
      ],
      membershipConfirmation: confirm("life memberships"),
      currentHospitalRole: "Specialist, PM&R, Manipal Hospital, Sarjapur Road",
      hospitalTenure: confirm("time at Manipal Sarjapur Road"),
      priorRoles: [
        "Consultant, Antara Senior Care (October 2025 to present)",
        "Consultant, Bangalore Baptist Hospital (March to August 2025)",
        "Junior Consultant, SS Sparsh Hospital (November 2024 to February 2025)",
        "Senior Resident, RIMS Imphal (September 2023 to September 2024)",
        "Visiting, VSH Hospital and Apollo Clinic",
      ],
      branchConfirmation: confirm("Apollo Clinic branch"),
      focus: "Neuro-rehabilitation, pain and spine, children and older adults",
      approach:
        "Restoring function and independence, non-surgical first, change the plan if nothing changes, never limited to one organ",
      approachSignOff: confirm("Dr. Dharshan final wording"),
      publications: "Four journal articles in IJSR, 2021 to 2024",
      publicationLinks: confirm("publication links and author positions"),
      thesis:
        "Correlation of balance impairment with pain and functional disability in patients suffering from primary osteoarthritis of knee",
      videos: confirm("doctor videos and talks"),
      lastReviewed: confirm("Dr. Dharshan page sign-off date"),
      awardsVisible: false,
    },
    {
      id: "dr-selina",
      name: "Dr. Selina Kh",
      nameConfirmation: confirm("Dr. Selina preferred full name"),
      slug: "/dr-selina-kh/",
      role: "Consultant physiatrist",
      title: "Physical Medicine and Rehabilitation",
      qualifications: confirm("Dr. Selina qualifications and institutions"),
      registration: confirm("Dr. Selina registration number and council"),
      experience: confirm("Dr. Selina years in practice"),
      languages: confirm("Dr. Selina languages"),
      hours: confirm("Dr. Selina consultation days and hours"),
      approach: confirm("Dr. Selina approach in her own words"),
      focus: "Stroke, spinal cord injury, rheumatology and pain management",
      lastReviewed: confirm("Dr. Selina page sign-off date"),
      awardsVisible: false,
    },
  ],
} as const;

export const imageApprovals = Object.fromEntries(
  [
    "dr-dharshan-hero",
    "dr-dharshan-desk",
    "dr-dharshan-avatar",
    "dr-dharshan-exam",
    "dr-dharshan-video",
    "dr-dharshan-banner",
    "dr-selina-hero",
    "dr-selina-desk",
    "dr-selina-avatar",
    "dr-selina-exam",
    "dr-selina-video",
  ].map((name) => [name, true]),
) as Record<string, boolean>;
export const imageApprovalDate = "2026-10-12";
export const imageApprovalBasis =
  "Agency-relayed approval in IMAGE-MAP; written approvals retained by agency";

function confirmations(
  value: unknown,
  path = "siteConfig",
): { path: string; value: string }[] {
  if (typeof value === "string")
    return value.startsWith("[CONFIRM:") ? [{ path, value }] : [];
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, entry]) =>
      confirmations(entry, `${path}.${key}`),
    );
  return [];
}
export const TODO_CONFIRM = confirmations(siteConfig);
