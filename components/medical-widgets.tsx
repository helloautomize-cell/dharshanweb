"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Phone,
  MessageCircle,
  Mic,
  Video,
  Volume2,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { careGroups, serviceBadges } from "@/lib/service-badges";
import { layers } from "@/lib/design-tokens";
import { siteConfig } from "@/lib/site-config";

export function Goniometer() {
  const needle = useRef<SVGGElement>(null);
  const value = useRef<HTMLOutputElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = 0;
    let visible = false;
    const element = needle.current?.closest(".goniometer");
    const stop = () => {
      cancelAnimationFrame(frame);
      started = 0;
    };
    const render = (angle: number) => {
      needle.current?.setAttribute(
        "transform",
        `rotate(${angle - 90} 100 100)`,
      );
      if (value.current) value.current.textContent = `${Math.round(angle)}°`;
    };
    const tick = (time: number) => {
      if (
        !visible ||
        reduce.matches ||
        element?.closest('[data-reduce-motion="true"]') ||
        document.hidden
      ) {
        render(95);
        stop();
        return;
      }
      started ||= time;
      const progress = (time - started) / 2400;
      const angle =
        progress < 0.5
          ? 120 * (1 - (1 - progress * 2) ** 3)
          : 120 - 25 * Math.min(1, (progress - 0.5) * 2);
      render(angle);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      stop();
      if (visible && !reduce.matches) frame = requestAnimationFrame(tick);
      else render(95);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        start();
      },
      { threshold: 0.3 },
    );
    if (element) observer.observe(element);
    const review =
      element?.closest("[data-reduce-motion]") ??
      element?.closest(".review-root");
    const mutation = new MutationObserver(start);
    if (review)
      mutation.observe(review, {
        attributes: true,
        attributeFilter: ["data-reduce-motion"],
      });
    reduce.addEventListener("change", start);
    return () => {
      stop();
      observer.disconnect();
      mutation.disconnect();
      reduce.removeEventListener("change", start);
    };
  }, []);
  return (
    <div className="goniometer on-night">
      <div className="widget-title">
        Knee flexion<span>Example</span>
      </div>
      <svg viewBox="0 0 200 125" aria-hidden="true">
        <path
          d="M25 100 A75 75 0 0 1 175 100"
          fill="none"
          stroke="#31516F"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M25 100 A75 75 0 0 1 154 48"
          fill="none"
          stroke="#6FD0E6"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {Array.from({ length: 7 }, (_, index) => (
          <path
            key={index}
            d="M100 13 V21"
            transform={`rotate(${index * 30 - 90} 100 100)`}
            stroke="#A9BFCB"
            strokeWidth="2"
          />
        ))}
        <g ref={needle} transform="rotate(5 100 100)">
          <path
            d="M100 100 V32"
            stroke="#F2B48A"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <circle cx="100" cy="100" r="7" fill="#D9EDF3" />
      </svg>
      <output ref={value} className="degrees">
        95°
      </output>
      <p>Measured at each review</p>
    </div>
  );
}
export function BadgeCards() {
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <div className="badge-gallery" data-paused={paused ? "true" : undefined}>
        {careGroups.map((group, index) => (
          <article className={`badge-card badge-${index}`} key={group.badge}>
            <div className="badge-window">
              <span className="badge-blob" aria-hidden="true" />
              <span className="badge-blob second" aria-hidden="true" />
              <Image
                src={`/images/icons/services/${group.badge}.webp`}
                alt=""
                width={112}
                height={112}
                unoptimized
              />
            </div>
            <div className="badge-body">
              <h3 className="h3">
                <Link className="stretched-link" href={group.href}>
                  {group.title}
                </Link>
              </h3>
              <p>{group.line}</p>
              <span className="badge-arrow" aria-hidden="true">
                <ArrowRight size={20} strokeWidth={1.75} />
              </span>
            </div>
          </article>
        ))}
      </div>
      <button
        className="pause-control"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? (
          <Play size={18} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Pause size={18} strokeWidth={1.75} aria-hidden="true" />
        )}
        {paused ? "Resume motion" : "Pause motion"}
      </button>
    </div>
  );
}
export function BadgeGallery() {
  const slugs = [
    ...Object.values(serviceBadges),
    "doctor-male",
    "doctor-female",
  ];
  return (
    <div className="badge-specimens">
      {["night", "paper"].map((surface) => (
        <div
          key={surface}
          className={`badge-strip ${surface === "night" ? "on-night" : ""}`}
        >
          <span className="specimen-label">
            {surface === "night" ? "On night" : "On paper"}
          </span>
          {([256, 112, 64] as const).map((size) => (
            <div className="badge-row" key={size}>
              <span className="specimen-label">{size}px</span>
              <div className="badge-row-items">
                {slugs.map((slug) => (
                  <Image
                    key={slug}
                    src={`/images/icons/services/${slug}${size === 256 ? "" : "@256"}.webp`}
                    alt={`Illustration: ${slug} service badge`}
                    width={size}
                    height={size}
                    unoptimized
                    title={slug}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
export function VideoCard() {
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [sound, setSound] = useState(true);
  return (
    <article className="stack-card">
      <div className="stack-copy">
        <h3 className="h2">
          Start from <span className="serif">home.</span>
        </h3>
        <p className="lede">
          Share your reports, show the doctor how you move on camera and leave
          with a first plan.
        </p>
        <p className="example-label">Example video consultation</p>
        <Link className="text-link" href="/video-consultation/">
          Video consult
          <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
      <div className="video-example">
        <Image
          src="/images/doctors/dr-dharshan-video.jpg"
          alt="Illustration: Dr. Dharshan N A explaining during a video consultation"
          fill
          sizes="(max-width: 767px) 90vw, 600px"
        />
        <div className="video-controls">
          {[
            [mic, setMic, Mic, "Microphone"],
            [camera, setCamera, Video, "Camera"],
            [sound, setSound, Volume2, "Sound"],
          ].map(([active, setActive, Icon, label]) => {
            const Glyph = Icon as typeof Mic;
            const setter = setActive as (value: boolean) => void;
            return (
              <button
                key={label as string}
                type="button"
                aria-label={`${label} (example)`}
                aria-pressed={active as boolean}
                onClick={() => setter(!active)}
              >
                <Glyph size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}
export function SpineNavigator() {
  return (
    <nav
      className="spine-demo"
      aria-label="Spine navigation example"
      style={{ zIndex: layers.controls }}
    >
      {[
        ["C1", "#styleguide", "Rehab that moves with you"],
        ["C2", "#tokens", "Design tokens"],
        ["T1", "#body-map", "Where does it hurt?"],
        ["L1", "#badges", "Care for pain, nerves and movement"],
        ["S1", "#doctors", "Meet your doctors"],
      ].map(([vertebra, href, label], index) => (
        <Link
          key={vertebra}
          href={href}
          className={index === 0 ? "current" : ""}
          aria-label={`${vertebra}: ${label}`}
        >
          <span className="vertebra" />
          <span className="vertebra-label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
export function MobileDock() {
  return (
    <div className="phone-frame">
      <p className="h3">A rehab doctor, in clinic or by video.</p>
      <nav className="dock-demo" aria-label="Mobile booking dock">
        <Link href={siteConfig.phoneHref}>
          <Phone size={20} strokeWidth={1.75} aria-hidden="true" />
          Call
        </Link>
        <Link className="dock-book" href="/contact/#book">
          <CalendarDays size={20} strokeWidth={1.75} aria-hidden="true" />
          Book
        </Link>
        <Link href={siteConfig.whatsapp}>
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
          WhatsApp
        </Link>
      </nav>
    </div>
  );
}
