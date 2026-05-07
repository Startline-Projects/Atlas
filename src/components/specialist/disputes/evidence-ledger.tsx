/**
 * Section 04 — evidence ledger. List of evidence items, each with icon
 * + filename + meta + source pill + View action.
 *
 * "View all N" CTA expands the list when more items exist than are
 * shown by default.
 *
 * Server Component (the View buttons are decorative this session — no
 * file viewer wired).
 */

import {
  FileText,
  FileType,
  Image as ImageIcon,
  Sheet,
} from "lucide-react";
import type {
  DisputeEvidenceItem,
  DisputeEvidenceSource,
} from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

const KIND_ICON = {
  pdf: FileType,
  doc: FileText,
  image: ImageIcon,
  spreadsheet: Sheet,
} as const;

const SOURCE_TONE: Record<DisputeEvidenceSource, string> = {
  claimant: "bg-success-bg text-success",
  respondent: "bg-amber/15 text-amber",
  atlas: "bg-navy/10 text-navy",
};

const SOURCE_LABEL: Record<DisputeEvidenceSource, string> = {
  claimant: "CLAIMANT",
  respondent: "RESPONDENT",
  atlas: "ATLAS RECORD",
};

export function EvidenceLedger({
  items,
  totalCount,
  reviewedCount,
}: {
  items: ReadonlyArray<DisputeEvidenceItem>;
  totalCount: number;
  reviewedCount: number;
}) {
  const hasMore = totalCount > items.length;
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <EvidenceLedgerRow key={item.id} item={item} />
      ))}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink-mute">
          Reviewed {reviewedCount} of {totalCount}
        </span>
        {hasMore ? (
          <button
            type="button"
            className="border-line bg-paper hover:bg-cream-deep rounded-md border px-3 py-1.5 font-body text-[12px] text-ink-soft transition-colors hover:text-ink"
          >
            View all {totalCount} →
          </button>
        ) : null}
      </div>
    </div>
  );
}

function EvidenceLedgerRow({ item }: { item: DisputeEvidenceItem }) {
  const Icon = KIND_ICON[item.kind];
  return (
    <div className="bg-cream hover:bg-cream-deep border-line grid grid-cols-[36px_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-lg border px-3.5 py-3 transition-colors">
      <div
        className="bg-paper border-line-soft grid h-9 w-9 place-items-center rounded-md border text-ink-soft"
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 truncate text-[13px] font-medium text-ink">
          {item.filename}
        </div>
        <div className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
          {item.meta}
        </div>
      </div>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase",
          SOURCE_TONE[item.source],
        )}
      >
        {SOURCE_LABEL[item.source]}
      </span>
      <button
        type="button"
        className="border-line bg-transparent hover:bg-paper rounded-md border px-2.5 py-1 font-body text-[11px] text-ink-mute transition-colors hover:text-ink-soft"
      >
        View
      </button>
    </div>
  );
}
