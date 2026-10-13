// Consent state lives in localStorage. Nothing third-party loads without it.
const KEY = "rehabify-consent-v1";
export type ConsentState = { analytics: boolean; ts: number };
let cached: ConsentState | null | undefined;
const listeners = new Set<() => void>();
export function readConsent(): ConsentState | null {
  if (cached !== undefined) return cached;
  try {
    const raw = localStorage.getItem(KEY);
    cached = raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    cached = null;
  }
  return cached;
}
export function writeConsent(analytics: boolean) {
  cached = { analytics, ts: Date.now() };
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
