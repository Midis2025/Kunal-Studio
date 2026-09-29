"use client";

import { useRef } from "react";
import Pic from "@/components/ui/Pic";
import { gsap, prefersReducedMotion, useGsap } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

// Equirectangular 1000×500: Toronto ≈ (279,129), Punjab ≈ (708,162)
const NA = { x: 279, y: 129 };
const IN = { x: 708, y: 162 };
const ROUTE = `M${NA.x} ${NA.y} Q 494 -40 ${IN.x} ${IN.y}`;

/**
 * An abstract map — a faint graticule, two points of light and one thin line
 * drawn between them as you scroll, with photographs from each side surfacing
 * around it.
 */
export default function Presence({ na, india }: { na: [Photo, Photo]; india: [Photo, Photo] }) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const el = root.current!;
      const path = el.querySelector<SVGPathElement>("[data-route]")!;
      const len = path.getTotalLength();
      if (prefersReducedMotion()) return;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector("[data-map]"), start: "top 75%", end: "bottom 45%", scrub: 0.8 },
      });
      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 })
        .from("[data-city='na']", { autoAlpha: 0, duration: 0.15 }, 0)
        .from("[data-city='in']", { autoAlpha: 0, duration: 0.15 }, 0.85)
        .from("[data-photo='na']", { autoAlpha: 0, y: 40, stagger: 0.1, duration: 0.3 }, 0.05)
        .from("[data-photo='in']", { autoAlpha: 0, y: 40, stagger: 0.1, duration: 0.3 }, 0.7);
    },
    root,
  );

  return (
    <section ref={root} data-theme="dark" className="relative overflow-hidden bg-night py-24 text-ivory grain md:py-40" aria-labelledby="presence-title">
      <div className="wrap text-center">
        <p className="label text-ivory/60" data-reveal="fade">
          Where we work
        </p>
        <h2 id="presence-title" className="mx-auto mt-8 max-w-[16ch] font-serif t-h2 leading-[0.95] tracking-[-0.02em]" data-reveal="split">
          Two continents. <em className="text-stone">One way of seeing love.</em>
        </h2>
      </div>

      <div data-map className="wrap relative mx-auto mt-16 max-w-[1500px] md:mt-24">
        <div className="relative" style={{ aspectRatio: "2 / 1" }}>
          <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* graticule */}
            <g stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.6" fill="none">
              {Array.from({ length: 11 }, (_, i) => (
                <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="500" />
              ))}
              {Array.from({ length: 6 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 100} x2="1000" y2={i * 100} />
              ))}
              <ellipse cx="500" cy="250" rx="498" ry="248" strokeOpacity="0.12" />
            </g>
            <path d={ROUTE} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="2 6" fill="none" />
            <path data-route d={ROUTE} stroke="#d8d2c8" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <g data-city="na">
              <circle cx={NA.x} cy={NA.y} r="4" fill="#f7f5f0" />
              <circle cx={NA.x} cy={NA.y} r="12" fill="none" stroke="#f7f5f0" strokeOpacity="0.35" className="origin-center animate-ping [transform-box:fill-box]" />
            </g>
            <g data-city="in">
              <circle cx={IN.x} cy={IN.y} r="4" fill="#f7f5f0" />
              <circle cx={IN.x} cy={IN.y} r="12" fill="none" stroke="#f7f5f0" strokeOpacity="0.35" className="origin-center animate-ping [transform-box:fill-box]" />
            </g>
          </svg>

          <div className="absolute" style={{ left: `${(NA.x / 1000) * 100}%`, top: `${(NA.y / 500) * 100}%` }}>
            <p className="label -translate-x-1/2 translate-y-5 whitespace-nowrap text-ivory/90 md:translate-y-6">North America</p>
          </div>
          <div className="absolute" style={{ left: `${(IN.x / 1000) * 100}%`, top: `${(IN.y / 500) * 100}%` }}>
            <p className="label -translate-x-1/2 translate-y-5 whitespace-nowrap text-ivory/90 md:translate-y-6">India</p>
          </div>

          {/* Photographs surfacing around each region */}
          <div data-photo="na" className="absolute hidden md:block left-[2%] top-[42%] w-[15%] md:left-[6%]">
            <Pic p={na[0]} sizes="15vw" className="w-full" />
          </div>
          <div data-photo="na" className="absolute hidden md:block left-[20%] top-[55%] w-[13%] md:left-[22%]">
            <Pic p={na[1]} sizes="13vw" className="w-full" />
          </div>
          <div data-photo="in" className="absolute hidden md:block right-[18%] top-[52%] w-[14%] md:right-[22%]">
            <Pic p={india[0]} sizes="14vw" className="w-full" />
          </div>
          <div data-photo="in" className="absolute hidden md:block right-[1%] top-[38%] w-[16%] md:right-[5%]">
            <Pic p={india[1]} sizes="16vw" className="w-full" />
          </div>
        </div>
      </div>

      <div className="wrap mt-12 grid grid-cols-4 gap-2 md:hidden" data-reveal="stagger">
        {[...na, ...india].map((p) => (
          <Pic key={p.src} p={p} sizes="25vw" className="w-full" />
        ))}
      </div>

      <ul className="wrap mt-24 grid gap-10 text-center sm:grid-cols-3 md:mt-40" data-reveal="stagger">
        <li>
          <p className="font-serif t-h3">North America</p>
          <p className="label mt-3 text-ivory/60">Toronto · Canada · across the continent</p>
        </li>
        <li>
          <p className="font-serif t-h3">India</p>
          <p className="label mt-3 text-ivory/60">Punjab · palaces · heritage homes</p>
        </li>
        <li>
          <p className="font-serif t-h3 italic text-stone">Worldwide</p>
          <p className="label mt-3 text-ivory/60">Destination weddings, wherever you are</p>
        </li>
      </ul>
    </section>
  );
}
