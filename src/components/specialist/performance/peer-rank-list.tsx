/**
 * Peer ranking — span-6 card with per-row layout (rank / name+badge /
 * category / score). The active "you" row is cream-tinted with a
 * "YOU" pill, distinguishing it from anonymous peers.
 *
 * Per source CSS `.perf-peer-row.you` (cream bg, padded margin trick,
 * border-radius). Ellipsis rows render a single muted-italic line
 * spanning the full row.
 *
 * Server Component.
 */

import { MetricCard } from "@/components/specialist/operations-shared";
import type { PeerRankRow } from "@/lib/mock-data/specialist/performance";
import { cn } from "@/lib/utils/cn";

export function PeerRankList({
  peers,
  comparisonsAnonymous,
}: {
  peers: ReadonlyArray<PeerRankRow>;
  comparisonsAnonymous: boolean;
}) {
  return (
    <MetricCard
      label="Peer ranking"
      title="You vs. all specialists"
      span={6}
      {...(comparisonsAnonymous
        ? { trend: { tone: "default" as const, text: "Anonymized · category averages" } }
        : {})}
    >
      <div className="flex flex-col gap-0">
        {peers.map((p) => (
          <PeerRow key={p.id} peer={p} />
        ))}
      </div>
    </MetricCard>
  );
}

function PeerRow({ peer }: { peer: PeerRankRow }) {
  if (peer.ellipsisLabel) {
    return (
      <div className="border-line-soft border-b py-2.5 text-center font-body text-[11.5px] italic text-ink-mute last:border-b-0">
        {peer.ellipsisLabel}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "border-line-soft grid grid-cols-[24px_minmax(0,1fr)_auto_auto] items-center gap-3 border-b py-2.5 last:border-b-0",
        peer.isYou && "bg-cream -mx-2 rounded-md border-line px-3.5",
      )}
    >
      <span
        className={cn(
          "text-right font-mono text-[11.5px] font-semibold tabular-nums",
          peer.isYou ? "text-ink" : "text-ink-mute",
        )}
      >
        #{peer.rank}
      </span>
      <span className="flex items-center gap-1.5 truncate text-[13px] font-medium text-ink">
        <span className="truncate">{peer.name}</span>
        {peer.isYou ? (
          <span className="bg-ink text-paper rounded-[3px] px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">
            You
          </span>
        ) : null}
      </span>
      <span className="font-mono text-[10px] tracking-[0.04em] text-ink-mute">
        {peer.category}
      </span>
      <span className="font-mono text-[12.5px] font-semibold text-ink tabular-nums">
        {peer.score}
      </span>
    </div>
  );
}
