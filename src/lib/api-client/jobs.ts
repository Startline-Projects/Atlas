import type { JobDto, JobListDto } from "@/lib/api/dto/job.dto";
import type { ListJobsQuery } from "@/lib/validators/job";

import { apiFetch } from "./http";

/**
 * Typed calls into the candidate-facing job endpoints — ARCHITECTURE §6
 * step 7. The browse page is a Server Component, so every call takes an
 * `init` (from `serverInit()`) that carries the visitor's cookies.
 */

/** Only the filters a caller actually set end up in the query string. */
function toSearchParams(query: Partial<ListJobsQuery>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
}

export const jobsApi = {
  list(query: Partial<ListJobsQuery> = {}, init?: RequestInit): Promise<JobListDto> {
    return apiFetch<JobListDto>(`/api/v1/jobs${toSearchParams(query)}`, {
      method: "GET",
      cache: "no-store",
      ...init,
    });
  },

  get(id: string, init?: RequestInit): Promise<{ job: JobDto }> {
    return apiFetch<{ job: JobDto }>(`/api/v1/jobs/${encodeURIComponent(id)}`, {
      method: "GET",
      cache: "no-store",
      ...init,
    });
  },
};
