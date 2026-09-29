"use client";

import { useLayoutEffect, useRef } from "react";
import Wordmark from "@/components/ui/Wordmark";
import { gsap } from "@/lib/gsap";

/**
 * First-visit intro: the wordmark surfaces on black, then the frame opens like
 * a camera shutter. Shown once per browser session, never for reduced motion.
 * Visibility is decided before paint by the boot script (html.intro), so the
 * page never flashes underneath.
 */
let played = false;

export default function ShutterIntro() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains("intro") || played) return;
    played = true;
    try {
      sessionStorage.setItem("sk-intro", "1");
    } catch {}
    // Deliberately not killed on unmount: the shutter must always finish opening.
    const tl = gsap.timeline({ onComplete: () => html.classList.remove("intro") });
    tl.fromTo(el.querySelector("[data-mark]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(el.querySelector("[data-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power3.inOut" }, 0.15)
      .to(el.querySelector("[data-mark]"), { autoAlpha: 0, duration: 0.3 }, 0.95)
      .to(el.querySelector("[data-line]"), { autoAlpha: 0, duration: 0.2 }, 0.95)
      .to(el.querySelector("[data-top]"), { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.0)
      .to(el.querySelector("[data-bot]"), { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, 1.0);
  }, []);

  return (
    <div ref={root} aria-hidden className="shutter pointer-events-none fixed inset-0 z-[130] hidden">
      <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-night" />
      <div data-bot className="absolute inset-x-0 bottom-0 h-1/2 bg-night" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-ivory">
        <div data-mark style={{ visibility: "hidden" }}>
          <Wordmark size="lg" />
        </div>
        <span data-line className="block h-px w-40 origin-center bg-ivory/40" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
