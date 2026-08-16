/**
 * Candidate dashboard. Server Component — everything arrives as props.
 *
 * Three English-test cards cover the locked product policy:
 *   fresh   — no attempt yet; first attempt is free
 *   failed  — result visible; $10 retake bookable immediately, or (if a
 *             retake is already paid for) startable right now
 *   passed  — C1+ cleared; interviews are next
 *
 * A failed attempt NEVER hides the dashboard: the account stays active,
 * the result stays visible, and there is no waiting period — payment
 * unlocks the retake on the spot. Which card renders is decided by
 * `overview.eligibility`, computed by the service (ARCHITECTURE §5.1).
 */
import {
  ArrowRight,
  BadgeCheck,
  Check,
  RotateCcw,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { AttemptHistory } from "@/components/candidate/english-test/attempt-history";
import { formatTakenAt } from "@/components/candidate/english-test/format";
import type {
  EnglishTestOverviewDto,
  TestAttemptDto,
} from "@/lib/api/dto/english-test.dto";
import type { Candidate } from "@/lib/domain/candidate";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { ENGLISH_TEST, type EnglishTestEligibility, type JourneyStep } from "@/lib/domain/english-test";
import { cn } from "@/lib/utils/cn";

/** "Jul 2026" — the account-created label under the greeting. */
const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function DashboardApp({
  candidate,
  overview,
}: {
  candidate: Candidate;
  overview: EnglishTestOverviewDto;
}) {
  const firstName = candidate.fullName.split(/\s+/)[0] ?? candidate.fullName;
  const meta = [
    roleCategoryLabel(candidate.roleCategory),
    candidate.country,
    `applied ${MONTH_YEAR.format(candidate.createdAt)}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const { eligibility, latest, attempts, journey } = overview;

  return (
    <div className="mx-auto flex max-w-[840px] flex-col gap-10">
      {/* Greeting */}
      <header>
        <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// Candidate dashboard"}
        </div>
        <h1 className="display mb-2 text-[clamp(34px,4.4vw,50px)] leading-[1.05]">
          Welcome back, <span className="serif-italic">{firstName}</span>.
        </h1>
        <p className="text-ink-soft text-[15px]">{meta}</p>
      </header>

      {/* Journey strip */}
      <JourneyStrip steps={journey} />

      {/* English-test status card */}
      {eligibility.status === "free_available" && <FreshCard />}
      {eligibility.status === "passed" && latest && <PassedCard latest={latest} />}
      {(eligibility.status === "retake_locked" ||
        eligibility.status === "retake_unlocked") &&
        latest && <FailedCard latest={latest} eligibility={eligibility} />}

      {/* History — every attempt stays on the record, pass or fail */}
      <AttemptHistory attempts={attempts} />
    </div>
  );
}

/* ============================================================
   Journey strip
   ============================================================ */

function JourneyStrip({ steps }: { steps: ReadonlyArray<JourneyStep> }) {
  return (
    <section aria-label="Vetting progress">
      <ol className="border-line bg-paper shadow-card flex flex-wrap gap-x-5 gap-y-2.5 rounded-xl border px-5 py-4 sm:rounded-[18px] sm:px-6">
        {steps.map((step) => (
          <li key={step.key} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cn(
                "grid h-[18px] w-[18px] place-items-center rounded-full",
                step.status === "done" && "bg-ink text-lime",
                step.status === "current" && "bg-amber text-paper",
                step.status === "upcoming" && "bg-cream-deep text-ink-mute",
              )}
            >
              {step.status === "done" ? (
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </span>
            <span
              className={cn(
                "text-[12.5px]",
                step.status === "current"
                  ? "text-ink font-semibold"
                  : step.status === "done"
                    ? "text-ink-soft"
                    : "text-ink-mute",
              )}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   STATE: fresh — first attempt available, free
   ============================================================ */

function FreshCard() {
  return (
    <section className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-[440px]">
          <span className="bg-lime text-ink mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10.5px] font-bold tracking-[0.12em] uppercase">
            <Sparkles className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
            First attempt free
          </span>
          <h2 className="font-display text-ink mb-2 text-[24px] leading-[1.15] font-medium">
            Your English test is ready.
          </h2>
          <p className="text-ink-soft text-[14px] leading-[1.6]">
            {ENGLISH_TEST.durationMinutes} minutes, CEFR-scored with
            sub-scores. Pass or fail, your account stays active and your
            result lands right here. Retakes cost{" "}
            {ENGLISH_TEST.retakeFeeLabel} and unlock the moment you pay —
            but take your free shot when you&rsquo;re sharp.
          </p>
        </div>
        <Link
          href="/candidate/english-test"
          className="btn btn-primary btn-lg group"
        >
          <span>Start the test — free</span>
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   STATE: failed — result on record; retake bookable or already unlocked
   ============================================================ */

function FailedCard({
  latest,
  eligibility,
}: {
  latest: TestAttemptDto;
  eligibility: Extract<
    EnglishTestEligibility,
    { status: "retake_locked" | "retake_unlocked" }
  >;
}) {
  const unlocked = eligibility.status === "retake_unlocked";

  return (
    <section className="bg-paper border-line shadow-card overflow-hidden rounded-xl border sm:rounded-[22px]">
      {/* Latest result */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 sm:pb-6">
        <div className="flex items-center gap-4">
          <span className="border-amber bg-amber-bg grid h-16 w-16 flex-shrink-0 place-items-center rounded-full border-2">
            <span className="flex flex-col items-center leading-none">
              <span className="font-display text-ink text-[22px] font-medium tabular-nums">
                {latest.score}
              </span>
              <span className="text-ink-mute font-mono text-[8.5px] tracking-[0.1em] uppercase">
                /100
              </span>
            </span>
          </span>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="font-display text-ink text-[21px] leading-tight font-medium">
                English test · CEFR {latest.cefr}
              </h2>
              <span className="bg-amber-bg text-amber rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase">
                Below {ENGLISH_TEST.passingLevel}
              </span>
            </div>
            <p className="text-ink-soft text-[13.5px]">
              Attempt #{latest.number} · {formatTakenAt(latest.takenAt)} · your
              account and result are saved — nothing is lost.
            </p>
          </div>
        </div>
        <Link
          href={`/candidate/english-test/result?attempt=${latest.id}`}
          className="text-ink border-line hover:border-ink border-b pb-px text-[13.5px] font-medium transition-colors"
        >
          View full result
        </Link>
      </div>

      {/* Retake panel — no waiting period, payment unlocks it instantly */}
      <div className="border-line-soft bg-cream/60 flex flex-wrap items-center justify-between gap-4 border-t px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="bg-cream-deep text-ink grid h-10 w-10 flex-shrink-0 place-items-center rounded-full">
            <RotateCcw className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-ink text-[14px] font-semibold">
              {unlocked
                ? `Attempt #${eligibility.nextAttemptNumber} is unlocked`
                : `Retake for ${ENGLISH_TEST.retakeFeeLabel}`}
            </span>
            <span className="text-ink-mute flex items-center gap-1 text-[12.5px]">
              <Zap className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              {unlocked
                ? "Paid and ready — start whenever you're sharp"
                : "Available now — unlocks the moment payment clears"}
            </span>
          </div>
        </div>
        {unlocked ? (
          <Link href="/candidate/english-test" className="btn btn-primary group">
            <span>Start attempt #{eligibility.nextAttemptNumber}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </Link>
        ) : (
          <Link href="/candidate/english-test/retake" className="btn btn-primary group">
            <span>Book retake · {ENGLISH_TEST.retakeFeeLabel}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   STATE: passed — C1+ cleared, interviews next
   ============================================================ */

function PassedCard({ latest }: { latest: TestAttemptDto }) {
  return (
    <section className="bg-paper border-line shadow-card overflow-hidden rounded-xl border sm:rounded-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 sm:pb-6">
        <div className="flex items-center gap-4">
          <span className="border-success bg-success-bg grid h-16 w-16 flex-shrink-0 place-items-center rounded-full border-2">
            <span className="flex flex-col items-center leading-none">
              <span className="font-display text-ink text-[22px] font-medium tabular-nums">
                {latest.score}
              </span>
              <span className="text-ink-mute font-mono text-[8.5px] tracking-[0.1em] uppercase">
                /100
              </span>
            </span>
          </span>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="font-display text-ink text-[21px] leading-tight font-medium">
                English test · CEFR {latest.cefr}
              </h2>
              <span className="bg-success-bg text-success flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase">
                <BadgeCheck className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
                Passed
              </span>
            </div>
            <p className="text-ink-soft text-[13.5px]">
              Attempt #{latest.number} · {formatTakenAt(latest.takenAt)} ·
              sub-scores are on your profile for clients to see.
            </p>
          </div>
        </div>
        <Link
          href={`/candidate/english-test/result?attempt=${latest.id}`}
          className="text-ink border-line hover:border-ink border-b pb-px text-[13.5px] font-medium transition-colors"
        >
          View full result
        </Link>
      </div>

      <div className="border-line-soft bg-cream/60 flex flex-wrap items-center justify-between gap-4 border-t px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="bg-cream-deep text-ink grid h-10 w-10 flex-shrink-0 place-items-center rounded-full">
            <Video className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-ink text-[14px] font-semibold">
              Next: first video interview
            </span>
            <span className="text-ink-mute text-[12.5px]">
              30 minutes with a screener · scheduling opens soon
            </span>
          </div>
        </div>
        <span
          aria-disabled="true"
          className="btn btn-primary cursor-not-allowed opacity-60"
        >
          Schedule interview
        </span>
      </div>
    </section>
  );
}
