"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
 * One-shot fade-up for [data-reveal] elements as they scroll into view.
 * Content stays visible unless this runs: CSS only hides elements once
 * <html> has .reveal-ready, and anything already on screen is marked shown
 * first so nothing flashes.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (!root.classList.contains("reveal-ready")) {
      const vh = window.innerHeight;
      for (const el of pending) {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) el.classList.add("is-in", "no-anim");
      }
      root.classList.add("reveal-ready");
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        entering
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left)
          .forEach((el, i) => {
            el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 90}ms`);
            el.classList.add("is-in");
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    for (const el of pending) if (!el.classList.contains("is-in")) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
