"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { lockScroll } from "@/components/motion/SmoothScroll";
import { TLink } from "@/components/motion/PageTransition";
import { studio } from "@/data/studio";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { Photo } from "@/lib/photos";

const items = [
  { href: "/portfolio", label: "Portfolio", note: "Selected stories" },
  { href: "/films", label: "Films", note: "Stories in motion" },
  { href: "/about", label: "About", note: "Behind the lens" },
  { href: "/journal", label: "Journal", note: "Stories worth returning to" },
  { href: "/contact", label: "Contact", note: "Tell us your story" },
];

export default function FullscreenMenu({
  open,
  onClose,
  images,
}: {
  open: boolean;
  onClose: () => void;
  images: Record<string, Photo>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  // Images mount on first open only, then stay for smooth re-opens.
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    if (open) {
      lockScroll(true);
      gsap.set(el, { visibility: "visible" });
      const tl = gsap.timeline();
      tl.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: reduce ? 0 : 0.75, ease: "power4.inOut" })
        .fromTo(
          el.querySelectorAll("[data-menu-line]"),
          { yPercent: 110 },
          { yPercent: 0, duration: reduce ? 0 : 0.9, ease: "expo.out", stagger: 0.05 },
          reduce ? 0 : 0.32,
        )
        .fromTo(el.querySelectorAll("[data-menu-fade]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, reduce ? 0 : 0.55);
      el.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
      return () => {
        tl.kill();
      };
    } else if (mounted) {
      lockScroll(false);
      gsap.to(el, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: reduce ? 0 : 0.7,
        ease: "power4.inOut",
        onComplete: () => gsap.set(el, { visibility: "hidden" }),
      });
    }
  }, [open, mounted]);

  // Esc to close + keep focus inside while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !root.current) return;
      const f = root.current.querySelectorAll<HTMLElement>("a, button");
      const toggle = document.querySelector<HTMLElement>("[aria-controls='site-menu']");
      const list = [...(toggle ? [toggle] : []), ...f];
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        list[list.length - 1].focus();
      } else if (!e.shiftKey && i === list.length - 1) {
        e.preventDefault();
        list[0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      className="fixed inset-0 z-[70] overflow-y-auto bg-night text-ivory"
      style={{ visibility: "hidden", clipPath: "inset(0% 0% 100% 0%)" }}
      data-lenis-prevent
    >
      {/* Background photographs, cross-fading with the hovered item */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        {mounted &&
          items.map((it, i) => (
            <div
              key={it.href}
              className="absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-film)]"
              style={{ opacity: active === i ? 0.42 : 0, transform: active === i ? "scale(1)" : "scale(1.06)" }}
            >
              <Image src={images[it.href].src} alt="" fill sizes="100vw" quality={60} className="object-cover" placeholder={images[it.href].blur as `data:image/${string}`} />
            </div>
          ))}
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-night/10" />
      </div>

      <div className="wrap relative flex min-h-full flex-col justify-between pb-8 pt-[calc(var(--header-h)+2rem)]">
        <nav aria-label="Menu">
          <ol className="flex flex-col">
            {items.map((it, i) => (
              <li key={it.href} className="border-b border-ivory/12 first:border-t">
                <TLink
                  href={it.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-4 py-3 sm:gap-8 md:py-4"
                >
                  <span className="block overflow-hidden pb-[0.06em]">
                    <span
                      data-menu-line
                      className="block font-serif text-[clamp(2.6rem,9.5vw,7.5rem)] leading-[0.95] tracking-[-0.02em] transition-[font-style,transform] duration-500 group-hover:translate-x-3 group-hover:italic group-focus-visible:italic"
                    >
                      {it.label}
                    </span>
                  </span>
                  <span className="label ml-auto hidden text-ivory/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                    {it.note}
                  </span>
                </TLink>
              </li>
            ))}
          </ol>
        </nav>

        <div data-menu-fade className="mt-12 grid gap-8 text-sm sm:grid-cols-3 sm:items-end">
          <div>
            <p className="label mb-2 text-ivory/50">Write to us</p>
            <a href={`mailto:${studio.email}`} className="link-draw break-all">
              {studio.email}
            </a>
          </div>
          <div>
            <p className="label mb-2 text-ivory/50">Follow</p>
            <div className="flex gap-6">
              <a href={studio.social.instagram} target="_blank" rel="noopener noreferrer" className="link-draw py-2">
                Instagram
              </a>
              <a href={studio.social.youtube} target="_blank" rel="noopener noreferrer" className="link-draw py-2">
                YouTube
              </a>
            </div>
          </div>
          <p className="label text-ivory/60 sm:text-right">North America · India · Worldwide</p>
        </div>
      </div>
    </div>
  );
}
