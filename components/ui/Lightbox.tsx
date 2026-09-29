"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "@/components/motion/SmoothScroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

type Props = { photos: Photo[]; index: number | null; onClose: () => void; title?: string };

/**
 * Near-black fullscreen viewer. Uncropped images, ← → / Esc keys, swipe,
 * counter, caption and a thumbnail rail. Focus is trapped while open and
 * returned to the opener on close.
 */
export default function Lightbox({ photos, index, onClose, title }: Props) {
  const [i, setI] = useState(index ?? 0);
  const [prevIndex, setPrevIndex] = useState(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    if (index !== null) setI(index);
  }
  const [thumbs, setThumbs] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const n = photos.length;

  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (index === null) return;
    opener.current = document.activeElement;
    lockScroll(true);
    if (root.current && !prefersReducedMotion()) gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
    root.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      lockScroll(false);
      (opener.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && root.current) {
        const f = [...root.current.querySelectorAll<HTMLElement>("button")].filter((b) => b.offsetParent !== null);
        const k = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && k <= 0) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        } else if (!e.shiftKey && k === f.length - 1) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Keep the active thumbnail in view
  useEffect(() => {
    root.current?.querySelector(`[data-thumb="${i}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i, thumbs]);

  if (!open || typeof document === "undefined") return null;
  const p = photos[i];
  const neighbours = [photos[(i + 1) % n], photos[(i - 1 + n) % n]];

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — image viewer` : "Image viewer"}
      className="fixed inset-0 z-[110] flex flex-col bg-[#0a0908] text-ivory"
      data-lenis-prevent
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose();
        touch.current = null;
      }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-[var(--gutter)]">
        <p className="label tabular-nums text-ivory/70" aria-live="polite">
          {String(i + 1).padStart(2, "0")} <span className="text-ivory/35">/ {String(n).padStart(2, "0")}</span>
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setThumbs((t) => !t)} className="label h-11 px-3 text-ivory/70 hover:text-ivory" aria-pressed={thumbs}>
            {thumbs ? "Hide index" : "Index"}
          </button>
          <button data-close type="button" onClick={onClose} className="label flex h-11 items-center gap-2 px-3 hover:text-stone">
            Close <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div key={p.src} className="absolute inset-x-[var(--gutter)] inset-y-2 animate-[lbIn_0.6s_var(--ease-film)] md:inset-x-[8vw]">
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 84vw, 100vw"
            quality={85}
            className="object-contain"
            placeholder={p.blur as `data:image/${string}`}
            preload
          />
        </div>
        {/* Warm the next / previous frames */}
        <div aria-hidden className="sr-only">
          {neighbours.map((q) => (
            <Image key={q.src} src={q.src} alt="" width={q.w} height={q.h} sizes="(min-width: 768px) 84vw, 100vw" quality={85} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="group absolute inset-y-0 left-0 flex w-[18%] items-center justify-start pl-[var(--gutter)] md:w-[8vw]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 transition-colors group-hover:border-ivory group-focus-visible:border-ivory">
            ←
          </span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="group absolute inset-y-0 right-0 flex w-[18%] items-center justify-end pr-[var(--gutter)] md:w-[8vw]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 transition-colors group-hover:border-ivory group-focus-visible:border-ivory">
            →
          </span>
        </button>
      </div>

      <div className="shrink-0 px-[var(--gutter)] pb-4 pt-3">
        <p className="mx-auto max-w-2xl text-center text-sm text-ivory/70">{p.caption ?? p.alt}</p>
        {thumbs && (
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {photos.map((t, k) => (
              <button
                key={t.src}
                type="button"
                data-thumb={k}
                onClick={() => setI(k)}
                aria-label={`Show image ${k + 1}`}
                aria-current={k === i}
                className={`relative h-16 shrink-0 overflow-hidden transition-opacity ${k === i ? "opacity-100 outline outline-1 outline-offset-2 outline-ivory" : "opacity-45 hover:opacity-90"}`}
                style={{ aspectRatio: `${t.w} / ${t.h}` }}
              >
                <Image src={t.src} alt="" fill sizes="96px" quality={60} className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
