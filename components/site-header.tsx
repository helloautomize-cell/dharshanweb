"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";
import { megaExtras, megaGroups, navLinks } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const careLink = useRef<HTMLAnchorElement>(null);
  const suppressFocusOpen = useRef(false);

  useEffect(() => {
    const check = () => {
      setScrolled(window.scrollY > 40);
      const r = navRef.current?.getBoundingClientRect();
      const under = document.elementFromPoint(
        Math.round(window.innerWidth / 2),
        Math.round((r?.bottom ?? 78) + 8),
      );
      setDark(!!(under instanceof Element && under.closest("[data-dark]")));
    };
    check();
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
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
        data-dark={dark || undefined}
        ref={navRef}
      >
        <Link className="nav-brand" href="/" aria-label="Rehabify home">
          <Image
            className="mark mark-blue"
            src="/images/brand/mark-blue@3x.png"
            alt=""
            width={60}
            height={92}
            style={{ height: 28, width: "auto" }}
            unoptimized
            priority
          />
          <Image
            className="mark mark-ice"
            src="/images/brand/mark-ice@3x.png"
            alt=""
            width={60}
            height={92}
            style={{ height: 28, width: "auto" }}
            unoptimized
            aria-hidden="true"
          />
          <b>Rehabify</b>
        </Link>
        <nav
          className="links"
          aria-label="Main"
          onPointerOver={(event) => {
            const nav = event.currentTarget;
            const link = (event.target as HTMLElement).closest(
              ":scope > ul > li > a",
            );
            const indicator = nav.querySelector<HTMLElement>(".nav-indicator");
            if (!indicator) return;
            if (!link) {
              nav.style.setProperty("--nav-show", "0");
              return;
            }
            nav.style.setProperty(
              "--nav-x",
              `${(link as HTMLElement).offsetLeft}px`,
            );
            nav.style.setProperty(
              "--nav-w",
              `${(link as HTMLElement).offsetWidth}px`,
            );
            nav.style.setProperty("--nav-show", "1");
          }}
          onPointerLeave={(event) =>
            event.currentTarget.style.setProperty("--nav-show", "0")
          }
        >
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
                aria-current={pathname === "/care/" ? "page" : undefined}
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
                  <div>
                    <h3>Read</h3>
                    {megaExtras.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
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
          </ul>
        </nav>
        <Link
          className="btn btn-primary nav-book"
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
      <div className="mobile-menu" data-open={menuOpen || undefined} data-dark>
        <nav aria-label="Mobile">
          <Link
            href="/care/"
            aria-current={pathname === "/care/" ? "page" : undefined}
          >
            All care
          </Link>
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
            className="btn btn-invert"
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
