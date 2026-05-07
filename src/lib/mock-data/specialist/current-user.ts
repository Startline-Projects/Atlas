/**
 * The currently signed-in Talent Specialist. Hardcoded for Session 1.
 *
 * Future sessions: replace this module with a `useSession()` hook backed
 * by the auth integration once Clerk / Auth.js is wired up. The shape
 * below mirrors what the API session payload will look like, so callers
 * won't need to change.
 */

export type PoolStatus = "Strong" | "Stable" | "Depleted";

export type SpecialistUser = {
  /** First name only — used in greetings ("Welcome back, Miguel."). */
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  /** Role surface — see docs/PROJECT_SCOPE.md §6. */
  role: "specialist";
  /**
   * The role category this specialist owns (per spec PDF §"Assigned role
   * category & privacy"). The interface defaults to category-scoped views.
   */
  category: string;
  /** Linear-gradient colors used by the avatar circle in the sidebar. */
  avatarGradient: { from: string; to: string };
  /** Two-letter initials shown inside the avatar circle. */
  initials: string;
  /**
   * True when the specialist is currently in a video session. Surfaced as
   * a "live now" pill in the sidebar profile + dashboard rail. Spec §"Right
   * side widgets".
   */
  onCall: boolean;
  /** Pool status for this specialist's category — drives the sidebar footer. */
  poolStatus: PoolStatus;
  /** Live candidate count in this specialist's pool. */
  poolLiveCount: number;

  /* ============================================================
     Session 6 additions — performance + settings dependencies
     ============================================================ */

  /** Months at Atlas — header subtitle on /specialist/performance. */
  tenureMonths: number;
  /** "Mexico City, Mexico" — settings profile + perf header. */
  cityCountry: string;
  /**
   * Public display name shown in chat threads to talents/clients.
   * Conventionally first-name + last-initial. Settings § "Profile".
   */
  displayName: string;
  /** Bio shown on the talent-facing profile (markdown supported). */
  bio: string;
  /** IANA-style label rendered in settings ("Mexico City · GMT-6"). */
  timeZone: string;
};

export const currentUser: SpecialistUser = {
  firstName: "Miguel",
  lastName: "Aguilar",
  fullName: "Miguel Aguilar",
  email: "miguel@atlasworld.co",
  role: "specialist",
  category: "Virtual Assistants",
  avatarGradient: { from: "#FFD6A5", to: "#FFA07A" },
  initials: "MA",
  onCall: false,
  poolStatus: "Stable",
  poolLiveCount: 18,

  tenureMonths: 14,
  cityCountry: "Mexico City, Mexico",
  displayName: "Miguel",
  bio:
    "Talent specialist for the VAs category. 14 months at Atlas. I prioritize bilingual ops candidates and specialize in healthcare-ops + EST/PST overlap matches. Reach out if a brief is sitting more than 48h.",
  timeZone: "Mexico City · GMT−6",
};
