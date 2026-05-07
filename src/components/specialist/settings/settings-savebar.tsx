"use client";

/**
 * Sticky save bar at the bottom of the panel. Visible only when the
 * specialist has unsaved changes; counts modified-settings count.
 *
 * Per source CSS `.set-savebar`. Uses the same paper/95 + blur shell
 * as other sticky bottom bars (queue-shared/DecisionBar etc.).
 *
 * Client Component (the visibility + button onClick).
 */

import { Save } from "lucide-react";

export function SettingsSavebar({
  visible,
  modifiedCount,
  onDiscard,
  onSave,
}: {
  visible: boolean;
  modifiedCount: number;
  onDiscard: () => void;
  onSave: () => void;
}) {
  if (!visible) return null;
  return (
    <div className="bg-paper/95 border-line sticky bottom-0 z-[10] mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border px-5 py-3 backdrop-blur-md">
      <div className="text-[13px] text-ink-soft">
        <strong className="font-semibold text-ink">Unsaved changes</strong> ·{" "}
        {modifiedCount} setting{modifiedCount === 1 ? "" : "s"} modified
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onDiscard}
          className="border-line bg-paper text-ink-soft hover:bg-cream-deep hover:text-ink rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12.5px] font-medium transition-colors"
        >
          <Save className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          Save changes
        </button>
      </div>
    </div>
  );
}
