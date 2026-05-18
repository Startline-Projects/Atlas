"use client";

/**
 * ManagerUrgentSection — "Needs your attention" panel with 6 cards.
 *
 * Owns the placeholder-modal state for the 12 action buttons (2 per
 * card). Each click sets `activeCta`, opening the modal with the
 * action's `landsInStep` value driving the data-driven body copy.
 *
 * Ported from `reference/manager.html` lines 19541-19667.
 *
 * Inlined `UrgentCard` sub-component per Step 3 Q6 lock — same file
 * for fewer files, easier to follow.
 */

import { useState } from "react";
import Link from "next/link";
import {
  managerUrgentItems,
  managerUrgentOpenCount,
  type ManagerUrgentItem,
  type UrgentPriority,
} from "@/lib/mock-data/manager/manager-urgent-items";
import type { ManagerActionCTA } from "@/lib/mock-data/manager/manager-rail";
import { ManagerActionPlaceholderModal } from "./manager-action-placeholder-modal";
import { cn } from "@/lib/utils/cn";

const PRIORITY_DOT: Record<UrgentPriority, string> = {
  red: "bg-danger",
  orange: "bg-amber",
  yellow: "bg-lime-deep",
};

const PRIORITY_BORDER: Record<UrgentPriority, string> = {
  red: "border-l-danger",
  orange: "border-l-amber",
  yellow: "border-l-lime-deep",
};

const PRIORITY_SLA_TONE: Record<UrgentPriority, string> = {
  red: "text-danger",
  orange: "text-amber",
  yellow: "text-ink-soft",
};

export function ManagerUrgentSection() {
  const [activeCta, setActiveCta] = useState<ManagerActionCTA | null>(null);

  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className="font-display text-ink m-0 text-[22px] font-medium tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          Needs your attention
        </h2>
        <span className="text-ink-mute flex items-center gap-2 font-mono text-[10.5px] tracking-[0.06em] uppercase">
          <span
            aria-hidden="true"
            className="bg-danger inline-block h-1.5 w-1.5 animate-pulse rounded-full"
          />
          {managerUrgentOpenCount} open across team
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {managerUrgentItems.map((item) => (
          <UrgentCard
            key={item.id}
            item={item}
            onAction={(cta) => setActiveCta(cta)}
          />
        ))}
      </div>
      <ManagerActionPlaceholderModal
        cta={activeCta}
        onClose={() => setActiveCta(null)}
      />
    </section>
  );
}

function UrgentCard({
  item,
  onAction,
}: {
  item: ManagerUrgentItem;
  onAction: (cta: ManagerActionCTA) => void;
}) {
  return (
    <article
      className={cn(
        "bg-paper border-line shadow-sm flex flex-col gap-3 rounded-md border border-l-[3px] p-4",
        PRIORITY_BORDER[item.priority],
      )}
    >
      {/* Top — type + SLA */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("inline-block h-1.5 w-1.5 rounded-full", PRIORITY_DOT[item.priority])}
          />
          <span className="text-ink-mute font-mono text-[10px] tracking-[0.08em] uppercase">
            {item.typeLabel}
          </span>
        </div>
        <span
          className={cn(
            "font-mono text-[10.5px] tracking-[0.04em] whitespace-nowrap",
            PRIORITY_SLA_TONE[item.priority],
          )}
        >
          {item.slaLabel}
        </span>
      </div>

      {/* Body */}
      <p className="text-ink-soft m-0 text-[13.5px] leading-[1.45]">
        {item.body.map((seg, i) => {
          if (seg.kind === "strong") {
            return (
              <strong key={i} className="text-ink font-semibold">
                {seg.value}
              </strong>
            );
          }
          if (seg.kind === "em") {
            return (
              <em key={i} className="text-ink font-medium not-italic">
                {seg.value}
              </em>
            );
          }
          return <span key={i}>{seg.value}</span>;
        })}
      </p>

      {/* Actions. Step 5: CTAs with `href` render as Link (real
          navigation); without `href` stay as buttons that open the
          placeholder modal. */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {item.primary.href ? (
          <Link
            href={item.primary.href}
            className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors"
          >
            {item.primary.label}
            <ArrowIcon />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onAction(item.primary)}
            className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors"
          >
            {item.primary.label}
            <ArrowIcon />
          </button>
        )}
        {item.ghost.href ? (
          <Link
            href={item.ghost.href}
            className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
          >
            {item.ghost.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onAction(item.ghost)}
            className="border-line text-ink-soft hover:bg-cream-deep hover:text-ink inline-flex items-center rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
          >
            {item.ghost.label}
          </button>
        )}
      </div>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 6h7M6 3 9 6 6 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
