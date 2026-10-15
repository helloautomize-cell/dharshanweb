import Link from "next/link";
import { GuidesBrowser } from "@/components/guides-browser";
import { DirectoryHero } from "@/components/pages/shared";
import { GuidesBookingClose } from "@/components/pages/guides-shared";
import { getGuides, guideDoctor } from "@/lib/guide-content.mjs";
import { guideIndexMeta, guideTopics, guideTopicMeta } from "@/lib/guides";
import { guidesIndexSchema } from "@/lib/guide-schema";
import { Icon } from "@/lib/icons";
import "./care.css";
import "./doctors.css";
import "./guides.css";

export function GuidesIndexPage({
  topic,
}: {
  topic?: (typeof guideTopics)[number];
}) {
  const guides = getGuides();
  const meta = topic ? guideTopicMeta(topic) : guideIndexMeta;
  const shown = topic
    ? guides.filter((guide) => guide.topic === topic.id)
    : guides;
  const schema = guidesIndexSchema(meta, shown, topic?.id);
  const times = guides
    .map((guide) => parseInt(guide.readingTime))
    .sort((a, b) => a - b);
  const middle = Math.floor(times.length / 2);
  const median =
    times.length % 2 ? times[middle] : (times[middle - 1] + times[middle]) / 2;
  const cards = guides.map(
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
    <div className="care-page doctors-page guides-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <DirectoryHero
        label={topic?.label ?? "Guides"}
        breadcrumbItems={
          topic
            ? [{ label: "Guides", href: "/guides/" }, { label: topic.label }]
            : undefined
        }
        kicker="Guides"
        headingId="guides-heading"
        title={meta.h1}
        description={
          topic
            ? meta.description
            : "Written for patients and families by a rehabilitation doctor in Bengaluru. Every guide is medically reviewed, cites its sources and says when to get help urgently."
        }
        actions={
          <>
            <Link className="btn btn-primary" href="/contact/#book">
              Book a consultation
            </Link>
            <Link className="btn care-guide" href="#browse">
              Browse guides{" "}
              <span className="guide-down-arrow">
                <Icon name="arrow" size={18} />
              </span>
            </Link>
          </>
        }
        facts={[
          { value: guides.length, label: "guides so far" },
          {
            value: new Set(guides.map((guide) => guide.topic)).size,
            label: "topics, from stroke to children",
          },
          {
            value: new Set(guides.map((guide) => guide.reviewedBy)).size,
            label: "rehab doctor reviews each guide",
          },
          { value: median, label: "minutes, a typical read" },
        ]}
      />
      <GuidesBrowser guides={cards} initialTopic={topic?.id} />
      <GuidesBookingClose />
    </div>
  );
}
