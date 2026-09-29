"use client";

import { useRef } from "react";
import Pic from "@/components/ui/Pic";
import { gsap, useGsap } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

export type Fragment = { p: Photo; caption: string };

/**
 * Vertical scroll becomes horizontal travel on desktop (pinned). On touch and
 * reduced-motion it's a plain, swipeable, keyboard-scrollable strip — no hijacking.
 */
export default function HorizontalGallery({ items }: { items: Fragment[] }) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const viewport = el.querySelector<HTMLElement>("[data-viewport]")!;
        const track = el.querySelector<HTMLElement>("[data-track]")!;
        viewport.style.overflowX = "hidden";
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-drift]", el).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        gsap.to(el.querySelector("[data-progress]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        return () => {
          viewport.style.overflowX = "";
        };
      });
      return () => mm.revert();
    },
    root,
  );

  return (
    <section ref={root} data-theme="dark" className="relative overflow-hidden bg-night text-ivory grain" aria-labelledby="fragments-title">
      <div
        data-viewport
        className="no-scrollbar flex min-h-svh snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain lg:snap-none"
        tabIndex={0}
        role="region"
        aria-label="Fragments of Forever — a horizontal gallery. Scroll or swipe sideways."
        data-cursor="drag"
      >
        <div data-track className="flex h-svh shrink-0 items-center gap-[var(--gap)] px-[var(--gap)] will-change-transform">
          <div className="mr-[calc(var(--gutter)-var(--gap))] flex h-[64svh] w-[82vw] shrink-0 snap-start flex-col justify-between pl-[calc(var(--gutter)-var(--gap))] sm:w-[60vw] lg:h-[76vh] lg:w-[40vw]">
            <p className="label text-ivory/60">Fragments</p>
            <div>
              <h2 id="fragments-title" className="font-serif text-[clamp(2.6rem,11vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.03em] lg:text-[clamp(3rem,5.2vw,6.5rem)]">
                Fragments
                <br />
                <em className="normal-case text-stone">of forever</em>
              </h2>
              <p className="mt-8 max-w-sm text-ivory/70">
                Not the whole day — the pieces of it that stay with you. The breath before the first look, the laugh during the vows,
                the last dance under warm light.
              </p>
            </div>
            <p className="label flex items-center gap-3 text-ivory/60">
              <span className="lg:hidden">Swipe</span>
              <span className="hidden lg:inline">Keep scrolling</span>
              <span aria-hidden>→</span>
            </p>
          </div>

          {items.map((it) => (
            // One shared height for every frame — widths follow each photograph's own ratio.
            <figure key={it.p.src} className="relative h-[64svh] shrink-0 snap-center overflow-hidden lg:h-[76vh]" style={{ aspectRatio: `${it.p.w} / ${it.p.h}` }}>
              <div data-drift className="absolute inset-y-0 -inset-x-[7%]">
                <Pic p={it.p} fill sizes="(min-width: 1024px) 60vw, 90vw" className="h-full w-full" />
              </div>
              <figcaption className="label pointer-events-none absolute inset-x-0 bottom-0 flex gap-3 bg-gradient-to-t from-night/70 to-transparent px-4 pb-4 pt-10 text-ivory/90">
                {it.caption}
              </figcaption>
            </figure>
          ))}

          <div className="ml-[calc(var(--gutter)-var(--gap))] flex w-[70vw] shrink-0 snap-center items-center pr-[var(--gutter)] sm:w-[40vw] lg:w-[26vw]">
            <p className="font-serif t-h3 italic text-stone">…and everything in between.</p>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-ivory/15 lg:block">
        <div data-progress className="h-full origin-left scale-x-0 bg-ivory/70" />
      </div>
    </section>
  );
}
