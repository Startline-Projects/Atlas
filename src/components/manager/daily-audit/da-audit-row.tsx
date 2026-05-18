"use client";

/**
 * DaAuditRow — single audit row.
 *
 * Head (always visible) + collapsible detail panel. Detail forks on
 * 4 `dailyActivity.kind` variants. Inline sub-components are defined
 * at the bottom of the file rather than as separate files (per Step 6
 * "component size watch" — if this file crosses 400 LOC extract,
 * otherwise inline).
 *
 * ## Head layout
 *
 *   avatar · name + flag (+ "You" tag for Mateo) · role · status
 *   badge · summary · chevron
 *
 * ## Detail panels
 *
 *   - SUBMITTED → 4 activity-count tiles + status note + action buttons
 *     (Approve / Flag for follow-up / Request clarification / View profile)
 *   - PENDING → 4 partial-count tiles + status note + action buttons
 *     (Send reminder / Mark excused / View profile)
 *   - MISSED → status note (no tiles per Q4 — no data) + action buttons
 *     (Send reminder / Mark excused / Flag for performance review /
 *     View profile)
 *   - EXCUSED → status note (no tiles per Q4) + action buttons
 *     (View profile / Adjust excused dates)
 *
 * Mateo's SUBMITTED row gets custom buttons (Edit my submission +
 * View dashboard) per Q6.
 *
 * ## CTAs
 *
 * All audit-action buttons (Approve / Flag / Request clarification /
 * Send reminder / Mark excused / Flag for performance review / Adjust
 * excused dates / Edit my submission) trigger the placeholder modal.
 * The "View profile / View dashboard" buttons are real Links.
 */

import { useState } from "react";
import Link from "next/link";
import {
  type Specialist,
  type DailyActivityState,
} from "@/lib/mock-data/manager/team";
import { countryFlag } from "@/lib/utils/country-flag";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Status meta
   ============================================================ */

const STATUS_BADGE_CLASS: Record<DailyActivityState["kind"], string> = {
  submitted: "bg-success-bg text-success border-success/30",
  pending: "bg-amber-bg text-amber border-amber/30",
  missed: "bg-danger-bg text-danger border-danger/30",
  excused: "bg-cream-deep text-ink-soft border-line",
};

function statusBadgeLabel(kind: DailyActivityState["kind"], state: DailyActivityState): string {
  switch (kind) {
    case "submitted": return "Submitted";
    case "pending": return "Pending";
    case "missed":
      return `Missed · ${state.kind === "missed" ? state.daysCount : 0}d`;
    case "excused": return "Excused";
  }
}

const ROW_BORDER_CLASS: Record<DailyActivityState["kind"], string> = {
  submitted: "border-line",
  pending: "border-l-amber border-l-[3px]",
  missed: "border-l-danger border-l-[3px]",
  excused: "border-line",
};

/* ============================================================
   Audit action CTAs (all modal-triggered)
   ============================================================ */

const APPROVE_CTA: ManagerActionCTA = {
  label: "Approve submission",
  landsInStep: 14,
  description: "Approve / flag actions — coming soon.",
};
const FLAG_FOLLOWUP_CTA: ManagerActionCTA = {
  label: "Flag for follow-up",
  landsInStep: 14,
  description: "Approve / flag actions — coming soon.",
};
const CLARIFY_CTA: ManagerActionCTA = {
  label: "Request clarification",
  landsInStep: 14,
  description: "Approve / flag actions — coming soon.",
};
const SEND_REMINDER_CTA: ManagerActionCTA = {
  label: "Send reminder",
  landsInStep: 13,
};
const MARK_EXCUSED_CTA: ManagerActionCTA = {
  label: "Mark excused",
  landsInStep: 14,
  description: "Excused-absence flow — coming soon.",
};
const FLAG_REVIEW_CTA: ManagerActionCTA = {
  label: "Flag for performance review",
  landsInStep: 14,
  description: "Performance-review flow — coming soon.",
};
const ADJUST_EXCUSE_CTA: ManagerActionCTA = {
  label: "Adjust excused dates",
  landsInStep: 14,
  description: "Excused-absence flow — coming soon.",
};
/* Edit my submission — Mateo's row only — currently rendered as a
   disabled span (per Step 6 Q6 lock; Step 11 will flip to a real
   Link to /specialist/manager-daily-activity). No modal CTA needed. */

/* ============================================================
   Row component
   ============================================================ */

type DaAuditRowProps = {
  specialist: Specialist;
  isExpanded: boolean;
  onToggle: () => void;
  registerRef: (el: HTMLElement | null) => void;
};

export function DaAuditRow({
  specialist: s,
  isExpanded,
  onToggle,
  registerRef,
}: DaAuditRowProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const kind = s.dailyActivity.kind;

  return (
    <article
      ref={registerRef}
      className={cn(
        "bg-paper shadow-sm overflow-hidden rounded-md border transition-colors",
        ROW_BORDER_CLASS[kind],
      )}
    >
      {/* Head — clickable toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="hover:bg-cream/40 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
      >
        <MgrAvatar
          slot={s.avatarSlot}
          initials={s.initials}
          fullName={s.fullName}
          size="md"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="text-ink flex items-center gap-1.5 text-[13.5px] font-semibold leading-tight">
            {s.fullName}{" "}
            <span aria-hidden="true">{countryFlag(s.countryCode)}</span>
            {s.isManager ? (
              <span className="bg-lime text-ink ml-1 rounded-[3px] px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">
                You
              </span>
            ) : null}
          </div>
          <div className="text-ink-mute mt-0.5 text-[11.5px]">{s.role}</div>
        </div>
        <span
          className={cn(
            "flex-shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_BADGE_CLASS[kind],
          )}
        >
          ● {statusBadgeLabel(kind, s.dailyActivity)}
        </span>
        <RowSummary specialist={s} />
        <ChevronIcon expanded={isExpanded} />
      </button>

      {/* Detail panel — forks on status */}
      {isExpanded ? (
        <div className="border-line-soft border-t px-4 py-4">
          <DetailPanel specialist={s} onAction={setActiveCta} />
        </div>
      ) : null}

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </article>
  );
}

/* ============================================================
   Row summary — varies by status
   ============================================================ */

function RowSummary({ specialist: s }: { specialist: Specialist }) {
  const t = s.todayActivity;
  switch (s.dailyActivity.kind) {
    case "submitted": {
      const fragments: string[] = [];
      if (t.outreach > 0) fragments.push(`${t.outreach} outreach`);
      if (t.checkIns > 0) fragments.push(`${t.checkIns} check-in${t.checkIns === 1 ? "" : "s"}`);
      if (t.interviews > 0) fragments.push(`${t.interviews} interview${t.interviews === 1 ? "" : "s"}`);
      if (t.signups > 0) fragments.push(`${t.signups} signup${t.signups === 1 ? "" : "s"}`);
      return (
        <div className="text-ink-soft hidden flex-1 items-baseline justify-end gap-3 px-3 text-[12px] md:flex">
          <span className="truncate">{fragments.join(" · ")}</span>
          <span className="text-ink-mute font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap">
            {s.dailyActivity.timeLabel}
          </span>
        </div>
      );
    }
    case "pending":
      return (
        <div className="text-ink-soft hidden flex-1 items-baseline justify-end px-3 text-[12px] md:flex">
          <span>
            <strong className="text-ink">Due 11:59 PM</strong> · last activity{" "}
            {s.dailyActivity.lastActivityLabel}
          </span>
        </div>
      );
    case "missed":
      return (
        <div className="text-ink-soft hidden flex-1 items-baseline justify-end px-3 text-[12px] md:flex">
          <span>
            Last submitted{" "}
            <strong className="text-ink">{s.dailyActivity.lastSubmittedDate}</strong> at{" "}
            {s.dailyActivity.lastSubmittedTime}
          </span>
        </div>
      );
    case "excused": {
      const coverageName = s.coverageSpecialistId
        ? s.coverageSpecialistId.replace("spec-", "").split("-").map(capitalize).join(" ")
        : "—";
      return (
        <div className="text-ink-soft hidden flex-1 items-baseline justify-end px-3 text-[12px] md:flex">
          <span>
            On vacation · resumes {s.dailyActivity.resumesDate} · coverage by{" "}
            {coverageName}
          </span>
        </div>
      );
    }
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={cn(
        "text-ink-mute flex-shrink-0 transition-transform",
        expanded && "rotate-90",
      )}
    >
      <path
        d="m4 3 3 2.5L4 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   Detail panel — forks on status
   ============================================================ */

function DetailPanel({
  specialist: s,
  onAction,
}: {
  specialist: Specialist;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  switch (s.dailyActivity.kind) {
    case "submitted":
      return <SubmittedDetail specialist={s} onAction={onAction} />;
    case "pending":
      return <PendingDetail specialist={s} onAction={onAction} />;
    case "missed":
      return <MissedDetail specialist={s} onAction={onAction} />;
    case "excused":
      return <ExcusedDetail specialist={s} onAction={onAction} />;
  }
}

/* ============================================================
   SUBMITTED detail
   ============================================================ */

function SubmittedDetail({
  specialist: s,
  onAction,
}: {
  specialist: Specialist;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  if (s.dailyActivity.kind !== "submitted") return null;
  const isSelf = s.isManager === true;
  return (
    <div className="flex flex-col gap-4">
      <ActivityTiles specialist={s} label="Today's activity" />
      <NoteBlock label="Status">
        Submitted on time at <strong>{s.dailyActivity.timeLabel}</strong>. All
        4 activity categories logged for {s.firstName}.
      </NoteBlock>
      <div className="flex flex-wrap gap-2">
        {isSelf ? (
          /* Mateo's row — Q6 lock. */
          <>
            <span
              aria-disabled="true"
              title="Manager daily submission — Step 11"
              className="border-line text-ink-mute bg-cream/60 inline-flex cursor-not-allowed items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium opacity-70"
            >
              Edit my submission
            </span>
            <Link
              href="/specialist/dashboard"
              className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
            >
              View dashboard →
            </Link>
          </>
        ) : (
          <>
            <ActionButton tone="success" onClick={() => onAction(APPROVE_CTA)}>
              Approve submission
            </ActionButton>
            <ActionButton tone="warn" onClick={() => onAction(FLAG_FOLLOWUP_CTA)}>
              Flag for follow-up
            </ActionButton>
            <ActionButton tone="neutral" onClick={() => onAction(CLARIFY_CTA)}>
              Request clarification
            </ActionButton>
            <ViewProfileLink specialistId={s.id} />
          </>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PENDING detail
   ============================================================ */

function PendingDetail({
  specialist: s,
  onAction,
}: {
  specialist: Specialist;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  if (s.dailyActivity.kind !== "pending") return null;
  return (
    <div className="flex flex-col gap-4">
      <ActivityTiles specialist={s} label="Today's activity so far" />
      <NoteBlock label="Status" tone="amber">
        {s.firstName} hasn&apos;t submitted yet. Last activity{" "}
        <strong>{s.dailyActivity.lastActivityLabel}</strong>. Submission expected
        by <strong>{s.dailyActivity.dueLabel.replace("due ", "")}</strong>.
      </NoteBlock>
      <div className="flex flex-wrap gap-2">
        <ActionButton tone="primary" onClick={() => onAction(SEND_REMINDER_CTA)}>
          Send reminder
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(MARK_EXCUSED_CTA)}>
          Mark excused…
        </ActionButton>
        <ViewProfileLink specialistId={s.id} />
      </div>
    </div>
  );
}

/* ============================================================
   MISSED detail
   ============================================================ */

function MissedDetail({
  specialist: s,
  onAction,
}: {
  specialist: Specialist;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  if (s.dailyActivity.kind !== "missed") return null;
  return (
    <div className="flex flex-col gap-4">
      <NoteBlock label="Status" tone="danger">
        {s.firstName} has not submitted daily activity for{" "}
        <strong>{s.dailyActivity.daysCount} consecutive days</strong>. Last
        successful submission was{" "}
        <strong>
          {s.dailyActivity.lastSubmittedDate} at {s.dailyActivity.lastSubmittedTime}
        </strong>
        . No excused absence on file.
      </NoteBlock>
      <div className="flex flex-wrap gap-2">
        <ActionButton tone="primary" onClick={() => onAction(SEND_REMINDER_CTA)}>
          Send reminder
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(MARK_EXCUSED_CTA)}>
          Mark excused…
        </ActionButton>
        <ActionButton tone="warn" onClick={() => onAction(FLAG_REVIEW_CTA)}>
          Flag for performance review
        </ActionButton>
        <ViewProfileLink specialistId={s.id} />
      </div>
    </div>
  );
}

/* ============================================================
   EXCUSED detail
   ============================================================ */

function ExcusedDetail({
  specialist: s,
  onAction,
}: {
  specialist: Specialist;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  if (s.dailyActivity.kind !== "excused") return null;
  const coverageName = s.coverageSpecialistId
    ? s.coverageSpecialistId.replace("spec-", "").split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")
    : "—";
  return (
    <div className="flex flex-col gap-4">
      <NoteBlock label="Excused absence">
        {s.firstName} is on approved vacation. Coverage by{" "}
        <strong>{coverageName}</strong>. Resumes{" "}
        <strong>{s.dailyActivity.resumesDate}</strong>.
      </NoteBlock>
      <div className="flex flex-wrap gap-2">
        <ViewProfileLink specialistId={s.id} />
        <ActionButton tone="neutral" onClick={() => onAction(ADJUST_EXCUSE_CTA)}>
          Adjust excused dates
        </ActionButton>
      </div>
    </div>
  );
}

/* ============================================================
   Shared sub-components
   ============================================================ */

function ActivityTiles({
  specialist: s,
  label,
}: {
  specialist: Specialist;
  label: string;
}) {
  const t = s.todayActivity;
  return (
    <div>
      <div className="text-ink-mute mb-2 font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        <Tile label="Outreach" value={t.outreach} />
        <Tile label="Check-ins" value={t.checkIns} />
        <Tile label="Interviews" value={t.interviews} />
        <Tile label="Signups" value={t.signups} />
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-cream/40 border-line-soft flex flex-col gap-1 rounded-md border px-3 py-2.5">
      <div className="text-ink-mute font-mono text-[9px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div
        className="font-display text-ink text-[22px] leading-none font-medium tracking-[-0.015em]"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {value}
      </div>
    </div>
  );
}

function NoteBlock({
  label,
  tone,
  children,
}: {
  label: string;
  tone?: "amber" | "danger";
  children: React.ReactNode;
}) {
  const wrapperClass =
    tone === "danger"
      ? "bg-danger-bg/40 border-danger/30"
      : tone === "amber"
        ? "bg-amber-bg/40 border-amber/30"
        : "bg-cream/40 border-line";
  const labelClass =
    tone === "danger" ? "text-danger" : tone === "amber" ? "text-amber" : "text-ink-mute";
  return (
    <div className={cn("rounded-md border p-3", wrapperClass)}>
      <div className={cn("mb-1 font-mono text-[9.5px] tracking-[0.14em] uppercase", labelClass)}>
        {label}
      </div>
      <p className="text-ink-soft m-0 text-[13px] leading-[1.45]">{children}</p>
    </div>
  );
}

function ActionButton({
  tone,
  onClick,
  children,
}: {
  tone: "primary" | "success" | "warn" | "neutral";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const className =
    tone === "primary" ? "bg-ink text-paper hover:bg-ink-soft border-ink"
    : tone === "success" ? "bg-success-bg text-success hover:bg-success-bg/80 border-success/40"
    : tone === "warn" ? "bg-amber-bg text-amber hover:bg-amber-bg/80 border-amber/40"
    : "bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

function ViewProfileLink({ specialistId }: { specialistId: Specialist["id"] }) {
  return (
    <Link
      href={`/specialist/team/${specialistId}`}
      className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
    >
      View profile →
    </Link>
  );
}
