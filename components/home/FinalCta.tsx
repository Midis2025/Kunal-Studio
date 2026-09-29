import { TLink } from "@/components/motion/PageTransition";
import Pic from "@/components/ui/Pic";
import { studio } from "@/data/studio";
import type { Photo } from "@/lib/photos";

export default function FinalCta({ p }: { p: Photo }) {
  return (
    <section data-theme="dark" className="relative flex min-h-[100svh] items-end overflow-hidden bg-night text-ivory" aria-labelledby="final-title">
      <div className="absolute inset-x-0 -inset-y-[10%]" data-speed="0.12">
        <Pic p={p} fill sizes="100vw" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/40" />

      <div className="wrap relative w-full pb-12 pt-40 md:pb-16">
        <h2 id="final-title" className="font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
          Some moments
          <br />
          <em className="normal-case">only happen once.</em>
        </h2>
        <div className="mt-12 flex flex-col gap-10 border-t border-ivory/20 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm font-serif text-xl italic text-ivory/85 md:text-2xl" data-reveal="fade">
            Let us preserve yours exactly as it felt.
          </p>
          <TLink href="/contact" className="cta text-base" data-reveal="fade">
            Tell us your story <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
          <p className="label text-ivory/70 md:text-right" data-reveal="fade">
            Bookings open
            <br />
            <span className="text-ivory">{studio.bookings}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
