"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { goals } from "@/lib/styleguide-copy";

export function GoalsBento() {
  const tile = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState([true, false, true, false]);
  const count = selected.filter(Boolean).length;
  return (
    <div className="bento-demo">
      <article
        ref={tile}
        className="spotlight-tile"
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
        <p className="doctor-statement">
          Your plan is written by a <strong>rehabilitation doctor</strong> after
          examining you, and it changes as you do.
        </p>
        <div className="byline">
          <Image
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
      <article className="goals-tile">
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
    </div>
  );
}
