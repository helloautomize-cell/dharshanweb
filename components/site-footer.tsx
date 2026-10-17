import Image from "next/image";
import Link from "next/link";
import { Confirm } from "@/components/primitives";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { footerLinks, legalLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/lib/icons";

export function SiteFooter() {
  const infoMissing =
    siteConfig.address.includes("[CONFIRM") ||
    siteConfig.email.includes("[CONFIRM");
  return (
    <footer className="site-footer on-night" data-dark>
      <div className="f-wrap wrap">
        <div className="f-main">
          <Link className="f-brand" href="/" aria-label="Rehabify home">
            <Image
              src="/images/brand/mark-ice@3x.png"
              alt=""
              width={80}
              height={122}
              style={{ height: 24, width: "auto" }}
              unoptimized
            />
            <b>Rehabify</b>
          </Link>
          <nav className="f-links" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="f-contact">
            <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
            <Link
              className="f-wa"
              href={siteConfig.whatsapp}
              aria-label={`WhatsApp ${siteConfig.phone}`}
            >
              <Icon name="whatsapp" size={18} />
            </Link>
          </div>
        </div>
        {!(infoMissing && process.env.NODE_ENV === "production") && (
          <div className="f-info">
            {infoMissing ? (
              <Confirm>{`${siteConfig.address} · ${siteConfig.email}`}</Confirm>
            ) : (
              <>
                {siteConfig.address} {siteConfig.email}
              </>
            )}
          </div>
        )}
        <div className="f-legal">
          <nav aria-label="Legal">
            {legalLinks.map((link) =>
              link.href === "#cookie-settings" ? (
                <CookieSettingsButton key={link.href} />
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="f-note">
          <p>
            © 2026 Rehabify. For education; it does not replace a consultation.
          </p>
          <span className="f-em" role="note">
            Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
            <Link href="tel:112">112</Link>.
          </span>
          <p className="f-credit">
            Built &amp; Marketed by{" "}
            <a
              href="https://www.automizemedialabs.com/"
              target="_blank"
              rel="noopener nofollow"
            >
              Automize Media Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
