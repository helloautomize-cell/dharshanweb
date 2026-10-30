"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icon } from "@/lib/icons";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export function DesktopQuickActions() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = nav.current;
    if (!el) return;
    const targets = document.querySelectorAll(".site-footer, .care-book, #top");
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
    <nav
      className="quick-actions"
      aria-label="Quick actions"
      ref={nav}
      data-hidden={pathname === "/" ? true : undefined}
    >
      <Link
        className="qa-book"
        href="/contact/#book"
        onClick={() => track("book_click", { cta_location: "desktop" })}
      >
        <Icon name="calendar" size={20} />
        Book a consultation
      </Link>
      <Link
        className="qa-wa"
        href={siteConfig.whatsapp}
        aria-label="Chat with Rehabify on WhatsApp"
        onClick={() => track("whatsapp_click", { cta_location: "desktop" })}
      >
        <span className="qa-tip" aria-hidden="true">
          Chat on WhatsApp
        </span>
        <Icon name="whatsapp" size={24} />
      </Link>
    </nav>
  );
}
