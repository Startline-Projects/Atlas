"use client";

/**
 * RsHeader — Recruitment Sprints page header.
 *
 * Eyebrow + title + dynamic subtitle (computed from `activeSprints`)
 * + Export button (modal step 14) + Launch new sprint primary CTA
 * (modal step 14 — placeholder per Q2; no dedicated launch flow).
 *
 * Subtitle format: "4 active sprints · 2 on track · 1 behind · 1 ahead"
 *
 * Ported from prototype lines 30438-30454.
 */

import { useState } from "react";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import { type Sprint } from "@/lib/mock-data/manager/manager-recruitment-sprints-data";

const EXPORT_CTA: ManagerActionCTA = {
  label: "Export",
  landsInStep: 14,
  description: "Sprint data export — coming soon.",
};

const LAUNCH_NEW_CTA: ManagerActionCTA = {
  label: "Launch new sprint",
  landsInStep: 14,
  description: "Sprint launch flow — coming soon.",
};

export function RsHeader({ sprints }: { sprints: ReadonlyArray<Sprint> }) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const counts = countByStatus(sprints);
  const segments: string[] = [];
  if (counts.onTrack > 0) segments.push(`${counts.onTrack} on track`);
  if (counts.behind > 0) segments.push(`${counts.behind} behind`);
  if (counts.ahead > 0) segments.push(`${counts.ahead} ahead`);
  const subtitle =
    `${sprints.length} active sprint${sprints.length === 1 ? "" : "s"}` +
    (segments.length > 0 ? ` · ${segments.join(" · ")}` : "");

  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Manager
        </div>
        <h1 className="font-display text-ink m-0 text-[clamp(28px,3.6vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]">
          Recruitment{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            sprints
          </em>
        </h1>
        <p className="text-ink-soft mt-2 m-0 text-[13.5px]">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveCta(EXPORT_CTA)}
          className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v7M3.5 5 6 8l2.5-3M2 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export
        </button>
        <button
          type="button"
          onClick={() => setActiveCta(LAUNCH_NEW_CTA)}
          className="bg-ink text-paper border-ink hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M9 1.5 4 9h3l-1 5.5L11 7H8l1-5.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          Launch new sprint
        </button>
      </div>
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function countByStatus(sprints: ReadonlyArray<Sprint>) {
  let behind = 0, onTrack = 0, ahead = 0;
  for (const s of sprints) {
    if (s.status === "behind") behind += 1;
    else if (s.status === "on-track") onTrack += 1;
    else if (s.status === "ahead") ahead += 1;
  }
  return { behind, onTrack, ahead };
}
