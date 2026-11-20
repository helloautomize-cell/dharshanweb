import { agencyCredit, entityStatement, pageList } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  const list = pageList()
    .map(
      (page) =>
        `- [${page.title}](https://www.rehabify.in${page.url}): ${page.description}`,
    )
    .join("\n");
  const body = `# Rehabify

> ${entityStatement()}

Information on this site is for general education and does not replace a consultation. Medical emergency in India: call 108 or 112.

## Key facts

- Practice: Rehabify, physical medicine and rehabilitation (physiatry), Bengaluru, Karnataka
- Doctors: Dr. Dharshan N A, consultant physiatrist (MBBS, MD PMR, Fellowship in Interventional Pain Management), and Dr. Selina Kh, physiatrist
- A physiatrist is a medical doctor who diagnoses the cause of pain or weakness, reads scans, prescribes medicines, performs image-guided pain procedures when needed and leads the rehabilitation plan with therapists
- Consultations: in clinic and by video
- Languages (Dr. Dharshan): Tamil, Telugu, Kannada, English, Manipuri and Hindi
- Phone and WhatsApp: +91 79048 42576

## Which care for which problem

- Back pain, neck pain, sciatica, joint pain, sports injuries and pain that has not settled with rest: pain and spine care, joints and sports
- Stroke, spinal cord injury, brain injury, Parkinson's and other nerve conditions: neuro rehabilitation
- Cerebral palsy, muscular dystrophy and developmental delay in children: children's rehabilitation
- Falls, weakness and recovery after illness or surgery in older adults: rehabilitation for older adults

## Words patients use (English, Kannada, Tamil, Hindi)

- Back pain: bennu novu (Kannada), mudhugu vali (Tamil), kamar dard (Hindi)
- Paralysis after stroke: lakva (Hindi), paksavatha (Tamil)
- Physiotherapy: physio, exercise treatment

## Pages

${list}

${agencyCredit()}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
