"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/lib/icons";
import {
  checklistMessage,
  defaultChecklist,
  parseChecklist,
  visitChecklist,
  visitSituations,
  type ChecklistState,
} from "@/lib/visit";

const storageKey = "rehabify-visit-checklist";
let snapshot = defaultChecklist;
let initialized = false;
const listeners = new Set<() => void>();
function getSnapshot() {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    try {
      snapshot = parseChecklist(localStorage.getItem(storageKey));
    } catch {
      snapshot = defaultChecklist;
    }
    if (new URLSearchParams(window.location.search).get("format") === "video")
      snapshot = { ...snapshot, format: "video" };
  }
  return snapshot;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const sync = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    snapshot = parseChecklist(event.newValue);
    for (const notify of listeners) notify();
  };
  window.addEventListener("storage", sync);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", sync);
  };
}
function update(state: ChecklistState) {
  snapshot = state;
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {}
  for (const notify of listeners) notify();
}

export function VisitChecklist() {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => defaultChecklist,
  );
  const items = visitChecklist(state);
  const ready = items.filter((item) => state.ticked.includes(item.id)).length;
  return (
    <section
      id="checklist"
      className="visit-checklist care-container"
      aria-labelledby="visit-checklist-heading"
    >
      <div className="visit-checklist-controls">
        <p className="care-kicker">Your checklist</p>
        <h2 id="visit-checklist-heading">
          Pack once, forget <span className="serif">nothing.</span>
        </h2>
        <p>
          Choose how you will be seen and anything that applies to you. The list
          updates as you go, and your ticks stay on this device.
        </p>
        <fieldset>
          <legend>How you will be seen</legend>
          <div className="visit-segments" data-format={state.format}>
            {(["clinic", "video"] as const).map((format) => (
              <button
                key={format}
                type="button"
                aria-pressed={state.format === format}
                aria-controls="visit-packing-list"
                onClick={() => update({ ...state, format })}
              >
                {format === "clinic" ? "Clinic visit" : "Video consult"}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Anything that applies?</legend>
          <div className="visit-situations">
            {visitSituations.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={state.situations.includes(item.id)}
                aria-controls="visit-packing-list"
                onClick={() =>
                  update({
                    ...state,
                    situations: state.situations.includes(item.id)
                      ? state.situations.filter((id) => id !== item.id)
                      : [...state.situations, item.id],
                  })
                }
              >
                <Icon name="plus" size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div
        id="visit-packing-list"
        className="visit-packing-card"
        aria-live="polite"
      >
        <div className="visit-packing-heading">
          <h3>
            For your{" "}
            {state.format === "clinic" ? "clinic visit" : "video consult"}
          </h3>
          <span>
            {ready} of {items.length} ready
          </span>
        </div>
        <div
          className="visit-progress"
          role="progressbar"
          aria-label="Checklist ready"
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-valuenow={ready}
        >
          <span style={{ transform: `scaleX(${ready / items.length})` }} />
        </div>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={item.situation ? "visit-added-item" : undefined}
            >
              <label>
                <span className="visit-checkbox">
                  <input
                    type="checkbox"
                    checked={state.ticked.includes(item.id)}
                    onChange={(event) =>
                      update({
                        ...state,
                        ticked: event.target.checked
                          ? [...state.ticked, item.id]
                          : state.ticked.filter((id) => id !== item.id),
                      })
                    }
                    aria-describedby={`visit-${item.id}-detail`}
                  />
                  <Icon name="check" size={18} />
                </span>
                <span className="visit-item-copy">
                  <span className="visit-item-title">{item.title}</span>
                  <span
                    className="visit-item-detail"
                    id={`visit-${item.id}-detail`}
                  >
                    {item.detail}
                  </span>
                </span>
                {item.situation && (
                  <span className="visit-item-tag">
                    {
                      visitSituations.find(
                        (situation) => situation.id === item.situation,
                      )?.tag
                    }
                  </span>
                )}
              </label>
            </li>
          ))}
        </ul>
        <div className="visit-packing-footer">
          <p>
            {ready === items.length
              ? "All packed. See you soon."
              : "Tick items as you pack. Send the list to whoever is coming with you."}
          </p>
          <div className="doctors-actions">
            <a
              className="btn care-guide visit-small-button"
              href={`https://wa.me/?text=${encodeURIComponent(checklistMessage(state))}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              Send on WhatsApp
            </a>
            <button
              type="button"
              className="btn care-guide visit-small-button"
              onClick={() => update({ ...state, ticked: [] })}
            >
              Clear ticks
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
