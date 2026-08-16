import type {
  AccountStatus,
  Candidate,
  RoleCategory,
} from "@/lib/domain/candidate";

/**
 * The over-the-wire shape of a candidate.
 *
 * A DTO rather than the domain object because JSON has no `Date`: the boundary
 * converts once, here, instead of every consumer guessing whether it holds a
 * string or a `Date`.
 */
export interface CandidateDto {
  id: string;
  email: string;
  fullName: string;
  roleCategory: RoleCategory;
  status: AccountStatus;
  emailVerifiedAt: string | null;
  country: string | null;
  countryCode: string | null;
  headline: string | null;
  lastActiveAt: string | null;
  createdAt: string;
}

export function toCandidateDto(candidate: Candidate): CandidateDto {
  return {
    id: candidate.id,
    email: candidate.email,
    fullName: candidate.fullName,
    roleCategory: candidate.roleCategory,
    status: candidate.status,
    emailVerifiedAt: candidate.emailVerifiedAt?.toISOString() ?? null,
    country: candidate.country,
    countryCode: candidate.countryCode,
    headline: candidate.headline,
    lastActiveAt: candidate.lastActiveAt?.toISOString() ?? null,
    createdAt: candidate.createdAt.toISOString(),
  };
}
