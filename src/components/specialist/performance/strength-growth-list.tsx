/**
 * Strengths / Growth-areas list — used by the span-6 cards on row 3.
 * Each item: icon + title + detail. Tone-keyed left-border:
 *   - strength → success (green)
 *   - growth   → amber
 *   - future   → ink-mute (manager-flagged future focus)
 *
 * Per source CSS `.perf-list-item` (success default) +
 * `.growth` / `.future` modifiers.
 *
 * Server Component.
 */

import {
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { MetricCard } from "@/components/specialist/operations-shared";
import type {
  StrengthGrowthItem,
  StrengthGrowthTone,
} from "@/lib/mock-data/specialist/performance";
import { cn } from "@/lib/utils/cn";

const TONE: Record<
  StrengthGrowthTone,
  { wrap: string; iconColor: string; icon: React.ReactNode }
> = {
  strength: {
    wrap: "border-l-success",
    iconColor: "text-success",
    icon: <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  growth: {
    wrap: "border-l-amber",
    iconColor: "text-amber",
    icon: <TrendingUp className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  future: {
    wrap: "border-l-ink-mute",
    iconColor: "text-ink-mute",
    icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
  },
};

export function StrengthGrowthList({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: ReadonlyArray<StrengthGrowthItem>;
}) {
  return (
    <MetricCard label={label} title={title} span={6}>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </MetricCard>
  );
}

function Item({ item }: { item: StrengthGrowthItem }) {
  const tone = TONE[item.tone];
  return (
    <div
      className={cn(
        "bg-cream grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3 rounded-lg border-l-[3px] px-3.5 py-2.5",
        tone.wrap,
      )}
    >
      <div
        className={cn(
          "bg-paper grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-full",
          tone.iconColor,
        )}
        aria-hidden="true"
      >
        {tone.icon}
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 text-[13px] font-medium text-ink">
          {item.title}
        </div>
        <div className="text-[12px] leading-[1.45] text-ink-soft">
          {item.detail}
        </div>
      </div>
    </div>
  );
}
