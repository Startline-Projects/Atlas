import type { Prisma, TestAttempt as TestAttemptRow, Payment as PaymentRow } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type {
  CefrLevel,
  SubScore,
  TestAttempt,
  TestAttemptKind,
} from "@/lib/domain/english-test";

/**
 * English-test repository — ARCHITECTURE §6 step 4.
 *
 * Attempts hang off the candidate *profile*, but every caller thinks in
 * `userId` (that is what the session carries), so the queries join through
 * `profile.userId` and no caller ever needs a profile id.
 */

type AttemptRow = TestAttemptRow & { payment: PaymentRow | null };

const withPayment = { payment: true } as const;

function toAttempt(row: AttemptRow): TestAttempt {
  return {
    id: row.id,
    number: row.number,
    kind: row.kind as TestAttemptKind,
    score: row.score,
    cefr: row.cefr as CefrLevel,
    passed: row.passed,
    // Written by `createAttempt` from a typed value; read back as-is.
    subScores: row.subScores as unknown as SubScore[],
    takenAt: row.takenAt,
    feePaidCents: row.payment?.amountCents ?? null,
  };
}

export interface CreateAttemptRecord {
  userId: string;
  number: number;
  kind: TestAttemptKind;
  score: number;
  cefr: CefrLevel;
  passed: boolean;
  subScores: SubScore[];
  answers: ReadonlyArray<number | null>;
  /** Required for PAID attempts — the payment being consumed. */
  paymentId: string | null;
}

export const englishTestRepository = {
  /** Oldest first — attempt #1, #2, … */
  async listAttempts(userId: string): Promise<TestAttempt[]> {
    const rows = await getPrisma().testAttempt.findMany({
      where: { profile: { userId } },
      include: withPayment,
      orderBy: { number: "asc" },
    });
    return rows.map(toAttempt);
  },

  /** Scoped to the user: another candidate's attempt id resolves to null. */
  async findAttempt(userId: string, attemptId: string): Promise<TestAttempt | null> {
    const row = await getPrisma().testAttempt.findFirst({
      where: { id: attemptId, profile: { userId } },
      include: withPayment,
    });
    return row ? toAttempt(row) : null;
  },

  /**
   * Throws `P2002` if `number` is already taken for this candidate (two
   * submissions raced) or if `paymentId` already unlocked an attempt — the
   * service turns both into a `ConflictError`.
   */
  async createAttempt(input: CreateAttemptRecord): Promise<TestAttempt> {
    const row = await getPrisma().testAttempt.create({
      data: {
        profile: { connect: { userId: input.userId } },
        number: input.number,
        kind: input.kind,
        score: input.score,
        cefr: input.cefr,
        passed: input.passed,
        subScores: input.subScores as unknown as Prisma.InputJsonValue,
        answers: [...input.answers] as Prisma.InputJsonValue,
        ...(input.paymentId ? { payment: { connect: { id: input.paymentId } } } : {}),
      },
      include: withPayment,
    });
    return toAttempt(row);
  },
};
