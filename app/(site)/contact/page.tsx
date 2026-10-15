import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { getPage } from "@/lib/content";
import { siteConfig, SITE_INDEXABLE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  CtaBand,
  H1,
  RelatedLinks,
  ReviewerBox,
  SectionBlocks,
  crumbs,
} from "@/components/pages/shared";
import { Confirm } from "@/components/primitives";
import { BookingForm } from "@/components/booking-form";
import { MapFacade } from "@/components/map-facade";
import { getSignedRenderTime } from "./actions";
import { graph, breadcrumb } from "@/lib/schema";

const page = getPage("/contact/")!;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  robots: SITE_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const { ts, sig } = await getSignedRenderTime();
  return (
    <div className="page-main">
      <Breadcrumbs items={crumbs(page.meta)} />
      <header className="page-head">
        <p className="kicker">Contact and book</p>
        <H1 text={page.meta.h1} />
        <p className="page-intro">
          Choose a clinic visit or a video consult. We confirm your time by
          phone or WhatsApp.
        </p>
      </header>
      <section className="content-section" id="book">
        <h2 className="h3">Request a time</h2>
        <BookingForm
          renderTime={ts}
          renderSig={sig}
          sourcePage={params.from ?? "/contact/"}
          initialDoctor={
            ["dr-selina", "dr-selina-kh"].includes(params.doctor ?? "")
              ? "Dr. Selina Kh"
              : ["dr-dharshan", "dr-dharshan-n-a"].includes(params.doctor ?? "")
                ? "Dr. Dharshan N A"
                : undefined
          }
          initialFormat={
            params.format === "video"
              ? "video"
              : params.format === "clinic"
                ? "clinic"
                : undefined
          }
          initialReason={params.reason}
        />
      </section>
      <section className="content-section" id="contact-cards">
        <h2 className="h3">Contact cards</h2>
        <div className="contact-cards">
          <div className="contact-card">
            <Phone size={22} strokeWidth={1.75} aria-hidden="true" />
            <h3 className="h4">Call or WhatsApp</h3>
            <p>
              <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
            </p>
          </div>
          <div className="contact-card">
            <Mail size={22} strokeWidth={1.75} aria-hidden="true" />
            <h3 className="h4">Email</h3>
            <p>
              <Confirm>{siteConfig.email}</Confirm>
            </p>
          </div>
          <div className="contact-card">
            <MapPin size={22} strokeWidth={1.75} aria-hidden="true" />
            <h3 className="h4">Address</h3>
            <p>
              <Confirm>{siteConfig.address}</Confirm>
            </p>
          </div>
          <div className="contact-card">
            <MessageCircle size={22} strokeWidth={1.75} aria-hidden="true" />
            <h3 className="h4">Hours</h3>
            <p>
              <Confirm>{siteConfig.hours}</Confirm>
            </p>
          </div>
        </div>
        <MapFacade />
        <p className="emergency-strip" role="note">
          <AlertTriangle size={18} strokeWidth={1.75} aria-hidden="true" />
          Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
          <Link href="tel:112">112</Link>.
        </p>
      </section>
      <SectionBlocks page={page} exclude={/^(intro|form|contact cards)/i} />
      <ReviewerBox meta={page.meta} />
      <RelatedLinks links={page.meta.related} />
      <CtaBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(page.meta, [
              breadcrumb([
                { label: "Home", href: "/" },
                { label: "Contact", href: "/contact/" },
              ]),
            ]),
          ),
        }}
      />
    </div>
  );
}
