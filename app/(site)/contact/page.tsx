import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, MapPin, Mail } from "lucide-react";
import { getPage } from "@/lib/content";
import { siteConfig, SITE_INDEXABLE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { H1, crumbs } from "@/components/pages/shared";
import { Confirm } from "@/components/primitives";
import { BookingForm } from "@/components/booking-form";
import { MapFacade } from "@/components/map-facade";
import { Icon } from "@/lib/icons";
import { graph, breadcrumb, webPage } from "@/lib/schema";
import "@/components/pages/site-pages.css";

const page = getPage("/contact/")!;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  robots: SITE_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

const hasValue = (value: string) => value && !value.includes("[CONFIRM");

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const direct = [
    {
      icon: Phone,
      title: "Call or WhatsApp",
      value: <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>,
      show: true,
    },
    {
      icon: Mail,
      title: "Email",
      value: <Confirm>{siteConfig.email}</Confirm>,
      show: hasValue(siteConfig.email),
    },
    {
      icon: MapPin,
      title: "Address",
      value: <Confirm>{siteConfig.address}</Confirm>,
      show: hasValue(siteConfig.address),
    },
    {
      icon: Clock,
      title: "Hours",
      value: <Confirm>{siteConfig.hours}</Confirm>,
      show: hasValue(siteConfig.hours),
    },
  ].filter((row) => row.show);
  return (
    <div className="page-main sp-contact">
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
        <div className="booking-layout">
          <div className="sp-form-card">
            <div className="sp-form-card-head">
              <p className="kicker">Appointment request</p>
              <p className="sp-form-card-sub">
                Takes about a minute. We reply on WhatsApp or by phone.
              </p>
            </div>
            <BookingForm
              initialDoctor={
                ["dr-selina", "dr-selina-kh"].includes(params.doctor ?? "")
                  ? "Dr. Selina Kh"
                  : ["dr-dharshan", "dr-dharshan-n-a"].includes(
                        params.doctor ?? "",
                      )
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
          </div>
          <aside className="booking-side">
            <div className="side-block">
              <h2 className="side-title">What happens next</h2>
              <ol className="sp-next">
                <li>
                  <span className="sp-next-num">01</span>
                  <p>
                    <strong>You send the request.</strong> WhatsApp opens with
                    your details written for you &mdash; press Send.
                  </p>
                </li>
                <li>
                  <span className="sp-next-num">02</span>
                  <p>
                    <strong>We confirm a time.</strong> The team replies on
                    WhatsApp or calls you back to fix your slot.
                  </p>
                </li>
                <li>
                  <span className="sp-next-num">03</span>
                  <p>
                    <strong>You meet the doctor.</strong> At the clinic in
                    Bengaluru, or on a video consult.
                  </p>
                </li>
              </ol>
            </div>
            <div className="side-block">
              <h2 className="side-title">Reach us directly</h2>
              <ul className="sp-direct">
                {direct.map((row) => (
                  <li key={row.title}>
                    <row.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <span className="sp-direct-label">{row.title}</span>
                      {row.value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <MapFacade />
      <p className="emergency-strip" role="note">
        <Icon name="alert" size={18} />
        Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
        <Link href="tel:112">112</Link>
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            graph(
              page.meta,
              [
                breadcrumb([
                  { label: "Home", href: "/" },
                  { label: "Contact", href: "/contact/" },
                ]),
              ],
              webPage(page.meta, "ContactPage"),
            ),
          ),
        }}
      />
    </div>
  );
}
