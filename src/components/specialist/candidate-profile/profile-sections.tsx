/**
 * All profile section components — main column + side column cards.
 * Server-renderable. Each section is a `ProfileCard` with a body.
 *
 * Section IDs map to tab keys for scroll-jump navigation:
 *   #cps-overview (Bio + Skills, contains Overview tab anchor)
 *   #cps-engagements
 *   #cps-feedback
 *   #cps-activity
 */
import type {
  CandidateProfile,
  EngagementFull,
  ProfileVouch,
} from "@/lib/mock-data/specialist/candidate-profile";
import type { TimelineEvent } from "@/lib/mock-data/specialist/my-candidates";
import { cn } from "@/lib/utils/cn";
import { ProfileCard, ProfileFactRow } from "./profile-card";

/* ============================================================
   Main column — Bio
   ============================================================ */

export function BioSection({ p }: { p: CandidateProfile }) {
  return (
    <ProfileCard
      id="cps-overview"
      eyebrow="About"
      title={{ lead: "Bio &", italic: "specialty" }}
    >
      <p
        className="text-ink-soft font-display mb-4 text-[15px] leading-[1.6]"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        {p.bio}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {p.skills.map((s) => (
          <span
            key={s}
            className="bg-cream-deep text-ink-soft rounded-[4px] px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.04em]"
          >
            {s}
          </span>
        ))}
      </div>
    </ProfileCard>
  );
}

/* ============================================================
   Engagements section
   ============================================================ */

const ENGAGEMENT_LOGO: Record<EngagementFull["clientGradient"], string> = {
  1: "bg-gradient-to-br from-[#4F6FA8] to-[#233458] text-paper",
  2: "bg-gradient-to-br from-[#8C9D5A] to-[#4D5A28] text-paper",
  3: "bg-gradient-to-br from-[#B5786B] to-[#6F4439] text-paper",
  4: "bg-gradient-to-br from-[#7E6FA8] to-[#423564] text-paper",
  5: "bg-gradient-to-br from-[#5A8A8C] to-[#2B5054] text-paper",
};

const STATUS_PILL: Record<EngagementFull["status"], string> = {
  active: "bg-success-bg text-success",
  completed: "bg-cream-deep text-ink-soft",
  paused: "bg-amber/14 text-amber",
};

export function EngagementsSection({ p }: { p: CandidateProfile }) {
  const meta = `${p.engagements.length} engagement${p.engagements.length === 1 ? "" : "s"} · ${p.activeEngagements} active`;
  return (
    <ProfileCard
      id="cps-engagements"
      eyebrow="Engagements"
      title={{ lead: "All clients · all-time" }}
      meta={meta}
    >
      {p.engagements.length === 0 ? (
        <div className="text-ink-mute py-3 text-[13px]">
          No engagements yet — recently approved, awaiting first match.
        </div>
      ) : (
        <div className="flex flex-col">
          {p.engagements.map((e, i) => (
            <div
              key={`${e.clientName}-${i}`}
              className="border-line-soft grid grid-cols-[32px_minmax(0,1fr)_auto_auto_auto] items-center gap-3.5 border-b py-3 last:border-b-0"
            >
              <div
                aria-hidden="true"
                className={cn(
                  "grid h-8 w-8 flex-shrink-0 place-items-center rounded-[7px] font-mono text-[10.5px] font-semibold",
                  ENGAGEMENT_LOGO[e.clientGradient],
                )}
              >
                {e.clientInitials}
              </div>
              <div className="min-w-0">
                <div className="text-ink mb-px text-[13.5px] font-medium">
                  {e.clientName}
                </div>
                <div className="text-ink-mute font-mono text-[10px] tracking-[0.04em] uppercase">
                  {e.role}
                </div>
              </div>
              <span
                className={cn(
                  "rounded-[3px] px-2 py-[3px] font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase max-md:hidden",
                  STATUS_PILL[e.status],
                )}
              >
                {e.status}
              </span>
              <span className="text-ink-mute text-right font-mono text-[11px] tabular-nums max-md:hidden">
                {e.startedLabel}
                {e.endedLabel ? ` – ${e.endedLabel}` : ""}
              </span>
              <span className="font-display text-ink text-right text-[13px] font-medium tabular-nums">
                {e.hours}h
                {e.rating ? (
                  <span className="text-amber ml-1.5 text-[11px]">
                    ★ {e.rating.toFixed(1)}
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      )}
    </ProfileCard>
  );
}

/* ============================================================
   Feedback / rating distribution
   ============================================================ */

export function FeedbackSection({ p }: { p: CandidateProfile }) {
  const total = p.reviewCount;
  if (total === 0) {
    return (
      <ProfileCard
        id="cps-feedback"
        eyebrow="Client feedback"
        title={{ lead: "Rating distribution" }}
      >
        <div className="text-ink-mute py-3 text-[13px]">
          No client reviews yet. Distribution will populate after the first
          completed engagement.
        </div>
      </ProfileCard>
    );
  }
  const max = Math.max(
    p.ratingDistribution[5],
    p.ratingDistribution[4],
    p.ratingDistribution[3],
    p.ratingDistribution[2],
    p.ratingDistribution[1],
    1,
  );
  return (
    <ProfileCard
      id="cps-feedback"
      eyebrow="Client feedback"
      title={{ lead: "Rating distribution" }}
      meta={`${total} review${total === 1 ? "" : "s"} aggregated`}
    >
      <div className="flex flex-col gap-2">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = p.ratingDistribution[star];
          const pct = (count / max) * 100;
          return (
            <div
              key={star}
              className="grid grid-cols-[28px_minmax(0,1fr)_28px] items-center gap-3"
            >
              <span className="text-ink-mute font-mono text-[11px]">{star}★</span>
              <div className="bg-line-soft relative h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full",
                    star >= 4 ? "bg-success" : "bg-amber",
                  )}
                  style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                />
              </div>
              <span className="font-display text-ink text-right text-[13px] font-medium tabular-nums">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </ProfileCard>
  );
}

/* ============================================================
   Activity timeline
   ============================================================ */

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

export function TimelineSection({ p }: { p: CandidateProfile }) {
  if (p.activityTimeline.length === 0) {
    return (
      <ProfileCard
        id="cps-activity"
        eyebrow="Activity"
        title={{ lead: "Recent timeline" }}
        meta="Last 30 days"
      >
        <div className="text-ink-mute py-3 text-[13px]">
          No recent activity.
        </div>
      </ProfileCard>
    );
  }
  return (
    <ProfileCard
      id="cps-activity"
      eyebrow="Activity"
      title={{ lead: "Recent timeline" }}
      meta="Last 30 days"
    >
      <ul className="flex flex-col gap-3.5">
        {p.activityTimeline.map((ev) => (
          <li key={ev.id} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full",
                TIMELINE_BULLET[ev.kind],
              )}
            />
            <div className="text-ink-soft flex-1 text-[13px] leading-[1.5]">
              {ev.text}
              <span className="text-ink-mute mt-1 block font-mono text-[10px] tracking-[0.04em]">
                {ev.when}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </ProfileCard>
  );
}

/* ============================================================
   Side column — Vital facts
   ============================================================ */

export function VitalFactsSection({ p }: { p: CandidateProfile }) {
  const certLabel =
    p.certExpiresInDays <= 0
      ? "—"
      : p.certExpiresInDays < 30
        ? `in ${p.certExpiresInDays} days`
        : `in ${Math.round(p.certExpiresInDays / 30)} mo`;
  const certTone: "default" | "amber" | "danger" =
    p.certExpiresInDays <= 0
      ? "default"
      : p.certExpiresInDays < 14
        ? "danger"
        : p.certExpiresInDays < 60
          ? "amber"
          : "default";
  const langCount = p.languagesShort.split("·").length;
  return (
    <ProfileCard eyebrow="Vital facts" title={{ lead: "At a glance" }}>
      <div className="flex flex-col">
        <ProfileFactRow label="Tier" value={p.tier} />
        <ProfileFactRow
          label="Status"
          value={p.statusLabel}
          tone={
            p.status === "in-dispute" || p.status === "pending-action"
              ? "danger"
              : p.status === "paused" || p.status === "vacation"
                ? "amber"
                : "success"
          }
        />
        <ProfileFactRow
          label="Time in pool"
          value={p.monthsInPool === 0 ? "New" : `${p.monthsInPool} mo`}
          tone="mono"
        />
        <ProfileFactRow
          label="Cert expires"
          value={certLabel}
          tone={certTone === "default" ? "mono" : certTone}
        />
        <ProfileFactRow label="Hourly rate" value={p.hourlyRate} tone="mono" />
        <ProfileFactRow
          label="Last engagement"
          value={p.lastActivityLabel}
          tone="mono"
        />
        <ProfileFactRow label="Languages" value={langCount} tone="mono" />
        <ProfileFactRow
          label="Avg response"
          value={p.avgResponseTime}
          tone="mono"
        />
      </div>
    </ProfileCard>
  );
}

/* ============================================================
   Side column — Verified vouches
   ============================================================ */

export function VouchesSection({ p }: { p: CandidateProfile }) {
  if (p.vouches.length === 0) {
    return (
      <ProfileCard
        eyebrow="References"
        title={{ lead: "Verified vouches" }}
        meta="None on file"
      >
        <div className="text-ink-mute py-2 text-[13px]">
          No verified references on file yet.
        </div>
      </ProfileCard>
    );
  }
  return (
    <ProfileCard
      eyebrow="References"
      title={{ lead: "Verified vouches" }}
      meta={`${p.vouches.length} verified`}
    >
      <div className="flex flex-col gap-3">
        {p.vouches.map((v) => (
          <Vouch key={v.id} v={v} />
        ))}
      </div>
    </ProfileCard>
  );
}

function Vouch({ v }: { v: ProfileVouch }) {
  return (
    <div>
      <div className="text-ink mb-0.5 text-[13px] font-medium">{v.name}</div>
      <div className="text-ink-mute mb-1.5 font-mono text-[10.5px] tracking-[0.04em] uppercase">
        {v.meta}
      </div>
      <div
        className="font-display text-ink-soft border-lime border-l-2 pl-2.5 text-[12.5px] leading-[1.5] italic"
        style={{ fontVariationSettings: '"opsz" 36' }}
      >
        &ldquo;{v.quote}&rdquo;
      </div>
    </div>
  );
}

/* ============================================================
   Side column — Anti-cheat integrity
   ============================================================ */

export function AntiCheatSection({ p }: { p: CandidateProfile }) {
  return (
    <ProfileCard eyebrow="Anti-cheat" title={{ lead: "Integrity record" }}>
      <div className="flex flex-col">
        <ProfileFactRow
          label="Latest scan"
          value={p.antiCheat.latestScan}
          tone={p.antiCheat.latestScan === "Clean" ? "success" : "danger"}
        />
        <ProfileFactRow
          label="Biometric match"
          value={p.antiCheat.biometricMatch}
          tone="mono"
        />
        <ProfileFactRow
          label="Geo anomalies"
          value={p.antiCheat.geoAnomalies}
          tone="mono"
        />
        <ProfileFactRow
          label="Plagiarism"
          value={p.antiCheat.plagiarism}
          tone="mono"
        />
      </div>
    </ProfileCard>
  );
}
