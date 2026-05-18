"use client";

/**
 * PcCategoryCard — single pool category card.
 *
 * Head (label + status pill) + pool bar (live count / threshold) +
 * owner row (avatar + name + trend %) + 3-metric row + action
 * buttons (vary by status + Mateo's "self" treatment).
 *
 * ## Actions by status (Q3 lock)
 *
 *   - DEPLETED: Run sprint (modal step 9) · View health (modal 14) · Reassign (modal 14)
 *   - OVERFLOWING: ⚡ Redirect (modal step 9) · View health (modal 14) · Reassign (modal 14)
 *   - STRONG / STEADY / STABLE (non-self): View health (modal 14) · View <Name> → (Link to Specialist Detail ?tab=overview)
 *   - SELF (Mateo's Virtual Assistants): View my health (lime · modal 14) · Sourcing (modal 14) — no self-link
 *
 * ## Focus ring
 *
 * When `?focus=<category-id>` deep-link matches, orchestrator passes
 * `isFocused: true` for 2 seconds. Card renders a lime ring overlay
 * via `ring-2 ring-lime` and the orchestrator scrolls to it.
 */

import { useState } from "react";
import Link from "next/link";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import { countryFlag } from "@/lib/utils/country-flag";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  type PoolCategory,
  type PoolCategoryStatus,
  type PoolTrend,
  getCategoryLabel,
  isCategoryOwnedByManager,
  statusPillLabel,
  thresholdLabel,
  trendLabel,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Status-driven styling
   ============================================================ */

const STATUS_PILL_CLASS: Record<PoolCategoryStatus, string> = {
  depleted: "bg-danger-bg text-danger border-danger/30",
  overflowing: "bg-amber-bg text-amber border-amber/30",
  strong: "bg-success-bg text-success border-success/30",
  stable: "bg-cream-deep text-ink-soft border-line",
  steady: "bg-cream-deep text-ink-soft border-line",
};

const POOL_BAR_FILL: Record<PoolCategoryStatus, string> = {
  depleted: "bg-danger",
  overflowing: "bg-amber",
  strong: "bg-success",
  stable: "bg-ink-soft",
  steady: "bg-ink-soft",
};

const COUNT_TONE: Record<PoolCategoryStatus, string> = {
  depleted: "text-danger",
  overflowing: "text-amber",
  strong: "text-success",
  stable: "text-ink",
  steady: "text-ink",
};

const TREND_CLASS: Record<PoolTrend, string> = {
  up: "text-success",
  down: "text-danger",
  flat: "text-ink-mute",
};

/* ============================================================
   Action CTAs
   ============================================================ */

/* Step 9 un-disable: "Run sprint" + "⚡ Redirect" flipped from modal
   triggers to real Links pointing to /specialist/recruitment-sprints
   with `?launch=<category-id>` deep-link. Modal CTAs removed. */
const VIEW_HEALTH_CTA: ManagerActionCTA = {
  label: "View health",
  landsInStep: 14,
  description: "Per-category health view — coming soon.",
};
const REASSIGN_CTA: ManagerActionCTA = {
  label: "Reassign",
  landsInStep: 14,
  description: "Caseload reassignment flow — coming soon.",
};
const VIEW_MY_HEALTH_CTA: ManagerActionCTA = {
  label: "View my health",
  landsInStep: 14,
  description: "Your category health — coming soon.",
};
const SOURCING_CTA: ManagerActionCTA = {
  label: "Sourcing",
  landsInStep: 14,
  description: "Sourcing workspace — coming soon.",
};

/* ============================================================
   Card component
   ============================================================ */

type PcCategoryCardProps = {
  category: PoolCategory;
  isFocused: boolean;
  registerRef: (el: HTMLElement | null) => void;
};

export function PcCategoryCard({
  category: c,
  isFocused,
  registerRef,
}: PcCategoryCardProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const owner = getSpecialist(c.primaryOwnerSpecialistId);
  const isSelf = isCategoryOwnedByManager(c);
  const label = getCategoryLabel(c);

  /* Pool bar fill percentage — capped at 100% for overflowing pools
     (the bar visualizes "how full the category is", not "how far
     over target"). The threshold marker still shows where the
     target line sits inside the visualization. */
  const fillPct = Math.min(
    100,
    Math.round((c.liveCount / Math.max(c.liveCount, c.thresholdValue)) * 100),
  );
  const thresholdMarkerPct = Math.round(
    (c.thresholdValue / Math.max(c.liveCount, c.thresholdValue)) * 100,
  );

  return (
    <article
      ref={registerRef}
      data-pc-focused={isFocused || undefined}
      className={cn(
        "bg-paper border-line shadow-sm flex flex-col gap-3 rounded-md border p-4 transition-all",
        isFocused && "ring-2 ring-lime ring-offset-2 ring-offset-cream",
        isSelf && "ring-1 ring-lime/40",
      )}
    >
      {/* Head */}
      <header className="flex items-start justify-between gap-2">
        <div
          className="font-display text-ink text-[14px] font-medium leading-tight"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {label}
        </div>
        <span
          className={cn(
            "flex-shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_PILL_CLASS[c.status],
          )}
        >
          {statusPillLabel(c.status)}
        </span>
      </header>

      {/* Pool bar */}
      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span
            className={cn(
              "font-display text-[24px] leading-none font-semibold",
              COUNT_TONE[c.status],
            )}
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {c.liveCount}
          </span>
          <span className="text-ink-mute text-[11px]">
            {thresholdLabel(c)}{" "}
            <strong className="text-ink-soft">{c.thresholdValue}</strong>
          </span>
        </div>
        <div className="bg-cream-deep relative h-1.5 overflow-hidden rounded-full">
          <div
            className={cn("h-full rounded-full transition-all", POOL_BAR_FILL[c.status])}
            style={{ width: `${fillPct}%` }}
          />
          {/* Threshold marker — small notch on the bar */}
          <div
            className="bg-ink absolute top-0 h-full w-px"
            style={{ left: `${thresholdMarkerPct}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Owner row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {owner ? (
            <MgrAvatar
              slot={owner.avatarSlot}
              initials={owner.initials}
              fullName={owner.fullName}
              size="sm"
            />
          ) : null}
          <div className="text-ink truncate text-[12.5px] font-semibold">
            {owner?.fullName ?? "Unknown"}{" "}
            {owner ? (
              <span aria-hidden="true">{countryFlag(owner.countryCode)}</span>
            ) : null}
            {isSelf ? (
              <span className="bg-lime text-ink ml-1 rounded-[3px] px-1.5 py-px font-mono text-[8.5px] font-semibold tracking-[0.08em] uppercase">
                You
              </span>
            ) : null}
          </div>
        </div>
        <span
          className={cn("text-[11.5px] font-medium whitespace-nowrap", TREND_CLASS[c.trend])}
        >
          {trendLabel(c)}
        </span>
      </div>

      {/* 3-metric row */}
      <div className="border-line-soft grid grid-cols-3 gap-2 border-t pt-3">
        <Metric label="active jobs" value={String(c.activeJobs)} />
        <Metric label="open shortlists" value={String(c.openShortlists)} />
        <Metric
          label={c.status === "overflowing" ? "over target" : "to threshold"}
          value={signedNumber(c.deltaToThreshold)}
          tone={deltaTone(c)}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-1.5">
        <CardActions
          category={c}
          owner={owner}
          isSelf={isSelf}
          onAction={setActiveCta}
        />
      </div>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </article>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success" | "warn" | "urgent" | "neutral";
}) {
  const toneClass =
    tone === "success" ? "text-success"
    : tone === "warn" ? "text-amber"
    : tone === "urgent" ? "text-danger"
    : "text-ink";
  return (
    <div className="flex flex-col items-start gap-0.5">
      <span
        className={cn(
          "font-display text-[14px] leading-none font-semibold",
          toneClass,
        )}
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {value}
      </span>
      <span className="text-ink-mute text-[10px] leading-tight">{label}</span>
    </div>
  );
}

function CardActions({
  category: c,
  owner,
  isSelf,
  onAction,
}: {
  category: PoolCategory;
  owner: ReturnType<typeof getSpecialist>;
  isSelf: boolean;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  /* Mateo's self-card (Q3 lock) */
  if (isSelf) {
    return (
      <>
        <SmallButton tone="lime" onClick={() => onAction(VIEW_MY_HEALTH_CTA)}>
          View my health
        </SmallButton>
        <SmallButton tone="neutral" onClick={() => onAction(SOURCING_CTA)}>
          Sourcing
        </SmallButton>
      </>
    );
  }

  if (c.status === "depleted") {
    return (
      <>
        <LaunchSprintLink categoryId={c.id} variant="run-sprint" />
        <SmallButton tone="neutral" onClick={() => onAction(VIEW_HEALTH_CTA)}>
          View health
        </SmallButton>
        <SmallButton tone="neutral" onClick={() => onAction(REASSIGN_CTA)}>
          Reassign
        </SmallButton>
      </>
    );
  }

  if (c.status === "overflowing") {
    return (
      <>
        <LaunchSprintLink categoryId={c.id} variant="redirect" />
        <SmallButton tone="neutral" onClick={() => onAction(VIEW_HEALTH_CTA)}>
          View health
        </SmallButton>
        <SmallButton tone="neutral" onClick={() => onAction(REASSIGN_CTA)}>
          Reassign
        </SmallButton>
      </>
    );
  }

  /* strong / steady / stable (non-self) */
  return (
    <>
      <SmallButton tone="neutral" onClick={() => onAction(VIEW_HEALTH_CTA)}>
        View health
      </SmallButton>
      {owner ? (
        <Link
          href={`/specialist/team/${owner.id}?tab=overview`}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border bg-paper px-2.5 py-1.5 text-[11.5px] font-medium transition-colors"
        >
          View {owner.firstName} →
        </Link>
      ) : null}
    </>
  );
}

function SmallButton({
  tone,
  onClick,
  children,
}: {
  tone: "primary" | "warn" | "lime" | "neutral";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const className =
    tone === "primary" ? "bg-ink text-paper hover:bg-ink-soft border-ink"
    : tone === "warn" ? "bg-amber-bg text-amber hover:bg-amber-bg/80 border-amber/40"
    : tone === "lime" ? "bg-lime text-ink hover:bg-lime-deep border-lime-deep"
    : "bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1.5 text-[11.5px] font-medium transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Step 9 un-disable: "Run sprint" (depleted) / "⚡ Redirect"
 *  (overflowing) → real Link to Recruitment Sprints with `?launch=`
 *  deep-link. Same visual treatment as the original SmallButton
 *  primary/warn tones. */
function LaunchSprintLink({
  categoryId,
  variant,
}: {
  categoryId: string;
  variant: "run-sprint" | "redirect";
}) {
  const className =
    variant === "run-sprint"
      ? "bg-ink text-paper hover:bg-ink-soft border-ink"
      : "bg-amber-bg text-amber hover:bg-amber-bg/80 border-amber/40";
  const label = variant === "run-sprint" ? "Run sprint" : "⚡ Redirect";
  return (
    <Link
      href={`/specialist/recruitment-sprints?launch=${categoryId}`}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1.5 text-[11.5px] font-medium transition-colors",
        className,
      )}
    >
      {label}
    </Link>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function signedNumber(n: number): string {
  if (n > 0) return `+${n}`;
  return String(n);
}

function deltaTone(c: PoolCategory): "success" | "warn" | "urgent" | "neutral" {
  if (c.status === "depleted") return "urgent";
  if (c.status === "overflowing") return "warn";
  if (c.status === "strong" || c.status === "steady" || c.status === "stable") {
    return c.deltaToThreshold > 0 ? "success" : "neutral";
  }
  return "neutral";
}
