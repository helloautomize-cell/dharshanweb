"use client";

import { useState } from "react";
import Link from "next/link";
import { DirectoryNightPanel } from "@/components/directory-panel";
import { videoChoices, videoFitResults } from "@/lib/video";
import { Icon } from "@/lib/icons";
import { siteConfig } from "@/lib/site-config";

export function VideoFitChecker() {
  const [selected, setSelected] = useState({ index: 0, changed: false });
  const choice = videoChoices[selected.index];
  const result = videoFitResults[choice.type];
  const emergency = choice.type === "emergency";
  const clinic = choice.type === "clinic";
  return (
    <section
      id="fit"
      className="care-container video-fit"
      aria-labelledby="video-fit-heading"
    >
      <DirectoryNightPanel>
        <div className="doctors-chooser-intro">
          <p className="care-kicker">Is video right for you?</p>
          <h2 id="video-fit-heading">
            Tell us what you <span className="serif">need.</span>
          </h2>
          <p>
            Pick the closest match. We show whether a video consult suits it, or
            whether the clinic is the better first step.
          </p>
          <div
            className="care-region-pills"
            role="group"
            aria-label="What you need from a video consult"
          >
            {videoChoices.map((item, index) => (
              <button
                type="button"
                key={item.label}
                aria-pressed={selected.index === index}
                aria-controls="video-fit-result"
                onClick={() => setSelected({ index, changed: true })}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="doctors-chooser-results video-fit-results">
          <p className="care-kicker">Our suggestion</p>
          <div id="video-fit-result" aria-live="polite" aria-atomic="true">
            <div
              key={selected.index}
              className="video-fit-result"
              data-type={choice.type}
              data-changed={selected.changed || undefined}
            >
              <p className="video-fit-badge">{result.badge}</p>
              <h3>{result.heading}</h3>
              <p className="video-fit-text">{choice.text}</p>
              <div className="doctors-actions video-fit-actions">
                <Link
                  className={`btn ${emergency ? "video-emergency-button" : "btn-invert"}`}
                  href={
                    emergency
                      ? "tel:108"
                      : clinic
                        ? "/plan-your-visit/"
                        : "/contact/?format=video#book"
                  }
                >
                  {emergency
                    ? "Call 108"
                    : clinic
                      ? "Plan a clinic visit"
                      : "Book a video consult"}
                  {!emergency && <Icon name="arrow" size={18} />}
                </Link>
                <Link
                  className="btn btn-ghost"
                  href={
                    emergency
                      ? "tel:112"
                      : clinic
                        ? siteConfig.whatsapp
                        : "#how"
                  }
                >
                  {emergency
                    ? "Call 112"
                    : clinic
                      ? "Ask us on WhatsApp"
                      : "How it works"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DirectoryNightPanel>
    </section>
  );
}
