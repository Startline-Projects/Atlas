/**
 * Candidate dashboard. Server Component — state arrives as a prop
 * (validated from ?state= by the page, defaulting to the mock story).
 *
 * Three English-test states cover the locked product policy:
 *   fresh  — test not taken yet; first attempt is free
 *   failed — result visible, $10 retake bookable immediately (default)
 *   passed — C1+ cleared; interviews are next
 *
 * A failed attempt NEVER hides the dashboard: the account stays
 * active, the result stays visible, and there is no waiting period —
 * payment unlocks the retake on the spot. Preview any state via
 * /candidate/dashboard?state=<key>.
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
import { cn } from "@/lib/utils/cn";
import {
  ENGLISH_TEST,
  currentCandidate,
  journeySteps,
  latestAttempt,
  passedRetakeAttempt,
  testAttempts,
  type TestAttempt,
} from "@/lib/mock-data/candidate";
import { AttemptHistory } from "@/components/candidate/english-test/attempt-history";

export type DashboardState = "fresh" | "failed" | "passed";

export function DashboardApp({ state }: { state: DashboardState }) {
  const attempts: ReadonlyArray<TestAttempt> =
    state === "fresh"
      ? []
      : state === "passed"
        ? [...testAttempts, passedRetakeAttempt]
        : testAttempts;

  return (
    <div className="mx-auto flex max-w-[840px] flex-col gap-10">
      {/* Greeting */}
      <header>
        <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// Candidate dashboard"}
        </div>
        <h1 className="display mb-2 text-[clamp(34px,4.4vw,50px)] leading-[1.05]">
          Welcome back,{" "}
          <span className="serif-italic">{currentCandidate.firstName}</span>.
        </h1>
        <p className="text-ink-soft text-[15px]">
          {currentCandidate.appliedRole} · {currentCandidate.cityCountry} ·
          applied {currentCandidate.memberSince}
        </p>
      </header>

      {/* Journey strip */}
      <JourneyStrip passed={state === "passed"} />

      {/* English-test status card */}
      {state === "fresh" && <FreshCard />}
      {state === "failed" && <FailedCard />}
      {state === "passed" && <PassedCard />}

      {/* History — every attempt stays on the record, pass or fail */}
      <AttemptHistory attempts={attempts} />
    </div>
  );
}

/* ============================================================
   Journey strip
   ============================================================ */

function JourneyStrip({ passed }: { passed: boolean }) {
  return (
    <section aria-label="Vetting progress">
      <ol className="border-line bg-paper shadow-card flex flex-wrap gap-x-5 gap-y-2.5 rounded-xl border px-5 py-4 sm:rounded-[18px] sm:px-6">
        {journeySteps.map((step) => {
          const status =
            passed && step.key === "english-test"
              ? "done"
              : passed && step.key === "interview-1"
                ? "current"
                : step.status;
          return (
            <li key={step.key} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-[18px] w-[18px] place-items-center rounded-full",
                  status === "done" && "bg-ink text-lime",
                  status === "current" && "bg-amber text-paper",
                  status === "upcoming" && "bg-cream-deep text-ink-mute",
                )}
              >
                {status === "done" ? (
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={cn(
                  "text-[12.5px]",
                  status === "current"
                    ? "text-ink font-semibold"
                    : status === "done"
                      ? "text-ink-soft"
                      : "text-ink-mute",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
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
   STATE: failed — result on record, retake bookable right now
   ============================================================ */

function FailedCard() {
  if (!latestAttempt) return null;

  return (
    <section className="bg-paper border-line shadow-card overflow-hidden rounded-xl border sm:rounded-[22px]">
      {/* Latest result */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 sm:pb-6">
        <div className="flex items-center gap-4">
          <span className="border-amber bg-amber-bg grid h-16 w-16 flex-shrink-0 place-items-center rounded-full border-2">
            <span className="flex flex-col items-center leading-none">
              <span className="font-display text-ink text-[22px] font-medium tabular-nums">
                {latestAttempt.score}
              </span>
              <span className="text-ink-mute font-mono text-[8.5px] tracking-[0.1em] uppercase">
                /100
              </span>
            </span>
          </span>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="font-display text-ink text-[21px] leading-tight font-medium">
                English test · CEFR {latestAttempt.cefr}
              </h2>
              <span className="bg-amber-bg text-amber rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase">
                Below {ENGLISH_TEST.passingLevel}
              </span>
            </div>
            <p className="text-ink-soft text-[13.5px]">
              Attempt #{latestAttempt.number} · {latestAttempt.takenAtLabel} ·
              your account and result are saved — nothing is lost.
            </p>
          </div>
        </div>
        <Link
          href="/candidate/english-test/result"
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
              Retake for {ENGLISH_TEST.retakeFeeLabel}
            </span>
            <span className="text-ink-mute flex items-center gap-1 text-[12.5px]">
              <Zap className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              Available now — unlocks the moment payment clears
            </span>
          </div>
        </div>
        <Link href="/candidate/english-test/retake" className="btn btn-primary group">
          <span>Book retake · {ENGLISH_TEST.retakeFeeLabel}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   STATE: passed — C1+ cleared, interviews next
   ============================================================ */

function PassedCard() {
  return (
    <section className="bg-paper border-line shadow-card overflow-hidden rounded-xl border sm:rounded-[22px]">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 sm:pb-6">
        <div className="flex items-center gap-4">
          <span className="border-success bg-success-bg grid h-16 w-16 flex-shrink-0 place-items-center rounded-full border-2">
            <span className="flex flex-col items-center leading-none">
              <span className="font-display text-ink text-[22px] font-medium tabular-nums">
                {passedRetakeAttempt.score}
              </span>
              <span className="text-ink-mute font-mono text-[8.5px] tracking-[0.1em] uppercase">
                /100
              </span>
            </span>
          </span>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="font-display text-ink text-[21px] leading-tight font-medium">
                English test · CEFR {passedRetakeAttempt.cefr}
              </h2>
              <span className="bg-success-bg text-success flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.1em] uppercase">
                <BadgeCheck className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
                Passed
              </span>
            </div>
            <p className="text-ink-soft text-[13.5px]">
              Attempt #{passedRetakeAttempt.number} ·{" "}
              {passedRetakeAttempt.takenAtLabel} · sub-scores are on your
              profile for clients to see.
            </p>
          </div>
        </div>
        <Link
          href="/candidate/english-test/result?score=84"
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
              30 minutes with a screener · no prep needed
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
