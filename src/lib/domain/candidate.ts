/**
 * Candidate domain — ARCHITECTURE §6 step 1.
 *
 * Pure types and constants. No Prisma, no Zod, no React: this module is the
 * shared vocabulary that the validator, the repository, the service and the UI
 * all speak, so it must be importable from any of them.
 */

/* -------------------------------------------------------------------------- */
/* Role category                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Stored value → label shown to the candidate. The signup form renders this
 * list, so a new category is added here once and appears everywhere; the Prisma
 * `RoleCategory` enum is the only other place that has to follow.
 */
export const ROLE_CATEGORIES = [
  { value: "ENGINEERING", label: "Engineering" },
  { value: "DESIGN", label: "Design" },
  { value: "MARKETING", label: "Marketing" },
  { value: "OPERATIONS", label: "Operations" },
  { value: "CONTENT", label: "Content" },
  { value: "FINANCE", label: "Finance" },
] as const;

export type RoleCategory = (typeof ROLE_CATEGORIES)[number]["value"];

export const ROLE_CATEGORY_VALUES = ROLE_CATEGORIES.map((c) => c.value) as
  readonly RoleCategory[];

export function roleCategoryLabel(value: RoleCategory): string {
  return ROLE_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

/* -------------------------------------------------------------------------- */
/* Account status                                                             */
/* -------------------------------------------------------------------------- */

export type AccountStatus =
  | "PENDING_VERIFICATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "DEACTIVATED";

/* -------------------------------------------------------------------------- */
/* Entities                                                                   */
/* -------------------------------------------------------------------------- */

/** A candidate as the rest of the app sees them — `User` joined to its profile. */
export interface Candidate {
  id: string;
  email: string;
  /** Supabase auth user id. Internal — never exposed through the DTO. */
  authProviderId: string | null;
  fullName: string;
  roleCategory: RoleCategory;
  status: AccountStatus;
  emailVerifiedAt: Date | null;
  country: string | null;
  countryCode: string | null;
  headline: string | null;
  lastActiveAt: Date | null;
  createdAt: Date;
}

export interface CreateCandidateInput {
  email: string;
  password: string;
  fullName: string;
  roleCategory: RoleCategory;
}

/** What `candidateService.signup()` hands back — never the password. */
export interface SignupResult {
  candidate: Candidate;
  /** False when the auth provider already treats the address as confirmed. */
  requiresEmailVerification: boolean;
}

export interface ListCandidatesOptions {
  /** Page size. Capped by the repository so a caller cannot ask for the world. */
  limit?: number;
  offset?: number;
}

export interface CandidateList {
  candidates: Candidate[];
  total: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  candidate: Candidate;
  accessToken: string;
  /** Seconds until `accessToken` expires — the session cookie lives as long. */
  expiresIn: number;
  /**
   * Long-lived, single-use (rotated on each refresh). Kept in its own
   * HttpOnly cookie; `src/proxy.ts` trades it for a new access token when
   * the old one runs out. Never returned in a response body.
   */
  refreshToken: string;
  requiresEmailVerification: boolean;
}
