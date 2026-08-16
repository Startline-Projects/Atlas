import type {
  CandidateProfile,
  ProfileStrength,
  ProfileStrengthItem,
} from "@/lib/domain/candidate-profile";

/**
 * Profile strength meter — PROJECT_SCOPE §2.2.
 *
 * A pure function of the profile so it can be unit-tested without a database
 * and so the same number is shown to the candidate and used later when clients
 * browse (a weak profile ranks lower). Weights sum to 100.
 */

interface Rule {
  key: string;
  label: string;
  points: number;
  done: (p: CandidateProfile) => boolean;
}

const RULES: readonly Rule[] = [
  { key: "photo", label: "Add a profile photo", points: 10, done: (p) => Boolean(p.photoUrl) },
  { key: "headline", label: "Write a headline", points: 10, done: (p) => Boolean(p.headline) },
  { key: "bio", label: "Write a short bio (80+ characters)", points: 10, done: (p) => (p.bio?.trim().length ?? 0) >= 80 },
  { key: "location", label: "Set your country", points: 5, done: (p) => Boolean(p.countryCode) },
  { key: "rate", label: "Set your hourly rate", points: 10, done: (p) => p.hourlyRateCents !== null },
  { key: "hours", label: "Set your hours per week", points: 5, done: (p) => p.hoursPerWeek !== null },
  { key: "availability", label: "Set your availability", points: 5, done: (p) => p.availability !== null },
  { key: "languages", label: "Add at least one language", points: 5, done: (p) => p.languages.length >= 1 },
  { key: "skills", label: "Add at least 3 skills", points: 15, done: (p) => p.skills.length >= 3 },
  { key: "experience", label: "Add a past role", points: 15, done: (p) => p.experiences.length >= 1 },
  { key: "education", label: "Add education or a certification", points: 5, done: (p) => p.education.length + p.certifications.length >= 1 },
  { key: "portfolio", label: "Add a portfolio item", points: 5, done: (p) => p.portfolio.length >= 1 },
];

export function computeProfileStrength(profile: CandidateProfile): ProfileStrength {
  const items: ProfileStrengthItem[] = RULES.map((r) => ({
    key: r.key,
    label: r.label,
    points: r.points,
    done: r.done(profile),
  }));

  const score = items.reduce((sum, i) => sum + (i.done ? i.points : 0), 0);

  return { score, items };
}
