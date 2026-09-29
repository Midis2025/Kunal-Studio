"use client";

import { useCallback, useState } from "react";
import { TLink } from "@/components/motion/PageTransition";
import FilmCard from "@/components/ui/FilmCard";
import FilmModal, { type ModalFilm } from "@/components/ui/FilmModal";
import type { Film } from "@/data/films";

const subtitle = (f: Film) => [f.kind, f.place, f.music && `Music: ${f.music}`].filter(Boolean).join(" · ");

/** The films page body: a feature reel, then a bin of films — every one previews on hover and plays full-screen. */
export default function FilmLibrary({ films, youtube }: { films: Film[]; youtube: string }) {
  const [playing, setPlaying] = useState<ModalFilm | null>(null);
  const close = useCallback(() => setPlaying(null), []);
  const play = (f: Film) => setPlaying({ id: f.id, title: `${f.couple} — ${f.title}`, subtitle: subtitle(f) });
  const [feature, ...rest] = films;

  return (
    <>
      <div className="px-[var(--gap)]" data-reveal="mask">
        <FilmCard id={feature.id} title={`${feature.couple} — ${feature.title}`} onPlay={() => play(feature)} eager sizes="100vw" ratio="aspect-[4/3] sm:aspect-video lg:aspect-[21/9]" />
      </div>
      <div className="wrap mt-5 flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-serif t-h3">
          {feature.couple} <em className="text-stone">— {feature.title}</em>
        </p>
        <p className="label text-ivory/60">{subtitle(feature)}</p>
      </div>

      <section data-theme="light" className="mt-20 bg-ivory py-20 text-ink md:mt-28 md:py-28" aria-label="All films">
        <ul className="grid gap-x-[var(--gap)] gap-y-12 px-[var(--gap)] md:grid-cols-2 md:gap-y-16">
          {rest.map((f) => (
            <li key={f.id}>
              <FilmCard id={f.id} title={`${f.couple} — ${f.title}`} onPlay={() => play(f)} />
              <div className="mt-4 flex items-start justify-between gap-4 px-[calc(var(--gutter)-var(--gap))]">
                <div>
                  <h2 className="font-serif t-h3">{f.couple}</h2>
                  <p className="mt-1 font-serif italic text-ash">{f.title}</p>
                </div>
                <p className="label pt-2 text-right text-ash">{subtitle(f)}</p>
              </div>
              {f.story && (
                <TLink href={`/portfolio/${f.story}`} className="cta ml-[calc(var(--gutter)-var(--gap))] mt-1">
                  See the photographs <span className="cta-arrow" aria-hidden>→</span>
                </TLink>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-24 flex flex-col items-center px-[var(--gutter)] text-center">
          <p className="font-serif t-h2 italic">More on our channel</p>
          <a href={youtube} target="_blank" rel="noopener noreferrer" className="cta mt-6">
            Studio Kunal on YouTube <span className="cta-arrow" aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <FilmModal film={playing} onClose={close} />
    </>
  );
}
