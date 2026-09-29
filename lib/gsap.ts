"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText };

export const EASE_FILM = "expo.out";
export const EASE_CURTAIN = "power4.inOut";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

/** Scoped GSAP effect — everything created inside is reverted on unmount / dep change. */
export function useGsap(
  fn: (ctx: gsap.Context) => void | (() => void),
  scope: RefObject<Element | null>,
  deps: DependencyList = [],
) {
  useIso(() => {
    if (!scope.current) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = fn(self);
    }, scope.current);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
  }, deps);
}
