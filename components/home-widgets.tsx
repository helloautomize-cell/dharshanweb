"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { goals } from "@/lib/styleguide-copy";

/* Read-only goal meter: an example plan with calm progress bars that grow
   once when the tile scrolls into view. Decorative bars are aria-hidden;
   the state is always visible text. */
const meter = [100, 75, 50, 25];

export function GoalsTile() {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.setAttribute("data-fx", "");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <ul className="gm" ref={ref}>
        {goals.map((goal, i) => {
          const done = meter[i] === 100;
          return (
            <li
              className="gm-row"
              key={goal}
              style={{ "--v": meter[i] / 100, "--i": i } as CSSProperties}
            >
              <span className="gm-top">
                <span className="gm-goal">{goal}</span>
                <span className={`gm-state${done ? " done" : ""}`}>
                  {done && (
                    <Check size={14} strokeWidth={1.75} aria-hidden="true" />
                  )}
                  {done ? "Reached" : `${meter[i]}%`}
                </span>
              </span>
              <span className="gm-bar" aria-hidden="true">
                <span className="gm-fill" />
              </span>
            </li>
          );
        })}
      </ul>
      <p className="gm-note">
        An example plan. Your goals are set with your doctor and measured at
        every review.
      </p>
    </>
  );
}
