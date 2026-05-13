/**
 * BriefsListBody — pure rendering of a briefs list (Layer A).
 *
 * Owns: list rendering. Empty state is supplied by the consumer
 * (sheet has tab-aware copy; the C2 list page will supply
 * filter-aware copy). When `emptyState` is omitted, a generic
 * fallback renders.
 *
 * Does NOT own:
 *   - Tab state (sheet uses local React state on Open/Closed; C2
 *     page will use a URL querystring)
 *   - Title / subtitle / chrome (see ContractsListBody header for
 *     the Layer A / Layer B convention).
 */

import type { ClientBrief } from "@/lib/mock-data/specialist/client-briefs";
import { BriefCard } from "@/components/specialist/my-clients/panels/brief-card";

type BriefsListBodyProps = {
  briefs: ReadonlyArray<ClientBrief>;
  /** Rendered when `briefs.length === 0`. */
  emptyState?: React.ReactNode;
};

export function BriefsListBody({ briefs, emptyState }: BriefsListBodyProps) {
  if (briefs.length === 0) return <>{emptyState ?? <BriefsDefaultEmptyState />}</>;
  return (
    <div className="flex flex-col gap-2.5">
      {briefs.map((b) => (
        <BriefCard key={b.id} brief={b} />
      ))}
    </div>
  );
}

function BriefsDefaultEmptyState() {
  return (
    <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-4 py-8 text-center text-[13px]">
      <p className="m-0">No briefs to show.</p>
    </div>
  );
}
