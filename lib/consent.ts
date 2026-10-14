// Consent state lives in localStorage. Nothing third-party loads without it.
const KEY = "rehabify-consent-v1";
const VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export type ConsentState = { analytics: boolean; v: number; ts: number };
let cached: ConsentState | null | undefined;
const listeners = new Set<() => void>();
export function readConsent(): ConsentState | null {
  if (cached !== undefined) return cached;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      cached = null;
      return null;
    }
    const parsed = JSON.parse(raw) as ConsentState;
    cached =
      parsed.v === VERSION && Date.now() - parsed.ts < MAX_AGE_MS
        ? parsed
        : null;
  } catch {
    cached = null;
  }
  return cached;
}
export function writeConsent(analytics: boolean) {
  cached = { analytics, v: VERSION, ts: Date.now() };
  try {
    localStorage.setItem(KEY, JSON.stringify(cached));
  } catch {
    // storage unavailable; consent stays in memory only
  }
  listeners.forEach((fn) => fn());
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("rehabify:consent"));
}
export function subscribeConsent(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function hasAnalyticsConsent() {
  return readConsent()?.analytics === true;
}
export function openCookieSettings() {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("rehabify:cookie-settings"));
}
