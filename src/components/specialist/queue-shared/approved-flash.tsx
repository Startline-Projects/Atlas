"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ApprovedFlashProps = {
  open: boolean;
  /** "Approved." / "Re-certified." */
  verb: React.ReactNode;
  /** Trailing tail — "Marie's live." */
  tail: React.ReactNode;
  /** Sub-line under the heading — e.g. "Loading next candidate…". */
  sub: string;
  /** Reference id at the bottom — "REVIEW #2K8F-MIG-04-30 · 8m 12s". */
  meta: string;
  tone?: "success" | "warn";
};

export function ApprovedFlash({
  open,
  verb,
  tail,
  sub,
  meta,
  tone = "success",
}: ApprovedFlashProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "pointer-events-none fixed inset-0 z-[300] flex flex-col items-center justify-center gap-4 transition-opacity duration-200",
        tone === "success" ? "bg-cream/95" : "bg-amber/12",
        open ? "pointer-events-auto opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "grid h-20 w-20 place-items-center rounded-full",
          tone === "success" ? "bg-success text-paper" : "bg-amber text-paper",
        )}
      >
        <Check className="h-10 w-10" strokeWidth={2.5} aria-hidden="true" />
      </div>
      <h2 className="font-display text-ink text-[40px] leading-tight font-medium tracking-[-0.02em]">
        <span className="serif-italic mr-1">{verb}</span>
        {tail}
      </h2>
      <p className="text-ink-soft text-[15px]">{sub}</p>
      <span className="text-ink-mute mt-2 font-mono text-[11px] tracking-[0.14em] uppercase">
        {meta}
      </span>
    </div>
  );
}
