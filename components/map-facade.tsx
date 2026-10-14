"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Brand } from "@/components/primitives";
import { track } from "@/lib/analytics";

export function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  const hasAddress = !siteConfig.address.includes("[CONFIRM");
  if (!hasAddress && process.env.NODE_ENV === "production") return null;
  if (loaded) {
    return (
      <iframe
        className="map-frame"
        title="Rehabify clinic on the map"
        src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
        loading="lazy"
      />
    );
  }
  return (
    <div className="map-placeholder on-night" data-dark>
      <Brand variant="ice" wordmark={false} size={40} />
      <p className="map-address">
        {hasAddress ? siteConfig.address : siteConfig.address}
      </p>
      {hasAddress ? (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              track("map_load");
              setLoaded(true);
            }}
          >
            Show map
          </button>
          <a
            className="text-link"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("directions_click")}
          >
            <MapPin size={16} aria-hidden="true" /> Get directions
          </a>
        </>
      ) : null}
    </div>
  );
}
