import type { AdminDto } from "@/lib/api/dto/admin.dto";
import type { AdminLoginInput } from "@/lib/validators/admin";

import { apiFetch } from "./http";

/** Typed calls into the admin endpoints — ARCHITECTURE §6 step 7. */

export interface AdminLoginResponse {
  admin: AdminDto;
}

export const adminApi = {
  login(input: AdminLoginInput): Promise<AdminLoginResponse> {
    return apiFetch<AdminLoginResponse>("/api/v1/admin/login", {
      method: "POST",
      json: input,
    });
  },

  logout(): Promise<{ signedOut: boolean }> {
    return apiFetch<{ signedOut: boolean }>("/api/v1/admin/logout", {
      method: "POST",
    });
  },

  me(): Promise<{ admin: AdminDto }> {
    return apiFetch<{ admin: AdminDto }>("/api/v1/admin/me", {
      method: "GET",
      cache: "no-store",
    });
  },
};
