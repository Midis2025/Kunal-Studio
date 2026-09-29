"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop-only cursor. A small ring by default; becomes a labelled disc over
 * elements carrying data-cursor="view" | "play" | "drag" | "open", and swells
 * slightly over links and buttons. Never rendered on touch / coarse pointers.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    let current = "";
    let shown = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as Element | null;
      const zone = t?.closest?.("[data-cursor]") as HTMLElement | null;
      const state = zone?.dataset.cursor ?? (t?.closest?.("a, button, [role='button'], label, select") ? "link" : "");
      if (state !== current) {
        current = state;
        el.dataset.state = state;
        setLabel(state === "view" ? "View" : state === "play" ? "Play" : state === "drag" ? "Drag" : state === "open" ? "Open" : "");
      }
    };
    const onLeave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      shown = false;
    };
    const onDown = () => gsap.to(el, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(el, { scale: 1, duration: 0.3 });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={dot}
      aria-hidden
      data-state=""
      className="cursor pointer-events-none fixed left-0 top-0 z-[100] opacity-0 mix-blend-difference"
      style={{ visibility: "hidden" }}
    >
      <div className="cursor-shape flex items-center justify-center rounded-full border border-white text-white">
        <span className="cursor-label label">{label}</span>
      </div>
    </div>
  );
}
