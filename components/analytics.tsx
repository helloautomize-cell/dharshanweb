"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { hasAnalyticsConsent, subscribeConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
let loaded = false;

function gtagDefaults() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
}

function loadGtag() {
  if (!GA_ID || loaded) return;
  loaded = true;
  gtagDefaults();
  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  s.async = true;
  document.head.appendChild(s);
  window.gtag!("js", new Date());
  window.gtag!("config", GA_ID, { send_page_view: false });
}

function sendView(pathname: string, search: URLSearchParams) {
  if (!hasAnalyticsConsent()) return;
  if (!loaded) loadGtag();
  if (!window.gtag) return;
  const kept = new URLSearchParams();
  search.forEach((v, k) => {
    if (k.startsWith("utm_")) kept.set(k, v);
  });
  const qs = kept.toString();
  window.gtag?.("event", "page_view", {
    page_location: window.location.origin + pathname + (qs ? `?${qs}` : ""),
    page_path: pathname,
  });
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consent = useRef(false);
  useEffect(() => {
    const flush = () => {
      if (hasAnalyticsConsent() && !consent.current) {
        consent.current = true;
        sendView(
          window.location.pathname,
          new URLSearchParams(window.location.search),
        );
      }
    };
    flush();
    const off = subscribeConsent(flush);
    window.addEventListener("rehabify:consent", flush);
    return () => {
      off();
      window.removeEventListener("rehabify:consent", flush);
    };
  }, []);
  useEffect(() => {
    sendView(pathname, new URLSearchParams(searchParams.toString()));
  }, [pathname, searchParams]);
  return null;
}
