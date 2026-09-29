import FilmEmbed from "@/components/ui/FilmEmbed";
import Pic from "@/components/ui/Pic";
import type { Block } from "@/data/weddings";
import type { Photo } from "@/lib/photos";

/**
 * A photograph that opens the story lightbox (handled by StoryViewer via data-lb).
 * `ratio` crops to a shared aspect so neighbouring frames line up edge to edge;
 * without it the frame keeps its natural proportions.
 */
function Open({ p, sizes, ratio, className = "" }: { p: Photo; sizes: string; ratio?: string; className?: string }) {
  return (
    <button type="button" data-lb={p.src} data-cursor="view" aria-label={`Enlarge: ${p.alt}`} className={`viewfinder group block w-full overflow-hidden ${className}`}>
      <Pic
        p={p}
        sizes={sizes}
        fill={!!ratio}
        className={ratio ? `w-full ${ratio}` : "w-full"}
        imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.03]"
      />
    </button>
  );
}

const landscape = (p: Photo) => p.w > p.h;

/**
 * The photo-essay grammar, set like a photo book: every image block shares one
 * narrow gutter and one set of outer edges, so frames sit flush and aligned.
 * Only words (quotes) and film get extra air around them.
 */
export default function StoryBlocks({ blocks, couple }: { blocks: Block[]; couple: string }) {
  return (
    <div className="flex flex-col gap-[var(--gap)] px-[var(--gap)]">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "wide":
            return (
              <div key={i} data-reveal="mask">
                <Open p={b.p} sizes="100vw" ratio={landscape(b.p) ? undefined : "aspect-[4/5] md:aspect-[16/9]"} />
              </div>
            );
          case "pair":
            return (
              <div key={i} className="grid grid-cols-2 gap-[var(--gap)]" data-reveal="stagger">
                {b.p.map((p) => (
                  <Open key={p.src} p={p} sizes="50vw" ratio="aspect-[4/5]" />
                ))}
              </div>
            );
          case "detail":
            return (
              <div key={i} className="grid gap-[var(--gap)] md:grid-cols-2">
                <div className="flex items-center justify-center bg-paper px-8 py-14 md:order-1 md:px-[8%]">
                  <p className="max-w-md text-center font-serif text-[clamp(1.4rem,2.4vw,2.2rem)] italic leading-snug" data-reveal="fade">
                    {b.note}
                  </p>
                </div>
                <div className="md:order-2" data-reveal="mask">
                  <Open p={b.p} sizes="(min-width: 768px) 50vw, 100vw" ratio="aspect-[4/5]" />
                </div>
              </div>
            );
          case "full":
            return landscape(b.p) ? (
              <div key={i} data-theme="dark">
                <Open p={b.p} sizes="100vw" />
              </div>
            ) : (
              // Portrait "full" frames become a dark cinematic plate — uncropped, full height.
              <div key={i} data-theme="dark" className="bg-night">
                <button type="button" data-lb={b.p.src} data-cursor="view" aria-label={`Enlarge: ${b.p.alt}`} className="relative block h-[100svh] w-full">
                  <Pic p={b.p} fill sizes="(min-width: 768px) 60vw, 100vw" className="h-full w-full !bg-night" imgClassName="!object-contain" />
                </button>
              </div>
            );
          case "trio":
            return (
              <div key={i} className="grid grid-cols-2 gap-[var(--gap)] md:grid-cols-3" data-reveal="stagger">
                {b.p.map((p, k) => (
                  <Open
                    key={p.src}
                    p={p}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    ratio={k === 2 ? "aspect-[3/2] md:aspect-[2/3]" : "aspect-[2/3]"}
                    className={k === 2 ? "col-span-2 md:col-span-1" : ""}
                  />
                ))}
              </div>
            );
          case "quote":
            return (
              <figure key={i} className="mx-auto max-w-5xl px-[var(--gutter)] py-20 text-center md:py-28">
                <blockquote className="font-serif text-[clamp(1.8rem,4.2vw,4rem)] leading-[1.08] tracking-[-0.015em]" data-reveal="split">
                  &ldquo;{b.text}&rdquo;
                </blockquote>
                {b.by && (
                  <figcaption className="label mt-8 text-ash" data-reveal="fade">
                    — {b.by}
                  </figcaption>
                )}
              </figure>
            );
          case "sequence":
            return (
              <div key={i}>
                <div
                  className="no-scrollbar -mx-[var(--gap)] flex snap-x gap-[var(--gap)] overflow-x-auto px-[var(--gap)] md:mx-0 md:grid md:overflow-visible md:px-0"
                  style={{ gridTemplateColumns: `repeat(${b.p.length}, 1fr)` }}
                  data-reveal="stagger"
                >
                  {b.p.map((p) => (
                    <Open key={p.src} p={p} sizes="(min-width: 768px) 20vw, 45vw" ratio="aspect-[2/3]" className="w-[42vw] shrink-0 snap-start md:w-auto" />
                  ))}
                </div>
                <p className="label mt-3 flex items-center gap-3 px-[calc(var(--gutter)-var(--gap))] text-ash">
                  <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                  {b.label}
                </p>
              </div>
            );
          case "film":
            return (
              <div key={i} className="py-16 md:py-24">
                <p className="label mb-4 px-[calc(var(--gutter)-var(--gap))]">Watch the film</p>
                <FilmEmbed id={b.id} title={b.title} />
              </div>
            );
          case "final":
            return landscape(b.p) ? (
              <div key={i} data-reveal="mask">
                <Open p={b.p} sizes="100vw" />
              </div>
            ) : (
              <div key={i} className="grid gap-[var(--gap)] md:grid-cols-2">
                <div data-reveal="mask">
                  <Open p={b.p} sizes="(min-width: 768px) 50vw, 100vw" ratio="aspect-[4/5]" />
                </div>
                <div className="flex flex-col items-center justify-center bg-night px-8 py-16 text-center text-ivory" data-theme="dark">
                  <p className="label text-ivory/60">Fin</p>
                  <p className="mt-6 font-serif t-h2 italic">{couple}</p>
                  <p className="label mt-6 text-ivory/60">Photographed by Studio Kunal</p>
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
