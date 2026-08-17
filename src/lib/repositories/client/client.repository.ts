import type { ClientProfile, User } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type { AccountStatus, RoleCategory } from "@/lib/domain/candidate";
import type { Client, TeamSize } from "@/lib/domain/client";

/**
 * Client repository — ARCHITECTURE §6 step 4.
 *
 * The only module that speaks Prisma for clients. Twin of the candidate
 * repository: returns domain objects, never rows, and excludes soft-deleted
 * users here rather than leaving it to each caller (§8).
 */

const NOT_DELETED = { deletedAt: null } as const;

type ClientRow = User & { clientProfile: ClientProfile | null };

const withProfile = { clientProfile: true } as const;

function toClient(row: ClientRow): Client {
  // Every query here filters on `clientProfile is not null`; the guard turns
  // a future mistake into a loud failure instead of `undefined` in the UI.
  if (!row.clientProfile) {
    throw new Error(`User ${row.id} was read as a client but has no client profile.`);
  }

  return {
    id: row.id,
    email: row.email,
    authProviderId: row.authProviderId,
    contactName: row.clientProfile.contactName,
    companyName: row.clientProfile.companyName,
    country: row.clientProfile.country,
    countryCode: row.clientProfile.countryCode,
    teamSize: (row.clientProfile.teamSize as TeamSize | null) ?? null,
    hiringCategories: row.clientProfile.hiringCategories as RoleCategory[],
    status: row.status as AccountStatus,
    emailVerifiedAt: row.emailVerifiedAt,
    lastActiveAt: row.lastActiveAt,
    createdAt: row.createdAt,
  };
}

export interface CreateClientRecord {
  email: string;
  authProviderId: string | null;
  contactName: string;
  companyName: string;
  country: string | null;
  countryCode: string | null;
  teamSize: TeamSize | null;
  emailVerifiedAt: Date | null;
  status: AccountStatus;
}

export const clientRepository = {
  /**
   * Creates the `User` and its `ClientProfile` as one unit. Throws Prisma's
   * `P2002` when the email is taken; the service maps it to a `ConflictError`.
   */
  async create(input: CreateClientRecord): Promise<Client> {
    const row = await getPrisma().user.create({
      data: {
        email: input.email,
        role: "CLIENT",
        status: input.status,
        emailVerifiedAt: input.emailVerifiedAt,
        authProviderId: input.authProviderId,
        clientProfile: {
          create: {
            contactName: input.contactName,
            companyName: input.companyName,
            country: input.country,
            countryCode: input.countryCode,
            teamSize: input.teamSize,
          },
        },
      },
      include: withProfile,
    });

    return toClient(row);
  },

  async findByEmail(email: string): Promise<Client | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...NOT_DELETED, email, clientProfile: { isNot: null } },
      include: withProfile,
    });
    return row ? toClient(row) : null;
  },

  async findById(id: string): Promise<Client | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...NOT_DELETED, id, clientProfile: { isNot: null } },
      include: withProfile,
    });
    return row ? toClient(row) : null;
  },

  /** Resolves the Supabase `auth.users.id` carried by a session token. */
  async findByAuthProviderId(authProviderId: string): Promise<Client | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...NOT_DELETED, authProviderId, clientProfile: { isNot: null } },
      include: withProfile,
    });
    return row ? toClient(row) : null;
  },

  /** The `ClientProfile.id` behind a client user — what jobs hang off. */
  async profileIdForUser(userId: string): Promise<string | null> {
    const profile = await getPrisma().clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    return profile?.id ?? null;
  },

  async touchLastActive(id: string): Promise<void> {
    await getPrisma().user.update({
      where: { id },
      data: { lastActiveAt: new Date() },
    });
  },

  /** Idempotent: verifying an already-verified account is not an error. */
  async markEmailVerified(id: string): Promise<Client> {
    const row = await getPrisma().user.update({
      where: { id },
      data: { emailVerifiedAt: new Date(), status: "ACTIVE", lastActiveAt: new Date() },
      include: withProfile,
    });
    return toClient(row);
  },
};
