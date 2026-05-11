"use client";

/**
 * TagsPanel — inline replacement for the prior
 * `WorkflowUnavailableModal kind="tag-client"` treatment.
 *
 * Shows the client's currently-applied tags + the full library (grouped
 * by category). Click any library tag to add/remove. Visual-only —
 * state resets when the panel closes (consistent with the no-persistence
 * prototype convention; SettingsModals and NotesCard follow the same
 * "live in component state" rule).
 *
 * Client Component (applied-set state).
 */

import { useState } from "react";
import { Check, X } from "lucide-react";
import {
  clientTagLibrary,
  getClientTagKeys,
  groupTagsByCategory,
  type ClientTag,
  type TagTone,
} from "@/lib/mock-data/specialist/client-tags";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";
import { SheetPanelShell } from "./sheet-panel-shell";

const TONE_PILL: Record<TagTone, string> = {
  default: "bg-cream-deep text-ink-soft border-line",
  lime: "bg-lime text-ink border-[var(--color-lime-deep)]",
  amber: "bg-amber/14 text-amber border-amber/30",
  danger: "bg-danger-bg text-danger border-danger/30",
  navy: "bg-navy/10 text-navy border-navy/30",
};

const TONE_PILL_APPLIED: Record<TagTone, string> = {
  default: "bg-ink text-paper",
  lime: "bg-lime text-ink shadow-[inset_0_0_0_1px_var(--color-lime-deep)]",
  amber: "bg-amber text-paper",
  danger: "bg-danger text-paper",
  navy: "bg-navy text-paper",
};

export function TagsPanel({
  client,
  onBack,
}: {
  client: ManagedClient;
  onBack: () => void;
}) {
  /* Initialize from canonical mock-data assignments, then live in state.
     Resetting on sheet close is handled by the parent passing a new
     `key` on the panel — same pattern as SchedulingModal. */
  const [applied, setApplied] = useState<Set<string>>(
    () => new Set(getClientTagKeys(client.id)),
  );

  const toggle = (key: string) =>
    setApplied((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const grouped = groupTagsByCategory();
  const appliedList = clientTagLibrary.filter((t) => applied.has(t.key));

  return (
    <SheetPanelShell
      title="Tags"
      subtitle={`${appliedList.length} applied to ${client.companyName}`}
      onBack={onBack}
    >
      {/* Applied tags strip */}
      <section className="mb-5">
        <div className="text-ink-mute mb-2 font-mono text-[9.5px] tracking-[0.14em] uppercase">
          Applied
        </div>
        {appliedList.length === 0 ? (
          <div className="border-line bg-cream/40 text-ink-mute rounded-md border border-dashed px-3 py-3 text-[12.5px]">
            No tags applied. Pick from the library below.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {appliedList.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => toggle(t.key)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11.5px] font-medium transition-colors",
                  TONE_PILL_APPLIED[t.tone],
                )}
              >
                {t.label}
                <X className="h-2.5 w-2.5 opacity-70" strokeWidth={2} aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Library by category */}
      <section>
        <div className="text-ink-mute mb-2 font-mono text-[9.5px] tracking-[0.14em] uppercase">
          Library
        </div>
        <div className="flex flex-col gap-3.5">
          {grouped.map((group) =>
            group.tags.length > 0 ? (
              <CategoryGroup
                key={group.category}
                label={group.label}
                tags={group.tags}
                applied={applied}
                onToggle={toggle}
              />
            ) : null,
          )}
        </div>
      </section>
    </SheetPanelShell>
  );
}

function CategoryGroup({
  label,
  tags,
  applied,
  onToggle,
}: {
  label: string;
  tags: ReadonlyArray<ClientTag>;
  applied: ReadonlySet<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div>
      <div className="text-ink-soft mb-1.5 text-[11px] font-medium">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => {
          const isApplied = applied.has(t.key);
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onToggle(t.key)}
              aria-pressed={isApplied}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-[3px] text-[11px] font-medium transition-colors",
                isApplied
                  ? TONE_PILL_APPLIED[t.tone] + " border-transparent"
                  : TONE_PILL[t.tone] + " hover:opacity-80",
              )}
            >
              {isApplied ? (
                <Check className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
              ) : null}
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
