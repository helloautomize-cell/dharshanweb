"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { bookingReasons } from "@/lib/styleguide-copy";

export function FinderBar() {
  const [format, setFormat] = useState("clinic");
  return (
    <form className="finder" action="/contact/" method="get">
      <div className="field">
        <label htmlFor="reason">I need help with</label>
        <select id="reason" name="reason">
          {bookingReasons.map((reason) => (
            <option key={reason}>{reason}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <span id="format-label">See the doctor</span>
        <div className="segmented" role="group" aria-labelledby="format-label">
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
      <div className="field">
        <label htmlFor="when">When</label>
        <select id="when" name="when">
          <option>This week</option>
          <option>Later</option>
        </select>
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        formAction="/contact/#book"
      >
        Request a time
        <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </form>
  );
}
