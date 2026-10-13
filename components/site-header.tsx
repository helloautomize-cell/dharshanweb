"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import { megaGroups, navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const careLink = useRef<HTMLAnchorElement>(null);
  const suppressFocusOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !megaOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMegaOpen(false);
        if (megaOpen) {
          suppressFocusOpen.current = true;
          careLink.current?.focus();
        } else menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, megaOpen]);

  const closeMega = (event: React.FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node))
      setMegaOpen(false);
  };

  return (
    <>
      <Link className="skip-link" href="#main">
        Skip to content
      </Link>
      <header
        className="site-nav"
        data-scrolled={scrolled || undefined}
        ref={navRef}
      >
        <Link className="nav-brand" href="/" aria-label="Rehabify home">
          <Image
            src="/images/brand/mark-blue@3x.png"
            alt=""
            width={60}
            height={92}
            style={{ height: 36, width: "auto" }}
            unoptimized
            priority
          />
          <b>Rehabify</b>
        </Link>
        <nav className="links" aria-label="Main">
          <span className="nav-indicator" aria-hidden="true" />
          <ul>
            <li
              onPointerEnter={() => setMegaOpen(true)}
              onPointerLeave={() => setMegaOpen(false)}
              onBlur={closeMega}
            >
              <Link
                ref={careLink}
                href="/care/"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onFocus={() => {
                  if (suppressFocusOpen.current) {
                    suppressFocusOpen.current = false;
                    return;
                  }
                  setMegaOpen(true);
                }}
              >
                Care
                <Icon name="chevronDown" size={14} />
              </Link>
              <div className="mega" data-open={megaOpen || undefined}>
                <div className="mega-groups">
                  {megaGroups.map((group) => (
                    <div key={group.title}>
                      <h3>
                        <Link href={group.href}>{group.title}</Link>
                      </h3>
                      {group.links.map((link) => (
                        <Link key={link.href} href={link.href}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <Link className="mega-preview" href="/doctors/">
                  <Image
                    src="/images/doctors/dr-dharshan-avatar.jpg"
                    alt=""
                    width={440}
                    height={440}
                  />
                  <span>
                    <b>Meet your doctors</b>
                    <Icon name="arrow" size={16} />
                  </span>
                </Link>
                <p className="mega-emergency">
                  Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
                  <Link href="tel:112">112</Link>.
                </p>
              </div>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/video-consultation/">Video consult</Link>
            </li>
          </ul>
        </nav>
        <Link
          className="btn btn-glow nav-book"
          href="/contact/#book"
          aria-label="Book a consultation"
        >
          <span className="button-icon">
            <Icon name="calendar" size={20} />
          </span>
          <span className="button-label">Book a consultation</span>
        </Link>
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          ref={menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={24} />
        </button>
      </header>
      <div className="mobile-menu" data-open={menuOpen || undefined}>
        <nav aria-label="Mobile">
          <Link href="/care/">All care</Link>
          {megaGroups.map((group) => (
            <Link key={group.title} href={group.href} className="sub">
              {group.title}
            </Link>
          ))}
          <Link href="/conditions/">Where it hurts</Link>
          <Link href="/doctors/">Doctors</Link>
          <Link href="/video-consultation/">Video consultation</Link>
          <Link href="/health-library/">Health library</Link>
          <Link href="/plan-your-visit/">Plan your visit</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
        <div className="mobile-menu-actions">
          <Link
            className="btn btn-glow light"
            href="/contact/#book"
            onClick={() => setMenuOpen(false)}
          >
            <span className="button-icon">
              <Icon name="calendar" size={20} />
            </span>
            <span className="button-label">Book a consultation</span>
          </Link>
          <Link className="btn btn-wa" href={siteConfig.whatsapp}>
            <Icon name="whatsapp" size={20} />
            WhatsApp
          </Link>
        </div>
        <p className="menu-emergency">
          Medical emergency? Call <Link href="tel:108">108</Link> or{" "}
          <Link href="tel:112">112</Link>.
        </p>
      </div>
    </>
  );
}
