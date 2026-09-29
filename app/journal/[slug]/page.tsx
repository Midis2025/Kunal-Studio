import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TLink } from "@/components/motion/PageTransition";
import JournalCard from "@/components/ui/JournalCard";
import JsonLd from "@/components/ui/JsonLd";
import Pic from "@/components/ui/Pic";
import { articles, formatDate, getArticle } from "@/data/journal";
import { getWedding } from "@/data/weddings";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.dek,
      publishedTime: a.date,
      images: [{ url: a.cover.src, width: a.cover.w, height: a.cover.h, alt: a.cover.alt }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = a.related ? getWedding(a.related) : undefined;
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <article>
      <JsonLd data={articleSchema(a)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: a.title, path: `/journal/${a.slug}` },
        ])}
      />

      <header data-theme="light" className="wrap pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <nav aria-label="Breadcrumb" className="label text-ash">
          <TLink href="/journal" className="link-draw inline-block py-3">
            Journal
          </TLink>
          <span aria-hidden> / </span>
          <span className="text-wine">{a.category}</span>
        </nav>
        <h1 className="mt-8 max-w-[18ch] font-serif t-display leading-[0.92] tracking-[-0.03em]" data-reveal="split">
          {a.title}
        </h1>
        <div className="mt-10 grid gap-6 border-t border-ink/10 pt-6 md:grid-cols-12">
          <p className="t-lead md:col-span-7">{a.dek}</p>
          <p className="label text-ash md:col-span-4 md:col-start-9 md:text-right">
            <time dateTime={a.date}>{formatDate(a.date)}</time>
            <br />
            {a.readMins} min read · Studio Kunal
          </p>
        </div>
      </header>

      <div data-hero className="mt-12 md:mt-16" data-theme="dark">
        <Pic p={a.cover} sizes="100vw" preload quality={85} className="max-h-[92svh] w-full" />
      </div>

      <div data-theme="light" className="wrap py-20 md:py-32">
        <div className="mx-auto max-w-[42rem] text-[1.075rem] leading-[1.8] text-ink/85">
          {a.body.map((b, i) => {
            switch (b.t) {
              case "p":
                return (
                  <p key={i} className={`mt-6 ${i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-serif first-letter:text-[5.6rem] first-letter:leading-[0.72] first-letter:text-ink" : ""}`}>
                    {b.text}
                  </p>
                );
              case "h":
                return (
                  <h2 key={i} className="mt-16 font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-ink">
                    {b.text}
                  </h2>
                );
              case "quote":
                return (
                  <blockquote key={i} className="my-16 border-l border-wine pl-6 md:pl-10">
                    <p className="font-serif text-[clamp(1.5rem,2.6vw,2.3rem)] italic leading-[1.2] text-ink">{b.text}</p>
                    {b.by && <footer className="label mt-4 text-ash">— {b.by}</footer>}
                  </blockquote>
                );
              case "img":
                return (
                  <figure key={i} className={`my-14 ${b.wide ? "md:mx-[calc((42rem-min(100vw-2*var(--gutter)-1rem,76rem))/2)]" : ""}`} data-reveal="mask">
                    <Pic p={b.p} sizes={b.wide ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 42rem, 100vw"} className="w-full" />
                    <figcaption className="label mt-3 text-ash">{b.p.alt}</figcaption>
                  </figure>
                );
              case "pair":
                return (
                  <div key={i} className="my-14 grid grid-cols-2 gap-[var(--gap)] md:mx-[calc((42rem-min(100vw-2*var(--gutter)-1rem,58rem))/2)]">
                    {b.p.map((p) => (
                      <figure key={p.src}>
                        <Pic p={p} sizes="(min-width: 768px) 30vw, 50vw" className="w-full" />
                        <figcaption className="label mt-3 text-ash">{p.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                );
            }
          })}
        </div>

        {related && (
          <aside className="mx-auto mt-20 max-w-[42rem] border-t border-ink/10 pt-10">
            <p className="label text-ash">From the portfolio</p>
            <TLink href={`/portfolio/${related.slug}`} className="group mt-4 flex items-center gap-6">
              <Pic p={related.cover} fill sizes="120px" className="aspect-square w-24 shrink-0" />
              <span>
                <span className="block font-serif t-h3 group-hover:italic">{related.couple}</span>
                <span className="cta">
                  View the story <span className="cta-arrow" aria-hidden>→</span>
                </span>
              </span>
            </TLink>
          </aside>
        )}
      </div>

      <section data-theme="light" className="wrap border-t border-ink/10 py-20 md:py-28" aria-label="More from the journal">
        <p className="label mb-10">Keep reading</p>
        <div className="grid gap-16 sm:grid-cols-2 md:gap-[var(--gutter)]">
          {more.map((m) => (
            <JournalCard key={m.slug} a={m} sizes="(min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </section>
    </article>
  );
}
