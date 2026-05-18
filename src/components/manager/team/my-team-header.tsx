"use client";

/**
 * MyTeamHeader — eyebrow + "My team" title + subtitle + 2 header
 * action buttons (Export ghost / Team meeting primary).
 *
 * Both action buttons trigger the placeholder modal per Step 3's
 * two-tier CTA pattern:
 *
 *   - Export        → `landsInStep: 10` (Team Reports — closest fit
 *                                        for "export team data")
 *   - Team meeting  → `landsInStep: 14` (Help — explicit "coming
 *                                        soon" since no step builds
 *                                        a Team Meeting scheduler;
 *                                        override description so the
 *                                        modal reads "Team meeting
 *                                        scheduling — coming soon."
 *                                        rather than auto-deriving
 *                                        a misleading feature name)
 *
 * Owns the placeholder modal state for the 2 header buttons.
 *
 * Subtitle is dynamic: reads cohort counts from `team.ts` so it
 * stays in sync with the canonical roster.
 *
 * Ported from `reference/manager.html` lines 27255-27271.
 */

import { useState } from "react";
import { countSpecialistsByCohort } from "@/lib/mock-data/manager/team";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";

const EXPORT_CTA: ManagerActionCTA = {
  label: "Export",
  landsInStep: 10,
  description: "Team-data export lands in Step 10 — Team Reports.",
};

const TEAM_MEETING_CTA: ManagerActionCTA = {
  label: "Team meeting",
  landsInStep: 14,
  description: "Team meeting scheduling — coming soon.",
};

export function MyTeamHeader() {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const counts = countSpecialistsByCohort();

  /* Subtitle: "11 Talent Specialists across 10 role categories ·
     10 active today". The "10 role categories" is the size of the
     SpecialistRole union — hard-coded here (one for each role; the
     prototype subtitle matches). */
  const subtitle = `${counts.all} Talent Specialists across 10 role categories · ${counts.active} active today`;

  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Manager
        </div>
        <h1
          className="font-display text-ink m-0 text-[clamp(28px,3.6vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]"
        >
          My{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            team
          </em>
        </h1>
        <p className="text-ink-soft mt-2 m-0 text-[13.5px]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCta(EXPORT_CTA)}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-[13px] font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 1.5v8M4 6l3 3 3-3M2 11.5h10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export
        </button>
        <button
          type="button"
          onClick={() => setActiveCta(TEAM_MEETING_CTA)}
          className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="2" y="3" width="10" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 5.5h10M4.5 2v2M9.5 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Team meeting
        </button>
      </div>

      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}
