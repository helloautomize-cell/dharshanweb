import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";
import {
  DirectoryBreadcrumb,
  DirectoryBookingClose,
  DirectoryFaq,
  DirectorySectionHeader,
  H1,
} from "@/components/pages/shared";
import { GuideReader } from "@/components/guide-reader";
import {
  accentTitle,
  atAGlance,
  areaChildren,
  areaPages,
  careArea,
  cleanBody,
  countWord,
  dashList,
  hasConfirm,
  numberedSteps,
  paragraphText,
  sectionBody,
  sourceList,
  urgentText,
} from "@/lib/care-pages";
import { extractFaqs } from "@/lib/faqs";
import { getPage, type PageContent } from "@/lib/content";
import { guideDoctor } from "@/lib/guide-content.mjs";
import { BlockRenderer, renderInline } from "@/lib/markdown";
import { breadcrumb, faqPage, graph, medicalWebPage } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import "./care.css";
import "./doctors.css";
import "./guides.css";
import "./care-pages.css";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function plainH1(meta: PageContent["meta"]) {
  return (meta.h1 ?? meta.title.replace(/\s*\|.*$/, "")).replaceAll("*", "");
}

// Lowercases the H1 for mid-sentence use while keeping names and
// acronyms (Parkinson's, PRP, MRI) as written.
const KEEP_CASE = new Set(["Parkinson's", "Rehabify"]);
function lowerH1(title: string) {
  return title
    .split(/\s+/)
    .map((word) =>
      /^[A-Z]{2,}$/.test(word.replace(/[^A-Za-z]/g, "")) || KEEP_CASE.has(word)
        ? word
        : word.charAt(0).toLowerCase() + word.slice(1),
    )
    .join(" ");
}

const stripMd = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");

function cleanHeading(heading: string) {
  return heading.replace(/\s*\(([^)]+)\)\s*$/, "");
}
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function pageFaqs(page: PageContent) {
  const s = page.sections.find((sec) => /^faqs?/i.test(sec.heading));
  if (!s) return [];
  return extractFaqs(s.body)
    .filter((faq) => !hasConfirm(faq.question) && !hasConfirm(faq.answer))
    .map((faq) => ({
      question: stripMd(faq.question),
      answer: stripMd(faq.answer),
      answerContent: renderInline(faq.answer) as ReactNode,
    }));
}

function lastReviewedDate(meta: PageContent["meta"]) {
  const value = meta.lastReviewed?.trim();
  return value && !hasConfirm(value) ? value : undefined;
}

function findNamed(page: PageContent, re: RegExp) {
  return page.sections.find((sec) => re.test(sec.heading));
}

function CareHero({
  page,
  chip,
  secondary,
  breadcrumbItems,
}: {
  page: PageContent;
  chip: ReactNode;
  secondary: ReactNode;
  breadcrumbItems: { label: string; href?: string }[];
}) {
  const meta = page.meta;
  const lede =
    paragraphText(sectionBody(page, /^intro/i)) || meta.summary || "";
  const glance = atAGlance(page);
  return (
    <header className="cp-hero care-container">
      <DirectoryBreadcrumb label={plainH1(meta)} items={breadcrumbItems} />
      <div className="cp-hero-grid">
        <div className="cp-hero-main">
          {chip}
          <H1
            className="cp-title"
            text={accentTitle(meta.h1 ?? plainH1(meta))}
          />
          <p className="cp-lede">{lede}</p>
          <div className="cp-actions">
            <Link className="btn btn-primary" href="/contact/#book">
              <Icon name="calendar" size={20} />
              Book a consultation
            </Link>
            {secondary}
          </div>
        </div>
        {glance.length > 0 && (
          <aside className="cp-glance" aria-label="At a glance">
            <p className="care-kicker">At a glance</p>
            <dl>
              {glance.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{renderInline(row.value)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </header>
  );
}

function CareReviewLine({
  reviewerId,
  lastReviewed,
}: {
  reviewerId: string;
  lastReviewed?: string;
}) {
  const reviewer = guideDoctor(reviewerId);
  return (
    <div className="cp-review-line">
      <Image src={reviewer.avatar} width={28} height={28} alt="" />
      <p>
        Medically reviewed by <Link href={reviewer.href}>{reviewer.name}</Link>,
        consultant in physical medicine and rehabilitation.
        {lastReviewed && (
          <>
            {" "}
            · Last reviewed <time dateTime={lastReviewed}>{lastReviewed}</time>
          </>
        )}
      </p>
    </div>
  );
}

function CareBookingClose() {
  return (
    <DirectoryBookingClose
      heading={
        <>
          Tell us where it hurts. We plan the way{" "}
          <span className="serif">back.</span>
        </>
      }
      description="Start with one consultation. Choose a clinic visit or a video consult, and the team confirms your time by phone or WhatsApp."
    />
  );
}

export function CareAreaPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const area = careArea(meta.url)!;
  const children = areaChildren(area);
  const faqs = pageFaqs(page);
  const stepsSection = findNamed(page, /what your care includes/i);
  const { steps } = numberedSteps(
    stepsSection ? cleanBody(stepsSection.body) : null,
  );
  const doctor = guideDoctor(meta.reviewer ?? "dr-dharshan-n-a");
  const docMeta = getPage(doctor.href)?.meta;
  const lastReviewed = lastReviewedDate(meta);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Care", href: "/care/" },
    { label: area.name, href: meta.url },
  ];
  return (
    <div className="care-page doctors-page guides-page cp-area">
      <JsonLd
        data={graph(meta, [
          medicalWebPage(meta),
          faqs.length ? faqPage(faqs) : null,
          breadcrumb(crumbs),
        ])}
      />
      <CareHero
        page={page}
        breadcrumbItems={crumbs.slice(1)}
        chip={<span className="guide-topic-link cp-chip">Care area</span>}
        secondary={
          <Link className="btn care-guide" href="#in-area">
            See conditions
            <Icon name="chevronDown" size={18} />
          </Link>
        }
      />
      <section
        id="in-area"
        className="cp-sec care-container"
        aria-labelledby="in-area-heading"
      >
        <DirectorySectionHeader
          id="in-area-heading"
          kicker="Care in this area"
          heading={
            <>
              Pick a <span className="serif">condition.</span>
            </>
          }
          description="Each page explains the condition, what happens at your visit and when to get help urgently."
        />
        <ol className="cp-rows">
          {children.map((child) => (
            <li key={child.meta.url}>
              <Link className="cp-row" href={child.meta.url}>
                <span className="cp-row-main">
                  <h3>{plainH1(child.meta)}</h3>
                  <span className="cp-row-kind">
                    {child.meta.kind ?? "Condition"}
                  </span>
                </span>
                <span className="cp-row-desc">{child.meta.description}</span>
                <span className="cp-row-arrow" aria-hidden="true">
                  <Icon name="arrow" size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      {steps.length > 0 && (
        <section
          className="cp-sec care-container"
          aria-labelledby="includes-heading"
        >
          <DirectorySectionHeader
            id="includes-heading"
            kicker="What your care includes"
            heading={
              <>
                {countWord(steps.length)} steps, in{" "}
                <span className="serif">order.</span>
              </>
            }
            description="The doctor decides the right tests and treatment for you after examining you."
          />
          <ol className="cp-steps">
            {steps.map((step, index) => (
              <li key={step.lead || index}>
                <span className="cp-step-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.lead || "Step"}</h3>
                {step.text && <p>{renderInline(step.text)}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}
      <section
        className="cp-sec care-container"
        aria-labelledby="doctor-heading"
      >
        <h2 id="doctor-heading" className="sr-only">
          Who you will see
        </h2>
        <div className="cp-doctor">
          <Image
            src={doctor.avatar}
            width={120}
            height={120}
            alt=""
            className="cp-doctor-photo"
          />
          <div className="cp-doctor-text">
            <p className="care-kicker">Who you will see</p>
            <h3>{doctor.name}</h3>
            <p>
              Consultant in physical medicine and rehabilitation, with a
              fellowship in interventional pain management.
            </p>
            <p className="cp-doctor-quals">{doctor.credentials}.</p>
          </div>
          <div className="cp-doctor-actions">
            <Link className="btn care-guide" href={doctor.href}>
              View profile
            </Link>
            <Link className="btn btn-primary cp-btn-sm" href="/contact/#book">
              {docMeta?.doctor?.bookLabel ?? `Book with ${doctor.name}`}
            </Link>
          </div>
        </div>
      </section>
      <DirectoryFaq
        heading={
          <>
            Before you <span className="serif">book.</span>
          </>
        }
        description={`Short answers to what people ask most about ${area.name.toLowerCase()}.`}
        faqs={faqs}
        headingId="care-faq-heading"
        lastReviewed={lastReviewed}
        reviewer={
          <CareReviewLine
            reviewerId={meta.reviewer ?? "dr-dharshan-n-a"}
            lastReviewed={lastReviewed}
          />
        }
      />
      <section className="cp-sec care-container" aria-label="Other care areas">
        <div className="cp-other">
          <p className="care-kicker">Other care areas</p>
          <ul>
            {areaPages()
              .filter((other) => other.meta.url !== meta.url)
              .map((other) => (
                <li key={other.meta.url}>
                  <Link href={other.meta.url} className="cp-area-pill">
                    {plainH1(other.meta)}
                    <Icon name="arrow" size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <CareBookingClose />
    </div>
  );
}

export function CareConditionPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const area = careArea(meta.url)!;
  const faqs = pageFaqs(page);
  const reviewer = guideDoctor(meta.reviewer ?? "dr-dharshan-n-a");
  const lastReviewed = lastReviewedDate(meta);
  const title = plainH1(meta);

  const whoSection = findNamed(page, /^who should see/i);
  const whoHeading = whoSection ? cleanHeading(whoSection.heading) : "";
  const whoBody = whoSection ? cleanBody(whoSection.body) : null;
  const whoItems = dashList(whoBody);
  const happens = numberedSteps(sectionBody(page, /what happens at rehabify/i));
  const prepare = dashList(
    sectionBody(page, /^how to prepare|^before your visit/i),
  );
  const after = paragraphText(sectionBody(page, /^after your visit/i));
  const urgent = urgentText(page);
  const sources = sourceList(sectionBody(page, /^sources$/i));

  const KNOWN =
    /^(intro|at a glance|who should see|what happens at rehabify|how to prepare|before your visit|after your visit|when to get help|faqs?|sources|confirmations raised|care in this area|what your care includes|_prelude)/i;
  const middleSections = page.sections.filter(
    (s) => !KNOWN.test(s.heading.trim()),
  );
  const middles = middleSections.map((s) => ({
    section: s,
    heading: cleanHeading(s.heading),
  }));

  const toc: { id: string; label: string }[] = [
    ...middles.map((m) => ({ id: slugify(m.heading), label: m.heading })),
    ...(whoItems.length
      ? [{ id: slugify(whoHeading), label: whoHeading }]
      : []),
    ...(happens.steps.length || happens.note
      ? [{ id: "what-happens-at-rehabify", label: "What happens at Rehabify" }]
      : []),
    ...(prepare.length || after
      ? [
          {
            id: "before-and-after-your-visit",
            label: "Before and after your visit",
          },
        ]
      : []),
    ...(urgent
      ? [
          {
            id: "when-to-get-help-urgently",
            label: "When to get help urgently",
          },
        ]
      : []),
    ...(faqs.length
      ? [{ id: "common-questions", label: "Common questions" }]
      : []),
    ...(sources.length ? [{ id: "sources", label: "Sources" }] : []),
  ];

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Care", href: "/care/" },
    { label: area.name, href: `/${area.slug}/` },
    { label: title, href: meta.url },
  ];

  const children = areaChildren(area);
  const relatedPages: PageContent[] = [];
  for (const url of meta.related ?? []) {
    if (relatedPages.length >= 2) break;
    if (url === meta.url) continue;
    const rel = getPage(url);
    if (rel && !relatedPages.includes(rel)) relatedPages.push(rel);
  }
  for (const child of children) {
    if (relatedPages.length >= 2) break;
    if (child.meta.url !== meta.url && !relatedPages.includes(child))
      relatedPages.push(child);
  }

  return (
    <div className="care-page doctors-page guides-page guide-article cp-condition">
      <JsonLd
        data={graph(meta, [
          medicalWebPage(meta),
          faqs.length ? faqPage(faqs) : null,
          breadcrumb(crumbs),
        ])}
      />
      <CareHero
        page={page}
        breadcrumbItems={crumbs.slice(1)}
        chip={
          <Link className="guide-topic-link" href={`/${area.slug}/`}>
            {area.name}
          </Link>
        }
        secondary={
          <Link className="btn care-guide" href={siteConfig.whatsapp}>
            <Icon name="whatsapp" size={18} />
            Message on WhatsApp
          </Link>
        }
      />
      <div className="guide-layout care-container cp-body">
        <GuideReader
          label="On this page"
          sections={toc}
          related={
            <div className="guide-related-care">
              <p className="care-kicker">Clinic or video</p>
              <h2>Questions about {lowerH1(title)}?</h2>
              <p>The team confirms your time by phone or WhatsApp.</p>
              <div>
                <Link className="btn btn-primary" href="/contact/#book">
                  Book a consultation
                </Link>
              </div>
            </div>
          }
        />
        <article className="guide-content" id="guide-body" aria-label={title}>
          {middles.map(({ section: s, heading }) => (
            <section key={s.heading} aria-labelledby={slugify(heading)}>
              <h2 id={slugify(heading)}>{heading}</h2>
              <BlockRenderer body={cleanBody(s.body)} />
            </section>
          ))}
          {whoItems.length > 0 && (
            <section aria-labelledby={slugify(whoHeading)}>
              <h2 id={slugify(whoHeading)}>{whoHeading}</h2>
              <div className="guide-brief">
                <p className="care-kicker">Signs to get checked</p>
                <ul>
                  {whoItems.map((item) => (
                    <li key={item}>{renderInline(item)}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
          {(happens.steps.length > 0 || happens.note) && (
            <section aria-labelledby="what-happens-at-rehabify">
              <h2 id="what-happens-at-rehabify">What happens at Rehabify</h2>
              <ol className="cp-ordered">
                {happens.steps.map((step, index) => (
                  <li key={step.lead || index}>
                    <span className="cp-ordered-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {step.lead && <h3>{step.lead}</h3>}
                      {step.text && <p>{renderInline(step.text)}</p>}
                    </div>
                  </li>
                ))}
              </ol>
              {happens.note && <p className="cp-note">{happens.note}</p>}
            </section>
          )}
          {(prepare.length > 0 || after) && (
            <section aria-labelledby="before-and-after-your-visit">
              <h2 id="before-and-after-your-visit">
                Before and after your visit
              </h2>
              <div className="cp-visit-grid">
                {prepare.length > 0 && (
                  <div className="cp-visit-card">
                    <h3>How to prepare</h3>
                    <ul className="content-list">
                      {prepare.map((item) => (
                        <li key={item}>{renderInline(item)}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {after && (
                  <div className="cp-visit-card">
                    <h3>After your visit</h3>
                    <p>{after}</p>
                  </div>
                )}
              </div>
            </section>
          )}
          {urgent && (
            <section aria-labelledby="when-to-get-help-urgently">
              <h2 id="when-to-get-help-urgently">When to get help urgently</h2>
              <div className="guide-emergency on-night" data-dark role="note">
                <span className="guide-emergency-icon">
                  <Icon name="emergency" size={22} />
                </span>
                <div>
                  <p className="care-kicker">Medical emergency</p>
                  <p>{urgent}</p>
                  <div className="guide-emergency-actions">
                    <Link className="btn guide-call-emergency" href="tel:108">
                      Call 108
                    </Link>
                    <Link className="btn btn-ghost" href="tel:112">
                      Call 112
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
          {faqs.length > 0 && (
            <section aria-labelledby="common-questions">
              <h2 id="common-questions">Common questions</h2>
              <div className="doctors-faq guide-faq">
                <div className="doctors-faq-list">
                  {faqs.map((faq, index) => (
                    <details key={faq.question} open={index === 0}>
                      <summary>
                        <span>{faq.question}</span>
                        <span className="doctors-faq-toggle">
                          <Icon name="plus" size={20} />
                        </span>
                      </summary>
                      <p>{faq.answerContent ?? faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )}
          {sources.length > 0 && (
            <section aria-labelledby="sources">
              <h2 id="sources">Sources</h2>
              <ol className="guide-sources">
                {sources.map((source, index) => (
                  <li key={`${source.title}-${index}`}>
                    <span>[{index + 1}]</span>
                    <p>
                      {source.publisher ? (
                        <>
                          <strong>{source.publisher}.</strong> {source.title}
                        </>
                      ) : (
                        source.title
                      )}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <aside className="guide-medical-review" aria-label="Medical review">
            <Image src={reviewer.avatar} width={56} height={56} alt="" />
            <div>
              <p className="care-kicker">Medical review</p>
              <p>{reviewer.name}</p>
              <p>
                Consultant in physical medicine and rehabilitation.
                {lastReviewed && (
                  <>
                    {" "}
                    · Last reviewed{" "}
                    <time dateTime={lastReviewed}>{lastReviewed}</time>
                  </>
                )}
              </p>
              <Link href={reviewer.href}>
                View profile <Icon name="arrow" size={16} />
              </Link>
            </div>
          </aside>
          <p className="guide-disclaimer">
            This page is for general education and does not replace a
            consultation. The right plan depends on your examination.
          </p>
        </article>
      </div>
      <section
        className="care-container guide-related cp-related"
        aria-labelledby="related-heading"
      >
        <DirectorySectionHeader
          id="related-heading"
          kicker="Related care"
          heading={
            <>
              Related <span className="serif">care.</span>
            </>
          }
          description={`Pages that often go together with ${lowerH1(title)}.`}
        />
        <div className="guide-related-grid">
          <div className="guide-related-care on-night" data-dark>
            <p className="care-kicker">Care area</p>
            <h3>All {area.name.toLowerCase()} care</h3>
            <p>{getPage(`/${area.slug}/`)?.meta.description}</p>
            <div>
              <Link className="btn btn-invert" href={`/${area.slug}/`}>
                See the area
              </Link>
              <Link className="btn btn-ghost" href="/contact/#book">
                Book
              </Link>
            </div>
          </div>
          {relatedPages.map((rel) => (
            <Link key={rel.meta.url} className="guide-card" href={rel.meta.url}>
              <span className="guide-card-topic">
                {rel.meta.kind ?? "Condition"}
              </span>
              <h3>{plainH1(rel.meta)}</h3>
              <p>{rel.meta.description}</p>
              <div className="guide-card-bottom">
                <span className="guide-card-meta">
                  <span>{careArea(rel.meta.url)?.name ?? area.name}</span>
                </span>
                <span className="guide-card-arrow" aria-hidden="true">
                  <Icon name="arrow" size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CareBookingClose />
    </div>
  );
}
