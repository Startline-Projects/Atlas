"use client";

/**
 * "Resume" button on the quick-help banner. Visual-only (no training
 * detail route exists this session); click fires e.preventDefault().
 *
 * Tiny Client island so the surrounding banner can stay Server.
 */

import { ArrowRight } from "lucide-react";

export function HelpResumeButton({
  trainingId,
  ctaLabel,
}: {
  trainingId: string;
  ctaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => e.preventDefault()}
      data-training-id={trainingId}
      className="bg-ink text-paper hover:bg-ink-soft inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg px-4 py-2.5 font-body text-[12.5px] font-medium transition-colors"
    >
      {ctaLabel}
      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
    </button>
  );
}
