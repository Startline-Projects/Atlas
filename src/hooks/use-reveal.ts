"use client";

import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` to the element (and its `.reveal-stagger` children) when
 * it scrolls into view. Element opts-in by adding `.reveal` or
 * `.reveal-stagger` classes, which are styled in globals.css.
 */
export function useReveal<T extends HTMLElement>(): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: just show.
      root
        .querySelectorAll<HTMLElement>(".reveal, .reveal-stagger")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    root
      .querySelectorAll<HTMLElement>(".reveal, .reveal-stagger")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
