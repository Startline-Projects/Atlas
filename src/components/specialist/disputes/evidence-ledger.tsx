/**
 * Section 04 — evidence ledger. List of evidence items, each with icon
 * + filename + meta + source pill + View action.
 *
 * Step 10 polish:
 *   - Each row's "View" button is wired via `onEvidencePreview` —
 *     parent (DisputeDetail) opens `PreviewUnavailableModal kind="document"`
 *     with the filename as subject. All 4 evidence kinds in mock
 *     (pdf/doc/image/spreadsheet) are document-class and map to the
 *     "document" kind (its body copy already covers this case).
 *
 *   - The footer was previously: "Reviewed N of M" + a "View all M →"
 *     button when `totalCount > items.length`. The button promised
 *     data the mock doesn't carry (`evidenceTotalCount` exceeds
 *     `evidence.length` by design — the gap represents items that
 *     would land via the storage service backfill). Flash-treating
 *     it would be dishonest about *why* the data is missing (it's a
 *     mock-data limitation, not a service limitation). Replaced with
 *     a non-interactive styled span:
 *
 *         "Viewing {items.length} of {totalCount} evidence items"
 *
 *     Pure information; no click affordance. When backend storage
 *     lands and the mock backfills the array to match `totalCount`,
 *     the span will read "Viewing 7 of 7 evidence items" and no UI
 *     change is needed.
 *
 * Server Component (the View button onClick is a prop callback owned
 * by the parent; this component itself remains a Server Component).
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
  onEvidencePreview,
}: {
  items: ReadonlyArray<DisputeEvidenceItem>;
  totalCount: number;
  reviewedCount: number;
  /** Per-row "View" click handler. Parent opens
   *  PreviewUnavailableModal kind="document". When omitted the View
   *  button stays decorative. */
  onEvidencePreview?: ((item: DisputeEvidenceItem) => void) | undefined;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <EvidenceLedgerRow
          key={item.id}
          item={item}
          {...(onEvidencePreview
            ? { onPreview: () => onEvidencePreview(item) }
            : {})}
        />
      ))}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink-mute">
          Reviewed {reviewedCount} of {totalCount}
        </span>
        {/* Step 10: previously a "View all N →" button — now a
            non-interactive informational span. See top-of-file note. */}
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink-mute">
          Viewing {items.length} of {totalCount} evidence items
        </span>
      </div>
    </div>
  );
}

function EvidenceLedgerRow({
  item,
  onPreview,
}: {
  item: DisputeEvidenceItem;
  onPreview?: (() => void) | undefined;
}) {
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
        onClick={onPreview}
        className="border-line bg-transparent hover:bg-paper cursor-pointer rounded-md border px-2.5 py-1 font-body text-[11px] text-ink-mute transition-colors hover:text-ink-soft"
      >
        View
      </button>
    </div>
  );
}
