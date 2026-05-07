/**
 * Status banner above Section 01 — "Both parties have submitted statements
 * · awaiting Atlas decision" + SLA countdown chip.
 *
 * Tones map per source CSS:
 *   - default → amber border-left, paper bg
 *   - urgent  → danger border-left + danger-bg
 *   - resolved → success border-left + success-bg
 *   - info    → ink border-left, paper bg
 *   - danger  → danger border-left + danger-bg
 *
 * Server Component.
 */

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { DisputeStatusBanner } from "@/lib/mock-data/specialist/disputes";
import { cn } from "@/lib/utils/cn";

const TONE_CLASS: Record<
  DisputeStatusBanner["tone"],
  { wrap: string; icon: string; iconBg: string }
> = {
  default: {
    wrap: "border-l-amber bg-paper",
    icon: "text-amber",
    iconBg: "bg-paper",
  },
  urgent: {
    wrap: "border-l-danger bg-danger-bg",
    icon: "text-danger",
    iconBg: "bg-paper",
  },
  info: {
    wrap: "border-l-ink bg-paper",
    icon: "text-ink-soft",
    iconBg: "bg-cream-deep",
  },
  danger: {
    wrap: "border-l-danger bg-danger-bg",
    icon: "text-danger",
    iconBg: "bg-paper",
  },
};

const SLA_TONE: Record<
  DisputeStatusBanner["slaTone"],
  string
> = {
  default: "bg-cream-deep text-ink-soft",
  amber: "bg-amber/15 text-amber",
  danger: "bg-danger-bg text-danger",
  success: "bg-success-bg text-success",
};

export function DisputeStatusBanner({
  banner,
}: {
  banner: DisputeStatusBanner;
}) {
  const tone = TONE_CLASS[banner.tone];
  const Icon =
    banner.tone === "urgent" || banner.tone === "danger"
      ? AlertTriangle
      : banner.tone === "info"
        ? CheckCircle2
        : Info;
  return (
    <div
      className={cn(
        "border-line mb-2 flex items-center gap-4 rounded-[10px] border border-l-[4px] px-5 py-3.5",
        tone.wrap,
      )}
    >
      <div
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-full",
          tone.iconBg,
          tone.icon,
        )}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </div>
      <div className="min-w-0 flex-1 text-[14px] font-medium text-ink">
        {banner.message}
      </div>
      <div
        className={cn(
          "rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase",
          SLA_TONE[banner.slaTone],
        )}
      >
        {banner.slaLabel}
      </div>
    </div>
  );
}
