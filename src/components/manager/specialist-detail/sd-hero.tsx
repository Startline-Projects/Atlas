"use client";

/**
 * SdHero — Specialist Detail page hero.
 *
 * Avatar + name + eyebrow ("TALENT SPECIALIST · ATLAS-TS-001") +
 * meta strip + status tag + 6 action buttons.
 *
 * Ported from `reference/manager.html` lines 27749-27788.
 *
 * ## Mateo self-adjustments (per Step 5 Q2 lock)
 *
 *   - Add "You" tag next to name
 *   - **Suppress** Message + Schedule 1:1 buttons (interpersonal —
 *     can't message/schedule with yourself)
 *   - **Keep** Audit daily (auditing own daily activity is
 *     legitimate — Mateo IS a Specialist with submissions)
 *   - Keep View dashboard (real Link to /specialist/dashboard)
 *   - Keep Performance review (action button — landsInStep: 10)
 *   - Keep Log coaching note (switches active tab to coaching)
 *
 * ## CTAs (Step 5)
 *
 *   - Message → modal `landsInStep: 13` (Specialist Chat)
 *   - Schedule 1:1 → modal `landsInStep: 14` (coming soon — 1:1
 *     scheduling has no dedicated step)
 *   - View dashboard (Mateo only) → real Link `/specialist/dashboard`
 *   - **Audit daily → real Link `/specialist/daily-audit?row={id}`**
 *     (un-disabled in Step 6 with deep-link to the specialist's row)
 *   - Performance review → modal `landsInStep: 10` (Team Reports)
 *   - Log coaching note → callback (switches active tab to "coaching")
 */

import { useState } from "react";
import Link from "next/link";
import {
  type ManagerActionCTA,
} from "@/lib/mock-data/manager/manager-rail";
import {
  type Specialist,
} from "@/lib/mock-data/manager/team";
import { countryFlag } from "@/lib/utils/country-flag";
import { MgrAvatar } from "@/components/manager/shell/mgr-avatar";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import { cn } from "@/lib/utils/cn";
import type { SdTabKey } from "./sd-tabs";

type SdHeroProps = {
  specialist: Specialist;
  /** Switch the active tab. Used by "Log coaching note" button to
   *  jump to the Coaching Notes tab in-place. */
  onSetTab: (tab: SdTabKey) => void;
};

const MESSAGE_CTA: ManagerActionCTA = {
  label: "Message",
  landsInStep: 13,
};
const SCHEDULE_CTA: ManagerActionCTA = {
  label: "Schedule 1:1",
  landsInStep: 14,
  description: "1:1 scheduling — coming soon.",
};
/* Audit daily — Step 6 un-disabled. Real Link with ?row= deep-link
   so the audit page expands this specialist's row on entry. */
const PERFORMANCE_REVIEW_CTA: ManagerActionCTA = {
  label: "Performance review",
  landsInStep: 10,
};

export function SdHero({ specialist: s, onSetTab }: SdHeroProps) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const isSelf = s.isManager === true;

  return (
    <header className="mb-5 flex flex-wrap items-start gap-4">
      <MgrAvatar
        slot={s.avatarSlot}
        initials={s.initials}
        fullName={s.fullName}
        size="md"
        className="h-16 w-16 text-[18px]"
      />
      <div className="min-w-0 flex-1">
        <div className="text-ink-mute font-mono text-[10.5px] tracking-[0.12em] uppercase">
          TALENT SPECIALIST · {s.atlasTsId}
        </div>
        <h1 className="font-display text-ink mt-1 mb-1 flex flex-wrap items-center gap-2 text-[28px] leading-tight font-medium tracking-[-0.015em]">
          {s.fullName}
          <span aria-hidden="true" className="text-[24px]">
            {countryFlag(s.countryCode)}
          </span>
          {isSelf ? (
            <span className="bg-lime text-ink rounded-[3px] px-1.5 py-px font-mono text-[10px] font-semibold tracking-[0.08em] uppercase">
              You
            </span>
          ) : null}
        </h1>
        <div className="text-ink-mute font-mono text-[10.5px] tracking-[0.12em] uppercase">
          {s.role.toUpperCase()} · {s.city.toUpperCase()} · JOINED{" "}
          {s.joinDate.toUpperCase()}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StatusTag status={s.status} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Interpersonal actions — suppressed for Mateo's self-page. */}
        {!isSelf ? (
          <>
            <button
              type="button"
              onClick={() => setActiveCta(MESSAGE_CTA)}
              className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors"
            >
              Message
            </button>
            <button
              type="button"
              onClick={() => setActiveCta(SCHEDULE_CTA)}
              className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
            >
              Schedule 1:1
            </button>
          </>
        ) : null}
        {/* Mateo: real Link to own dashboard. */}
        {isSelf ? (
          <Link
            href="/specialist/dashboard"
            className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
          >
            View dashboard
          </Link>
        ) : null}
        <Link
          href={`/specialist/daily-audit?row=${s.id}`}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          Audit daily
        </Link>
        <button
          type="button"
          onClick={() => setActiveCta(PERFORMANCE_REVIEW_CTA)}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          Performance review
        </button>
        <button
          type="button"
          onClick={() => onSetTab("coaching")}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          Log coaching note
        </button>
      </div>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}

const STATUS_TAG_CLASS: Record<Specialist["status"], string> = {
  active: "bg-success-bg text-success border-success/30",
  vacation: "bg-cream-deep text-ink-soft border-line",
  capacity: "bg-amber-bg text-amber border-amber/30",
  flag: "bg-danger-bg text-danger border-danger/30",
};

const STATUS_TAG_LABEL: Record<Specialist["status"], string> = {
  active: "● Active",
  vacation: "● On vacation",
  capacity: "● At capacity",
  flag: "● Performance flag",
};

function StatusTag({ status }: { status: Specialist["status"] }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase",
        STATUS_TAG_CLASS[status],
      )}
    >
      {STATUS_TAG_LABEL[status]}
    </span>
  );
}
