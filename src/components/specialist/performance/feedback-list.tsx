/**
 * Feedback received — span-12 card with stacked feedback items. Each
 * card has italic display body + uppercase mono attribution. Source-
 * tinted left border:
 *   - client    → navy
 *   - candidate → lime
 *   - manager   → success
 *
 * Per source CSS `.perf-feedback-item` (lime default; `.client` is
 * navy). Candidate / manager tones added per Session 6 directive 7
 * (use existing tokens — no new tokens added).
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import type { FeedbackCard, FeedbackTone } from "@/lib/mock-data/specialist/performance";
import { cn } from "@/lib/utils/cn";

const TONE_BORDER: Record<FeedbackTone, string> = {
  client: "border-l-navy",
  candidate: "border-l-lime",
  manager: "border-l-success",
};

const ATTR_TONE: Record<FeedbackTone, string> = {
  client: "text-navy",
  candidate: "text-lime-deep",
  manager: "text-success",
};

export function FeedbackList({
  cards,
}: {
  cards: ReadonlyArray<FeedbackCard>;
}) {
  return (
    <MetricCard label="Feedback" title="Recent feedback received" span={12}>
      <div className="flex flex-col gap-2.5">
        {cards.map((c) => (
          <FeedbackCardItem key={c.id} card={c} />
        ))}
      </div>
    </MetricCard>
  );
}

function FeedbackCardItem({ card }: { card: FeedbackCard }) {
  return (
    <article
      className={cn(
        "bg-cream rounded-lg border-l-[3px] px-4 py-3.5",
        TONE_BORDER[card.sourceTone],
      )}
    >
      <p
        className="font-display text-[14px] italic leading-[1.55] text-ink-soft"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {card.body}
      </p>
      <div
        className={cn(
          "mt-2 flex flex-wrap items-baseline gap-2 font-mono text-[10px] tracking-[0.08em] uppercase",
          ATTR_TONE[card.sourceTone],
        )}
      >
        <span className="font-semibold">{card.sourceLabel}</span>
        <span className="text-ink-mute">·</span>
        <span className="text-ink-soft font-medium">{card.source}</span>
        <span className="text-ink-mute">·</span>
        <span className="text-ink-mute">{card.whenLabel}</span>
      </div>
    </article>
  );
}
