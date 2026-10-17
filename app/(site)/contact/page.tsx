import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { getPage } from "@/lib/content";
import { siteConfig, SITE_INDEXABLE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { H1, crumbs } from "@/components/pages/shared";
import { Confirm } from "@/components/primitives";
import { BookingForm } from "@/components/booking-form";
import { MapFacade } from "@/components/map-facade";
import { Icon } from "@/lib/icons";
import { getSignedRenderTime } from "./actions";
import { graph, breadcrumb, webPage } from "@/lib/schema";

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
  const { ts, sig } = await getSignedRenderTime();
  const cards = [
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
      icon: MessageCircle,
      title: "Hours",
      value: <Confirm>{siteConfig.hours}</Confirm>,
      show: hasValue(siteConfig.hours),
    },
  ].filter((card) => card.show);
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
        <div className="sp-form-card">
          <BookingForm
            renderTime={ts}
            renderSig={sig}
            sourcePage={params.from ?? "/contact/"}
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
      </section>
      {cards.length > 0 && (
        <section className="content-section" id="contact-cards">
          <h2 className="h3">Other ways to reach us</h2>
          <div className="contact-cards">
            {cards.map((card) => (
              <div className="contact-card" key={card.title}>
                <card.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                <h3 className="h4">{card.title}</h3>
                <p>{card.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <MapFacade />
      <p className="emergency-strip" role="note">
        <Icon name="alert" size={18} />
        Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
        <Link href="tel:112">112</Link>
      </p>
      <p className="sp-contact-line">
        Prefer to talk? Call or WhatsApp{" "}
        <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
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
