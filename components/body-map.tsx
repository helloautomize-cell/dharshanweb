"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { regions } from "@/lib/styleguide-copy";
import type { CareRegion } from "@/lib/care";

/* v3 body map: AI body illustrations on the night panel, front and back views
   crossfaded, with an SVG hotspot overlay (viewBox 1600 x 2400) laid exactly
   over the 2:3 figure so the dots scale with the image. Buttons carry the
   tap targets and labels; the SVG carries the dots, rings and region glow. */
type Spot = {
  region: number;
  x: number;
  y: number;
  label: string;
  glow?: [number, number];
};

const spotsFront: Spot[] = [
  { region: 0, x: 800, y: 220, label: "Head", glow: [210, 190] },
  { region: 1, x: 800, y: 405, label: "Neck", glow: [160, 110] },
  { region: 1, x: 575, y: 460, label: "Left shoulder", glow: [230, 180] },
  { region: 1, x: 1025, y: 460, label: "Right shoulder", glow: [230, 180] },
  { region: 2, x: 800, y: 700, label: "Mid back" },
  { region: 2, x: 800, y: 875, label: "Lower back" },
  { region: 3, x: 525, y: 805, label: "Left elbow" },
  { region: 3, x: 1075, y: 805, label: "Right elbow" },
  { region: 3, x: 360, y: 1092, label: "Left wrist", glow: [170, 140] },
  { region: 3, x: 1155, y: 1100, label: "Right wrist", glow: [170, 140] },
  { region: 4, x: 681, y: 1070, label: "Left hip", glow: [220, 170] },
  { region: 4, x: 919, y: 1070, label: "Right hip", glow: [220, 170] },
  { region: 4, x: 680, y: 1500, label: "Left knee" },
  { region: 4, x: 920, y: 1500, label: "Right knee" },
  { region: 5, x: 685, y: 2065, label: "Left ankle" },
  { region: 5, x: 915, y: 2065, label: "Right ankle" },
];
const spotsBack: Spot[] = [
  { region: 0, x: 800, y: 220, label: "Head", glow: [210, 190] },
  { region: 1, x: 800, y: 405, label: "Neck", glow: [160, 110] },
  { region: 1, x: 580, y: 460, label: "Left shoulder", glow: [230, 180] },
  { region: 1, x: 1020, y: 460, label: "Right shoulder", glow: [230, 180] },
  { region: 2, x: 800, y: 560, label: "Upper back" },
  { region: 2, x: 800, y: 735, label: "Mid back" },
  { region: 2, x: 800, y: 910, label: "Lower back" },
  { region: 2, x: 800, y: 1185, label: "Sacrum" },
  { region: 3, x: 530, y: 805, label: "Left elbow" },
  { region: 3, x: 1070, y: 805, label: "Right elbow" },
  { region: 3, x: 370, y: 1095, label: "Left wrist", glow: [170, 140] },
  { region: 3, x: 1150, y: 1095, label: "Right wrist", glow: [170, 140] },
  { region: 4, x: 681, y: 1070, label: "Left hip", glow: [220, 170] },
  { region: 4, x: 919, y: 1070, label: "Right hip", glow: [220, 170] },
  { region: 4, x: 680, y: 1500, label: "Left knee" },
  { region: 4, x: 920, y: 1500, label: "Right knee" },
  { region: 5, x: 685, y: 2065, label: "Left ankle" },
  { region: 5, x: 915, y: 2065, label: "Right ankle" },
];
const spotSets = { front: spotsFront, back: spotsBack } as const;

const srcSet = (side: "front" | "back", format: "avif" | "webp") =>
  [600, 900, 1200, 1600]
    .map(
      (width) =>
        `/images/illustrations/body-${side}-${width}.${format} ${width}w`,
    )
    .join(", ");
const sizes = "(max-width: 640px) 280px, 360px";

function BodyFigurePicture({ side }: { side: "front" | "back" }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(side, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(side, "webp")} sizes={sizes} />
      <Image
        src={`/images/illustrations/body-${side}-1200.webp`}
        alt={
          side === "front"
            ? "Illustration: front view of the human body"
            : "Illustration: back view of the human body"
        }
        fill
        unoptimized
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export function CompactBodyMap({ careRegions }: { careRegions: CareRegion[] }) {
  const [selected, setSelected] = useState(2);
  const panelId = useId();
  return (
    <div className="care-body-map on-night" data-dark>
      <div className="care-body-visual">
        <div
          className="care-body-figure"
          role="group"
          aria-label="Choose a body area on the front view"
        >
          <div className="fig-pic on">
            <BodyFigurePicture side="front" />
          </div>
          {careRegions.map((region, index) => (
            <button
              key={region.name}
              className="care-body-hotspot"
              type="button"
              style={{ left: `${region.x}%`, top: `${region.y}%` }}
              aria-label={region.name}
              aria-pressed={selected === index}
              aria-controls={panelId}
              onClick={() => setSelected(index)}
            >
              <span className="care-body-dot" aria-hidden="true" />
              <span className="care-body-label" aria-hidden="true">
                {region.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="care-body-content">
        <p className="care-kicker">Not sure which area?</p>
        <h2>
          Start from where it <span className="serif">hurts.</span>
        </h2>
        <p>
          Choose a part of the body. We show the care that most often fits. Your
          doctor confirms it at the first visit.
        </p>
        <div
          className="care-region-pills"
          role="group"
          aria-label="Choose a body area"
        >
          {careRegions.map((region, index) => (
            <button
              key={region.name}
              type="button"
              aria-pressed={selected === index}
              aria-controls={panelId}
              onClick={() => setSelected(index)}
            >
              {region.name}
            </button>
          ))}
        </div>
        <div id={panelId} className="care-region-results" aria-live="polite">
          {careRegions.map((region, index) => (
            <ul
              key={region.name}
              hidden={selected !== index}
              aria-label={`Care for ${region.name.toLowerCase()}`}
            >
              {region.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span>
                      <strong>{link.title}</strong>
                      <small>{link.line}</small>
                    </span>
                    <ArrowRight
                      size={20}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="care-body-note">
          Pain in more than one place? That is common.{" "}
          <Link href="#book">Book one consultation</Link> and we look at all of
          it.
        </p>
      </div>
    </div>
  );
}

export function BodyMap() {
  const [selected, setSelected] = useState(2);
  const [view, setView] = useState<"front" | "back">("front");
  const blur = `bm-glow-${useId().replace(/:/g, "")}`;
  const region = regions[selected];
  const pick = (i: number) => setSelected(i);
  return (
    <div className="bm">
      <div className="bm-l" data-dark>
        <span className="lbl mono">
          Selected<b>{region.name}</b>
        </span>
        <div className="seg body-view" role="group" aria-label="Body view">
          {(["front", "back"] as const).map((side) => (
            <button
              key={side}
              type="button"
              aria-pressed={view === side}
              onClick={() => setView(side)}
            >
              {side === "front" ? "Front" : "Back"}
            </button>
          ))}
        </div>
        <div
          className="fig body-figure"
          aria-label={`${view === "front" ? "Front" : "Back"} body areas`}
          role="group"
        >
          <div className="fig-inner">
            {(["front", "back"] as const).map((side) => (
              <div
                key={side}
                className={`fig-pic${view === side ? " on" : ""}`}
                aria-hidden={view !== side}
              >
                <BodyFigurePicture side={side} />
              </div>
            ))}
            <svg
              className="fig-overlay"
              viewBox="0 0 1600 2400"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <filter id={blur} x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="48" />
                </filter>
              </defs>
              {(["front", "back"] as const).map((side) => (
                <g key={side} className={`spots${view === side ? " on" : ""}`}>
                  {spotSets[side].map((spot) => (
                    <g
                      key={spot.label}
                      className="spot"
                      data-on={spot.region === selected || undefined}
                    >
                      {spot.region === selected && (
                        <ellipse
                          className="spot-glow"
                          cx={spot.x}
                          cy={spot.y}
                          rx={spot.glow?.[0] ?? 170}
                          ry={spot.glow?.[1] ?? 140}
                          filter={`url(#${blur})`}
                        />
                      )}
                      <circle
                        className="spot-ring"
                        cx={spot.x}
                        cy={spot.y}
                        r="44"
                      />
                      <circle
                        className="spot-dot"
                        cx={spot.x}
                        cy={spot.y}
                        r="30"
                      />
                    </g>
                  ))}
                </g>
              ))}
            </svg>
            {spotSets[view].map((spot) => (
              <button
                key={spot.label}
                type="button"
                className="hot"
                data-pos={
                  spot.x === 800 ? "top" : spot.x < 800 ? "left" : "right"
                }
                style={{ left: `${spot.x / 16}%`, top: `${spot.y / 24}%` }}
                aria-label={spot.label}
                aria-pressed={spot.region === selected}
                aria-controls="body-panel"
                onClick={() => pick(spot.region)}
              >
                <span className="hot-label" aria-hidden="true">
                  {spot.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bm-r">
        <div className="regs" role="group" aria-label="Choose a body area">
          {regions.map((item, index) => (
            <button
              type="button"
              className="reg"
              key={item.name}
              aria-pressed={selected === index}
              aria-controls="body-panel"
              onClick={() => pick(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          className="bm-panel"
          id="body-panel"
          key={`${selected}-${view}`}
          aria-live="polite"
        >
          <span className="kicker">{region.name}</span>
          <h3>{region.name}</h3>
          <p>{region.description}</p>
          <ul>
            {region.conditions.map((condition) => (
              <li key={condition}>
                <Link href={region.href}>
                  {condition}
                  <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link className="more" href={region.href}>
            See care for {region.name.toLowerCase()}
            <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
