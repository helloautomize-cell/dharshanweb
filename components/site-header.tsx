"use client";

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
        menuButton.current?.focus();
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
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className="site-nav"
        data-scrolled={scrolled || undefined}
        ref={navRef}
      >
        <a className="nav-brand" href="/" aria-label="Rehabify home">
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
        </a>
        <nav className="links" aria-label="Main">
          <span className="nav-indicator" aria-hidden="true" />
          <ul>
            <li
              onPointerEnter={() => setMegaOpen(true)}
              onPointerLeave={() => setMegaOpen(false)}
              onBlur={closeMega}
            >
              <a
                href="/care/"
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onFocus={() => setMegaOpen(true)}
              >
                Care
                <Icon name="chevronDown" size={14} />
              </a>
              <div className="mega" data-open={megaOpen || undefined}>
                <div className="mega-groups">
                  {megaGroups.map((group) => (
                    <div key={group.title}>
                      <h3>
                        <a href={group.href}>{group.title}</a>
                      </h3>
                      {group.links.map((link) => (
                        <a key={link.href} href={link.href}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
                <a className="mega-preview" href="/doctors/">
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
                </a>
                <p className="mega-emergency">
                  Medical emergency? Call <a href="tel:108">108</a> or{" "}
                  <a href="tel:112">112</a>.
                </p>
              </div>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="/video-consultation/">Video consult</a>
            </li>
          </ul>
        </nav>
        <a className="btn btn-glow nav-book" href="/contact/#book">
          <span className="button-icon">
            <Icon name="calendar" size={20} />
          </span>
          <span className="button-label">Book a consultation</span>
        </a>
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
          <a href="/care/">All care</a>
          {megaGroups.map((group) => (
            <a key={group.title} href={group.href} className="sub">
              {group.title}
            </a>
          ))}
          <a href="/conditions/">Where it hurts</a>
          <a href="/doctors/">Doctors</a>
          <a href="/video-consultation/">Video consultation</a>
          <a href="/health-library/">Health library</a>
          <a href="/plan-your-visit/">Plan your visit</a>
          <a href="/contact/">Contact</a>
        </nav>
        <div className="mobile-menu-actions">
          <a
            className="btn btn-glow light"
            href="/contact/#book"
            onClick={() => setMenuOpen(false)}
          >
            <span className="button-icon">
              <Icon name="calendar" size={20} />
            </span>
            <span className="button-label">Book a consultation</span>
          </a>
          <a className="btn btn-wa" href={siteConfig.whatsapp}>
            <Icon name="whatsapp" size={20} />
            WhatsApp
          </a>
        </div>
        <p className="menu-emergency">
          Medical emergency? Call <a href="tel:108">108</a> or{" "}
          <a href="tel:112">112</a>.
        </p>
      </div>
    </>
  );
}
