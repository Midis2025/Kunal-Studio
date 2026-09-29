import type { Metadata } from "next";
import Presence from "@/components/home/Presence";
import { TLink } from "@/components/motion/PageTransition";
import JsonLd from "@/components/ui/JsonLd";
import Pic from "@/components/ui/Pic";
import { studio } from "@/data/studio";
import { moments } from "@/data/weddings";
import { photo } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Kunal — Behind the Lens",
  description:
    "Meet Studio Kunal Photography: an international wedding photography and cinematography studio across North America and India, devoted to documentary storytelling, editorial portraiture and genuine emotion.",
  alternates: { canonical: "/about" },
  openGraph: { images: [{ url: "/images/raman-akash/43.jpg", width: 2400, height: 1600 }] },
};

const beliefs = [
  { k: "Timeless over trendy", v: "Colour, light and composition that will still feel honest when your grandchildren find the album." },
  { k: "Genuine over posed", v: "We guide when it helps. The rest of the time we watch closely, and wait for the real thing." },
  { k: "Culture, understood", v: "Anand Karaj, Hindu ceremonies, Mehndi, Haldi, receptions — we know where the moments are before they happen." },
  { k: "One story, two mediums", v: "Photography and film planned together, so stills and motion tell the same story from different angles." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <header data-theme="light" className="wrap grid gap-12 pb-24 pt-[calc(var(--header-h)+5rem)] md:grid-cols-12 md:pb-36 md:pt-[calc(var(--header-h)+8rem)]">
        <div className="md:col-span-7">
          <p className="label" data-reveal="fade">
            About the studio
          </p>
          <h1 className="mt-8 font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
            Behind
            <br />
            <em className="normal-case">the lens.</em>
          </h1>
          <p className="mt-12 max-w-xl t-lead" data-reveal="fade">
            {studio.about.split(". ")[0]}.
          </p>
          <p className="mt-6 max-w-lg text-ash" data-reveal="fade">
            {studio.about.split(". ").slice(1).join(". ")}
          </p>
          <p className="mt-10 font-serif text-4xl italic" data-reveal="fade">
            — Kunal
          </p>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:mt-24" data-speed="0.1">
          <div data-reveal="mask">
            <Pic p={photo("raman-akash", 42, "Raman & Akash in black and white, Punjab")} sizes="(min-width: 768px) 33vw, 100vw" preload className="w-full" />
          </div>
          <p className="label mt-3 text-ash">Through Kunal&rsquo;s lens — Punjab</p>
        </div>
      </header>

      <section data-theme="dark" className="relative bg-night py-24 text-ivory grain md:py-40">
        <div className="wrap">
          <p className="label text-ivory/60" data-reveal="fade">
            What we believe
          </p>
          <ol className="mt-16 grid gap-x-[var(--gutter)] gap-y-16 md:grid-cols-2">
            {beliefs.map((b) => (
              <li key={b.k} className="border-t border-ivory/15 pt-8" data-reveal="fade">
                <h2 className="font-serif t-h3">{b.k}</h2>
                <p className="mt-4 max-w-md text-ivory/70">{b.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-theme="light" className="wrap grid items-center gap-12 py-24 md:grid-cols-12 md:py-40">
        <div className="md:col-span-6" data-reveal="mask">
          <Pic p={moments.procession} sizes="(min-width: 768px) 50vw, 100vw" className="w-full" />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="font-serif t-h2 leading-[0.95] tracking-[-0.02em]" data-reveal="split">
            Documentary at heart. <em>Editorial by instinct.</em>
          </h2>
          <p className="mt-8 text-ash" data-reveal="fade">
            Most of your day unfolds without us saying a word — that&rsquo;s where the documentary work lives. Then, for a few
            quiet minutes, we step in and make portraits with the care of a fashion story. Both halves matter; together they
            make a record that feels like the day felt.
          </p>
          <p className="mt-6 text-ash" data-reveal="fade">
            One couple told us Kunal became &ldquo;like family&rdquo; over the course of their celebrations — calm, patient, and
            always a step ahead of the moment.
          </p>
          <TLink href="/portfolio" className="cta mt-10">
            See the stories <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
        </div>
      </section>

      <Presence
        na={[photo("deep-payal", 31, "Deep & Payal in a sunlit cloister, Toronto"), photo("akshita-rajat", 5, "Akshita & Rajat on a downtown Toronto street")]}
        india={[photo("house-of-rituals", 2, "A bride carrying a ceremonial tray, India"), photo("varinder-param", 8, "Portrait beneath an arch at Noor Mahal")]}
      />

      <section data-theme="light" className="wrap py-24 text-center md:py-40">
        <h2 className="mx-auto max-w-4xl font-serif t-h2 leading-[0.98]" data-reveal="split">
          We&rsquo;d love to hear <em>your</em> story.
        </h2>
        <TLink href="/contact" className="cta mt-10">
          Start a conversation <span className="cta-arrow" aria-hidden>→</span>
        </TLink>
      </section>
    </>
  );
}
