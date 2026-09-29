"use client";

import { useRef } from "react";
import Pic from "@/components/ui/Pic";
import { gsap, prefersReducedMotion, SplitText, useGsap } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

/**
 * Opening sequence. The photograph sits like a projected frame inside an ivory
 * letterbox; scrolling opens it to full-bleed while the statement parts and
 * dissolves — a camera pulling focus into the story.
 */
export default function HomeHero({ p }: { p: Photo }) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current!;
      const frame = el.querySelector<HTMLElement>("[data-frame]")!;
      const img = frame.querySelector("img");
      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      const chrome = el.querySelectorAll<HTMLElement>("[data-chrome]");
      const open = "inset(0svh 0vw 0svh 0vw)";
      if (prefersReducedMotion()) {
        gsap.set(frame, { clipPath: open });
        return;
      }
      const cs = getComputedStyle(el);
      const from = cs.getPropertyValue("--hero-from").trim();
      const hidden = cs.getPropertyValue("--hero-hidden").trim();

      // Intro — frame wipes up, statement rises line by line
      const h1 = el.querySelector("h1")!;
      const split = SplitText.create(h1, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(h1, { visibility: "visible" });
      // Wait for the first-visit shutter to open before the frame performs.
      const shutter = document.documentElement.classList.contains("intro") ? ((window as Window & { __introDelay?: number }).__introDelay ?? 0) : 0;
      const intro = gsap.timeline({ delay: 0.15 + shutter });
      intro
        .fromTo(frame, { clipPath: hidden }, { clipPath: from, duration: 1.5, ease: "expo.inOut" })
        .fromTo(img, { scale: 1.35 }, { scale: 1.18, duration: 2.2, ease: "expo.out" }, 0.2)
        .from(split.lines, { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.1 }, 0.9)
        .fromTo(chrome, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1.2);

      // Scroll — open the frame, part the words
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo(frame, { clipPath: from }, { clipPath: open, ease: "none", duration: 1, immediateRender: false }, 0)
        .to(img, { scale: 1, ease: "none", duration: 1 }, 0)
        .to(lines[0], { xPercent: -18, autoAlpha: 0, ease: "power1.in", duration: 0.7 }, 0.05)
        .to(lines[1], { xPercent: 18, autoAlpha: 0, ease: "power1.in", duration: 0.7 }, 0.05)
        .to(chrome, { autoAlpha: 0, duration: 0.25 }, 0)
        .to(el.querySelector("[data-veil]"), { opacity: 0.35, duration: 1 }, 0);

      return () => split.revert();
    },
    root,
  );

  return (
    <section
      ref={root}
      aria-label="Studio Kunal Photography — introduction"
      className="hero relative h-[210svh] bg-ivory"
      data-theme="light"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div data-frame data-theme="dark" data-hero className="absolute inset-0 overflow-hidden">
          <Pic p={p} fill preload sizes="100vw" quality={85} className="h-full w-full" imgClassName="will-change-transform" />
          <div data-veil className="absolute inset-0 bg-night opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/35 via-transparent to-night/45" />
          {/* Viewfinder: crop marks, record light, format — the frame is a camera */}
          <div
            data-chrome
            aria-hidden
            className="pointer-events-none absolute text-ivory"
            style={{ top: "var(--vf-t)", bottom: "var(--vf-b)", left: "var(--vf-x)", right: "var(--vf-x)" }}
          >
            <div className="viewfinder-static absolute inset-3 md:inset-5" />
            <p className="label absolute left-6 top-6 flex items-center gap-2 md:left-9 md:top-8">
              <span className="h-2 w-2 animate-[rec_1.6s_steps(1)_infinite] rounded-full bg-[#e0503e]" />
              Rec
            </p>
            <p className="label absolute right-6 top-6 hidden text-ivory/85 sm:block md:right-9 md:top-8">Photography · Film</p>
          </div>
        </div>

        <p data-chrome className="label absolute inset-x-0 top-[calc(var(--header-h)+1.5vh)] text-center text-ink md:top-[calc(var(--header-h)+2vh)]">
          North America <span aria-hidden>·</span> India <span aria-hidden>·</span> Worldwide
        </p>

        <div className="absolute inset-0 flex items-center justify-center px-[calc(var(--gutter)+1rem)] text-center text-ivory">
          <h1 className="font-serif t-display leading-[0.98] tracking-[-0.025em]">
            <span data-line className="block">
              Stories that deserve
            </span>
            <span data-line className="block">
              to be <em>felt forever.</em>
            </span>
          </h1>
        </div>

        <div data-chrome className="absolute inset-x-0 bottom-[3vh] flex items-end justify-between px-[var(--gutter)] text-ink md:bottom-[3.5vh]">
          <span className="label hidden sm:block">Wedding Photography &amp; Films</span>
          <span className="label mx-auto flex items-center gap-3 sm:mx-0">
            Scroll to experience
            <span aria-hidden className="inline-block animate-bounce">↓</span>
          </span>
          <span className="label hidden sm:block">Bookings open 2026 — 2027</span>
        </div>
      </div>
    </section>
  );
}
