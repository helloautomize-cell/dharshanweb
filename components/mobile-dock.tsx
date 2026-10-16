"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icon } from "@/lib/icons";
import { siteConfig } from "@/lib/site-config";

export function MobileDock() {
  const pathname = usePathname();
  const dock = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = dock.current;
    if (!el) return;
    const targets = document.querySelectorAll(".site-footer, .care-book");
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        el.toggleAttribute("data-hidden", visible.size > 0);
      },
      { rootMargin: "0px 0px -12px 0px" },
    );
    targets.forEach((target) => io.observe(target));
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === "/thank-you/") return null;
  return (
    <nav className="mobile-dock" aria-label="Quick actions" ref={dock}>
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
