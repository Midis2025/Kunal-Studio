import type { Metadata } from "next";
import BehindTheLens from "@/components/home/BehindTheLens";
import CinemaSection from "@/components/home/CinemaSection";
import FilmReel from "@/components/home/FilmReel";
import EditorialCollage, { type CollageItem } from "@/components/home/EditorialCollage";
import FilmStrip from "@/components/home/FilmStrip";
import FinalCta from "@/components/home/FinalCta";
import HomeHero from "@/components/home/HomeHero";
import HorizontalGallery, { type Fragment } from "@/components/home/HorizontalGallery";
import Presence from "@/components/home/Presence";
import JournalPreview from "@/components/home/JournalPreview";
import Process from "@/components/home/Process";
import SelectedStories from "@/components/home/SelectedStories";
import Statement from "@/components/home/Statement";
import Testimonials, { type Voice } from "@/components/home/Testimonials";
import { films, ytPoster } from "@/data/films";
import { articles } from "@/data/journal";
import { processSteps, studioFacts } from "@/data/process";
import { testimonials } from "@/data/testimonials";
import { getWedding, moments, storyCard, type Wedding } from "@/data/weddings";
import { photo } from "@/lib/photos";

export const metadata: Metadata = {
  title: { absolute: "Studio Kunal Photography — Wedding Photography & Films · North America & India" },
  description:
    "Cinematic, documentary and editorial wedding photography and films across North America and India. Stories that deserve to be felt forever — bookings open 2026–2027.",
  alternates: { canonical: "/" },
  openGraph: { images: [{ url: "/images/deep-payal/18.jpg", width: 2400, height: 1600, alt: "A kiss beneath a vaulted Gothic ceiling" }] },
};

const w = (slug: string) => getWedding(slug) as Wedding;

export default function Home() {
  // One cinematic frame, a pair, then a trio — flush and aligned.
  const stories = [
    storyCard(w("deep-payal"), { landscape: photo("deep-payal", 9, "Deep & Payal on a grand stone staircase, the gown fanned across the steps") }),
    storyCard(w("nooreen-jugraj"), { portrait: photo("nooreen-jugraj", 1, "Nooreen & Jugraj beneath open sky") }),
    storyCard(w("raman-akash-punjab"), { portrait: photo("raman-akash", 1, "Raman & Akash leaning together in a brick doorway") }),
    storyCard(w("the-fashion-vault"), { portrait: photo("fashion-vault", 5, "The Fashion Vault — a downward glance, hand at the necklace") }),
    storyCard(w("varinder-param-noor-mahal"), { portrait: photo("varinder-param", 5, "Varinder & Param — a kiss beneath an ornate arch") }),
    storyCard(w("aman-mrinal"), { portrait: photo("aman-mrinal", 11, "Aman lifting Mrinal against a wide blue sky") }),
  ];

  const fragments: Fragment[] = [
    { p: photo("house-of-rituals", 7, "The first look, softly out of focus"), caption: "The first look" },
    { p: moments.procession, caption: "The procession" },
    { p: moments.ceremony, caption: "The vows" },
    { p: photo("nooreen-jugraj", 19, "A sandalwood fan inscribed with names and date"), caption: "The details" },
    { p: photo("deep-payal", 26, "A quiet embrace in lamplight"), caption: "The quiet moments" },
    { p: photo("raman-akash", 20, "A white horse passing, blurred, in the foreground"), caption: "Movement" },
    { p: moments.celebration, caption: "The celebration" },
    { p: photo("nooreen-jugraj", 71, "Foreheads touching at sunset"), caption: "The afterglow" },
    { p: photo("varinder-param", 6, "The couple before palace domes against an orange sky"), caption: "The last light" },
  ];

  const strip = [
    { ...photo("aman-mrinal", 4, "Aman & Mrinal laughing together on the beach"), caption: "Aman & Mrinal — a laugh that nearly knocked them over" },
    { ...photo("akshita-rajat", 14, "Akshita & Rajat laughing, black and white"), caption: "Akshita & Rajat — downtown, between takes" },
    { ...photo("nooreen-jugraj", 38, "Nooreen & Jugraj laughing in the field"), caption: "Nooreen & Jugraj — the moment after the pose" },
    { ...photo("raman-akash", 29, "Raman & Akash, a touch at the chin"), caption: "Raman & Akash — close enough to whisper" },
    { ...photo("deep-payal", 21, "Deep & Payal on the staircase"), caption: "Deep & Payal — a glance on the stairs" },
    { ...photo("house-of-rituals", 6, "Musicians and a quiet smile at the ceremony"), caption: "The House of Rituals — kirtan, and a smile" },
    { ...photo("aman-mrinal", 19, "Aman & Mrinal celebrating an arcade win"), caption: "Aman & Mrinal — a victory worth celebrating" },
    { ...photo("fashion-vault", 58, "The bride in a red veil, mid-gesture"), caption: "The Fashion Vault — the gesture between poses" },
  ];

  const collage: CollageItem[] = [
    { p: photo("varinder-param", 4, "Palace domes at dusk with the couple beneath"), label: "Architecture" },
    { p: photo("nooreen-jugraj", 24, "Nooreen in a red lehenga, looking over her shoulder"), label: "The bride" },
    { p: photo("fashion-vault", 48, "Maang tikka and veil in close-up"), label: "Detail" },
    { p: photo("nooreen-jugraj", 28, "Jugraj standing alone in the field"), label: "The groom" },
    { p: photo("house-of-rituals", 5, "The ceremony from over a guest's shoulder"), label: "Ceremony" },
    { p: photo("akshita-rajat", 15, "Akshita & Rajat with the city blurred behind them"), label: "Emotion" },
    { p: photo("moments", 1, "A couple embracing among summer leaves"), label: "Afterwards" },
  ];

  // Every review, paired only with imagery that is genuinely that couple's:
  // their portfolio story, or the poster frame of their own film.
  const storyImage: Record<string, { p: ReturnType<typeof photo>; pos?: string }> = {
    "Deep & Payal": { p: photo("deep-payal", 13, "Deep & Payal embracing in an arched corridor") },
    "Akshita & Rajat": { p: photo("akshita-rajat", 9, "Akshita & Rajat by a marble facade") },
  };
  const voices: Voice[] = testimonials.map((t) => {
    const s = storyImage[t.couple];
    const film = films.find((f) => f.couple === t.couple);
    return {
      couple: t.couple,
      quote: t.pull,
      context: t.context,
      image: s
        ? { src: s.p.src, alt: s.p.alt, blur: s.p.blur, pos: s.pos }
        : film
          ? { src: ytPoster(film.id), alt: `${t.couple} — still from their film` }
          : undefined,
      href: t.story ? `/portfolio/${t.story}` : film ? "/films" : undefined,
    };
  });

  return (
    <>
      <HomeHero p={photo("deep-payal", 18, "A couple sharing a kiss beneath a vaulted Gothic ceiling, framed by a tall stained-glass window")} />
      <Statement
        portrait={photo("raman-akash", 12, "A bride-to-be in white, smiling softly — Punjab")}
        detail={photo("fashion-vault", 63, "A nose ring and jewellery in black and white")}
        wide={moments.lakeside}
      />
      <SelectedStories cards={stories} />
      <HorizontalGallery items={fragments} />
      <FilmStrip frames={strip} />
      <CinemaSection poster={photo("raman-akash", 43, "")} filmId="GE4RwB_Ezf8" />
      <FilmReel films={["ZT4f1XDbmDg", "4djvYWzA-LY", "MkhER4Ob6dA"].map((id) => films.find((f) => f.id === id)!)} />
      <EditorialCollage items={collage} />
      <BehindTheLens portrait={photo("raman-akash", 42, "Raman & Akash, a black-and-white portrait")} isFounder={false} />
      <Presence
        na={[photo("nooreen-jugraj", 30, "Nooreen & Jugraj in the field, Canada"), photo("aman-mrinal", 30, "Mrinal before the Toronto skyline")]}
        india={[photo("varinder-param", 2, "Varinder & Param beneath a domed pavilion, Noor Mahal"), photo("raman-akash", 21, "Raman & Akash with a white horse, Punjab")]}
      />
      <Testimonials voices={voices} />
      <Process steps={processSteps} facts={studioFacts} />
      <JournalPreview articles={articles} />
      <FinalCta p={photo("varinder-param", 1, "Varinder & Param beside a reflecting pool before palace domes at dusk")} />
    </>
  );
}
