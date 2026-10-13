import Image from "next/image";
import Link from "next/link";
import { Confirm } from "@/components/primitives";
import { CookieSettingsButton } from "@/components/cookie-banner";
import { footerColumns } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer on-night" data-dark>
      <div className="footer-cols wrap">
        <div className="footer-brand">
          <Link className="nav-brand" href="/" aria-label="Rehabify home">
            <Image
              src="/images/brand/mark-ice@3x.png"
              alt=""
              width={60}
              height={92}
              style={{ height: 44, width: "auto" }}
              unoptimized
            />
            <b>Rehabify</b>
          </Link>
          <p>
            Physical medicine and rehabilitation in Bengaluru, with video
            consultations across India.
          </p>
          <p>
            <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
            {" · "}
            <Link href={siteConfig.whatsapp}>WhatsApp</Link>
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
                    <Link href={link.href}>{link.label}</Link>
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
          Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
          <Link href="tel:112">112</Link>
        </span>
      </div>
      <div className="footer-giant wrap" aria-hidden="true">
        Rehabify
      </div>
    </footer>
  );
}

