// Typed event tracking. No-ops without analytics consent. Never send
// names, mobiles, ages, doctors, reasons, dates or health data.
import { hasAnalyticsConsent } from "@/lib/consent";

type EventName =
  | "book_click"
  | "call_click"
  | "whatsapp_click"
  | "directions_click"
  | "map_load"
  | "video_play"
  | "generate_lead";

const allowed: Record<string, string[]> = {
  book_click: ["cta_location"],
  call_click: ["cta_location"],
  whatsapp_click: ["cta_location"],
  generate_lead: ["form_type"],
  map_load: [],
  video_play: [],
  directions_click: [],
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(name: EventName, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || !window.gtag)
    return;
  const clean = Object.fromEntries(
    Object.entries(params).filter(([k]) => allowed[name]?.includes(k)),
  );
  window.gtag("event", name, clean);
}
