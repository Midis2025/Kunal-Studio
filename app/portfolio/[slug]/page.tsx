import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TLink } from "@/components/motion/PageTransition";
import StoryBlocks from "@/components/story/StoryBlocks";
import StoryViewer from "@/components/story/StoryViewer";
import JsonLd from "@/components/ui/JsonLd";
import Pic from "@/components/ui/Pic";
import { getWedding, nextWedding, weddings, type Block } from "@/data/weddings";
import type { Photo } from "@/lib/photos";
import { breadcrumbSchema, storySchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return weddings.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) return {};
  const name = `${w.couple}${w.title ? ` — ${w.title}` : ""}`;
  return {
    title: `${name} · ${w.location}`,
    description: w.seo,
    alternates: { canonical: `/portfolio/${w.slug}` },
    openGraph: { type: "article", title: name, description: w.seo, images: [{ url: w.hero.src, width: w.hero.w, height: w.hero.h, alt: w.hero.alt }] },
  };
}

const blockPhotos = (b: Block): Photo[] =>
  "p" in b ? (Array.isArray(b.p) ? b.p : [b.p]) : [];

export default async function StoryPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) notFound();
  const next = nextWedding(slug);

  // Lightbox set: every frame, with the curated captions where we have them.
  const curated = new Map([w.hero, ...w.blocks.flatMap(blockPhotos)].map((p) => [p.src, p]));
  const frames = w.frames.map((f) => curated.get(f.src) ?? f);

  return (
    <article>
      <JsonLd data={storySchema(w)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: w.couple, path: `/portfolio/${w.slug}` },
        ])}
      />

      {/* Opening frame */}
      <header data-theme="dark" className="relative h-[100svh] min-h-[32rem] overflow-hidden bg-night text-ivory">
        <div data-hero className="absolute inset-0">
          <Pic p={w.hero} fill preload sizes="100vw" quality={85} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/5 to-night/30" />
        <div className="wrap absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <nav aria-label="Breadcrumb" className="label mb-6 text-ivory/70">
            <TLink href="/portfolio" className="link-draw inline-block py-3">
              Portfolio
            </TLink>
            <span aria-hidden> / </span>
            <span aria-current="page">{w.couple}</span>
          </nav>
          <h1 className="font-serif t-mega leading-[0.88] tracking-[-0.04em]" data-reveal="split">
            {w.couple}
          </h1>
          {w.title && (
            <p className="mt-4 font-serif text-[clamp(1.3rem,2.6vw,2.4rem)] italic text-ivory/90" data-reveal="fade">
              {w.title}
            </p>
          )}
        </div>
      </header>

      {/* Story intro */}
      <section data-theme="light" className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-32">
        <dl className="grid grid-cols-2 gap-6 self-start md:col-span-4 md:grid-cols-1" data-reveal="stagger">
          <div>
            <dt className="label text-ash">Location</dt>
            <dd className="mt-2 font-serif text-xl">{w.location}</dd>
          </div>
          <div>
            <dt className="label text-ash">Occasion</dt>
            <dd className="mt-2 font-serif text-xl">{w.kind}</dd>
          </div>
          {w.year && (
            <div>
              <dt className="label text-ash">Year</dt>
              <dd className="mt-2 font-serif text-xl">{w.year}</dd>
            </div>
          )}
          <div>
            <dt className="label text-ash">Frames</dt>
            <dd className="mt-2 font-serif text-xl">{frames.length}</dd>
          </div>
        </dl>
        <div className="md:col-span-7 md:col-start-6">
          {w.intro.map((para, i) => (
            <p key={i} className={i === 0 ? "t-lead" : "mt-6 max-w-xl text-ash"} data-reveal="fade">
              {para}
            </p>
          ))}
        </div>
      </section>

      <StoryViewer frames={frames} title={w.couple}>
        <StoryBlocks blocks={w.blocks} couple={w.couple} />

        {/* Index of frames */}
        <section data-theme="light" className="wrap mt-20 border-t border-ink/10 pt-14 md:mt-28" aria-labelledby="index-title">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="index-title" className="font-serif t-h3">
              The full set <em className="text-ash">— {frames.length} frames</em>
            </h2>
            <p className="label text-ash">Select any frame to view it large</p>
          </div>
          <ul className="mt-10 grid grid-cols-4 gap-[var(--gap)] sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {frames.map((f, i) => (
              <li key={f.src}>
                <button type="button" data-lb={f.src} data-cursor="view" aria-label={`Open frame ${i + 1} of ${frames.length}`} className="group block w-full">
                  <Pic
                    p={f}
                    fill
                    sizes="(min-width: 1024px) 10vw, (min-width: 640px) 16vw, 25vw"
                    quality={60}
                    className="aspect-square w-full"
                    imgClassName="opacity-90 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </StoryViewer>

      {/* Next story */}
      <nav aria-label="Next story" className="mt-20 md:mt-28" data-theme="dark">
        <TLink href={`/portfolio/${next.slug}`} expand className="group relative block h-[80svh] min-h-[26rem] overflow-hidden text-ivory">
          <div data-expand data-cursor="view" className="absolute inset-0">
            <Pic
              p={next.hero}
              fill
              sizes="100vw"
              className="h-full w-full"
              imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-film)] group-hover:scale-[1.04]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-night/45 transition-colors duration-700 group-hover:bg-night/30" />
          <div className="wrap pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="label">Next story →</p>
            <p className="mt-6 font-serif t-display leading-[0.9] tracking-[-0.03em] group-hover:italic">{next.couple}</p>
            <p className="label mt-6 text-ivory/80">
              {next.location} · {next.kind}
            </p>
          </div>
        </TLink>
      </nav>
    </article>
  );
}
