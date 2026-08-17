import { Prisma } from "@prisma/client";

import type {
  Client,
  ClientLoginResult,
  ClientSignupResult,
  CreateClientInput,
} from "@/lib/domain/client";
import { countryName } from "@/lib/domain/countries";
import {
  BusinessRuleError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "@/lib/errors";
import { clientRepository } from "@/lib/repositories/client";
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
 * Client service — ARCHITECTURE §6 step 5.
 *
 * The hiring-side twin of `candidateService`: a client is a Supabase auth
 * user plus a `User` + `ClientProfile` pair in our database, and this module
 * keeps the two in step. Provider mechanics (incl. the dev OTP bypass) are
 * shared through `services/auth-user`.
 */

const UNIQUE_CONSTRAINT = "P2002";

function emailTaken(): ConflictError {
  return new ConflictError(
    "An account with that email already exists. Sign in instead.",
    { email: "This email is already registered." },
  );
}

export const clientService = {
  /**
   * Registers a client. Auth user first (it mints the id we store, and a
   * rejected password should cost nothing); if the database write then fails
   * the auth user is deleted again so the address is not left blocked.
   */
  async signup(input: CreateClientInput): Promise<ClientSignupResult> {
    const email = input.email.trim().toLowerCase();

    if (await clientRepository.findByEmail(email)) throw emailTaken();

    const { authUser, requiresEmailVerification } = await createAuthUser(
      email,
      input.password,
      {
        full_name: input.contactName,
        company_name: input.companyName,
        account_type: "client",
      },
    );

    try {
      const client = await clientRepository.create({
        email,
        authProviderId: authUser.id,
        contactName: input.contactName.trim(),
        companyName: input.companyName.trim(),
        countryCode: input.countryCode,
        country: countryName(input.countryCode),
        teamSize: input.teamSize,
        emailVerifiedAt: authUser.email_confirmed_at
          ? new Date(authUser.email_confirmed_at)
          : null,
        status: authUser.email_confirmed_at ? "ACTIVE" : "PENDING_VERIFICATION",
      });

      return { client, requiresEmailVerification };
    } catch (dbError) {
      await deleteAuthUserQuietly(authUser.id, "client.signup");

      if (
        dbError instanceof Prisma.PrismaClientKnownRequestError &&
        dbError.code === UNIQUE_CONSTRAINT
      ) {
        throw emailTaken();
      }
      throw dbError;
    }
  },

  /** Confirms the 6-digit code from the signup email and activates the account. */
  async verifyEmail(email: string, token: string): Promise<Client> {
    const normalized = email.trim().toLowerCase();

    const client = await clientRepository.findByEmail(normalized);
    if (!client) {
      throw new NotFoundError("No account was found for that email address.");
    }

    await verifyEmailCode({
      email: normalized,
      token,
      authProviderId: client.authProviderId,
    });

    return clientRepository.markEmailVerified(client.id);
  },

  /**
   * Sends the verification email again. Silent about whether the address
   * exists — an unauthenticated endpoint must not be an enumeration oracle.
   */
  async resendVerification(email: string): Promise<void> {
    const normalized = email.trim().toLowerCase();

    const client = await clientRepository.findByEmail(normalized);
    if (!client || client.emailVerifiedAt) return;

    await resendSignupEmail(normalized);
  },

  /** Authenticates a client with email and password. */
  async login(input: { email: string; password: string }): Promise<ClientLoginResult> {
    const normalized = input.email.trim().toLowerCase();

    const client = await clientRepository.findByEmail(normalized);
    if (!client) {
      throw new NotFoundError("No account found with that email address.");
    }

    if (client.status === "PENDING_VERIFICATION") {
      throw new BusinessRuleError("Please verify your email before signing in.", {
        email: "Email verification required.",
      });
    }

    if (client.status === "SUSPENDED" || client.status === "DEACTIVATED") {
      throw new ForbiddenError("This account is not active. Please contact support.");
    }

    const session = await signInWithPassword("client", normalized, input.password);

    await clientRepository.touchLastActive(client.id);

    return {
      client,
      accessToken: session.accessToken,
      expiresIn: session.expiresIn,
      refreshToken: session.refreshToken,
    };
  },

  /**
   * Resolves the client behind a session token. Null for anything that is not
   * a live, verified client token — a candidate's token presented here yields
   * null because no client row carries that auth id.
   */
  async fromAccessToken(accessToken: string): Promise<Client | null> {
    const authUserId = await authUserIdFromToken(accessToken);
    if (!authUserId) return null;

    const client = await clientRepository.findByAuthProviderId(authUserId);
    if (!client || client.status !== "ACTIVE") return null;

    return client;
  },

  /** Revokes the refresh tokens behind this access token. Best-effort. */
  async signOut(accessToken: string): Promise<void> {
    await revokeSession(accessToken, "client.signOut");
  },
};
