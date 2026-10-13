"use client";

import { useSyncExternalStore } from "react";

// Shared booking prefill: the finder bar, menu and dock all feed /contact/#book.
export type BookingPrefill = {
  need?: string;
  format?: "clinic" | "video";
  when?: "week" | "later";
};
const KEY = "rehabify-booking-prefill";
const EMPTY: BookingPrefill = {};
let cached: BookingPrefill = EMPTY;
let rawSnapshot: string | null = null;
const listeners = new Set<() => void>();

function read(): BookingPrefill {
  if (typeof localStorage === "undefined") return EMPTY;
  const raw = localStorage.getItem(KEY);
  if (raw === rawSnapshot) return cached;
  rawSnapshot = raw;
  try {
    cached = raw ? (JSON.parse(raw) as BookingPrefill) : EMPTY;
  } catch {
    cached = EMPTY;
  }
  return cached;
}
export function setBookingPrefill(next: BookingPrefill) {
  rawSnapshot = JSON.stringify(next);
  cached = next;
  try {
    localStorage.setItem(KEY, rawSnapshot);
  } catch {
    // storage unavailable; keep in memory
  }
  listeners.forEach((fn) => fn());
}
function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function useBookingPrefill(): BookingPrefill {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
