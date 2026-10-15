import Image from "next/image";
import Link from "next/link";
import { GuideCover } from "@/components/guide-cover";
import { GuideCard } from "@/components/guide-card";
import { GuideReader } from "@/components/guide-reader";
import { GuidePrint, GuideShare } from "@/components/guide-actions";
import {
  DirectoryBreadcrumb,
  DirectoryFaqList,
  DirectorySectionHeader,
  H1,
} from "@/components/pages/shared";
import {
  GuideRelatedCare,
  GuidesBookingClose,
} from "@/components/pages/guides-shared";
import { getGuides, guideDoctor } from "@/lib/guide-content.mjs";
import { guideArticleSchema } from "@/lib/guide-schema";
import {
  GUIDE_BASE,
  guideDate,
  guideTopic,
  plainGuide,
  type Guide,
} from "@/lib/guides";
import { BlockRenderer, renderInline } from "@/lib/markdown";
import { Icon, type IconName } from "@/lib/icons";
import "./care.css";
import "./doctors.css";
import "./guides.css";

const roomIcons: Record<string, IconName> = {
  Bathrooms: "bath",
  "Floor mats and floors": "mat",
  Stairs: "stairs",
  "Lighting at night": "moon",
  Footwear: "shoe",
  "Other rooms": "house",
};
export function GuideArticlePage({ guide }: { guide: Guide }) {
  const reviewer = guideDoctor(guide.reviewedBy);
  const author = guideDoctor(guide.author);
  const topic = guideTopic(guide.topic);
  const title = plainGuide(guide.h1);
  const canonical = `${GUIDE_BASE}${guide.url}`;
  const schema = guideArticleSchema(guide);
  const toc = [
    ...guide.body.map((section) => ({
      id: section.id,
      label: section.heading,
    })),
    { id: "urgent", label: guide.emergencyHeading },
    { id: "common-questions", label: "Common questions" },
    { id: "sources", label: "Sources" },
  ];
  const all = getGuides();
  const related = guide.relatedGuides
    ? guide.relatedGuides.map((slug) =>
        all.find((other) => other.slug === slug)!,
      )
    : all
        .filter((other) => other.slug !== guide.slug)
        .sort(
          (a, b) =>
            Number(b.topic === guide.topic) - Number(a.topic === guide.topic) ||
            (b.dateModified ?? b.datePublished ?? "").localeCompare(
              a.dateModified ?? a.datePublished ?? "",
            ) ||
            b.order - a.order,
        )
        .slice(0, 2);
  const cards = related.map(
    ({
      slug,
      url,
      title,
      h1,
      description,
      topic,
      readingTime,
      keywords,
      featured,
      reviewedBy,
    }) => ({
      slug,
      url,
      title,
      h1,
      description,
      topic,
      readingTime,
      keywords,
      featured,
      reviewer: guideDoctor(reviewedBy),
    }),
  );
  return (
    <div className="care-page doctors-page guides-page guide-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="guide-header care-container">
        <DirectoryBreadcrumb
          label={title}
          items={[
            { label: "Guides", href: "/guides/" },
            { label: topic.label, href: `/guides/topic/${topic.slug}/` },
            { label: title },
          ]}
        />
        <div className="guide-intro">
          <Link
            className="guide-topic-link"
            href={`/guides/topic/${topic.slug}/`}
          >
            {topic.label}
          </Link>
          <H1 className="guide-title" text={guide.h1} />
          <p className="guide-lede">{guide.description}</p>
        </div>
        <div className="guide-byline">
          <div className="guide-byline-person">
            <Image src={reviewer.avatar} width={44} height={44} alt="" />
            <div>
              {guide.author === guide.reviewedBy ? (
                <p>
                  Written and medically reviewed by{" "}
                  <Link href={reviewer.href}>{reviewer.name}</Link>
                </p>
              ) : (
                <>
                  <p>
                    Written by <Link href={author.href}>{author.name}</Link>
                  </p>
                  <p>
                    Medically reviewed by{" "}
                    <Link href={reviewer.href}>{reviewer.name}</Link>
                  </p>
                </>
              )}
              <p className="guide-byline-meta">
                {reviewer.shortCredentials} · {guide.readingTime} read
                {guide.dateModified && (
                  <>
                    {" "}
                    · Updated{" "}
                    <time dateTime={guide.dateModified}>
                      {guideDate(guide.dateModified)}
                    </time>
                  </>
                )}
              </p>
            </div>
          </div>
          <GuideShare title={title} url={canonical} />
        </div>
        <GuideCover guide={guide} />
      </header>
      <div className="guide-layout care-container">
        <GuideReader
          sections={toc}
          related={<GuideRelatedCare care={guide.relatedCare[0]} />}
        />
        <article className="guide-content" id="guide-body" aria-label={title}>
          <div className="guide-brief">
            <p className="care-kicker">In brief</p>
            {guide.inBrief.length === 1 ? (
              <p>{renderInline(guide.inBrief[0])}</p>
            ) : (
              <ul>
                {guide.inBrief.map((point) => (
                  <li key={point}>{renderInline(point)}</li>
                ))}
              </ul>
            )}
          </div>
          {guide.body.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>{section.heading}</h2>
              {section.checklist ? (
                <>
                  <BlockRenderer body={section.intro} />
                  <div className="guide-checklist-tools">
                    <span>
                      {section.groups.length} areas ·{" "}
                      {section.groups.reduce(
                        (total, group) => total + group.items.length,
                        0,
                      )}{" "}
                      checks
                    </span>
                    <GuidePrint />
                  </div>
                  <div className="guide-room-grid">
                    {section.groups.map((group) => (
                      <div className="guide-room" key={group.title}>
                        <h3>
                          <span>
                            <Icon
                              name={roomIcons[group.title] ?? "check"}
                              size={16}
                            />
                          </span>
                          {group.title}
                        </h3>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{renderInline(item)}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              ) : /^How (?:Rehabify|a physiatrist) helps/.test(
                  section.heading,
                ) ? (
                <div className="guide-help">
                  <Image src={reviewer.avatar} alt="" width={72} height={72} />
                  <div>
                    <BlockRenderer body={section.body} />
                    <div className="guide-help-links">
                      {guide.relatedCare.map((care) => (
                        <Link key={care.href} href={care.href}>
                          {care.label}
                          <Icon name="arrow" size={16} />
                        </Link>
                      ))}
                      {/video consult/i.test(section.body) && (
                        <Link href="/video-consultation/">
                          Video consultation
                          <Icon name="arrow" size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <BlockRenderer body={section.body} />
              )}
            </section>
          ))}
          <section aria-labelledby="urgent">
            <h2 id="urgent">{guide.emergencyHeading}</h2>
            <div className="guide-emergency on-night" data-dark role="note">
              <span className="guide-emergency-icon">
                <Icon name="emergency" size={22} />
              </span>
              <div>
                <p className="care-kicker">Medical emergency</p>
                <BlockRenderer body={guide.emergency} />
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
          {guide.keyTakeaways && (
            <div className="guide-takeaways">
              <p className="care-kicker">Key takeaways</p>
              <ol>
                {guide.keyTakeaways.map((point, index) => (
                  <li key={point}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{point}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <section aria-labelledby="common-questions">
            <h2 id="common-questions">Common questions</h2>
            <div className="doctors-faq guide-faq">
              <DirectoryFaqList
                faqs={guide.faqs.map((faq) => ({
                  question: faq.q,
                  answer: faq.a,
                  answerContent: renderInline(faq.a),
                }))}
              />
            </div>
          </section>
          <section aria-labelledby="sources">
            <h2 id="sources">Sources</h2>
            <ol className="guide-sources">
              {guide.sources.map((source, index) => (
                <li key={`${source.publisher}-${index}`}>
                  <span>[{index + 1}]</span>
                  <p>
                    <strong>{source.publisher}.</strong>{" "}
                    {source.url ? (
                      <Link href={source.url}>{source.title}</Link>
                    ) : (
                      source.title
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </section>
          <aside className="guide-medical-review" aria-label="Medical review">
            <Image src={reviewer.avatar} width={56} height={56} alt="" />
            <div>
              <p className="care-kicker">Medical review</p>
              <p>{reviewer.name}</p>
              <p>
                {reviewer.credentials}
                {guide.lastReviewed && (
                  <>
                    {" "}
                    · Last reviewed{" "}
                    <time dateTime={guide.lastReviewed}>
                      {guideDate(guide.lastReviewed)}
                    </time>
                  </>
                )}
              </p>
              <Link href={reviewer.href}>
                View profile <Icon name="arrow" size={16} />
              </Link>
            </div>
          </aside>
          <p className="guide-disclaimer">
            This guide is for general education and does not replace a
            consultation. Read how we write and review guides in our{" "}
            <Link href="/editorial-policy/">editorial policy</Link>.
          </p>
          <div className="guide-share-row">
            <p className="care-kicker">Share this guide</p>
            <GuideShare title={title} url={canonical} />
          </div>
        </article>
      </div>
      <section
        className="care-container guide-related"
        aria-labelledby="guide-related-heading"
      >
        <DirectorySectionHeader
          id="guide-related-heading"
          kicker="Keep reading"
          heading={
            <>
              Related <span className="serif">guides.</span>
            </>
          }
          description={
            guide.relatedIntro ??
            `More on ${topic.label.toLowerCase()}, from the same doctor.`
          }
        />
        <div className="guide-related-grid">
          <GuideRelatedCare care={guide.relatedCare[0]} night />
          {cards.map((card) => (
            <GuideCard key={card.slug} guide={card} />
          ))}
        </div>
      </section>
      <GuidesBookingClose />
    </div>
  );
}
