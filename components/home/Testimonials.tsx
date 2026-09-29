"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type TouchEvent } from "react";
import { TLink } from "@/components/motion/PageTransition";
import { prefersReducedMotion } from "@/lib/gsap";

/** Imagery that genuinely belongs to the couple: their story photos or their own film's poster. */
export type VoiceImage = { src: string; alt: string; blur?: string; pos?: string };
export type Voice = { couple: string; quote: string; context?: string; image?: VoiceImage; href?: string };

const DWELL = 8000;
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const initials = (couple: string) =>
  couple
    .split("&")
    .map((s) => s.trim()[0])
    .join("&");

/**
 * Kind words — a burgundy cinematic plate. The active couple's own photograph
 * sits behind their words as a duotone; couples without imagery get a large
 * initials watermark instead. Reviews advance gently on their own (paused on
 * hover, focus, off-screen, hidden tab, or reduced motion) and can always be
 * stepped through with the index, the arrows, the keyboard or a swipe.
 */
export default function Testimonials({ voices }: { voices: Voice[] }) {
  const root = useRef<HTMLElement>(null);
  const touch = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false); // hover / focus inside
  const [visible, setVisible] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);
  const count = voices.length;

  const go = useCallback((d: number) => setActive((i) => (i + d + count) % count), [count]);
  const running = playing && !held && visible && !reduced;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === "visible" && el.getBoundingClientRect().top < innerHeight);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(1), DWELL);
    return () => window.clearTimeout(t);
  }, [running, active, go]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(-1);
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touch.current === null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  const v = voices[active];

  return (
    <section
      ref={root}
      data-theme="dark"
      aria-labelledby="voices-title"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-wine text-ivory"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHeld(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      {/* Duotone backdrops */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {voices.map((x, i) => (
          <div
            key={x.couple}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-film)]"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {x.image ? (
              <Image
                src={x.image.src}
                alt=""
                fill
                sizes="100vw"
                quality={60}
                loading={i === 0 ? "eager" : "lazy"}
                className={`object-cover opacity-45 mix-blend-multiply grayscale ${i === active && !reduced ? "animate-[kenburns_16s_ease-out_forwards]" : ""}`}
                style={{ objectPosition: x.image.pos ?? "50% 35%" }}
              />
            ) : (
              <span className="absolute -bottom-[0.18em] -right-[0.04em] select-none font-serif text-[clamp(14rem,42vw,38rem)] italic leading-none tracking-[-0.06em] text-night/25">
                {initials(x.couple)}
              </span>
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-wine via-wine/80 to-wine/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-night/20" />
      </div>

      <div className="wrap grid min-h-[100svh] grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] gap-10 py-20 md:py-24 lg:grid-cols-12 lg:gap-x-[var(--gutter)] [&>*]:min-w-0">
        {/* Heading */}
        <div className="flex items-end justify-between gap-8 lg:col-span-12">
          <div>
            <p className="label flex items-center gap-3 text-ivory/70" data-reveal="fade">
              <span aria-hidden className="h-px w-8 bg-current opacity-50" />
              In their words
            </p>
            <h2 id="voices-title" className="mt-6 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[0.95] tracking-[-0.02em]" data-reveal="split">
              Kind words, <em className="text-stone">kept close.</em>
            </h2>
          </div>
          <TLink href="/experience#kind-words" className="cta hidden sm:inline-flex">
            Read every review <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
        </div>

        {/* Quote */}
        <div className="flex flex-col justify-center lg:col-span-8" onKeyDown={onKey}>
          <div className="grid">
            {voices.map((x, i) => (
              <figure
                key={x.couple}
                aria-hidden={i !== active}
                className="[grid-area:1/1] transition-[opacity,transform,filter] duration-[1000ms] ease-[var(--ease-film)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: `translateY(${i === active ? 0 : 20}px)`,
                  filter: i === active ? "blur(0)" : "blur(6px)",
                  visibility: i === active ? "visible" : "hidden",
                }}
              >
                <span aria-hidden className="block font-serif text-[clamp(5rem,9vw,9rem)] leading-[0.55] text-stone/80">
                  &ldquo;
                </span>
                <blockquote className="mt-4 max-w-[24ch] font-serif text-[clamp(1.9rem,4.6vw,4.6rem)] leading-[1.04] tracking-[-0.02em]">
                  {x.quote}
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <span className="font-serif text-2xl italic md:text-3xl">{x.couple}</span>
                  {x.context && <span className="label text-ivory/65">{x.context}</span>}
                  {x.href && (
                    <TLink href={x.href} className="cta text-stone" tabIndex={i === active ? undefined : -1}>
                      {x.href === "/films" ? "Watch their film" : "See their story"} <span className="cta-arrow" aria-hidden>→</span>
                    </TLink>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Index of couples */}
        <nav aria-label="Choose a review" className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-2 lg:self-center" onKeyDown={onKey}>
          <ol className="no-scrollbar -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-ivory/20 lg:px-0">
            {voices.map((x, i) => {
              const on = i === active;
              return (
                <li key={x.couple} className="shrink-0 lg:border-b lg:border-ivory/20">
                  <button
                    type="button"
                    aria-current={on}
                    onClick={() => setActive(i)}
                    className={`group flex min-h-11 w-full items-center gap-3 px-2 text-left transition-colors lg:gap-5 lg:py-3 ${on ? "text-ivory" : "text-ivory/55 hover:text-ivory"}`}
                  >
                    <span className={`whitespace-nowrap font-serif text-lg lg:text-xl ${on ? "italic" : ""}`}>{x.couple}</span>
                    <span aria-hidden className="relative ml-auto hidden h-px w-12 overflow-hidden bg-ivory/20 lg:block">
                      {on && (
                        <span
                          key={`${active}-${running}`}
                          className="absolute inset-y-0 left-0 bg-ivory"
                          style={{ width: running ? undefined : "100%", animation: running ? `grow ${DWELL}ms linear forwards` : undefined }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3 lg:col-span-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-colors hover:border-ivory hover:bg-ivory hover:text-wine"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-colors hover:border-ivory hover:bg-ivory hover:text-wine"
          >
            →
          </button>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
              className="label flex h-12 items-center px-3 text-ivory/70 hover:text-ivory"
            >
              {playing ? "Pause" : "Play"}
            </button>
          )}
          <span className="ml-auto" />
          <TLink href="/experience#kind-words" className="cta sm:hidden">
            All <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
        </div>
      </div>

      <p className="sr-only" aria-live={running ? "off" : "polite"}>
        Review {active + 1} of {count}, from {v.couple}
      </p>
    </section>
  );
}
