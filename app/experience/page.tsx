import type { Metadata } from "next";
import Process from "@/components/home/Process";
import { processSteps, studioFacts } from "@/data/process";
import { TLink } from "@/components/motion/PageTransition";
import JsonLd from "@/components/ui/JsonLd";
import Pic from "@/components/ui/Pic";
import { faq, studio } from "@/data/studio";
import { testimonials } from "@/data/testimonials";
import { photo } from "@/lib/photos";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Experience — Process, Investment, FAQ & Kind Words",
  description:
    "How working with Studio Kunal Photography feels: from first hello to your final gallery. Customised pricing, delivery timelines, destination weddings and words from our couples.",
  alternates: { canonical: "/experience" },
  openGraph: { images: [{ url: "/images/nooreen-jugraj/8.jpg", width: 2400, height: 1600 }] },
};

export default function ExperiencePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }])} />

      <header data-theme="light" className="wrap pb-16 pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+8rem)]">
        <p className="label" data-reveal="fade">
          The experience
        </p>
        <h1 className="mt-8 font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
          Less booking.
          <br />
          <em className="normal-case">More belonging.</em>
        </h1>
        <p className="mt-10 max-w-md text-ash md:ml-[50%]" data-reveal="fade">
          What it&rsquo;s like to work with us — the process, how pricing works, the questions couples ask most, and what they said
          afterwards.
        </p>
      </header>

      <Process id="process" steps={processSteps} facts={studioFacts} />

      <section id="investment" data-theme="dark" className="relative scroll-mt-20 overflow-hidden bg-night text-ivory grain">
        <div className="wrap grid gap-12 py-24 md:grid-cols-12 md:py-40">
          <div className="md:col-span-5">
            <p className="label text-ivory/60">Investment</p>
            <h2 className="mt-8 font-serif t-h2 leading-[0.95] tracking-[-0.02em]" data-reveal="split">
              No fixed packages. <em className="text-stone">A proposal written for you.</em>
            </h2>
            <p className="mt-10 max-w-md text-ivory/75" data-reveal="fade">
              {studio.pricing}
            </p>
            <TLink href="/contact" className="cta mt-10">
              Request a proposal <span className="cta-arrow" aria-hidden>→</span>
            </TLink>
          </div>
          <div className="md:col-span-6 md:col-start-7" data-reveal="mask">
            <Pic p={photo("nooreen-jugraj", 8, "A floral arch of deep red roses inside a white marquee")} sizes="(min-width: 768px) 50vw, 100vw" className="w-full" />
          </div>
        </div>
      </section>

      <section id="faq" data-theme="light" className="wrap grid scroll-mt-20 gap-12 py-24 md:grid-cols-12 md:py-40" aria-labelledby="faq-title">
        <div className="md:col-span-4">
          <p className="label">Questions</p>
          <h2 id="faq-title" className="mt-8 font-serif t-h2 tracking-[-0.02em]" data-reveal="split">
            Good to <em>know.</em>
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          {faq.map((f) => (
            <details key={f.q} className="group border-t border-ink/15 last:border-b">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-2xl transition-transform duration-500 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-8 text-ash">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="kind-words" data-theme="light" className="scroll-mt-20 bg-paper py-24 md:py-40" aria-labelledby="words-title">
        <div className="wrap">
          <p className="label">Kind words</p>
          <h2 id="words-title" className="mt-8 font-serif t-display uppercase leading-[0.9] tracking-[-0.03em]" data-reveal="split">
            In their <em className="normal-case">words.</em>
          </h2>
          <p className="mt-6 text-ash">Real reviews from real couples — lightly tidied for typos, never rewritten.</p>

          <ol className="mt-20 flex flex-col gap-24 md:gap-32">
            {testimonials.map((t) => (
              <li key={t.couple} className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-3">
                  <p className="font-serif t-h3">{t.couple}</p>
                  {t.context && <p className="label mt-3 text-ash">{t.context}</p>}
                  {t.story && (
                    <TLink href={`/portfolio/${t.story}`} className="cta mt-4">
                      View their story <span className="cta-arrow" aria-hidden>→</span>
                    </TLink>
                  )}
                </div>
                <figure className="md:col-span-8 md:col-start-5">
                  <blockquote>
                    <p className="font-serif text-[clamp(1.5rem,2.8vw,2.6rem)] leading-[1.15] tracking-[-0.01em]">
                      <span className="text-wine">&ldquo;</span>
                      {t.pull}
                      <span className="text-wine">&rdquo;</span>
                    </p>
                    <div className="mt-8 max-w-2xl space-y-4 text-ash">
                      {t.full.map((para, k) => (
                        <p key={k}>{para}</p>
                      ))}
                    </div>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-theme="light" className="wrap py-24 text-center md:py-36">
        <p className="label text-ash">Bookings open {studio.bookings}</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-serif t-h2" data-reveal="split">
          Ready when <em>you</em> are.
        </h2>
        <TLink href="/contact" className="cta mt-10">
          Begin the conversation <span className="cta-arrow" aria-hidden>→</span>
        </TLink>
      </section>
    </>
  );
}
