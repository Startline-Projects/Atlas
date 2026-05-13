"use client";

/**
 * ApprovedFlash — transient notification toast.
 *
 * Position: TOP-CENTER, just below the topbar stack (36 + 57 + 16px
 * gap). Discrete card with solid `bg-paper`, soft shadow, and a
 * left-edge tone accent (success-green for `approve`-class flashes,
 * amber for queued-action acknowledgements).
 *
 * Used by:
 *   - `review-queue` / `recert-queue` / `reviews-approvals` —
 *     4-field celebration flashes (`Approved.` + tail + sub + meta)
 *   - `useQueuedFlash` consumers (sourcing / disputes / settings /
 *     performance / candidate-profile / candidate-chat / client-chat
 *     / my-candidates / my-clients) — 2-field queued-action acks
 *     (verb = full sentence, tail empty, sub = "· backend pending"
 *     or override, meta empty)
 *
 * 17+ consumer files total. **API unchanged** across the visual
 * rewrite — props remain `{ open, verb, tail, sub, meta, tone }`.
 *
 * ## Visual evolution (talent-specialist branch)
 *
 * The previous design was a full-viewport overlay with `bg-cream/95`
 * (success) / `bg-amber/12` (warn — 88% see-through) and a 40px
 * display-italic heading mid-viewport. Designed originally for the
 * review-queue `Approved.` celebration where the underlying page is
 * the queue rail and the overlay reads as a clean "moment." When
 * polish-series `useQueuedFlash` repurposed it for 17+ surfaces with
 * dense content (disputes detail, settings forms, sourcing kanban),
 * the celebration aesthetic broke:
 *   - Translucent `bg-amber/12` made warn-tone flashes unreadable —
 *     page content bled through
 *   - 40px italic for full-sentence ack messages read as theatrical
 *     when the message is just "Case PDF queued for export…"
 *   - Mid-viewport overlay blocked the surface the user just touched
 *
 * **Convention locked:** toast notifications must use solid backgrounds.
 * Translucent backgrounds fail on dense-content pages by definition —
 * the underlying content bleeds through and breaks readability. Card
 * chrome (border + shadow + solid bg) is non-negotiable for transient
 * notifications.
 *
 * ## Auto-detect celebration vs ack via `tail`
 *
 * Existing consumers split cleanly along the `tail` axis — celebration
 * consumers always pass non-empty `tail` ("Marie's live."), useQueuedFlash
 * always passes empty `tail`. The component leans on this implicit
 * fork:
 *   - **Celebration mode (`tail` non-empty):** verb renders as
 *     `font-display italic 18px` — preserves the celebration tone at
 *     a card-appropriate scale.
 *   - **Ack mode (`tail` empty):** verb renders as `text-[14px]
 *     font-medium` body — readable for full-sentence acks.
 *
 * No API change required; the rendering fork is implicit in props.
 *
 * Client Component (consumed via `useQueuedFlash` which carries
 * useState + useEffect for the open/auto-dismiss state machine).
 */

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ApprovedFlashProps = {
  open: boolean;
  /** Heading verb — italic display when `tail` is non-empty
   *  (celebration mode), body text when `tail` is empty (ack mode). */
  verb: React.ReactNode;
  /** Trailing tail — "Marie's live." Empty for useQueuedFlash acks
   *  (the implicit signal for ack-mode rendering). */
  tail: React.ReactNode;
  /** Sub-line under the heading — e.g. "Loading next candidate…". */
  sub: string;
  /** Reference id at the bottom — "REVIEW #2K8F-MIG · 8m 12s". Empty
   *  on useQueuedFlash acks. */
  meta: string;
  tone?: "success" | "warn";
};

export function ApprovedFlash({
  open,
  verb,
  tail,
  sub,
  meta,
  tone = "success",
}: ApprovedFlashProps) {
  /* Auto-detect rendering mode from `tail` emptiness. See top-of-file
     "Auto-detect celebration vs ack" note. `Boolean(tail)` catches
     undefined / null / "" / false cleanly; React.ReactNode strings
     evaluate to false when empty. */
  const isCelebration = Boolean(tail);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!open}
      className={cn(
        /* Position: top-center, below the topbar stack (36+57+16=109).
           Width fixed at 420px with mobile bounds. z-[300] keeps the
           toast above modals (z-[200]) and overflow menus (z-[5]). */
        "fixed top-[calc(36px+57px+16px)] left-1/2 z-[300] w-[420px] max-w-[calc(100vw-32px)] -translate-x-1/2",
        /* Card chrome — solid bg-paper, subtle border, soft shadow.
           Left-edge accent stripe is tone-keyed. */
        "bg-paper border-line rounded-lg border border-l-[3px] p-4 shadow-[0_8px_32px_rgba(14,14,12,0.12)]",
        tone === "success" ? "border-l-success" : "border-l-amber",
        /* Animation: opacity + slight vertical slide (-16px → 0).
           Closed state stays pointer-events-none to not block clicks
           in the page header area. */
        "transition-[opacity,transform] duration-200 ease-out",
        open
          ? "pointer-events-auto translate-x-[-50%] translate-y-0 opacity-100"
          : "pointer-events-none translate-x-[-50%] -translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon column — 32px circle, tone-keyed bg, white check */}
        <div
          aria-hidden="true"
          className={cn(
            "grid h-8 w-8 flex-shrink-0 place-items-center rounded-full",
            tone === "success"
              ? "bg-success text-paper"
              : "bg-amber text-paper",
          )}
        >
          <Check className="h-[18px] w-[18px]" strokeWidth={2.5} />
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          {/* Verb + tail line. Heading uses h2 for screen-reader
              landmark; visible typography varies by mode. */}
          <h2
            className={cn(
              "m-0 text-ink leading-snug",
              /* Celebration mode: bigger display-italic heading.
                 Ack mode: body-readable text. The display family is
                 set via `font-display` only in celebration mode so
                 ack-mode messages render in the default body stack. */
              isCelebration ? "text-[18px] font-medium" : "text-[14px] font-medium",
            )}
          >
            {isCelebration ? (
              <span
                className="font-display mr-1 italic"
                style={{ fontVariationSettings: '"opsz" 36' }}
              >
                {verb}
              </span>
            ) : (
              <span>{verb}</span>
            )}
            {isCelebration ? tail : null}
          </h2>

          {/* Sub-line. Smaller, muted. Always rendered when present. */}
          {sub ? (
            <p className="text-ink-mute mt-1 text-[12.5px] leading-snug">
              {sub}
            </p>
          ) : null}

          {/* Meta — bottom audit-tag line. Empty on useQueuedFlash acks. */}
          {meta ? (
            <span className="text-ink-mute mt-2 block font-mono text-[10px] tracking-[0.14em] uppercase">
              {meta}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
