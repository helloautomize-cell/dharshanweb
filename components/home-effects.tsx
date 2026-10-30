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
    const verts = $$<SVGGElement>("#jverts .v");
    const stepsWrap = $(".steps");
    const jn = $("#jn");
    const jt = $("#jt");
    const js = $("#js");
    const cards = $$<HTMLElement>(".sc");
    const stepData = steps.map((s) => s.dataset.title || "");

    // Vertebrae sit on the drawn curve at (i + 0.5) / 6 of its length; the
    // server-rendered positions already match, this re-derives them so the
    // markup stays correct if the path ever changes.
    if (jp) {
      const L = jp.getTotalLength();
      verts.forEach((v, i) => {
        const p = jp.getPointAtLength((L * (i + 0.5)) / verts.length);
        v.setAttribute(
          "transform",
          `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`,
        );
      });
    }

    const ac = new AbortController();
    const sig = { signal: ac.signal };
    verts.forEach((v) => {
      const go = () => {
        const step = steps[Number(v.dataset.i)];
        step?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "center",
        });
      };
      v.addEventListener("click", go, sig);
      v.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            go();
          }
        },
        sig,
      );
    });

    // Mobile rail: track spans the first to the last step pill, fill scales
    // with the same progress value that drives the drawn path.
    const railMetrics = () => {
      if (!stepsWrap || !steps.length) return;
      const top = steps[0].offsetTop + 36;
      const bottom =
        stepsWrap.offsetHeight - steps[steps.length - 1].offsetTop - 36;
      stepsWrap.style.setProperty("--rt", `${top}px`);
      stepsWrap.style.setProperty("--rb", `${Math.max(0, bottom)}px`);
    };
    railMetrics();

    let jcur = -1;
    const jset = (n: number) => {
      if (n === jcur) return;
      jcur = n;
      if (jn) jn.textContent = String(n + 1).padStart(2, "0");
      if (jt) jt.textContent = stepData[n];
      if (js) js.textContent = `Step ${n + 1} of ${steps.length}`;
      steps.forEach((s, i) => {
        s.classList.toggle("on", i === n);
        s.classList.toggle("done", i < n);
      });
      verts.forEach((v, i) =>
        v.setAttribute("class", "v" + (i < n ? " done" : i === n ? " on" : "")),
      );
      if (reduce) {
        const count = steps.length;
        jp?.setAttribute(
          "stroke-dashoffset",
          String(1000 * (1 - (n + 0.5) / count)),
        );
        stepsWrap?.style.setProperty("--jp", String(n / (count - 1)));
      }
    };

    const onScroll = () => {
      if (jp && stepsWrap) {
        const sr = stepsWrap.getBoundingClientRect();
        const jpg = Math.min(
          1,
          Math.max(0, (innerHeight * 0.5 - sr.top) / sr.height),
        );
        if (!reduce) {
          jp.setAttribute("stroke-dashoffset", String(1000 * (1 - jpg)));
          stepsWrap.style.setProperty("--jp", jpg.toFixed(4));
        }
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
    const onResize = () => {
      railMetrics();
      onScroll();
    };
    addEventListener("scroll", onScrollThrottled, { passive: true });
    addEventListener("resize", onResize);
    onScroll();
    if (document.fonts?.ready)
      document.fonts.ready.then(() => {
        railMetrics();
        onScroll();
      });
    jset(0);

    return () => {
      ac.abort();
      riseIo?.disconnect();
      removeEventListener("scroll", onScrollThrottled);
      removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
