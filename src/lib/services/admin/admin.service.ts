import { Prisma } from "@prisma/client";

import type {
  AdminLoginInput,
  AdminLoginResult,
  AdminUser,
  ProvisionAdminInput,
} from "@/lib/domain/admin";
import {
  ConflictError,
  ForbiddenError,
  UpstreamError,
  ValidationError,
} from "@/lib/errors";
import {
  createAnonSupabaseClient,
  getServiceSupabaseClient,
} from "@/lib/integrations/supabase";
import { adminRepository } from "@/lib/repositories/admin";

/**
 * Admin service — ARCHITECTURE §6 step 5.
 *
 * Same two-halves rule as candidates: an admin is a Supabase auth user (holds
 * the password) plus a row in our database (role, profile, status). This
 * module is the only thing that creates or resolves that pair.
 *
 * What is deliberately NOT here yet:
 *   • TOTP 2FA (PROJECT_SCOPE §2.1 — mandatory for admins). The sign-in
 *     screen's 2FA states are still design previews; enrolment + challenge
 *     land with Supabase MFA in a later slice.
 *   • Lockout after failed attempts (§2.1) — arrives with rate limiting §7.6.
 */

const UNIQUE_CONSTRAINT = "P2002";

export const adminService = {
  /**
   * Authenticates an admin with email + password.
   *
   * One error message for "no such admin" and "wrong password" (unlike the
   * candidate flow, which names a missing account so applicants can recover):
   * the admin sign-in page is the single most enumerable surface we have,
   * and it must not tell an outsider which addresses are staff.
   */
  async login(input: AdminLoginInput): Promise<AdminLoginResult> {
    const email = input.email.trim().toLowerCase();

    const admin = await adminRepository.findByEmail(email);

    // Still call the provider when the row is missing so a timing difference
    // does not leak what the message hides. Suspended/deactivated accounts,
    // however, get an honest 403 — that message reaches a real staff member.
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: input.password,
    });

    if (!admin || error) {
      throw new ValidationError(
        "Email or password is incorrect.",
        { password: "Incorrect email or password." },
      );
    }

    if (admin.status !== "ACTIVE") {
      throw new ForbiddenError(
        "This admin account is not active. Contact a Super Admin.",
      );
    }

    // The provider signed in *someone* with that password — make sure it is
    // the admin row we looked up and not, say, a candidate sharing the address.
    if (data.user.id !== admin.authProviderId) {
      throw new ValidationError(
        "Email or password is incorrect.",
        { password: "Incorrect email or password." },
      );
    }

    const session = data.session;
    if (!session?.access_token) {
      throw new UpstreamError(
        "The authentication provider did not return a session token.",
      );
    }

    await adminRepository.touchLastActive(admin.id);

    return {
      admin,
      accessToken: session.access_token,
      expiresIn: session.expires_in,
      refreshToken: session.refresh_token,
    };
  },

  /**
   * Resolves the admin behind a session token. Null for anything that is not
   * a live, ACTIVE admin — a valid *candidate* token resolves to null here,
   * which is what keeps the two surfaces apart even though both cookies are
   * Supabase access tokens.
   */
  async fromAccessToken(accessToken: string): Promise<AdminUser | null> {
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data.user) return null;

    const admin = await adminRepository.findByAuthProviderId(data.user.id);
    if (!admin || admin.status !== "ACTIVE") return null;

    return admin;
  },

  /** Revokes the refresh tokens behind this access token. Best-effort. */
  async signOut(accessToken: string): Promise<void> {
    try {
      await getServiceSupabaseClient().auth.admin.signOut(accessToken, "local");
    } catch (error) {
      console.error("[admin.signOut] could not revoke session", error);
    }
  },

  /**
   * Creates an admin. Operator-only — invoked by `scripts/create-admin.ts`
   * with the service-role key, never by an HTTP route.
   *
   * The auth user is created confirmed (no email round-trip: the operator
   * hands the password over out of band). If the database write then fails
   * the auth user is deleted again, mirroring the candidate signup contract.
   */
  async provision(input: ProvisionAdminInput): Promise<AdminUser> {
    const email = input.email.trim().toLowerCase();

    if (await adminRepository.emailTaken(email)) {
      throw new ConflictError(
        `A user with the address ${email} already exists.`,
        { email: "Already registered." },
      );
    }

    const { data, error } = await getServiceSupabaseClient().auth.admin.createUser({
      email,
      password: input.password,
      email_confirm: true,
      user_metadata: { full_name: input.fullName, role: "ADMIN" },
    });

    if (error) {
      if (error.status === 422) {
        throw new ValidationError(error.message, { password: error.message });
      }
      throw new UpstreamError(`Could not create the auth user: ${error.message}`);
    }
    if (!data.user) {
      throw new UpstreamError("The authentication provider returned no user.");
    }

    try {
      return await adminRepository.create({
        email,
        authProviderId: data.user.id,
        fullName: input.fullName.trim(),
        title: input.title?.trim() || "Admin",
      });
    } catch (dbError) {
      await deleteAuthUserQuietly(data.user.id);

      if (
        dbError instanceof Prisma.PrismaClientKnownRequestError &&
        dbError.code === UNIQUE_CONSTRAINT
      ) {
        throw new ConflictError(
          `A user with the address ${email} already exists.`,
          { email: "Already registered." },
        );
      }
      throw dbError;
    }
  },
};

async function deleteAuthUserQuietly(authProviderId: string): Promise<void> {
  try {
    await getServiceSupabaseClient().auth.admin.deleteUser(authProviderId);
  } catch (cleanupError) {
    console.error(
      `[admin.provision] orphaned Supabase auth user ${authProviderId} — delete it manually`,
      cleanupError,
    );
  }
}
