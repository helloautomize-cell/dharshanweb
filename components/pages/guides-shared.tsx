import Link from "next/link";
import { DirectoryBookingClose } from "@/components/pages/shared";
import type { Guide } from "@/lib/guides";
import { Icon } from "@/lib/icons";

export function GuidesBookingClose() {
  return (
    <DirectoryBookingClose
      heading={
        <>
          A question a guide can&apos;t <span className="serif">answer?</span>
        </>
      }
      description="Talk it through with the doctor. Choose a clinic visit or a video consult, and the team confirms your time by phone or WhatsApp."
      lastStep="Bring your questions, scans and reports."
    />
  );
}
export function GuideRelatedCare({
  care,
  night = false,
}: {
  care: Guide["relatedCare"][number];
  night?: boolean;
}) {
  return (
    <div
      className={`guide-related-care${night ? " on-night" : ""}`}
      data-dark={night || undefined}
    >
      <p className="care-kicker">Related care</p>
      <h2>{care.label}</h2>
      <p>{care.description}</p>
      <div>
        <Link
          className={`btn ${night ? "btn-invert" : "btn-primary"}`}
          href="/contact/#book"
        >
          Book an assessment
        </Link>
        <Link
          className={night ? "btn btn-ghost" : "guide-related-about"}
          href={care.href}
        >
          {night ? "About this care" : `About ${care.label} care`}
          {!night && <Icon name="arrow" size={16} />}
        </Link>
      </div>
    </div>
  );
}
