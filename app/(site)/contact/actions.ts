"use server";

import { redirect } from "next/navigation";
import { createHmac } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import { bookingSchema, type BookingData } from "@/lib/booking-schema";

export type BookingState = {
  ok?: boolean;
  errors?: Record<string, string>;
  summary?: string[];
  values?: Record<string, string>;
  failed?: boolean;
};

const consentText =
  "I agree that Rehabify may use these details to contact me about my appointment, as explained in the Privacy Policy.";
const guardianText =
  "I am the parent or legal guardian of this patient, and I agree that Rehabify may use these details to contact me about the appointment, as explained in the Privacy Policy.";

function ist(date = new Date()) {
  return (
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date) + " IST"
  );
}

function signTime(ts: string) {
  const secret = process.env.FORM_SECRET ?? "";
  return secret ? createHmac("sha256", secret).update(ts).digest("hex") : null;
}

function validSignature(ts: string, sig: string) {
  const expected = signTime(ts);
  return expected === null || expected === sig;
}

async function verifyTurnstile(token: string | undefined, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!process.env.TURNSTILE_SITE_KEY || !secret) {
    console.warn("booking: turnstile keys missing, skipping check");
    return true;
  }
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(8000) },
    );
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

function fieldValue(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

async function sendEmail(data: BookingData) {
  const mode = process.env.RESEND_MODE;
  const age =
    data.ageUnit === "months"
      ? `${data.ageValue} months`
      : `${data.ageValue} years`;
  const minor =
    data.ageUnit === "months" ||
    (data.ageUnit === "years" && data.ageValue < 18) ||
    data.under18 === "on";
  const mobileDisplay = `+91${data.mobile}`;
  const rows: [string, string][] = [
    ["Doctor", data.doctor],
    ["Format", data.format === "clinic" ? "Clinic visit" : "Video consult"],
    ["Reason", data.reason],
    ["Patient name", data.patientName],
    [
      "Mobile",
      `<a href="tel:${mobileDisplay}">${mobileDisplay}</a> · <a href="https://wa.me/91${data.mobile}">WhatsApp</a>`,
    ],
    ["Age", age],
    ["Under 18", minor ? "Yes" : "No"],
    ...(minor && data.guardianName
      ? ([["Guardian name", data.guardianName]] as [string, string][])
      : []),
    [
      "Preferred date",
      new Date(`${data.date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }),
    ],
    ["Time of day", data.time[0].toUpperCase() + data.time.slice(1)],
    ["City", data.city || "-"],
    ["Source page", data.sourcePage || "/"],
    ["Submitted at", ist()],
    ["Consent", `${consentText} Ticked at ${ist()}`],
    ...(minor && data.guardianConsent === "on"
      ? ([["Guardian consent", `${guardianText} Ticked at ${ist()}`]] as [
          string,
          string,
        ][])
      : []),
  ];
  const subject = `Booking request: ${data.reason} · ${data.format === "clinic" ? "Clinic visit" : "Video consult"} · ${data.doctor}`;
  const html = `<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="border-bottom:1px solid #dfe8ee">${k}</th><td style="border-bottom:1px solid #dfe8ee">${v}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows
    .map(([k, v]) => `${k}: ${v.replace(/<[^>]+>/g, "")}`)
    .join("\n");

  if (mode === "mock" || mode === "fail") {
    await mkdir("artifacts", { recursive: true });
    if (mode === "mock")
      await writeFile(
        "artifacts/mock-email.html",
        `Subject: ${subject}\n\n${html}\n\n${text}`,
      );
    if (mode === "fail") return false;
    return true;
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;
  if (!key || !to || !from) {
    console.warn("booking: email key missing");
    return false;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });
    if (error) {
      console.warn("booking: resend error");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const fields = [
    "doctor",
    "format",
    "reason",
    "patientName",
    "mobile",
    "ageValue",
    "ageUnit",
    "date",
    "time",
    "city",
    "under18",
    "guardianName",
    "guardianConsent",
    "consent",
    "website",
    "renderTime",
    "renderSig",
    "cf-turnstile-response",
    "sourcePage",
  ];
  const values = Object.fromEntries(
    fields.map((f) => [f, fieldValue(formData, f)]),
  );

  // Spam guards: silent success, send nothing.
  if (values.website) redirect(`/thank-you/?type=${values.format || "clinic"}`);
  const ts = Number(values.renderTime);
  if (
    !values.renderTime ||
    !validSignature(values.renderTime, values.renderSig) ||
    Date.now() - ts < 3000
  )
    redirect(`/thank-you/?type=${values.format || "clinic"}`);

  if (!(await verifyTurnstile(values["cf-turnstile-response"]))) {
    return { failed: true, values };
  }

  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    const summary: string[] = [];
    for (const issue of parsed.error.issues) {
      const path = String(issue.path[0] ?? "form");
      if (!errors[path]) {
        errors[path] = issue.message;
        summary.push(issue.message);
      }
    }
    return { errors, summary, values };
  }

  const sent = await sendEmail(parsed.data);
  if (!sent) return { failed: true, values };

  redirect(`/thank-you/?type=${parsed.data.format}`);
}

export async function getSignedRenderTime() {
  const ts = String(Date.now());
  return { ts, sig: signTime(ts) ?? "" };
}
