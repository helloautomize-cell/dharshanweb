import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { guideTopic, plainGuide, type GuideCardData } from "@/lib/guides";

export function GuideCard({
  guide,
  featured = false,
}: {
  guide: GuideCardData;
  featured?: boolean;
}) {
  return (
    <Link
      className={`guide-card${featured ? " guide-card-featured on-night" : ""}`}
      href={guide.url}
      data-dark={featured || undefined}
    >
      <span className="guide-card-topic">
        {guideTopic(guide.topic).label}
        {featured && <span>Start here</span>}
      </span>
      <h3>{plainGuide(guide.h1)}</h3>
      <p>{guide.description}</p>
      <div className="guide-card-bottom">
        <span className="guide-card-meta">
          <Image src={guide.reviewer.avatar} width={22} height={22} alt="" />
          <span>
            Reviewed by {guide.reviewer.name} · {guide.readingTime} read
          </span>
        </span>
        <span className="guide-card-arrow" aria-hidden="true">
          <Icon name="arrow" size={18} />
        </span>
      </div>
    </Link>
  );
}
