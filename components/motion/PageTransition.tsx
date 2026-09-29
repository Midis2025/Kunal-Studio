"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Go = (href: string, opts?: { from?: HTMLElement | null }) => void;
const Ctx = createContext<Go>(() => {});
export const usePageTransition = () => useContext(Ctx);

/**
 * Two transition languages:
 *  • "expand" – the clicked photograph grows to fill the screen and becomes the next page's hero.
 *  • "curtain" – a warm ivory panel sweeps across, then lifts to reveal the new page.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pending = useRef<null | "curtain" | "expand">(null);
  const safety = useRef<number>(0);

  const reset = useCallback(() => {
    pending.current = null;
    window.clearTimeout(safety.current);
    if (stage.current) {
      stage.current.replaceChildren();
      gsap.set(stage.current, { autoAlpha: 0 });
    }
    if (curtain.current) gsap.set(curtain.current, { yPercent: 100, autoAlpha: 0 });
  }, []);

  const go: Go = useCallback(
    (href, opts) => {
      const target = new URL(href, window.location.href);
      if (pending.current) return;
      if (target.pathname === window.location.pathname) {
        router.push(href);
        return;
      }
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      safety.current = window.setTimeout(reset, 9000);
      const img = opts?.from?.querySelector("img");

      if (opts?.from && img && stage.current) {
        pending.current = "expand";
        const r = opts.from.getBoundingClientRect();
        const clone = document.createElement("img");
        clone.src = img.currentSrc || img.src;
        clone.alt = "";
        const cs = getComputedStyle(img);
        Object.assign(clone.style, {
          position: "absolute",
          objectFit: "cover",
          objectPosition: cs.objectPosition,
          top: `${r.top}px`,
          left: `${r.left}px`,
          width: `${r.width}px`,
          height: `${r.height}px`,
        });
        stage.current.replaceChildren(clone);
        gsap.set(stage.current, { autoAlpha: 1, backgroundColor: "rgba(12,11,10,0)" });
        const tl = gsap.timeline({ onComplete: () => router.push(href, { scroll: false }) });
        tl.to(stage.current, { backgroundColor: "rgba(12,11,10,1)", duration: 0.6, ease: "power2.out" }, 0).to(
          clone,
          { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, duration: 1.05, ease: "power4.inOut" },
          0,
        );
        return;
      }

      pending.current = "curtain";
      router.prefetch(href);
      gsap.fromTo(
        curtain.current,
        { yPercent: 100, autoAlpha: 1 },
        { yPercent: 0, duration: 0.75, ease: "power4.inOut", onComplete: () => router.push(href, { scroll: false }) },
      );
    },
    [router, reset],
  );

  // New route committed → reveal it
  useEffect(() => {
    const mode = pending.current;
    if (!mode) return;
    if (mode === "curtain") {
      gsap.to(curtain.current, {
        yPercent: -100,
        duration: 0.9,
        delay: 0.1,
        ease: "power4.inOut",
        onComplete: reset,
      });
      return;
    }
    const heroImg = document.querySelector<HTMLImageElement>("[data-hero] img");
    const fadeOut = () =>
      gsap.to(stage.current, { autoAlpha: 0, duration: 0.8, delay: 0.15, ease: "power2.out", onComplete: reset });
    if (!heroImg || heroImg.complete) fadeOut();
    else {
      const t = window.setTimeout(fadeOut, 1400);
      heroImg.addEventListener(
        "load",
        () => {
          window.clearTimeout(t);
          fadeOut();
        },
        { once: true },
      );
    }
  }, [pathname, reset]);

  return (
    <Ctx.Provider value={go}>
      {children}
      <div
        ref={stage}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
        style={{ visibility: "hidden", opacity: 0 }}
      />
      <div
        ref={curtain}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-ivory"
        style={{ visibility: "hidden", transform: "translateY(100%)" }}
      >
        <span className="font-serif text-[clamp(2rem,6vw,4.5rem)] italic tracking-tight text-ink/80">Studio Kunal</span>
      </div>
    </Ctx.Provider>
  );
}

type TLinkProps = ComponentProps<typeof Link> & { href: string; expand?: boolean };

/** next/link that plays the site transition. `expand` grows the [data-expand] photo inside it. */
export function TLink({ href, expand, onClick, children, ...rest }: TLinkProps) {
  const go = usePageTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target) return;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
    e.preventDefault();
    const from = expand ? e.currentTarget.querySelector<HTMLElement>("[data-expand]") : null;
    go(href, { from });
  };
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
