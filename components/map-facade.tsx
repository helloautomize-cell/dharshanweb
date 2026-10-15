"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Brand } from "@/components/primitives";
import { track } from "@/lib/analytics";

export function MapFacade({
  visit,
}: {
  visit?: { address: string; mapsUrl: string };
}) {
  const [loaded, setLoaded] = useState(false);
  const address = visit ? visit.address : siteConfig.address;
  const hasAddress = !!address && !address.includes("[CONFIRM");
  const mapsUrl = visit?.mapsUrl ?? "";
  let safeMapsUrl = "";
  try {
    const url = new URL(mapsUrl);
    if (
      url.protocol === "https:" &&
      [
        "www.google.com",
        "google.com",
        "maps.google.com",
        "maps.app.goo.gl",
        "goo.gl",
      ].includes(url.hostname)
    )
      safeMapsUrl = url.href;
  } catch {}
  if (visit) {
    return (
      <div className="visit-map">
        {loaded && safeMapsUrl ? (
          <iframe
            title="Rehabify clinic on the map"
            src={
              safeMapsUrl.includes("/maps/embed")
                ? safeMapsUrl
                : `https://www.google.com/maps?q=${encodeURIComponent(address || safeMapsUrl)}&output=embed`
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <>
            <div className="visit-map-lines" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="visit-map-caption">
              <h3>Map and directions</h3>
              <p>
                {safeMapsUrl
                  ? address || "It loads only when you tap it."
                  : "The map appears here once the address is confirmed. It loads only when you tap it."}
              </p>
              {safeMapsUrl && (
                <button
                  type="button"
                  className="btn btn-invert"
                  onClick={() => {
                    track("map_load");
                    setLoaded(true);
                  }}
                >
                  Load map
                </button>
              )}
            </div>
          </>
        )}
        {safeMapsUrl && (
          <a
            className="visit-directions"
            href={safeMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("directions_click")}
          >
            Get directions <MapPin size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    );
  }
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
