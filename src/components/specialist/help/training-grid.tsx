/**
 * Training-modules grid — 6 cards in a 3-col grid (2-col at <1100,
 * 1-col at <600 per source CSS).
 *
 * Each card has:
 *   - Thumb (1-6 variants — gradient backgrounds via inline-style
 *     since each thumb is a unique decorative gradient that doesn't
 *     map to the named palette)
 *   - Play icon overlay
 *   - Duration chip
 *   - Optional progress bar (CSS `--p` width)
 *   - Title + tag (required / complete / new / etc.)
 *
 * Server Component.
 */

import { Play } from "lucide-react";
import {
  trainingCards,
  type TrainingCard,
  type TrainingTagKind,
} from "@/lib/mock-data/specialist/help";
import { cn } from "@/lib/utils/cn";

/* Per-thumb decorative gradient. 6 distinct colorways. */
const THUMB_GRADIENT: Record<TrainingCard["thumb"], string> = {
  1: "linear-gradient(135deg, #B89478, #6E4830)",   // caramel
  2: "linear-gradient(135deg, #4F6FA8, #233458)",   // navy
  3: "linear-gradient(135deg, #8C9D5A, #4D5A28)",   // olive
  4: "linear-gradient(135deg, #B5786B, #6F4439)",   // terracotta
  5: "linear-gradient(135deg, #7E6FA8, #423564)",   // purple
  6: "linear-gradient(135deg, #5A8A8C, #2B5054)",   // teal
};

const TAG_TONE: Record<TrainingTagKind, string> = {
  required: "bg-amber/15 text-amber",
  complete: "bg-success-bg text-success",
  neutral: "bg-cream-deep text-ink-soft",
};

export function TrainingGrid() {
  return (
    <section>
      <header className="mb-3.5 flex items-baseline justify-between gap-3">
        <div>
          <div className="mb-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
            Training
          </div>
          <h2
            className="font-display m-0 text-[22px] font-medium tracking-[-0.015em] text-ink"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Build your specialist craft
          </h2>
        </div>
        <button
          type="button"
          className="text-ink-soft hover:text-ink font-mono text-[11px] tracking-[0.04em] uppercase transition-colors"
        >
          All modules · 24 hrs of content →
        </button>
      </header>
      <div className="grid grid-cols-1 gap-3 max-[600px]:grid-cols-1 lg:grid-cols-3 max-lg:grid-cols-2">
        {trainingCards.map((card) => (
          <TrainingCardItem key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

function TrainingCardItem({ card }: { card: TrainingCard }) {
  return (
    <button
      type="button"
      className="bg-paper border-line hover:border-ink-mute group flex flex-col gap-0 overflow-hidden rounded-xl border text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(14,14,12,0.06)]"
    >
      {/* Thumb */}
      <div
        className="relative grid h-[90px] w-full place-items-center"
        style={{ background: THUMB_GRADIENT[card.thumb] }}
      >
        <div
          aria-hidden="true"
          className="grid h-12 w-12 place-items-center rounded-full bg-paper/90 text-ink shadow-[0_2px_8px_rgba(14,14,12,0.15)] transition-transform group-hover:scale-110"
        >
          <Play className="h-5 w-5 fill-ink" strokeWidth={1.5} />
        </div>
        <span className="absolute right-2.5 bottom-2 rounded-full bg-paper/90 px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.06em] uppercase text-ink-soft">
          {card.durationLabel}
        </span>
        {card.progressPct !== undefined ? (
          <div className="bg-paper/30 absolute bottom-0 left-0 right-0 h-1">
            <div
              className="bg-paper h-full transition-[width]"
              style={{ width: `${card.progressPct}%` }}
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5 px-4 pt-3 pb-4">
        <div
          className="font-display text-[14px] font-medium leading-tight text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {card.title}
        </div>
        {card.tag ? (
          <span
            className={cn(
              "self-start rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase",
              TAG_TONE[card.tag.kind],
            )}
          >
            {card.tag.label}
          </span>
        ) : null}
      </div>
    </button>
  );
}
