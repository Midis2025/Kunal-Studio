import Image from "next/image";
import type { Photo } from "@/lib/photos";

type Props = {
  p: Photo;
  sizes: string;
  /** Fill the parent box (parent must be positioned and sized) instead of intrinsic ratio */
  fill?: boolean;
  preload?: boolean;
  /** Load immediately without preloading (e.g. images revealed by interaction) */
  eager?: boolean;
  quality?: 60 | 75 | 85;
  className?: string;
  imgClassName?: string;
};

/**
 * Every photograph goes through here: responsive AVIF/WebP srcset, a blurred
 * low-res placeholder tinted with the frame's dominant colour, and fixed
 * intrinsic dimensions so nothing shifts while loading.
 */
export default function Pic({ p, sizes, fill, preload, eager, quality = 75, className = "", imgClassName = "" }: Props) {
  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: p.color }}>
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          quality={quality}
          preload={preload}
          loading={preload || eager ? "eager" : "lazy"}
          placeholder={p.blur as `data:image/${string}`}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition: p.pos ?? "50% 50%" }}
        />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: p.color, aspectRatio: `${p.w} / ${p.h}` }}>
      <Image
        src={p.src}
        alt={p.alt}
        width={p.w}
        height={p.h}
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={preload || eager ? "eager" : "lazy"}
        placeholder={p.blur as `data:image/${string}`}
        className={`block h-full w-full object-cover ${imgClassName}`}
        style={{ objectPosition: p.pos ?? "50% 50%" }}
      />
    </div>
  );
}
