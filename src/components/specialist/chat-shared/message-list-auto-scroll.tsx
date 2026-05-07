"use client";

import { useEffect, useRef } from "react";

/**
 * Tiny client-only sentinel that lives at the bottom of the message
 * list. On every change to `deps` it scrolls itself into view, which
 * pulls the parent scroll-container down to the latest message.
 *
 * Kept separate from `MessageList` so the list itself can stay a
 * Server Component.
 */
export function MessageListAutoScroll({ deps }: { deps: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [deps]);

  return <div ref={ref} aria-hidden="true" />;
}
