"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function MotionReview({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        element.style.setProperty(
          "--play",
          entry.isIntersecting ? "running" : "paused",
        );
        if (entry.isIntersecting && element.classList.contains("badge-card"))
          element.dataset.seen = "true";
      }
    });
    root
      .querySelectorAll(".btn-glow, .goniometer, .badge-card")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
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
