/**
 * Atlas insights / Recommended actions — span-12 card with 3 priority
 * items. Each item: icon + title + detail + CTA link (visual; routes
 * via Next.js Link to the implemented destination).
 *
 * Per source CSS `.ph-rec-item.priority-{high,med,low}`: tone-keyed
 * left border + tinted background.
 *
 * Server Component (CTAs are real Next.js Links since the
 * destinations all exist).
 */

import Link from "next/link";
import { ArrowRight, Sparkles, AlertOctagon, Lightbulb } from "lucide-react";
import { PhCard } from "./ph-card";
import type {
  PoolHealthSnapshot,
  RecommendedAction,
  RecommendedActionPriority,
} from "@/lib/mock-data/specialist/pool-health";
import { cn } from "@/lib/utils/cn";

const PRIORITY_CLASS: Record<
  RecommendedActionPriority,
  { wrap: string; iconText: string; icon: React.ReactNode }
> = {
  high: {
    wrap: "bg-danger-bg border-l-danger",
    iconText: "text-danger",
    icon: <AlertOctagon className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  med: {
    wrap: "bg-amber/[0.06] border-l-amber",
    iconText: "text-amber",
    icon: <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.5} />,
  },
  low: {
    wrap: "bg-lime/[0.08] border-l-lime-deep",
    iconText: "text-lime-deep",
    icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
  },
};

export function RecommendedActionsList({
  actions,
}: {
  actions: PoolHealthSnapshot["recommendedActions"];
}) {
  return (
    <PhCard label="Atlas insights" title="Recommended actions" span={12}>
      <div className="flex flex-col gap-2.5">
        {actions.map((a, i) => (
          <RecItem key={i} action={a} />
        ))}
      </div>
    </PhCard>
  );
}

function RecItem({ action }: { action: RecommendedAction }) {
  const priority = PRIORITY_CLASS[action.priority];
  return (
    <div
      className={cn(
        "bg-cream grid grid-cols-[26px_minmax(0,1fr)_auto] items-start gap-3 rounded-lg border-l-[3px] px-3.5 py-3",
        priority.wrap,
      )}
    >
      <div
        className={cn(
          "bg-paper mt-0.5 grid h-[26px] w-[26px] flex-shrink-0 place-items-center rounded-md",
          priority.iconText,
        )}
        aria-hidden="true"
      >
        {priority.icon}
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 text-[13px] font-medium text-ink">
          {action.title}
        </div>
        <div className="text-[12px] leading-[1.45] text-ink-soft">
          {action.detail}
        </div>
      </div>
      <Link
        href={action.ctaHref}
        className="border-line bg-transparent text-ink-soft hover:bg-paper hover:text-ink hover:border-ink-mute self-center inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 font-body text-[11.5px] whitespace-nowrap transition-colors"
      >
        {action.ctaLabel.replace(/\s*→\s*$/, "")}
        <ArrowRight className="h-3 w-3" strokeWidth={1.7} aria-hidden="true" />
      </Link>
    </div>
  );
}
