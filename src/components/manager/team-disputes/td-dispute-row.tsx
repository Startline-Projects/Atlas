"use client";

/**
 * TdDisputeRow — single dispute row.
 *
 * Head (always visible) + collapsible quick-actions panel.
 * Head layout: status badge · title (with em emphasis per
 * `disputeTitleParts`) · meta line (reason chip / initiator label /
 * "Specialist's first" badge / age / ID) · owner avatar+name ·
 * SLA pill · chevron.
 *
 * Quick-actions vary by status + ownership:
 *   - Mateo-owned (DSP-2026-04-12) → "Open dispute →" + "View as Specialist"
 *   - Escalated → "Open dispute →" + "Take back from Admin" + "Message <owner>"
 *   - SLA-risk (urgent) → "Open dispute →" + "Intervene" + "Message <owner>" + ("Coach" if not first dispute)
 *   - First dispute → "Open dispute →" + "Coach the Specialist" + "Message <owner>"
 *   - Default → "Open dispute →" + "Message <owner>"
 *
 * All audit actions trigger the placeholder modal; "View as
 * Specialist" routes to `/specialist/team/spec-mateo-vargas?tab=performance`
 * (Step 7 Q6 lock — no standalone Disputes tab; stats live in
 * Performance tab).
 */

import { useState } from "react";
import Link from "next/link";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  type Dispute,
  disputeAgeLabel,
  disputeInitiatorIsBold,
  disputeInitiatorLabel,
  disputeReasonLabel,
  disputeTitleParts,
  isOwnedByManager,
  slaBand,
  slaHoursLabel,
  slaLabelSuffix,
  type SlaBand,
} from "@/lib/mock-data/manager/manager-team-disputes-data";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Status meta
   ============================================================ */

const STATUS_BADGE_CLASS: Record<Dispute["status"], string> = {
  open: "bg-cream-deep text-ink-soft border-line",
  progress: "bg-amber-bg text-amber border-amber/30",
  escalated: "bg-danger-bg text-danger border-danger/30",
};

const STATUS_LABEL: Record<Dispute["status"], string> = {
  open: "Open",
  progress: "In progress",
  escalated: "Escalated",
};

const ROW_BORDER_CLASS: Record<SlaBand | "escalated", string> = {
  urgent: "border-l-danger border-l-[3px]",
  warn: "border-l-amber border-l-[3px]",
  neutral: "border-line",
  escalated: "border-l-danger border-l-[3px]",
};

const SLA_PILL_CLASS: Record<SlaBand, string> = {
  urgent: "text-danger",
  warn: "text-amber",
  neutral: "text-ink-soft",
};

/* ============================================================
   Quick-action CTAs
   ============================================================ */

const OPEN_DISPUTE_CTA: ManagerActionCTA = {
  label: "Open dispute",
  landsInStep: 14,
  description: "Per-dispute detail page — coming soon.",
};
const INTERVENE_CTA: ManagerActionCTA = {
  label: "Intervene",
  landsInStep: 14,
  description: "Manager intervention flow — coming soon.",
};
const COACH_CTA: ManagerActionCTA = {
  label: "Coach the Specialist",
  landsInStep: 14,
  description: "Coaching flow — coming soon.",
};
const RECLAIM_CTA: ManagerActionCTA = {
  label: "Take back from Admin",
  landsInStep: 14,
  description: "Reclaim-from-Admin flow — coming soon.",
};

function messageOwnerCta(ownerFirstName: string): ManagerActionCTA {
  return {
    label: `Message ${ownerFirstName}`,
    landsInStep: 13,
  };
}

/* ============================================================
   Row component
   ============================================================ */

type TdDisputeRowProps = {
  dispute: Dispute;
  isExpanded: boolean;
  onToggle: () => void;
};

export function TdDisputeRow({
  dispute: d,
  isExpanded,
  onToggle,
}: TdDisputeRowProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const owner = getSpecialist(d.ownerSpecialistId);
  const isSelf = isOwnedByManager(d);
  const band = slaBand(d);
  const borderKind: SlaBand | "escalated" = d.status === "escalated" ? "escalated" : band;
  const titleParts = disputeTitleParts(d);

  return (
    <article
      className={cn(
        "bg-paper shadow-sm overflow-hidden rounded-md border transition-colors",
        ROW_BORDER_CLASS[borderKind],
      )}
    >
      {/* Head — clickable toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="hover:bg-cream/40 grid w-full grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-4 py-3 text-left transition-colors"
      >
        {/* Status badge */}
        <span
          className={cn(
            "flex-shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_BADGE_CLASS[d.status],
          )}
        >
          ● {STATUS_LABEL[d.status]}
        </span>

        {/* Body — title + meta */}
        <div className="min-w-0">
          <div className="text-ink truncate text-[13.5px] font-semibold leading-tight">
            {titleParts.map((part, i) => (
              <span key={i}>
                {part.emphasized ? (
                  <em className="not-italic">{part.text}</em>
                ) : (
                  part.text
                )}
                {i < titleParts.length - 1 ? (
                  <span className="text-ink-mute"> × </span>
                ) : null}
              </span>
            ))}
          </div>
          <div className="text-ink-mute mt-1 flex flex-wrap items-center gap-2 text-[11.5px]">
            <span className="bg-cream-deep text-ink-soft inline-flex items-center rounded px-1.5 py-px font-medium">
              {disputeReasonLabel(d.reason)}
            </span>
            <span aria-hidden="true">·</span>
            <span className={cn(disputeInitiatorIsBold(d.initiator) && "text-ink font-semibold")}>
              {disputeInitiatorLabel(d.initiator)}
            </span>
            {d.isFirstForOwner && owner ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-ink font-semibold">{owner.firstName}&apos;s first dispute</span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>
              Open <strong className="text-ink-soft">{disputeAgeLabel(d.ageHours)}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[10.5px] tracking-[0.04em]">{d.id}</span>
          </div>
        </div>

        {/* Owner */}
        <div className="hidden flex-shrink-0 items-center gap-2 md:flex">
          {owner ? (
            <>
              <MgrAvatar
                slot={owner.avatarSlot}
                initials={owner.initials}
                fullName={owner.fullName}
                size="sm"
              />
              <span className="text-ink-soft text-[12px] font-medium whitespace-nowrap">
                {owner.fullName}
                {isSelf ? (
                  <span className="bg-lime text-ink ml-1 rounded-[3px] px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.08em] uppercase">
                    You
                  </span>
                ) : null}
              </span>
            </>
          ) : (
            <span className="text-ink-mute text-[12px]">Unassigned</span>
          )}
        </div>

        {/* SLA pill */}
        <div className="flex flex-shrink-0 flex-col items-end">
          <span
            className={cn(
              "font-display text-[16px] leading-none font-semibold",
              SLA_PILL_CLASS[band],
            )}
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {slaHoursLabel(d)}
          </span>
          <span className="text-ink-mute mt-0.5 text-[10px]">
            {slaLabelSuffix(d)}
          </span>
        </div>

        {/* Chevron */}
        <ChevronIcon expanded={isExpanded} />
      </button>

      {/* Quick-actions panel — collapsible */}
      {isExpanded ? (
        <div className="border-line-soft bg-cream/40 flex flex-wrap gap-2 border-t px-4 py-3">
          <QuickActions dispute={d} onAction={setActiveCta} />
        </div>
      ) : null}

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </article>
  );
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   Quick actions — forks on dispute state + ownership
   ============================================================ */

function QuickActions({
  dispute: d,
  onAction,
}: {
  dispute: Dispute;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  const owner = getSpecialist(d.ownerSpecialistId);
  const isSelf = isOwnedByManager(d);
  const band = slaBand(d);
  const ownerFirstName = owner?.firstName ?? "owner";

  /* Mateo-owned case (Step 7 Q5 lock) */
  if (isSelf) {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(OPEN_DISPUTE_CTA)}>
          Open dispute →
        </ActionButton>
        <Link
          href={`/specialist/team/${d.ownerSpecialistId}?tab=performance`}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border bg-paper px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          View as Specialist
        </Link>
      </>
    );
  }

  /* Escalated */
  if (d.status === "escalated") {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(OPEN_DISPUTE_CTA)}>
          Open dispute →
        </ActionButton>
        <ActionButton tone="warn" onClick={() => onAction(RECLAIM_CTA)}>
          Take back from Admin
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
          Message {ownerFirstName}
        </ActionButton>
      </>
    );
  }

  /* SLA-risk (urgent) */
  if (band === "urgent") {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(OPEN_DISPUTE_CTA)}>
          Open dispute →
        </ActionButton>
        <ActionButton tone="lime" onClick={() => onAction(INTERVENE_CTA)}>
          Intervene
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
          Message {ownerFirstName}
        </ActionButton>
        {!d.isFirstForOwner ? (
          <ActionButton tone="warn" onClick={() => onAction(COACH_CTA)}>
            Coach the Specialist
          </ActionButton>
        ) : null}
      </>
    );
  }

  /* First dispute — coaching opportunity */
  if (d.isFirstForOwner) {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(OPEN_DISPUTE_CTA)}>
          Open dispute →
        </ActionButton>
        <ActionButton tone="warn" onClick={() => onAction(COACH_CTA)}>
          Coach the Specialist
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
          Message {ownerFirstName}
        </ActionButton>
      </>
    );
  }

  /* Warn-band contested rows also benefit from Intervene */
  if (band === "warn" && d.initiator === "both") {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(OPEN_DISPUTE_CTA)}>
          Open dispute →
        </ActionButton>
        <ActionButton tone="lime" onClick={() => onAction(INTERVENE_CTA)}>
          Intervene
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
          Message {ownerFirstName}
        </ActionButton>
      </>
    );
  }

  /* Default — open + message */
  return (
    <>
      <ActionButton tone="primary" onClick={() => onAction(OPEN_DISPUTE_CTA)}>
        Open dispute →
      </ActionButton>
      <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
        Message {ownerFirstName}
      </ActionButton>
    </>
  );
}

function ActionButton({
  tone,
  onClick,
  children,
}: {
  tone: "primary" | "lime" | "warn" | "neutral";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const className =
    tone === "primary" ? "bg-ink text-paper hover:bg-ink-soft border-ink"
    : tone === "lime" ? "bg-lime text-ink hover:bg-lime-deep border-lime-deep"
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
