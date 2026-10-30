"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { Pause, Play } from "lucide-react";
import { altFor } from "@/lib/alt-text";

/* The two doctor portraits share one arch box and swap places right to left.
   The back pose is a single transform on the same box, so both photos stay
   equally sharp in front. Auto-swap pauses on hover, focus, a hidden tab and
   while the hero is out of view; any manual choice stops it until play. */

const SIZES = "(max-width: 899px) 70vw, 430px";
const SWAP_MS = 6000;

const doctors = [
  {
    src: "/images/doctors/dr-dharshan-hero.jpg",
    name: "Dr. Dharshan N\u00A0A",
    role: "Consultant physiatrist",
  },
  {
    src: "/images/doctors/dr-selina-hero.jpg",
    name: "Dr. Selina Kh",
    role: "Consultant physiatrist",
  },
];

const imgs = doctors.map(
  (d) =>
    getImageProps({
      src: d.src,
      alt: altFor(d.src.replace("/images/", "")),
      fill: true,
      sizes: SIZES,
    }).props,
);

export function HeroFan() {
  const [front, setFront] = useState(0);
  const [swapTo, setSwapTo] = useState<number | null>(null);
  const [stopped, setStopped] = useState(false);
  const [reduce, setReduce] = useState(
    () =>
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [ready, setReady] = useState(false);
  const [fading, setFading] = useState(false);
  const [swappedOnce, setSwappedOnce] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(
    () => typeof document !== "undefined" && document.hidden,
  );
  const [outOfView, setOutOfView] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const archRefs = useRef<(HTMLElement | null)[]>([]);
  const selinaRef = useRef<HTMLImageElement>(null);
  const busyRef = useRef(false);

  const doSwap = useCallback(
    (next: number) => {
      if (busyRef.current) return;
      if (reduce) {
        busyRef.current = true;
        setFading(true);
        window.setTimeout(() => setFront(next), 130);
        window.setTimeout(() => {
          setFading(false);
          busyRef.current = false;
          setSwappedOnce(true);
        }, 300);
        return;
      }
      busyRef.current = true;
      setSwapTo(next);
    },
    [reduce],
  );

  // Commit the swap only after both keyframe animations have ended.
  useEffect(() => {
    if (swapTo === null) return;
    const next = swapTo;
    let done = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      busyRef.current = false;
      setFront(next);
      setSwapTo(null);
      setSwappedOnce(true);
    };
    const onEnd = () => {
      done += 1;
      if (done >= 2) finish();
    };
    const els = archRefs.current.filter(Boolean) as HTMLElement[];
    els.forEach((el) => el.addEventListener("animationend", onEnd));
    const fallback = window.setTimeout(finish, 1200);
    return () => {
      els.forEach((el) => el.removeEventListener("animationend", onEnd));
      window.clearTimeout(fallback);
    };
  }, [swapTo]);

  // Readiness: first swap only after window load and the lazy image is in.
  // Environment: reduced motion, hidden tab, hero out of view.
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduce(mq.matches);
    mq.addEventListener("change", onMq);

    let selina = false;
    let loaded = false;
    const check = () => {
      if (selina && loaded) setReady(true);
    };
    if (document.readyState === "complete") loaded = true;
    else
      addEventListener(
        "load",
        () => {
          loaded = true;
          check();
        },
        { once: true },
      );
    const img = selinaRef.current;
    if (img) {
      if (img.complete && img.naturalWidth > 0) selina = true;
      else {
        const mark = () => {
          selina = true;
          check();
        };
        img.addEventListener("load", mark, { once: true });
        img.addEventListener("error", mark, { once: true });
      }
    } else selina = true;
    check();

    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);

    const hero = visualRef.current?.closest("section") ?? visualRef.current;
    let io: IntersectionObserver | null = null;
    if (hero) {
      io = new IntersectionObserver(([e]) => setOutOfView(!e.isIntersecting), {
        threshold: 0.25,
      });
      io.observe(hero);
    }
    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  const busy = swapTo !== null || fading;
  const blocked = hover || focused || hidden || outOfView;
  const canAuto = ready && !stopped && !reduce && !busy && !blocked;

  useEffect(() => {
    if (!canAuto) return;
    const t = window.setTimeout(() => doSwap(front === 0 ? 1 : 0), SWAP_MS);
    return () => window.clearTimeout(t);
  }, [canAuto, front, doSwap]);

  const choose = (i: number) => {
    setStopped(true);
    if (i === front || swapTo !== null) return;
    doSwap(i);
  };

  const cls = (i: number) => {
    const base = `arch fan-${i === 0 ? "a" : "b"}`;
    if (swapTo !== null)
      return `${base} ${swapTo === i ? "anim-fwd" : "anim-back"}`;
    return `${base} ${front === i ? "is-front" : "is-back"}`;
  };

  return (
    <div
      className="visual"
      ref={visualRef}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setFocused(false);
      }}
    >
      <div
        className={`fan${fading ? " is-fading" : ""}`}
        data-swapped={swappedOnce ? "" : undefined}
      >
        <div className="fan-box">
          {doctors.map((d, i) => {
            const isBack = swapTo === null && front !== i;
            return (
              <div
                key={d.src}
                ref={(el) => {
                  archRefs.current[i] = el;
                }}
                className={cls(i)}
                role={isBack ? "button" : undefined}
                tabIndex={isBack ? 0 : undefined}
                aria-label={isBack ? `Show ${d.name}` : undefined}
                onClick={isBack ? () => choose(i) : undefined}
                onKeyDown={
                  isBack
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          choose(i);
                        }
                      }
                    : undefined
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- getImageProps supplies the optimizer srcset */}
                <img
                  {...imgs[i]}
                  alt={imgs[i].alt}
                  ref={i === 1 ? selinaRef : undefined}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
                <div className="who">
                  <b>{d.name}</b>
                  <span>{d.role}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="fan-ctl" role="group" aria-label="Doctor photos">
          {doctors.map((d, i) => (
            <button
              key={d.src}
              type="button"
              className="fan-dot"
              aria-label={`Show ${d.name}`}
              aria-pressed={front === i}
              onClick={() => choose(i)}
            />
          ))}
          <button
            type="button"
            className="fan-pp"
            aria-label={stopped ? "Play doctor photos" : "Pause doctor photos"}
            onClick={() => setStopped((s) => !s)}
          >
            {stopped ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
