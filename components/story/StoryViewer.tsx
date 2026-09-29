"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import Lightbox from "@/components/ui/Lightbox";
import type { Photo } from "@/lib/photos";

/**
 * Wraps a server-rendered photo essay. Any element with data-lb="<src>" opens
 * the lightbox on that frame (event delegation keeps the essay server-side).
 */
export default function StoryViewer({ frames, title, children }: { frames: Photo[]; title: string; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element).closest<HTMLElement>("[data-lb]");
    if (!el) return;
    const i = frames.findIndex((f) => f.src === el.dataset.lb);
    if (i >= 0) setIndex(i);
  };
  return (
    <div onClick={onClick}>
      {children}
      <Lightbox photos={frames} index={index} onClose={() => setIndex(null)} title={title} />
    </div>
  );
}
