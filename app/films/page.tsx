import type { Metadata } from "next";
import FilmLibrary from "@/components/films/FilmLibrary";
import JsonLd from "@/components/ui/JsonLd";
import { films, ytPoster } from "@/data/films";
import { studio } from "@/data/studio";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Films — Cinematic Wedding & Pre-wedding Films",
  description:
    "Cinematic wedding highlight films, e-shoot and ceremony films by Studio Kunal Photography — stories in motion from Canada and India.",
  alternates: { canonical: "/films" },
  openGraph: { images: [{ url: ytPoster(films[0].id), width: 1280, height: 720 }] },
};

export default function FilmsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: films.map((f, i) => ({
      "@type": "VideoObject",
      position: i + 1,
      name: `${f.couple} — ${f.title}`,
      description: `${f.kind} by ${studio.name}${f.place ? `, ${f.place}` : ""}.`,
      thumbnailUrl: ytPoster(f.id),
      embedUrl: `https://www.youtube.com/embed/${f.id}`,
      contentUrl: `https://www.youtube.com/watch?v=${f.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Films", path: "/films" }])} />

      <section data-theme="dark" className="relative bg-night pt-[calc(var(--header-h)+5rem)] text-ivory md:pt-[calc(var(--header-h)+8rem)]">
        <div className="wrap">
          <p className="label text-ivory/60" data-reveal="fade">
            Cinematography
          </p>
          <h1 className="mt-8 font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
            Stories
            <br />
            <em className="normal-case text-stone">in motion.</em>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="font-serif text-2xl italic text-ivory/85 md:col-span-5 md:col-start-8" data-reveal="fade">
              Films made to bring you back — to the music, the voices, the way the light moved.
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <FilmLibrary films={films} youtube={studio.social.youtube} />
        </div>
      </section>
    </>
  );
}
