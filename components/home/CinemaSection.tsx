"use client";

import { useEffect, useRef, useState } from "react";
import { TLink } from "@/components/motion/PageTransition";
import Pic from "@/components/ui/Pic";
import type { Photo } from "@/lib/photos";

/**
 * Full-screen film moment. A still poster always renders first; on capable
 * desktops (fine pointer, no reduced motion, no data-saver) a muted preview of
 * a real Studio Kunal film is lazily streamed in once the section approaches.
 */
export default function CinemaSection({ poster, filmId }: { poster: Photo; filmId: string }) {
  const root = useRef<HTMLElement>(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const capable =
      window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !conn?.saveData;
    if (!capable || !root.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/${filmId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${filmId}&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&start=8`;

  return (
    <section ref={root} data-theme="dark" className="relative h-svh min-h-[34rem] overflow-hidden bg-night text-ivory grain" aria-labelledby="cinema-title">
      <div className="absolute inset-x-0 -inset-y-[8%]" data-speed="0.1">
        <Pic p={poster} fill sizes="100vw" className="h-full w-full" />
      </div>
      {load && (
        <iframe
          title="Studio Kunal — film preview (muted)"
          src={src}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden
          onLoad={() => window.setTimeout(() => setVisible(true), 1800)}
          // Oversized so YouTube's title bar and controls fall outside the frame.
          className="pointer-events-none absolute left-1/2 top-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2 scale-[1.3] border-0 transition-opacity duration-[1500ms]"
          style={{ opacity: visible ? 1 : 0 }}
        />
      )}
      <div className="absolute inset-0 bg-night/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/30" />

      <TLink href="/films" data-cursor="play" className="group absolute inset-0 flex flex-col justify-between px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+2rem)] md:pb-14">
        <p className="label text-ivory/70">Cinematography</p>
        <div className="text-center">
          <h2 id="cinema-title" className="font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
            Stories
            <br />
            <em className="normal-case">in motion</em>
          </h2>
          <p className="mt-8 font-serif text-[clamp(1.2rem,2vw,1.7rem)] italic text-ivory/85" data-reveal="fade">
            Films made to bring you back.
          </p>
        </div>
        <div className="flex items-end justify-between gap-6">
          <span className="cta">
            Watch our films <span className="cta-arrow" aria-hidden>→</span>
          </span>
          <span className="label hidden text-ivory/60 sm:block">Highlight films · E-shoots · Ceremonies</span>
        </div>
      </TLink>
    </section>
  );
}
