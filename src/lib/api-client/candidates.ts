import type { CandidateDto } from "@/lib/api/dto/candidate.dto";
import type { LoginInput, SignupInput, VerifyEmailInput } from "@/lib/validators/candidate";

import { apiFetch } from "./http";

/**
 * Typed calls into the candidate endpoints — ARCHITECTURE §6 step 7.
 *
 * The UI imports this, never `fetch` directly, so a route rename is one edit.
 */

export interface SignupResponse {
  candidate: CandidateDto;
  requiresEmailVerification: boolean;
}

export interface LoginResponse {
  candidate: CandidateDto;
  accessToken: string;
  requiresEmailVerification: boolean;
}

export const candidatesApi = {
  signup(input: SignupInput): Promise<SignupResponse> {
    return apiFetch<SignupResponse>("/api/v1/candidates/signup", {
      method: "POST",
      json: input,
    });
  },

  login(input: LoginInput): Promise<LoginResponse> {
    return apiFetch<LoginResponse>("/api/v1/candidates/login", {
      method: "POST",
      json: input,
    });
  },

  logout(): Promise<{ signedOut: boolean }> {
    return apiFetch<{ signedOut: boolean }>("/api/v1/candidates/logout", {
      method: "POST",
    });
  },

  me(): Promise<{ candidate: CandidateDto }> {
    return apiFetch<{ candidate: CandidateDto }>("/api/v1/candidates/me", {
      method: "GET",
      cache: "no-store",
    });
  },

  verifyEmail(input: VerifyEmailInput): Promise<{ candidate: CandidateDto }> {
    return apiFetch<{ candidate: CandidateDto }>(
      "/api/v1/candidates/verify-email",
      { method: "POST", json: input },
    );
  },

  resendVerification(email: string): Promise<{ sent: boolean }> {
    return apiFetch<{ sent: boolean }>(
      "/api/v1/candidates/resend-verification",
      { method: "POST", json: { email } },
    );
  },
};
