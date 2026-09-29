"use client";

import { useCallback, useState } from "react";
import { TLink } from "@/components/motion/PageTransition";
import FilmCard from "@/components/ui/FilmCard";
import FilmModal, { type ModalFilm } from "@/components/ui/FilmModal";
import type { Film } from "@/data/films";

/**
 * A short reel that continues the cinema moment: one wide lead film and two
 * companions cropped to the same height, flush on the shared gutter.
 */
export default function FilmReel({ films }: { films: Film[] }) {
  const [playing, setPlaying] = useState<ModalFilm | null>(null);
  const close = useCallback(() => setPlaying(null), []);
  const play = (f: Film) => setPlaying({ id: f.id, title: `${f.couple} — ${f.title}`, subtitle: f.kind });

  return (
    <section data-theme="dark" className="relative bg-night pb-20 pt-[var(--gap)] text-ivory md:pb-28" aria-label="Recent films">
      <ul className="grid grid-cols-2 gap-[var(--gap)] px-[var(--gap)] lg:grid-cols-[2fr_1fr_1fr]" data-reveal="stagger">
        {films.slice(0, 3).map((f, i) => (
          <li key={f.id} className={i === 0 ? "col-span-2 lg:col-span-1" : ""}>
            <FilmCard
              id={f.id}
              title={`${f.couple} — ${f.title}`}
              onPlay={() => play(f)}
              ratio={i === 0 ? "aspect-video" : "aspect-[4/5] lg:aspect-[8/9]"}
              sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            />
            <div className="mt-3 flex items-baseline justify-between gap-3 px-2">
              <p className="font-serif text-lg md:text-xl">{f.couple}</p>
              <p className="label hidden text-ivory/55 sm:block">{f.kind}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="wrap mt-10 flex flex-col items-start justify-between gap-4 border-t border-ivory/15 pt-6 sm:flex-row sm:items-center">
        <p className="max-w-md text-ivory/70">Highlight films, e-shoots and ceremonies — cut to the music and moments you chose.</p>
        <TLink href="/films" className="cta">
          The full film library <span className="cta-arrow" aria-hidden>→</span>
        </TLink>
      </div>
      <FilmModal film={playing} onClose={close} />
    </section>
  );
}
