import { Prisma } from "@prisma/client";
import type { CandidateProfile, User } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type {
  AccountStatus,
  Candidate,
  CandidateList,
  ListCandidatesOptions,
  RoleCategory,
} from "@/lib/domain/candidate";

/**
 * Candidate repository — ARCHITECTURE §6 step 4.
 *
 * The only module that speaks Prisma for candidates. It returns domain objects,
 * never Prisma rows, so a schema rename never leaks past this file. Soft-deleted
 * users are excluded here rather than by each caller (§8).
 */

const NOT_DELETED = { deletedAt: null } as const;

/** Ceiling on how much a single query may return, whatever the caller asks. */
const MAX_PAGE_SIZE = 100;

type CandidateRow = User & { candidateProfile: CandidateProfile | null };

const withProfile = { candidateProfile: true } as const;

function toCandidate(row: CandidateRow): Candidate {
  // Every row this repository returns is filtered on `candidateProfile is not
  // null`, so the join is present — the guard is here to make that a loud
  // failure rather than a silent `undefined` in the UI if a query changes.
  if (!row.candidateProfile) {
    throw new Error(
      `User ${row.id} was read as a candidate but has no candidate profile.`,
    );
  }

  return {
    id: row.id,
    email: row.email,
    authProviderId: row.authProviderId,
    fullName: row.candidateProfile.fullName,
    roleCategory: row.candidateProfile.roleCategory as RoleCategory,
    status: row.status as AccountStatus,
    emailVerifiedAt: row.emailVerifiedAt,
    country: row.candidateProfile.country,
    countryCode: row.candidateProfile.countryCode,
    headline: row.candidateProfile.headline,
    lastActiveAt: row.lastActiveAt,
    createdAt: row.createdAt,
  };
}

export interface CreateCandidateRecord {
  email: string;
  authProviderId: string | null;
  fullName: string;
  roleCategory: RoleCategory;
  emailVerifiedAt: Date | null;
  status: AccountStatus;
}

export const candidateRepository = {
  /**
   * Creates the `User` and its `CandidateProfile` as one unit — a user row
   * without a profile would be invisible to every candidate query.
   *
   * Throws `Prisma.PrismaClientKnownRequestError` with code `P2002` when the
   * email is already taken; the service turns that into a `ConflictError`.
   */
  async create(input: CreateCandidateRecord): Promise<Candidate> {
    const row = await getPrisma().user.create({
      data: {
        email: input.email,
        role: "CANDIDATE",
        status: input.status,
        emailVerifiedAt: input.emailVerifiedAt,
        authProviderId: input.authProviderId,
        candidateProfile: {
          create: {
            fullName: input.fullName,
            roleCategory: input.roleCategory,
          },
        },
      },
      include: withProfile,
    });

    return toCandidate(row);
  },

  async findByEmail(email: string): Promise<Candidate | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...NOT_DELETED, email, candidateProfile: { isNot: null } },
      include: withProfile,
    });

    return row ? toCandidate(row) : null;
  },

  async findById(id: string): Promise<Candidate | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...NOT_DELETED, id, candidateProfile: { isNot: null } },
      include: withProfile,
    });

    return row ? toCandidate(row) : null;
  },

  /** Resolves the Supabase `auth.users.id` carried by a session token. */
  async findByAuthProviderId(authProviderId: string): Promise<Candidate | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...NOT_DELETED, authProviderId, candidateProfile: { isNot: null } },
      include: withProfile,
    });

    return row ? toCandidate(row) : null;
  },

  async touchLastActive(id: string): Promise<void> {
    await getPrisma().user.update({
      where: { id },
      data: { lastActiveAt: new Date() },
    });
  },

  /** Idempotent: verifying an already-verified account is not an error. */
  async markEmailVerified(id: string): Promise<Candidate> {
    const row = await getPrisma().user.update({
      where: { id },
      data: {
        emailVerifiedAt: new Date(),
        status: "ACTIVE",
        lastActiveAt: new Date(),
      },
      include: withProfile,
    });

    return toCandidate(row);
  },

  /** Links a database row to its Supabase `auth.users` id after the fact. */
  async attachAuthProviderId(
    id: string,
    authProviderId: string,
  ): Promise<void> {
    await getPrisma().user.update({
      where: { id },
      data: { authProviderId },
    });
  },

  /** Newest first — the admin table reads as a signup feed. */
  async list(options: ListCandidatesOptions = {}): Promise<CandidateList> {
    const take = Math.min(options.limit ?? 50, MAX_PAGE_SIZE);
    const skip = Math.max(options.offset ?? 0, 0);

    const where: Prisma.UserWhereInput = {
      ...NOT_DELETED,
      candidateProfile: { isNot: null },
    };

    const prisma = getPrisma();
    const [rows, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: withProfile,
        orderBy: { createdAt: "desc" },
        take,
        skip,
      }),
      prisma.user.count({ where }),
    ]);

    return { candidates: rows.map(toCandidate), total };
  },
};
