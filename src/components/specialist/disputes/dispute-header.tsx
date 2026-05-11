/**
 * Dispute detail header — breadcrumb (Disputes / DSP-2026-04-12) +
 * case title (e.g. "Sofia Reyes vs. Quill & Co" with status pill) +
 * meta row + 3 action buttons (Audit log / Export PDF / Escalate).
 *
 * "Audit log" and "Export PDF" are decorative this session. "Escalate"
 * is wired — fires the parent's `onEscalate` callback which opens the
 * placeholder modal and triggers the approved-flash on confirm.
 *
 * Per source HTML, "Escalate to admin" lives in the header (NOT the
 * decision bar). The decision bar at the bottom carries Save draft +
 * Open decision form only. The user's 5.2 directive 6 specified 3
 * buttons in the bar; we follow the source HTML's actual placement
 * since "HTML wins" governs visible layout. See deliverable note.
 *
 * Client Component (the Escalate trigger needs to fire onClick).
 */

"use client";

import Link from "next/link";
import { ChevronRight, FileText, Download, ShieldAlert } from "lucide-react";
import type { Dispute } from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

const STATE_PILL: Record<
  Dispute["state"],
  { label: string; className: string }
> = {
  open: { label: "OPEN", className: "bg-danger-bg text-danger" },
  "in-progress": {
    label: "IN PROGRESS",
    className: "bg-amber/15 text-amber",
  },
  "under-review": {
    label: "UNDER REVIEW",
    className: "bg-amber/15 text-amber",
  },
  "resolved-favor-claimant": {
    label: "RESOLVED · FAVOR CLAIMANT",
    className: "bg-success-bg text-success",
  },
  "resolved-favor-respondent": {
    label: "RESOLVED · FAVOR RESPONDENT",
    className: "bg-success-bg text-success",
  },
  "resolved-partial": {
    label: "RESOLVED · PARTIAL",
    className: "bg-success-bg text-success",
  },
  "resolved-dismissed": {
    label: "DISMISSED",
    className: "bg-cream-deep text-ink-soft",
  },
  escalated: {
    label: "ESCALATED",
    className: "bg-navy/10 text-navy",
  },
};

export function DisputeHeader({
  dispute,
  onEscalate,
  onJumpToAuditTab,
  onExportPdf,
}: {
  dispute: Dispute;
  onEscalate: () => void;
  /** B3 — jumps the tab strip to the Audit log tab. Owned by parent
   *  (DisputeDetail) because that's where activeTab lives. */
  onJumpToAuditTab?: (() => void) | undefined;
  /** B4 — fires the parent's queued-flash with "Case PDF queued for
   *  export…" copy. */
  onExportPdf?: (() => void) | undefined;
}) {
  const pill = STATE_PILL[dispute.state];
  return (
    <header className="bg-paper border-line border-b px-9 pt-[22px] pb-[18px] max-md:px-5">
      <nav
        aria-label="Breadcrumb"
        className="mb-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-mute"
      >
        {/* B1 — source HTML has the "Disputes" segment as a hash link;
            build now wires it to drop `?id=` and land on the
            default-resolved dispute (per DISPUTE_DEFAULT_ID). Functions
            as a "return to disputes index" breadcrumb. */}
        <Link
          href="/specialist/disputes"
          className="hover:text-ink-soft transition-colors"
        >
          Disputes
        </Link>
        <ChevronRight
          className="h-3 w-3 text-line"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span>{dispute.caseId}</span>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2
            className="font-display m-0 flex flex-wrap items-center gap-2.5 text-[26px] font-normal leading-[1.1] tracking-[-0.02em] text-ink"
            style={{ fontVariationSettings: '"opsz" 96' }}
          >
            <span>{dispute.claimantName}</span>
            <em className="font-display italic text-ink-soft">vs.</em>
            <span>{dispute.respondentName}</span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase",
                pill.className,
              )}
            >
              {pill.label}
            </span>
          </h2>
          <div className="mt-2 flex flex-wrap gap-[18px] font-mono text-[11px] tracking-[0.04em] text-ink-mute">
            <span>
              <strong className="font-medium text-ink-soft">Filed:</strong>{" "}
              {dispute.filedLabel}
            </span>
            <span>
              <strong className="font-medium text-ink-soft">Type:</strong>{" "}
              {dispute.reasonLabel}
            </span>
            {dispute.amountLabel ? (
              <span>
                <strong className="font-medium text-ink-soft">Amount:</strong>{" "}
                {dispute.amountLabel}
              </span>
            ) : null}
            <span>
              <strong className="font-medium text-ink-soft">Days open:</strong>{" "}
              {dispute.daysOpen}
            </span>
          </div>
        </div>
        <div className="flex flex-shrink-0 gap-1.5">
          <ActionBtn onClick={onJumpToAuditTab}>
            <FileText className="h-3 w-3" strokeWidth={1.5} />
            Audit log
          </ActionBtn>
          <ActionBtn onClick={onExportPdf}>
            <Download className="h-3 w-3" strokeWidth={1.5} />
            Export PDF
          </ActionBtn>
          <ActionBtn variant="primary" onClick={onEscalate}>
            <ShieldAlert className="h-3 w-3" strokeWidth={1.5} />
            Escalate to admin
          </ActionBtn>
        </div>
      </div>
    </header>
  );
}

function ActionBtn({
  children,
  variant = "default",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "default" | "primary";
  onClick?: (() => void) | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-line inline-flex items-center gap-1.5 rounded-lg border px-3 py-[7px] font-body text-[12px] transition-colors",
        variant === "primary"
          ? "bg-ink text-paper border-ink hover:bg-ink-soft hover:border-ink-soft"
          : "bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
