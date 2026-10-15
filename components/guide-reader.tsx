"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/lib/icons";

export function GuideReader({
  sections,
  related,
}: {
  sections: { id: string; label: string }[];
  related: ReactNode;
}) {
  const rail = useRef<HTMLElement>(null);
  useEffect(() => {
    const article = document.getElementById("guide-body");
    if (!article) return;
    let frame = 0;
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((heading): heading is HTMLElement => !!heading);
    const links =
      rail.current?.querySelectorAll<HTMLAnchorElement>(".guide-toc a");
    const progress = rail.current?.querySelector<HTMLElement>(
      ".guide-reading-progress span",
    );
    function update() {
      frame = 0;
      let active = headings[0]?.id;
      for (const heading of headings)
        if (heading.getBoundingClientRect().top <= 160) active = heading.id;
      links?.forEach((link) => {
        if (link.hash === `#${active}`)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      const box = article!.getBoundingClientRect();
      const amount = Math.min(
        1,
        Math.max(0, -box.top / Math.max(1, box.height - innerHeight)),
      );
      if (progress) progress.style.transform = `scaleX(${amount})`;
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);
  return (
    <>
      <aside ref={rail} className="guide-rail" aria-label="In this guide">
        <div className="guide-rail-sticky">
          <p className="care-kicker">In this guide</p>
          <ol className="guide-toc">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ol>
          <div className="guide-reading-progress" aria-hidden="true">
            <span />
          </div>
          {related}
        </div>
      </aside>
      <details className="guide-mobile-contents">
        <summary>
          In this guide
          <Icon name="chevronDown" size={18} />
        </summary>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => {
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open");
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
