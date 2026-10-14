"use client";

import { useEffect, useRef, useState } from "react";

// One-at-a-time accordion for the home Quick answers section. Answers render
// open until data-fx is set on mount, so content stays readable without JS.
export function QuickAnswers({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  const [open, setOpen] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.setAttribute("data-fx", "");
  }, []);

  return (
    <div className="qas" ref={ref}>
      {items.map(([question, answer], i) => {
        const isOpen = open === i;
        return (
          <div className={`qa-item${isOpen ? " open" : ""}`} key={question}>
            <h3 className="qa-h">
              <button
                type="button"
                className="qa-q"
                id={`qa-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`qa-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{question}</span>
                <i className="qa-ic" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="qa-a"
              id={`qa-a-${i}`}
              role="region"
              aria-labelledby={`qa-q-${i}`}
            >
              <div>
                <p>{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
