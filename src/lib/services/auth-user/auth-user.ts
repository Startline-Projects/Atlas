import { accountLockout } from "@/lib/auth/account-lockout";
import { serverConfig } from "@/lib/config";
import { ACCOUNT_LOCKOUT } from "@/lib/config/rate-limits";
import { UpstreamError, ValidationError } from "@/lib/errors";
import {
  createAnonSupabaseClient,
  getServiceSupabaseClient,
} from "@/lib/integrations/supabase";

/**
 * Auth-user mechanics shared by every self-registering surface (candidate,
 * client) — the provider half of "an account is two things at once: a
 * Supabase auth user and a row in our database".
 *
 * Owns exactly one rule of its own: the temporary `AUTH_DEV_FIXED_OTP`
 * bypass (ADR 0001 / .env.example). When that is switched off, every path in
 * here is the real Supabase flow, and nothing in the role services changes.
 *
 * Deliberately knows nothing about `User` rows: the role services keep the
 * two halves in step and decide what to do with the results.
 */

/** Which lockout policy applies — keys of `ACCOUNT_LOCKOUT`. */
export type AuthSurface = keyof typeof ACCOUNT_LOCKOUT;

export interface CreatedAuthUser {
  authUser: { id: string; email_confirmed_at?: string | null };
  requiresEmailVerification: boolean;
}

export interface ProviderSession {
  accessToken: string;
  refreshToken: string;
  /** Seconds until `accessToken` expires. */
  expiresIn: number;
}

/**
 * The fixed verification code, when the temporary bypass is switched on.
 * Undefined means the real Supabase OTP flow is used.
 */
export function fixedOtpCode(): string | undefined {
  return serverConfig().AUTH_DEV_FIXED_OTP;
}

/**
 * Creates the auth user. Real flow: Supabase creates it and emails the code.
 * Bypass flow: created through the admin API, unconfirmed and with no email
 * sent, so the fixed code is the only way to activate it (and the built-in
 * mailer's rate limit is never touched).
 *
 * `metadata` is mirrored into `auth.users.raw_user_meta_data` so the auth
 * record is legible on its own in the Supabase dashboard; our database stays
 * the source of truth.
 */
export async function createAuthUser(
  email: string,
  password: string,
  metadata: Record<string, string>,
): Promise<CreatedAuthUser> {
  return fixedOtpCode()
    ? createAuthUserWithoutEmail(email, password, metadata)
    : createAuthUserWithEmail(email, password, metadata);
}

async function createAuthUserWithEmail(
  email: string,
  password: string,
  metadata: Record<string, string>,
): Promise<CreatedAuthUser> {
  const supabase = createAnonSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });

  if (error) {
    // Supabase reports a rejected password (too short, breached, …) as a
    // 422 — that is the caller's fault, not an outage.
    if (error.status === 422) {
      throw new ValidationError(error.message, { password: error.message });
    }
    throw new UpstreamError(`Could not create the account: ${error.message}`);
  }
  if (!data.user) {
    throw new UpstreamError("The authentication provider returned no user for the signup.");
  }

  return {
    authUser: data.user,
    // Supabase hands back a session immediately only when email
    // confirmation is switched off for the project.
    requiresEmailVerification: data.session === null,
  };
}

async function createAuthUserWithoutEmail(
  email: string,
  password: string,
  metadata: Record<string, string>,
): Promise<CreatedAuthUser> {
  const { data, error } = await getServiceSupabaseClient().auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: metadata,
  });

  if (error) {
    if (error.status === 422) {
      throw new ValidationError(error.message, { password: error.message });
    }
    throw new UpstreamError(`Could not create the account: ${error.message}`);
  }
  if (!data.user) {
    throw new UpstreamError("The authentication provider returned no user for the signup.");
  }

  return { authUser: data.user, requiresEmailVerification: true };
}

/**
 * Confirms the 6-digit code for an address. Bypass flow: the code must equal
 * the fixed one, and the address is confirmed through the admin API (no email
 * was ever sent, so Supabase never got the chance). Real flow: `verifyOtp`.
 *
 * Throws `ValidationError` for a wrong/expired code; resolves on success.
 */
export async function verifyEmailCode(input: {
  email: string;
  token: string;
  authProviderId: string | null;
}): Promise<void> {
  const fixedCode = fixedOtpCode();

  if (fixedCode) {
    if (input.token !== fixedCode) throw incorrectCode();
    if (!input.authProviderId) {
      throw new UpstreamError(
        "This account has no authentication record and cannot be confirmed.",
      );
    }
    const { error } = await getServiceSupabaseClient().auth.admin.updateUserById(
      input.authProviderId,
      { email_confirm: true },
    );
    if (error) {
      throw new UpstreamError(`Could not confirm the account: ${error.message}`);
    }
    return;
  }

  const { error } = await createAnonSupabaseClient().auth.verifyOtp({
    email: input.email,
    token: input.token,
    type: "email",
  });
  if (error) throw incorrectCode();
}

function incorrectCode(): ValidationError {
  return new ValidationError(
    "That code is incorrect or has expired. Request a new one.",
    { token: "Incorrect or expired code." },
  );
}

/** Sends the signup email again. A no-op under the bypass — no email exists. */
export async function resendSignupEmail(email: string): Promise<void> {
  if (fixedOtpCode()) return;
  await createAnonSupabaseClient().auth.resend({ type: "signup", email });
}

/**
 * Password sign-in with the per-account lockout (PROJECT_SCOPE §2.1) wrapped
 * around it: refused while locked, a failure recorded on a wrong password,
 * the counter cleared on success. Wrong credentials are reported as a
 * `ValidationError` on the password field — deliberately the same answer
 * whether or not the address exists.
 */
export async function signInWithPassword(
  surface: AuthSurface,
  email: string,
  password: string,
): Promise<ProviderSession> {
  await accountLockout.assertNotLocked(surface, email);

  const { data, error } = await createAnonSupabaseClient().auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    await accountLockout.recordFailure(surface, email);
    throw new ValidationError("Email or password is incorrect. Please try again.", {
      password: "Incorrect email or password.",
    });
  }

  await accountLockout.clear(surface, email);

  const session = data.session;
  if (!session?.access_token) {
    throw new UpstreamError("The authentication provider did not return a session token.");
  }

  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresIn: session.expires_in,
  };
}

/** The `auth.users.id` behind a live access token, or null for anything else. */
export async function authUserIdFromToken(accessToken: string): Promise<string | null> {
  const { data, error } = await createAnonSupabaseClient().auth.getUser(accessToken);
  if (error || !data.user) return null;
  return data.user.id;
}

/**
 * Revokes the refresh tokens behind an access token so a copied cookie cannot
 * be refreshed after sign-out. Best-effort — callers clear cookies regardless.
 */
export async function revokeSession(accessToken: string, tag: string): Promise<void> {
  try {
    await getServiceSupabaseClient().auth.admin.signOut(accessToken, "local");
  } catch (error) {
    console.error(`[${tag}] could not revoke session`, error);
  }
}

/**
 * Best-effort cleanup of an orphaned auth user (created, but the database
 * write that should have followed failed). Never throws: it runs inside a
 * `catch`, and the error the caller is already handling is the one worth
 * reporting. A failure here is logged loudly so it can be cleared by hand.
 */
export async function deleteAuthUserQuietly(
  authProviderId: string,
  tag: string,
): Promise<void> {
  try {
    await getServiceSupabaseClient().auth.admin.deleteUser(authProviderId);
  } catch (cleanupError) {
    console.error(
      `[${tag}] orphaned Supabase auth user ${authProviderId} — delete it manually`,
      cleanupError,
    );
  }
}
