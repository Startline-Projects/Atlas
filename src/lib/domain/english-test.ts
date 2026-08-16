/**
 * English-test domain — ARCHITECTURE §6 step 1.
 *
 * Product policy (locked 2026-07-17, cooldown removed the same day):
 *   - Everyone who takes the test keeps their account — pass OR fail — and
 *     sees their full result + sub-scores.
 *   - First attempt is free. Every retake costs $10.
 *   - No waiting period: a retake unlocks the moment payment clears.
 *   - C1 or higher continues to interviews.
 *
 * Pure types and constants. The question bank (with answers) is NOT here — it
 * lives in `services/english-test/question-bank.ts` where the UI cannot import
 * it (the layer rule is enforced by ESLint).
 */

/* -------------------------------------------------------------------------- */
/* Config                                                                     */
/* -------------------------------------------------------------------------- */

export const ENGLISH_TEST = {
  /** Real assessment length shown on intro + marketing surfaces. */
  durationMinutes: 25,
  /** CEFR level required to continue to interviews. */
  passingLevel: "C1" as const,
  /** First attempt is free; every retake is a flat fee. Integer cents (§7.12). */
  retakeFeeCents: 1000,
  retakeFeeCurrency: "usd",
  retakeFeeLabel: "$10.00",
} as const;

/* -------------------------------------------------------------------------- */
/* CEFR scale                                                                 */
/* -------------------------------------------------------------------------- */

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** Score bands (0–100) → CEFR. Lower bound inclusive. */
const CEFR_BANDS: ReadonlyArray<{ min: number; level: CefrLevel }> = [
  { min: 90, level: "C2" },
  { min: 75, level: "C1" },
  { min: 60, level: "B2" },
  { min: 45, level: "B1" },
  { min: 30, level: "A2" },
  { min: 0, level: "A1" },
];

export function cefrForScore(score: number): CefrLevel {
  return CEFR_BANDS.find((b) => score >= b.min)?.level ?? "A1";
}

export function isPassingLevel(level: CefrLevel): boolean {
  return level === "C1" || level === "C2";
}

/* -------------------------------------------------------------------------- */
/* Questions (public shape — no answers)                                       */
/* -------------------------------------------------------------------------- */

/** The sections the short-form test assesses. Sub-scores are per section. */
export const TEST_SECTIONS = ["Grammar", "Vocabulary", "Reading"] as const;
export type TestSection = (typeof TEST_SECTIONS)[number];

/** What the runner receives: everything except which option is right. */
export interface PublicTestQuestion {
  id: string;
  section: TestSection;
  prompt: string;
  /** Optional passage rendered above the prompt (Reading section). */
  passage?: string | undefined;
  options: string[];
}

/* -------------------------------------------------------------------------- */
/* Attempts                                                                   */
/* -------------------------------------------------------------------------- */

export type TestAttemptKind = "FREE" | "PAID";

export interface SubScore {
  skill: TestSection;
  score: number;
  cefr: CefrLevel;
}

export interface TestAttempt {
  id: string;
  /** 1-based attempt number ("Attempt #2"). */
  number: number;
  kind: TestAttemptKind;
  score: number;
  cefr: CefrLevel;
  passed: boolean;
  subScores: SubScore[];
  takenAt: Date;
  /** Cents charged for this attempt — null for the free first attempt. */
  feePaidCents: number | null;
}

/**
 * Whether — and on what terms — the candidate may sit the test right now.
 * Computed by the service; the UI only renders it (ARCHITECTURE §5.1: no
 * business rules in components).
 */
export type EnglishTestEligibility =
  /** No attempt yet — the free first attempt is available. */
  | { status: "free_available"; nextAttemptNumber: 1 }
  /** Latest attempt cleared the bar — nothing more to sit. */
  | { status: "passed"; nextAttemptNumber: null }
  /** Failed so far and a paid retake is waiting to be used. */
  | { status: "retake_unlocked"; nextAttemptNumber: number; paymentId: string }
  /** Failed so far; the next attempt needs a $10 payment first. */
  | { status: "retake_locked"; nextAttemptNumber: number };

export type JourneyStage =
  | "account"
  | "verification"
  | "english-test"
  | "interview-1"
  | "role-interview"
  | "profile-build"
  | "live";

export interface JourneyStep {
  key: JourneyStage;
  label: string;
  status: "done" | "current" | "upcoming";
}

/** Everything the candidate dashboard needs about the test, in one read. */
export interface EnglishTestOverview {
  attempts: TestAttempt[];
  latest: TestAttempt | null;
  eligibility: EnglishTestEligibility;
  journey: JourneyStep[];
}

/* -------------------------------------------------------------------------- */
/* Payments                                                                   */
/* -------------------------------------------------------------------------- */

export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
export type PaymentPurpose = "ENGLISH_TEST_RETAKE";

export interface Payment {
  id: string;
  userId: string;
  purpose: PaymentPurpose;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  providerCheckoutId: string | null;
  paidAt: Date | null;
  createdAt: Date;
}

/** Result of starting a retake checkout: where to send the browser. */
export interface RetakeCheckoutStart {
  paymentId: string;
  checkoutUrl: string;
}
