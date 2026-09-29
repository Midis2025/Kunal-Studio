import { SITE_URL, studio } from "@/data/studio";
import type { Article } from "@/data/journal";
import type { Wedding } from "@/data/weddings";
import type { Photo } from "@/lib/photos";

const abs = (path: string) => new URL(path, SITE_URL).toString();

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": abs("/#studio"),
    name: studio.name,
    description: studio.description,
    url: SITE_URL,
    email: studio.email,
    telephone: studio.phoneE164,
    image: abs("/images/deep-payal/18.jpg"),
    logo: abs("/icon.svg"),
    priceRange: "Custom quotes",
    areaServed: [
      { "@type": "Place", name: "North America" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    knowsAbout: ["Wedding photography", "Wedding cinematography", "Pre-wedding photography", "Destination weddings", "Indian weddings"],
    sameAs: [studio.social.instagram, studio.social.youtube],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

const imageObject = (p: Photo) => ({
  "@type": "ImageObject",
  contentUrl: abs(p.src),
  width: p.w,
  height: p.h,
  caption: p.alt,
  creditText: studio.name,
  creator: { "@type": "Organization", name: studio.name },
  copyrightNotice: `© ${studio.name}`,
});

export function storySchema(w: Wedding) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${w.couple}${w.title ? ` — ${w.title}` : ""}`,
    description: w.seo,
    url: abs(`/portfolio/${w.slug}`),
    locationCreated: { "@type": "Place", name: w.location },
    author: { "@id": abs("/#studio") },
    image: [w.hero, ...w.frames.slice(0, 12)].map(imageObject),
  };
}

export function articleSchema(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    datePublished: a.date,
    dateModified: a.date,
    image: [imageObject(a.cover)],
    author: { "@type": "Organization", name: studio.name, url: SITE_URL },
    publisher: { "@id": abs("/#studio") },
    mainEntityOfPage: abs(`/journal/${a.slug}`),
    articleSection: a.category,
  };
}
