import type { Metadata } from "next";
import PortfolioIndex, { type Card } from "@/components/story/PortfolioIndex";
import JsonLd from "@/components/ui/JsonLd";
import { categories, storyCard, weddings } from "@/data/weddings";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio — Wedding, Pre-wedding & Editorial Stories",
  description:
    "Selected wedding, engagement, pre-wedding and editorial stories by Studio Kunal Photography — from Toronto to Punjab, photographed with documentary honesty and cinematic light.",
  alternates: { canonical: "/portfolio" },
  openGraph: { images: [{ url: "/images/fashion-vault/31.jpg", width: 2400, height: 1600 }] },
};

export default function PortfolioPage() {
  const cards: Card[] = weddings.map((w) => storyCard(w));

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />
      <header data-theme="light" className="wrap pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24 md:pt-[calc(var(--header-h)+8rem)]">
        <p className="label" data-reveal="fade">
          Portfolio — {weddings.length} stories
        </p>
        <h1 className="mt-8 font-serif t-mega uppercase leading-[0.86] tracking-[-0.04em]" data-reveal="split">
          Every frame
          <br />
          <em className="normal-case">holds a feeling.</em>
        </h1>
        <p className="mt-10 max-w-md text-ash md:ml-[50%]" data-reveal="fade">
          Weddings, engagements, pre-wedding sessions and editorials — each one curated as a short photo essay rather than a
          gallery dump. Choose a story and step inside.
        </p>
      </header>
      <PortfolioIndex cards={cards} filters={categories} />
    </>
  );
}
