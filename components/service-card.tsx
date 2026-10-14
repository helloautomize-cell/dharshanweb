import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* Care card specimen: white hairline card with the illustrated service badge.
   Shown in the styleguide; hub pages and care headers carry the badges. */
export function ServiceCard({
  href,
  badge,
  kicker,
  title,
  text,
}: {
  href: string;
  badge: string;
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <Link className="svc" href={href}>
      <span className="art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/icons/services/${badge}@256.webp`}
          alt=""
          width={92}
          height={92}
          loading="lazy"
        />
      </span>
      <span className="body">
        <span className="mono">{kicker}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className="go">
          <span>Read more</span>
          <i>
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </i>
        </span>
      </span>
    </Link>
  );
}
