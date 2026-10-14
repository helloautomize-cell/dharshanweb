"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";

export function MotionReview({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  return (
    <div
      ref={ref}
      className="review-root"
      data-reduce-motion={reduce ? "true" : undefined}
    >
      <header className="review-header">
        <a href="#styleguide" className="review-brand">
          Rehabify <span>Styleguide</span>
        </a>
        <label className="motion-toggle">
          <input
            type="checkbox"
            checked={reduce}
            onChange={(event) => setReduce(event.target.checked)}
          />
          Reduced motion
        </label>
      </header>
      {children}
    </div>
  );
}
