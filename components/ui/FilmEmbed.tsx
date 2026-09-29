"use client";

import { useState } from "react";
import FilmCard from "@/components/ui/FilmCard";

/**
 * Inline film: a hover-preview card until the visitor asks to play, then the
 * full player loads in place — no third-party player weight on page load.
 */
export default function FilmEmbed({ id, title, className = "", eager }: { id: string; title: string; className?: string; eager?: boolean }) {
  const [play, setPlay] = useState(false);
  if (!play) return <FilmCard id={id} title={title} onPlay={() => setPlay(true)} eager={eager} sizes="(min-width: 1024px) 90vw, 100vw" className={className} />;
  return (
    <div className={`relative aspect-video overflow-hidden bg-night ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
