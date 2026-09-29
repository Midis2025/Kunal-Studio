"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGsap } from "@/lib/gsap";

/**
 * Endless type band. The loop itself is CSS (cheap, pauses for reduced
 * motion); on top, the band leans into the direction and speed of the scroll.
 */
export default function Marquee({ children, seconds = 38, className = "" }: { children: ReactNode; seconds?: number; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const band = root.current!.querySelector("[data-band]");
      const skew = gsap.quickTo(band, "skewX", { duration: 0.6, ease: "power3" });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skew(gsap.utils.clamp(-10, 10, self.getVelocity() / -260)),
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });
      return () => st.kill();
    },
    root,
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div data-band className="flex w-max will-change-transform">
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1} className="marquee-run flex shrink-0 items-center" style={{ animationDuration: `${seconds}s` }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
