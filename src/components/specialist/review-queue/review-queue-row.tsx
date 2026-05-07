import {
  AVATAR_GRADIENTS,
} from "@/lib/mock-data/specialist/queue-types";
import type { ReviewQueueCandidate } from "@/lib/mock-data/specialist/review-queue";
import { cn } from "@/lib/utils/cn";

const SLA_DOT: Record<ReviewQueueCandidate["slaBand"], string> = {
  fresh: "bg-success",
  warn: "bg-amber",
  urgent: "bg-danger animate-pulse",
};

const SLA_TEXT: Record<ReviewQueueCandidate["slaBand"], string> = {
  fresh: "text-ink-soft",
  warn: "text-amber",
  urgent: "text-danger",
};

const SCORE_CHIP: Record<ReviewQueueCandidate["compositeBand"], string> = {
  "clear-pass": "bg-lime text-ink",
  borderline: "bg-amber/14 text-amber",
  "clear-fail": "bg-danger-bg text-danger",
};

/** Higher-band display: ★ prefix when composite ≥ 85 (HTML pattern). */
function chipText(c: ReviewQueueCandidate): string {
  return c.composite >= 85 ? `★ ${c.composite}` : `${c.composite}`;
}

/** SLA timer copy: "22h waiting · 2h SLA" / "52h waiting · breached". */
function slaText(c: ReviewQueueCandidate): string {
  const waiting = `${c.hoursSinceSubmission}h waiting`;
  if (c.slaHoursRemaining <= 0) return `${waiting} · breached`;
  return `${waiting} · ${c.slaHoursRemaining}h SLA`;
}

export function ReviewQueueRow({ c }: { c: ReviewQueueCandidate }) {
  const gradient = c.avatarGradient
    ? AVATAR_GRADIENTS[c.avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };

  return (
    <div className="flex items-start gap-3">
      <div
        aria-hidden="true"
        className="font-display text-paper grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[14px] font-medium"
        style={{
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
        }}
      >
        {c.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink mb-0.5 flex items-center gap-1.5 text-[13.5px] font-semibold">
          <span className="truncate">{c.fullName}</span>
          <span aria-hidden="true" className="text-[12px]">
            {c.countryFlag}
          </span>
        </div>
        <div className="text-ink-mute mb-1.5 flex items-center gap-1.5 text-[12px]">
          <span
            className={cn(
              "rounded-[4px] px-1.5 py-px font-mono text-[9.5px] tracking-[0.04em]",
              SCORE_CHIP[c.compositeBand],
            )}
          >
            {chipText(c)}
          </span>
          <span className="truncate">
            {c.category} · {c.age}
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.04em]",
            SLA_TEXT[c.slaBand],
          )}
        >
          <span
            aria-hidden="true"
            className={cn("inline-block h-1.5 w-1.5 rounded-full", SLA_DOT[c.slaBand])}
          />
          {slaText(c)}
        </div>
      </div>
    </div>
  );
}
