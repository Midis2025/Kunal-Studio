"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * Declarative scroll motion, driven by data attributes so pages stay server-rendered:
 *   data-reveal="split"  – headline lines rise out of a mask
 *   data-reveal="fade"   – soft rise + fade
 *   data-reveal="mask"   – image wipes open from the bottom while settling in scale
 *   data-reveal="stagger"– direct children fade up in sequence
 *   data-speed="0.15"    – gentle parallax (desktop only)
 * Initial hidden states live in CSS behind `html.js-motion`, which is only set when
 * motion is allowed — so no-JS and reduced-motion users always see everything.
 */
export default function Reveals() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    (window as Window & { __motionReady?: boolean }).__motionReady = true;
    if (!root.classList.contains("js-motion")) return;

    const splits: SplitText[] = [];
    const mm = gsap.matchMedia();
    // Elements inside display:none breakpoint variants can't be measured — show them as-is.
    const rendered = (el: HTMLElement) => {
      if (el.getClientRects().length) return true;
      gsap.set(el, { clearProps: "all", visibility: "visible", opacity: 1, clipPath: "none" });
      gsap.set(el.children, { opacity: 1, y: 0 });
      gsap.set(el.querySelectorAll("img"), { opacity: 1 });
      return false;
    };
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal='split']").filter(rendered).forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.08,
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        splits.push(split);
      });

      // Letters rise one by one through a mask, with a slight tilt — used for mastheads
      gsap.utils.toArray<HTMLElement>("[data-reveal='chars']").filter(rendered).forEach((el) => {
        const split = SplitText.create(el, { type: "chars", mask: "chars", charsClass: "split-char" });
        gsap.set(el, { visibility: "visible" });
        gsap.from(split.chars, {
          yPercent: 115,
          rotate: 6,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        splits.push(split);
      });

      // Reading light: words brighten as the paragraph scrolls through the viewport
      gsap.utils.toArray<HTMLElement>("[data-reveal='words']").filter(rendered).forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.set(el, { visibility: "visible" });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 } },
        );
        splits.push(split);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='fade']").filter(rendered).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          clearProps: "transform",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='stagger']").filter(rendered).forEach((el) => {
        gsap.to(el.children, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
          clearProps: "transform",
        });
      });

      // Photo reveal: the card box (tinted with the photo's own colour) is always there;
      // the picture develops into it — a soft fade while its frame settles from a slight zoom.
      // Scale goes on the <Pic> wrapper, never on the <img>, whose CSS hover transition
      // would otherwise fight GSAP every frame (the old cause of lurching cards).
      gsap.utils.toArray<HTMLElement>("[data-reveal='mask']").filter(rendered).forEach((el) => {
        const img = el.querySelector("img");
        const frame = img?.parentElement;
        if (!img || !frame) {
          gsap.set(el, { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 96%", once: true } });
        tl.to(img, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0).fromTo(
          frame,
          { scale: 1.06 },
          { scale: 1, duration: 1.3, ease: "expo.out", clearProps: "transform" },
          0,
        );
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-speed]").filter((el) => el.getClientRects().length > 0).forEach((el) => {
          const speed = Number(el.dataset.speed);
          gsap.fromTo(
            el,
            { yPercent: speed * 50 },
            {
              yPercent: -speed * 50,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      splits.forEach((s) => s.revert());
      mm.revert();
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
