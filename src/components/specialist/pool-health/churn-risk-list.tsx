/**
 * Forecast / Churn risk · next 60d — 5-row list. Each row: avatar +
 * name + reason + score chip + arrow.
 *
 * Cross-ref entries (cand-*) link to /specialist/candidates/[id].
 * Pool-only entries (pool-*) render avatar + name + reason but no
 * link — `PoolCandidateRef.isCrossRef` discriminates.
 *
 * Server Component (the row is a Link or a plain div based on
 * isCrossRef).
 */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MetricCard } from "@/components/specialist/operations-shared";
import {
  AVATAR_GRADIENTS,
  type AvatarGradientKey,
} from "@/lib/mock-data/specialist/queue-types";
import type {
  ChurnRiskItem,
  PoolHealthSnapshot,
} from "@/lib/mock-data/specialist/pool-health";
import { cn } from "@/lib/utils/cn";

const SCORE_TONE: Record<ChurnRiskItem["tone"], string> = {
  high: "bg-danger-bg text-danger",
  med: "bg-amber/15 text-amber",
  low: "bg-cream-deep text-ink-soft",
};

function gradientStyle(key: AvatarGradientKey): React.CSSProperties {
  const g = AVATAR_GRADIENTS[key];
  return { background: `linear-gradient(135deg, ${g.from}, ${g.to})` };
}

export function ChurnRiskList({
  items,
}: {
  items: PoolHealthSnapshot["churnRisk"];
}) {
  return (
    <MetricCard
      label="Forecast"
      title="Churn risk · next 60d"
      span={6}
    >
      <div className="flex flex-col gap-0">
        {items.map((item) => (
          <ChurnRow key={item.candidate.id} item={item} />
        ))}
      </div>
    </MetricCard>
  );
}

function ChurnRow({ item }: { item: ChurnRiskItem }) {
  const inner = (
    <div className="border-line-soft grid grid-cols-[30px_minmax(0,1fr)_auto_auto] items-center gap-2.5 border-b py-2.5 last:border-b-0">
      <div
        className="grid h-[30px] w-[30px] flex-shrink-0 place-items-center rounded-md font-mono text-[11px] font-semibold text-paper"
        style={gradientStyle(item.candidate.avatarGradient)}
        aria-hidden="true"
      >
        {item.candidate.initials}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
          <span className="truncate">{item.candidate.name}</span>
          {item.candidate.countryFlag ? (
            <span className="text-[12px]" aria-hidden="true">
              {item.candidate.countryFlag}
            </span>
          ) : null}
        </div>
        <div className="truncate text-[11px] text-ink-mute">{item.reason}</div>
      </div>
      <span
        className={cn(
          "rounded-md px-2 py-0.5 font-mono text-[11.5px] font-semibold tabular-nums",
          SCORE_TONE[item.tone],
        )}
      >
        {item.scorePct}%
      </span>
      <ChevronRight
        aria-hidden="true"
        className="h-3.5 w-3.5 flex-shrink-0 text-ink-mute"
        strokeWidth={1.5}
      />
    </div>
  );

  if (item.candidate.isCrossRef) {
    return (
      <Link
        href={`/specialist/candidates/${item.candidate.id}`}
        className="hover:bg-cream -mx-2 rounded px-2 transition-colors"
      >
        {inner}
      </Link>
    );
  }
  // Pool-only — render as a non-link block, no hover.
  return inner;
}
