import { Prisma } from "@prisma/client";

import type { Candidate } from "@/lib/domain/candidate";
import {
  cefrForScore,
  isPassingLevel,
  type EnglishTestEligibility,
  type EnglishTestOverview,
  type JourneyStep,
  type PublicTestQuestion,
  type RetakeCheckoutStart,
  type TestAttempt,
} from "@/lib/domain/english-test";
import {
  BusinessRuleError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { englishTestRepository } from "@/lib/repositories/english-test";
import { paymentRepository } from "@/lib/repositories/payment";
import { paymentService } from "@/lib/services/payment";

import { publicQuestions, QUESTION_COUNT, scoreAnswers } from "./question-bank";

/**
 * English-test service — ARCHITECTURE §6 step 5.
 *
 * Owns the product policy in one place:
 *   • first attempt free, every later one needs an unused $10 payment;
 *   • an attempt is scored here, from the answer key the client never sees;
 *   • a pass ends the sequence; a fail keeps everything and offers a retake.
 * Everything the dashboard shows about the test is a *flag* computed here,
 * not a rule re-derived in a component (§5.1).
 */

const UNIQUE_CONSTRAINT = "P2002";

export const englishTestService = {
  /** One read for the dashboard: history + what the candidate may do next. */
  async overview(candidate: Candidate): Promise<EnglishTestOverview> {
    const attempts = await englishTestRepository.listAttempts(candidate.id);
    const eligibility = await eligibilityFor(candidate.id, attempts);
    const latest = attempts[attempts.length - 1] ?? null;
    return {
      attempts,
      latest,
      eligibility,
      journey: journeyFor(candidate, latest),
    };
  },

  async eligibility(userId: string): Promise<EnglishTestEligibility> {
    const attempts = await englishTestRepository.listAttempts(userId);
    return eligibilityFor(userId, attempts);
  },

  /**
   * The questions for a sitting — only when the candidate may actually sit
   * one, so a locked retake cannot preview the paper.
   */
  async questions(userId: string): Promise<PublicTestQuestion[]> {
    const eligibility = await this.eligibility(userId);
    assertMaySit(eligibility);
    return publicQuestions();
  },

  async attempt(userId: string, attemptId: string): Promise<TestAttempt> {
    const attempt = await englishTestRepository.findAttempt(userId, attemptId);
    if (!attempt) throw new NotFoundError("We could not find that attempt.");
    return attempt;
  },

  /**
   * Sells a retake only to a candidate who actually needs one: failed so far
   * and nothing paid-and-unused. Passed candidates and first-timers are turned
   * away here, before any money moves. The charge itself is `paymentService`'s.
   */
  async startRetakeCheckout(input: {
    userId: string;
    email: string;
    returnPath: string;
  }): Promise<RetakeCheckoutStart> {
    const eligibility = await this.eligibility(input.userId);
    if (eligibility.status === "passed") {
      throw new BusinessRuleError(
        "You have already passed the English test — no retake is needed.",
      );
    }
    if (eligibility.status === "free_available") {
      throw new BusinessRuleError(
        "Your first attempt is free — take it from your dashboard.",
      );
    }
    if (eligibility.status === "retake_unlocked") {
      throw new BusinessRuleError(
        "You already have a paid retake waiting — start it from your dashboard.",
      );
    }
    return paymentService.startRetakeCheckout(input);
  },

  /**
   * Scores a full answer sheet and records the attempt. For a retake the
   * unlocking payment is consumed in the same write (unique link), so a
   * payment can never fund two sittings even if two tabs submit at once.
   */
  async submit(
    userId: string,
    answers: ReadonlyArray<number | null>,
  ): Promise<TestAttempt> {
    if (answers.length !== QUESTION_COUNT) {
      throw new ValidationError(
        `Expected ${QUESTION_COUNT} answers, received ${answers.length}.`,
        { answers: "Incomplete answer sheet." },
      );
    }

    const eligibility = await this.eligibility(userId);
    assertMaySit(eligibility);

    const { score, subScores } = scoreAnswers(answers);
    const cefr = cefrForScore(score);

    try {
      return await englishTestRepository.createAttempt({
        userId,
        number: eligibility.nextAttemptNumber,
        kind: eligibility.status === "free_available" ? "FREE" : "PAID",
        score,
        cefr,
        passed: isPassingLevel(cefr),
        subScores,
        answers,
        paymentId:
          eligibility.status === "retake_unlocked" ? eligibility.paymentId : null,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === UNIQUE_CONSTRAINT
      ) {
        throw new ConflictError(
          "This attempt was already recorded — refresh your dashboard.",
        );
      }
      throw error;
    }
  },
};

/* -------------------------------------------------------------------------- */
/* Rules                                                                      */
/* -------------------------------------------------------------------------- */

async function eligibilityFor(
  userId: string,
  attempts: ReadonlyArray<TestAttempt>,
): Promise<EnglishTestEligibility> {
  if (attempts.length === 0) {
    return { status: "free_available", nextAttemptNumber: 1 };
  }

  const latest = attempts[attempts.length - 1];
  if (latest?.passed) {
    return { status: "passed", nextAttemptNumber: null };
  }

  const nextAttemptNumber = attempts.length + 1;
  const unlocked = await paymentRepository.findUnconsumed(
    userId,
    "ENGLISH_TEST_RETAKE",
  );
  if (unlocked) {
    return { status: "retake_unlocked", nextAttemptNumber, paymentId: unlocked.id };
  }
  return { status: "retake_locked", nextAttemptNumber };
}

function assertMaySit(
  eligibility: EnglishTestEligibility,
): asserts eligibility is Extract<
  EnglishTestEligibility,
  { status: "free_available" | "retake_unlocked" }
> {
  if (eligibility.status === "passed") {
    throw new BusinessRuleError(
      "You have already passed the English test — there is nothing more to sit.",
    );
  }
  if (eligibility.status === "retake_locked") {
    throw new BusinessRuleError(
      "Your next attempt needs to be paid for first. Book a retake from your dashboard.",
    );
  }
}

/**
 * The 7-step vetting funnel on the dashboard. Only the first three stages
 * are real today; interviews and profile review are Phase-2 specialist work
 * and stay "upcoming" until they exist.
 */
function journeyFor(candidate: Candidate, latest: TestAttempt | null): JourneyStep[] {
  const verified = Boolean(candidate.emailVerifiedAt);
  const passed = latest?.passed === true;

  return [
    { key: "account", label: "Account created", status: "done" },
    {
      key: "verification",
      label: "Email verified",
      status: verified ? "done" : "current",
    },
    {
      key: "english-test",
      label: "English test",
      status: passed ? "done" : verified ? "current" : "upcoming",
    },
    {
      key: "interview-1",
      label: "First interview",
      status: passed ? "current" : "upcoming",
    },
    { key: "role-interview", label: "Role-specific interview", status: "upcoming" },
    { key: "profile-build", label: "Profile + intro", status: "upcoming" },
    { key: "live", label: "You're live", status: "upcoming" },
  ];
}
