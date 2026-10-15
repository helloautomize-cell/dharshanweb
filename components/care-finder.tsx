"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import type { CareTopic } from "@/lib/care";

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return text;
  const escaped = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  return text
    .split(pattern)
    .map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

export function CareFinder({ topics }: { topics: CareTopic[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const router = useRouter();
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const popular = [
    "back-pain",
    "stroke",
    "shoulder-pain",
    "knee-pain",
    "cerebral-palsy",
  ];
  const matches = terms.length
    ? topics
        .map((topic) => {
          const title = topic.title.toLowerCase();
          const keywords = topic.keywords.join(" ").toLowerCase();
          const area = topic.area.toLowerCase();
          const score = terms.every((term) =>
            `${title} ${keywords} ${area}`.includes(term),
          )
            ? terms.reduce(
                (total, term) =>
                  total +
                  (title.includes(term)
                    ? 100
                    : keywords.includes(term)
                      ? 10
                      : 1),
                0,
              )
            : 0;
          return { topic, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.topic)
    : popular.map((slug) =>
        topics.find((topic) => topic.href.endsWith(`/${slug}/`))!,
      );
  const results = matches.slice(0, 5);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (
        event.key !== "/" ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.defaultPrevented
      )
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest(
          "input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']",
        )
      )
        return;
      event.preventDefault();
      input.current?.focus();
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  return (
    <div
      className="care-finder"
      onKeyDown={(event) => {
        if (
          (event.key === "ArrowDown" || event.key === "ArrowUp") &&
          results.length
        ) {
          event.preventDefault();
          const next =
            selected < 0
              ? event.key === "ArrowDown"
                ? 0
                : results.length - 1
              : (selected +
                  (event.key === "ArrowDown" ? 1 : -1) +
                  results.length) %
                results.length;
          setSelected(next);
          rows.current[next]?.focus();
        } else if (event.key === "Escape") {
          setSelected(-1);
          input.current?.focus();
        } else if (
          event.key === "Enter" &&
          event.target === input.current &&
          results.length
        ) {
          event.preventDefault();
          router.push(results[Math.max(0, selected)].href);
        }
      }}
    >
      <label className="care-kicker" htmlFor="care-search">
        Find your care
      </label>
      <div className="care-search-field">
        <Icon name="search" size={20} />
        <input
          ref={input}
          id="care-search"
          type="search"
          value={query}
          placeholder="A condition, symptom or treatment"
          aria-controls="care-search-results"
          aria-describedby="care-search-count"
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(-1);
          }}
        />
        <kbd aria-hidden="true">/</kbd>
      </div>
      <div
        className="care-search-results"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="care-search-count" id="care-search-count">
          {terms.length
            ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}`
            : "Often looked for"}
        </p>
        <ul id="care-search-results">
          {results.map((topic, index) => (
            <li key={topic.href}>
              <Link
                href={topic.href}
                ref={(node) => {
                  rows.current[index] = node;
                }}
                data-selected={selected === index || undefined}
                onFocus={() => setSelected(index)}
              >
                <span>
                  <strong>
                    <Highlight text={topic.title} query={query} />
                  </strong>
                  <small>{topic.summary}</small>
                </span>
                <span className="care-result-area">{topic.area}</span>
              </Link>
            </li>
          ))}
        </ul>
        {!results.length && (
          <p className="care-search-empty">
            Nothing matches &quot;{query.trim()}&quot; yet. Try{" "}
            <Link href="#where">where it hurts</Link>, or{" "}
            <Link href="#book">ask us</Link> and we will point you to the right
            doctor.
          </p>
        )}
      </div>
    </div>
  );
}
