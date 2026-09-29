import type { Metadata } from "next";
import { TLink } from "@/components/motion/PageTransition";
import Pic from "@/components/ui/Pic";
import { photo } from "@/lib/photos";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section data-theme="dark" className="relative flex min-h-svh items-end overflow-hidden bg-night text-ivory">
      <div className="absolute inset-0 opacity-60">
        <Pic p={photo("deep-payal", 34, "")} fill preload sizes="100vw" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/20" />
      <div className="wrap relative w-full pb-16 pt-40">
        <p className="label text-ivory/70">404 — A frame that didn&rsquo;t make the edit</p>
        <h1 className="mt-6 font-serif t-display leading-[0.92] tracking-[-0.03em]">
          This page has <em>wandered off.</em>
        </h1>
        <div className="mt-10 flex flex-wrap gap-8">
          <TLink href="/" className="cta">
            Back to the beginning <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
          <TLink href="/portfolio" className="cta">
            See the stories <span className="cta-arrow" aria-hidden>→</span>
          </TLink>
        </div>
      </div>
    </section>
  );
}
