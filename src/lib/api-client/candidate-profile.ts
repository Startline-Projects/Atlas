import type {
  CandidateProfileViewDto,
  SkillDto,
} from "@/lib/api/dto/candidate-profile.dto";
import type { ProfileSection } from "@/lib/domain/candidate-profile";
import type {
  UpdateProfileBasicsPayload,
  UploadKind,
} from "@/lib/validators/candidate-profile";

import { apiFetch } from "./http";

/**
 * Typed calls into the candidate profile endpoints — ARCHITECTURE §6 step 7.
 *
 * Section payloads are typed loosely (`unknown[]`) on purpose: the builder
 * sends form-shaped rows (month strings, "" for empty) and the server's Zod
 * schema is what turns them into domain values.
 */

export interface UploadResponse {
  url: string;
  /** Present for `avatar` uploads, which also update the profile. */
  view: CandidateProfileViewDto | null;
}

export const candidateProfileApi = {
  get(): Promise<CandidateProfileViewDto> {
    return apiFetch<CandidateProfileViewDto>("/api/v1/candidates/me/profile", {
      method: "GET",
      cache: "no-store",
    });
  },

  updateBasics(input: UpdateProfileBasicsPayload): Promise<CandidateProfileViewDto> {
    return apiFetch<CandidateProfileViewDto>("/api/v1/candidates/me/profile", {
      method: "PATCH",
      json: input,
    });
  },

  replaceSection(
    section: ProfileSection,
    items: unknown[],
  ): Promise<CandidateProfileViewDto> {
    return apiFetch<CandidateProfileViewDto>(
      `/api/v1/candidates/me/profile/${section}`,
      { method: "PUT", json: items },
    );
  },

  upload(kind: UploadKind, file: File): Promise<UploadResponse> {
    const form = new FormData();
    form.set("kind", kind);
    form.set("file", file);
    return apiFetch<UploadResponse>("/api/v1/candidates/me/uploads", {
      method: "POST",
      body: form,
    });
  },

  searchSkills(q: string): Promise<{ skills: SkillDto[] }> {
    const params = new URLSearchParams({ q });
    return apiFetch<{ skills: SkillDto[] }>(`/api/v1/skills?${params}`, {
      method: "GET",
    });
  },
};
