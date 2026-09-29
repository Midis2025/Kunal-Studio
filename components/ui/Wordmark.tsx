/** Typographic lockup echoing the studio's Didone logo: STUDIO / KUNAL / PHOTOGRAPHY */
export default function Wordmark({ className = "", size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const big = size === "lg";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`} aria-label="Studio Kunal Photography">
      <span aria-hidden className={`font-sans font-medium uppercase ${big ? "text-[0.8rem] tracking-[0.55em]" : "text-[0.5rem] tracking-[0.5em]"} pl-[0.5em]`}>
        Studio
      </span>
      <span aria-hidden className={`font-serif ${big ? "text-[3.4rem]" : "text-[1.55rem]"} tracking-[0.04em] leading-[0.95]`}>
        KUNAL
      </span>
      <span aria-hidden className={`font-sans font-medium uppercase ${big ? "text-[0.7rem] tracking-[0.42em]" : "text-[0.44rem] tracking-[0.36em]"} pl-[0.4em]`}>
        Photography
      </span>
    </span>
  );
}
