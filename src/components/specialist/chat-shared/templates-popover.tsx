"use client";

/**
 * Quick-templates popover. Opens ABOVE the composer (per the source
 * HTML — composer is anchored to the bottom of the screen, so the
 * popover hangs upward). Click a template → populates composer with
 * the template's `body` and closes the popover.
 *
 * Click-outside is handled here via a single document-level listener;
 * the trigger button also toggles the open state.
 *
 * Client Component.
 */

import { useEffect, useRef } from "react";

import type { ChatTemplate } from "@/lib/mock-data/specialist/chat-types";

export function TemplatesPopover({
  templates,
  isOpen,
  onClose,
  onSelect,
}: {
  templates: ReadonlyArray<ChatTemplate>;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (body: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  /* Click-outside to close. */
  useEffect(() => {
    if (!isOpen) return;
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      const target = e.target as Node;
      if (ref.current.contains(target)) return;
      // Don't close when the trigger button is clicked — it owns its
      // own toggle. We detect this by checking for the data attribute.
      if (
        target instanceof HTMLElement &&
        target.closest("[data-templates-trigger]")
      ) {
        return;
      }
      onClose();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="border-line absolute bottom-full left-6 z-[5] mb-2 flex min-w-[280px] max-w-[380px] flex-col gap-0.5 rounded-xl border bg-paper p-2 shadow-md"
      role="menu"
    >
      <div className="px-2 pt-1 pb-1.5 font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink-mute">
        Quick templates
      </div>
      {templates.map((t) => (
        <button
          key={t.key}
          type="button"
          role="menuitem"
          onClick={() => {
            onSelect(t.body);
            onClose();
          }}
          className="flex flex-col gap-0.5 rounded-lg px-2.5 py-2 text-left font-body transition-colors hover:bg-cream"
        >
          <span className="text-[13px] font-medium text-ink">{t.title}</span>
          <span className="text-[11.5px] italic text-ink-mute">
            {t.preview}
          </span>
        </button>
      ))}
    </div>
  );
}
