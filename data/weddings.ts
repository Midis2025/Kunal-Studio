import { allFrames, photo, type Photo } from "@/lib/photos";

// Portfolio stories migrated from studiokunalphotography.com.
// Couple names, places and occasions come from the original gallery titles, film titles,
// testimonials, or what is visibly in the photographs. Nothing else is invented —
// when a fact is unknown (e.g. a year), the field is simply omitted.

export type Category = "weddings" | "pre-weddings" | "engagements" | "editorial" | "destinations";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
  { id: "pre-weddings", label: "Pre-weddings" },
  { id: "engagements", label: "Engagements" },
  { id: "editorial", label: "Editorial" },
  { id: "destinations", label: "Destinations" },
];

export type Block =
  | { t: "wide"; p: Photo }
  | { t: "pair"; p: [Photo, Photo] }
  | { t: "detail"; p: Photo; note: string }
  | { t: "full"; p: Photo }
  | { t: "trio"; p: [Photo, Photo, Photo] }
  | { t: "quote"; text: string; by?: string }
  | { t: "sequence"; p: Photo[]; label: string }
  | { t: "film"; id: string; title: string }
  | { t: "final"; p: Photo };

export type Wedding = {
  slug: string;
  legacyPath: string;
  couple: string;
  title?: string;
  location: string;
  region: "North America" | "India";
  kind: string;
  categories: Category[];
  year?: string;
  intro: string[];
  hero: Photo;
  cover: Photo; // used in listings
  reveal: Photo; // secondary image revealed on hover
  blocks: Block[];
  frames: Photo[]; // the complete (de-duplicated) set for the index + lightbox
  seo: string;
};

const dp = (n: number, alt: string, pos?: string) => photo("deep-payal", n, `Deep & Payal — ${alt}`, { pos });
const am = (n: number, alt: string, pos?: string) => photo("aman-mrinal", n, `Aman & Mrinal — ${alt}`, { pos });
const nj = (n: number, alt: string, pos?: string) => photo("nooreen-jugraj", n, `Nooreen & Jugraj — ${alt}`, { pos });
const ra = (n: number, alt: string, pos?: string) => photo("raman-akash", n, `Raman & Akash — ${alt}`, { pos });
const vp = (n: number, alt: string, pos?: string) => photo("varinder-param", n, `Varinder & Param — ${alt}`, { pos });
const hr = (n: number, alt: string, pos?: string) => photo("house-of-rituals", n, `The House of Rituals — ${alt}`, { pos });
const fv = (n: number, alt: string, pos?: string) => photo("fashion-vault", n, `The Fashion Vault — ${alt}`, { pos });
const ar = (n: number, alt: string, pos?: string) => photo("akshita-rajat", n, `Akshita & Rajat — ${alt}`, { pos });

export const weddings: Wedding[] = [
  {
    slug: "deep-payal",
    legacyPath: "/deep-payal",
    couple: "Deep & Payal",
    location: "Toronto, Canada",
    region: "North America",
    kind: "Pre-wedding",
    categories: ["pre-weddings"],
    intro: [
      "A pre-wedding story told among Gothic arches, worn stone staircases and the amber hush of old lamplight.",
      "We let the architecture do what it does best — make two people look very small, and very certain of each other.",
    ],
    hero: dp(18, "a kiss framed beneath a vaulted Gothic ceiling and a tall stained-glass window"),
    cover: dp(9, "the bride's gown spilling down a stone staircase while the groom waits by the window"),
    reveal: dp(26, "a close embrace, eyes closed"),
    blocks: [
      { t: "wide", p: dp(7, "the couple on a grand staircase, the gown fanned across the steps") },
      { t: "pair", p: [dp(2, "the groom offering his hand on the stairs"), dp(4, "a first dance beneath a chandelier")] },
      { t: "detail", p: dp(26, "a quiet embrace in lamplight"), note: "Between the frames — the moment they forgot we were there." },
      { t: "full", p: dp(25, "a globe lamp glowing over the staircase as the bride waits below") },
      { t: "trio", p: [dp(12, "an embrace in an arched corridor"), dp(20, "standing together beside carved stone"), dp(31, "the bride in a sunlit cloister")] },
      { t: "quote", text: "Whenever we look at the photos, it genuinely feels like we are reliving those moments all over again.", by: "Deep & Payal" },
      { t: "full", p: dp(36, "a black-and-white embrace against tall leaded windows") },
      { t: "film", id: "ZT4f1XDbmDg", title: "Deep & Payal — Toronto, in 4K" },
      { t: "final", p: dp(34, "walking away together through a long vaulted cloister") },
    ],
    frames: allFrames("deep-payal", "Deep & Payal pre-wedding in Toronto", [29, 33]),
    seo: "Deep & Payal's pre-wedding session in Toronto — Gothic architecture, lamplight and cinematic storytelling by Studio Kunal Photography.",
  },
  {
    slug: "nooreen-jugraj",
    legacyPath: "/nooreen-jugraj",
    couple: "Nooreen & Jugraj",
    location: "Canada",
    region: "North America",
    kind: "Engagement Ceremony",
    categories: ["engagements"],
    year: "2025",
    intro: [
      "An engagement in open country — a lone tree, a field turning gold, and a red lehenga moving through the grass.",
      "Inside, a floral arch, framed photographs of family who were there in spirit, and fans inscribed with the date.",
    ],
    hero: nj(29, "the couple standing in a golden field beside a lone tree"),
    cover: nj(29, "the couple standing in a golden field beside a lone tree"),
    reveal: nj(42, "a close portrait, cheek to cheek"),
    blocks: [
      { t: "wide", p: nj(8, "a floral arch of deep red roses inside a white marquee") },
      { t: "pair", p: [nj(1, "the couple beneath open sky"), nj(24, "Nooreen in a red lehenga, looking over her shoulder")] },
      { t: "detail", p: nj(19, "a sandalwood fan inscribed with the couple's names and date"), note: "Nooreen & Jugraj · 07.05.2025 — the small things guests take home." },
      { t: "full", p: nj(59, "a black-and-white portrait of the couple, the lone tree behind them") },
      { t: "trio", p: [nj(42, "cheek to cheek"), nj(38, "laughing together in the field"), nj(69, "the bride adorned during the ceremony")] },
      { t: "quote", text: "In loving memory of all those who could not be here today, but are forever present in our hearts.", by: "The memorial table" },
      { t: "wide", p: nj(46, "the couple with family on the lawn") },
      { t: "pair", p: [nj(70, "golden hour across the field"), nj(71, "foreheads touching at sunset")] },
      { t: "film", id: "MkhER4Ob6dA", title: "Jugraj & Nooreen — Engagement Ceremony" },
      { t: "final", p: nj(73, "a black-and-white embrace at the edge of the field") },
    ],
    frames: allFrames("nooreen-jugraj", "Nooreen & Jugraj engagement ceremony", [41, 64, 67]),
    seo: "Nooreen & Jugraj's engagement ceremony in Canada — golden fields, family and detail, photographed by Studio Kunal Photography.",
  },
  {
    slug: "raman-akash-punjab",
    legacyPath: "/raman-akash-love-straight-outta-panjab",
    couple: "Raman & Akash",
    title: "Love, Straight Outta Panjab",
    location: "Punjab, India",
    region: "India",
    kind: "Pre-wedding",
    categories: ["pre-weddings", "destinations"],
    intro: [
      "Brick arches, carved wooden doors, a white horse and afternoon light falling through tall windows — Punjab, dressed in white.",
      "A story about stillness and movement: one of them waits in the frame while the other walks through it.",
    ],
    hero: ra(43, "light falling through tall arched windows onto the couple"),
    cover: ra(43, "light falling through tall arched windows onto the couple"),
    reveal: ra(9, "a black-and-white close-up, faces side by side"),
    blocks: [
      { t: "wide", p: ra(15, "the couple beneath an old tree beside an earthen arch") },
      { t: "pair", p: [ra(1, "leaning together in a brick doorway"), ra(3, "resting against an old carved door")] },
      { t: "detail", p: ra(9, "faces side by side in black and white"), note: "Close enough to hear the other breathe." },
      { t: "full", p: ra(20, "a white horse passing, blurred, in the foreground") },
      { t: "trio", p: [ra(21, "with the white horse under a tree"), ra(12, "the bride in white, smiling"), ra(29, "a touch at the chin, black and white")] },
      { t: "sequence", label: "One doorway, one minute", p: [ra(31, "motion study one"), ra(33, "motion study two"), ra(35, "motion study three"), ra(37, "motion study four"), ra(39, "motion study five")] },
      { t: "quote", text: "Stay where you are. Let the world walk past." },
      { t: "wide", p: ra(26, "standing before a great wooden door in a saffron wall") },
      { t: "pair", p: [ra(23, "seated in a window alcove"), ra(24, "sharing a quiet laugh in the alcove")] },
      { t: "final", p: ra(44, "a proposal in the arched gallery") },
    ],
    frames: allFrames("raman-akash", "Raman & Akash pre-wedding in Punjab", [38]),
    seo: "Raman & Akash's pre-wedding in Punjab, India — heritage arches, a white horse and cinematic light by Studio Kunal Photography.",
  },
  {
    slug: "the-fashion-vault",
    legacyPath: "/the-fashion-vault",
    couple: "The Fashion Vault",
    title: "A Bridal Editorial",
    location: "Studio",
    region: "North America",
    kind: "Bridal Editorial",
    categories: ["editorial"],
    intro: [
      "Gilded panels, carved screens and an heirloom-red lehenga — an editorial study in texture, ornament and gesture.",
      "Shot as a fashion story rather than a wedding: slow, deliberate, and entirely about the details.",
    ],
    hero: fv(31, "the bride seated beneath a red canopy before gilded panels"),
    cover: fv(5, "the bride looking down, hand to her jewellery"),
    reveal: fv(48, "a close portrait beneath a red veil"),
    blocks: [
      { t: "wide", p: fv(1, "the bride before gilded carved panels") },
      { t: "pair", p: [fv(5, "a downward glance, hand at the necklace"), fv(16, "a gentle smile beside the golden screen")] },
      { t: "detail", p: fv(48, "the maang tikka and veil in close-up"), note: "Gold, glass and thread — every piece chosen, every piece photographed." },
      { t: "full", p: fv(53, "the lehenga spread in a circle, seen from above") },
      { t: "sequence", label: "The veil, falling", p: [fv(33, "veil study one"), fv(35, "veil study two"), fv(37, "veil study three"), fv(40, "veil study four"), fv(44, "veil study five")] },
      { t: "trio", p: [fv(50, "eyes lowered beneath the veil"), fv(52, "adjusting the dupatta"), fv(63, "a nose ring in black and white")] },
      { t: "wide", p: fv(62, "a close portrait in warm red light") },
      { t: "pair", p: [fv(57, "turning, the lehenga in motion"), fv(56, "standing among white flowers and chandeliers")] },
      { t: "final", p: fv(64, "the full bridal look in a dark carved room") },
    ],
    frames: allFrames("fashion-vault", "The Fashion Vault bridal editorial", [8, 11, 21, 34, 36, 38, 41, 42, 43, 45, 46, 47]),
    seo: "The Fashion Vault — a bridal fashion editorial of gold, ornament and red couture by Studio Kunal Photography.",
  },
  {
    slug: "aman-mrinal",
    legacyPath: "/aman-mrinal",
    couple: "Aman & Mrinal",
    location: "Toronto, Canada",
    region: "North America",
    kind: "Pre-wedding",
    categories: ["pre-weddings"],
    intro: [
      "Three chapters in one day: a windswept beach, a neon arcade, and the city skyline at golden hour.",
      "Less posing, more playing — the kind of session where the laughter is the point.",
    ],
    hero: am(12, "lying together on the sand at the water's edge", "50% 78%"),
    cover: am(11, "Aman lifting Mrinal against a wide blue sky"),
    reveal: am(16, "a kiss beneath a neon sign"),
    blocks: [
      { t: "wide", p: am(27, "a playful duel in the arcade") },
      { t: "pair", p: [am(4, "laughing together on the beach"), am(5, "walking along the shoreline")] },
      { t: "detail", p: am(13, "resting on the sand"), note: "Chapter one — salt air and cold toes." },
      { t: "full", p: am(22, "a triumphant high-five in the arcade") },
      { t: "trio", p: [am(16, "a kiss beneath neon"), am(17, "riding an arcade motorbike"), am(19, "celebrating a win")] },
      { t: "quote", text: "Some sessions are for stillness. This one was for play." },
      { t: "pair", p: [am(30, "Mrinal in pink before the Toronto skyline"), am(36, "crossing the street together at dusk")] },
      { t: "film", id: "4djvYWzA-LY", title: "Aman & Mrinal — With You" },
      { t: "final", p: am(35, "seated before the CN Tower at golden hour") },
    ],
    frames: allFrames("aman-mrinal", "Aman & Mrinal pre-wedding in Toronto"),
    seo: "Aman & Mrinal's Toronto pre-wedding — beach, arcade and skyline, photographed and filmed by Studio Kunal Photography.",
  },
  {
    slug: "varinder-param-noor-mahal",
    legacyPath: "/varinder-param-at-noor-mahal",
    couple: "Varinder & Param",
    title: "At Noor Mahal",
    location: "Noor Mahal, India",
    region: "India",
    kind: "Couple Portraits",
    categories: ["pre-weddings", "destinations"],
    intro: [
      "Domes and scalloped arches at the last minute of light. A palace becomes a silhouette; two people become the only warm thing in the frame.",
    ],
    hero: vp(1, "the couple beside a reflecting pool before palace domes at dusk"),
    cover: vp(7, "an embrace framed by a scalloped arch at dusk"),
    reveal: vp(5, "a kiss beneath an ornate arch"),
    blocks: [
      { t: "wide", p: vp(7, "an embrace framed by a scalloped arch at dusk") },
      { t: "pair", p: [vp(2, "standing beneath a domed pavilion"), vp(5, "a kiss beneath an ornate arch")] },
      { t: "full", p: vp(6, "the couple before domes against an orange sky") },
      { t: "trio", p: [vp(3, "a pavilion lit from within"), vp(8, "portrait beneath the arch"), vp(10, "the pavilion from below")] },
      { t: "final", p: vp(9, "in the courtyard, surrounded by painted arches") },
    ],
    frames: allFrames("varinder-param", "Varinder & Param at Noor Mahal", [10]),
    seo: "Varinder & Param at Noor Mahal, India — twilight couple portraits among palace domes by Studio Kunal Photography.",
  },
  {
    slug: "house-of-rituals-india",
    legacyPath: "/the-house-of-rituals-india",
    couple: "The House of Rituals",
    title: "An Anand Karaj",
    location: "India",
    region: "India",
    kind: "Wedding",
    categories: ["weddings", "destinations"],
    intro: [
      "A wedding in white and blush — rose petals in the air, kirtan in the room, and a first look caught through soft focus.",
    ],
    hero: hr(10, "the couple walking through a shower of petals"),
    cover: hr(1, "rose petals falling over the couple beneath a white canopy"),
    reveal: hr(7, "the first look, softly out of focus"),
    blocks: [
      { t: "pair", p: [hr(2, "the bride carrying a ceremonial tray"), hr(4, "the couple, hands folded, before the ceremony")] },
      { t: "detail", p: hr(5, "the ceremony, from over the shoulder of a guest"), note: "The ceremony, from where the family sits." },
      { t: "full", p: hr(7, "the first look") },
      { t: "trio", p: [hr(1, "petals over the couple"), hr(6, "musicians and a quiet smile"), hr(8, "walking beneath garlands")] },
    ],
    frames: allFrames("house-of-rituals", "The House of Rituals wedding in India", [3, 9]),
    seo: "The House of Rituals — a Sikh Anand Karaj wedding in India, documented by Studio Kunal Photography.",
  },
  {
    slug: "akshita-rajat-toronto",
    legacyPath: "/akshita-rajat-a-lovestory-from-toronto-downtown",
    couple: "Akshita & Rajat",
    title: "A Love Story from Downtown Toronto",
    location: "Downtown Toronto, Canada",
    region: "North America",
    kind: "Pre-wedding",
    categories: ["pre-weddings"],
    intro: [
      "A winter afternoon downtown: marble storefronts, red lacquer walls and a save-the-date held up to the city.",
    ],
    hero: ar(11, "the couple against a red lacquered storefront"),
    cover: ar(11, "the couple against a red lacquered storefront"),
    reveal: ar(8, "holding a save-the-date newspaper"),
    blocks: [
      { t: "wide", p: ar(2, "an embrace on a downtown sidewalk") },
      { t: "pair", p: [ar(5, "walking hand in hand along a wet street"), ar(10, "an embrace by a marble facade")] },
      { t: "detail", p: ar(8, "the save-the-date, held up to the camera"), note: "Save the date — 21.04.2026." },
      { t: "full", p: ar(12, "a kiss beside a glowing shop window") },
      { t: "trio", p: [ar(13, "a lamp-lit brick corner"), ar(14, "laughing together in black and white"), ar(15, "the city blurred behind them")] },
      { t: "quote", text: "His attention to detail and creativity really shows in his work.", by: "Akshita & Rajat" },
      { t: "final", p: ar(4, "looking out toward the street together") },
    ],
    frames: allFrames("akshita-rajat", "Akshita & Rajat pre-wedding in downtown Toronto", [7]),
    seo: "Akshita & Rajat's pre-wedding in downtown Toronto — winter streets and couture storefronts by Studio Kunal Photography.",
  },
];

export const getWedding = (slug: string) => weddings.find((w) => w.slug === slug);

/** Listing data for a story: its best wide frame and best tall frame. */
export function storyCard(w: Wedding, pick?: { landscape?: Photo; portrait?: Photo }) {
  // Prefer establishing / pair frames over the hover close-up (`reveal`), which crops too tightly.
  const pool = [w.cover, w.hero, ...w.blocks.flatMap((b) => (b.t === "pair" || b.t === "wide" || b.t === "full" ? (Array.isArray(b.p) ? b.p : [b.p]) : [])), w.reveal];
  return {
    slug: w.slug,
    couple: w.couple,
    title: w.title,
    location: w.location,
    kind: w.kind,
    year: w.year,
    categories: w.categories,
    hasFilm: w.blocks.some((b) => b.t === "film"),
    landscape: pick?.landscape ?? pool.find((p) => p.w > p.h) ?? w.cover,
    portrait: pick?.portrait ?? pool.find((p) => p.h > p.w) ?? w.cover,
  };
}

export const nextWedding = (slug: string) => {
  const i = weddings.findIndex((w) => w.slug === slug);
  return weddings[(i + 1) % weddings.length];
};

// Unattributed ceremony & celebration frames that appeared on the old homepage.
export const moments = {
  procession: photo("moments", 3, "A bride and groom walking down the aisle in a glasshouse, garlanded and laughing"),
  ceremony: photo("moments", 12, "A black-and-white wedding ceremony, guests leaning in"),
  celebration: photo("moments", 19, "Black-and-white celebration, the bride mid-laugh beneath string lights"),
  lakeside: photo("moments", 14, "A couple in traditional dress by a still, pale lake"),
  garden: photo("moments", 7, "Bride and groom in a lush garden, cheek to cheek"),
  greenery: photo("moments", 1, "A couple embracing among summer leaves"),
  shore: photo("moments", 9, "A couple at the water's edge beneath a bright bluff"),
};
