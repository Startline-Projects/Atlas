import {
  Calendar,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  SheetActions,
  SheetHero,
  SheetSection,
  SheetStats,
} from "@/components/specialist/people-shared/roster-sheet-parts";
import {
  AVATAR_GRADIENTS,
} from "@/lib/mock-data/specialist/queue-types";
import type {
  EngagementLite,
  ManagedCandidate,
  TimelineEvent,
} from "@/lib/mock-data/specialist/my-candidates";
import { cn } from "@/lib/utils/cn";

const TIMELINE_BULLET: Record<TimelineEvent["kind"], string> = {
  approved: "bg-lime-deep",
  hired: "bg-success",
  "review-received": "bg-success",
  "recert-submitted": "bg-amber",
  "dispute-opened": "bg-danger",
  "dispute-resolved": "bg-success",
  "rate-changed": "bg-ink",
  "skill-added": "bg-lime-deep",
  "vacation-set": "bg-amber",
  paused: "bg-amber",
  "off-boarded": "bg-ink-mute",
  "client-message": "bg-navy",
  "specialist-message": "bg-ink",
};

export function CandidateSheetContent({ c }: { c: ManagedCandidate }) {
  const gradient = c.avatarGradient
    ? AVATAR_GRADIENTS[c.avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };

  return (
    <>
      <SheetHero
        avatar={
          <div
            aria-hidden="true"
            className="font-display text-paper grid h-16 w-16 place-items-center rounded-full text-[24px] font-medium"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            {c.initials}
          </div>
        }
        title={
          <>
            {c.fullName}
            <span aria-hidden="true" className="text-[20px]">
              {c.countryFlag}
            </span>
          </>
        }
        meta={`${c.city.toUpperCase()}, ${c.countryName.toUpperCase()} · ${c.age} · JOINED ${c.poolJoinedLabel.toUpperCase()}`}
        tags={[
          { label: c.tier },
          { label: c.statusLabel, tone: c.status === "in-dispute" || c.status === "pending-action" ? "danger" : c.status === "paused" ? "amber" : "default" },
          ...(c.averageRating > 0
            ? [{ label: `★ ${c.averageRating.toFixed(1)}`, tone: "success" as const }]
            : []),
        ]}
      />

      <SheetStats
        stats={[
          {
            num: c.totalEngagements,
            label: "Engagements",
          },
          {
            num: (
              <>
                {c.hoursLifetime.toLocaleString("en-US")}
                <em className="text-ink-mute font-display text-[12px] font-normal not-italic">h</em>
              </>
            ),
            label: "Hours",
          },
          {
            num:
              c.averageRating > 0 ? (
                <>
                  {c.averageRating.toFixed(1)}
                  <em className="text-ink-mute font-display text-[12px] font-normal not-italic">
                    /5
                  </em>
                </>
              ) : (
                <span className="text-ink-mute">—</span>
              ),
            label: "Rating",
          },
        ]}
      />

      {c.engagementsPreview.length > 0 ? (
        <SheetSection title="Active engagements">
          <div className="flex flex-col gap-2">
            {c.engagementsPreview.map((e, i) => (
              <EngagementRow key={`${e.clientName}-${i}`} e={e} />
            ))}
          </div>
        </SheetSection>
      ) : null}

      {c.activityPreview.length > 0 ? (
        <SheetSection title="Recent activity">
          <ul className="flex flex-col gap-3">
            {c.activityPreview.map((ev) => (
              <li key={ev.id} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
                    TIMELINE_BULLET[ev.kind],
                  )}
                />
                <div className="text-ink-soft text-[12.5px] leading-[1.45]">
                  {ev.text}
                  <span className="text-ink-mute mt-1 block font-mono text-[10px] tracking-[0.04em]">
                    {ev.when}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </SheetSection>
      ) : null}

      <SheetActions
        actions={[
          {
            key: "message",
            label: "Send message",
            icon: <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />,
            variant: "primary",
            href: `/specialist/messages?candidate=${c.id}`,
          },
          {
            key: "profile",
            label: "Open full profile",
            icon: <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />,
            href: `/specialist/candidates/${c.id}`,
          },
          {
            key: "checkin",
            label: "Schedule check-in",
            icon: <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />,
          },
          {
            key: "suggest",
            label: "Suggest for client match",
            icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
          },
          {
            key: "recert",
            label: "Flag for re-cert",
            icon: <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />,
          },
        ]}
      />
    </>
  );
}

const ENGAGEMENT_GRADIENT: Record<EngagementLite["clientGradient"], string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
  5: "bg-gradient-to-br from-[#5A8A8C] to-[#2B5054] text-paper",
};

const ENGAGEMENT_STATUS_PILL: Record<EngagementLite["status"], string> = {
  active: "bg-success-bg text-success",
  completed: "bg-cream-deep text-ink-soft",
  paused: "bg-amber/14 text-amber",
};

function EngagementRow({ e }: { e: EngagementLite }) {
  return (
    <div className="border-line bg-cream/50 flex items-center gap-2.5 rounded-md border p-2.5">
      <div
        aria-hidden="true"
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-md font-mono text-[11px] font-semibold",
          ENGAGEMENT_GRADIENT[e.clientGradient],
        )}
      >
        {e.clientInitials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-ink truncate text-[12.5px] font-medium">
          {e.clientName}
        </div>
        <div className="text-ink-mute truncate text-[11px]">{e.role}</div>
      </div>
      <span
        className={cn(
          "rounded-[3px] px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.06em] uppercase",
          ENGAGEMENT_STATUS_PILL[e.status],
        )}
      >
        {e.status}
      </span>
      <span className="font-display text-ink text-right text-[12.5px] font-medium tabular-nums">
        {e.hours}h
      </span>
    </div>
  );
}
