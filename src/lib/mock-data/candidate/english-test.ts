/**
 * English-test slice — config, CEFR scale, question bank, and attempt
 * history for the candidate surface.
 *
 * Product policy (locked 2026-07-17, cooldown removed same day):
 *   - Everyone who takes the test keeps their account — pass OR fail —
 *     and sees their full result + sub-scores.
 *   - First attempt is free. Every retake costs $10.
 *   - No waiting period: a retake unlocks immediately after payment.
 *   - C1 or higher continues to interviews.
 *
 * Prototype notes: the interactive runner uses a 10-question short form
 * of the real 25-minute proctored test. Dates/countdowns are precomputed
 * label strings (no Date.now in render) per prototype convention.
 */

/* ============================================================
   Config
   ============================================================ */

export const ENGLISH_TEST = {
  /** Real assessment length shown on intro + marketing surfaces. */
  durationMinutes: 25,
  /** CEFR level required to continue to interviews. */
  passingLevel: "C1" as const,
  /** First attempt is free; every retake is a flat fee. */
  retakeFeeUsd: 10,
  retakeFeeCents: 1000,
  retakeFeeLabel: "$10.00",
} as const;

/* ============================================================
   CEFR scale
   ============================================================ */

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
  const band = CEFR_BANDS.find((b) => score >= b.min);
  return band ? band.level : "A1";
}

export function isPassingLevel(level: CefrLevel): boolean {
  return level === "C1" || level === "C2";
}

/* ============================================================
   Attempts
   ============================================================ */

export type SubScore = {
  skill: "Grammar" | "Vocabulary" | "Reading" | "Listening";
  score: number;
  cefr: CefrLevel;
};

export type TestAttempt = {
  id: string;
  /** 1-based attempt number ("Attempt #2"). */
  number: number;
  /** Precomputed label — "Jul 16, 2026 · 4:10 PM". */
  takenAtLabel: string;
  score: number;
  cefr: CefrLevel;
  passed: boolean;
  subScores: SubScore[];
  /** First attempt is free; retakes are paid. */
  kind: "free" | "paid";
  /** "$10.00" when kind === "paid". */
  feePaidLabel?: string;
};

/**
 * Default mock story: Lina took her free first attempt yesterday and
 * scored B2 (72) — two points under the C1 band. Her account stays
 * active, the result is on her dashboard, and she can book the $10
 * retake at any moment.
 */
export const testAttempts: ReadonlyArray<TestAttempt> = [
  {
    id: "att-001",
    number: 1,
    takenAtLabel: "Jul 16, 2026 · 4:10 PM",
    score: 72,
    cefr: "B2",
    passed: false,
    subScores: [
      { skill: "Grammar", score: 76, cefr: "C1" },
      { skill: "Vocabulary", score: 74, cefr: "B2" },
      { skill: "Reading", score: 70, cefr: "B2" },
      { skill: "Listening", score: 68, cefr: "B2" },
    ],
    kind: "free",
  },
];

export const latestAttempt: TestAttempt | undefined =
  testAttempts[testAttempts.length - 1];

/**
 * Alternate story used by the dashboard `?state=passed` preview: the
 * $10 retake that cleared the bar. Kept separate from `testAttempts`
 * so the default (failed first attempt) story stays untouched.
 */
export const passedRetakeAttempt: TestAttempt = {
  id: "att-002",
  number: 2,
  takenAtLabel: "Jul 17, 2026 · 5:05 PM",
  score: 84,
  cefr: "C1",
  passed: true,
  subScores: [
    { skill: "Grammar", score: 88, cefr: "C1" },
    { skill: "Vocabulary", score: 86, cefr: "C1" },
    { skill: "Reading", score: 82, cefr: "C1" },
    { skill: "Listening", score: 80, cefr: "C1" },
  ],
  kind: "paid",
  feePaidLabel: "$10.00",
};

/**
 * Derive display sub-scores from an interactive run's overall score.
 * Deterministic offsets (no randomness) so the result page is stable.
 */
export function subScoresForScore(score: number): SubScore[] {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const offsets: ReadonlyArray<[SubScore["skill"], number]> = [
    ["Grammar", 4],
    ["Vocabulary", 2],
    ["Reading", -2],
    ["Listening", -4],
  ];
  return offsets.map(([skill, delta]) => {
    const s = clamp(score + delta);
    return { skill, score: s, cefr: cefrForScore(s) };
  });
}

/* ============================================================
   Question bank — 10-question prototype short form
   ============================================================ */

export type TestSection = "Grammar" | "Vocabulary" | "Reading";

export type TestQuestion = {
  id: string;
  section: TestSection;
  prompt: string;
  /** Optional passage rendered above the prompt (Reading section). */
  passage?: string;
  options: string[];
  correctIndex: number;
};

export const testQuestions: ReadonlyArray<TestQuestion> = [
  {
    id: "q-01",
    section: "Grammar",
    prompt:
      "By the time the client joined the call, the team ____ the proposal twice.",
    options: [
      "has reviewed",
      "had reviewed",
      "was reviewing",
      "reviewed",
    ],
    correctIndex: 1,
  },
  {
    id: "q-02",
    section: "Grammar",
    prompt:
      "Had the invoice been sent on Friday, the payment ____ by now.",
    options: [
      "would have cleared",
      "will have cleared",
      "would clear",
      "has cleared",
    ],
    correctIndex: 0,
  },
  {
    id: "q-03",
    section: "Grammar",
    prompt:
      "The report, ____ findings surprised the board, was written overnight.",
    options: ["that", "which", "whose", "what"],
    correctIndex: 2,
  },
  {
    id: "q-04",
    section: "Grammar",
    prompt:
      "Not until the contract was signed ____ the project timeline.",
    options: [
      "we confirmed",
      "we did confirm",
      "did we confirm",
      "confirmed we",
    ],
    correctIndex: 2,
  },
  {
    id: "q-05",
    section: "Vocabulary",
    prompt:
      "The two proposals are broadly similar; the differences are largely ____.",
    options: ["negligible", "prosperous", "abundant", "meticulous"],
    correctIndex: 0,
  },
  {
    id: "q-06",
    section: "Vocabulary",
    prompt:
      "After weeks of negotiation, the parties finally reached a ____ agreement.",
    options: ["reciprocal", "tentative", "redundant", "spontaneous"],
    correctIndex: 1,
  },
  {
    id: "q-07",
    section: "Vocabulary",
    prompt:
      "Her email was polite but firm — she ____ declined the extended deadline.",
    options: ["allegedly", "scarcely", "courteously", "abruptly"],
    correctIndex: 2,
  },
  {
    id: "q-08",
    section: "Reading",
    passage:
      "Remote-first companies often report higher written-communication standards than co-located teams. When hallway conversations disappear, documentation stops being a courtesy and becomes the primary interface between colleagues. Teams that fail to make this shift tend to re-create office ambiguity in chat threads — only slower.",
    prompt: "What does the passage suggest about documentation?",
    options: [
      "It is less important in remote-first companies.",
      "It replaces informal conversation as the main way colleagues interact.",
      "It slows teams down compared with chat threads.",
      "It is a courtesy that remote teams can skip.",
    ],
    correctIndex: 1,
  },
  {
    id: "q-09",
    section: "Reading",
    passage:
      "Remote-first companies often report higher written-communication standards than co-located teams. When hallway conversations disappear, documentation stops being a courtesy and becomes the primary interface between colleagues. Teams that fail to make this shift tend to re-create office ambiguity in chat threads — only slower.",
    prompt:
      "According to the passage, what happens to teams that do not adapt?",
    options: [
      "They abandon chat tools entirely.",
      "They communicate faster but less accurately.",
      "They reproduce the same ambiguity, at a slower pace.",
      "They hire more documentation specialists.",
    ],
    correctIndex: 2,
  },
  {
    id: "q-10",
    section: "Reading",
    prompt:
      "\"The vendor's quote was anything but reasonable.\" The writer thinks the quote was:",
    options: ["fair", "unreasonable", "almost reasonable", "negotiable"],
    correctIndex: 1,
  },
];

/** Percentage score (0–100) for a set of runner answers. */
export function scoreForAnswers(answers: ReadonlyArray<number | null>): number {
  const correct = testQuestions.reduce(
    (n, q, i) => (answers[i] === q.correctIndex ? n + 1 : n),
    0,
  );
  return Math.round((correct / testQuestions.length) * 100);
}
