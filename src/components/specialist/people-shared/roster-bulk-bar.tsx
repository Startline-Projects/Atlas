"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type BulkAction = {
  key: string;
  label: string;
  tone?: "default" | "danger";
  onClick?: () => void;
};

type RosterBulkBarProps = {
  /** Number of currently-selected rows. Bar shows when > 0. */
  count: number;
  actions: ReadonlyArray<BulkAction>;
  onClear: () => void;
};

export function RosterBulkBar({
  count,
  actions,
  onClear,
}: RosterBulkBarProps) {
  const visible = count > 0;
  return (
    <div
      role="region"
      aria-label="Bulk actions"
      aria-hidden={!visible}
      className={cn(
        "bg-ink text-paper fixed bottom-6 left-1/2 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-3.5 rounded-full py-2.5 pr-3 pl-5 shadow-lg transition-transform duration-300",
        visible
          ? "pointer-events-auto -translate-x-1/2"
          : "pointer-events-none translate-x-[-50%] translate-y-[calc(100%+2rem)]",
      )}
      style={{
        boxShadow:
          "0 14px 44px rgba(14,14,12,0.22), 0 4px 14px rgba(14,14,12,0.10)",
      }}
    >
      <span className="font-body text-[13px] font-medium whitespace-nowrap">
        <strong className="font-semibold">{count}</strong> selected
      </span>
      <span className="bg-paper/18 inline-block h-[18px] w-px" />
      <div className="flex items-center gap-1.5">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              a.onClick?.();
            }}
            className={cn(
              "border-paper/16 cursor-pointer rounded-full border bg-transparent px-3 py-1.5 font-body text-[12px] whitespace-nowrap transition-colors",
              a.tone === "danger"
                ? "text-[#FFB89A] border-[rgba(255,184,154,0.22)] hover:bg-[rgba(255,184,154,0.10)]"
                : "text-paper hover:bg-paper/10 hover:border-paper/28",
            )}
          >
            {a.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        aria-label="Clear selection"
        className="text-paper hover:bg-paper/8 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-transparent opacity-60 transition-opacity hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}
