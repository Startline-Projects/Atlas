import { Prisma } from "@prisma/client";

import type {
  Candidate,
  CandidateList,
  CreateCandidateInput,
  ListCandidatesOptions,
  LoginInput,
  LoginResult,
  SignupResult,
} from "@/lib/domain/candidate";
import {
  BusinessRuleError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UpstreamError,
  ValidationError,
} from "@/lib/errors";
import { serverConfig } from "@/lib/config";
import {
  createAnonSupabaseClient,
  getServiceSupabaseClient,
} from "@/lib/integrations/supabase";
import { candidateRepository } from "@/lib/repositories/candidate";

/**
 * Candidate service — ARCHITECTURE §6 step 5.
 *
 * Owns the rule that a candidate is two things at once: a Supabase auth user
 * (which holds the password and sends the verification email) and a row in our
 * own database (which everything else joins to). Keeping both in step is this
 * module's whole job — no caller should ever create one without the other.
 */

const UNIQUE_CONSTRAINT = "P2002";

export const candidateService = {
  /**
   * Registers a candidate.
   *
   * The auth user is created first because it mints the id we store, and
   * because a rejected password should cost us nothing. If the database write
   * then fails, the auth user is deleted again — an account that exists in
   * Supabase but not here can never sign in successfully, and would block the
   * address from being re-used.
   */
  async signup(input: CreateCandidateInput): Promise<SignupResult> {
    const email = input.email.trim().toLowerCase();

    // Checked up front for a clear message. Not a substitute for the unique
    // index, which is what actually makes this safe under concurrency.
    if (await candidateRepository.findByEmail(email)) {
      throw new ConflictError(
        "An account with that email already exists. Sign in instead.",
        { email: "This email is already registered." },
      );
    }

    // Mirrored into `auth.users.raw_user_meta_data` so the auth record is
    // legible on its own in the Supabase dashboard. Our database stays the
    // source of truth.
    const userMetadata = {
      full_name: input.fullName,
      role_category: input.roleCategory,
    };

    const { authUser, requiresEmailVerification } = fixedOtpCode()
      ? await createAuthUserWithoutEmail(email, input.password, userMetadata)
      : await createAuthUserWithEmail(email, input.password, userMetadata);

    try {
      const candidate = await candidateRepository.create({
        email,
        authProviderId: authUser.id,
        fullName: input.fullName.trim(),
        roleCategory: input.roleCategory,
        emailVerifiedAt: authUser.email_confirmed_at
          ? new Date(authUser.email_confirmed_at)
          : null,
        status: authUser.email_confirmed_at ? "ACTIVE" : "PENDING_VERIFICATION",
      });

      return { candidate, requiresEmailVerification };
    } catch (dbError) {
      await deleteAuthUserQuietly(authUser.id);

      if (
        dbError instanceof Prisma.PrismaClientKnownRequestError &&
        dbError.code === UNIQUE_CONSTRAINT
      ) {
        throw new ConflictError(
          "An account with that email already exists. Sign in instead.",
          { email: "This email is already registered." },
        );
      }

      throw dbError;
    }
  },

  /**
   * Confirms the 6-digit code from the signup email and activates the account.
   */
  async verifyEmail(email: string, token: string): Promise<Candidate> {
    const normalized = email.trim().toLowerCase();

    const candidate = await candidateRepository.findByEmail(normalized);
    if (!candidate) {
      throw new NotFoundError("No account was found for that email address.");
    }

    const fixedCode = fixedOtpCode();
    if (fixedCode) {
      if (token !== fixedCode) {
        throw new ValidationError(
          "That code is incorrect or has expired. Request a new one.",
          { token: "Incorrect or expired code." },
        );
      }

      if (!candidate.authProviderId) {
        throw new UpstreamError(
          "This account has no authentication record and cannot be confirmed.",
        );
      }

      // No email was sent, so Supabase never got to confirm the address —
      // do it through the admin API instead so password sign-in works.
      const { error } = await getServiceSupabaseClient().auth.admin.updateUserById(
        candidate.authProviderId,
        { email_confirm: true },
      );
      if (error) {
        throw new UpstreamError(
          `Could not confirm the account: ${error.message}`,
        );
      }

      return candidateRepository.markEmailVerified(candidate.id);
    }

    const supabase = createAnonSupabaseClient();
    const { error } = await supabase.auth.verifyOtp({
      email: normalized,
      token,
      type: "email",
    });

    if (error) {
      throw new ValidationError(
        "That code is incorrect or has expired. Request a new one.",
        { token: "Incorrect or expired code." },
      );
    }

    return candidateRepository.markEmailVerified(candidate.id);
  },

  /**
   * Sends the verification email again.
   *
   * Deliberately silent about whether the address exists — this endpoint is
   * unauthenticated, and a different answer per address turns it into an
   * account-enumeration oracle.
   */
  async resendVerification(email: string): Promise<void> {
    const normalized = email.trim().toLowerCase();

    const candidate = await candidateRepository.findByEmail(normalized);
    if (!candidate || candidate.emailVerifiedAt) return;

    // Nothing to resend while the fixed code is in force — no email exists.
    if (fixedOtpCode()) return;

    const supabase = createAnonSupabaseClient();
    await supabase.auth.resend({ type: "signup", email: normalized });
  },

  /**
   * Authenticates a candidate with email and password.
   *
   * Returns an access token from Supabase and the candidate record.
   */
  async login(input: LoginInput): Promise<LoginResult> {
    const normalized = input.email.trim().toLowerCase();

    const candidate = await candidateRepository.findByEmail(normalized);
    if (!candidate) {
      throw new NotFoundError("No account found with that email address.");
    }

    if (candidate.status === "PENDING_VERIFICATION") {
      throw new BusinessRuleError(
        "Please verify your email before signing in.",
        { email: "Email verification required." },
      );
    }

    if (candidate.status === "SUSPENDED" || candidate.status === "DEACTIVATED") {
      throw new ForbiddenError(
        "This account is not active. Please contact support.",
      );
    }

    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalized,
      password: input.password,
    });

    if (error) {
      // Invalid credentials — deliberate ambiguity for security (no "email not found" oracle)
      throw new ValidationError(
        "Email or password is incorrect. Please try again.",
        { password: "Incorrect email or password." },
      );
    }

    const session = data.session;
    if (!session?.access_token) {
      throw new UpstreamError(
        "The authentication provider did not return a session token.",
      );
    }

    await candidateRepository.touchLastActive(candidate.id);

    return {
      candidate,
      accessToken: session.access_token,
      expiresIn: session.expires_in,
      refreshToken: session.refresh_token,
      requiresEmailVerification: false,
    };
  },

  /**
   * Resolves the candidate behind a session token. Null for anything that is
   * not a live, verified candidate token — callers treat that as "signed out",
   * never as an error to show.
   */
  async fromAccessToken(accessToken: string): Promise<Candidate | null> {
    const supabase = createAnonSupabaseClient();
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data.user) return null;

    const candidate = await candidateRepository.findByAuthProviderId(
      data.user.id,
    );
    if (!candidate || candidate.status !== "ACTIVE") return null;

    return candidate;
  },

  /**
   * Ends the session at the provider: revokes the refresh tokens behind this
   * access token so a copied cookie cannot be refreshed after sign-out.
   * Best-effort — the cookies are cleared regardless.
   */
  async signOut(accessToken: string): Promise<void> {
    try {
      await getServiceSupabaseClient().auth.admin.signOut(accessToken, "local");
    } catch (error) {
      console.error("[candidate.signOut] could not revoke session", error);
    }
  },

  /** Admin-facing listing. Callers are responsible for the permission check. */
  async list(options: ListCandidatesOptions = {}): Promise<CandidateList> {
    return candidateRepository.list(options);
  },
};

/* -------------------------------------------------------------------------- */
/* Auth-user creation                                                         */
/* -------------------------------------------------------------------------- */

interface AuthUserMetadata {
  full_name: string;
  role_category: string;
}

interface CreatedAuthUser {
  authUser: { id: string; email_confirmed_at?: string | null };
  requiresEmailVerification: boolean;
}

/**
 * The fixed verification code, when the temporary bypass is switched on
 * (`AUTH_DEV_FIXED_OTP`). Undefined means the real Supabase OTP flow is used.
 */
function fixedOtpCode(): string | undefined {
  return serverConfig().AUTH_DEV_FIXED_OTP;
}

/**
 * Real flow: Supabase creates the user and emails the verification code.
 */
async function createAuthUserWithEmail(
  email: string,
  password: string,
  metadata: AuthUserMetadata,
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
    throw new UpstreamError(
      "The authentication provider returned no user for the signup.",
    );
  }

  return {
    authUser: data.user,
    // Supabase hands back a session immediately only when email
    // confirmation is switched off for the project.
    requiresEmailVerification: data.session === null,
  };
}

/**
 * Bypass flow (`AUTH_DEV_FIXED_OTP` set): the user is created through the
 * admin API, unconfirmed and with no email sent, so the fixed code is the only
 * way to activate it. Avoids the built-in mailer's rate limit entirely.
 */
async function createAuthUserWithoutEmail(
  email: string,
  password: string,
  metadata: AuthUserMetadata,
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
    throw new UpstreamError(
      "The authentication provider returned no user for the signup.",
    );
  }

  return { authUser: data.user, requiresEmailVerification: true };
}

/**
 * Best-effort cleanup of an orphaned auth user.
 *
 * Never throws: it runs inside a `catch`, and the error the caller is already
 * handling is the one worth reporting. A failure here leaves an auth user with
 * no database row — logged loudly so it can be cleared by hand.
 */
async function deleteAuthUserQuietly(authProviderId: string): Promise<void> {
  try {
    await getServiceSupabaseClient().auth.admin.deleteUser(authProviderId);
  } catch (cleanupError) {
    console.error(
      `[candidate.signup] orphaned Supabase auth user ${authProviderId} — ` +
        "delete it manually",
      cleanupError,
    );
  }
}
