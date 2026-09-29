import { photo, type Photo } from "@/lib/photos";
import { moments } from "@/data/weddings";

// The four chapters of working with the studio. Facts (custom proposals,
// 10–12 week delivery) come from the studio's published FAQ and pricing page.
export type Step = { word: string; line: string; body: string; p: Photo };

export const processSteps: Step[] = [
  {
    word: "Connect",
    line: "Understanding your celebration.",
    body: "Tell us about the dates, the places, the traditions and the people. We listen first — then we talk it through with you.",
    p: photo("akshita-rajat", 8, "Akshita & Rajat holding up their save-the-date"),
  },
  {
    word: "Create",
    line: "Planning the visual story.",
    body: "A proposal written around your events — never a fixed package — and a plan for every ritual, portrait and detail that matters.",
    p: photo("nooreen-jugraj", 19, "A sandalwood fan inscribed with the couple's names and date"),
  },
  {
    word: "Experience",
    line: "Being present while we document naturally.",
    body: "Guidance when it helps, invisibility when it doesn't. You live the day; we keep it.",
    p: moments.procession,
  },
  {
    word: "Relive",
    line: "Photographs and films built to last.",
    body: "A carefully edited final gallery, typically 10–12 weeks after your event — and films that bring you straight back.",
    p: photo("nooreen-jugraj", 70, "Nooreen & Jugraj at golden hour across the field"),
  },
];

export const studioFacts = [
  { k: "10–12 wks", v: "Final gallery delivery" },
  { k: "Photo + Film", v: "One team, one story" },
  { k: "2 continents", v: "North America · India" },
  { k: "Bespoke", v: "Proposals, never packages" },
];
