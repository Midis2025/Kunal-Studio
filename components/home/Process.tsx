"use client";

import { useState } from "react";
import { TLink } from "@/components/motion/PageTransition";
import Pic from "@/components/ui/Pic";
import type { Step } from "@/data/process";

type Fact = { k: string; v: string };

/**
 * The experience, told as four chapters. A single large photograph crossfades
 * as each chapter is chosen (hover, focus or tap); the chapter list opens to
 * reveal its detail. Nothing is scroll-hijacked and every state is reachable
 * by keyboard.
 */
export default function Process({ steps, facts, id = "process" }: { steps: Step[]; facts: Fact[]; id?: string }) {
  const [active, setActive] = useState(0);

  return (
    <section id={id} data-theme="dark" className="relative overflow-hidden bg-night text-ivory grain" aria-labelledby={`${id}-title`}>
      {/* Headline set across the full measure: the journey reads left to right */}
      <div className="wrap pb-12 pt-20 md:pb-16 md:pt-28">
        <h2 id={`${id}-title`} className="flex flex-col gap-2 font-serif leading-[0.9] tracking-[-0.035em] md:flex-row md:items-baseline md:justify-between md:gap-8">
          <span className="t-display uppercase" data-reveal="split">
            From first hello
          </span>
          <span aria-hidden className="hidden h-px flex-1 translate-y-[-0.3em] bg-ivory/25 md:block" data-reveal="fade" />
          <em className="t-display text-stone md:text-right" data-reveal="split" data-delay="0.2">
            to forever.
          </em>
        </h2>
        <p className="mt-8 max-w-sm text-ivory/70 md:ml-auto md:text-right" data-reveal="fade">
          The experience — four chapters, one team, and a story that starts long before the wedding day.
        </p>
      </div>

      <div className="grid gap-[var(--gap)] px-[var(--gap)] lg:grid-cols-2">
        {/* Photograph for the active chapter */}
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[40rem]">
          {steps.map((s, i) => (
            <div
              key={s.word}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-film)]"
              style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.06)" }}
            >
              <Pic p={s.p} fill eager={i < 2} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
          <p className="pointer-events-none absolute bottom-5 left-5 font-serif text-[clamp(4rem,10vw,9rem)] leading-none text-ivory/90 tabular-nums md:bottom-8 md:left-8">
            0{active + 1}
          </p>
        </div>

        {/* Chapters */}
        <ol className="flex flex-col bg-ivory/[0.03]">
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.word} className="border-b border-ivory/12 first:border-t lg:first:border-t-0">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`${id}-step-${i}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-baseline gap-4 px-4 py-6 text-left sm:gap-5 sm:px-5 md:gap-8 md:px-10 md:py-8"
                >
                  <span className={`label tabular-nums transition-colors ${on ? "text-stone" : "text-ivory/40"}`}>0{i + 1}</span>
                  <span
                    className={`min-w-0 font-serif text-[clamp(1.7rem,4.4vw,4.4rem)] uppercase leading-[0.9] tracking-[-0.03em] transition-[color,font-style] duration-500 ${
                      on ? "text-ivory" : "text-ivory/35 group-hover:text-ivory/70"
                    }`}
                  >
                    {on ? <em className="normal-case">{s.word}</em> : s.word}
                  </span>
                  <span aria-hidden className={`ml-auto self-center text-xl transition-transform duration-500 ${on ? "rotate-45 text-stone" : "text-ivory/40"}`}>
                    +
                  </span>
                </button>
                <div
                  id={`${id}-step-${i}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-film)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-8 pl-[3.75rem] sm:px-5 sm:pl-[4.25rem] md:px-10 md:pb-10 md:pl-[6.5rem]">
                      <p className="font-serif text-xl italic text-stone md:text-2xl">{s.line}</p>
                      <p className="mt-3 max-w-md text-ivory/70">{s.body}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 sm:px-5 md:px-10 md:py-8">
            <span className="label text-ivory/50">Ready for chapter one?</span>
            <TLink href="/contact" className="cta">
              Tell us your story <span className="cta-arrow" aria-hidden>→</span>
            </TLink>
          </li>
        </ol>
      </div>

      {/* Studio facts */}
      <dl className="mt-[var(--gap)] grid grid-cols-2 gap-[var(--gap)] px-[var(--gap)] pb-[var(--gap)] lg:grid-cols-4" data-reveal="stagger">
        {facts.map((f) => (
          <div key={f.k} className="bg-ivory/[0.04] px-5 py-7 md:px-8 md:py-10">
            <dt className="font-serif text-[clamp(1.6rem,3vw,2.8rem)] leading-none">{f.k}</dt>
            <dd className="label mt-3 text-ivory/60">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
