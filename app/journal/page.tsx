import type { Metadata } from "next";
import JournalCard from "@/components/ui/JournalCard";
import JsonLd from "@/components/ui/JsonLd";
import { articles } from "@/data/journal";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal — Real Weddings, Destinations & Planning",
  description:
    "The Studio Kunal journal: real weddings, destination stories between North America and India, planning notes and photography stories worth returning to.",
  alternates: { canonical: "/journal" },
  openGraph: { images: [{ url: articles[0].cover.src, width: articles[0].cover.w, height: articles[0].cover.h }] },
};

export default function JournalPage() {
  const [lead, second, ...rest] = articles;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }])} />
      <header data-theme="light" className="wrap border-b border-ink/10 pb-12 pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+8rem)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
            Journal
          </h1>
          <p className="max-w-sm font-serif text-xl italic md:pb-4" data-reveal="fade">
            Stories worth returning to — real weddings, far-away places and notes from behind the camera.
          </p>
        </div>
        <p className="label mt-10 flex flex-wrap gap-x-6 gap-y-2 text-ash">
          <span>Issue {new Date().getFullYear()}</span>
          <span>{articles.length} entries</span>
          <span>Real Weddings · Destination · Planning · Photography Stories</span>
        </p>
      </header>

      <section data-theme="light" className="wrap py-16 md:py-24" aria-label="Journal entries">
        <div className="grid gap-16 md:grid-cols-12 md:gap-[var(--gutter)]">
          <div className="md:col-span-8">
            <JournalCard a={lead} feature sizes="(min-width: 768px) 66vw, 100vw" />
          </div>
          <div className="md:col-span-4 md:border-l md:border-ink/10 md:pl-[var(--gutter)]">
            <p className="label mb-6 text-ash">Also in this issue</p>
            <JournalCard a={second} sizes="(min-width: 768px) 30vw, 100vw" />
          </div>
        </div>

        <div className="mt-24 grid gap-16 border-t border-ink/10 pt-16 sm:grid-cols-2 md:mt-32 md:grid-cols-3 md:gap-[var(--gutter)]">
          {rest.map((a) => (
            <JournalCard key={a.slug} a={a} sizes="(min-width: 768px) 30vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      </section>
    </>
  );
}
