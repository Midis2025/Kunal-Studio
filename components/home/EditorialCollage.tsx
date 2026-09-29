import Pic from "@/components/ui/Pic";
import type { Photo } from "@/lib/photos";

export type CollageItem = { p: Photo; label: string };

/**
 * An album spread set on a strict grid. The title is set *inside* the lead
 * photograph, like a cover line; every other frame shares one tile shape, one
 * gutter and aligned edges. Desktop 4 columns · tablet 3 · mobile 2.
 */
export default function EditorialCollage({ items }: { items: CollageItem[] }) {
  const [lead, ...rest] = items;
  return (
    <section data-theme="light" className="relative py-[var(--gap)]" aria-labelledby="collage-title">
      <ul className="grid grid-cols-2 gap-[var(--gap)] px-[var(--gap)] sm:grid-cols-3 lg:grid-cols-4">
        <li className="relative col-span-2 overflow-hidden text-ivory sm:col-span-3 lg:col-span-2" data-theme="dark">
          <Pic p={lead.p} fill sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[21/10] lg:aspect-[3/2]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-night/10" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
            <p className="label text-ivory/75">An album, unbound</p>
            <div>
              <h2 id="collage-title" className="font-serif text-[clamp(2.4rem,4.6vw,4.8rem)] leading-[0.92] tracking-[-0.03em]" data-reveal="split">
                The whole day, <em className="text-stone">in pieces.</em>
              </h2>
              <p className="mt-4 hidden max-w-md text-sm text-ivory/80 sm:block md:text-base" data-reveal="fade">
                Details, portraits, ceremony, architecture, the dance floor — photographed the way you remember a wedding: in
                fragments that add up to a feeling.
              </p>
            </div>
          </div>
        </li>
        {rest.map((it) => (
          <li key={it.p.src} className="viewfinder group relative overflow-hidden" data-reveal="mask">
            <Pic
              p={it.p}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="aspect-[4/5] w-full lg:aspect-[3/4]"
              imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.05]"
            />
            <p className="label pointer-events-none absolute bottom-3 left-3 bg-ivory/90 px-2.5 py-1 text-ink md:bottom-4 md:left-4">{it.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
