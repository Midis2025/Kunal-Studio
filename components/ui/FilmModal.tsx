"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "@/components/motion/SmoothScroll";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export type ModalFilm = { id: string; title: string; subtitle?: string };

/** Full-screen cinema player: letterboxed 16:9, Esc / close button, focus kept inside. */
export default function FilmModal({ film, onClose }: { film: ModalFilm | null; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!film) return;
    opener.current = document.activeElement;
    lockScroll(true);
    if (root.current && !prefersReducedMotion()) {
      gsap.fromTo(root.current, { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" });
    }
    root.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        root.current?.querySelector<HTMLElement>("[data-close]")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      (opener.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [film, onClose]);

  if (!film || typeof document === "undefined") return null;
  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Film: ${film.title}`}
      className="fixed inset-0 z-[110] flex flex-col bg-[#070605] text-ivory"
      data-lenis-prevent
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-[var(--gutter)]">
        <p className="label flex items-center gap-3 text-ivory/70">
          <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d24a3a]" />
          Now playing
        </p>
        <button data-close type="button" onClick={onClose} className="label flex h-11 items-center gap-2 px-3 hover:text-stone">
          Close <span aria-hidden className="text-lg leading-none">×</span>
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center px-[var(--gap)]" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="aspect-video w-full max-w-[min(100%,calc((100svh-9rem)*16/9))] bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={film.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
      <div className="shrink-0 px-[var(--gutter)] pb-5 pt-3 text-center">
        <p className="font-serif text-xl md:text-2xl">{film.title}</p>
        {film.subtitle && <p className="label mt-1 text-ivory/60">{film.subtitle}</p>}
      </div>
    </div>,
    document.body,
  );
}
