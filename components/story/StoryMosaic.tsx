import { TLink } from "@/components/motion/PageTransition";
import Pic from "@/components/ui/Pic";
import type { Photo } from "@/lib/photos";

export type MosaicCard = {
  slug: string;
  couple: string;
  title?: string;
  location: string;
  kind: string;
  year?: string;
  landscape: Photo; // used when the tile is wide
  portrait: Photo; // used when the tile is tall
  hasFilm?: boolean;
};

// Row rhythm: one cinematic frame, then a pair, then a trio, then a pair…
const PATTERN = [1, 2, 3, 2];

const rowGrid: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};
const tileRatio: Record<number, string> = {
  1: "aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]",
  2: "aspect-[4/5]",
  3: "aspect-[4/5] sm:aspect-[2/3] lg:aspect-[3/4]",
};

function rows<T>(items: T[]) {
  const out: T[][] = [];
  let i = 0;
  let k = 0;
  while (i < items.length) {
    const n = Math.min(PATTERN[k++ % PATTERN.length], items.length - i);
    out.push(items.slice(i, i + n));
    i += n;
  }
  return out;
}

function Tile({ c, per }: { c: MosaicCard; per: number }) {
  const img = per === 1 ? c.landscape : c.portrait;
  const sizes = per === 1 ? "100vw" : per === 2 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 33vw, 100vw";
  return (
    <TLink
      href={`/portfolio/${c.slug}`}
      expand
      aria-label={`${c.couple}${c.title ? ` — ${c.title}` : ""}, ${c.location}. View story`}
      className="viewfinder group relative block overflow-hidden text-ivory"
      data-theme="dark"
    >
      <div data-expand data-cursor="view" className={`relative ${tileRatio[per]}`}>
        <Pic
          p={img}
          fill
          sizes={sizes}
          className="h-full w-full"
          imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/75 via-night/5 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
      <span className="label pointer-events-none absolute left-5 top-5 z-[2] flex items-center gap-2 text-ivory/85 md:left-7 md:top-7">
        {c.hasFilm && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#d24a3a]" />}
        {c.hasFilm ? "Photo · Film" : "Photography"}
      </span>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
        <div>
          <h3 className={`font-serif tracking-tight group-hover:italic ${per === 1 ? "t-h2" : "t-h3"}`}>{c.couple}</h3>
          {c.title && per < 3 && <p className="mt-1 font-serif italic text-ivory/85">{c.title}</p>}
          <p className="label mt-3 text-ivory/75">
            {c.location} · {c.kind}
            {c.year ? ` · ${c.year}` : ""}
          </p>
        </div>
        <span
          className={`cta hidden shrink-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 ${
            per === 3 ? "xl:inline-flex" : "md:inline-flex"
          }`}
        >
          View story <span className="cta-arrow" aria-hidden>→</span>
        </span>
      </div>
    </TLink>
  );
}

/** Flush, aligned story grid — every tile shares one gutter and each row shares one height. */
export default function StoryMosaic({ cards }: { cards: MosaicCard[] }) {
  return (
    <div className="flex flex-col gap-[var(--gap)] px-[var(--gap)]">
      {rows(cards).map((row) => (
        <div key={row[0].slug} className={`grid gap-[var(--gap)] ${rowGrid[row.length]}`} data-reveal="stagger">
          {row.map((c) => (
            <Tile key={c.slug} c={c} per={row.length} />
          ))}
        </div>
      ))}
    </div>
  );
}
