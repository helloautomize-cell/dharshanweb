"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/icons";

export function GuideShare({ title, url }: { title: string; url: string }) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied");
    } catch {
      setMessage(`Copy failed. The link is ${url}`);
    }
    timer.current = setTimeout(() => setMessage(""), 1800);
  }
  return (
    <>
      <div className="guide-share-buttons">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title}, a guide from Rehabify: ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share this guide on WhatsApp"
        >
          <Icon name="whatsapp" size={18} />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link to this guide"
        >
          <Icon name="link" size={18} />
          <span>Copy link</span>
        </button>
      </div>
      <div
        role="status"
        aria-live="polite"
        className={`guide-toast${message ? " is-visible" : ""}`}
      >
        {message}
      </div>
    </>
  );
}
export function GuidePrint() {
  return (
    <button
      type="button"
      className="guide-print"
      onClick={() => window.print()}
    >
      <Icon name="printer" size={16} />
      Print the checklist
    </button>
  );
}
