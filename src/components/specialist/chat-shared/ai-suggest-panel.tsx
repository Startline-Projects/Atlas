"use client";

/**
 * "Atlas suggests" panel — sits between the messages area and the
 * composer. Lime-tinted strip with the suggestion text + a "Use this"
 * button (populates composer) + dismiss button (hides for the rest of
 * the session).
 *
 * Client Component because the dismiss state lives in the parent
 * (per-thread Set) — this component is controlled.
 */

import { Sparkles, X } from "lucide-react";
import type { AiSuggestion } from "@/lib/mock-data/specialist/chat-types";

export function AiSuggestPanel({
  suggestion,
  onUse,
  onDismiss,
}: {
  suggestion: AiSuggestion;
  onUse: (text: string) => void;
  onDismiss: () => void;
}) {
  return (
    <div className="border-line-soft flex flex-shrink-0 items-center gap-4 border-t bg-lime/10 px-7 py-2.5">
      <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-md bg-lime text-ink">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-lime-text">
          Atlas suggests
        </div>
        <div className="mt-0.5 font-display text-[14px] italic leading-snug text-ink-soft">
          “{suggestion.text}”
        </div>
        {suggestion.rationale ? (
          <div className="mt-1 font-body text-[11.5px] text-ink-mute">
            {suggestion.rationale}
          </div>
        ) : null}
      </div>
      <div className="flex flex-shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() => onUse(suggestion.text)}
          className="rounded-md bg-ink px-3 py-1.5 font-body text-[12px] text-paper transition-colors hover:bg-ink-soft"
        >
          Use this
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss suggestion"
          className="border-line text-ink-mute hover:bg-cream-deep grid h-7 w-7 place-items-center rounded-md border transition-colors hover:text-ink-soft"
        >
          <X className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
