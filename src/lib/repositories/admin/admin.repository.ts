import type { AdminProfile, User } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type { AdminUser } from "@/lib/domain/admin";
import type { AccountStatus } from "@/lib/domain/candidate";

/**
 * Admin repository — ARCHITECTURE §6 step 4.
 *
 * The only module that speaks Prisma for admins. Returns domain objects, never
 * rows. Soft-deleted users are excluded here, not by callers (§8). Every query
 * also insists on `role = ADMIN` — a candidate row that somehow gained an
 * `AdminProfile` must still never resolve as an admin.
 */

const NOT_DELETED = { deletedAt: null } as const;

type AdminRow = User & { adminProfile: AdminProfile | null };

const withProfile = { adminProfile: true } as const;

const ADMIN_WHERE = {
  ...NOT_DELETED,
  role: "ADMIN",
  adminProfile: { isNot: null },
} as const;

function toAdmin(row: AdminRow): AdminUser {
  if (!row.adminProfile) {
    throw new Error(`User ${row.id} was read as an admin but has no admin profile.`);
  }

  return {
    id: row.id,
    email: row.email,
    authProviderId: row.authProviderId,
    fullName: row.adminProfile.fullName,
    title: row.adminProfile.title,
    status: row.status as AccountStatus,
    lastActiveAt: row.lastActiveAt,
    createdAt: row.createdAt,
  };
}

export interface CreateAdminRecord {
  email: string;
  authProviderId: string;
  fullName: string;
  title: string;
}

export const adminRepository = {
  /**
   * Creates the `User` (role ADMIN, already ACTIVE — the provisioning path
   * confirms the address up front) and its `AdminProfile` as one unit.
   *
   * Throws `Prisma.PrismaClientKnownRequestError` `P2002` when the email is
   * taken; the service turns that into a `ConflictError`.
   */
  async create(input: CreateAdminRecord): Promise<AdminUser> {
    const now = new Date();
    const row = await getPrisma().user.create({
      data: {
        email: input.email,
        role: "ADMIN",
        status: "ACTIVE",
        emailVerifiedAt: now,
        authProviderId: input.authProviderId,
        adminProfile: {
          create: { fullName: input.fullName, title: input.title },
        },
      },
      include: withProfile,
    });

    return toAdmin(row);
  },

  async findByEmail(email: string): Promise<AdminUser | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...ADMIN_WHERE, email },
      include: withProfile,
    });

    return row ? toAdmin(row) : null;
  },

  /** Resolves the Supabase `auth.users.id` carried by a session token. */
  async findByAuthProviderId(authProviderId: string): Promise<AdminUser | null> {
    const row = await getPrisma().user.findFirst({
      where: { ...ADMIN_WHERE, authProviderId },
      include: withProfile,
    });

    return row ? toAdmin(row) : null;
  },

  /** Any user row — of any role — already holding this address. */
  async emailTaken(email: string): Promise<boolean> {
    const count = await getPrisma().user.count({
      where: { ...NOT_DELETED, email },
    });
    return count > 0;
  },

  async touchLastActive(id: string): Promise<void> {
    await getPrisma().user.update({
      where: { id },
      data: { lastActiveAt: new Date() },
    });
  },
};
