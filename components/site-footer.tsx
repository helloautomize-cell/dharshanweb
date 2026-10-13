import Image from "next/image";
import { Icon } from "@/lib/icons";
import { Confirm } from "@/components/primitives";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { footerColumns } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer on-night" data-dark>
      <div className="footer-cols wrap">
        <div className="footer-brand">
          <a className="nav-brand" href="/" aria-label="Rehabify home">
            <Image
              src="/images/brand/mark-ice@3x.png"
              alt=""
              width={60}
              height={92}
              style={{ height: 44, width: "auto" }}
              unoptimized
            />
            <b>Rehabify</b>
          </a>
          <p>
            Physical medicine and rehabilitation in Bengaluru, with video
            consultations across India.
          </p>
          <p>
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            {" · "}
            <a href={siteConfig.whatsapp}>WhatsApp</a>
          </p>
          <p className="muted">
            <Confirm>CONFIRM: clinic address and hours</Confirm>
          </p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={`Footer: ${column.title}`}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  {link.href === "#cookie-settings" ? (
                    <CookieSettingsButton />
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer-legal wrap">
        <span>
          © 2026 Rehabify. For education; it does not replace a consultation.
        </span>
        <span className="footer-emergency">
          Medical emergency? Call <a href="tel:108">108</a> or{" "}
          <a href="tel:112">112</a>
        </span>
      </div>
      <div className="footer-giant wrap" aria-hidden="true">
        Rehabify
      </div>
    </footer>
  );
}
export function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Quick actions">
      <a className="dock-book" href="/contact/#book">
        <Icon name="calendar" size={20} />
        Book
      </a>
      <a href={siteConfig.phoneHref}>
        <Icon name="phone" size={20} />
        Call
      </a>
      <a
        className="dock-wa"
        href={siteConfig.whatsapp}
        aria-label="WhatsApp Rehabify"
      >
        <Icon name="whatsapp" size={20} />
      </a>
    </nav>
  );
}
