"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element comes within `margin` of the viewport (and stays true).
 * Used to switch lazily-loaded photos to eager *before* they're needed — native
 * lazy-loading can't see images hidden sideways inside overflow-clipped strips,
 * so without this they'd arrive blurry just as they slide into view.
 */
export function useNear(ref: RefObject<Element | null>, margin = "120% 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
