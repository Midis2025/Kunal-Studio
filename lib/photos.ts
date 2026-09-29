import manifest from "@/data/images.json";

export type Photo = {
  src: string;
  w: number;
  h: number;
  blur: string;
  color: string;
  alt: string;
  /** CSS object-position focal point, e.g. "50% 30%" */
  pos?: string;
  caption?: string;
};

export type PhotoSet = keyof typeof manifest;

type Entry = Omit<Photo, "alt" | "pos" | "caption">;

/** Look up a migrated photograph by set + original frame number. Throws at build time if missing. */
export function photo(set: PhotoSet, n: number, alt: string, extra?: Pick<Photo, "pos" | "caption">): Photo {
  const e = (manifest[set] as Record<string, Entry>)[String(n)];
  if (!e) throw new Error(`Missing photo ${set}/${n}`);
  return { ...e, alt, ...extra };
}

/** Every frame of a set, in original order, minus excluded frames (near-duplicates, album layouts). */
export function allFrames(set: PhotoSet, altBase: string, exclude: number[] = []): Photo[] {
  return Object.keys(manifest[set])
    .map(Number)
    .sort((a, b) => a - b)
    .filter((n) => !exclude.includes(n))
    .map((n) => photo(set, n, `${altBase} — frame ${n}`));
}

export const isPortrait = (p: Photo) => p.h > p.w;
