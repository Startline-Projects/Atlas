import { ArrowUpRight, MessageSquare, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  AVATAR_GRADIENTS,
} from "@/lib/mock-data/specialist/queue-types";
import type { ManagedCandidate } from "@/lib/mock-data/specialist/my-candidates";
import { cn } from "@/lib/utils/cn";

const TIER_PILL: Record<ManagedCandidate["tier"], string> = {
  Elite:
    "bg-[rgba(214,242,77,0.22)] text-ink shadow-[inset_0_0_0_1px_var(--color-lime-deep)]",
  Vetted: "bg-success-bg text-success",
  Standard: "bg-cream-deep text-ink-soft",
};

const STATUS_PILL: Record<ManagedCandidate["status"], string> = {
  active: "bg-success-bg text-success",
  "active-contract": "bg-success-bg text-success",
  "multiple-contracts": "bg-success-bg text-success",
  available: "bg-cream-deep text-ink-mute",
  vacation: "bg-cream-deep text-ink-mute",
  "pending-action": "bg-danger-bg text-danger",
  "in-dispute": "bg-danger-bg text-danger",
  paused: "bg-amber/14 text-amber",
  "off-boarded": "bg-cream-deep text-ink-mute opacity-70",
  "awaiting-client": "bg-[rgba(214,242,77,0.18)] text-lime-deep",
};

const STATUS_SHORT_LABEL: Record<ManagedCandidate["status"], string> = {
  active: "Live",
  "active-contract": "Active",
  "multiple-contracts": "Multi",
  available: "Available",
  vacation: "Vacation",
  "pending-action": "Action",
  "in-dispute": "Dispute",
  paused: "Paused",
  "off-boarded": "Off-boarded",
  "awaiting-client": "New",
};

/** Cert chip color: <14 days urgent, <60 warn, otherwise neutral. */
function certClass(days: number): string {
  if (days <= 0) return "text-ink-mute font-mono text-[12px]";
  if (days < 14) return "text-danger font-mono text-[12px]";
  if (days < 60) return "text-amber font-mono text-[12px]";
  return "text-ink-soft font-mono text-[12px]";
}

function certLabel(days: number): string {
  if (days <= 0) return "—";
  if (days < 30) return `${days}d`;
  if (days < 180) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 30)}mo`;
}

export function CandidateRow({ c }: { c: ManagedCandidate }) {
  const gradient = c.avatarGradient
    ? AVATAR_GRADIENTS[c.avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };
  return (
    <>
      <td className="text-ink-soft min-w-[220px]">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="text-paper grid h-8 w-8 flex-shrink-0 place-items-center rounded-[7px] font-mono text-[11px] font-semibold tracking-[0.04em]"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            {c.initials}
          </div>
          <div className="min-w-0">
            <div className="text-ink mb-px flex items-center gap-1.5 text-[13.5px] font-medium">
              <span className="truncate">{c.fullName}</span>
              <span aria-hidden="true" className="text-[13px]">
                {c.countryFlag}
              </span>
            </div>
            <div className="text-ink-mute truncate font-mono text-[10.5px] tracking-[0.04em]">
              {c.city.toUpperCase()} · {c.category.toUpperCase()}
            </div>
          </div>
        </div>
      </td>
      <td className="align-middle">
        <span
          className={cn(
            "inline-block rounded-[4px] px-[7px] py-[3px] font-mono text-[9.5px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase",
            TIER_PILL[c.tier],
          )}
        >
          {c.tier}
        </span>
      </td>
      <td className="align-middle">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-[9px] py-[3px] pb-1 text-[11.5px] font-medium whitespace-nowrap",
            STATUS_PILL[c.status],
          )}
        >
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
          {STATUS_SHORT_LABEL[c.status]}
        </span>
        {c.disputes > 0 ? (
          <span aria-hidden="true" className="bg-danger ml-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" />
        ) : null}
      </td>
      <td className="text-ink-soft min-w-[130px] align-middle">
        <div className="text-ink mb-px font-mono text-[12.5px] font-medium">
          {c.activeEngagements} active · {c.totalEngagements} total
        </div>
        {c.engagementsPreview.length > 0 ? (
          <div className="text-ink-mute max-w-[160px] truncate text-[11px]">
            {c.engagementsPreview.map((e) => e.clientName).join(" · ")}
          </div>
        ) : (
          <div className="text-ink-mute text-[11px]">—</div>
        )}
      </td>
      <td className="text-ink text-right align-middle font-mono text-[12px] tabular-nums">
        {c.averageRating > 0 ? (
          <>
            <span className="text-amber mr-0.5" aria-hidden="true">
              ★
            </span>
            {c.averageRating.toFixed(1)}
          </>
        ) : (
          <span className="text-ink-mute">—</span>
        )}
      </td>
      <td className="text-ink text-right align-middle font-mono text-[12px] tabular-nums">
        {c.hoursLifetime > 0
          ? c.hoursLifetime.toLocaleString("en-US")
          : <span className="text-ink-mute">—</span>}
      </td>
      <td className="align-middle">
        <span className={cn("whitespace-nowrap tabular-nums", certClass(c.certExpiresInDays))}>
          {certLabel(c.certExpiresInDays)}
        </span>
      </td>
      <td className="w-[92px] text-right align-middle">
        <div className="inline-flex gap-0.5 opacity-40 group-hover:opacity-100">
          <Link
            href={`/specialist/candidate-chat?id=${c.id}`}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Message ${c.fullName}`}
            className="text-ink-mute hover:bg-paper hover:border-line hover:text-ink grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-transparent transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link
            href={`/specialist/candidates/${c.id}`}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open profile of ${c.fullName}`}
            className="text-ink-mute hover:bg-paper hover:border-line hover:text-ink grid h-7 w-7 cursor-pointer place-items-center rounded-md border border-transparent transition-colors"
          >
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
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
