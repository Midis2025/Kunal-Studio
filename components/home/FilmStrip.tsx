"use client";

import { useRef, useState } from "react";
import { useNear } from "@/lib/useNear";
import Eyebrow from "@/components/ui/Eyebrow";
import Lightbox from "@/components/ui/Lightbox";
import Pic from "@/components/ui/Pic";
import type { Photo } from "@/lib/photos";

/**
 * A contact sheet of candid frames. Hover (or focus) a frame and it widens a
 * little, sharpens, and its caption comes up — the rest settle back like
 * unselected negatives. Every frame opens the lightbox.
 */
export default function FilmStrip({ frames }: { frames: (Photo & { caption: string })[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const shown = active ?? 0;
  const root = useRef<HTMLElement>(null);
  const near = useNear(root);

  return (
    <section ref={root} data-theme="light" className="relative overflow-hidden bg-paper py-24 md:py-36" aria-labelledby="strip-title">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow>Contact sheet</Eyebrow>
          <h2 id="strip-title" className="mt-8 font-serif t-h2 tracking-[-0.02em]" data-reveal="split">
            The frames between <em>the frames.</em>
          </h2>
        </div>
        <p className="max-w-sm text-ash md:col-span-4 md:col-start-9" data-reveal="fade">
          Candid, unposed, often unnoticed at the time. These are the photographs couples tell us they return to most.
        </p>
      </div>

      <div className="mt-14 md:mt-20" data-reveal="fade">
        <div className="filmbase no-scrollbar overflow-x-auto py-[34px] md:overflow-visible" data-lenis-prevent-touch>
          <ul
            className="flex w-max gap-2 px-[var(--gutter)] md:w-auto md:px-[var(--gutter)]"
            onMouseLeave={() => setActive(null)}
          >
            {frames.map((f, i) => {
              const on = active === i;
              const dim = active !== null && !on;
              return (
                <li
                  key={f.src}
                  className="relative shrink-0 transition-[flex-grow,flex-basis] duration-700 ease-[var(--ease-film)] md:min-w-0 md:shrink md:basis-0"
                  style={{ flexGrow: on ? 1.9 : 1 }}
                >
                  <button
                    type="button"
                    data-cursor="view"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setOpen(i)}
                    aria-label={`Open frame ${i + 1}: ${f.caption}`}
                    className="block w-[42vw] sm:w-[28vw] md:w-full"
                  >
                    <Pic
                      p={f}
                      fill
                      eager={near}
                      sizes="(min-width: 768px) 18vw, 42vw"
                      className={`h-[56vw] sm:h-[38vw] md:h-[clamp(15rem,24vw,27rem)] transition-[filter,opacity] duration-700 ${
                        dim ? "opacity-55 saturate-[0.35]" : "opacity-100"
                      }`}
                      imgClassName={`transition-transform duration-[1200ms] ease-[var(--ease-film)] ${on ? "scale-[1.04]" : "scale-100"}`}
                    />
                  </button>
                  <span aria-hidden className="pointer-events-none absolute -top-[13px] left-1 leading-none font-sans text-[0.6rem] tracking-[0.2em] text-[#d98a4a]">
                    {String(i + 1).padStart(2, "0")}A
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="wrap mt-6 flex min-h-[3.5rem] items-start justify-between gap-6">
          <p className="label tabular-nums text-ash">
            Frame {String(shown + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
          </p>
          <p key={shown} className="max-w-md animate-[lbIn_0.6s_var(--ease-film)] text-right font-serif text-lg italic md:text-xl">
            {frames[shown].caption}
          </p>
        </div>
      </div>

      <Lightbox photos={frames} index={open} onClose={() => setOpen(null)} title="Contact sheet" />
    </section>
  );
}
