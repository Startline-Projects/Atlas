/**
 * Client domain — ARCHITECTURE §6 step 1.
 *
 * A client is a business that hires through Atlas (PROJECT_SCOPE §1, §2.3):
 * it posts jobs, receives proposals and pays. Like the candidate, a client is
 * a `User` row joined to its own profile, with a Supabase auth user behind it.
 *
 * Pure types and constants — importable from the validator, the repository,
 * the service and the UI alike.
 */

import type { AccountStatus, RoleCategory } from "./candidate";

/* -------------------------------------------------------------------------- */
/* Team size                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Stored value → label. The signup form renders this list; the Prisma
 * `TeamSize` enum is the only other place that has to follow.
 */
export const TEAM_SIZES = [
  { value: "SOLO", label: "Just me" },
  { value: "SMALL", label: "2–10 people" },
  { value: "MEDIUM", label: "11–50 people" },
  { value: "LARGE", label: "51–200 people" },
  { value: "ENTERPRISE", label: "200+ people" },
] as const;

export type TeamSize = (typeof TEAM_SIZES)[number]["value"];

export const TEAM_SIZE_VALUES = TEAM_SIZES.map((t) => t.value) as
  readonly TeamSize[];

export function teamSizeLabel(value: TeamSize | null): string | null {
  if (!value) return null;
  return TEAM_SIZES.find((t) => t.value === value)?.label ?? value;
}

/* -------------------------------------------------------------------------- */
/* Entities                                                                   */
/* -------------------------------------------------------------------------- */

/** A client as the rest of the app sees them — `User` joined to its profile. */
export interface Client {
  id: string;
  email: string;
  /** Supabase auth user id. Internal — never exposed through the DTO. */
  authProviderId: string | null;
  /** The person operating the account. */
  contactName: string;
  companyName: string;
  country: string | null;
  countryCode: string | null;
  teamSize: TeamSize | null;
  /** Categories the client said they hire in. Informational for now. */
  hiringCategories: RoleCategory[];
  status: AccountStatus;
  emailVerifiedAt: Date | null;
  lastActiveAt: Date | null;
  createdAt: Date;
}

export interface CreateClientInput {
  email: string;
  password: string;
  contactName: string;
  companyName: string;
  countryCode: string;
  teamSize: TeamSize;
}

/** What `clientService.signup()` hands back — never the password. */
export interface ClientSignupResult {
  client: Client;
  /** False when the auth provider already treats the address as confirmed. */
  requiresEmailVerification: boolean;
}

export interface ClientLoginResult {
  client: Client;
  accessToken: string;
  /** Seconds until `accessToken` expires — the session cookie lives as long. */
  expiresIn: number;
  /** Long-lived, single-use; kept in its own HttpOnly cookie, never in a body. */
  refreshToken: string;
}
