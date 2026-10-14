"use client";

import { useEffect, useRef, useState } from "react";

type SpineSection = { id: string; label: string };

// Vertebra rail for pages that mark sections with data-spine="C1 · Label".
// Hidden under 1280px and on pages without marked sections.
export function SpineNav() {
  const [sections, setSections] = useState<SpineSection[]>([]);
  const [current, setCurrent] = useState(-1);
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const found = [
      ...document.querySelectorAll<HTMLElement>("[data-spine]"),
    ].map((el) => {
      if (!el.id) el.id = `spine-${el.dataset.spine?.split(" ")[0]}`;
      return { id: el.id, label: el.dataset.spine ?? el.id };
    });
    const frame = requestAnimationFrame(() => setSections(found));
    if (!found.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setCurrent(
              found.findIndex((s) => s.id === (entry.target as HTMLElement).id),
            );
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    found.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      const mid = document.elementFromPoint(40, innerHeight / 2);
      setDark(!!mid?.closest?.("[data-dark]"));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!sections.length) return null;
  return (
    <nav
      ref={ref}
      className={`spine-nav${dark ? " dark" : ""}`}
      aria-label="Page sections"
    >
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          data-label={section.label}
          className={index < current ? "done" : index === current ? "on" : ""}
        />
      ))}
    </nav>
  );
}
