// Shared booking logic: the same rules run in the browser (submit handler)
// and in the server action (no-JS path). Pure — no zod, no server-only APIs.
import { bookingReasons } from "@/lib/site-copy";
import { siteConfig } from "@/lib/site-config";
import {
  dateBoundsIST,
  DOCTORS,
  FORMATS,
  normaliseMobile,
  TIMES,
} from "@/lib/booking-shared";
import { visitFacts } from "@/lib/visit";

export const BOOKING_FIELDS = [
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
] as const;

export type BookingValues = Record<string, string>;

export type BookingData = {
  doctor: string;
  format: "clinic" | "video";
  reason: string;
  patientName: string;
  mobile: string;
  ageValue: number;
  ageUnit: "years" | "months";
  date: string;
  time: string;
  city: string;
  under18: boolean;
  guardianName: string;
  guardianConsent: boolean;
  consent: boolean;
};

export type BookingResult =
  | { ok: true; data: BookingData }
  | { ok: false; errors: Record<string, string>; summary: string[] };

const NAME_RE = /^[A-Za-z.'\s]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function nameCheck(value: string) {
  const t = value.trim();
  if (t.length < 2) return "Enter the patient's name";
  if (t.length > 80) return "Keep the name under 80 characters";
  if (!NAME_RE.test(t)) return "Use letters, spaces, dots and apostrophes only";
  return "";
}

// Who the message addresses: the chosen doctor, or the practice itself.
export function bookingEntity(doctor: string): string {
  return doctor === "No preference" || !doctor ? siteConfig.name : doctor;
}

function siteDomain(): string {
  try {
    return new URL(siteConfig.url).host;
  } catch {
    return siteConfig.url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
}

// Refuse dates falling on a weekday the hours data marks "closed".
// Days the clinic has not yet confirmed (null) are never refused.
function closedWeekday(dateStr: string): string {
  const day = new Date(`${dateStr}T00:00:00Z`);
  const index = (day.getUTCDay() + 6) % 7; // visitFacts.hours is Mon-first
  if (visitFacts.hours[index] !== "closed") return "";
  return day.toLocaleDateString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
}

export function validateBooking(values: BookingValues): BookingResult {
  const errors: Record<string, string> = {};
  const summary: string[] = [];
  const fail = (field: string, message: string) => {
    if (errors[field]) return;
    errors[field] = message;
    summary.push(message);
  };
  const get = (key: string) => values[key] ?? "";

  const doctorRaw = values.doctor;
  const doctorValid = (DOCTORS as readonly string[]).includes(doctorRaw ?? "");
  if (doctorRaw !== undefined && !doctorValid)
    fail(
      "doctor",
      `Invalid option: expected one of ${DOCTORS.map((d) => `"${d}"`).join("|")}`,
    );
  const doctorValue = doctorValid ? (doctorRaw as string) : "No preference";

  const format = get("format");
  if (!(FORMATS as readonly string[]).includes(format))
    fail("format", "Choose clinic visit or video consult");

  const reason = get("reason");
  if (!(bookingReasons as readonly string[]).includes(reason))
    fail("reason", "Choose what you need help with");

  const nameMessage = nameCheck(get("patientName"));
  if (nameMessage) fail("patientName", nameMessage);

  const mobile = normaliseMobile(get("mobile"));
  if (!/^[6-9]\d{9}$/.test(mobile))
    fail("mobile", "Enter a 10-digit mobile number");

  const ageRaw = get("ageValue").trim();
  const ageValid = /^\d{1,3}$/.test(ageRaw);
  if (!ageValid) fail("ageValue", "Enter the age");
  const ageValue = ageValid ? Number(ageRaw) : NaN;

  const ageUnitRaw = values.ageUnit;
  if (ageUnitRaw !== undefined && ageUnitRaw !== "years" && ageUnitRaw !== "months")
    fail("ageUnit", `Invalid option: expected one of "years"|"months"`);
  const ageUnit: "years" | "months" = ageUnitRaw === "months" ? "months" : "years";

  const date = get("date");
  if (!DATE_RE.test(date)) fail("date", "Pick a date");
  else {
    const bounds = dateBoundsIST();
    if (date < bounds.min || date > bounds.max)
      fail("date", "Pick a date within the next 60 days");
    else {
      const closed = closedWeekday(date);
      if (closed)
        fail(
          "date",
          `${bookingEntity(doctorValue)} does not consult on ${closed}s. Please choose another day.`,
        );
    }
  }

  const time = get("time");
  if (!(TIMES as readonly string[]).includes(time))
    fail("time", "Choose a time of day");

  const city = get("city").trim();
  if (city.length > 60) fail("city", "Keep the city under 60 characters");

  const under18 = get("under18") === "on";
  const guardianConsent = get("guardianConsent") === "on";
  const consent = get("consent") === "on";

  if (ageValid && ageUnit === "years" && ageValue > 110)
    fail("ageValue", "Enter an age up to 110");
  if (ageValid && ageUnit === "months" && ageValue > 23)
    fail("ageValue", "Enter an age up to 23 months, or switch to years");
  const minor = ageUnit === "months" || (ageValid && ageValue < 18);
  if (minor && !under18)
    fail(
      "under18",
      "The patient is under 18. Please tick the box and add a guardian.",
    );
  if (under18) {
    if (nameCheck(get("guardianName")))
      fail("guardianName", "Enter the parent or guardian's name");
    if (!guardianConsent)
      fail("guardianConsent", "Please tick the guardian consent box");
  }
  if (!consent) fail("consent", "Please tick the consent box");

  if (summary.length) return { ok: false, errors, summary };
  return {
    ok: true,
    data: {
      doctor: doctorValue,
      format: format as BookingData["format"],
      reason,
      patientName: get("patientName").trim(),
      mobile,
      ageValue,
      ageUnit,
      date,
      time,
      city,
      under18,
      guardianName: get("guardianName").trim(),
      guardianConsent,
      consent,
    },
  };
}

// Tidy a free-text value for WhatsApp: no markup characters, single spacing.
function cleanText(value: string): string {
  return value
    .replace(/[*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "Flexible";
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function bookingMessage(data: BookingData): string {
  const lines = [
    `*Doctor:* ${data.doctor}`,
    `*Format:* ${data.format === "clinic" ? "Clinic visit" : "Video consult"}`,
    `*What do you need help with?:* ${cleanText(data.reason)}`,
    `*Patient name:* ${cleanText(data.patientName)}`,
    `*Mobile:* +91 ${data.mobile}`,
    `*Age:* ${data.ageValue} ${data.ageUnit}`,
    `*Preferred date:* ${formatDate(data.date)}`,
    `*Time of day:* ${data.time[0].toUpperCase() + data.time.slice(1)}`,
  ];
  if (data.city) lines.push(`*City:* ${cleanText(data.city)}`);
  if (data.under18) {
    lines.push("*The patient is under 18:* Yes");
    if (data.guardianName)
      lines.push(`*Parent or guardian name:* ${cleanText(data.guardianName)}`);
  }
  const message = [
    `Hello ${bookingEntity(data.doctor)}, I would like to request an appointment.`,
    "",
    ...lines,
    "",
    "I agree to be contacted about this appointment.",
    `Sent from ${siteDomain()}`,
  ].join("\n");
  return message.slice(0, 1500);
}

function whatsappUrl(text: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function bookingWhatsappUrl(data: BookingData): string {
  return whatsappUrl(bookingMessage(data));
}
