import { agencyCredit, entityStatement, pageList } from "@/lib/llms";

export const dynamic = "force-static";

const BASE = "https://www.rehabify.in";

function link(title: string, url: string, description = "") {
  return `- [${title}](${BASE}${url})${description ? `: ${description}` : ""}`;
}

export function GET() {
  const pages = pageList();
  const page = (url: string) => pages.find((entry) => entry.url === url);
  const item = (url: string) => {
    const entry = page(url);
    return entry ? link(entry.title, entry.url, entry.description) : null;
  };
  const section = (heading: string, urls: string[], intro = "") => {
    const rows = urls.map(item).filter(Boolean).join("\n");
    return rows
      ? `## ${heading}\n\n${intro ? `${intro}\n\n` : ""}${rows}`
      : "";
  };

  const careSections = [
    {
      heading: "Pain and spine care",
      intro:
        "Care for back pain, neck pain, sciatica, facet and myofascial pain, and image-guided injections or nerve blocks when suitable.",
      urls: [
        "/pain-and-spine/",
        "/pain-and-spine/back-pain/",
        "/pain-and-spine/neck-pain/",
        "/pain-and-spine/sciatica/",
        "/pain-and-spine/image-guided-injections/",
      ],
    },
    {
      heading: "Neuro rehabilitation",
      intro:
        "Rehabilitation after stroke, spinal cord injury and head injury, and ongoing care for Parkinson's disease and spasticity.",
      urls: [
        "/neuro-rehabilitation/",
        "/neuro-rehabilitation/stroke/",
        "/neuro-rehabilitation/spinal-cord-injury/",
        "/neuro-rehabilitation/head-injury/",
        "/neuro-rehabilitation/parkinsons/",
        "/neuro-rehabilitation/spasticity/",
      ],
    },
    {
      heading: "Joints and sports rehabilitation",
      intro:
        "Care for knee and shoulder pain, sports injuries, recovery after fracture or surgery, PRP and prolotherapy, and prosthetic rehabilitation after amputation.",
      urls: [
        "/joints-and-sports/",
        "/joints-and-sports/knee-pain/",
        "/joints-and-sports/shoulder-pain/",
        "/joints-and-sports/sports-injuries/",
        "/joints-and-sports/after-fracture-or-surgery/",
        "/joints-and-sports/prp-and-prolotherapy/",
        "/joints-and-sports/prosthetic-rehab/",
      ],
    },
    {
      heading: "Children's rehabilitation",
      intro:
        "Rehabilitation for children with cerebral palsy, muscular dystrophy and developmental delay, always involving parents or guardians in the plan.",
      urls: [
        "/childrens-rehabilitation/",
        "/childrens-rehabilitation/cerebral-palsy/",
        "/childrens-rehabilitation/muscular-dystrophy/",
        "/childrens-rehabilitation/developmental-delay/",
      ],
    },
    {
      heading: "Rehabilitation for older adults",
      intro:
        "Care for falls, balance problems, osteoporosis, weakness and loss of independence after illness or surgery.",
      urls: [
        "/older-adults/",
        "/older-adults/falls-and-balance/",
        "/older-adults/osteoporosis/",
      ],
    },
  ]
    .map(({ heading, intro, urls }) => section(heading, urls, intro))
    .filter(Boolean)
    .join("\n\n");

  const guideGroups = [
    {
      heading: "Understanding rehabilitation",
      urls: ["/guides/what-is-a-physiatrist/"],
    },
    {
      heading: "Pain and spine guides",
      urls: ["/guides/low-back-pain-when-to-worry/"],
    },
    {
      heading: "Neuro rehabilitation guides",
      urls: ["/guides/first-90-days-after-stroke/"],
    },
    {
      heading: "Children's rehabilitation guides",
      urls: [
        "/guides/cerebral-palsy-what-parents-ask-first/",
        "/guides/toe-walking-when-to-check/",
        "/guides/school-and-therapy-for-children-with-dmd/",
      ],
    },
    {
      heading: "Older adults' health guides",
      urls: [
        "/guides/making-a-home-safer-against-falls/",
        "/guides/osteoporosis-after-50/",
        "/guides/walking-aids-cane-walker-or-none/",
      ],
    },
  ]
    .map(({ heading, urls }) => section(heading, urls))
    .filter(Boolean)
    .join("\n\n");

  const body = `# Rehabify

> ${entityStatement()}

Rehabify is a physical medicine and rehabilitation practice in Bengaluru, Karnataka, India. It is led by consultant physiatrists: medical doctors who specialise in restoring movement, independence and daily function after pain, injury, illness or disability. The site covers clinic consultations in Bengaluru and video consultations across India.

Information on this site is for general education and does not replace a consultation. Medical emergency in India: call 108 or 112.

## Key facts

- Practice: Rehabify, physical medicine and rehabilitation (physiatry), Bengaluru, Karnataka
- Specialty: Physical Medicine and Rehabilitation, also called PM&R or physiatry
- Doctors: Dr. Dharshan N A, consultant physiatrist, and Dr. Selina Kh, consultant physiatrist
- Consultations: in clinic and by video
- Video consultations: available across India with Dr. Dharshan
- Patients: adults, children and older adults
- Phone and WhatsApp: +91 79048 42576
- Booking: ${BASE}/contact/ - the appointment form opens WhatsApp with a prefilled request
- Website: ${BASE}/
- Full content export for AI systems: ${BASE}/llms-full.txt

## Dr. Dharshan N A

- Consultant in Physical Medicine and Rehabilitation
- Qualifications: MBBS, MD (Physical Medicine and Rehabilitation), Fellowship in Interventional Pain Management
- Education: Annapoorana Medical College and Hospitals, Salem; Regional Institute of Medical Sciences, Imphal; Delhi Pain Management Centre
- Practising as a consultant since 2023
- Focus areas: pain and spine, neuro rehabilitation, joints and sports, children's rehabilitation and rehabilitation for older adults
- Procedures: ultrasound and fluoroscopy-guided injections and nerve blocks, when suitable
- Memberships: Indian Association of Physical Medicine and Rehabilitation (IAPMR), Karnataka Association of Rehabilitation Medicine (KARM), Global Regenerative Orthopedic Sciences Foundation
- Languages: Tamil, Telugu, Kannada, English, Manipuri and Hindi
- Research: four articles in the International Journal of Scientific Research, 2021 to 2024, including randomised controlled trials in knee osteoarthritis, carpal tunnel syndrome and Achilles tendinopathy
- Profile: ${BASE}/dr-dharshan-n-a/

## Dr. Selina Kh

- Consultant in Physical Medicine and Rehabilitation
- Focus areas: stroke rehabilitation, spinal cord injury rehabilitation, spasticity care, joint and rheumatic pain, and long-term pain
- Approach: plain explanations, care built around the person, and one shared plan with therapists and other doctors
- Profile: ${BASE}/dr-selina-kh/

## Questions patients ask

- What is a physiatrist, and how is one different from a physiotherapist? See ${BASE}/guides/what-is-a-physiatrist/
- When is low back pain a warning sign? See ${BASE}/guides/low-back-pain-when-to-worry/
- What should families do in the first 90 days after a stroke? See ${BASE}/guides/first-90-days-after-stroke/
- Which children need cerebral palsy rehabilitation? See ${BASE}/guides/cerebral-palsy-what-parents-ask-first/
- When is toe walking worth checking? See ${BASE}/guides/toe-walking-when-to-check/
- How can families reduce falls at home? See ${BASE}/guides/making-a-home-safer-against-falls/
- Cane, walker or neither? See ${BASE}/guides/walking-aids-cane-walker-or-none/
- How do video consultations work? See ${BASE}/video-consultation/
- How do I plan a clinic visit? See ${BASE}/plan-your-visit/
- How do I request an appointment? See ${BASE}/contact/

## Which care for which problem

- Back pain, neck pain, sciatica, joint pain, sports injuries and pain that has not settled with rest: pain and spine care, joints and sports
- Stroke, spinal cord injury, brain injury, Parkinson's disease, spasticity and other nerve conditions: neuro rehabilitation
- Cerebral palsy, muscular dystrophy, developmental delay, toe walking and school participation concerns in children: children's rehabilitation
- Falls, balance problems, osteoporosis, weakness and recovery after illness or surgery in older adults: rehabilitation for older adults
- Recovery after fracture or surgery, or learning to use a prosthesis after amputation: joints and sports rehabilitation

${careSections}

## Guides written for patients and families

The guides explain common rehabilitation questions in plain language. They are medically reviewed by a Rehabify doctor and list their sources.

${guideGroups}

## Words patients use (English, Kannada, Tamil, Hindi)

- Back pain: bennu novu (Kannada), mudhugu vali (Tamil), kamar dard (Hindi)
- Neck pain: kuthu novu or gardan dard (Hindi), gardan pain (common usage)
- Paralysis after stroke: pakshaghata (Kannada), pakkavatham (Tamil), lakwa (Hindi)
- Physiotherapy: physio, exercise treatment
- Rehabilitation: rehab, recovery treatment, function training
- Artificial limb: prosthesis, artificial leg or arm

## Practical information and policies

${[
  "/about/",
  "/doctors/",
  "/video-consultation/",
  "/plan-your-visit/",
  "/contact/",
  "/faqs/",
  "/medical-disclaimer/",
  "/editorial-policy/",
  "/patient-rights/",
  "/appointments-cancellation-refund/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/accessibility/",
]
  .map(item)
  .filter(Boolean)
  .join("\n")}

## Important interpretation notes

- This is a medical rehabilitation practice, not an emergency service.
- The site uses patient-friendly English and avoids replacing consultation with generic advice.
- Appointment requests made through the website open in WhatsApp; the website itself does not email or store them.
- Dr. Dharshan offers video consultations; Dr. Selina's profile currently directs patients to clinic booking or WhatsApp.
- Details marked unconfirmed during content preparation are omitted rather than guessed.

${agencyCredit()}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
