"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { GuideCard } from "@/components/guide-card";
import { Icon } from "@/lib/icons";
import { filterGuides, guideTopics, type GuideCardData } from "@/lib/guides";
import { siteConfig } from "@/lib/site-config";

export function GuidesBrowser({
  guides,
  initialTopic = "all",
}: {
  guides: GuideCardData[];
  initialTopic?: string;
}) {
  const field = useRef<HTMLInputElement>(null);
  const [animated, setAnimated] = useState(false);
  const search = useSyncExternalStore(
    (notify) => {
      const handler = () => {
        setAnimated(true);
        notify();
      };
      window.addEventListener("popstate", handler);
      window.addEventListener("guides-filter", handler);
      return () => {
        window.removeEventListener("popstate", handler);
        window.removeEventListener("guides-filter", handler);
      };
    },
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const rawTopic = params.get("topic");
  const topic =
    rawTopic === "all"
      ? "all"
      : (guideTopics.find(
          (item) => item.id === rawTopic || item.slug === rawTopic,
        )?.id ?? initialTopic);
  const query = params.get("q") ?? "";
  const visible = filterGuides(guides, topic, query);
  function update(nextTopic: string, nextQuery: string) {
    const url = new URL(window.location.href);
    if (nextTopic === initialTopic) url.searchParams.delete("topic");
    else url.searchParams.set("topic", nextTopic);
    if (nextQuery) url.searchParams.set("q", nextQuery);
    else url.searchParams.delete("q");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
    window.dispatchEvent(new Event("guides-filter"));
  }
  useEffect(() => {
    const focus = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !target.closest("input,textarea,select,[contenteditable='true']")
      ) {
        event.preventDefault();
        field.current?.focus();
      }
    };
    window.addEventListener("keydown", focus);
    return () => window.removeEventListener("keydown", focus);
  }, []);
  return (
    <section
      id="browse"
      className="care-container guides-browse"
      aria-labelledby="guides-browse-heading"
    >
      <h2 id="guides-browse-heading" className="sr-only">
        Browse guides
      </h2>
      <div className="guides-toolbar">
        <div className="guides-search">
          <label className="sr-only" htmlFor="guides-search">
            Search guides
          </label>
          <Icon name="search" size={18} />
          <input
            id="guides-search"
            ref={field}
            type="search"
            value={query}
            placeholder="Search guides, e.g. stroke, cane, toddler"
            onChange={(event) => update(topic, event.target.value)}
          />
          <kbd aria-hidden="true">/</kbd>
        </div>
        <p className="guides-count" aria-live="polite" aria-atomic="true">
          {visible.length} {visible.length === 1 ? "guide" : "guides"}
        </p>
      </div>
      <div
        className="guides-topics"
        role="group"
        aria-label="Filter guides by topic"
      >
        {[{ id: "all", label: "All" }, ...guideTopics].map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={topic === item.id}
            onClick={() => update(item.id, query)}
          >
            {item.label}
            <span>
              {item.id === "all"
                ? guides.length
                : guides.filter((guide) => guide.topic === item.id).length}
            </span>
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="guides-grid" data-updated={animated || undefined}>
          {visible.map((guide) => (
            <GuideCard
              key={guide.slug}
              guide={guide}
              featured={guide.featured && topic === "all" && !query.trim()}
            />
          ))}
        </div>
      ) : (
        <div className="guides-empty">
          <h3>No guide on that yet.</h3>
          <p>
            Try another word, or{" "}
            <Link href={siteConfig.whatsapp}>ask us on WhatsApp</Link> and the
            doctor may write one.
          </p>
        </div>
      )}
    </section>
  );
}
