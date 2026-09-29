"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ytPoster } from "@/data/films";

/**
 * A film "thumbnail" that behaves like a video editor's bin: hover (desktop)
 * and a muted preview starts playing inside the frame after a short beat;
 * click opens the full player. Touch devices just get the poster + play.
 */
export default function FilmCard({
  id,
  title,
  onPlay,
  ratio = "aspect-video",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  eager,
  className = "",
}: {
  id: string;
  title: string;
  onPlay: () => void;
  ratio?: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const [preview, setPreview] = useState(false);
  const [ready, setReady] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const start = () => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const canPreview = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches && !conn?.saveData;
    if (!canPreview) return;
    timer.current = window.setTimeout(() => setPreview(true), 450);
  };
  const stop = () => {
    window.clearTimeout(timer.current);
    setPreview(false);
    setReady(false);
  };

  return (
    <button
      type="button"
      onClick={onPlay}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      data-cursor="play"
      aria-label={`Play film: ${title}`}
      className={`viewfinder group relative block w-full overflow-hidden bg-night text-ivory ${ratio} ${className}`}
    >
      <Image
        src={ytPoster(id)}
        alt=""
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.04]"
      />
      {preview && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&start=12`}
          title=""
          tabIndex={-1}
          aria-hidden
          allow="autoplay; encrypted-media"
          onLoad={() => window.setTimeout(() => setReady(true), 900)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-night/20 transition-opacity duration-700 group-hover:opacity-60" />
      <span className="label absolute left-4 top-4 flex items-center gap-2 text-ivory/85 md:left-5 md:top-5">
        <span aria-hidden className={`h-1.5 w-1.5 rounded-full bg-[#d24a3a] ${ready ? "animate-pulse" : "opacity-0"}`} />
        {ready ? "Preview" : "Film"}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/80 backdrop-blur-[2px] transition-[transform,opacity] duration-700 group-hover:scale-110 md:h-24 md:w-24">
          <svg viewBox="0 0 24 24" aria-hidden className="ml-1 h-5 w-5 fill-current md:h-6 md:w-6">
            <path d="M7 4.5v15l12.5-7.5z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
