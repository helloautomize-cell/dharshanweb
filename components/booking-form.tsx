"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { submitBooking, type BookingState } from "@/app/(site)/contact/actions";
import {
  dateBoundsIST,
  DOCTORS,
  FORMATS,
  TIMES,
  normaliseMobile,
} from "@/lib/booking-shared";
import {
  BOOKING_FIELDS,
  bookingEntity,
  bookingWhatsappUrl,
  validateBooking,
} from "@/lib/booking";
import { bookingReasons } from "@/lib/site-copy";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { Icon } from "@/lib/icons";
import Link from "next/link";

const fieldIds: Record<string, string> = {
  doctor: "f-doctor",
  format: "f-format",
  reason: "f-reason",
  patientName: "f-name",
  mobile: "f-mobile",
  ageValue: "f-age",
  date: "f-date",
  time: "f-time",
  city: "f-city",
  under18: "f-u18",
  guardianName: "f-guardian",
  guardianConsent: "f-gconsent",
  consent: "f-consent",
};

export function BookingForm({
  initialDoctor,
  initialFormat,
  initialReason,
}: {
  initialDoctor?: string;
  initialFormat?: string;
  initialReason?: string;
}) {
  const [state, formAction] = useActionState<BookingState, FormData>(
    submitBooking,
    {},
  );
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const summaryRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const pick = (key: string, fallback: string) => values[key] ?? fallback;
  const [under18, setUnder18] = useState(values.under18 === "on");
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [localSummary, setLocalSummary] = useState<string[]>([]);
  const [sent, setSent] = useState<{ url: string; entity: string } | null>(
    null,
  );
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const allErrors = { ...errors, ...localErrors };
  const summary = useMemo(
    () => (localSummary.length ? localSummary : (state.summary ?? [])),
    [localSummary, state.summary],
  );
  const bounds = dateBoundsIST();

  useEffect(() => {
    if (summary.length) summaryRef.current?.focus();
  }, [summary]);

  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  function validate(field: string, value: string) {
    let message = "";
    if (field === "patientName") {
      if (!value.trim() || value.trim().length < 2)
        message = "Enter the patient's name";
      else if (!/^[A-Za-z.'\s]+$/.test(value))
        message = "Use letters, spaces, dots and apostrophes only";
    }
    if (field === "mobile" && !/^[6-9]\d{9}$/.test(normaliseMobile(value)))
      message = "Enter a 10-digit mobile number";
    if (field === "ageValue" && !/^\d{1,3}$/.test(value.trim()))
      message = "Enter the age";
    if (field === "date" && value && (value < bounds.min || value > bounds.max))
      message = "Pick a date within the next 60 days";
    setLocalErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(
      BOOKING_FIELDS.map((f) => {
        const v = fd.get(f);
        return [f, typeof v === "string" ? v : ""];
      }),
    );
    if (formValues.website) return; // honeypot: ignore silently
    const result = validateBooking(formValues);
    if (!result.ok) {
      setLocalErrors(result.errors);
      setLocalSummary(result.summary);
      return;
    }
    const url = bookingWhatsappUrl(result.data);
    setLocalErrors({});
    setLocalSummary([]);
    track("whatsapp_click", { placement: "booking_form" });
    track("generate_lead", { form_type: "booking_whatsapp" });
    if (window.matchMedia("(pointer: coarse)").matches) {
      window.location.href = url;
    } else {
      const win = window.open(url, "_blank");
      if (!win) {
        window.location.href = url;
      } else {
        try {
          win.opener = null;
        } catch {
          // cross-origin guard: leave opener as-is
        }
      }
    }
    setSent({ url, entity: bookingEntity(result.data.doctor) });
  }

  const err = (key: string) => {
    const m = allErrors[key];
    if (!m) return null;
    return (
      <p className="field-error" id={`${fieldIds[key]}-error`}>
        {m}
      </p>
    );
  };
  const described = (key: string) =>
    allErrors[key] ? `${fieldIds[key]}-error` : undefined;

  return (
    <form
      action={hydrated ? undefined : formAction}
      onSubmit={handleSubmit}
      className="booking-form"
      id="book-form"
      noValidate
    >
      {summary.length ? (
        <div
          className="error-summary"
          role="alert"
          tabIndex={-1}
          ref={summaryRef}
        >
          <p>
            <strong>Please fix {summary.length} things:</strong>
          </p>
          <ul>
            {Object.entries(allErrors).map(([field, message]) => (
              <li key={field}>
                <a
                  href={`#${fieldIds[field] ?? "book"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(
                      fieldIds[field] ?? "book",
                    );
                    if (el) {
                      el.tabIndex = -1;
                      el.focus();
                    }
                  }}
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <input
        type="text"
        name="website"
        className="hp-field"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      <fieldset className="segmented-field" id={fieldIds.doctor}>
        <legend>Doctor</legend>
        <div className="segmented">
          {DOCTORS.map((d) => (
            <label key={d} className="seg-option">
              <input
                type="radio"
                name="doctor"
                value={d}
                defaultChecked={
                  pick("doctor", initialDoctor ?? "No preference") === d ||
                  (!pick("doctor", initialDoctor ?? "") && d === "No preference")
                }
              />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="segmented-field" id={fieldIds.format}>
        <legend>Format</legend>
        <div className="segmented">
          {FORMATS.map((f) => (
            <label key={f} className="seg-option">
              <input
                type="radio"
                name="format"
                value={f}
                defaultChecked={pick("format", initialFormat ?? "") === f}
                required
              />
              <span>{f === "clinic" ? "Clinic visit" : "Video consult"}</span>
            </label>
          ))}
        </div>
        {err("format")}
      </fieldset>

      <div className="field">
        <label htmlFor={fieldIds.reason}>What do you need help with?</label>
        <select
          id={fieldIds.reason}
          name="reason"
          required
          key={pick("reason", initialReason ?? "init")}
          defaultValue={pick("reason", initialReason ?? "")}
          aria-invalid={!!allErrors.reason}
          aria-describedby={described("reason")}
        >
          <option value="">Choose one</option>
          {bookingReasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {err("reason")}
      </div>

      <div className="field-grid">
        <div className="field">
          <label htmlFor={fieldIds.patientName}>Patient name</label>
          <input
            id={fieldIds.patientName}
            name="patientName"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            defaultValue={values.patientName}
            aria-invalid={!!allErrors.patientName}
            aria-describedby={described("patientName")}
            onBlur={(e) => validate("patientName", e.target.value)}
          />
          {err("patientName")}
        </div>
        <div className="field mobile-field">
          <label htmlFor={fieldIds.mobile}>Mobile</label>
          <div className="mobile-wrap">
            <span className="mobile-prefix">+91</span>
            <input
              id={fieldIds.mobile}
              name="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              defaultValue={values.mobile}
              aria-invalid={!!allErrors.mobile}
              aria-describedby={described("mobile")}
              onBlur={(e) => validate("mobile", e.target.value)}
            />
          </div>
          {err("mobile")}
        </div>
      </div>

      <div className="field-grid">
        <div className="field age-field">
          <label htmlFor={fieldIds.ageValue}>Age</label>
          <div className="age-wrap">
            <input
              id={fieldIds.ageValue}
              name="ageValue"
              type="number"
              inputMode="numeric"
              min={0}
              max={110}
              required
              defaultValue={values.ageValue}
              aria-invalid={!!allErrors.ageValue}
              aria-describedby={described("ageValue")}
              onBlur={(e) => validate("ageValue", e.target.value)}
            />
            <select
              name="ageUnit"
              aria-label="Age in years or months"
              defaultValue={values.ageUnit ?? "years"}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
          {err("ageValue")}
        </div>
        <div className="field">
          <label htmlFor={fieldIds.date}>Preferred date</label>
          <input
            id={fieldIds.date}
            name="date"
            type="date"
            min={bounds.min}
            max={bounds.max}
            required
            defaultValue={values.date}
            aria-invalid={!!allErrors.date}
            aria-describedby={described("date")}
            onBlur={(e) => validate("date", e.target.value)}
          />
          {err("date")}
        </div>
      </div>

      <fieldset className="segmented-field" id={fieldIds.time}>
        <legend>Time of day</legend>
        <div className="segmented">
          {TIMES.map((t) => (
            <label key={t} className="seg-option">
              <input
                type="radio"
                name="time"
                value={t}
                defaultChecked={pick("time", "") === t}
                required
              />
              <span>{t[0].toUpperCase() + t.slice(1)}</span>
            </label>
          ))}
        </div>
        {err("time")}
      </fieldset>

      <div className="field">
        <label htmlFor={fieldIds.city}>City (optional)</label>
        <input
          id={fieldIds.city}
          name="city"
          type="text"
          maxLength={60}
          autoComplete="address-level2"
          defaultValue={values.city}
        />
      </div>

      <div className="check-field">
        <label className="check-line" htmlFor={fieldIds.under18}>
          <input
            id={fieldIds.under18}
            type="checkbox"
            name="under18"
            defaultChecked={values.under18 === "on"}
            onChange={(e) => setUnder18(e.target.checked)}
            aria-invalid={!!allErrors.under18}
            aria-describedby={described("under18")}
          />
          <span>The patient is under 18</span>
        </label>
        {err("under18")}
      </div>

      {under18 && (
        <div className="guardian-block">
          <div className="field">
            <label htmlFor={fieldIds.guardianName}>
              Parent or guardian name
            </label>
            <input
              id={fieldIds.guardianName}
              name="guardianName"
              type="text"
              minLength={2}
              maxLength={80}
              defaultValue={values.guardianName}
              aria-invalid={!!allErrors.guardianName}
              aria-describedby={described("guardianName")}
            />
            {err("guardianName")}
          </div>
          <div className="check-field">
            <label className="check-line" htmlFor={fieldIds.guardianConsent}>
              <input
                id={fieldIds.guardianConsent}
                type="checkbox"
                name="guardianConsent"
                defaultChecked={values.guardianConsent === "on"}
                aria-invalid={!!allErrors.guardianConsent}
                aria-describedby={described("guardianConsent")}
              />
              <span>
                I am the parent or legal guardian of this patient, and I agree
                that Rehabify may use these details to contact me about the
                appointment, as explained in the{" "}
                <Link href="/privacy-policy/">Privacy Policy</Link>.
              </span>
            </label>
            {err("guardianConsent")}
          </div>
        </div>
      )}

      <div className="check-field">
        <label className="check-line" htmlFor={fieldIds.consent}>
          <input
            id={fieldIds.consent}
            type="checkbox"
            name="consent"
            defaultChecked={values.consent === "on"}
            aria-invalid={!!allErrors.consent}
            aria-describedby={described("consent")}
          />
          <span>
            I agree that Rehabify may use these details to contact me about my
            appointment, as explained in the{" "}
            <Link href="/privacy-policy/">Privacy Policy</Link>.
          </span>
        </label>
        {err("consent")}
      </div>

      {sent ? (
        <div className="form-sent" role="status" aria-live="polite">
          <h3 className="h3" tabIndex={-1} ref={sentRef}>
            Your message is ready in WhatsApp
          </h3>
          <p>
            Press Send in WhatsApp to request your appointment. {sent.entity}
            &rsquo;s team will confirm your time by WhatsApp or phone.
          </p>
          <div className="button-row">
            <Link
              className="btn btn-wa"
              href={sent.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} /> Open WhatsApp again
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setSent(null)}
            >
              Edit details
            </button>
          </div>
          <p className="form-note">
            No WhatsApp? Call{" "}
            <Link href={siteConfig.phoneHref}>{siteConfig.phone}</Link>
          </p>
        </div>
      ) : (
        <>
          <button className="btn btn-wa submit-btn" type="submit">
            <Icon name="whatsapp" size={20} /> Send on WhatsApp
          </button>
          <p className="form-note">
            WhatsApp opens with your details written for you. Press Send in
            WhatsApp to finish.
          </p>
        </>
      )}
      <p className="form-note">
        Please do not include detailed medical information here. You can share
        it with the doctor at your consultation.
      </p>
    </form>
  );
}
