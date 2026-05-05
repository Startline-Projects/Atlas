/**
 * All recert-queue section components — same pattern as review-queue's
 * `sections.tsx`. Sections receive only the data they need; no global
 * state. Server Components throughout.
 */
import { Lock } from "lucide-react";
import { IvCard } from "@/components/specialist/queue-shared/iv-card";
import { IdentityGrid } from "@/components/specialist/queue-shared/identity-grid";
import { NotesCard } from "@/components/specialist/queue-shared/notes-card";
import { RefList } from "@/components/specialist/queue-shared/ref-list";
import { SectionFrame } from "@/components/specialist/queue-shared/section-frame";
import type {
  ClientFeedback,
  Engagement,
  ProfileDiff,
  RecertCandidate,
  RecertOverviewStripe,
  RecertKpi,
} from "@/lib/mock-data/specialist/recert-queue";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Overview — stripe + KPI grid + AI summary
   ============================================================ */

export function OverviewSection({ c }: { c: RecertCandidate }) {
  return (
    <SectionFrame
      id="rcs-overview"
      num="01"
      title="Overview"
      status={{ label: `AI: ${c.aiRecommendation}`, tone: "success" }}
    >
      <OverviewStripe data={c.overviewStripe} />
      <KpiGrid kpis={c.overviewKpis} />
      <div className="bg-paper border-line shadow-sm mt-4 rounded-md border p-5">
        <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.16em] uppercase">
          {c.overviewSummary.label}
        </div>
        <p className="text-ink-soft text-[13.5px] leading-[1.6]">
          {c.overviewSummary.body}
        </p>
      </div>
    </SectionFrame>
  );
}

function OverviewStripe({ data }: { data: RecertOverviewStripe }) {
  return (
    <div className="bg-paper border-line shadow-sm mb-4 grid gap-4 rounded-md border p-5 sm:grid-cols-3">
      <StripeCell
        label="Time in pool"
        value={
          <>
            {data.monthsInPool}{" "}
            <em className="font-display text-ink-mute font-normal italic">
              months
            </em>
          </>
        }
        detail={data.poolJoinedDate}
      />
      <StripeCell
        label="Current tier"
        value={
          <>
            {data.currentTierLabel.split("→").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part.trim()}</span>
              ) : (
                <span key={i}>
                  <em className="font-display text-ink-mute font-normal italic">
                    {" → " + part.trim()}
                  </em>
                </span>
              ),
            )}
          </>
        }
        detail={data.tierDetail}
      />
      <StripeCell
        label="Next cert due"
        value={data.nextCertDate}
        detail={data.cycleNote}
      />
    </div>
  );
}

function StripeCell({
  label,
  value,
  detail,
}: {
  label: string;
  value: React.ReactNode;
  detail: string;
}) {
  return (
    <div className="border-line-soft border-l pl-4 first:border-l-0 first:pl-0 sm:border-l">
      <div className="text-ink-mute mb-1 font-mono text-[9.5px] tracking-[0.16em] uppercase">
        {label}
      </div>
      <div className="font-display text-ink mb-1 text-[22px] font-medium tracking-[-0.015em]">
        {value}
      </div>
      <div className="text-ink-mute text-[11.5px] leading-[1.4]">{detail}</div>
    </div>
  );
}

const KPI_TREND_TONE: Record<RecertKpi["trendTone"], string> = {
  success: "text-success",
  neutral: "text-ink-mute",
};

function KpiGrid({ kpis }: { kpis: ReadonlyArray<RecertKpi> }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="bg-paper border-line shadow-sm rounded-md border p-4"
        >
          <div className="text-ink-mute mb-1.5 font-mono text-[9.5px] tracking-[0.14em] uppercase">
            {k.label}
          </div>
          <div className="font-display text-ink mb-1.5 inline-flex items-baseline gap-0.5 text-[26px] leading-none font-medium tracking-[-0.02em]">
            {k.value.toLocaleString("en-US")}
            {k.suffix ? (
              <span className="text-ink-mute font-body text-[13px] font-normal">
                {k.suffix}
              </span>
            ) : null}
          </div>
          <div
            className={cn(
              "font-mono text-[11px] tracking-[0.04em]",
              KPI_TREND_TONE[k.trendTone],
            )}
          >
            {k.trendLabel}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Engagement history
   ============================================================ */

const ENGAGE_AVATAR: Record<Engagement["clientGradient"], string> = {
  1: "from-[#4F6FA8] to-[#233458]",
  2: "from-[#8C9D5A] to-[#4D5A28]",
  3: "from-[#B5786B] to-[#6F4439]",
  4: "from-[#7E6FA8] to-[#423564]",
};

const ENGAGE_STATUS: Record<Engagement["status"], string> = {
  active: "bg-success-bg text-success",
  completed: "bg-cream-deep text-ink-soft",
};

export function EngagementSection({ c }: { c: RecertCandidate }) {
  const completed = c.engagements.filter((e) => e.status === "completed").length;
  const active = c.engagements.filter((e) => e.status === "active").length;
  return (
    <SectionFrame
      id="rcs-engagement"
      num="02"
      title="Engagement history"
      meta={
        <span>
          {c.engagements.length} engagements · {completed} completed · {active} active
        </span>
      }
      status={{ label: "Healthy mix", tone: "success" }}
    >
      <div className="bg-paper border-line shadow-sm overflow-hidden rounded-md border">
        {c.engagements.map((e, i) => (
          <div
            key={e.id}
            className={cn(
              "grid items-center gap-3 px-4 py-3 sm:grid-cols-[44px_minmax(0,1fr)_88px_70px_64px]",
              i > 0 && "border-line-soft border-t",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "font-display text-paper grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br text-[12px] font-medium",
                ENGAGE_AVATAR[e.clientGradient],
              )}
            >
              {e.clientInitials}
            </div>
            <div className="min-w-0">
              <div className="text-ink truncate text-[13.5px] font-semibold">
                {e.clientName}
              </div>
              <div className="text-ink-mute truncate text-[12px]">
                {e.role}
              </div>
            </div>
            <span
              className={cn(
                "rounded-[3px] px-2 py-[3px] text-center font-mono text-[9.5px] font-semibold tracking-[0.06em] uppercase",
                ENGAGE_STATUS[e.status],
              )}
            >
              {e.status}
            </span>
            <span className="font-display text-ink text-right text-[14px] font-medium tabular-nums">
              {e.hours.toLocaleString("en-US")}h
            </span>
            <span className="text-ink flex items-center justify-end gap-1 text-[13px] font-medium tabular-nums">
              <span aria-hidden="true" className="text-amber">
                ★
              </span>
              {e.rating.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

/* ============================================================
   Client feedback
   ============================================================ */

export function FeedbackSection({ c }: { c: RecertCandidate }) {
  return (
    <SectionFrame
      id="rcs-feedback"
      num="03"
      title="Client feedback"
      meta={
        <span>
          {c.feedback.totalReviews} reviews aggregated · {c.feedback.quotes.length}{" "}
          detailed quotes
        </span>
      }
      status={{ label: c.feedback.percentileLabel, tone: "success" }}
    >
      <RatingCard data={c.feedback} />
      <div className="mt-4 flex flex-col gap-3">
        {c.feedback.quotes.map((q) => (
          <div
            key={q.id}
            className={cn(
              "shadow-sm rounded-md border p-5",
              q.warn
                ? "bg-amber/5 border-amber/25"
                : "bg-paper border-line",
            )}
          >
            <p className="font-display text-ink mb-3 text-[16px] leading-[1.5] font-normal italic">
              &ldquo;{q.text}&rdquo;
            </p>
            <div className="text-ink-mute flex flex-wrap items-center gap-1.5 text-[12.5px]">
              <span>—</span>
              <strong className="text-ink-soft font-semibold">
                {q.author}
              </strong>
              <span>·</span>
              <span>{q.date}</span>
              <span>·</span>
              <span aria-hidden="true" className="text-amber">
                {"★".repeat(q.rating)}
                {"☆".repeat(5 - q.rating)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

function RatingCard({ data }: { data: ClientFeedback }) {
  const max = Math.max(
    data.distribution[5],
    data.distribution[4],
    data.distribution[3],
    data.distribution[2],
    data.distribution[1],
    1,
  );
  return (
    <div className="bg-paper border-line shadow-sm grid gap-6 rounded-md border p-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-6">
      <div className="flex flex-col items-start gap-2">
        <div className="font-display text-ink flex items-baseline gap-1 text-[44px] leading-none font-medium tracking-[-0.025em]">
          {data.averageRating.toFixed(1)}
          <span className="text-ink-mute font-body text-[14px] font-normal">
            /5
          </span>
        </div>
        <div className="text-amber text-[18px]" aria-hidden="true">
          {"★".repeat(Math.floor(data.averageRating))}
          <span className="text-line">{"★".repeat(5 - Math.floor(data.averageRating))}</span>
        </div>
        <span className="bg-success-bg text-success rounded-full px-2.5 py-1 text-[11.5px] font-medium">
          {data.percentileLabel}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = data.distribution[star];
          const pct = (count / max) * 100;
          return (
            <div
              key={star}
              className="grid grid-cols-[28px_minmax(0,1fr)_28px] items-center gap-3"
            >
              <span className="text-ink-mute font-mono text-[11px]">
                {star}★
              </span>
              <div className="bg-line-soft relative h-1.5 overflow-hidden rounded-full">
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
    </div>
  );
}

/* ============================================================
   Profile changes (diff list)
   ============================================================ */

const DIFF_TAG: Record<ProfileDiff["kind"], string> = {
  changed: "bg-amber/14 text-amber",
  added: "bg-success-bg text-success",
};

export function ChangesSection({ c }: { c: RecertCandidate }) {
  if (c.profileChanges.length === 0) {
    return (
      <SectionFrame
        id="rcs-changes"
        num="04"
        title="Profile changes"
        meta={<span>No changes since last cert</span>}
        status={{ label: "Stable", tone: "success" }}
      >
        <div className="bg-paper border-line text-ink-mute rounded-md border p-5 text-[13.5px]">
          No profile changes recorded since last certification.
        </div>
      </SectionFrame>
    );
  }
  return (
    <SectionFrame
      id="rcs-changes"
      num="04"
      title="Profile changes"
      meta={<span>{c.profileChanges.length} changes since last cert</span>}
      status={{ label: "Reviewed", tone: "neutral" }}
    >
      <div className="bg-paper border-line shadow-sm overflow-hidden rounded-md border">
        {c.profileChanges.map((d, i) => (
          <div
            key={d.id}
            className={cn(
              "flex items-start gap-3 px-4 py-3.5",
              i > 0 && "border-line-soft border-t",
            )}
          >
            <span
              className={cn(
                "rounded-[3px] px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.06em] uppercase",
                DIFF_TAG[d.kind],
              )}
            >
              {d.kind}
            </span>
            <div className="min-w-0 flex-1">
              <strong className="text-ink mb-0.5 block text-[13.5px] font-semibold">
                {d.field}
              </strong>
              <div className="text-ink-soft text-[12.5px] leading-[1.5]">
                {d.oldValue !== undefined && d.newValue !== undefined ? (
                  <span className="mr-2 inline-flex items-center gap-2">
                    <span className="text-ink-mute line-through">
                      {d.oldValue}
                    </span>
                    <span aria-hidden="true" className="text-ink-mute">
                      →
                    </span>
                    <span className="text-ink font-medium">{d.newValue}</span>
                    <span aria-hidden="true" className="text-ink-mute">
                      ·
                    </span>
                  </span>
                ) : null}
                {d.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

/* ============================================================
   Re-cert interview (IV-card + meta)
   ============================================================ */

export function RecertInterviewSection({ c }: { c: RecertCandidate }) {
  return (
    <SectionFrame
      id="rcs-interview"
      num="05"
      title="Re-cert interview"
      meta={<span>{c.recertInterview.durationLabel}</span>}
      status={{
        label: c.recertInterview.passed ? "Passed" : "Flagged",
        tone: c.recertInterview.passed ? "success" : "warn",
      }}
    >
      <IvCard data={c.recertInterview.card} />
    </SectionFrame>
  );
}

/* ============================================================
   References refresh
   ============================================================ */

export function ReferencesSection({ c }: { c: RecertCandidate }) {
  return (
    <SectionFrame
      id="rcs-references"
      num="06"
      title="References refresh"
      meta={<span>{c.references.length} verified</span>}
      status={{ label: "All verified strong", tone: "success" }}
    >
      <RefList refs={c.references} />
    </SectionFrame>
  );
}

/* ============================================================
   Anti-cheat refresh
   ============================================================ */

export function AntiCheatSection({ c }: { c: RecertCandidate }) {
  const cleanCount = c.antiCheat.checks.filter((x) => x.passed).length;
  const totalCount = c.antiCheat.checks.length;
  const ok = !c.antiCheat.flagsRaised;
  return (
    <SectionFrame
      id="rcs-anti-cheat"
      num="07"
      title="Anti-cheat refresh"
      meta={
        <span>
          {cleanCount} of {totalCount} checks passed
        </span>
      }
      status={{
        label: ok ? "All clean" : "Flag raised",
        tone: ok ? "success" : "warn",
      }}
    >
      <IdentityGrid data={c.antiCheat} />
    </SectionFrame>
  );
}

/* ============================================================
   AI assessment
   ============================================================ */

export function AssessmentSection({ c }: { c: RecertCandidate }) {
  return (
    <SectionFrame
      id="rcs-assessment"
      num="08"
      title="AI assessment"
      meta={<span>Composite of all re-cert signals</span>}
      status={{ label: c.aiRecommendation, tone: "success" }}
    >
      <IvCard data={c.assessment.card} />
      {c.assessment.nextPlacementBody ? (
        <div className="bg-paper border-line shadow-sm mt-4 rounded-md border p-5">
          <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.16em] uppercase">
            {c.assessment.nextPlacementLabel ?? "Recommended next placement"}
          </div>
          <p className="text-ink-soft text-[13.5px] leading-[1.55]">
            {c.assessment.nextPlacementBody}
          </p>
        </div>
      ) : null}
    </SectionFrame>
  );
}

/* ============================================================
   Notes
   ============================================================ */

export function NotesSection() {
  return (
    <SectionFrame
      id="rcs-notes"
      num="09"
      title="Internal notes"
      meta={
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
          Visible only to specialists & admin
        </span>
      }
    >
      <NotesCard
        label="Re-cert notes"
        placeholder="Anything a future specialist should know about this re-cert decision…"
      />
    </SectionFrame>
  );
}
