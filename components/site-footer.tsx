import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { footerNav, legalLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/lib/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="f-wrap wrap">
        <div className="f-top">
          <div className="f-brand-col">
            <Link className="f-brand" href="/" aria-label="Rehabify home">
              <Image
                src="/images/brand/mark-navy@3x.png"
                alt=""
                width={80}
                height={122}
                style={{ height: 32, width: "auto" }}
                unoptimized
              />
              <b>Rehabify</b>
            </Link>
            <p className="f-tag">
              Physical medicine and rehabilitation. A rehabilitation doctor
              plans your recovery with you, in Bengaluru and online.
            </p>
            <div className="f-contact">
              <p className="f-contact-label">Call or WhatsApp</p>
              <Link className="f-phone" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </Link>
              <div className="f-ctas">
                <Link className="f-pill" href={siteConfig.whatsapp}>
                  <Icon name="whatsapp" size={16} />
                  WhatsApp
                </Link>
                <Link className="f-pill f-pill-dark" href="/contact/#book">
                  <Icon name="calendar" size={16} />
                  Book a consultation
                </Link>
              </div>
            </div>
          </div>
          <nav className="f-nav" aria-label="Footer">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p className="f-emergency" role="note">
          <Icon name="alert" size={20} />
          <span>
            <b>Medical emergency?</b> Call <Link href="tel:108">108</Link> or{" "}
            <Link href="tel:112">112</Link>. Do not wait for an appointment.
          </span>
        </p>
        <div className="f-bottom">
          <p>
            © 2026 Rehabify. For education; it does not replace a consultation.
          </p>
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
