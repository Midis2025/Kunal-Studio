"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TLink } from "@/components/motion/PageTransition";
import { gsap } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

export type PreviewRow = { href: string; title: string; kicker?: string; meta?: string; aside?: string; image: Photo };

/**
 * A studio "index": text-only rows; on desktop the hovered row's photograph
 * floats beside the cursor, leaning slightly with the pointer's speed.
 * Touch and keyboard users get the same rows, with a small thumbnail in-line.
 */
export default function HoverPreviewList({ rows, large }: { rows: PreviewRow[]; large?: boolean }) {
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const set = () => setFine(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!fine || !float.current) return;
    const el = float.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
    let lastX = 0;
    // The photograph rides in the open space right of the titles, drifting a little with the pointer.
    const move = (e: PointerEvent) => {
      xTo(window.innerWidth * 0.58 + (e.clientX - window.innerWidth / 2) * 0.12);
      yTo(e.clientY - el.offsetHeight / 2);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine]);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <ol className="border-t border-current/15">
        {rows.map((r, i) => (
          <li key={r.href} className="border-b border-current/15">
            <TLink
              href={r.href}
              data-cursor="open"
              onMouseEnter={() => {
                setArmed(true);
                setActive(i);
              }}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 md:grid-cols-[14rem_1fr_auto] md:py-7"
            >
              <span className="label order-2 col-span-2 text-wine md:order-none md:col-span-1">{r.kicker}</span>
              <span className="flex items-center gap-4">
                {!fine && (
                  <span className="relative block aspect-square w-14 shrink-0 overflow-hidden">
                    <Image src={r.image.src} alt="" fill sizes="56px" quality={60} className="object-cover" />
                  </span>
                )}
                <span
                  className={`font-serif leading-[1.05] tracking-[-0.015em] transition-[transform,opacity,font-style] duration-500 ease-[var(--ease-film)] group-hover:translate-x-3 group-hover:italic ${
                    large ? "text-[clamp(1.7rem,4.6vw,4.4rem)]" : "text-[clamp(1.35rem,2.6vw,2.3rem)]"
                  } ${active !== null && active !== i ? "md:opacity-35" : ""}`}
                >
                  {r.title}
                </span>
              </span>
              <span className="label flex items-center gap-4 text-current/60">
                {r.meta && <span className="hidden sm:inline">{r.meta}</span>}
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </TLink>
          </li>
        ))}
      </ol>

      {fine && (
        <div
          ref={float}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[60] w-[clamp(14rem,20vw,22rem)] transition-[opacity,clip-path] duration-500 ease-[var(--ease-film)]"
          style={{ opacity: active === null ? 0 : 1, clipPath: active === null ? "inset(50% 0 50% 0)" : "inset(0% 0 0% 0)" }}
        >
          <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
            {armed &&
              rows.map((r, i) => (
                <Image
                  key={r.href}
                  src={r.image.src}
                  alt=""
                  fill
                  sizes="22vw"
                  quality={70}
                  className="object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-film)]"
                  style={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(1.12)" }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
