/**
 * Browse-by-topic — 6-card grid (3-col at desktop, 2-col at <1100,
 * 1-col at <700 per source CSS).
 *
 * Each card has a tone-keyed icon background + title + description +
 * article count. Icons resolve from the mock data's `iconKey` field
 * via lucide.
 *
 * Server Component.
 */

import {
  Briefcase,
  Compass,
  CheckCircle2,
  RefreshCw,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { topicCards, type TopicCard, type TopicTone } from "@/lib/mock-data/specialist/help";
import { cn } from "@/lib/utils/cn";

const ICON_BY_KEY: Record<TopicCard["iconKey"], LucideIcon> = {
  compass: Compass,
  check: CheckCircle2,
  refresh: RefreshCw,
  shield: ShieldAlert,
  users: Users,
  briefcase: Briefcase,
};

const TONE_CLASS: Record<
  TopicTone,
  { iconBg: string; iconText: string }
> = {
  ink: { iconBg: "bg-cream-deep", iconText: "text-ink" },
  success: { iconBg: "bg-success-bg", iconText: "text-success" },
  lime: { iconBg: "bg-lime/20", iconText: "text-lime-deep" },
  danger: { iconBg: "bg-danger-bg", iconText: "text-danger" },
  navy: { iconBg: "bg-navy/10", iconText: "text-navy" },
  amber: { iconBg: "bg-amber/15", iconText: "text-amber" },
};

export function TopicGrid() {
  return (
    <section>
      <header className="mb-3.5 flex items-baseline justify-between gap-3">
        <div>
          <div className="mb-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
            Knowledge base
          </div>
          <h2
            className="font-display m-0 text-[22px] font-medium tracking-[-0.015em] text-ink"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            Browse by topic
          </h2>
        </div>
        <button
          type="button"
          className="text-ink-soft hover:text-ink font-mono text-[11px] tracking-[0.04em] uppercase transition-colors"
        >
          All 99 articles →
        </button>
      </header>
      <div className="grid grid-cols-1 gap-3 max-[700px]:grid-cols-1 lg:grid-cols-3 max-lg:grid-cols-2">
        {topicCards.map((card) => (
          <TopicCardItem key={card.key} card={card} />
        ))}
      </div>
    </section>
  );
}

function TopicCardItem({ card }: { card: TopicCard }) {
  const Icon = ICON_BY_KEY[card.iconKey];
  const tone = TONE_CLASS[card.tone];
  return (
    <button
      type="button"
      className="bg-paper border-line hover:border-ink-mute group flex flex-col gap-2.5 rounded-xl border px-5 py-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(14,14,12,0.06)]"
    >
      <div
        className={cn(
          "grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg",
          tone.iconBg,
          tone.iconText,
        )}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div
        className="font-display text-[16px] font-medium leading-tight text-ink"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {card.title}
      </div>
      <p className="m-0 flex-1 text-[12.5px] leading-[1.45] text-ink-soft">
        {card.description}
      </p>
      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.04em] uppercase text-ink-mute">
        <span>{card.articleCount} articles</span>
        <span aria-hidden="true" className="text-line">
          →
        </span>
      </div>
    </button>
  );
}
