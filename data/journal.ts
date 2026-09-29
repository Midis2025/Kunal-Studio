import { photo, type Photo } from "@/lib/photos";

// Editorial journal. Launch articles are written from the studio's own published
// philosophy, FAQ and real portfolio sessions — no invented facts, venues or clients.
// Review & edit before publishing; add new entries to the top of the array.

export type ArticleBlock =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "img"; p: Photo; wide?: boolean }
  | { t: "pair"; p: [Photo, Photo] }
  | { t: "quote"; text: string; by?: string };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Real Weddings" | "Destination" | "Planning" | "Photography Stories" | "Engagements";
  date: string; // ISO
  readMins: number;
  cover: Photo;
  body: ArticleBlock[];
  related?: string; // portfolio slug
};

export const articles: Article[] = [
  {
    slug: "two-continents-one-way-of-seeing",
    title: "Two continents, one way of seeing",
    dek: "Working between North America and India taught us that every tradition is different — and that the feeling underneath is always the same.",
    category: "Destination",
    date: "2026-09-22",
    readMins: 4,
    cover: photo("varinder-param", 7, "Varinder & Param embracing beneath a scalloped arch at dusk, Noor Mahal"),
    related: "varinder-param-noor-mahal",
    body: [
      { t: "p", text: "Studio Kunal works across North America and India, and travels wherever a story asks us to. People often ask what changes between the two. The honest answer: almost everything on the surface, and almost nothing underneath." },
      { t: "h", text: "Knowing the rituals before they happen" },
      { t: "p", text: "A Sikh Anand Karaj, a Hindu ceremony, a Mehndi evening, a Haldi morning — each has its own rhythm, its own quiet beats that are easy to miss if you don't know they're coming. Understanding those traditions is what lets us be in the right place without ever getting in the way." },
      { t: "img", p: photo("house-of-rituals", 7, "The first look at an Anand Karaj in India, softly out of focus"), wide: true },
      { t: "p", text: "We plan around the ceremony, not the other way round. That means learning your running order, the family moments that matter, and the rituals you want remembered in detail." },
      { t: "h", text: "The same light, different skies" },
      { t: "pair", p: [photo("raman-akash", 43, "Raman & Akash in light falling through arched windows, Punjab"), photo("nooreen-jugraj", 29, "Nooreen & Jugraj in a golden field in Canada")] },
      { t: "p", text: "A heritage haveli in Punjab and a summer field in Canada could not look more different. But we photograph both the same way: patiently, with natural light where we can, and with an eye for the moment between the poses." },
      { t: "quote", text: "Timeless storytelling, genuine emotions, and cinematic excellence — wherever the celebration happens." },
      { t: "p", text: "If you are planning a celebration across borders — or bringing family together from both sides of the world — we would love to hear about it." },
    ],
  },
  {
    slug: "deep-payal-toronto-pre-wedding",
    title: "Deep & Payal, among the arches",
    dek: "A Toronto pre-wedding shaped by Gothic stone, staircases and the warm glow of old lamps.",
    category: "Real Weddings",
    date: "2026-09-08",
    readMins: 3,
    cover: photo("deep-payal", 9, "Deep & Payal on a grand stone staircase, gown fanned across the steps"),
    related: "deep-payal",
    body: [
      { t: "p", text: "Some locations are backdrops. Others are characters. For Deep & Payal's pre-wedding session in Toronto, the architecture did half the storytelling — vaulted ceilings, carved balustrades and windows tall enough to pour light down an entire staircase." },
      { t: "img", p: photo("deep-payal", 18, "A kiss beneath a vaulted Gothic ceiling"), wide: true },
      { t: "h", text: "Scale as emotion" },
      { t: "p", text: "In spaces this grand, we often step back. A couple placed small within a vast frame reads as intimacy — the world is large, and they have found each other in it. Then we step in close, for the frames that feel like a held breath." },
      { t: "pair", p: [photo("deep-payal", 26, "A close embrace in lamplight"), photo("deep-payal", 36, "A black-and-white embrace by the window")] },
      { t: "quote", text: "Whenever we look at the photos, it genuinely feels like we are reliving those moments all over again.", by: "Deep & Payal" },
      { t: "p", text: "The session was also filmed — the 4K film lives alongside the full story in our portfolio." },
    ],
  },
  {
    slug: "from-enquiry-to-gallery",
    title: "From first hello to your final gallery",
    dek: "What working with us actually looks like — timelines, planning, and why every proposal is written from scratch.",
    category: "Planning",
    date: "2026-08-25",
    readMins: 4,
    cover: photo("nooreen-jugraj", 8, "A floral arch of red roses inside a white marquee"),
    body: [
      { t: "p", text: "Booking a photographer should feel like the start of a conversation, not a transaction. Here is how it works with Studio Kunal, from the first message to the moment your gallery arrives." },
      { t: "h", text: "01 — Connect" },
      { t: "p", text: "Tell us about your celebration through the enquiry form — the dates, the places, the traditions and the people. The more you share, the better we understand your vision. We'll come back to you to talk it through." },
      { t: "h", text: "02 — Create" },
      { t: "p", text: "Every event is different, so we don't publish fixed packages. Once we understand your plans, we write a customised proposal around your events, locations and the story you want told." },
      { t: "img", p: photo("nooreen-jugraj", 19, "A sandalwood fan inscribed with the couple's names and date"), wide: false },
      { t: "h", text: "03 — Experience" },
      { t: "p", text: "On the day, we guide when guidance helps and disappear when it doesn't. Many of our couples tell us they stopped noticing the camera — which is exactly the point." },
      { t: "h", text: "04 — Relive" },
      { t: "p", text: "Our standard delivery timeline for the final gallery is 10–12 weeks after your event. That time goes into careful review, selection and editing of every image, so the story holds together from the first frame to the last." },
      { t: "quote", text: "Everything was delivered promptly without compromising on quality.", by: "Jennifer & Vinayak" },
    ],
  },
  {
    slug: "the-small-things",
    title: "The small things",
    dek: "Fans inscribed with a date, a memorial table, a monogram — why we photograph the details at every celebration.",
    category: "Photography Stories",
    date: "2026-08-11",
    readMins: 3,
    cover: photo("nooreen-jugraj", 21, "A monogram of the couple's initials with the date"),
    related: "nooreen-jugraj",
    body: [
      { t: "p", text: "At Nooreen & Jugraj's engagement, guests found sandalwood fans inscribed with the couple's names and the date. Near the entrance, a table of framed photographs remembered family who could not be there." },
      { t: "pair", p: [photo("nooreen-jugraj", 10, "A memorial sign reading 'In loving memory'"), photo("nooreen-jugraj", 18, "Sandalwood fans laid out for guests")] },
      { t: "p", text: "These are the details couples spend months choosing and guests notice for a moment. We give them the time they deserve — because years later, they are what bring the whole day back." },
      { t: "img", p: photo("nooreen-jugraj", 59, "Nooreen & Jugraj in black and white beside a lone tree"), wide: true },
      { t: "p", text: "Documentary storytelling isn't only about the big moments. It's about the texture around them." },
    ],
  },
  {
    slug: "a-bridal-editorial-in-gold",
    title: "A bridal editorial in gold",
    dek: "Inside The Fashion Vault — an editorial study of ornament, texture and gesture.",
    category: "Photography Stories",
    date: "2026-07-28",
    readMins: 2,
    cover: photo("fashion-vault", 53, "A red lehenga spread in a circle, seen from above"),
    related: "the-fashion-vault",
    body: [
      { t: "p", text: "Not every story is a wedding. The Fashion Vault was an editorial — a chance to slow down and photograph bridal couture the way a fashion magazine would." },
      { t: "img", p: photo("fashion-vault", 31, "The bride beneath a red canopy before gilded panels"), wide: true },
      { t: "p", text: "Gilded panels and carved screens set the palette; the red of the lehenga did the rest. We worked through gesture — a hand at the necklace, a veil in the air, a glance downward — letting each frame carry one idea." },
      { t: "pair", p: [photo("fashion-vault", 48, "Maang tikka and veil in close-up"), photo("fashion-vault", 61, "Nose ring and jewellery in black and white")] },
      { t: "p", text: "Editorial work sharpens how we see on wedding days: every detail chosen, every detail photographed." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
