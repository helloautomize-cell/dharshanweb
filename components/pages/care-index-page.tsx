import Image from "next/image";
import Link from "next/link";
import { CareFinder } from "@/components/care-finder";
import { altFor } from "@/lib/alt-text";
import { CareEffects } from "@/components/care-effects";
import { CompactBodyMap } from "@/components/body-map";
import {
  H1,
  DirectoryBreadcrumb,
  DirectoryFacts,
  DirectorySectionHeader,
  DirectoryReviewer,
  DirectoryBookingClose,
} from "@/components/pages/shared";
import { getPage, section, type PageContent } from "@/lib/content";
import { getCareAreas, getCareRegions } from "@/lib/care";
import { breadcrumb, careItemList, graph } from "@/lib/schema";
import { Icon } from "@/lib/icons";
import { siteConfig } from "@/lib/site-config";
import { conditions } from "@/content/care-conditions";
import "./care.css";

const steps = [
  {
    title: "Assess",
    text: "History, examination and a careful look at your reports. What has changed, and what matters most to you.",
  },
  {
    title: "Set goals",
    text: "Clear, practical goals agreed with you and your family, such as walking to work or lifting a child.",
  },
  {
    title: "Treat and train",
    text: "Exercise first. Medicines, splints and image-guided procedures are added only when they are suitable.",
  },
  {
    title: "Review",
    text: "Regular check-ins, in clinic or by video, so the plan changes as you do.",
  },
];

export function CareIndexPage({ page }: { page: PageContent }) {
  const areas = getCareAreas();
  const topics = areas.flatMap((area) => area.topics);
  const letters = [
    ...new Set(conditions.map((condition) => condition.name[0].toUpperCase())),
  ].sort();
  const doctors = [getPage("/dr-dharshan-n-a/")!, getPage("/dr-selina-kh/")!];
  const formats = Object.keys(siteConfig.formats).filter(
    (format) => format === "clinic" || format === "video",
  );
  const data = graph(page.meta, [
    breadcrumb([
      { label: "Home", href: "/" },
      { label: "Care", href: "/care/" },
    ]),
    careItemList(areas),
  ]);
  return (
    <div className="care-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      <CareEffects />
      <section
        className="care-hero care-container"
        aria-labelledby="care-heading"
      >
        <DirectoryBreadcrumb label="Care" />
        <div className="care-hero-columns">
          <div>
            <p className="care-kicker">All care at Rehabify</p>
            <div id="care-heading">
              <H1 text={page.meta.h1} className="care-title" />
            </div>
            <p className="care-intro">
              {section(page, "Intro")?.body.split("\n")[0]}
            </p>
          </div>
          <CareFinder topics={topics} />
        </div>
        <DirectoryFacts
          reveal
          facts={[
            { value: areas.length, label: "areas of care" },
            { value: topics.length, label: "conditions and treatments" },
            { value: doctors.length, label: "physiatrists (MD PMR)" },
            {
              value: formats.length,
              label: "ways to be seen: clinic or video",
            },
          ]}
        />
        <figure className="care-exam" data-care-reveal>
          <Image
            src="/images/doctors/dr-dharshan-exam.jpg"
            alt={altFor("doctors/dr-dharshan-exam.jpg")}
            fill
            sizes="(max-width: 1279px) 92vw, 1240px"
          />
          <figcaption>
            <span className="care-kicker">Every plan starts here</span>
            <p>
              An examination of how you move, measured, not guessed. Then a plan
              built around what you want back.
            </p>
          </figcaption>
        </figure>
      </section>

      <section
        className="care-areas care-container care-section"
        id="areas"
        aria-labelledby="care-areas-heading"
      >
        <header className="care-section-head" data-care-reveal>
          <div>
            <p className="care-kicker">Areas of care</p>
            <h2 id="care-areas-heading">
              Five areas, <span className="serif">one</span> way of working.
            </h2>
          </div>
          <p>
            Each area has a guide that explains how care works, and a page for
            every condition or treatment in it.
          </p>
        </header>
        <div className="care-area-layout">
          <aside className="care-area-rail">
            <nav className="care-area-nav-list" aria-label="Areas of care">
              {areas.map((area, index) => (
                <Link
                  key={area.id}
                  href={`#${area.id}`}
                  aria-current={index === 0 ? "location" : undefined}
                >
                  <span>{area.title}</span>
                  <small>{area.topics.length}</small>
                </Link>
              ))}
            </nav>
            <p>
              Not sure which area?{" "}
              <Link href="#where">Start from where it hurts.</Link>
            </p>
          </aside>
          <div className="care-area-articles">
            {areas.map((area) => (
              <article
                className="care-area"
                id={area.id}
                key={area.id}
                aria-labelledby={`${area.id}-heading`}
              >
                <div data-care-reveal>
                  <div className="care-area-head">
                    <div>
                      <h3 id={`${area.id}-heading`}>{area.title}</h3>
                      <p>{area.summary}</p>
                    </div>
                    <Link
                      className="care-guide"
                      href={area.href}
                      aria-label={`${area.title}: area guide`}
                    >
                      Area guide <Icon name="arrow" size={18} />
                    </Link>
                  </div>
                  <dl className="care-area-meta">
                    <div>
                      <dt>For</dt>
                      <dd>{area.audience}</dd>
                    </div>
                    <div>
                      <dt>First step</dt>
                      <dd>{area.firstStep}</dd>
                    </div>
                  </dl>
                </div>
                <ul className="care-topic-grid">
                  {area.topics.map((topic) => (
                    <li key={topic.href} data-care-reveal>
                      <Link href={topic.href}>
                        <span>
                          <strong>{topic.title}</strong>
                          <small>{topic.summary}</small>
                        </span>
                        <span className="care-round-arrow">
                          <Icon name="arrow" size={18} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="a-z"
        className="care-az care-container care-section"
        aria-labelledby="care-az-heading"
      >
        <DirectorySectionHeader
          id="care-az-heading"
          kicker="A to Z"
          heading={
            <>
              Every condition, by <span className="serif">name.</span>
            </>
          }
          description="Looking for a specific name? Each one opens the page that covers it."
        />
        <nav className="care-az-letters" aria-label="Conditions A to Z letters">
          {letters.map((letter, index) => (
            <a
              key={letter}
              href={`#az-${letter}`}
              aria-current={index === 0 ? "location" : undefined}
            >
              {letter}
            </a>
          ))}
        </nav>
        <div className="care-az-list">
          {letters.map((letter) => (
            <section
              key={letter}
              id={`az-${letter}`}
              className="care-az-group"
              aria-labelledby={`az-${letter}-heading`}
            >
              <h3 id={`az-${letter}-heading`}>{letter}</h3>
              <ul>
                {conditions
                  .filter(
                    (condition) => condition.name[0].toUpperCase() === letter,
                  )
                  .map((condition) => (
                    <li key={condition.name}>
                      <Link href={condition.href}>{condition.name}</Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section
        className="care-where care-container"
        id="where"
        data-care-reveal
        aria-label="Start from where it hurts"
      >
        <CompactBodyMap careRegions={getCareRegions(topics)} />
      </section>

      <section
        className="care-how care-container care-section"
        aria-labelledby="care-how-heading"
      >
        <DirectorySectionHeader
          reveal
          id="care-how-heading"
          kicker="How care works"
          heading={
            <>
              The same four steps, in <span className="serif">every</span> area.
            </>
          }
          description="A back, a stroke or a child's first steps need different treatments. The way we plan them stays the same."
        />
        <ol className="care-steps">
          {steps.map((step, index) => (
            <li key={step.title} data-care-reveal>
              <span className="care-step-number">Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="care-formats" data-care-reveal>
          <p>
            <b>Clinic visit.</b> For a first examination and any procedure.
          </p>
          <p>
            <b>Video consult.</b> For follow-ups, home programmes and family
            questions.
          </p>
          <Link href="/video-consultation/">
            Compare the two <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>

      <section
        className="care-doctors care-container care-section"
        id="doctors"
        aria-labelledby="care-doctors-heading"
      >
        <div data-care-reveal>
          <p className="care-kicker">Who leads your care</p>
          <h2 id="care-doctors-heading">
            A rehab doctor, from the <span className="serif">first</span> visit.
          </h2>
          <p>
            Your plan is led by a physiatrist, a doctor trained in physical
            medicine and rehabilitation, who works with your therapists and your
            other doctors.
          </p>
        </div>
        <div>
          <ul className="care-doctor-list">
            {doctors.map(({ meta }) => (
              <li key={meta.url} data-care-reveal>
                <Link href={meta.url}>
                  <Image
                    src={`/images/doctors/${meta.avatar}.jpg`}
                    width={96}
                    height={96}
                    alt=""
                  />
                  <span>
                    <h3>{meta.h1?.replaceAll("*", "")}</h3>
                    <p>{meta.credentials}</p>
                    <small>{meta.focusAreas}</small>
                  </span>
                  <span className="care-round-arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <DirectoryReviewer
            reveal
            showPending
            lastReviewed={page.meta.lastReviewed}
          />
        </div>
      </section>

      <DirectoryBookingClose
        reveal
        heading={
          <>
            One visit to find the <span className="serif">right</span> care.
          </>
        }
        description="You do not need to know the area or the condition. Tell us what is wrong and the team confirms your time by phone or WhatsApp."
      />
    </div>
  );
}
