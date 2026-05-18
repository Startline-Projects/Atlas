"use client";

/**
 * RsSprintCard — single active sprint card.
 *
 * Head (owner avatar + category + name + status pill) + progress
 * ring SVG + 4-row stat block + channel chips + 2-3 action buttons.
 *
 * 3-status fork:
 *   - BEHIND: ⚡ Boost sprint (primary, modal 14) · Message <owner>
 *     (modal 13) · View → (real Link to Specialist Detail ?tab=performance)
 *   - ON-TRACK: Message <owner> · View →
 *   - AHEAD: Redirect surplus (primary, modal 14) · View →
 *
 * Mateo is NOT an active sprint owner per Step 9 lock (he only
 * appears in history). No self-suppression logic for active cards.
 * If a future maintainer adds Mateo, the message button needs to
 * be hidden — see data file header.
 */

import { useState } from "react";
import Link from "next/link";
import { getSpecialist } from "@/lib/mock-data/manager/team";
import { countryFlag } from "@/lib/utils/country-flag";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import {
  getCategory,
  getCategoryLabel,
} from "@/lib/mock-data/manager/manager-pool-coordination-data";
import {
  type Sprint,
  type SprintStatus,
  progressPercent,
  sprintStatusLabel,
} from "@/lib/mock-data/manager/manager-recruitment-sprints-data";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Status meta
   ============================================================ */

const STATUS_PILL_CLASS: Record<SprintStatus, string> = {
  behind: "bg-danger-bg text-danger border-danger/30",
  "on-track": "bg-success-bg text-success border-success/30",
  ahead: "bg-lime text-ink border-lime-deep",
};

const RING_FG_CLASS: Record<SprintStatus, string> = {
  behind: "stroke-danger",
  "on-track": "stroke-success",
  ahead: "stroke-lime-deep",
};

const CARD_BORDER_CLASS: Record<SprintStatus, string> = {
  behind: "border-l-danger border-l-[3px]",
  "on-track": "border-line",
  ahead: "border-l-lime-deep border-l-[3px]",
};

/* ============================================================
   Action CTAs
   ============================================================ */

const BOOST_CTA: ManagerActionCTA = {
  label: "⚡ Boost sprint",
  landsInStep: 14,
  description: "Sprint boost flow — coming soon.",
};
const REDIRECT_SURPLUS_CTA: ManagerActionCTA = {
  label: "Redirect surplus",
  landsInStep: 14,
  description: "Surplus-capacity redirect flow — coming soon.",
};

function messageOwnerCta(ownerFirstName: string): ManagerActionCTA {
  return {
    label: `Message ${ownerFirstName}`,
    landsInStep: 13,
  };
}

/* ============================================================
   Card component
   ============================================================ */

type RsSprintCardProps = {
  sprint: Sprint;
  isFocused: boolean;
  registerRef: (el: HTMLElement | null) => void;
};

export function RsSprintCard({
  sprint: s,
  isFocused,
  registerRef,
}: RsSprintCardProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const owner = getSpecialist(s.ownerSpecialistId);
  const category = getCategory(s.categoryId);
  /* Module-load assertion guarantees both lookups succeed; the
     fallbacks are defensive only. */
  const categoryLabel = category ? getCategoryLabel(category) : s.categoryId;

  const pct = progressPercent(s);
  /* Ring math: circumference = 2 * π * 36 ≈ 226.19. Dasharray fixed
     at 226; dashoffset = 226 * (1 - pct/100). Ahead sprints (>100%)
     clamp the visible offset at 0 (ring is fully closed). */
  const ringCircumference = 226;
  const ringOffset = Math.max(
    0,
    ringCircumference * (1 - Math.min(pct, 100) / 100),
  );

  return (
    <article
      ref={registerRef}
      data-rs-focused={isFocused || undefined}
      className={cn(
        "bg-paper border-line shadow-sm flex flex-col gap-4 rounded-md border p-5 transition-all",
        CARD_BORDER_CLASS[s.status],
        isFocused && "ring-2 ring-lime ring-offset-2 ring-offset-cream",
      )}
    >
      {/* Head */}
      <header className="flex items-start gap-3">
        {owner ? (
          <MgrAvatar
            slot={owner.avatarSlot}
            initials={owner.initials}
            fullName={owner.fullName}
            size="md"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
            {categoryLabel}
          </div>
          <div className="text-ink mt-0.5 text-[14px] font-semibold leading-tight">
            {owner?.fullName ?? "Unknown"}{" "}
            {owner ? (
              <span aria-hidden="true">{countryFlag(owner.countryCode)}</span>
            ) : null}
          </div>
        </div>
        <span
          className={cn(
            "flex-shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_PILL_CLASS[s.status],
          )}
        >
          {sprintStatusLabel(s.status)}
        </span>
      </header>

      {/* Progress block: ring + stat rows */}
      <div className="border-line-soft flex items-center gap-4 border-y py-4">
        {/* Progress ring */}
        <div className="relative h-[84px] w-[84px] flex-shrink-0">
          <svg viewBox="0 0 84 84" className="-rotate-90">
            <circle
              cx="42"
              cy="42"
              r="36"
              fill="none"
              strokeWidth="6"
              className="stroke-cream-deep"
            />
            <circle
              cx="42"
              cy="42"
              r="36"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              className={cn("transition-all", RING_FG_CLASS[s.status])}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="font-display text-ink text-[18px] font-semibold"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              {s.currentCount}
              <em className="text-ink-mute text-[12px] font-normal not-italic">
                /{s.goalCount}
              </em>
            </div>
          </div>
        </div>

        {/* Stat rows */}
        <div className="flex flex-1 flex-col gap-1.5 text-[12px]">
          <StatRow
            label="Progress"
            value={
              s.status === "ahead" ? (
                <strong className="text-lime-deep font-semibold">
                  {pct}% · goal met
                </strong>
              ) : (
                <strong className="text-ink font-semibold">{pct}%</strong>
              )
            }
          />
          <StatRow
            label="Time left"
            value={
              <strong className="text-ink font-semibold">
                {formatHoursLeft(s.hoursLeft)}
              </strong>
            }
          />
          <StatRow
            label={s.status === "on-track" || s.status === "ahead" ? "Pace" : "Pace needed"}
            value={
              <strong
                className={cn(
                  "font-semibold",
                  s.paceTone === "urgent" && "text-danger",
                  s.paceTone === "success" && "text-success",
                  s.paceTone === "neutral" && "text-ink-soft",
                )}
              >
                {s.paceLabel}
              </strong>
            }
          />
          <StatRow
            label="Started"
            value={<span className="text-ink-soft">{s.daysElapsed}d ago</span>}
          />
        </div>
      </div>

      {/* Channel chips */}
      <div className="flex flex-wrap gap-1.5">
        {s.channels.map((ch) => (
          <span
            key={ch}
            className="bg-cream-deep text-ink-soft border-line-soft inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium"
          >
            <span aria-hidden="true" className="bg-ink-mute inline-block h-1 w-1 rounded-full" />
            {ch}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <CardActions sprint={s} owner={owner} onAction={setActiveCta} />
      </div>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </article>
  );
}

/* ============================================================
   Action fork — varies by status
   ============================================================ */

function CardActions({
  sprint: s,
  owner,
  onAction,
}: {
  sprint: Sprint;
  owner: ReturnType<typeof getSpecialist>;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  const ownerFirstName = owner?.firstName ?? "owner";

  if (s.status === "behind") {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(BOOST_CTA)}>
          ⚡ Boost sprint
        </ActionButton>
        <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
          Message {ownerFirstName}
        </ActionButton>
        {owner ? <ViewLink ownerSpecialistId={owner.id} /> : null}
      </>
    );
  }

  if (s.status === "ahead") {
    return (
      <>
        <ActionButton tone="primary" onClick={() => onAction(REDIRECT_SURPLUS_CTA)}>
          Redirect surplus
        </ActionButton>
        {owner ? <ViewLink ownerSpecialistId={owner.id} /> : null}
      </>
    );
  }

  /* on-track */
  return (
    <>
      <ActionButton tone="neutral" onClick={() => onAction(messageOwnerCta(ownerFirstName))}>
        Message {ownerFirstName}
      </ActionButton>
      {owner ? <ViewLink ownerSpecialistId={owner.id} /> : null}
    </>
  );
}

function ActionButton({
  tone,
  onClick,
  children,
}: {
  tone: "primary" | "neutral";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const className =
    tone === "primary"
      ? "bg-ink text-paper hover:bg-ink-soft border-ink"
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

function ViewLink({ ownerSpecialistId }: { ownerSpecialistId: string }) {
  return (
    <Link
      href={`/specialist/team/${ownerSpecialistId}?tab=performance`}
      className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border bg-paper px-3 py-1.5 text-[12.5px] font-medium transition-colors"
    >
      View →
    </Link>
  );
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-ink-mute">{label}</span>
      {value}
    </div>
  );
}

function formatHoursLeft(hours: number): string {
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  const rem = hours % 24;
  if (rem === 0) return `${days}d`;
  return `${days}d ${rem}h`;
}
