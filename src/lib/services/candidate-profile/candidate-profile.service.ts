import type {
  CandidateProfile,
  CandidateProfileView,
  ProfileSection,
  ProfileSectionInputs,
  Skill,
  UpdateProfileBasicsInput,
} from "@/lib/domain/candidate-profile";
import { PROFILE_LIMITS } from "@/lib/domain/candidate-profile";
import { countryName } from "@/lib/domain/countries";
import { skillSlug } from "@/lib/domain/skill";
import { BusinessRuleError, NotFoundError, ValidationError } from "@/lib/errors";
import { STORAGE_BUCKETS, uploadPublicFile } from "@/lib/integrations/supabase";
import { candidateProfileRepository } from "@/lib/repositories/candidate-profile";
import type { UpdateProfileBasicsRecord } from "@/lib/repositories/candidate-profile";
import type { UploadKind } from "@/lib/validators/candidate-profile";
import { IMAGE_UPLOAD } from "@/lib/validators/candidate-profile";

import { computeProfileStrength } from "./profile-strength";

/**
 * Candidate profile service — ARCHITECTURE §6 step 5.
 *
 * Every method is scoped by `userId`, which the API layer takes from the
 * session — a candidate can only ever read or write their own profile.
 * Client-facing reads (browse / view a candidate) will land in a separate
 * service with its own permission checks.
 */

async function requireProfile(userId: string): Promise<CandidateProfile> {
  const profile = await candidateProfileRepository.findByUserId(userId);
  if (!profile) {
    throw new NotFoundError("We could not find your candidate profile.");
  }
  return profile;
}

function withStrength(profile: CandidateProfile): CandidateProfileView {
  return { profile, strength: computeProfileStrength(profile) };
}

/** Re-exported for existing callers; the helper itself lives in `lib/domain/skill`. */
export { skillSlug };

export const candidateProfileService = {
  async getOwn(userId: string): Promise<CandidateProfileView> {
    return withStrength(await requireProfile(userId));
  },

  async updateBasics(
    userId: string,
    input: UpdateProfileBasicsInput,
  ): Promise<CandidateProfileView> {
    const profile = await requireProfile(userId);

    const record: UpdateProfileBasicsRecord = { ...input };
    // Country name and code move together so a display never has one
    // without the other.
    if ("countryCode" in input) {
      record.countryCode = input.countryCode ?? null;
      record.country = input.countryCode ? countryName(input.countryCode) : null;
    }

    return withStrength(
      await candidateProfileRepository.updateBasics(profile.id, record),
    );
  },

  async replaceSection<S extends ProfileSection>(
    userId: string,
    section: S,
    items: ProfileSectionInputs[S],
  ): Promise<CandidateProfileView> {
    const profile = await requireProfile(userId);

    switch (section) {
      case "skills": {
        const seen = new Set<string>();
        const refs = (items as ProfileSectionInputs["skills"]).flatMap((raw) => {
          const name = raw.trim().replace(/\s+/g, " ");
          const slug = skillSlug(name);
          if (!slug || seen.has(slug)) return [];
          seen.add(slug);
          return [{ name, slug }];
        });
        if (refs.length > PROFILE_LIMITS.skills) {
          throw new ValidationError(
            `Add up to ${PROFILE_LIMITS.skills} skills.`,
          );
        }
        return withStrength(
          await candidateProfileRepository.replaceSkills(profile.id, refs),
        );
      }
      case "languages":
        return withStrength(
          await candidateProfileRepository.replaceLanguages(
            profile.id,
            items as ProfileSectionInputs["languages"],
          ),
        );
      case "experiences":
        return withStrength(
          await candidateProfileRepository.replaceExperiences(
            profile.id,
            items as ProfileSectionInputs["experiences"],
          ),
        );
      case "education":
        return withStrength(
          await candidateProfileRepository.replaceEducation(
            profile.id,
            items as ProfileSectionInputs["education"],
          ),
        );
      case "certifications":
        return withStrength(
          await candidateProfileRepository.replaceCertifications(
            profile.id,
            items as ProfileSectionInputs["certifications"],
          ),
        );
      case "portfolio": {
        const list = items as ProfileSectionInputs["portfolio"];
        if (list.length > PROFILE_LIMITS.portfolio) {
          throw new BusinessRuleError(
            `Your portfolio holds up to ${PROFILE_LIMITS.portfolio} items.`,
          );
        }
        return withStrength(
          await candidateProfileRepository.replacePortfolio(profile.id, list),
        );
      }
      default: {
        const never: never = section;
        throw new ValidationError(`Unknown profile section: ${String(never)}`);
      }
    }
  },

  /**
   * Stores an image and returns its public URL. For avatars the profile is
   * updated in the same call; portfolio images are returned for the builder
   * to attach to an item, which is saved with the section.
   */
  async uploadImage(
    userId: string,
    kind: UploadKind,
    file: { bytes: Uint8Array; contentType: string; size: number },
  ): Promise<{ url: string; view: CandidateProfileView | null }> {
    const profile = await requireProfile(userId);

    if (
      !(IMAGE_UPLOAD.contentTypes as readonly string[]).includes(
        file.contentType,
      )
    ) {
      throw new ValidationError("Upload a JPEG, PNG or WebP image.", {
        file: "Upload a JPEG, PNG or WebP image.",
      });
    }
    if (file.size > IMAGE_UPLOAD.maxBytes) {
      throw new ValidationError("Images are limited to 5 MB.", {
        file: "Images are limited to 5 MB.",
      });
    }

    const ext = file.contentType.split("/")[1] === "jpeg" ? "jpg" : file.contentType.split("/")[1];
    const url = await uploadPublicFile({
      bucket: kind === "avatar" ? STORAGE_BUCKETS.avatars : STORAGE_BUCKETS.portfolio,
      path: `${profile.id}/${kind}-${Date.now()}.${ext}`,
      bytes: file.bytes,
      contentType: file.contentType,
    });

    if (kind === "avatar") {
      const updated = await candidateProfileRepository.updateBasics(profile.id, {
        photoUrl: url,
      });
      return { url, view: withStrength(updated) };
    }

    return { url, view: null };
  },

  async searchSkills(query: string, limit: number): Promise<Skill[]> {
    return candidateProfileRepository.searchSkills(query, limit);
  },
};
