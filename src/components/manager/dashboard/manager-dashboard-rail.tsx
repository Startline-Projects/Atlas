"use client";

/**
 * ManagerDashboardRail — right-rail content in Manager Mode.
 *
 * Three cards stacked top-to-bottom:
 *
 *   1. **OnCallCard** — SHARED via direct import from
 *      `specialist/dashboard/on-call-card.tsx` (per Step 3 Q5 lock).
 *      On-call data is genuinely shared across modes (Sofia Reyes
 *      call applies to both); duplicating would create drift.
 *   2. **Manager Quick Actions** — 5 buttons. Each triggers the
 *      placeholder modal in Step 3 with its own `landsInStep`.
 *   3. **Manager daily report status card** — Pending submission;
 *      Submit-now CTA triggers placeholder modal (Step 11).
 *
 * Inlined `QuickActionsCard` + `DailyReportCard` per Step 3 Q6.
 *
 * Owns the placeholder-modal state for both inlined cards.
 *
 * Layout: same `<aside>` chrome as Specialist `DashboardRail` —
 * `flex flex-col gap-4 self-start lg:sticky lg:top-[calc(36px+57px+1rem)]`
 * — so the Manager rail visually matches when the mode swaps.
 */

import { useState } from "react";
import Link from "next/link";
import { OnCallCard } from "@/components/specialist/dashboard/on-call-card";
import {
  managerDailyReportState,
  managerQuickActions,
  type ManagerActionCTA,
  type ManagerQuickAction,
} from "@/lib/mock-data/manager/manager-rail";
import { ManagerActionPlaceholderModal } from "./manager-action-placeholder-modal";
import { cn } from "@/lib/utils/cn";

export function ManagerDashboardRail() {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  return (
    <aside className="flex flex-col gap-4 self-start lg:sticky lg:top-[calc(36px+57px+1rem)]">
      <OnCallCard />
      <QuickActionsCard onAction={(cta) => setActiveCta(cta)} />
      <DailyReportCard onAction={(cta) => setActiveCta(cta)} />
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </aside>
  );
}

/* ============================================================
   Quick actions card — 5 buttons
   ============================================================ */

function QuickActionsCard({
  onAction,
}: {
  onAction: (cta: ManagerActionCTA) => void;
}) {
  return (
    <div className="bg-paper border-line rounded-md border p-4">
      <div className="text-ink mb-3 text-[12.5px] font-semibold">
        Quick actions
      </div>
      <div className="flex flex-col gap-1.5">
        {managerQuickActions.map((action) => (
          <QuickActionButton
            key={action.id}
            action={action}
            onClick={() => onAction(action)}
          />
        ))}
      </div>
    </div>
  );
}

function QuickActionButton({
  action,
  onClick,
}: {
  action: ManagerQuickAction;
  onClick: () => void;
}) {
  const className = cn(
    "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-left text-[12.5px] font-medium transition-colors",
    action.isPrimary
      ? "bg-ink text-paper border-ink hover:bg-ink-soft"
      : "bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink",
  );

  /* Step 6+ un-disable pattern: actions with `href` render as real
     `<Link>` (the target step has landed). Without `href`, button
     opens the placeholder modal. */
  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        <QuickActionIcon iconKey={action.iconKey} />
        <span className="flex-1">{action.label}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <QuickActionIcon iconKey={action.iconKey} />
      <span className="flex-1">{action.label}</span>
    </button>
  );
}

function QuickActionIcon({
  iconKey,
}: {
  iconKey: ManagerQuickAction["iconKey"];
}) {
  switch (iconKey) {
    case "submit-daily":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2.5" y="3" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2.5 6h11M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="m6 10 1.2 1.2L9.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "schedule-1on1":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2 6h12M5 2v2M11 2v2M5 9h2M9 9h2M5 11h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "audit-specialist":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="3" y="2.5" width="10" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5.5 6h5M5.5 8.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="11.5" cy="11.5" r="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="m13 13 1.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "team-analytics":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 13V3M5 13V6M8 13V8M11 13V4M14 13V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "run-sprint":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M9 1.5 4 9h3l-1 5.5L11 7H8l1-5.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ============================================================
   Daily report status card
   ============================================================ */

function DailyReportCard({
  onAction,
}: {
  onAction: (cta: ManagerActionCTA) => void;
}) {
  const state = managerDailyReportState;
  return (
    <div className="bg-paper border-line rounded-md border p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-ink text-[12.5px] font-semibold">
          Manager daily report
        </span>
        <span className="text-ink-mute font-mono text-[9.5px] tracking-[0.04em]">
          {state.dueLabel}
        </span>
      </div>
      <div className="bg-cream mb-3 flex items-center gap-2.5 rounded-md p-3">
        <div
          aria-hidden="true"
          className="text-amber bg-amber-bg grid h-7 w-7 flex-shrink-0 place-items-center rounded-full"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-ink text-[12.5px] font-semibold">
            {state.statusTitle}
          </div>
          <div className="text-ink-mute text-[11px]">{state.statusSub}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onAction(state.cta)}
        className="bg-ink text-paper hover:bg-ink-soft w-full rounded-md py-2 text-[12.5px] font-medium transition-colors"
      >
        {state.cta.label}
      </button>
    </div>
  );
}
