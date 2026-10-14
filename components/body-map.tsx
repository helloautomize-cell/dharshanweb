"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { regions } from "@/lib/styleguide-copy";

const hotspots = [
  { label: "Head", region: 0, x: 50, y: 10 },
  { label: "Neck", region: 1, x: 50, y: 20 },
  { label: "Shoulder", region: 1, x: 65, y: 25 },
  { label: "Back", region: 2, x: 50, y: 37 },
  { label: "Hand", region: 3, x: 76, y: 62 },
  { label: "Hip", region: 4, x: 43, y: 53 },
  { label: "Knee", region: 4, x: 58, y: 74 },
  { label: "Ankle", region: 5, x: 41, y: 92 },
];
export function BodyMap() {
  const [selected, setSelected] = useState(2);
  const [back, setBack] = useState(false);
  const gradient = useId();
  const region = regions[selected];
  const marker = hotspots.find((spot) => spot.region === selected)!;
  return (
    <div className="body-map">
      <div className="body-visual on-night">
        <div
          className="body-view segmented"
          role="group"
          aria-label="Body view"
        >
          <button
            type="button"
            aria-pressed={!back}
            onClick={() => setBack(false)}
          >
            Front
          </button>
          <button
            type="button"
            aria-pressed={back}
            onClick={() => setBack(true)}
          >
            Back
          </button>
        </div>
        <div
          className="body-figure"
          role="group"
          aria-label={`${back ? "Back" : "Front"} body areas`}
        >
          <svg viewBox="0 0 200 400" aria-hidden="true">
            <defs>
              <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#315C7A" />
                <stop offset="1" stopColor="#1D405C" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke={`url(#${gradient})`}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M72 98 L54 182 L46 252" strokeWidth="20" />
              <path d="M128 98 L146 182 L154 252" strokeWidth="20" />
              <path d="M88 214 L84 300 L82 378" strokeWidth="28" />
              <path d="M112 214 L116 300 L118 378" strokeWidth="28" />
            </g>
            <g fill={`url(#${gradient})`}>
              <rect x="66" y="86" width="68" height="138" rx="30" />
              <rect x="92" y="62" width="16" height="30" rx="8" />
              <circle cx="100" cy="40" r="25" />
            </g>
            {back ? (
              <g fill="#D9EDF3" opacity=".7">
                {Array.from({ length: 10 }, (_, i) => (
                  <rect
                    key={i}
                    x="95"
                    y={96 + i * 10}
                    width="10"
                    height="5"
                    rx="2.5"
                  />
                ))}
              </g>
            ) : (
              <path
                d="M86 102 Q100 112 114 102 M100 112 V185"
                fill="none"
                stroke="#6D92AA"
                strokeWidth="2"
              />
            )}
            <circle
              className="mobile-marker"
              cx={(back ? 100 - marker.x : marker.x) * 2}
              cy={marker.y * 4}
              r="7"
              fill="#F2B48A"
            />
          </svg>
          {hotspots.map((spot) => (
            <button
              key={spot.label}
              type="button"
              className="hotspot"
              style={{
                left: `${back ? 100 - spot.x : spot.x}%`,
                top: `${spot.y}%`,
              }}
              aria-label={spot.label}
              aria-pressed={selected === spot.region}
              aria-controls="body-panel"
              onClick={() => setSelected(spot.region)}
            >
              <span />
              <span className="hotspot-label">{spot.label}</span>
            </button>
          ))}
        </div>
        <p className="body-selection">{region.name}</p>
      </div>
      <div className="body-info">
        <div
          className="region-chips"
          role="group"
          aria-label="Choose a body area"
        >
          {regions.map((item, index) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={selected === index}
              aria-controls="body-panel"
              onClick={() => setSelected(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          className="body-panel"
          id="body-panel"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3 className="h3">{region.name}</h3>
          <p className="muted">{region.description}</p>
          <div className="condition-links">
            {region.conditions.map((condition) => (
              <a key={condition} href={region.href}>
                {condition}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="text-link" href={region.href}>
            See all care
            <ArrowRight size={20} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
