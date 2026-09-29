import { TLink } from "@/components/motion/PageTransition";
import Pic from "@/components/ui/Pic";
import { formatDate, type Article } from "@/data/journal";

export default function JournalCard({ a, feature, sizes }: { a: Article; feature?: boolean; sizes: string }) {
  return (
    <article className="group">
      <TLink href={`/journal/${a.slug}`} expand className="block">
        <div data-expand className="overflow-hidden" data-cursor="open">
          <Pic
            p={a.cover}
            fill
            sizes={sizes}
            className={feature ? "aspect-[4/5] w-full md:aspect-[3/2]" : "aspect-[4/5] w-full"}
            imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-film)] group-hover:scale-[1.04]"
          />
        </div>
        <div className={feature ? "mt-8 max-w-3xl" : "mt-5"}>
          <p className="label flex flex-wrap gap-x-3 text-ash">
            <span className="text-wine">{a.category}</span>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
            <span>{a.readMins} min read</span>
          </p>
          <h3 className={`mt-4 font-serif tracking-tight transition-[font-style] group-hover:italic ${feature ? "t-h2" : "t-h3"}`}>{a.title}</h3>
          <p className={`mt-4 text-ash ${feature ? "t-lead max-w-2xl" : "line-clamp-3"}`}>{a.dek}</p>
        </div>
      </TLink>
    </article>
  );
}
