import { AVATAR_GRADIENTS } from "@/lib/mock-data/specialist/queue-types";
import type { RecertCandidate } from "@/lib/mock-data/specialist/recert-queue";
import { cn } from "@/lib/utils/cn";

const CERT_DOT: Record<RecertCandidate["certBand"], string> = {
  fresh: "bg-success",
  warn: "bg-amber",
  urgent: "bg-danger animate-pulse",
};

const CERT_TEXT: Record<RecertCandidate["certBand"], string> = {
  fresh: "text-ink-soft",
  warn: "text-amber",
  urgent: "text-danger",
};

const RATING_CHIP: Record<"high" | "mid" | "low", string> = {
  high: "bg-success-bg text-success",
  mid: "bg-cream-deep text-ink-soft",
  low: "bg-amber/14 text-amber",
};

function ratingBand(r: number): "high" | "mid" | "low" {
  if (r >= 4.5) return "high";
  if (r >= 4.0) return "mid";
  return "low";
}

function chipText(c: RecertCandidate): string {
  return c.averageRating >= 4.5
    ? `★ ${c.averageRating.toFixed(1)}`
    : c.averageRating.toFixed(1);
}

/** Cert timer copy: "Cert: 14 days · 1,420h" or urgent "Cert: 5 days · action needed". */
function certText(c: RecertCandidate): string {
  if (c.certBand === "urgent") {
    return `Cert: ${c.certExpiresInDays} days · action needed`;
  }
  return `Cert: ${c.certExpiresInDays} days · ${c.totalHoursWorked.toLocaleString("en-US")}h`;
}

export function RecertQueueRow({ c }: { c: RecertCandidate }) {
  const gradient = c.avatarGradient
    ? AVATAR_GRADIENTS[c.avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };
  const band = ratingBand(c.averageRating);

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
              RATING_CHIP[band],
            )}
          >
            {chipText(c)}
          </span>
          <span className="truncate">
            {c.currentTier} · {c.monthsInPool} mo
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.04em]",
            CERT_TEXT[c.certBand],
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              CERT_DOT[c.certBand],
            )}
          />
          {certText(c)}
        </div>
      </div>
    </div>
  );
}
