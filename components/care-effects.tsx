"use client";

import { useEffect } from "react";

export function CareEffects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".care-page");
    if (!root) return;
    const areas = [...root.querySelectorAll<HTMLElement>(".care-area")];
    const rail = root.querySelector<HTMLElement>(".care-area-nav-list");
    const links = [
      ...root.querySelectorAll<HTMLAnchorElement>(".care-area-nav-list a"),
    ];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = "";
    const update = () => {
      frame = 0;
      const active =
        areas
          .filter(
            (area) => area.getBoundingClientRect().top <= innerHeight * 0.4,
          )
          .at(-1) ?? areas[0];
      if (!active || current === active.id) return;
      current = active.id;
      for (const link of links) {
        if (link.hash === `#${current}`) {
          link.setAttribute("aria-current", "location");
          if (rail && innerWidth < 1000) {
            rail.scrollTo({
              left:
                link.offsetLeft - rail.clientWidth / 2 + link.offsetWidth / 2,
              behavior: reduced.matches ? "instant" : "smooth",
            });
          }
        } else link.removeAttribute("aria-current");
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    const letterLinks = [
      ...root.querySelectorAll<HTMLAnchorElement>(".care-az-letters a"),
    ];
    const updateLetter = () => {
      const active =
        letterLinks.find((link) => link.hash === location.hash) ??
        letterLinks[0];
      for (const link of letterLinks) {
        if (link === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    updateLetter();
    addEventListener("hashchange", updateLetter);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (reduced.matches || entry.boundingClientRect.top < 110) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0.85, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 400, easing: "ease-out" },
          );
          animations.add(animation);
          animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation),
          );
        }
      },
      { threshold: 0.06 },
    );
    root
      .querySelectorAll("[data-care-reveal]")
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (reduced.matches)
        animations.forEach((animation) => animation.cancel());
    };
    reduced.addEventListener("change", stop);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      removeEventListener("hashchange", updateLetter);
      reduced.removeEventListener("change", stop);
      cancelAnimationFrame(frame);
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
