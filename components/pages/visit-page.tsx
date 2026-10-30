import Link from "next/link";
import { DirectoryNightPanel } from "@/components/directory-panel";
import { MapFacade } from "@/components/map-facade";
import { VisitChecklist } from "@/components/visit-checklist";
import { VisitHours } from "@/components/visit-hours";
import {
  DirectoryBookingClose,
  DirectoryHero,
  DirectoryComparison,
  DirectoryFaq,
  DirectoryPrinciples,
  DirectorySectionHeader,
} from "@/components/pages/shared";
import { section, type PageContent } from "@/lib/content";
import { extractFaqs } from "@/lib/faqs";
import { Icon } from "@/lib/icons";
import { breadcrumb, faqPage, graph } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import {
  defaultChecklist,
  visitChecklist,
  visitFacts,
  visitValue,
} from "@/lib/visit";
import "./care.css";
import "./doctors.css";
import "./visit.css";

export function VisitPage({ page }: { page: PageContent }) {
  const text = (heading: string) => section(page, heading)?.body ?? "";
  const facts = {
    ...visitFacts,
    address: visitValue(visitFacts.address),
    landmark: visitValue(visitFacts.landmark),
    mapsUrl: visitValue(visitFacts.mapsUrl),
    transit: visitValue(visitFacts.transit),
    liftAndParking: visitValue(visitFacts.liftAndParking),
    videoHours: visitValue(visitFacts.videoHours),
    phoneHours: visitValue(visitFacts.phoneHours),
    firstConsultLength: visitValue(visitFacts.firstConsultLength),
    confirmTime: visitValue(visitFacts.confirmTime),
  };
  const faqs = [
    ...extractFaqs(text("FAQs")),
    ...(facts.firstConsultLength
      ? [
          {
            question: "How long is the first consultation?",
            answer: `About ${facts.firstConsultLength}. The doctor needs time to ask questions, examine how you move and explain the plan.`,
          },
        ]
      : []),
  ];
  const data = graph(page.meta, [
    breadcrumb([
      { label: "Home", href: "/" },
      { label: "Plan your visit", href: page.meta.url },
    ]),
    faqPage(faqs),
  ]);
  const locationComplete = [
    facts.address,
    facts.landmark,
    facts.mapsUrl,
    facts.transit,
    facts.liftAndParking,
  ].every(Boolean);
  const locationRows = [
    { label: "Address", value: facts.address },
    { label: "Landmark", value: facts.landmark },
    { label: "Metro or bus", value: facts.transit },
    { label: "Lift and parking", value: facts.liftAndParking },
    {
      label: "Wheelchair",
      value: "Tell us when you book if you need a wheelchair at the entrance.",
    },
  ];
  return (
    <div className="care-page doctors-page visit-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      <DirectoryHero
        label="Plan your visit"
        kicker="Plan your visit"
        headingId="visit-heading"
        title={page.meta.h1 ?? ""}
        description={text("Intro")}
        actions={
          <>
            <Link className="btn btn-primary" href="/contact/#book">
              Book a consultation
            </Link>
            <Link className="btn care-guide" href="#checklist">
              Build my checklist{" "}
              <span className="visit-down-arrow">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          </>
        }
        facts={[
          { value: 2, label: "ways to be seen: clinic or video" },
          { value: 1, label: "number for calls and WhatsApp" },
          { value: 0, label: "referrals needed to book" },
          {
            value: visitChecklist(defaultChecklist).length,
            label: "things worth bringing",
          },
        ]}
      />

      <VisitChecklist />

      <section
        id="getting-here"
        className="care-container"
        aria-labelledby="visit-location-heading"
      >
        <DirectoryNightPanel className="visit-location">
          <div className="doctors-chooser-intro">
            <p className="care-kicker">Getting here</p>
            <h2 id="visit-location-heading">
              Find us in <span className="serif">Bengaluru.</span>
            </h2>
            <p>
              {locationComplete
                ? "Directions, hours and access for your visit."
                : "Every detail here is checked with the clinic before it goes on the site. Until a detail is confirmed, call or WhatsApp us and we will tell you."}
            </p>
            <dl className="visit-location-facts">
              {locationRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.value || (
                      <span className="visit-pending">Being confirmed</span>
                    )}
                  </dd>
                </div>
              ))}
              <div>
                <dt>Calls and WhatsApp</dt>
                <dd>
                  <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
                  {facts.phoneHours && (
                    <span className="visit-phone-hours">
                      {facts.phoneHours}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="doctors-chooser-results visit-location-right">
            <MapFacade
              visit={{ address: facts.address, mapsUrl: facts.mapsUrl }}
            />
            <VisitHours hours={facts.hours} />
            <div className="visit-directions-help">
              <p>Need directions or times today?</p>
              <Link href={siteConfig.whatsapp}>
                WhatsApp {siteConfig.phone}
              </Link>
            </div>
          </div>
        </DirectoryNightPanel>
      </section>

      <section
        id="on-the-day"
        className="care-container care-section"
        aria-labelledby="visit-day-heading"
      >
        <DirectorySectionHeader
          id="visit-day-heading"
          kicker="On the day"
          heading={
            <>
              Small things that <span className="serif">help.</span>
            </>
          }
          description="So the doctor can see how you move, and nobody has to wait for paperwork."
        />
        <DirectoryPrinciples
          items={[
            {
              title: "What to wear",
              text: text("What to wear"),
              icon: <Icon name="check" size={22} />,
            },
            {
              title: "Access",
              text: `${text("Access")}${facts.liftAndParking ? ` ${facts.liftAndParking.replace(/[.!?]$/, "")}.` : ""}`,
              icon: <Icon name="pin" size={22} />,
            },
            {
              title: "Children",
              text: text("Children"),
              icon: <Icon name="file" size={22} />,
            },
          ]}
        />
        <DirectoryComparison
          items={[
            {
              label: "Clinic visit",
              heading: (
                <>
                  When you need to be <span className="serif">examined.</span>
                </>
              ),
              points: text("Clinic visit").split("\n").filter(Boolean),
            },
            {
              label: "Video consult",
              heading: (
                <>
                  When travel is <span className="serif">hard.</span>
                </>
              ),
              points: [
                ...text("Video consult").split("\n").filter(Boolean),
                ...(facts.videoHours ? [facts.videoHours] : []),
              ],
              action: (
                <Link href="/video-consultation/">
                  How video consults work <Icon name="arrow" size={16} />
                </Link>
              ),
            },
          ]}
        />
      </section>

      <DirectoryFaq
        headingId="visit-faq-heading"
        heading={
          <>
            Before you <span className="serif">visit.</span>
          </>
        }
        description="Short answers to what people ask most before a first consultation."
        faqs={faqs}
        lastReviewed={page.meta.lastReviewed}
      />

      <DirectoryBookingClose
        heading={
          <>
            Book your visit, we <span className="serif">confirm</span> the rest.
          </>
        }
        description={
          facts.confirmTime
            ? `${text("Booking").replace(/\.$/, "")} within ${facts.confirmTime}.`
            : text("Booking")
        }
      />
    </div>
  );
}
