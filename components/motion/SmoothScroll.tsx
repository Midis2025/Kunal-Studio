"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

/** Stop / resume page scrolling (menu, lightbox). Works with or without Lenis. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, anchors: { offset: -80 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Fresh page → top of page, and recompute every trigger once layout settles.
  useEffect(() => {
    if (!window.location.hash) scrollToTop();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("load", onLoad);
    };
  }, [pathname]);

  return null;
}
