/**
 * Specialist roster — type defs + 1 stub record (Session 1 / Step 1).
 *
 * Per Session 1 lock (Path C, Q1): types + ONE stub Specialist only.
 * The full 11-specialist canonical roster lands in Step 4 (My Team)
 * when we have HTML row structures to derive the complete field
 * set from. Locking the type shape AND the ID-prefix convention
 * here in Step 1 prevents drift across Steps 4-13.
 *
 * ## Cross-session ID prefix
 *
 * `spec-{first-name-kebab}` — e.g. `spec-lucas-andersen`,
 * `spec-aisha-bello`. Locked at Step 1.
 *
 * ## Stub choice
 *
 * Lucas Andersen — referenced by the prototype's notifications +
 * messages dropdowns (see `reference/manager.html` lines 18568,
 * 18746, 18688). Locking him in here ensures Steps 12-13 have a
 * canonical record to bind when notification/message panels mode-fork.
 *
 * ## Avatar gradient mapping (mt-avatar system)
 *
 * The prototype's 10-gradient mt-avatar system (av-1..av-10 + av-you
 * reserved for self) is referenced as `avatarGradient` indices here.
 * The actual gradient stop colors live in a future avatar primitive
 * file built in Step 4. Step 1 just locks the index range.
 */

export type SpecialistRole =
  | "Virtual Assistants"
  | "Customer Support"
  | "Sales Development"
  | "Operations"
  | "Bookkeeping"
  | "Content & Writing"
  | "Marketing"
  | "Design"
  | "Engineering"
  | "Data & Analytics";

export type SpecialistStatus =
  | "active"
  | "vacation"
  | "at-capacity"
  | "performance-flag"
  | "out-of-office";

export type SpecialistCohort = "senior" | "mid" | "junior" | "on-trial";

export type Specialist = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  initials: string;
  /** Role category the Specialist owns (parallels the Specialist
   *  surface's category labels). */
  role: SpecialistRole;
  status: SpecialistStatus;
  cohort: SpecialistCohort;
  /** ISO 3166-1 alpha-2 country code (e.g. "DK", "BR") — drives the
   *  prototype's inline country-flag emoji helper. */
  countryCode: string;
  countryName: string;
  /** mt-avatar gradient bucket (1-10). av-you is reserved for self
   *  (the logged-in Manager — see `currentManager` in
   *  `manager-identity.ts`). */
  avatarGradient: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

export const specialists: ReadonlyArray<Specialist> = [
  {
    id: "spec-lucas-andersen",
    fullName: "Lucas Andersen",
    firstName: "Lucas",
    lastName: "Andersen",
    initials: "LA",
    role: "Operations",
    status: "performance-flag",
    cohort: "mid",
    countryCode: "DK",
    countryName: "Denmark",
    avatarGradient: 1,
  },
];

/** Resolve a canonical `spec-*` id to its Specialist record.
 *  Mirrors `getManagedClient` in `lib/mock-data/specialist/my-clients.ts`. */
export function getSpecialist(id: string): Specialist | undefined {
  return specialists.find((s) => s.id === id);
}

/** Static list of all valid Specialist ids — will drive
 *  `generateStaticParams()` on `/specialist/team/[id]` when that
 *  route lands in Step 5. */
export const ALL_SPECIALIST_IDS: ReadonlyArray<string> = specialists.map(
  (s) => s.id,
);
