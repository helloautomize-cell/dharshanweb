"use client";

import { useState } from "react";
import Link from "next/link";

type Item = { label: string; href?: string };

/** Chip group: first `limit` items, then a "Show all (n)" toggle. */
export function ChipGroup({
  items,
  limit = 6,
}: {
  items: Item[];
  limit?: number;
}) {
  const [open, setOpen] = useState(false);
  const visible = open ? items : items.slice(0, limit);
  return (
    <ul role="list" className="chip-group">
      {visible.map((item) => (
        <li key={item.label}>
          {item.href ? (
            <Link className="chip" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="chip">{item.label}</span>
          )}
        </li>
      ))}
      {items.length > limit && (
        <li>
          <button
            type="button"
            className="chip chip-more"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Show less" : `Show all (${items.length})`}
          </button>
        </li>
      )}
    </ul>
  );
}
