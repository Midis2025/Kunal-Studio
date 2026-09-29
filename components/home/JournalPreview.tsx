import { TLink } from "@/components/motion/PageTransition";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import Pic from "@/components/ui/Pic";
import { formatDate, type Article } from "@/data/journal";

function Cover({ a, lead }: { a: Article; lead?: boolean }) {
  return (
    <article className={`viewfinder group relative overflow-hidden text-ivory ${lead ? "lg:row-span-2" : ""}`} data-theme="dark">
      <TLink href={`/journal/${a.slug}`} expand className="block h-full">
        <div data-expand data-cursor="open" className={`relative h-full ${lead ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[44rem]" : "aspect-[16/10] lg:aspect-auto lg:min-h-0"}`}>
          <Pic
            p={a.cover}
            fill
            sizes={lead ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="h-full w-full"
            imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-8">
          <p className="label flex flex-wrap gap-x-3 gap-y-1 text-ivory/75">
            <span className="text-stone">{a.category}</span>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
          </p>
          <h3 className={`mt-3 max-w-[22ch] font-serif leading-[0.98] tracking-tight transition-[font-style] group-hover:italic ${lead ? "t-h2" : "t-h3"}`}>
            {a.title}
          </h3>
          {lead && <p className="mt-4 hidden max-w-lg text-ivory/80 sm:block">{a.dek}</p>}
          <span className="cta mt-3">
            Read the story <span className="cta-arrow" aria-hidden>→</span>
          </span>
        </div>
      </TLink>
    </article>
  );
}

/**
 * The journal as a magazine cover spread: one lead story beside two covers,
 * all flush on the shared gutter, followed by a contents-page index.
 */
export default function JournalPreview({ articles }: { articles: Article[] }) {
  const [lead, ...rest] = articles;
  const covers = rest.slice(0, 2);
  const index = rest.slice(2);

  return (
    <section data-theme="light" className="relative py-20 md:py-28" aria-labelledby="journal-title">
      {/* Magazine masthead */}
      <div className="wrap">
        <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-ink py-3">
          <span>The Studio Kunal Journal</span>
          <span className="hidden text-ash sm:inline">Real weddings · Destinations · Planning · Photography</span>
          <span>Issue {new Date().getFullYear()}</span>
        </div>
        <h2 id="journal-title" className="py-4 text-center font-serif text-[clamp(4.2rem,19vw,22rem)] leading-[0.82] tracking-[-0.045em] md:py-6" data-reveal="chars">
          Journal
        </h2>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink pt-4 sm:flex-row">
          <p className="font-serif text-xl italic md:text-2xl">Stories worth returning to.</p>
          <TLink href="/journal" className="cta">
            All entries <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
        </div>
      </div>

      <div className="mt-[var(--gap)] grid gap-[var(--gap)] px-[var(--gap)] lg:grid-cols-[2fr_1fr] lg:grid-rows-2" data-reveal="stagger">
        <Cover a={lead} lead />
        {covers.map((a) => (
          <Cover key={a.slug} a={a} />
        ))}
      </div>

      {index.length > 0 && (
        <div className="wrap mt-12 md:mt-16">
          <p className="label mb-4 text-ash">Also in this issue</p>
          <HoverPreviewList
            rows={index.map((a) => ({ href: `/journal/${a.slug}`, title: a.title, kicker: a.category, meta: formatDate(a.date), image: a.cover }))}
          />
        </div>
      )}
    </section>
  );
}
