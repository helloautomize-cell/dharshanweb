"use client";

import { useState } from "react";
import { bookingReasons } from "@/lib/styleguide-copy";

/* v3 finder bar: overlaps the hero bottom edge, prefills /contact/ via GET. */
export function FinderBar() {
  const [format, setFormat] = useState("clinic");
  const [when, setWhen] = useState("week");
  return (
    <form
      className="finder"
      action="/contact/"
      method="get"
      aria-label="Find care"
    >
      <div className="fld">
        <label htmlFor="f-need">I need help with</label>
        <select id="f-need" name="reason">
          {bookingReasons.map((reason) => (
            <option key={reason}>{reason}</option>
          ))}
        </select>
      </div>
      <div className="fld">
        <label>See the doctor</label>
        <div className="seg" role="group">
          {[
            ["clinic", "In clinic"],
            ["video", "By video"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={format === value}
              onClick={() => setFormat(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <input type="hidden" name="format" value={format} />
      </div>
      <div className="fld">
        <label>When</label>
        <div className="seg" role="group">
          {[
            ["week", "This week"],
            ["later", "Later"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={when === value}
              onClick={() => setWhen(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <input type="hidden" name="when" value={when} />
      </div>
      <button
        className="btn finder-go"
        type="submit"
        formAction="/contact/#book"
      >
        Request a time
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
