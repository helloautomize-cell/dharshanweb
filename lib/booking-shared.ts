// Pure helpers shared by the booking form (client) and schema (server).
// Deliberately free of zod so the client bundle stays small.
export const DOCTORS = [
  "Dr. Dharshan N A",
  "Dr. Selina Kh",
  "No preference",
] as const;
export const FORMATS = ["clinic", "video"] as const;
export const TIMES = ["morning", "afternoon", "evening"] as const;

export function normaliseMobile(raw: string): string {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91"))
    digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0"))
    digits = digits.slice(1);
  return digits;
}

export function dateBoundsIST(): { min: string; max: string } {
  const now = new Date();
  const ist = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const max = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  return { min: ist(now), max: ist(max) };
}
