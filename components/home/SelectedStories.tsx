import Marquee from "@/components/motion/Marquee";
import { TLink } from "@/components/motion/PageTransition";
import StoryMosaic, { type MosaicCard } from "@/components/story/StoryMosaic";

export default function SelectedStories({ cards }: { cards: MosaicCard[] }) {
  return (
    <section data-theme="light" className="relative pb-20 md:pb-28" aria-labelledby="stories-title">
      <h2 id="stories-title" className="sr-only">
        Selected stories
      </h2>

      {/* Title as an endless band of type */}
      <Marquee className="border-y border-ink/10 py-6 md:py-8" seconds={42}>
        {["Selected stories", "Weddings", "Pre-weddings", "Editorials", "Destinations"].map((w, i) => (
          <span key={w} className="flex items-center font-serif text-[clamp(3.2rem,9vw,9rem)] leading-none tracking-[-0.03em]">
            <span className={i % 2 ? "italic text-wine" : "uppercase"}>{w}</span>
            <span aria-hidden className="mx-[0.35em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-current opacity-40" />
          </span>
        ))}
      </Marquee>

      <div className="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between md:py-10">
        <p className="max-w-md text-ash" data-reveal="fade">
          A handful of the celebrations we&rsquo;ve had the privilege to tell — across Canada, Punjab and beyond.
        </p>
        <TLink href="/portfolio" className="cta">
          Explore the portfolio <span className="cta-arrow" aria-hidden>→</span>
        </TLink>
      </div>

      <StoryMosaic cards={cards} />
    </section>
  );
}
