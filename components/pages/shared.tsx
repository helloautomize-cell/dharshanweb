import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { BlockRenderer } from "@/lib/markdown";
import { Confirm } from "@/components/primitives";
import { extractFaqs } from "@/lib/faqs";
import type { PageContent, PageMeta } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { knownLinks } from "@/lib/content";

export function H1({
  text,
  className = "display",
}: {
  text?: string;
  className?: string;
}) {
  if (!text) return null;
  const parts = text.split(/\*([^*]+)\*/);
  return (
    <h1 className={className}>
      {parts.map((part, i) =>
        i % 2 ? (
          <span className="serif" key={i}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </h1>
  );
}
export function DirectoryBreadcrumb({ label }: { label: string }) {
  return (
    <nav className="care-breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span aria-current="page">{label}</span>
        </li>
      </ol>
    </nav>
  );
}
export function DirectoryFacts({
  facts,
  reveal = false,
}: {
  facts: { value: number; label: string }[];
  reveal?: boolean;
}) {
  return (
    <div className="care-facts" data-care-reveal={reveal || undefined}>
      {facts.map((fact) => (
        <p key={fact.label}>
          <b>{fact.value}</b>
          <span>{fact.label}</span>
        </p>
      ))}
    </div>
  );
}
export function DirectoryFactsList({
  facts,
  children,
  className = "",
}: {
  facts: { label: string; value: ReactNode }[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <dl className={`doctors-profile-facts ${className}`}>
      {children}
      {facts
        .filter(
          (fact) =>
            fact.value !== undefined &&
            fact.value !== null &&
            fact.value !== "",
        )
        .map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
    </dl>
  );
}
export function DirectorySectionHeader({
  kicker,
  heading,
  description,
  id,
  reveal = false,
}: {
  kicker: string;
  heading: ReactNode;
  description: string;
  id: string;
  reveal?: boolean;
}) {
  return (
    <header
      className="care-section-head"
      data-care-reveal={reveal || undefined}
    >
      <div>
        <p className="care-kicker">{kicker}</p>
        <h2 id={id}>{heading}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
}
export function DirectoryReviewer({
  lastReviewed,
  reveal = false,
  showPending = false,
  practiceOnly = false,
}: {
  lastReviewed?: string;
  reveal?: boolean;
  showPending?: boolean;
  practiceOnly?: boolean;
}) {
  const date =
    lastReviewed && !lastReviewed.includes("[CONFIRM")
      ? lastReviewed
      : undefined;
  return (
    <aside className="care-reviewer" data-care-reveal={reveal || undefined}>
      {!practiceOnly && (
        <Image
          src="/images/doctors/dr-dharshan-avatar-160.jpg"
          width={28}
          height={28}
          alt=""
        />
      )}
      <div>
        <p>
          Medically reviewed by{" "}
          {practiceOnly ? (
            <>
              Rehabify
              {date && (
                <>
                  {" "}
                  · Last reviewed <time dateTime={date}>{date}</time>
                </>
              )}
            </>
          ) : (
            <>
              <Link href="/dr-dharshan-n-a/">Dr. Dharshan N A</Link>, consultant
              in physical medicine and rehabilitation
            </>
          )}
        </p>
        {!practiceOnly && (date || showPending) && (
          <p>
            Last reviewed:{" "}
            {date ? (
              <time dateTime={date}>{date}</time>
            ) : (
              <Confirm>{lastReviewed}</Confirm>
            )}
          </p>
        )}
      </div>
    </aside>
  );
}
export function DirectoryBookingClose({
  heading,
  description,
  firstStep = "Online, on WhatsApp or by phone.",
  secondStep = "By phone or WhatsApp, for the clinic or a video consult.",
  lastStep = "Bring your reports and wear loose clothes.",
  lastStepTitle = "You meet your doctor",
  bookingLabel = "Book a consultation",
  bookingHref = "/contact/#book",
  reveal = false,
}: {
  heading: ReactNode;
  description: string;
  firstStep?: string;
  secondStep?: string;
  lastStep?: string;
  lastStepTitle?: string;
  bookingLabel?: string;
  bookingHref?: string;
  reveal?: boolean;
}) {
  const steps = [
    { title: "You send a request", text: firstStep },
    {
      title: "We confirm a time",
      text: secondStep,
    },
    {
      title: lastStepTitle,
      text: lastStep,
    },
  ];
  return (
    <section
      className="care-book on-night"
      id="book"
      data-dark
      aria-labelledby="care-book-heading"
    >
      <div className="care-container care-book-columns">
        <div data-care-reveal={reveal || undefined}>
          <p className="care-kicker">{bookingLabel}</p>
          <h2 id="care-book-heading">{heading}</h2>
          <p>{description}</p>
          <div className="care-book-actions">
            <Link className="btn btn-invert" href={bookingHref}>
              <Icon name="calendar" size={20} />
              {bookingLabel}
            </Link>
            <Link className="btn btn-ghost" href={siteConfig.whatsapp}>
              <Icon name="whatsapp" size={20} />
              Message on WhatsApp
            </Link>
          </div>
          <p className="care-call">
            Prefer to call?{" "}
            <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
          </p>
        </div>
        <ol className="care-book-steps" data-care-reveal={reveal || undefined}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function DirectoryPrinciples({
  items,
}: {
  items: { title: string; text: string; icon?: ReactNode }[];
}) {
  return (
    <ul className="doctors-principles">
      {items.map((item) => (
        <li key={item.title}>
          {item.icon && (
            <span className="directory-icon-tile">{item.icon}</span>
          )}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
export function DirectoryComparison({
  items,
}: {
  items: {
    label: string;
    heading: ReactNode;
    points: string[];
    action?: ReactNode;
  }[];
}) {
  return (
    <div className="doctors-roles">
      {items.map((item) => (
        <div key={item.label}>
          <div className="directory-comparison-label">
            <p className="care-kicker">{item.label}</p>
            {item.action}
          </div>
          <h3>{item.heading}</h3>
          <ul>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export function DirectoryFaq({
  heading,
  description,
  faqs,
  lastReviewed,
  headingId = "doctors-faq-heading",
  reviewer,
  reviewerPosition = "list",
}: {
  heading: ReactNode;
  description: string;
  faqs: { question: string; answer: string; answerContent?: ReactNode }[];
  lastReviewed?: string;
  headingId?: string;
  reviewer?: ReactNode;
  reviewerPosition?: "intro" | "list";
}) {
  return (
    <section
      id="faq"
      className="doctors-faq care-container"
      aria-labelledby={headingId}
    >
      <div>
        <p className="care-kicker">Questions</p>
        <h2 id={headingId}>{heading}</h2>
        <p>{description}</p>
        {reviewerPosition === "intro" &&
          (reviewer ?? <DirectoryReviewer lastReviewed={lastReviewed} />)}
      </div>
      <div>
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
        {reviewerPosition === "list" &&
          (reviewer ?? <DirectoryReviewer lastReviewed={lastReviewed} />)}
      </div>
    </section>
  );
}
export function EmergencyStrip() {
  return (
    <p className="emergency-strip" role="note">
      <Icon name="alert" size={18} />
      Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
      <Link href="tel:112">112</Link>
    </p>
  );
}
export function ReviewerBox({ meta }: { meta: PageMeta }) {
  const doctors: Record<string, { name: string; href: string }> = {
    "dr-dharshan-n-a": {
      name: "Dr. Dharshan N A",
      href: "/dr-dharshan-n-a/",
    },
    "dr-selina-kh": { name: "Dr. Selina Kh", href: "/dr-selina-kh/" },
  };
  const reviewer = meta.reviewer ? doctors[meta.reviewer] : null;
  return (
    <aside className="reviewer-box">
      <Icon name="file" size={18} />
      <div>
        <p>
          Medically reviewed by{" "}
          {reviewer ? (
            <Link href={reviewer.href}>{reviewer.name}</Link>
          ) : (
            "Rehabify"
          )}
          {reviewer
            ? ", consultant in physical medicine and rehabilitation"
            : ""}
          .
        </p>
        <p className="muted">
          Last reviewed:{" "}
          {meta.lastReviewed?.includes("[CONFIRM") ? (
            <Confirm>{meta.lastReviewed}</Confirm>
          ) : (
            meta.lastReviewed
          )}
        </p>
      </div>
    </aside>
  );
}
export function FaqAccordion({ body }: { body: string }) {
  const faqs = extractFaqs(body);
  if (!faqs.length) return <BlockRenderer body={body} />;
  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <details key={i} className="faq-item">
          <summary>
            <span>{faq.question}</span>
            <Icon name="plus" size={20} className="faq-icon" />
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function CtaBand({
  title = "Tell us where it hurts, we plan the way back.",
}) {
  return (
    <section className="cta-band on-night" data-dark>
      <div>
        <p className="kicker">Book a consultation</p>
        <h2 className="h3">{title}</h2>
      </div>
      <div className="cta-actions">
        <Link className="btn btn-invert" href="/contact/#book">
          <span className="button-icon">
            <Icon name="calendar" size={20} />
          </span>
          <span className="button-label">Book a consultation</span>
        </Link>
        <Link className="btn btn-ghost" href={siteConfig.phoneHref}>
          <Icon name="phone" size={18} />
          {siteConfig.phone}
        </Link>
      </div>
    </section>
  );
}
export function SectionBlocks({
  page,
  exclude,
}: {
  page: PageContent;
  exclude?: RegExp;
}) {
  return (
    <>
      {page.sections
        .filter(
          (s) =>
            s.heading !== "_prelude" && (!exclude || !exclude.test(s.heading)),
        )
        .map((s) => {
          const slug = s.heading
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          const isFaq = /^faqs?/i.test(s.heading);
          const isUrgent = /urgent|emergency|warning/i.test(s.heading);
          return (
            <section
              key={slug}
              className={`content-section${isUrgent ? " is-urgent" : ""}`}
              id={slug}
            >
              <h2 className="h3">
                {s.heading.replace(/\s*\(([^)]+)\)\s*$/, "")}
              </h2>
              {isFaq ? (
                <FaqAccordion body={s.body} />
              ) : (
                <BlockRenderer body={s.body} />
              )}
            </section>
          );
        })}
    </>
  );
}
export function RelatedLinks({ links: raw }: { links?: string[] }) {
  const links = knownLinks(raw);
  if (!links.length) return null;
  const names: Record<string, string> = {
    "/pain-and-spine/sciatica/": "Sciatica",
    "/pain-and-spine/back-pain/": "Back pain",
    "/pain-and-spine/neck-pain/": "Neck pain",
    "/pain-and-spine/image-guided-injections/": "Image-guided injections",
    "/neuro-rehabilitation/stroke/": "Stroke rehabilitation",
    "/neuro-rehabilitation/spinal-cord-injury/": "Spinal cord injury rehab",
    "/neuro-rehabilitation/head-injury/": "Head injury rehab",
    "/neuro-rehabilitation/parkinsons/": "Parkinson's disease rehab",
    "/neuro-rehabilitation/spasticity/": "Spasticity care",
    "/joints-and-sports/knee-pain/": "Knee pain",
    "/joints-and-sports/shoulder-pain/": "Shoulder pain",
    "/joints-and-sports/sports-injuries/": "Sports injuries",
    "/joints-and-sports/after-fracture-or-surgery/":
      "Rehab after fracture or surgery",
    "/joints-and-sports/prp-and-prolotherapy/": "PRP and prolotherapy",
    "/joints-and-sports/prosthetic-rehab/": "Prosthetic rehabilitation",
    "/childrens-rehabilitation/cerebral-palsy/": "Cerebral palsy",
    "/childrens-rehabilitation/muscular-dystrophy/": "Muscular dystrophy",
    "/childrens-rehabilitation/developmental-delay/": "Developmental delay",
    "/older-adults/falls-and-balance/": "Falls and balance",
    "/older-adults/osteoporosis/": "Osteoporosis",
    "/video-consultation/": "Video consultation",
    "/health-library/what-is-a-physiatrist/":
      "What is a physiatrist, and when should you see one?",
    "/health-library/first-90-days-after-stroke/":
      "The first 90 days after a stroke",
    "/health-library/low-back-pain-when-to-worry/":
      "Low back pain: what helps, and the warning signs",
  };
  return (
    <nav className="related-links" aria-label="Related">
      <p className="kicker">Related</p>
      <ul>
        {links.map((href) => (
          <li key={href}>
            <Link href={href}>
              {names[href] ?? href.replaceAll("/", " ").trim()}
              <Icon name="arrow" size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export function BadgeMark({ badge }: { badge?: string }) {
  if (!badge) return null;
  return (
    <span className="page-badge" aria-hidden="true">
      <Image
        src={`/images/icons/services/${badge}.webp`}
        alt=""
        width={96}
        height={96}
        unoptimized
      />
    </span>
  );
}
export function crumbs(meta: PageMeta) {
  const parts = meta.url.split("/").filter(Boolean);
  const items: { href?: string; label: string }[] = [];
  for (let i = 0; i < parts.length; i++) {
    const href = "/" + parts.slice(0, i + 1).join("/") + "/";
    const label = (meta.h1 ?? meta.title)
      .replace(/\*/g, "")
      .replace(/\s*\|.*$/, "");
    items.push({
      href,
      label: i === parts.length - 1 ? label : humanize(parts[i]),
    });
  }
  return items;
}
function humanize(slug: string) {
  const known: Record<string, string> = {
    "pain-and-spine": "Pain and spine",
    "neuro-rehabilitation": "Neuro rehabilitation",
    "joints-and-sports": "Joints and sports",
    "childrens-rehabilitation": "Children's rehabilitation",
    "older-adults": "Older adults",
    "health-library": "Health library",
  };
  return (
    known[slug] ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
