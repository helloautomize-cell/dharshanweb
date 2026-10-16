import Image from "next/image";
import Link from "next/link";
import { VideoFitChecker } from "@/components/video-fit-checker";
import { altFor } from "@/lib/alt-text";
import {
  DirectoryBookingClose,
  DirectoryBreadcrumb,
  DirectoryComparison,
  DirectoryFacts,
  DirectoryFactsList,
  DirectoryFaq,
  DirectoryReviewer,
  DirectorySectionHeader,
  H1,
} from "@/components/pages/shared";
import { getDoctorPages, section, type PageContent } from "@/lib/content";
import { extractFaqs } from "@/lib/faqs";
import { Icon } from "@/lib/icons";
import {
  breadcrumb,
  faqPage,
  graph,
  howTo,
  medicalWebPage,
  physicianRef,
} from "@/lib/schema";
import { videoReadyItems } from "@/lib/video";
import { visitFacts, visitValue } from "@/lib/visit";
import "./care.css";
import "./doctors.css";
import "./video.css";

export function VideoPage({ page }: { page: PageContent }) {
  const text = (heading: string) => section(page, heading)?.body ?? "";
  const doctors = getDoctorPages()
    .filter(({ meta }) => meta.doctor?.videoConsults)
    .map(({ meta }) => ({
      name: visitValue(meta.h1?.replaceAll("*", "")),
      credentials: visitValue(
        meta.doctor?.videoCredentials ?? meta.credentials,
      ),
      href: meta.url,
      languages: (meta.doctor?.languages ?? []).map(visitValue).filter(Boolean),
    }));
  const firstDoctor = doctors[0];
  const languages = [
    ...new Map(
      doctors
        .flatMap((doctor) => doctor.languages)
        .map((language) => [language.toLowerCase(), language]),
    ).values(),
  ];
  const facts = {
    videoLength: visitValue(visitFacts.videoLength),
    videoPlatform: visitValue(visitFacts.videoPlatform),
    videoHours: visitValue(visitFacts.videoHours),
    callDropRule: visitValue(visitFacts.callDropRule),
    recordingPolicy: visitValue(visitFacts.recordingPolicy),
    lastReviewed: visitValue(visitFacts.lastReviewed),
  };
  const faqs = extractFaqs(text("FAQs")).map((faq, index) => {
    const answer =
      index === 3 && facts.callDropRule
        ? `${faq.answer} ${facts.callDropRule}`
        : index === 4 && facts.recordingPolicy
          ? `${facts.recordingPolicy} ${faq.answer}`
          : faq.answer;
    const policyIndex = answer.lastIndexOf("Privacy Policy");
    const before = answer.slice(0, policyIndex);
    const after = answer.slice(policyIndex + "Privacy Policy".length);
    return {
      ...faq,
      answer,
      ...(index === 4
        ? {
            answerContent: (
              <>
                {before}
                <Link href="/privacy-policy/">Privacy Policy</Link>
                {after}
              </>
            ),
          }
        : {}),
    };
  });
  const steps = extractFaqs(text("How it works")).map(
    ({ question, answer }) => ({ title: question, detail: answer }),
  );
  const data = graph(
    { ...page.meta, lastReviewed: facts.lastReviewed || undefined },
    [
      breadcrumb([
        { label: "Home", href: "/" },
        { label: "Video consultation", href: page.meta.url },
      ]),
      faqPage(faqs),
      howTo("Six steps, from booking to plan.", page.meta.url, steps),
      {
        "@type": "Service",
        "@id": `https://www.rehabify.in${page.meta.url}#service`,
        name: "Video consultation",
        serviceType: "Rehabilitation consultation",
        url: `https://www.rehabify.in${page.meta.url}`,
        provider: doctors.map((doctor) =>
          physicianRef(doctor.href.split("/")[1]),
        ),
        areaServed: "India",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `https://www.rehabify.in${page.meta.url}`,
          availableLanguage: languages,
        },
      },
    ],
    medicalWebPage({
      ...page.meta,
      lastReviewed: facts.lastReviewed || undefined,
    }),
  );
  const glanceFacts = [
    {
      label: "Who you see",
      value: doctors
        .map((doctor) =>
          [doctor.name, doctor.credentials].filter(Boolean).join(", "),
        )
        .join("; "),
    },
    { label: "How long", value: facts.videoLength },
    {
      label: "What you need",
      value: "A phone or laptop with a camera, a quiet room, space to move",
    },
    {
      label: "Good for",
      value:
        "First advice, follow-ups, home programmes, report reviews, family questions after a stroke",
    },
    {
      label: "Not for",
      value: "Emergencies, or problems that need an examination or a procedure",
    },
    { label: "Languages", value: languages.join(", ") },
    { label: "Platform", value: facts.videoPlatform },
    { label: "Hours", value: facts.videoHours },
  ];
  return (
    <div className="care-page doctors-page video-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      <section
        className="care-hero care-container"
        aria-labelledby="video-heading"
      >
        <DirectoryBreadcrumb label="Video consultation" />
        <div className="care-hero-columns doctors-hero-columns video-hero-columns">
          <div>
            <p className="care-kicker">Video consultation</p>
            <div id="video-heading">
              <H1 className="care-title" text={page.meta.h1} />
            </div>
            <p className="care-intro">{text("Intro")}</p>
            <div className="doctors-actions">
              <Link
                className="btn btn-primary"
                href="/contact/?format=video#book"
              >
                Book a video consult
              </Link>
              <Link className="btn care-guide" href="#fit">
                Is video right for me?{" "}
                <span className="video-down-arrow">
                  <Icon name="arrow" size={18} />
                </span>
              </Link>
            </div>
          </div>
          {firstDoctor && (
            <figure className="video-call-window">
              <div className="video-call-topbar">
                <span className="video-call-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="video-call-label">Video consult</span>
                <span className="video-call-private">
                  <Icon name="lock" size={13} />
                  Private call
                </span>
              </div>
              <div className="video-call-screen">
                <div className="video-call-crop">
                  <Image
                    src="/images/doctors/dr-dharshan-video.jpg"
                    alt={altFor("doctors/dr-dharshan-video.jpg")}
                    fill
                    preload
                    sizes="(max-width: 999px) 100vw, 560px"
                  />
                </div>
                <div className="video-self-view" aria-hidden="true">
                  <Icon name="user" size={60} />
                  <span>You</span>
                </div>
                <div className="video-call-name">
                  <span>{firstDoctor.name}</span>
                  {firstDoctor.credentials && (
                    <small>{firstDoctor.credentials}</small>
                  )}
                </div>
                <div className="video-call-controls" aria-hidden="true">
                  <span>
                    <Icon name="mic" size={17} />
                  </span>
                  <span>
                    <Icon name="video" size={17} />
                  </span>
                  <span className="video-call-end">
                    <Icon name="phone" size={17} />
                  </span>
                </div>
              </div>
              <figcaption>
                Illustration: {firstDoctor.name} during a video consult
              </figcaption>
            </figure>
          )}
        </div>
        <DirectoryFacts
          facts={[
            {
              value: doctors.length,
              label: `rehab doctor${doctors.length === 1 ? "" : "s"} on the call, MD (PMR)`,
            },
            { value: languages.length, label: "languages spoken" },
            { value: 0, label: "travel for follow-ups" },
            { value: 0, label: "referrals needed to book" },
          ]}
        />
      </section>
      <VideoFitChecker />
      <section
        id="how"
        className="care-container video-how"
        aria-labelledby="video-how-heading"
      >
        <div className="video-how-intro">
          <p className="care-kicker">How it works</p>
          <h2 id="video-how-heading">
            Six steps, from booking to <span className="serif">plan.</span>
          </h2>
          <p>
            The same care as a clinic visit, done on camera. If you need to be
            examined in person, the doctor will say so.
          </p>
        </div>
        <ol className="video-steps">
          {steps.map((step, index) => (
            <li key={step.title} id={`video-step-${index + 1}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
                {index === 2 && (
                  <span className="video-guidelines">
                    Telemedicine Practice Guidelines, India
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="ready"
        className="care-container video-ready"
        aria-labelledby="video-ready-heading"
      >
        <DirectorySectionHeader
          id="video-ready-heading"
          kicker="Get ready"
          heading={
            <>
              Set up before the <span className="serif">call.</span>
            </>
          }
          description="A little set-up means the doctor sees how you move, not just your face."
        />
        <div className="video-ready-columns">
          <div className="video-glance">
            <h3>At a glance</h3>
            <DirectoryFactsList
              facts={glanceFacts}
              className="video-glance-facts"
            />
          </div>
          <ul className="video-ready-tiles">
            {videoReadyItems.map((item) => (
              <li key={item.title}>
                <span className="video-ready-icon">
                  <Icon name={item.icon} size={26} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <DirectoryComparison
          items={[
            {
              label: "A video consult can",
              heading: (
                <>
                  Talk, watch and <span className="serif">plan.</span>
                </>
              ),
              points: [
                "Give first advice and review your scans and reports",
                "Watch how you walk, bend and lift on camera",
                "Set and update a home exercise programme",
                "Answer a family's questions after a stroke",
              ],
            },
            {
              label: "It cannot",
              heading: (
                <>
                  Replace a hands-on <span className="serif">exam.</span>
                </>
              ),
              action: (
                <Link href="/plan-your-visit/">
                  Plan a clinic visit <Icon name="arrow" size={16} />
                </Link>
              ),
              points: [
                "Some problems need a hands-on examination, scans or a procedure",
                "The doctor will tell you honestly if a video consult is not enough",
                "Never for emergencies: call 108 or 112",
              ],
            },
          ]}
        />
      </section>
      <DirectoryFaq
        heading={
          <>
            Before you <span className="serif">call.</span>
          </>
        }
        headingId="video-faq-heading"
        description="Short answers to what people ask most about video consults."
        faqs={faqs}
        reviewer={<DirectoryReviewer lastReviewed={facts.lastReviewed} />}
        reviewerPosition="intro"
      />
      <DirectoryBookingClose
        bookingLabel="Book a video consult"
        bookingHref="/contact/?format=video#book"
        heading={
          <>
            See your doctor without the <span className="serif">journey.</span>
          </>
        }
        description={
          'Choose "Video consult" when you book. The team confirms your time by phone or WhatsApp and tells you how to join.'
        }
        firstStep={'Online, on WhatsApp or by phone. Choose "Video consult".'}
        secondStep="By phone or WhatsApp, with how to join the call."
        lastStepTitle="You join from home"
        lastStep="With your reports beside you and room to move."
      />
    </div>
  );
}
