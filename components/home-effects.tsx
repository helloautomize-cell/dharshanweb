"use client";

import { useEffect } from "react";

/* Journey spine draw + step tracking, and a single fade-up reveal for
   content blocks. Reduced motion shows the final states. */
export function HomeEffects() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = (s: string) => document.querySelector<HTMLElement>(s);
    const $$ = <T,>(s: string) => [...document.querySelectorAll(s)] as T[];

    const jp = document.querySelector<SVGPathElement>("#jpath");
    const steps = $$<HTMLElement>(".step");
    const verts = $$<SVGRectElement>("#jverts .v");
    const jn = $("#jn");
    const jt = $("#jt");
    const js = $("#js");
    const cards = $$<HTMLElement>(".sc");
    const stepData = steps.map((s) => s.dataset.title || "");
    let jcur = -1;
    const jset = (n: number) => {
      if (n === jcur) return;
      jcur = n;
      if (jn) jn.textContent = String(n + 1).padStart(2, "0");
      if (jt) jt.textContent = stepData[n];
      if (js) js.textContent = `Step ${n + 1} of ${steps.length}`;
      steps.forEach((s, i) => s.classList.toggle("on", i === n));
      verts.forEach((v, i) =>
        v.setAttribute("class", "v" + (i < n ? " done" : i === n ? " on" : "")),
      );
    };

    const onScroll = () => {
      const stepsWrap = $(".steps");
      if (jp && stepsWrap) {
        const sr = stepsWrap.getBoundingClientRect();
        const jpg = Math.min(
          1,
          Math.max(0, (innerHeight * 0.5 - sr.top) / sr.height),
        );
        jp.setAttribute(
          "stroke-dashoffset",
          reduce ? "0" : String(1000 * (1 - jpg)),
        );
      }
      steps.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        if (r.top < innerHeight * 0.55 && r.bottom > innerHeight * 0.45)
          jset(i);
      });
      // stacking cards: the card under the incoming one settles back
      if (innerWidth >= 1024 && !reduce) {
        cards.forEach((c, i) => {
          const nx = cards[i + 1];
          if (!nx) {
            c.style.transform = "";
            c.style.filter = "";
            return;
          }
          const a = c.getBoundingClientRect();
          const b = nx.getBoundingClientRect();
          const o = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
          c.style.transform = `scale(${1 - o * 0.06})`;
          c.style.filter = `brightness(${1 - o * 0.08})`;
        });
      }
    };

    const rise = $$<HTMLElement>(".tile, .sc, .dcard");
    let riseIo: IntersectionObserver | null = null;
    if (!reduce) {
      rise.forEach((el) => el.setAttribute("data-rise", ""));
      riseIo = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting || el.getBoundingClientRect().bottom < 0) {
              el.classList.add("in");
              riseIo?.unobserve(el);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      rise.forEach((el) => riseIo?.observe(el));
    }

    let tick = false;
    const onScrollThrottled = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(() => {
          onScroll();
          tick = false;
        });
      }
    };
    addEventListener("scroll", onScrollThrottled, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();
    if (document.fonts?.ready) document.fonts.ready.then(onScroll);
    jset(0);

    return () => {
      riseIo?.disconnect();
      removeEventListener("scroll", onScrollThrottled);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
