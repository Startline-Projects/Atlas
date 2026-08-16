import type {
  PublicTestQuestion,
  SubScore,
  TestSection,
} from "@/lib/domain/english-test";
import { cefrForScore, TEST_SECTIONS } from "@/lib/domain/english-test";

/**
 * The 10-question prototype short form of the English assessment, WITH the
 * answer key. Server-only: this file sits in the service layer precisely so
 * the UI cannot import it — the runner receives `PublicTestQuestion`s over
 * the API and the answers are scored here.
 *
 * The real 25-minute proctored test (PROJECT_SCOPE §3.1) replaces this bank;
 * the scoring contract (`scoreAnswers`) is what the rest of the slice depends
 * on, not the questions.
 */

interface BankQuestion extends PublicTestQuestion {
  correctIndex: number;
}

const PASSAGE_REMOTE =
  "Remote-first companies often report higher written-communication standards than co-located teams. When hallway conversations disappear, documentation stops being a courtesy and becomes the primary interface between colleagues. Teams that fail to make this shift tend to re-create office ambiguity in chat threads — only slower.";

const QUESTIONS: ReadonlyArray<BankQuestion> = [
  {
    id: "q-01",
    section: "Grammar",
    prompt:
      "By the time the client joined the call, the team ____ the proposal twice.",
    options: ["has reviewed", "had reviewed", "was reviewing", "reviewed"],
    correctIndex: 1,
  },
  {
    id: "q-02",
    section: "Grammar",
    prompt: "Had the invoice been sent on Friday, the payment ____ by now.",
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
    prompt: "Not until the contract was signed ____ the project timeline.",
    options: ["we confirmed", "we did confirm", "did we confirm", "confirmed we"],
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
    passage: PASSAGE_REMOTE,
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
    passage: PASSAGE_REMOTE,
    prompt: "According to the passage, what happens to teams that do not adapt?",
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

export const QUESTION_COUNT = QUESTIONS.length;

/** The bank without its answer key — what goes over the wire. */
export function publicQuestions(): PublicTestQuestion[] {
  return QUESTIONS.map(({ id, section, prompt, passage, options }) => ({
    id,
    section,
    prompt,
    passage,
    options: [...options],
  }));
}

export interface Scored {
  /** 0–100, rounded. */
  score: number;
  /** One entry per section that has at least one question, in TEST_SECTIONS order. */
  subScores: SubScore[];
}

/**
 * Scores a full answer sheet: `answers[i]` is the chosen option index for
 * question `i`, or null when skipped. Sub-scores are real per-section
 * percentages — nothing is derived or invented for sections not assessed.
 */
export function scoreAnswers(answers: ReadonlyArray<number | null>): Scored {
  const perSection = new Map<TestSection, { correct: number; total: number }>();
  for (const section of TEST_SECTIONS) {
    perSection.set(section, { correct: 0, total: 0 });
  }

  let correct = 0;
  QUESTIONS.forEach((q, i) => {
    const bucket = perSection.get(q.section);
    if (!bucket) return;
    bucket.total += 1;
    if (answers[i] === q.correctIndex) {
      bucket.correct += 1;
      correct += 1;
    }
  });

  const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 100));

  const subScores: SubScore[] = TEST_SECTIONS.flatMap((section) => {
    const b = perSection.get(section);
    if (!b || b.total === 0) return [];
    const s = pct(b.correct, b.total);
    return [{ skill: section, score: s, cefr: cefrForScore(s) }];
  });

  return { score: pct(correct, QUESTIONS.length), subScores };
}
