"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { submitBooking, type BookingState } from "@/app/(site)/contact/actions";
import {
  dateBoundsIST,
  DOCTORS,
  FORMATS,
  TIMES,
  normaliseMobile,
} from "@/lib/booking-shared";
import { bookingReasons } from "@/lib/styleguide-copy";
import { siteConfig } from "@/lib/site-config";
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
  renderTime,
  renderSig,
  sourcePage = "/contact/",
  initialDoctor,
  initialFormat,
  initialReason,
}: {
  renderTime: string;
  renderSig: string;
  sourcePage?: string;
  initialDoctor?: string;
  initialFormat?: string;
  initialReason?: string;
}) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(
    submitBooking,
    {},
  );
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const summaryRef = useRef<HTMLDivElement>(null);
  const pick = (key: string, fallback: string) => values[key] ?? fallback;
  const [under18, setUnder18] = useState(values.under18 === "on");
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const allErrors = { ...errors, ...localErrors };
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const bounds = dateBoundsIST();

  useEffect(() => {
    if (state.summary?.length) summaryRef.current?.focus();
  }, [state]);

  useEffect(() => {
    if (!turnstileKey) return;
    if (document.getElementById("cf-turnstile")) return;
    const script = document.createElement("script");
    script.id = "cf-turnstile";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.head.appendChild(script);
  }, [turnstileKey]);

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
    <>
      {state.failed ? (
        <div className="form-failed" role="alert">
          <h3 className="h3">Something went wrong.</h3>
          <p>
            Your details are still here. Call or WhatsApp {siteConfig.phone} and
            we will book you straight away.
          </p>
          <div className="button-row">
            <Link className="btn btn-primary" href={siteConfig.phoneHref}>
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" /> Call
            </Link>
            <Link className="btn btn-wa" href={siteConfig.whatsapp}>
              <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />{" "}
              WhatsApp
            </Link>
          </div>
          <p className="muted">Or try the form again below.</p>
        </div>
      ) : null}
      <form action={formAction} className="booking-form" id="book" noValidate>
        {state.summary?.length ? (
          <div
            className="error-summary"
            role="alert"
            tabIndex={-1}
            ref={summaryRef}
          >
            <p>
              <strong>Please fix {state.summary.length} things:</strong>
            </p>
            <ul>
              {Object.entries(errors).map(([field, message]) => (
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
        <input type="hidden" name="renderTime" value={renderTime} />
        <input type="hidden" name="renderSig" value={renderSig} />
        <input type="hidden" name="sourcePage" value={sourcePage} />

        <fieldset className="radio-cards" id={fieldIds.doctor}>
          <legend>Doctor</legend>
          {DOCTORS.map((d) => (
            <label className="radio-card" key={d}>
              <input
                type="radio"
                name="doctor"
                value={d}
                defaultChecked={
                  pick("doctor", initialDoctor ?? "No preference") === d ||
                  (!pick("doctor", initialDoctor ?? "") &&
                    d === "No preference")
                }
              />
              <span>{d}</span>
            </label>
          ))}
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
            <label htmlFor={fieldIds.age}>Age</label>
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

        {turnstileKey ? (
          <div
            className="cf-turnstile"
            data-sitekey={turnstileKey}
            data-theme="dark"
          />
        ) : null}

        <button
          className="btn btn-primary submit-btn"
          type="submit"
          disabled={pending}
        >
          {pending ? (
            <span className="spinner" aria-hidden="true" />
          ) : (
            <CalendarDays size={20} strokeWidth={1.75} aria-hidden="true" />
          )}
          {pending ? "Sending…" : "Request a time"}
        </button>
        <p className="form-note">
          Please do not include detailed medical information here. You can share
          it with the doctor at your consultation.
        </p>
      </form>
    </>
  );
}
