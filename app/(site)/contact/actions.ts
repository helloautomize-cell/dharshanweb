"use server";

import { redirect } from "next/navigation";
import {
  BOOKING_FIELDS,
  bookingWhatsappUrl,
  validateBooking,
} from "@/lib/booking";

export type BookingState = {
  errors?: Record<string, string>;
  summary?: string[];
  values?: Record<string, string>;
};

function fieldValue(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const values = Object.fromEntries(
    BOOKING_FIELDS.map((f) => [f, fieldValue(formData, f)]),
  );

  // Honeypot: pretend nothing happened, send nothing.
  if (values.website) return {};

  const result = validateBooking(values);
  if (!result.ok) {
    return { errors: result.errors, summary: result.summary, values };
  }

  redirect(bookingWhatsappUrl(result.data));
}
