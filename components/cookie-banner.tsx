"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { openCookieSettings, readConsent, writeConsent } from "@/lib/consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-link-button"
      onClick={() => openCookieSettings()}
    >
      Cookie settings
    </button>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = readConsent() === null;
    const open = () => {
      setSettings(true);
      setVisible(true);
    };
    addEventListener("rehabify:cookie-settings", open);
    const frame = show ? requestAnimationFrame(() => setVisible(true)) : 0;
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("rehabify:cookie-settings", open);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector("button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;
  const save = (value: boolean) => {
    writeConsent(value);
    setVisible(false);
    setSettings(false);
  };
  return (
    <div
      className="cookie-banner"
      role="region"
      aria-label="Cookie consent"
      ref={panel}
    >
      <h2>Cookies and analytics</h2>
      <p>
        Rehabify uses essential cookies to remember your choices. With your
        consent, privacy-respecting analytics help us understand which pages are
        useful. Nothing loads without your choice.
      </p>
      {settings && (
        <label className="consent-toggle">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />
          <span>
            Allow analytics cookies <small>Measures page visits only.</small>
          </span>
        </label>
      )}
      <div className="cookie-actions">
        {settings ? (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => save(analytics)}
            >
              Save choices
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setSettings(false)}
            >
              Back
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => save(true)}
            >
              Accept analytics
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => save(false)}
            >
              Essential only
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setSettings(true)}
            >
              Customise
            </button>
          </>
        )}
      </div>
      <p className="cookie-fine">
        Details in the <Link href="/privacy-policy/">privacy policy</Link>.
      </p>
    </div>
  );
}
