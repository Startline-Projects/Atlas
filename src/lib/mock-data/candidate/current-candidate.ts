/**
 * The currently signed-in Candidate. Hardcoded for the candidate-surface
 * prototype (English-test slice).
 *
 * Future sessions: replace this module with a `useSession()` hook backed
 * by the auth integration once Clerk / Auth.js is wired up. The shape
 * below mirrors what the API session payload will look like, so callers
 * won't need to change. Mirrors `mock-data/specialist/current-user.ts`.
 */

export type CandidateJourneyStage =
  | "account"
  | "verification"
  | "english-test"
  | "interview-1"
  | "role-interview"
  | "profile-build"
  | "live";

export type CandidateUser = {
  /** First name only — used in greetings ("Welcome back, Lina."). */
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  /** Role surface — see docs/PROJECT_SCOPE.md §6. */
  role: "candidate";
  /** The role they applied for + its category (apply-page taxonomy). */
  appliedRole: string;
  category: string;
  /** "Casablanca, Morocco" — shown in the topbar chip + dashboard header. */
  cityCountry: string;
  /** Linear-gradient colors used by the avatar circle in the topbar. */
  avatarGradient: { from: string; to: string };
  /** Two-letter initials shown inside the avatar circle. */
  initials: string;
  /** "Jul 2026" — account-created label on the dashboard. */
  memberSince: string;
  /** Where the candidate currently sits in the 7-step vetting funnel. */
  journeyStage: CandidateJourneyStage;
};

export const currentCandidate: CandidateUser = {
  firstName: "Lina",
  lastName: "Haddad",
  fullName: "Lina Haddad",
  email: "lina.haddad@gmail.com",
  role: "candidate",
  appliedRole: "Executive assistant",
  category: "Operations",
  cityCountry: "Casablanca, Morocco",
  avatarGradient: { from: "#a4b5d8", to: "#4d6699" },
  initials: "LH",
  memberSince: "Jul 2026",
  journeyStage: "english-test",
};

/**
 * The 7 funnel steps rendered by the dashboard journey strip. Statuses
 * are relative to the default mock story (account + verification done,
 * English test in progress).
 */
export type JourneyStep = {
  key: CandidateJourneyStage;
  label: string;
  status: "done" | "current" | "upcoming";
};

export const journeySteps: ReadonlyArray<JourneyStep> = [
  { key: "account", label: "Account created", status: "done" },
  { key: "verification", label: "WhatsApp + ID verified", status: "done" },
  { key: "english-test", label: "English test", status: "current" },
  { key: "interview-1", label: "First interview", status: "upcoming" },
  { key: "role-interview", label: "Role-specific interview", status: "upcoming" },
  { key: "profile-build", label: "Profile + intro", status: "upcoming" },
  { key: "live", label: "You're live", status: "upcoming" },
];
