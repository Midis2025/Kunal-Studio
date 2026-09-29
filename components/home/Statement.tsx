import Eyebrow from "@/components/ui/Eyebrow";
import Pic from "@/components/ui/Pic";
import type { Photo } from "@/lib/photos";

/**
 * Philosophy statement. The three frames — portrait, wide, detail — sit in one
 * flush row of equal height (4:5 · 8:5 · 4:5 on a 3·6·3 grid), so their edges align.
 */
export default function Statement({ portrait, wide, detail }: { portrait: Photo; wide: Photo; detail: Photo }) {
  return (
    <section data-theme="light" className="relative pb-20 pt-24 md:pb-28 md:pt-36" aria-labelledby="statement-title">
      <div className="wrap">
        <Eyebrow>Philosophy</Eyebrow>
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 id="statement-title" className="font-serif t-display uppercase leading-[0.9] tracking-[-0.035em]" data-reveal="split">
            Not just how
            <br />
            it looked.
          </h2>
          <p className="font-serif t-display leading-[0.9] tracking-[-0.035em] md:text-right" data-reveal="split">
            <em className="text-wine">How it felt.</em>
          </p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-[var(--gap)] px-[var(--gap)] md:mt-16 md:grid-cols-12" data-reveal="stagger">
        <figure className="relative md:col-span-3">
          <Pic p={portrait} fill sizes="(min-width: 768px) 25vw, 50vw" className="aspect-[4/5] w-full" />
        </figure>
        <figure className="relative col-span-2 row-start-2 md:col-span-6 md:row-start-auto">
          <Pic p={wide} fill sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[8/5] w-full" />
        </figure>
        <figure className="relative md:col-span-3">
          <Pic p={detail} fill sizes="(min-width: 768px) 25vw, 50vw" className="aspect-[4/5] w-full" />
        </figure>
      </div>

      <div className="wrap mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
        <p className="label text-ash md:col-span-3 md:pt-3">Documentary · Editorial · Cinematic</p>
        <p className="font-serif text-[clamp(1.5rem,3.1vw,3rem)] leading-[1.18] tracking-[-0.015em] md:col-span-9" data-reveal="words">
          We don&rsquo;t direct your day — we pay attention to it. A documentary instinct for the moments that only happen once, an
          editorial eye for the portraits you&rsquo;ll want on the wall, and cinematic light shaped around your traditions rather than a
          template.
        </p>
      </div>
    </section>
  );
}
