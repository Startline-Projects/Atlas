import type { ClientDto } from "@/lib/api/dto/client.dto";
import type { JobDto } from "@/lib/api/dto/job.dto";
import type { LoginInput, VerifyEmailInput } from "@/lib/validators/auth";
import type { ClientSignupInput } from "@/lib/validators/client";
import type { CreateJobInputWire } from "@/lib/validators/job";

import { apiFetch } from "./http";

/**
 * Typed calls into the client endpoints — ARCHITECTURE §6 step 7. The UI
 * imports this, never `fetch` directly, so a route rename is one edit.
 */

export interface ClientSignupResponse {
  client: ClientDto;
  requiresEmailVerification: boolean;
}

export interface ClientLoginResponse {
  client: ClientDto;
  accessToken: string;
}

export const clientsApi = {
  signup(input: ClientSignupInput): Promise<ClientSignupResponse> {
    return apiFetch<ClientSignupResponse>("/api/v1/clients/signup", {
      method: "POST",
      json: input,
    });
  },

  login(input: LoginInput): Promise<ClientLoginResponse> {
    return apiFetch<ClientLoginResponse>("/api/v1/clients/login", {
      method: "POST",
      json: input,
    });
  },

  logout(): Promise<{ signedOut: boolean }> {
    return apiFetch<{ signedOut: boolean }>("/api/v1/clients/logout", {
      method: "POST",
    });
  },

  me(): Promise<{ client: ClientDto }> {
    return apiFetch<{ client: ClientDto }>("/api/v1/clients/me", {
      method: "GET",
      cache: "no-store",
    });
  },

  verifyEmail(input: VerifyEmailInput): Promise<{ client: ClientDto }> {
    return apiFetch<{ client: ClientDto }>("/api/v1/clients/verify-email", {
      method: "POST",
      json: input,
    });
  },

  resendVerification(email: string): Promise<{ sent: boolean }> {
    return apiFetch<{ sent: boolean }>("/api/v1/clients/resend-verification", {
      method: "POST",
      json: { email },
    });
  },

  /* ---- Jobs the client owns ------------------------------------------- */

  /** `init` carries the visitor's cookies from a Server Component (`serverInit()`). */
  listJobs(init?: RequestInit): Promise<{ jobs: JobDto[] }> {
    return apiFetch<{ jobs: JobDto[] }>("/api/v1/clients/me/jobs", {
      method: "GET",
      cache: "no-store",
      ...init,
    });
  },

  createJob(input: CreateJobInputWire): Promise<{ job: JobDto }> {
    return apiFetch<{ job: JobDto }>("/api/v1/clients/me/jobs", {
      method: "POST",
      json: input,
    });
  },

  getJob(id: string, init?: RequestInit): Promise<{ job: JobDto }> {
    return apiFetch<{ job: JobDto }>(`/api/v1/clients/me/jobs/${encodeURIComponent(id)}`, {
      method: "GET",
      cache: "no-store",
      ...init,
    });
  },

  closeJob(id: string): Promise<{ job: JobDto }> {
    return apiFetch<{ job: JobDto }>(`/api/v1/clients/me/jobs/${encodeURIComponent(id)}`, {
      method: "PATCH",
      json: { status: "CLOSED" },
    });
  },
};
