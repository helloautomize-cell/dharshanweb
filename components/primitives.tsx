import Image from "next/image";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { imageApprovals } from "@/lib/site-config";

export function Confirm({ children }: { children: ReactNode }) {
  return (
    <span
      className="confirm-chip"
      hidden={process.env.NODE_ENV === "production"}
    >
      {children}
    </span>
  );
}
export function Brand({
  variant = "blue",
  size = 36,
  wordmark = true,
}: {
  variant?: "blue" | "ice" | "white" | "navy";
  size?: number;
  wordmark?: boolean;
}) {
  return (
    <span className={`brand brand-${variant}`}>
      <Image
        src={`/images/brand/mark-${variant}@3x.png`}
        alt={wordmark ? "" : "Rehabify"}
        width={80}
        height={122}
        style={{ height: size, width: "auto" }}
        unoptimized
      />
      {wordmark && <b>Rehabify</b>}
    </span>
  );
}
export function Button({
  children = "Book a consultation",
  href = "/contact/#book",
  kind = "primary",
  disabled = false,
  state = "",
}: {
  children?: ReactNode;
  href?: string;
  kind?: "primary" | "ghost" | "glow" | "wa" | "link";
  disabled?: boolean;
  state?: string;
}) {
  const label = (
    <>
      {kind === "glow" && (
        <span className="button-icon">
          <CalendarDays size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
      )}
      {kind === "wa" && (
        <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
      )}
      <span className="button-label">{children}</span>
      {kind !== "glow" && kind !== "wa" && (
        <ArrowRight
          className="arrow"
          size={20}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </>
  );
  return disabled ? (
    <button type="button" className={`btn btn-${kind}`} disabled>
      {label}
    </button>
  ) : (
    <a
      href={href}
      className={`btn btn-${kind} ${state ? `state-${state}` : ""}`}
      data-state={state || undefined}
    >
      {label}
    </a>
  );
}
export function DoctorPortrait({
  id,
  alt,
  priority = false,
  approved,
  className = "",
  sizes: sizesProp,
}: {
  id: string;
  alt: string;
  priority?: boolean;
  approved?: boolean;
  className?: string;
  sizes?: string;
}) {
  const allowed =
    approved ?? imageApprovals[id.replace("-portrait", "-hero")] === true;
  const sizes =
    sizesProp ??
    (className.includes("back-arch")
      ? "(max-width: 767px) 34vw, 217px"
      : className.includes("front-arch")
        ? "(max-width: 767px) 55vw, 350px"
        : "(max-width: 767px) 90px, 120px");
  const srcSet = (format: string) =>
    [160, 320, 480, 800]
      .map((width) => `/images/doctors/${id}-${width}.${format} ${width}w`)
      .join(", ");
  const responsive = /-(hero|portrait)$/.test(id);
  return (
    <div className={`doctor-arch ${className}`}>
      {allowed ? (
        responsive ? (
          <>
            {priority && (
              <link
                rel="preload"
                as="image"
                type="image/avif"
                imageSrcSet={srcSet("avif")}
                imageSizes={sizes}
                fetchPriority="high"
              />
            )}
            <picture>
              <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
              <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
              <Image
                src={`/images/doctors/${id}.jpg`}
                alt={alt}
                fill
                unoptimized
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : undefined}
              />
            </picture>
          </>
        ) : (
          <Image
            src={`/images/doctors/${id}.jpg`}
            alt={alt}
            fill
            sizes={sizes}
            preload={priority}
            fetchPriority={priority ? "high" : undefined}
          />
        )
      ) : (
        <div className="photo-placeholder">
          <Brand variant="ice" size={72} wordmark={false} />
          <span className="mono">Photo to be added</span>
        </div>
      )}
    </div>
  );
}
export function SectionHeading({
  children,
  description,
}: {
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <h2 className="h2">{children}</h2>
      {description && <p className="lede">{description}</p>}
    </div>
  );
}
