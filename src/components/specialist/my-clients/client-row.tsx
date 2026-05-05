import { ArrowUpRight, MessageSquare, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type { ManagedClient } from "@/lib/mock-data/specialist/my-clients";
import { cn } from "@/lib/utils/cn";

const HEALTH_PILL: Record<string, string> = {
  Strong: "bg-success-bg text-success",
  "Awaiting shortlist": "bg-amber/14 text-amber",
  "Expansion ask": "bg-success-bg text-success",
  "Open dispute": "bg-danger-bg text-danger",
  "Onboarding stalled": "bg-amber/14 text-amber",
  Onboarding: "bg-[rgba(214,242,77,0.18)] text-lime-deep",
  Paused: "bg-cream-deep text-ink-mute",
  "Churn risk": "bg-danger-bg text-danger",
};

const LOGO_GRADIENT: Record<ManagedClient["logoGradient"], string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
};

function briefClass(days: number): string {
  if (days >= 999) return "text-ink-mute";
  if (days >= 30) return "text-amber";
  if (days >= 14) return "text-amber";
  return "text-ink-soft";
}

function briefText(label: string, days: number): string {
  if (days >= 999) return "—";
  return label;
}

export function ClientRow({ c }: { c: ManagedClient }) {
  return (
    <>
      <td className="text-ink-soft min-w-[220px]">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className={cn(
              "grid h-8 w-8 flex-shrink-0 place-items-center rounded-[7px] font-mono text-[11px] font-semibold tracking-[0.04em]",
              LOGO_GRADIENT[c.logoGradient],
            )}
          >
            {c.logoInitials}
          </div>
          <div className="min-w-0">
            <div className="text-ink mb-px flex items-center gap-1.5 text-[13.5px] font-medium">
              <span className="truncate">{c.companyName}</span>
              <span aria-hidden="true" className="text-[13px]">
                {c.countryFlag}
              </span>
              {c.isVip ? (
                <span
                  aria-label="VIP client"
                  className="bg-lime text-ink rounded-[3px] px-1 py-px font-mono text-[8.5px] font-semibold tracking-[0.1em] uppercase"
                >
                  VIP
                </span>
              ) : null}
            </div>
            <div className="text-ink-mute truncate font-mono text-[10.5px] tracking-[0.04em]">
              {c.industry.toUpperCase()} · {c.city.toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="align-middle">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-[9px] py-[3px] pb-1 text-[11.5px] font-medium whitespace-nowrap",
            HEALTH_PILL[c.healthLabel] ?? "bg-cream-deep text-ink-soft",
          )}
        >
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
          {c.healthLabel}
        </span>
      </td>
      <td className="text-ink text-center align-middle font-mono text-[12px] tabular-nums">
        {c.activeHires}
      </td>
      <td className="text-ink text-right align-middle font-mono text-[12px] tabular-nums">
        {c.totalSpendLabel}
      </td>
      <td className="text-ink text-right align-middle font-mono text-[12px] tabular-nums">
        {c.rating > 0 ? (
          <>
            <span className="text-amber mr-0.5" aria-hidden="true">
              ★
            </span>
            {c.rating.toFixed(1)}
          </>
        ) : (
          <span className="text-ink-mute">—</span>
        )}
      </td>
      <td className="align-middle">
        <span className={cn("font-mono text-[12px] whitespace-nowrap tabular-nums", briefClass(c.daysSinceLastBrief))}>
          {briefText(c.lastBriefLabel, c.daysSinceLastBrief)}
        </span>
      </td>
      <td className="w-[92px] text-right align-middle">
        <div className="inline-flex gap-0.5 opacity-40 group-hover:opacity-100">
          <Link
            href="/specialist/messages"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Message ${c.companyName}`}
            className="text-ink-mute hover:bg-paper hover:border-line hover:text-ink grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-transparent transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open hiring history for ${c.companyName}`}
            className="text-ink-mute hover:bg-paper hover:border-line hover:text-ink grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-transparent transition-colors"
          >
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="More actions"
            className="text-ink-mute hover:bg-paper hover:border-line hover:text-ink grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-transparent transition-colors"
          >
            <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </td>
    </>
  );
}
