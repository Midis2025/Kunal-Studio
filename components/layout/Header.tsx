"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TLink } from "@/components/motion/PageTransition";
import Wordmark from "@/components/ui/Wordmark";
import { studio } from "@/data/studio";
import type { Photo } from "@/lib/photos";
import FullscreenMenu from "./FullscreenMenu";

const primary = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/films", label: "Films" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];

/** A label that rolls up on hover to reveal its italic serif twin. */
function RollLink({ href, label, current, light }: { href: string; label: string; current: boolean; light: boolean }) {
  return (
    <TLink href={href} aria-current={current ? "page" : undefined} className="group/r relative inline-flex h-11 items-center px-1">
      {current && <span aria-hidden className={`absolute -left-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full ${light ? "bg-stone" : "bg-wine"}`} />}
      <span className="relative block overflow-y-clip">
        <span className="label block transition-transform duration-500 ease-[var(--ease-film)] group-hover/r:-translate-y-full group-focus-visible/r:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block whitespace-nowrap font-serif text-[0.95rem] italic leading-[1.1] transition-transform duration-500 ease-[var(--ease-film)] group-hover/r:-translate-y-full group-focus-visible/r:-translate-y-full"
        >
          {label}
        </span>
      </span>
    </TLink>
  );
}

export default function Header({ menuImages }: { menuImages: Record<string, Photo> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Adapt to the section beneath the bar, condense after the first screen,
  // tuck away on scroll-down, and track reading progress.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const y = window.scrollY;
      const stack = document.elementsFromPoint(window.innerWidth / 2, 36);
      const under = stack.find((el) => !header.current?.contains(el) && el.closest("[data-theme]"));
      setDark(under?.closest<HTMLElement>("[data-theme]")?.dataset.theme === "dark");
      setScrolled(y > 120);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240);
        lastY = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // New page: close the menu and bring the bar back.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
    setHidden(false);
  }

  const light = dark || open;
  const compact = scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[120] -translate-y-24 bg-ink px-4 py-3 text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={header}
        className={`fixed inset-x-0 top-0 z-[80] transition-[transform,color] duration-700 ease-[var(--ease-film)] ${
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0"
        } ${light ? "text-ivory" : "text-ink"}`}
      >
        <div
          className={`relative transition-[margin] duration-700 ease-[var(--ease-film)] ${
            compact ? "mx-[var(--gap)] mt-[var(--gap)] md:mx-4 md:mt-3" : "mx-0 mt-0"
          }`}
        >
          <div
            className={`relative flex items-center justify-between gap-6 border transition-[height,padding,background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-film)] ${
              compact
                ? `h-14 px-4 backdrop-blur-md md:px-6 ${light ? "border-ivory/15 bg-night/80" : "border-ink/10 bg-ivory/85"}`
                : "h-[var(--header-h)] border-transparent bg-transparent px-[var(--gutter)]"
            }`}
          >
            <TLink
              href="/"
              aria-label="Studio Kunal Photography — home"
              className={`relative z-10 -my-2 origin-left py-2 transition-transform duration-700 ease-[var(--ease-film)] ${compact ? "scale-[0.86]" : "scale-100"}`}
            >
              <Wordmark />
            </TLink>

            <nav
              aria-label="Primary"
              className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 transition-opacity duration-500 lg:flex xl:gap-10 ${
                open ? "pointer-events-none opacity-0" : ""
              }`}
            >
              {primary.map((l) => (
                <RollLink key={l.href} href={l.href} label={l.label} current={pathname.startsWith(l.href)} light={light} />
              ))}
            </nav>

            <div className="relative z-10 flex items-center gap-2 sm:gap-4">
              <p
                className={`label hidden items-center gap-2 transition-opacity duration-500 2xl:flex ${open ? "opacity-0" : ""} ${light ? "text-ivory/70" : "text-ash"}`}
              >
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${light ? "bg-stone" : "bg-wine"}`} />
                  <span className={`relative h-1.5 w-1.5 rounded-full ${light ? "bg-stone" : "bg-wine"}`} />
                </span>
                Booking {studio.bookings.replace(" — ", "–")}
              </p>

              <TLink
                href="/contact"
                tabIndex={open ? -1 : undefined}
                className={`label group/i hidden h-10 items-center gap-3 border px-4 transition-[background-color,color,border-color,opacity] duration-500 sm:inline-flex ${
                  open ? "pointer-events-none opacity-0" : ""
                } ${light ? "border-ivory/40 hover:border-ivory hover:bg-ivory hover:text-ink" : "border-ink/30 hover:border-ink hover:bg-ink hover:text-ivory"}`}
              >
                Inquire
                <span aria-hidden className="transition-transform duration-500 group-hover/i:translate-x-1">
                  →
                </span>
              </TLink>

              <button
                ref={toggle}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="group -mr-2 flex h-11 min-w-11 items-center gap-3 px-2"
              >
                <span className="label">{open ? "Close" : "Menu"}</span>
                <span aria-hidden className="relative block h-3 w-7">
                  <span className={`absolute right-0 top-0 h-px bg-current transition-all duration-500 ${open ? "w-full translate-y-1.5 rotate-45" : "w-full"}`} />
                  <span
                    className={`absolute bottom-0 right-0 h-px bg-current transition-all duration-500 ${open ? "w-full -translate-y-1.5 -rotate-45" : "w-4 group-hover:w-full"}`}
                  />
                </span>              </button>
            </div>

            {/* Reading progress */}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 -bottom-px h-px overflow-hidden transition-opacity duration-500 ${compact ? "opacity-100" : "opacity-0"}`}
            >
              <span ref={progress} className={`block h-full origin-left ${light ? "bg-stone" : "bg-wine"}`} style={{ transform: "scaleX(0)" }} />
            </span>
          </div>
        </div>
      </header>
      <FullscreenMenu
        open={open}
        onClose={() => {
          setOpen(false);
          toggle.current?.focus();
        }}
        images={menuImages}
      />
    </>
  );
}
