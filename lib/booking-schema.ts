import { z } from "zod";
import { bookingReasons } from "@/lib/styleguide-copy";
import { DOCTORS, FORMATS, TIMES, normaliseMobile } from "@/lib/booking-shared";

export { DOCTORS, FORMATS, TIMES, normaliseMobile, dateBoundsIST } from "@/lib/booking-shared";

const mobile = z
  .string()
  .transform(normaliseMobile)
  .refine((d) => /^[6-9]\d{9}$/.test(d), "Enter a 10-digit mobile number");

const name = z
  .string()
  .trim()
  .min(2, "Enter the patient's name")
  .max(80, "Keep the name under 80 characters")
  .regex(/^[A-Za-z.'\s]+$/, "Use letters, spaces, dots and apostrophes only");

export const bookingSchema = z
  .object({
    doctor: z.enum(DOCTORS).default("No preference"),
    format: z.enum(FORMATS, { error: "Choose clinic visit or video consult" }),
    reason: z
      .string({ error: "Choose what you need help with" })
      .refine(
        (v) => (bookingReasons as readonly string[]).includes(v),
        "Choose what you need help with",
      ),
    patientName: name,
    mobile,
    ageValue: z
      .string()
      .refine((v) => /^\d{1,3}$/.test(v.trim()), "Enter the age")
      .transform((v) => Number(v.trim())),
    ageUnit: z.enum(["years", "months"]).default("years"),
    date: z.string().refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), "Pick a date"),
    time: z.enum(TIMES, { error: "Choose a time of day" }),
    city: z.string().trim().max(60, "Keep the city under 60 characters").optional(),
    under18: z.string().optional(),
    guardianName: z.string().trim().optional(),
    guardianConsent: z.string().optional(),
    consent: z.string({ error: "Please tick the consent box" }),
    website: z.string().optional(),
    renderTime: z.string().optional(),
    renderSig: z.string().optional(),
    "cf-turnstile-response": z.string().optional(),
    sourcePage: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const minor =
      data.ageUnit === "months" ||
      (data.ageUnit === "years" && data.ageValue < 18);
    if (data.ageUnit === "years" && data.ageValue > 110)
      ctx.addIssue({
        code: "custom",
        path: ["ageValue"],
        message: "Enter an age up to 110",
      });
    if (data.ageUnit === "months" && data.ageValue > 23)
      ctx.addIssue({
        code: "custom",
        path: ["ageValue"],
        message: "Enter an age up to 23 months, or switch to years",
      });
    if (minor && data.under18 !== "on")
      ctx.addIssue({
        code: "custom",
        path: ["under18"],
        message:
          "The patient is under 18. Please tick the box and add a guardian.",
      });
    if (data.under18 === "on") {
      const g = name.safeParse(data.guardianName ?? "");
      if (!g.success)
        ctx.addIssue({
          code: "custom",
          path: ["guardianName"],
          message: "Enter the parent or guardian's name",
        });
      if (data.guardianConsent !== "on")
        ctx.addIssue({
          code: "custom",
          path: ["guardianConsent"],
          message: "Please tick the guardian consent box",
        });
    }
    if (data.consent !== "on")
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "Please tick the consent box",
      });
  });

export type BookingValues = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;
