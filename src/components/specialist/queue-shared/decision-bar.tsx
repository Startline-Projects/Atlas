import { ArrowRight, Check, X } from "lucide-react";
import type { DecisionBarConfig } from "@/lib/mock-data/specialist/queue-types";
import { cn } from "@/lib/utils/cn";

type DecisionBarProps = {
  config: DecisionBarConfig;
  onDestructive: () => void;
  onNeutral: () => void;
  onPrimary: () => void;
  /** Maps to lucide icon variants for the destructive button: review uses ✕ (reject), recert uses → (off-board). */
  destructiveIcon?: "x" | "arrow-right";
  /** Maps to lucide icon variants for the neutral button: review uses → (revisions), recert uses ‖ (pause). */
  neutralIcon?: "arrow-right" | "pause";
};

function PauseBars() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 3v8M9 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function OffboardArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h10M9 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DecisionBar({
  config,
  onDestructive,
  onNeutral,
  onPrimary,
  destructiveIcon = "x",
  neutralIcon = "arrow-right",
}: DecisionBarProps) {
  return (
    <div className="bg-paper/95 border-line sticky bottom-0 z-[10] border-t backdrop-blur-md">
      <div className="container-page mx-auto flex max-w-none flex-wrap items-center justify-between gap-4 px-6 py-3 sm:px-9">
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="text-ink text-[13px]">
            <strong className="font-semibold">{config.aiRecommendation}</strong>
            <span className="text-ink-mute font-normal">
              {" · "}
              {config.aiConfidence}
            </span>
          </div>
          <div className="text-ink-mute text-[11.5px]">
            Sections reviewed · {config.sectionsReviewed} of {config.sectionsTotal} ·
            avg specialist {config.averageMinutes}
          </div>
          <div className="bg-line-soft mt-1 h-1 w-[180px] overflow-hidden rounded-full">
            <div
              className="bg-ink h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.round((config.sectionsReviewed / config.sectionsTotal) * 100))}%`,
              }}
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onDestructive}
            className={cn(
              "border-danger text-danger hover:bg-danger hover:text-paper inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors",
            )}
          >
            {destructiveIcon === "x" ? (
              <X className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <OffboardArrow />
            )}
            <span className="hidden sm:inline">{config.destructive.longLabel ?? config.destructive.label}</span>
            <span className="sm:hidden">{config.destructive.label}</span>
          </button>
          <button
            type="button"
            onClick={onNeutral}
            className="border-amber text-amber hover:bg-amber hover:text-paper inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors"
          >
            {neutralIcon === "pause" ? (
              <PauseBars />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{config.neutral.longLabel ?? config.neutral.label}</span>
            <span className="sm:hidden">{config.neutral.label}</span>
          </button>
          <button
            type="button"
            onClick={onPrimary}
            className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            {config.primary.label}
          </button>
        </div>
      </div>
    </div>
  );
}
