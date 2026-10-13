"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { siteConfig } from "@/lib/site-config";

export function MobileDock() {
  const pathname = usePathname();
  if (pathname === "/thank-you/") return null;
  return (
    <nav className="mobile-dock" aria-label="Quick actions">
      <Link className="dock-book" href="/contact/#book">
        <Icon name="calendar" size={20} />
        Book
      </Link>
      <Link href={siteConfig.phoneHref}>
        <Icon name="phone" size={20} />
        Call
      </Link>
      <Link
        className="dock-wa"
        href={siteConfig.whatsapp}
        aria-label="WhatsApp Rehabify"
      >
        <Icon name="whatsapp" size={20} />
      </Link>
    </nav>
  );
}
