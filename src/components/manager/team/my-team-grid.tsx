"use client";

/**
 * MyTeamGrid — renders the 11 SpecialistCards + empty state.
 *
 * Receives the already-filtered + sorted list from `MyTeamApp`.
 * Owns the placeholder-modal state for the 1:1 action button.
 *
 * Inlined `SpecialistCard` per Step 3 Q6 — one file, easier to
 * follow card composition.
 *
 * ## CTA pattern (per Step 3 Q2 / Step 4 Q1)
 *
 *   - Mateo's "is-you" card: View dashboard + Performance buttons
 *     are real `<Link>` to existing Specialist routes.
 *   - Other 10 cards: View profile + Message buttons are DISABLED
 *     `<span aria-disabled>` (their routes land in Steps 5 / 13).
 *     1:1 button is an action that opens the placeholder modal
 *     (`landsInStep: 5`).
 *
 * Ported from `reference/manager.html` lines 27336-27640 (the 11
 * `mt-card` articles + empty state).
 */

import { useState } from "react";
import Link from "next/link";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  getSpecialist,
  type DailyActivityState,
  type Specialist,
  type SpecialistId,
  type SpecialistStatus,
} from "@/lib/mock-data/manager/team";
import { countryFlag } from "@/lib/utils/country-flag";
import { cn } from "@/lib/utils/cn";

const STATUS_BADGE_CLASS: Record<SpecialistStatus, string> = {
  active: "bg-success-bg text-success border-success/30",
  vacation: "bg-cream-deep text-ink-soft border-line",
  capacity: "bg-amber-bg text-amber border-amber/30",
  flag: "bg-danger-bg text-danger border-danger/30",
};

const STATUS_BADGE_LABEL: Record<SpecialistStatus, string> = {
  active: "Active",
  vacation: "On vacation",
  capacity: "At capacity",
  flag: "Performance",
};

const ONE_ON_ONE_CTA: ManagerActionCTA = {
  label: "1:1",
  landsInStep: 5,
  description: "1:1 scheduling lands in Step 5 — Specialist Detail.",
};

type MyTeamGridProps = {
  visible: ReadonlyArray<Specialist>;
  totalCount: number;
  onResetFilters: () => void;
};

export function MyTeamGrid({ visible, totalCount, onResetFilters }: MyTeamGridProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  if (visible.length === 0) {
    return (
      <div className="border-line bg-cream/40 rounded-md border border-dashed px-6 py-12 text-center">
        <h4 className="text-ink m-0 text-[15px] font-semibold">
          No specialists match your filters
        </h4>
        <p className="text-ink-mute mt-1 m-0 text-[13px]">
          Try clearing the search or selecting a different cohort.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink mt-4 inline-flex items-center rounded-md border bg-paper px-3.5 py-2 text-[12.5px] font-medium transition-colors"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => (
          <SpecialistCard
            key={s.id}
            s={s}
            onAction={(cta) => setActiveCta(cta)}
          />
        ))}
      </div>
      {visible.length < totalCount ? (
        <div className="text-ink-mute mt-4 text-center font-mono text-[11px] tracking-[0.04em]">
          Showing {visible.length} of {totalCount}
        </div>
      ) : null}
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </>
  );
}

/* ============================================================
   SpecialistCard — single team-grid card
   ============================================================ */

function SpecialistCard({
  s,
  onAction,
}: {
  s: Specialist;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  return (
    <article
      className={cn(
        "bg-paper border-line shadow-sm flex flex-col gap-3 rounded-md border p-4",
        s.isManager && "border-lime-deep/40 ring-1 ring-lime-deep/20",
        s.status === "vacation" && "bg-cream/60",
      )}
    >
      {/* Head: avatar + name + role + status badge */}
      <header className="flex items-start gap-3">
        <MgrAvatar
          slot={s.avatarSlot}
          initials={s.initials}
          fullName={s.fullName}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <div className="text-ink flex flex-wrap items-center gap-1.5 text-[14px] font-semibold leading-tight">
            {s.fullName}{" "}
            <span aria-hidden="true">{countryFlag(s.countryCode)}</span>
            {s.isManager ? (
              <span className="bg-lime text-ink rounded-[3px] px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">
                You
              </span>
            ) : null}
          </div>
          <div className="text-ink-mute mt-0.5 text-[11.5px]">{s.role}</div>
        </div>
        <span
          className={cn(
            "flex-shrink-0 rounded-full border px-2 py-[3px] font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_BADGE_CLASS[s.status],
          )}
        >
          {STATUS_BADGE_LABEL[s.status]}
        </span>
      </header>

      {/* Meta grid: 4 label/value pairs */}
      <dl className="border-line-soft grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t pt-3 text-[12px]">
        <dt className="text-ink-mute font-mono text-[9.5px] tracking-[0.1em] uppercase">
          Daily activity
        </dt>
        <dd className="m-0 text-right">
          <DailyActivityValue state={s.dailyActivity} />
        </dd>

        <dt className="text-ink-mute font-mono text-[9.5px] tracking-[0.1em] uppercase">
          Workload
        </dt>
        <dd className="text-ink m-0 text-right">
          {s.workload.candidatesCount} cand{" "}
          <span className="text-ink-mute">
            · {s.workload.contractsCount} contracts
          </span>
        </dd>

        <dt className="text-ink-mute font-mono text-[9.5px] tracking-[0.1em] uppercase">
          Performance
        </dt>
        <dd className="m-0 text-right">
          <PerformanceBar score={s.performanceScore} />
        </dd>

        <dt className="text-ink-mute font-mono text-[9.5px] tracking-[0.1em] uppercase">
          {s.status === "vacation" ? "Coverage" : "Last active"}
        </dt>
        <dd className="text-ink m-0 text-right text-[12px]">
          {s.status === "vacation" && s.coverageSpecialistId
            ? coverageSpecialistName(s.coverageSpecialistId)
            : (s.lastActiveLabel ?? "—")}
        </dd>
      </dl>

      {/* Actions */}
      <div className="border-line-soft flex flex-wrap items-center gap-2 border-t pt-3">
        {s.isManager ? (
          /* Mateo's "is-you" treatment: 2 REAL links to existing
             Specialist routes. No Message / 1:1 buttons. */
          <>
            <Link
              href="/specialist/dashboard"
              className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors"
            >
              View dashboard
            </Link>
            <Link
              href="/specialist/performance"
              className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
            >
              Performance
            </Link>
          </>
        ) : (
          /* Other Specialists: 3 buttons.
             - View profile → disabled span (Step 5)
             - Message → disabled span (Step 13)
             - 1:1 → modal trigger (Step 5) */
          <>
            <span
              aria-disabled="true"
              title="Specialist detail lands in Step 5"
              className="border-line text-ink-mute bg-cream/60 inline-flex cursor-not-allowed items-center justify-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium opacity-70"
            >
              View profile
            </span>
            <span
              aria-disabled="true"
              title="Specialist chat lands in Step 13"
              className="border-line text-ink-mute bg-cream/60 inline-flex cursor-not-allowed items-center justify-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium opacity-70"
            >
              Message
            </span>
            {s.status !== "vacation" ? (
              <button
                type="button"
                onClick={() => onAction(ONE_ON_ONE_CTA)}
                className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
              >
                1:1
              </button>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   DailyActivityValue — discriminated-union render
   ============================================================ */

function DailyActivityValue({ state }: { state: DailyActivityState }) {
  if (state.kind === "submitted") {
    return (
      <span className="text-success inline-flex items-center justify-end gap-1.5 font-medium">
        ✓ Submitted{" "}
        <span className="text-ink-mute font-normal">· {state.timeLabel}</span>
      </span>
    );
  }
  if (state.kind === "pending") {
    return (
      <span className="text-amber inline-flex items-center justify-end gap-1.5 font-medium">
        ⏳ Pending{" "}
        <span className="text-ink-mute font-normal">· {state.dueLabel}</span>
      </span>
    );
  }
  if (state.kind === "missed") {
    return (
      <span className="text-danger inline-flex items-center justify-end gap-1.5 font-medium">
        ⚠ Not submitted{" "}
        <span className="text-ink-mute font-normal">
          · {state.daysCount} day{state.daysCount === 1 ? "" : "s"}
        </span>
      </span>
    );
  }
  /* excused */
  return (
    <span className="text-ink-mute inline-flex items-center justify-end gap-1.5">
      —{" "}
      <span className="text-ink-mute font-normal">
        · excused until {state.untilLabel}
      </span>
    </span>
  );
}

/* ============================================================
   PerformanceBar — 3-band score visual
   ============================================================ */

function PerformanceBar({ score }: { score: number }) {
  /* Bands per team.ts file-header lock:
     high ≥85 → success, mid 75-84 → amber, low <75 → danger */
  const band: "high" | "mid" | "low" =
    score >= 85 ? "high" : score >= 75 ? "mid" : "low";
  const valueTone: string =
    score >= 95 ? "text-success font-semibold"
    : band === "mid" ? "text-amber font-medium"
    : "text-ink font-medium";
  const barTone: string =
    band === "high" ? "bg-success"
    : band === "mid" ? "bg-amber"
    : "bg-danger";
  return (
    <span className="inline-flex items-center justify-end gap-2">
      <span
        aria-hidden="true"
        className="bg-cream-deep relative inline-block h-1 w-12 overflow-hidden rounded-full"
      >
        <span
          className={cn("absolute inset-y-0 left-0 rounded-full", barTone)}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </span>
      <span className={cn("tabular-nums", valueTone)}>{score}</span>
    </span>
  );
}

/* ============================================================
   Coverage-name helper — local utility for the "Coverage" cell.
   Only fires when status === "vacation" (Olena's case in Step 4).
   ============================================================ */

function coverageSpecialistName(specialistId: SpecialistId): string {
  return getSpecialist(specialistId)?.fullName ?? "—";
}
