import type {
  EnglishTestEligibility,
  EnglishTestOverview,
  JourneyStep,
  Payment,
  PaymentPurpose,
  PaymentStatus,
  PublicTestQuestion,
  SubScore,
  TestAttempt,
  TestAttemptKind,
} from "@/lib/domain/english-test";

/** Over-the-wire attempt. `takenAt` is ISO — JSON has no `Date`. */
export interface TestAttemptDto {
  id: string;
  number: number;
  kind: TestAttemptKind;
  score: number;
  cefr: TestAttempt["cefr"];
  passed: boolean;
  subScores: SubScore[];
  takenAt: string;
  feePaidCents: number | null;
}

export function toTestAttemptDto(attempt: TestAttempt): TestAttemptDto {
  return {
    id: attempt.id,
    number: attempt.number,
    kind: attempt.kind,
    score: attempt.score,
    cefr: attempt.cefr,
    passed: attempt.passed,
    subScores: attempt.subScores,
    takenAt: attempt.takenAt.toISOString(),
    feePaidCents: attempt.feePaidCents,
  };
}

export interface EnglishTestOverviewDto {
  attempts: TestAttemptDto[];
  latest: TestAttemptDto | null;
  eligibility: EnglishTestEligibility;
  journey: JourneyStep[];
}

export function toEnglishTestOverviewDto(
  overview: EnglishTestOverview,
): EnglishTestOverviewDto {
  return {
    attempts: overview.attempts.map(toTestAttemptDto),
    latest: overview.latest ? toTestAttemptDto(overview.latest) : null,
    eligibility: overview.eligibility,
    journey: overview.journey,
  };
}

export type PublicTestQuestionDto = PublicTestQuestion;

export interface PaymentDto {
  id: string;
  purpose: PaymentPurpose;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  paidAt: string | null;
}

export function toPaymentDto(payment: Payment): PaymentDto {
  return {
    id: payment.id,
    purpose: payment.purpose,
    amountCents: payment.amountCents,
    currency: payment.currency,
    status: payment.status,
    paidAt: payment.paidAt?.toISOString() ?? null,
  };
}
