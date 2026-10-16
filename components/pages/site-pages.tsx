import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";
import {
  DirectoryBreadcrumb,
  DirectoryBookingClose,
  DirectoryFaqList,
  DirectorySectionHeader,
  H1,
} from "@/components/pages/shared";
import { GuideReader } from "@/components/guide-reader";
import { DoctorPortrait } from "@/components/primitives";
import {
  CARE_AREAS,
  cleanBody,
  dashList,
  hasConfirm,
  paragraphText,
  sectionBody,
} from "@/lib/care-pages";
import { extractFaqs } from "@/lib/faqs";
import { getPage, type PageContent } from "@/lib/content";
import { guideDoctor } from "@/lib/guide-content.mjs";
import { BlockRenderer, renderInline } from "@/lib/markdown";
import { breadcrumb, faqPage, graph, physician } from "@/lib/schema";
import { CareEffects } from "@/components/care-effects";
import { siteConfig } from "@/lib/site-config";
import { ChipGroup } from "@/components/chip-group";
import "./care.css";
import "./doctors.css";
import "./guides.css";
import "./care-pages.css";
import "./site-pages.css";

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
function accentH1(meta: PageContent["meta"]) {
  const raw = plainH1(meta);
  const star = (meta.h1 ?? "").match(/\*([^*]+)\*/);
  if (star) return raw.replace(star[1], `*${star[1]}*`);
  const words = raw.split(/\s+/);
  const last = words.pop()!;
  return `${words.join(" ")} *${last}*`;
}
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const stripMd = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");

// "- **Lead.** rest" bullets -> { lead, text } for numbered rows
function leadBullets(body: string | null) {
  return (body ?? "")
    .split("\n")
    .filter((line) => line.trim().startsWith("- ") && !hasConfirm(line))
    .map((line) => {
      const item = line.trim().slice(2);
      const m = item.match(/^\*\*([^*]+)\*\*\.?\s*(.*)$/);
      if (m) return { lead: m[1].trim().replace(/\.$/, ""), text: m[2].trim() };
      return { lead: "", text: item.replace(/\*\*/g, "").trim() };
    });
}

// "- Role, place (dates): detail" -> { label, text } timeline rows
function timelineRows(body: string | null) {
  return (body ?? "")
    .split("\n")
    .filter((line) => line.trim().startsWith("- ") && !hasConfirm(line))
    .map((line) => {
      const item = line.trim().slice(2).replace(/\*\*/g, "");
      const dates = item.match(/\(([^)]+)\)/);
      const text = item.replace(/\s*\([^)]+\)/, "").trim();
      return { label: dates ? dates[1] : "", text };
    });
}

// "| a | b | c |" markdown table -> { label, text } rows
function tableRows(body: string | null) {
  return (body ?? "")
    .split("\n")
    .filter(
      (line) =>
        line.trim().startsWith("|") &&
        !/^\|[\s-|]+\|?$/.test(line.trim()) &&
        !hasConfirm(line),
    )
    .map((line) => {
      const cells = line
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((c) => c.trim());
      return {
        label: cells[0] ?? "",
        text: cells.slice(1).filter(Boolean).join(", "),
      };
    })
    .filter((row) => row.label.toLowerCase() !== "years" && row.text);
}

function NumberedRows({ items }: { items: { lead: string; text: string }[] }) {
  return (
    <ol className="cp-steps">
      {items.map((item, index) => (
        <li key={item.lead || index}>
          <span className="cp-step-num">
            {String(index + 1).padStart(2, "0")}
          </span>
          {item.lead && <h3>{item.lead}</h3>}
          {item.text && <p>{renderInline(item.text)}</p>}
        </li>
      ))}
    </ol>
  );
}

function Timeline({ rows }: { rows: { label: string; text: string }[] }) {
  return (
    <div className="tl sp-tl">
      {rows.map((row, index) => (
        <div key={index}>
          <span className="mono">{row.label}</span>
          <p>{row.text}</p>
        </div>
      ))}
    </div>
  );
}

function BookingClose() {
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

function ReviewLine({
  reviewerId,
  lastReviewed,
}: {
  reviewerId?: string;
  lastReviewed?: string;
}) {
  const reviewer = guideDoctor(reviewerId ?? "dr-dharshan-n-a");
  const date =
    lastReviewed && !hasConfirm(lastReviewed) ? lastReviewed : undefined;
  return (
    <div className="cp-review-line">
      <Image src={reviewer.avatar} width={28} height={28} alt="" />
      <p>
        Medically reviewed by <Link href={reviewer.href}>{reviewer.name}</Link>,
        consultant in physical medicine and rehabilitation.
        {date && (
          <>
            {" "}
            · Last reviewed <time dateTime={date}>{date}</time>
          </>
        )}
      </p>
    </div>
  );
}

function pageFaqs(page: PageContent, headingRe = /^faqs?/i) {
  return page.sections
    .filter((sec) => headingRe.test(sec.heading))
    .flatMap((sec) => extractFaqs(sec.body))
    .filter((faq) => !hasConfirm(faq.question) && !hasConfirm(faq.answer))
    .map((faq) => ({
      question: stripMd(faq.question),
      answer: stripMd(faq.answer),
      answerContent: renderInline(faq.answer) as ReactNode,
    }));
}

function SmallHero({
  page,
  kicker,
  lede,
  updated,
  breadcrumbItems,
}: {
  page: PageContent;
  kicker: string;
  lede?: string;
  updated?: string;
  breadcrumbItems?: { label: string; href?: string }[];
}) {
  const intro = lede ?? paragraphText(sectionBody(page, /^intro/i)) ?? "";
  return (
    <header className="cp-hero care-container sp-hero">
      <DirectoryBreadcrumb
        label={plainH1(page.meta)}
        items={breadcrumbItems ?? [{ label: plainH1(page.meta) }]}
      />
      <div className="cp-hero-main">
        <p className="care-kicker">{kicker}</p>
        <H1 className="cp-title sp-title" text={accentH1(page.meta)} />
        {intro && <p className="cp-lede">{intro}</p>}
        {updated && !hasConfirm(updated) && (
          <p className="sp-updated">
            Last updated <time dateTime={updated}>{updated}</time>
          </p>
        )}
      </div>
    </header>
  );
}

/* ---------- C1 · About ---------- */

export function AboutPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const works = leadBullets(sectionBody(page, /^how we work/i));
  const why = sectionBody(page, /why rehabify was started/i);
  const facts = dashList(sectionBody(page, /facts at a glance/i)).map((row) => {
    const i = row.indexOf(":");
    return i === -1
      ? { label: row, value: "" }
      : { label: row.slice(0, i).trim(), value: row.slice(i + 1).trim() };
  });
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: meta.url },
  ];
  return (
    <div className="care-page doctors-page cp-area">
      <JsonLd data={graph(meta, [breadcrumb(crumbs)])} />
      <SmallHero page={page} kicker="About" breadcrumbItems={crumbs.slice(1)} />
      {facts.length > 0 && (
        <div className="care-container sp-facts">
          <dl className="doctors-profile-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {why && (
        <section
          className="cp-sec care-container sp-prose"
          aria-labelledby="about-why"
        >
          <h2 id="about-why" className="h3">
            Why Rehabify was started
          </h2>
          <BlockRenderer body={cleanBody(why)} />
        </section>
      )}
      {works.length > 0 && (
        <section className="cp-sec care-container" aria-labelledby="about-work">
          <DirectorySectionHeader
            id="about-work"
            kicker="How we work"
            heading={
              <>
                Five things, in <span className="serif">order.</span>
              </>
            }
            description="The way every plan at Rehabify is built and reviewed."
          />
          <NumberedRows items={works} />
        </section>
      )}
      <section className="cp-sec care-container" aria-labelledby="about-areas">
        <DirectorySectionHeader
          id="about-areas"
          kicker="What we look after"
          heading={
            <>
              Five care <span className="serif">areas.</span>
            </>
          }
          description="Each area page lists its conditions and what care includes."
        />
        <ol className="cp-rows">
          {CARE_AREAS.map((area) => {
            const ap = getPage(`/${area.slug}/`);
            return (
              <li key={area.slug}>
                <Link className="cp-row" href={`/${area.slug}/`}>
                  <span className="cp-row-main">
                    <h3>{area.name}</h3>
                    <span className="cp-row-kind">Care area</span>
                  </span>
                  <span className="cp-row-desc">{ap?.meta.description}</span>
                  <span className="cp-row-arrow" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
      <ReviewLine reviewerId="dr-dharshan-n-a" />
      <BookingClose />
    </div>
  );
}

/* ---------- C2 · Doctor profile ---------- */

const CONDITION_LINKS: Record<string, string> = {
  "low back pain": "/pain-and-spine/back-pain/",
  "back pain": "/pain-and-spine/back-pain/",
  "neck pain": "/pain-and-spine/neck-pain/",
  sciatica: "/pain-and-spine/sciatica/",
  "image-guided injections": "/pain-and-spine/image-guided-injections/",
  "nerve blocks": "/pain-and-spine/image-guided-injections/",
  stroke: "/neuro-rehabilitation/stroke/",
  "spinal cord injury": "/neuro-rehabilitation/spinal-cord-injury/",
  "head injury": "/neuro-rehabilitation/head-injury/",
  "parkinson's disease": "/neuro-rehabilitation/parkinsons/",
  spasticity: "/neuro-rehabilitation/spasticity/",
  "knee osteoarthritis": "/joints-and-sports/knee-pain/",
  "knee pain": "/joints-and-sports/knee-pain/",
  "shoulder pain": "/joints-and-sports/shoulder-pain/",
  "sports injuries": "/joints-and-sports/sports-injuries/",
  "after fracture or surgery": "/joints-and-sports/after-fracture-or-surgery/",
  "prp and prolotherapy": "/joints-and-sports/prp-and-prolotherapy/",
  "prosthetic training": "/joints-and-sports/prosthetic-rehab/",
  "cerebral palsy": "/childrens-rehabilitation/cerebral-palsy/",
  "duchenne muscular dystrophy":
    "/childrens-rehabilitation/muscular-dystrophy/",
  "muscular dystrophy": "/childrens-rehabilitation/muscular-dystrophy/",
  "developmental delay": "/childrens-rehabilitation/developmental-delay/",
  "falls and balance": "/older-adults/falls-and-balance/",
  osteoporosis: "/older-adults/osteoporosis/",
  "stroke rehabilitation": "/neuro-rehabilitation/stroke/",
  "spinal cord injury rehabilitation":
    "/neuro-rehabilitation/spinal-cord-injury/",
  "spasticity care": "/neuro-rehabilitation/spasticity/",
  "back, neck and joint pain": "/pain-and-spine/",
  "rheumatology-related pain": "/joints-and-sports/",
};

// "- Group: a · b · c" -> chip groups; bare "a · b · c" -> one group
function chipGroups(body: string | null) {
  const groups: { label: string; items: string[] }[] = [];
  for (const line of (body ?? "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || hasConfirm(trimmed)) continue;
    const isList = trimmed.startsWith("- ");
    const item = isList ? trimmed.slice(2) : trimmed;
    const m = item.match(/^([^:]{2,40}):\s*(.+)$/);
    const label = isList && m ? m[1].trim() : "";
    const text = isList && m ? m[2] : item;
    const items = text
      .split("·")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => !hasConfirm(s));
    if (items.length) groups.push({ label, items });
  }
  return groups;
}

export function DoctorProfilePage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const doc = meta.doctor!;
  const physicianId =
    meta.url === "/dr-selina-kh/" ? "dr-selina-kh" : "dr-dharshan-n-a";
  const name = plainH1(meta);
  const about = sectionBody(page, /^about$/i);
  const work = leadBullets(sectionBody(page, /^how .+ works/i));
  const educationBody = sectionBody(page, /education and training/i);
  const education = tableRows(educationBody);
  const educationNote = paragraphText(
    (educationBody ?? "")
      .split("\n")
      .filter((line) => !line.trim().startsWith("|"))
      .join("\n"),
  );
  const memberships = dashList(sectionBody(page, /^memberships/i));
  const research = dashList(sectionBody(page, /research publications/i));
  const experience = timelineRows(sectionBody(page, /^experience/i));
  const conditions = chipGroups(
    sectionBody(page, /conditions and services|care (she|he|they) look/i),
  );
  const faqs = pageFaqs(page);
  const lastReviewed =
    meta.lastReviewed && !hasConfirm(meta.lastReviewed)
      ? meta.lastReviewed
      : undefined;
  const facts: { label: string; value: string }[] = [
    meta.credentials
      ? { label: "Qualifications", value: meta.credentials }
      : null,
    doc.languages?.length
      ? { label: "Languages", value: doc.languages.join(", ") }
      : null,
    ...(doc.facts ?? []).map((f) => ({ label: f.label, value: f.value })),
    {
      label: "Formats",
      value: doc.videoConsults
        ? "Clinic visit or video consult"
        : "Clinic visit",
    },
  ].filter((f): f is { label: string; value: string } => !!f);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors/" },
    { label: name, href: meta.url },
  ];
  return (
    <div className="care-page doctors-page cp-area">
      <JsonLd
        data={graph(meta, [physician(physicianId), breadcrumb(crumbs)])}
      />
      <header className="cp-hero care-container sp-doc-hero">
        <DirectoryBreadcrumb label={name} items={crumbs.slice(1)} />
        <div className="cp-hero-grid">
          <div className="cp-hero-main">
            <p className="care-kicker">{doc.tag}</p>
            <H1 className="cp-title" text={accentH1(meta)} />
            <p className="cp-lede">
              Consultant in Physical Medicine and Rehabilitation
            </p>
            <div className="cp-actions">
              <Link
                className="btn btn-primary"
                href={`/contact/?doctor=${meta.url.replaceAll("/", "")}#book`}
              >
                <Icon name="calendar" size={20} />
                {doc.bookLabel}
              </Link>
              <Link className="btn care-guide" href={siteConfig.whatsapp}>
                <Icon name="whatsapp" size={18} />
                Message on WhatsApp
              </Link>
            </div>
          </div>
          <DoctorPortrait
            id={doc.portrait}
            alt={`${name}, consultant in physical medicine and rehabilitation`}
            priority
            className="sp-doc-portrait"
            sizes="(max-width: 999px) 80vw, 380px"
          />
        </div>
      </header>
      {facts.length > 0 && (
        <div className="care-container sp-facts">
          <dl className="doctors-profile-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {about && (
        <section
          className="cp-sec care-container sp-prose"
          aria-labelledby="doc-about"
        >
          <h2 id="doc-about" className="h3">
            About {name.split(" ").slice(0, 2).join(" ")}
          </h2>
          <BlockRenderer body={about} />
        </section>
      )}
      {work.length > 0 && (
        <section className="cp-sec care-container" aria-labelledby="doc-work">
          <DirectorySectionHeader
            id="doc-work"
            kicker="How they work"
            heading={
              <>
                Principles, in <span className="serif">order.</span>
              </>
            }
            description="How your plan is built and adjusted."
          />
          <NumberedRows items={work} />
        </section>
      )}
      {education.length > 0 && (
        <section
          className="cp-sec care-container"
          aria-labelledby="doc-education"
        >
          <DirectorySectionHeader
            id="doc-education"
            kicker="Education and training"
            heading={
              <>
                Qualifications and <span className="serif">training.</span>
              </>
            }
            description="Medical degrees and specialist training, in order."
          />
          <Timeline rows={education} />
          {educationNote && <p className="sp-tl-note">{educationNote}</p>}
        </section>
      )}
      {(memberships.length > 0 || research.length > 0) && (
        <section className="cp-sec care-container" aria-labelledby="doc-lists">
          <h2 id="doc-lists" className="sr-only">
            Memberships and research
          </h2>
          <div className="sp-list-pair">
            {memberships.length > 0 && (
              <div>
                <h3 className="sp-list-title">Memberships</h3>
                <ul className="content-list">
                  {memberships.map((item) => (
                    <li key={item}>{renderInline(item)}</li>
                  ))}
                </ul>
              </div>
            )}
            {research.length > 0 && (
              <div>
                <h3 className="sp-list-title">
                  Research publications (International Journal of Scientific
                  Research)
                </h3>
                <ul className="content-list">
                  {research.map((item) => (
                    <li key={item}>{renderInline(item)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
      {experience.length > 0 && (
        <section
          className="cp-sec care-container"
          aria-labelledby="doc-experience"
        >
          <DirectorySectionHeader
            id="doc-experience"
            kicker="Experience"
            heading={
              <>
                Clinical <span className="serif">experience.</span>
              </>
            }
            description="Roles in rehabilitation and pain care."
          />
          <Timeline rows={experience} />
        </section>
      )}
      {conditions.length > 0 && (
        <section
          className="cp-sec care-container"
          aria-labelledby="doc-conditions"
        >
          <DirectorySectionHeader
            id="doc-conditions"
            kicker={meta.url === "/dr-selina-kh/" ? "Care" : "Conditions"}
            heading={
              <>
                Care {name.split(" ").slice(0, 2).join(" ")} looks{" "}
                <span className="serif">after.</span>
              </>
            }
            description="Chips link to the matching care page."
          />
          <div className="sp-chip-groups">
            {conditions.map((group) => (
              <div className="sp-chip-group" key={group.label || "all"}>
                {group.label && <p className="care-kicker">{group.label}</p>}
                <ChipGroup
                  limit={6}
                  items={group.items.map((item) => {
                    const href = CONDITION_LINKS[item.toLowerCase()];
                    return href ? { label: item, href } : { label: item };
                  })}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      {faqs.length > 0 && (
        <section
          className="cp-sec care-container doctors-faq"
          aria-labelledby="doc-faq"
        >
          <div>
            <p className="care-kicker">Questions</p>
            <h2 id="doc-faq">Before you book.</h2>
            <p>What people ask about seeing {name}.</p>
          </div>
          <div>
            <DirectoryFaqList faqs={faqs} />
            <ReviewLine
              reviewerId={meta.reviewer ?? "dr-dharshan-n-a"}
              lastReviewed={lastReviewed}
            />
          </div>
        </section>
      )}
      <BookingClose />
    </div>
  );
}

/* ---------- C4 · FAQs ---------- */

export function FaqsPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const groups = page.sections
    .filter((s) => s.heading !== "_prelude")
    .map((s) => ({
      heading: s.heading,
      id: slugify(s.heading),
      faqs: extractFaqs(s.body)
        .filter((f) => !hasConfirm(f.question) && !hasConfirm(f.answer))
        .map((f) => ({
          question: stripMd(f.question),
          answer: stripMd(f.answer),
          answerContent: renderInline(f.answer) as ReactNode,
        })),
    }))
    .filter((g) => g.faqs.length > 0);
  const all = groups.flatMap((g) => g.faqs);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "FAQs", href: meta.url },
  ];
  return (
    <div className="care-page doctors-page cp-area faqs-page">
      <JsonLd data={graph(meta, [faqPage(all), breadcrumb(crumbs)])} />
      <SmallHero page={page} kicker="FAQs" breadcrumbItems={crumbs.slice(1)} />
      <div className="care-container">
        <div className="care-area-layout">
          <aside className="care-area-rail">
            <nav className="care-area-nav-list" aria-label="Question topics">
              {groups.map((g, index) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  aria-current={index === 0 ? "location" : undefined}
                >
                  <span>{g.heading}</span>
                  <small>{g.faqs.length}</small>
                </a>
              ))}
            </nav>
          </aside>
          <div className="care-area-articles sp-faq-groups">
            {groups.map((g) => (
              <section
                key={g.id}
                id={g.id}
                className="care-area sp-faq-group"
                aria-labelledby={`${g.id}-h`}
              >
                <h2 className="sp-faq-k" id={`${g.id}-h`}>
                  {g.heading}
                </h2>
                <DirectoryFaqList faqs={g.faqs} />
              </section>
            ))}
          </div>
        </div>
      </div>
      <ReviewLine reviewerId="dr-dharshan-n-a" />
      <BookingClose />
      <CareEffects />
    </div>
  );
}

/* ---------- C5 · Thank you ---------- */

export function ThankYouPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Thank you", href: meta.url },
  ];
  const steps = [
    {
      title: "You send a request",
      text: "Online, on WhatsApp or by phone.",
      done: true,
    },
    {
      title: "We confirm a time",
      text: "By phone or WhatsApp, for the clinic or a video consult.",
      done: false,
    },
    {
      title: "You meet your doctor",
      text: "Bring your reports and wear loose clothes.",
      done: false,
    },
  ];
  return (
    <div className="care-page doctors-page cp-area sp-thanks">
      <JsonLd data={graph(meta, [breadcrumb(crumbs)])} />
      <SmallHero
        page={page}
        kicker="Request received"
        breadcrumbItems={crumbs.slice(1)}
      />
      <div className="care-container sp-thanks-body">
        <p className="cp-lede">
          We have your request. The team will call or WhatsApp you to confirm
          your time. If you chose a video consult, we send the link and ask for
          your reports before the call.
        </p>
        <ol className="cp-steps sp-thanks-steps">
          {steps.map((step, index) => (
            <li key={step.title} data-done={step.done || undefined}>
              <span className="cp-step-num">
                {step.done ? (
                  <Icon name="check" size={16} aria-label="Done" />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="cp-actions">
          <Link className="btn care-guide" href="/plan-your-visit/">
            Plan your visit <Icon name="arrow" size={16} />
          </Link>
          <Link className="btn care-guide" href="/guides/">
            Read our guides <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- C6 · Legal pages ---------- */

const LEGAL_WITH_CLOSE = new Set(["/medical-disclaimer/", "/patient-rights/"]);

export function LegalPage({ page }: { page: PageContent }) {
  const meta = page.meta;
  const updated = meta.lastUpdated;
  const sections = page.sections
    .filter((s) => s.heading !== "_prelude" && !/^intro$/i.test(s.heading))
    .map((s) => ({
      heading: s.heading,
      id: slugify(s.heading),
      body: cleanBody(s.body),
    }))
    .filter((s) => s.body.trim().length > 0);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: plainH1(meta), href: meta.url },
  ];
  return (
    <div className="care-page doctors-page guides-page guide-article sp-legal">
      <JsonLd data={graph(meta, [breadcrumb(crumbs)])} />
      <SmallHero
        page={page}
        kicker={
          meta.url === "/editorial-policy/" ? "Editorial policy" : "Legal"
        }
        lede={undefined}
        updated={updated}
        breadcrumbItems={crumbs.slice(1)}
      />
      <div className="guide-layout care-container sp-legal-layout">
        <GuideReader
          label="On this page"
          sections={sections.map((s) => ({ id: s.id, label: s.heading }))}
          related={
            <div className="guide-related-care">
              <p className="care-kicker">Questions</p>
              <h2>Something unclear?</h2>
              <p>Call or WhatsApp the team and we will explain.</p>
              <div>
                <Link className="btn btn-primary" href={siteConfig.phoneHref}>
                  Call {siteConfig.phone}
                </Link>
              </div>
            </div>
          }
        />
        <article
          className="guide-content sp-legal-body"
          id="guide-body"
          aria-label={plainH1(meta)}
        >
          {sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.heading}</h2>
              <BlockRenderer body={s.body} />
            </section>
          ))}
          <p className="emergency-strip" role="note">
            <Icon name="alert" size={18} />
            Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
            <Link href="tel:112">112</Link>
          </p>
        </article>
      </div>
      {LEGAL_WITH_CLOSE.has(meta.url) && <BookingClose />}
    </div>
  );
}
