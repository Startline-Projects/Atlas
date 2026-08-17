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
} from "@/lib/errors";
import { candidateRepository } from "@/lib/repositories/candidate";
import {
  authUserIdFromToken,
  createAuthUser,
  deleteAuthUserQuietly,
  resendSignupEmail,
  revokeSession,
  signInWithPassword,
  verifyEmailCode,
} from "@/lib/services/auth-user";

/**
 * Candidate service — ARCHITECTURE §6 step 5.
 *
 * Owns the rule that a candidate is two things at once: a Supabase auth user
 * (which holds the password and sends the verification email) and a row in our
 * own database (which everything else joins to). Keeping both in step is this
 * module's whole job — no caller should ever create one without the other.
 * The provider mechanics themselves live in `services/auth-user`, shared with
 * the client surface.
 */

const UNIQUE_CONSTRAINT = "P2002";

function emailTaken(): ConflictError {
  return new ConflictError(
    "An account with that email already exists. Sign in instead.",
    { email: "This email is already registered." },
  );
}

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
    if (await candidateRepository.findByEmail(email)) throw emailTaken();

    const { authUser, requiresEmailVerification } = await createAuthUser(
      email,
      input.password,
      { full_name: input.fullName, role_category: input.roleCategory },
    );

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
      await deleteAuthUserQuietly(authUser.id, "candidate.signup");

      if (
        dbError instanceof Prisma.PrismaClientKnownRequestError &&
        dbError.code === UNIQUE_CONSTRAINT
      ) {
        throw emailTaken();
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

    await verifyEmailCode({
      email: normalized,
      token,
      authProviderId: candidate.authProviderId,
    });

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

    await resendSignupEmail(normalized);
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

    // Lockout after repeated wrong passwords (PROJECT_SCOPE §2.1) is applied
    // inside — checked before the provider is called so a locked address
    // costs us nothing.
    const session = await signInWithPassword("candidate", normalized, input.password);

    await candidateRepository.touchLastActive(candidate.id);

    return {
      candidate,
      accessToken: session.accessToken,
      expiresIn: session.expiresIn,
      refreshToken: session.refreshToken,
      requiresEmailVerification: false,
    };
  },

  /**
   * Resolves the candidate behind a session token. Null for anything that is
   * not a live, verified candidate token — callers treat that as "signed out",
   * never as an error to show.
   */
  async fromAccessToken(accessToken: string): Promise<Candidate | null> {
    const authUserId = await authUserIdFromToken(accessToken);
    if (!authUserId) return null;

    const candidate = await candidateRepository.findByAuthProviderId(authUserId);
    if (!candidate || candidate.status !== "ACTIVE") return null;

    return candidate;
  },

  /**
   * Ends the session at the provider: revokes the refresh tokens behind this
   * access token so a copied cookie cannot be refreshed after sign-out.
   * Best-effort — the cookies are cleared regardless.
   */
  async signOut(accessToken: string): Promise<void> {
    await revokeSession(accessToken, "candidate.signOut");
  },

  /** Admin-facing listing. Callers are responsible for the permission check. */
  async list(options: ListCandidatesOptions = {}): Promise<CandidateList> {
    return candidateRepository.list(options);
  },
};
