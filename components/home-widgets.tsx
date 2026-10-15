"use client";

import { useState } from "react";
import Link from "next/link";
import { goals } from "@/lib/styleguide-copy";
import { conditions } from "@/content/care-conditions";

export function GoalsTile() {
  const [selected, setSelected] = useState([true, true, false, false]);
  const count = selected.filter(Boolean).length;
  return (
    <>
      <div className="goals">
        {goals.map((goal, index) => (
          <button
            className="goal"
            key={goal}
            type="button"
            aria-pressed={selected[index]}
            onClick={() =>
              setSelected((previous) =>
                previous.map((value, i) => (i === index ? !value : value)),
              )
            }
          >
            <i />
            {goal}
            <small>example</small>
          </button>
        ))}
      </div>
      <div className="ring" role="status" aria-label="Example goal progress">
        <svg viewBox="0 0 54 54" aria-hidden="true">
          <circle className="bg" cx="27" cy="27" r="22" />
          <circle
            className="fg"
            cx="27"
            cy="27"
            r="22"
            strokeDasharray="138.2"
            strokeDashoffset={138.2 * (1 - count / goals.length)}
          />
        </svg>
        <span>
          <b>
            {count} of {goals.length}
          </b>{" "}
          goals reached
        </span>
      </div>
    </>
  );
}

const azGroups = [
  {
    title: "Pain and spine",
    match: ["/pain-and-spine/"],
  },
  {
    title: "Brain and nerves",
    match: ["/neuro-rehabilitation/"],
  },
  {
    title: "Joints and sport",
    match: ["/joints-and-sports/"],
  },
  {
    title: "Children and older adults",
    match: ["/childrens-rehabilitation/", "/older-adults/"],
  },
];

export function ConditionsAZ() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  let shown = 0;
  const groups = azGroups.map((group) => {
    const items = conditions.filter(
      (c) =>
        group.match.some((m) => c.href.startsWith(m)) &&
        c.name.toLowerCase().includes(q),
    );
    shown += items.length;
    return { ...group, items };
  });
  const mark = (name: string) => {
    if (!q) return name;
    const i = name.toLowerCase().indexOf(q);
    return (
      <>
        {name.slice(0, i)}
        <mark>{name.slice(i, i + q.length)}</mark>
        {name.slice(i + q.length)}
      </>
    );
  };
  return (
    <>
      <div className="az-top">
        <label className="search">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="search"
            placeholder="Try knee, stroke or sciatica"
            aria-label="Search conditions"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <span className="count">{shown} conditions</span>
      </div>
      <div className="az">
        {groups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.length ? (
                group.items.map((c) => (
                  <li key={c.name}>
                    <Link href={c.href}>
                      {mark(c.name)}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="empty">No match here</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
