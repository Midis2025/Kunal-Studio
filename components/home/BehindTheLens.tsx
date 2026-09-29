import { TLink } from "@/components/motion/PageTransition";
import Eyebrow from "@/components/ui/Eyebrow";
import Pic from "@/components/ui/Pic";
import type { Photo } from "@/lib/photos";

/**
 * `portrait` should be a photograph of Kunal. Until one is supplied, a frame of
 * his work stands in — captioned honestly as such, never presented as him.
 */
export default function BehindTheLens({ portrait, isFounder }: { portrait: Photo; isFounder: boolean }) {
  return (
    <section data-theme="light" className="wrap relative grid gap-12 py-24 md:grid-cols-12 md:gap-[var(--gutter)] md:py-40" aria-labelledby="lens-title">
      <div className="md:col-span-5 md:row-span-2">
        <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
          <div data-reveal="mask">
            <Pic p={portrait} sizes="(min-width: 768px) 40vw, 100vw" className="w-full" />
          </div>
          <p className="label mt-3 text-ash">{isFounder ? "Kunal — Founder & Lead Photographer" : "Through Kunal's lens — Raman & Akash, Punjab"}</p>
        </div>
      </div>

      <div className="md:col-span-6 md:col-start-7 md:pt-16">
        <Eyebrow>About the studio</Eyebrow>
        <h2 id="lens-title" className="mt-8 font-serif t-display uppercase leading-[0.9] tracking-[-0.035em]" data-reveal="split">
          Behind
          <br />
          <em className="normal-case">the lens</em>
        </h2>

        <p className="mt-12 t-lead" data-reveal="fade">
          Studio Kunal is an international wedding photography and cinematography studio, rooted across North America and India —
          and happiest wherever a story asks us to go.
        </p>

        <dl className="mt-14 grid gap-x-10 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-2" data-reveal="stagger">
          <div>
            <dt className="label text-wine">Two homes</dt>
            <dd className="mt-3 text-ash">North America and India, with seamless photography and film for couples worldwide.</dd>
          </div>
          <div>
            <dt className="label text-wine">Many traditions</dt>
            <dd className="mt-3 text-ash">
              A deep understanding of diverse cultures, rituals and wedding celebrations — so we&rsquo;re ready for the moment before it
              arrives.
            </dd>
          </div>
          <div>
            <dt className="label text-wine">Documentary &amp; editorial</dt>
            <dd className="mt-3 text-ash">Unscripted storytelling through the day, and portraits with the composure of a fashion story.</dd>
          </div>
          <div>
            <dt className="label text-wine">Real emotion</dt>
            <dd className="mt-3 text-ash">Timeless over trendy. Genuine over posed. Photographs that still feel like you in thirty years.</dd>
          </div>
        </dl>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6" data-reveal="fade">
          <p className="font-serif text-4xl italic">— Kunal</p>
          <TLink href="/about" className="cta">
            Meet Kunal <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
        </div>
      </div>
    </section>
  );
}
