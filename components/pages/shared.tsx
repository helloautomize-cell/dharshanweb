import Image from "next/image";
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
