"use client";

/**
 * TdHeader — Team Disputes page header.
 *
 * Eyebrow + title + dynamic subtitle (computed from disputes) +
 * Export button (modal step 14) + Message owners button (modal
 * step 13).
 *
 * Ported from prototype lines 29154-29170.
 */

import { useState } from "react";
import { ManagerActionPlaceholderModal } from "@/components/manager/dashboard/manager-action-placeholder-modal";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import { type Dispute, slaBand } from "@/lib/mock-data/manager/manager-team-disputes-data";

const EXPORT_CTA: ManagerActionCTA = {
  label: "Export",
  landsInStep: 14,
  description: "Dispute export — coming soon.",
};

const MESSAGE_OWNERS_CTA: ManagerActionCTA = {
  label: "Message owners",
  landsInStep: 13,
};

export function TdHeader({ disputes }: { disputes: ReadonlyArray<Dispute> }) {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);
  const total = disputes.length;
  const slaAtRisk = disputes.filter((d) => slaBand(d) === "urgent").length;
  const subtitle = `${total} open disputes across team · ${slaAtRisk} at SLA risk`;

  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          Manager
        </div>
        <h1
          className="font-display text-ink m-0 text-[clamp(28px,3.6vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]"
        >
          Team{" "}
          <em
            className="font-display"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            disputes
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
            <path d="M6 1.5v6M3.5 5 6 7.5 8.5 5M2 10h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export
        </button>
        <button
          type="button"
          onClick={() => setActiveCta(MESSAGE_OWNERS_CTA)}
          className="bg-ink text-paper border-ink hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" />
            <path d="m2 4 6 4 6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Message owners
        </button>
      </div>
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </header>
  );
}
