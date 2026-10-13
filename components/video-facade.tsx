"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { track } from "@/lib/analytics";

type Video = { id: string; title: string; channel: string; thumb: string };

export function VideoFacade({ video }: { video?: Video }) {
  const [playing, setPlaying] = useState(false);
  if (!video) return null;
  if (playing) {
    return (
      <figure className="video-frame">
        <iframe
          title={video.title}
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <figcaption>
          Video: {video.channel} - {video.title}
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="video-frame">
      <button
        type="button"
        className="video-thumb"
        aria-label={`Play video: ${video.title}`}
        onClick={() => {
          track("video_play");
          setPlaying(true);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumb} alt="" loading="lazy" />
        <span className="play-badge">
          <Play size={22} aria-hidden="true" />
        </span>
      </button>
      <figcaption>
        Video: {video.channel} - {video.title}
      </figcaption>
    </figure>
  );
}
