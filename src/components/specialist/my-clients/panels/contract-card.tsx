/**
 * ContractCard — one row in the contracts panel.
 *
 * Stacked-card layout (not table) — same visual density as
 * recert-queue engagement-history and dashboard active-items rows.
 * 3-5 cards per client; richer per-row hierarchy than a table.
 *
 * "View document" button is backend-blocked — opens
 * `PreviewUnavailableModal kind="document"` (wiring lives in the
 * parent panel since it owns the modal state).
 */

import Link from "next/link";
import { FileText } from "lucide-react";
import type {
  ClientContract,
  ContractStatus,
} from "@/lib/mock-data/specialist/client-contracts";
import { cn } from "@/lib/utils/cn";

const STATUS_PILL: Record<ContractStatus, string> = {
  active: "bg-success-bg text-success",
  "expiring-soon": "bg-amber/15 text-amber",
  expired: "bg-cream-deep text-ink-mute",
  draft: "bg-[rgba(214,242,77,0.18)] text-lime-deep",
  completed: "bg-cream-deep text-ink-soft",
};

const STATUS_LABEL: Record<ContractStatus, string> = {
  active: "Active",
  "expiring-soon": "Expiring soon",
  expired: "Expired",
  draft: "Draft",
  completed: "Completed",
};

function formatDate(yyyy_mm_dd: string): string {
  const d = new Date(`${yyyy_mm_dd}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoney(dollars: number): string {
  if (dollars >= 1000) {
    const k = (dollars / 1000).toFixed(dollars >= 10000 ? 1 : 1);
    return `$${k}k`;
  }
  return `$${dollars.toLocaleString("en-US")}`;
}

function formatTerms(terms: ClientContract["terms"]): string {
  if (terms.kind === "hourly") {
    return `$${terms.rate}/hr · ~${terms.estimatedMonthlyHours}h/mo`;
  }
  return `$${terms.monthlyAmount.toLocaleString("en-US")} retainer/mo`;
}

export function ContractCard({
  contract,
  onViewDocument,
}: {
  contract: ClientContract;
  onViewDocument: (c: ClientContract) => void;
}) {
  return (
    <article className="border-line bg-paper shadow-sm flex flex-col gap-3 rounded-md border p-4">
      {/* Top row — role + status pill */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-ink m-0 text-[14px] font-semibold leading-tight">
            {contract.role}
          </h4>
          {contract.candidateName ? (
            <Link
              href={`/specialist/candidate-chat?id=${contract.candidateId}`}
              className="text-ink-mute hover:text-ink mt-0.5 inline-block text-[12px] transition-colors"
            >
              {contract.candidateName}
            </Link>
          ) : (
            <div className="text-ink-mute mt-0.5 text-[12px] italic">
              Unassigned
            </div>
          )}
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_PILL[contract.status],
          )}
        >
          {STATUS_LABEL[contract.status]}
        </span>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 border-line-soft border-t pt-3">
        <Stat label="Terms" value={formatTerms(contract.terms)} />
        <Stat
          label="Hours logged"
          value={contract.totalHoursLogged.toLocaleString("en-US") + "h"}
        />
        <Stat label="Total billed" value={formatMoney(contract.totalBilled)} />
      </div>

      {/* Footer — dates + view document */}
      <div className="flex items-center justify-between gap-3 border-line-soft border-t pt-3">
        <div className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em] uppercase">
          {formatDate(contract.startedDate)}
          {contract.endsDate ? ` → ${formatDate(contract.endsDate)}` : null}
        </div>
        <button
          type="button"
          onClick={() => onViewDocument(contract)}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11.5px] transition-colors"
        >
          <FileText className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
          View document
        </button>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-mute mb-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div className="text-ink text-[12.5px] font-medium leading-tight">
        {value}
      </div>
    </div>
  );
}
