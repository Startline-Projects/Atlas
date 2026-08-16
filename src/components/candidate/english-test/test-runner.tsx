"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CircleCheck,
  Clock3,
  ShieldCheck,
  SpellCheck,
  Timer,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiClientError, englishTestApi } from "@/lib/api-client";
import type { PublicTestQuestionDto } from "@/lib/api/dto/english-test.dto";
import { ENGLISH_TEST } from "@/lib/domain/english-test";
import { cn } from "@/lib/utils/cn";

type RunnerState = "intro" | "loading" | "running" | "submitting";

/**
 * Interactive short-form English test (prototype form of the real
 * proctored assessment — see PROJECT_SCOPE.md §3.1).
 *
 * The paper comes from the API when the candidate presses Begin (without
 * the answer key), the finished sheet goes back to the API to be scored and
 * recorded, and the runner hands off to the result page for that attempt.
 * Nothing about scoring or eligibility lives in this component.
 */
export function TestRunner({
  attemptNumber,
  paid,
}: {
  /** "Attempt #2" — for the intro copy. */
  attemptNumber: number;
  /** True for a paid retake (copy only; the server decides eligibility). */
  paid: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState<RunnerState>("intro");
  const [questions, setQuestions] = useState<PublicTestQuestionDto[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [error, setError] = useState<string | null>(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const answered = typeof answers[index] === "number";

  const handleBegin = async () => {
    setState("loading");
    setError(null);
    try {
      const { questions: paper } = await englishTestApi.questions();
      setQuestions(paper);
      setAnswers(paper.map(() => null));
      setIndex(0);
      setState("running");
    } catch (e) {
      setError(
        e instanceof ApiClientError
          ? e.message
          : "Could not load the test. Please try again.",
      );
      setState("intro");
    }
  };

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) =>
      prev.map((v, i) => (i === index ? optionIndex : v)),
    );
  };

  const handleNext = async () => {
    if (!answered) return;
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }

    setState("submitting");
    setError(null);
    try {
      const { attempt } = await englishTestApi.submit(answers);
      router.push(`/candidate/english-test/result?attempt=${attempt.id}&fresh=1`);
    } catch (e) {
      // 409 = this sheet was already recorded (double submit) — the result
      // exists, so go and show it rather than trapping the candidate here.
      if (e instanceof ApiClientError && e.status === 409) {
        router.push("/candidate/english-test/result");
        return;
      }
      setError(
        e instanceof ApiClientError
          ? e.message
          : "Could not submit your answers. Please try again.",
      );
      setState("running");
    }
  };

  if (state === "intro" || state === "loading") {
    return (
      <IntroCard
        attemptNumber={attemptNumber}
        paid={paid}
        loading={state === "loading"}
        error={error}
        onBegin={handleBegin}
      />
    );
  }

  // Index is always in range; the guard narrows the strict-indexing type.
  if (!question) return null;

  return (
    <div className="mx-auto max-w-[720px]">
      {/* Progress header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-ink-mute font-mono text-[11px] tracking-[0.14em] uppercase">
          {question.section} · Question {index + 1} of {questions.length}
        </span>
        <span className="bg-paper border-line text-ink flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-medium tabular-nums">
          <Timer className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          21:36
        </span>
      </div>
      <div className="bg-cream-deep mb-6 h-1 overflow-hidden rounded-full">
        <div
          className="bg-amber h-full transition-all duration-300"
          style={{
            width: `${((index + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question card */}
      <div className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
        {question.passage ? (
          <blockquote className="bg-cream border-line-soft text-ink-soft mb-5 rounded-md border px-4 py-3.5 text-[14px] leading-[1.65] italic">
            {question.passage}
          </blockquote>
        ) : null}
        <h2 className="font-display text-ink mb-6 text-[22px] leading-[1.3] font-medium sm:text-[25px]">
          {question.prompt}
        </h2>

        <div role="radiogroup" aria-label="Answer options" className="flex flex-col gap-2.5">
          {question.options.map((option, i) => {
            const selected = answers[index] === i;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleSelect(i)}
                className={cn(
                  "flex items-center gap-3 rounded-md border px-4 py-3.5 text-left text-[15px] transition-all",
                  selected
                    ? "border-ink bg-cream-hover text-ink shadow-[0_0_0_3px_rgba(14,14,12,0.08)]"
                    : "border-line bg-[#FFFDF7] text-ink-soft hover:border-ink-mute",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border-[1.5px] transition-all",
                    selected ? "border-ink bg-ink" : "border-line",
                  )}
                >
                  {selected ? (
                    <span className="bg-lime h-2 w-2 rounded-full" />
                  ) : null}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="bg-danger-bg text-danger mt-4 rounded-md px-3.5 py-3 text-[13px] leading-[1.5]"
        >
          {error}
        </p>
      )}

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0 || state === "submitting"}
          className="text-ink-mute hover:bg-cream-deep hover:text-ink inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] transition-colors disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!answered || state === "submitting"}
          className="btn btn-primary group disabled:pointer-events-none disabled:opacity-40"
        >
          <span>
            {state === "submitting"
              ? "Scoring…"
              : isLast
                ? "Finish & see my result"
                : "Next question"}
          </span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Intro — rules + the pass-or-fail policy, before the clock starts
   ============================================================ */

function IntroCard({
  attemptNumber,
  paid,
  loading,
  error,
  onBegin,
}: {
  attemptNumber: number;
  paid: boolean;
  loading: boolean;
  error: string | null;
  onBegin: () => void;
}) {
  return (
    <div className="mx-auto max-w-[720px]">
      <header className="mb-8 text-center">
        <div className="text-ink-mute mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {`// English assessment · Attempt #${attemptNumber}${paid ? " · Paid retake" : " · Free"}`}
        </div>
        <h1 className="display mb-3.5 text-[clamp(38px,5vw,56px)] leading-[1.04]">
          Ready when <span className="serif-italic">you</span> are.
        </h1>
        <p className="text-ink-soft mx-auto max-w-[480px] text-base leading-[1.55]">
          {ENGLISH_TEST.durationMinutes} minutes, CEFR-scored with detailed
          sub-scores. You need {ENGLISH_TEST.passingLevel} or higher to
          continue to interviews.
        </p>
      </header>

      <div className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
        <div className="border-line mb-5 grid grid-cols-3 gap-3 border-b pb-5">
          <IntroStat
            icon={<Clock3 className="h-4 w-4" strokeWidth={1.6} />}
            value={`${ENGLISH_TEST.durationMinutes} min`}
            label="Timed"
          />
          <IntroStat
            icon={<SpellCheck className="h-4 w-4" strokeWidth={1.6} />}
            value="10 questions"
            label="Short form"
          />
          <IntroStat
            icon={<BookOpenText className="h-4 w-4" strokeWidth={1.6} />}
            value="A1–C2"
            label="CEFR scale"
          />
        </div>

        <ul className="mb-6 flex flex-col gap-3">
          <IntroRule
            title="Pass or fail, your account stays."
            body="Everyone who takes the test sees their full result and sub-scores on their dashboard. A miss never deletes your application."
          />
          <IntroRule
            title={`First attempt free · retakes ${ENGLISH_TEST.retakeFeeLabel}.`}
            body={`No waiting period — you can retake immediately, as often as you like. Each retake costs ${ENGLISH_TEST.retakeFeeLabel}, paid before the attempt unlocks.`}
          />
          <IntroRule
            title="Proctored in the real assessment."
            body="Webcam on, no tab switching. This prototype uses a shortened un-proctored form of the live test."
          />
        </ul>

        {error && (
          <p
            role="alert"
            className="bg-danger-bg text-danger mb-4 rounded-md px-3.5 py-3 text-[13px] leading-[1.5]"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onBegin}
          disabled={loading}
          className="btn btn-primary btn-lg group w-full justify-center disabled:pointer-events-none disabled:opacity-60"
        >
          <span>{loading ? "Loading the paper…" : "Begin the test"}</span>
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </button>
        <p className="text-ink-mute mt-3.5 flex items-center justify-center gap-1.5 text-center text-[12.5px]">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          The timer starts when you begin. Finish in one sitting.
        </p>
      </div>
    </div>
  );
}

function IntroStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span aria-hidden="true" className="text-ink-mute">
        {icon}
      </span>
      <span className="text-ink text-[14.5px] font-semibold">{value}</span>
      <span className="text-ink-mute font-mono text-[10px] tracking-[0.12em] uppercase">
        {label}
      </span>
    </div>
  );
}

function IntroRule({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <CircleCheck
        className="text-success mt-0.5 h-[18px] w-[18px] flex-shrink-0"
        strokeWidth={1.6}
        aria-hidden="true"
      />
      <span className="text-[13.5px] leading-[1.55]">
        <strong className="text-ink font-semibold">{title}</strong>{" "}
        <span className="text-ink-soft">{body}</span>
      </span>
    </li>
  );
}
