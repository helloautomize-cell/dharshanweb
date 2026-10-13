"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { goals } from "@/lib/styleguide-copy";
import { conditions } from "@/lib/conditions";

export function QuoteTile() {
  const tile = useRef<HTMLElement>(null);
  return (
    <article
      ref={tile}
      className="spotlight-tile bento-tile bento-quote"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        tile.current?.style.setProperty(
          "--mx",
          `${event.clientX - bounds.left}px`,
        );
        tile.current?.style.setProperty(
          "--my",
          `${event.clientY - bounds.top}px`,
        );
      }}
    >
      <p className="kicker">How it starts</p>
      <p className="doctor-statement">
        Your plan is written by a <strong>rehabilitation doctor</strong> after
        examining you, and it changes as you do.
      </p>
      <div className="byline">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/doctors/dr-dharshan-avatar-160.jpg"
          width={56}
          height={56}
          alt=""
        />
        <div>
          <b>Dr. Dharshan N A</b>
          <p>MBBS, MD (Physical Medicine and Rehabilitation)</p>
        </div>
      </div>
    </article>
  );
}

export function GoalsTile() {
  const [selected, setSelected] = useState([true, false, true, false]);
  const count = selected.filter(Boolean).length;
  return (
    <article className="goals-tile bento-tile">
      <p className="kicker">
        Goals you choose <span className="try-chip">Try it</span>
      </p>
      <h3 className="h3">
        Progress is measured in the things you can do again.
      </h3>
      <p className="example-label">Example goals</p>
      <div className="goals">
        {goals.map((goal, index) => (
          <button
            className="goal"
            key={goal}
            type="button"
            aria-pressed={selected[index]}
            onClick={() =>
              setSelected((previous) =>
                previous.map((value, i) => (i === index ? !value : value)),
              )
            }
          >
            <span className="check-box">
              {selected[index] && (
                <Check size={16} strokeWidth={1.75} aria-hidden="true" />
              )}
            </span>
            {goal}
          </button>
        ))}
      </div>
      <div
        className="goals-ring"
        role="status"
        aria-label="Example goal progress"
      >
        <svg viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r="24" className="ring-track" />
          <circle
            cx="30"
            cy="30"
            r="24"
            className="ring-progress"
            strokeDasharray={150.8}
            strokeDashoffset={150.8 * (1 - count / 4)}
          />
        </svg>
        <p>
          <strong>{count} of 4</strong> goals reached<span>Example</span>
        </p>
      </div>
    </article>
  );
}

const switchContent = {
  clinic:
    "A full examination of movement, strength and pain. Procedures are done on site when needed.",
  video:
    "Start from home with a video consult. Share reports, move on camera, leave with a first plan.",
};

export function ClinicVideoTile() {
  const [format, setFormat] = useState<"clinic" | "video">("clinic");
  return (
    <article className="bento-tile switch-tile">
      <p className="kicker">In clinic / by video</p>
      <div className="segmented" role="group" aria-label="Consultation format">
        {(["clinic", "video"] as const).map((value) => (
          <button
            type="button"
            key={value}
            aria-pressed={format === value}
            onClick={() => setFormat(value)}
          >
            {value === "clinic" ? "In clinic" : "By video"}
          </button>
        ))}
      </div>
      <p className="switch-copy" aria-live="polite">
        {switchContent[format]}
      </p>
    </article>
  );
}

export function ConditionsAZ() {
  const [query, setQuery] = useState("");
  const letters = [...new Set(conditions.map((c) => c.name[0].toUpperCase()))];
  const filtered = conditions.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="az-search">
      <div className="field az-field">
        <label htmlFor="condition-search">Search conditions</label>
        <input
          id="condition-search"
          type="search"
          placeholder="Try knee, stroke or sciatica"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="az-jump" role="group" aria-label="Jump to letter">
        {letters.map((letter) => (
          <Link key={letter} href={`#az-${letter}`}>
            {letter}
          </Link>
        ))}
      </div>
      {letters.map((letter) => {
        const items = filtered.filter(
          (c) => c.name[0].toUpperCase() === letter,
        );
        if (!items.length) return null;
        return (
          <div className="az-group" key={letter}>
            <h3 className="az-letter" id={`az-${letter}`}>
              {letter}
            </h3>
            <ul>
              {items.map((c) => (
                <li key={c.name}>
                  <Link href={c.href}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {filtered.length === 0 && (
        <p className="muted">
          No condition matches that word. See{" "}
          <Link href="/conditions/" className="text-link">
            all care
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </p>
      )}
    </div>
  );
}
