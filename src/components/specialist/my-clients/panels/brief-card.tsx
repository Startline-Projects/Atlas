/**
 * BriefCard — one row in the briefs panel.
 *
 * Carries the brief's role, scope, budget, shortlist progress, and SLA
 * tone. Shortlist count clicks would deep-link into a "view shortlist"
 * sub-view — out of scope for Session 7; logged as future polish.
 */

import { Calendar, Sparkles } from "lucide-react";
import type {
  BriefStatus,
  ClientBrief,
} from "@/lib/mock-data/specialist/client-briefs";
import { cn } from "@/lib/utils/cn";

const STATUS_PILL: Record<BriefStatus, string> = {
  open: "bg-[rgba(214,242,77,0.20)] text-lime-deep",
  "shortlist-sent": "bg-[rgba(214,242,77,0.20)] text-lime-deep",
  filled: "bg-success-bg text-success",
  "closed-no-fill": "bg-cream-deep text-ink-mute",
  draft: "bg-cream-deep text-ink-soft",
  paused: "bg-amber/15 text-amber",
};

const STATUS_LABEL: Record<BriefStatus, string> = {
  open: "Open",
  "shortlist-sent": "Shortlist sent",
  filled: "Filled",
  "closed-no-fill": "Closed",
  draft: "Draft",
  paused: "Paused",
};

const SLA_TONE: Record<ClientBrief["slaTone"], string> = {
  fresh: "text-ink-mute",
  warn: "text-amber",
  urgent: "text-danger animate-pulse",
};

function formatBudget(b: ClientBrief["budget"]): string {
  if (b.type === "hourly") return `$${b.min}–$${b.max}/hr`;
  return `$${b.min.toLocaleString("en-US")}–$${b.max.toLocaleString("en-US")}/mo`;
}

export function BriefCard({ brief }: { brief: ClientBrief }) {
  return (
    <article className="border-line bg-paper shadow-sm flex flex-col gap-3 rounded-md border p-4">
      {/* Top — role + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-ink m-0 text-[14px] font-semibold leading-tight">
            {brief.role}
          </h4>
          <p className="text-ink-soft mt-1 m-0 text-[12.5px] leading-[1.45]">
            {brief.scope}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-[3px] font-mono text-[10px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap",
            STATUS_PILL[brief.status],
          )}
        >
          {STATUS_LABEL[brief.status]}
        </span>
      </div>

      {/* Stats row — budget + shortlist + SLA */}
      <div className="grid grid-cols-3 gap-3 border-line-soft border-t pt-3">
        <Stat label="Budget" value={formatBudget(brief.budget)} />
        <Stat
          label="Shortlist"
          value={
            brief.shortlistCount > 0
              ? `${brief.shortlistCount} candidate${brief.shortlistCount === 1 ? "" : "s"}`
              : "—"
          }
          icon={brief.shortlistCount > 0 ? <Sparkles className="h-3 w-3" /> : undefined}
        />
        {(() => {
          const isClosed =
            brief.status === "filled" || brief.status === "closed-no-fill";
          const sla = SLA_TONE[brief.slaTone];
          return (
            <Stat
              label={isClosed ? "Closed" : "Open"}
              value={isClosed ? `${brief.daysOpen}d to fill` : `${brief.daysOpen}d open`}
              {...(isClosed ? {} : { tone: sla })}
              icon={
                <Calendar
                  className={cn("h-3 w-3", isClosed ? "" : sla)}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              }
            />
          );
        })()}
      </div>
    </article>
  );
}

function Stat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tone?: string;
}) {
  return (
    <div>
      <div className="text-ink-mute mb-0.5 font-mono text-[9.5px] tracking-[0.14em] uppercase">
        {label}
      </div>
      <div className={cn("text-[12.5px] font-medium leading-tight flex items-center gap-1.5", tone ?? "text-ink")}>
        {icon ? (
          <span aria-hidden="true" className="flex-shrink-0">
            {icon}
          </span>
        ) : null}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}
