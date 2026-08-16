/**
 * Admin domain — ARCHITECTURE §6 step 1.
 *
 * Internal Staffva staff (PROJECT_SCOPE §2.4). Pure types: no Prisma, no Zod,
 * no React, so every layer can import this file.
 */
import type { AccountStatus } from "./candidate";

/** An admin as the rest of the app sees them — `User` joined to `AdminProfile`. */
export interface AdminUser {
  id: string;
  email: string;
  /** Supabase auth user id. Internal — never exposed through the DTO. */
  authProviderId: string | null;
  fullName: string;
  /** "Operations Admin", "Trust & Safety" — shown under the name in the console. */
  title: string;
  status: AccountStatus;
  lastActiveAt: Date | null;
  createdAt: Date;
}

export interface AdminLoginInput {
  email: string;
  password: string;
}

export interface AdminLoginResult {
  admin: AdminUser;
  accessToken: string;
  /** Seconds until `accessToken` expires — the session cookie lives as long. */
  expiresIn: number;
  /** See `LoginResult.refreshToken`. */
  refreshToken: string;
}

/**
 * Admins are provisioned by an operator (`scripts/create-admin.ts`), never
 * self-registered — there is deliberately no admin signup endpoint.
 */
export interface ProvisionAdminInput {
  email: string;
  password: string;
  fullName: string;
  title?: string | undefined;
}
