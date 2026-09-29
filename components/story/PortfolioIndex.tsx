"use client";

import { useMemo, useState } from "react";
import StoryMosaic, { type MosaicCard } from "@/components/story/StoryMosaic";
import HoverPreviewList from "@/components/ui/HoverPreviewList";
import type { Category } from "@/data/weddings";

export type Card = MosaicCard & { categories: Category[] };
type Filter = { id: Category | "all"; label: string };

export default function PortfolioIndex({ cards, filters }: { cards: Card[]; filters: Filter[] }) {
  const [filter, setFilter] = useState<Filter["id"]>("all");
  const [view, setView] = useState<"grid" | "index">("grid");
  const shown = useMemo(() => (filter === "all" ? cards : cards.filter((c) => c.categories.includes(filter as Category))), [cards, filter]);

  return (
    <>
      <div className="wrap sticky top-0 z-20 -mt-px flex items-center justify-between gap-4 border-y border-ink/10 bg-ivory/90 backdrop-blur-sm">
        <div role="group" aria-label="Filter stories" className="no-scrollbar -mx-2 flex min-w-0 gap-1 overflow-x-auto py-2 sm:gap-4">
          {filters.map((f) => {
            const count = f.id === "all" ? cards.length : cards.filter((c) => c.categories.includes(f.id as Category)).length;
            if (!count) return null;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`label flex h-11 shrink-0 items-center px-2 transition-colors ${filter === f.id ? "text-ink" : "text-ash hover:text-ink"}`}
              >
                <span className={filter === f.id ? "link-line" : ""}>{f.label}</span>
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Layout" className="flex shrink-0 items-center border-l border-ink/10 pl-3">
          {(["grid", "index"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`label flex h-11 items-center px-2 transition-colors ${view === v ? "text-ink" : "text-ash hover:text-ink"}`}
            >
              <span className={view === v ? "link-line" : ""}>{v === "grid" ? "Grid" : "Index"}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "story" : "stories"} as {view === "grid" ? "a photo grid" : "an index list"}
      </p>

      <div key={`${filter}-${view}`} className="animate-[lbIn_0.8s_var(--ease-film)] pb-24 pt-[var(--gap)] md:pb-32">
        {view === "grid" ? (
          <StoryMosaic cards={shown} />
        ) : (
          <div className="wrap pt-8 md:pt-12">
            <HoverPreviewList
              large
              rows={shown.map((c) => ({
                href: `/portfolio/${c.slug}`,
                title: c.couple,
                kicker: c.kind,
                meta: [c.location, c.year].filter(Boolean).join(" · "),
                image: c.portrait,
              }))}
            />
          </div>
        )}
      </div>
    </>
  );
}
