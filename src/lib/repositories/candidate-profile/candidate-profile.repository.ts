import type { Prisma } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type { RoleCategory } from "@/lib/domain/candidate";
import type {
  Availability,
  CandidateProfile,
  CertificationInput,
  EducationInput,
  LanguageInput,
  LanguageProficiency,
  PortfolioItemInput,
  Skill,
  UpdateProfileBasicsInput,
  WorkExperienceInput,
} from "@/lib/domain/candidate-profile";

/**
 * Candidate profile repository — ARCHITECTURE §6 step 4.
 *
 * Reads the profile with every list joined in one query and returns the
 * domain shape. Section writes are "replace all": delete the rows for that
 * section and insert the new list inside a transaction, so a half-applied
 * edit can never be observed.
 */

const NOT_DELETED = { deletedAt: null } as const;

const fullInclude = {
  user: { select: { email: true } },
  skills: {
    include: { skill: true },
    orderBy: { sortOrder: "asc" },
  },
  languages: { orderBy: { sortOrder: "asc" } },
  experiences: { orderBy: { sortOrder: "asc" } },
  education: { orderBy: { sortOrder: "asc" } },
  certifications: { orderBy: { sortOrder: "asc" } },
  portfolio: { orderBy: { sortOrder: "asc" } },
} satisfies Prisma.CandidateProfileInclude;

type ProfileRow = Prisma.CandidateProfileGetPayload<{
  include: typeof fullInclude;
}>;

function toSkill(row: { id: string; name: string; slug: string }): Skill {
  return { id: row.id, name: row.name, slug: row.slug };
}

function toProfile(row: ProfileRow): CandidateProfile {
  return {
    id: row.id,
    userId: row.userId,
    email: row.user.email,
    fullName: row.fullName,
    roleCategory: row.roleCategory as RoleCategory,
    headline: row.headline,
    bio: row.bio,
    photoUrl: row.photoUrl,
    country: row.country,
    countryCode: row.countryCode,
    city: row.city,
    hourlyRateCents: row.hourlyRateCents,
    hoursPerWeek: row.hoursPerWeek,
    availability: row.availability as Availability | null,
    skills: row.skills.map((s) => toSkill(s.skill)),
    languages: row.languages.map((l) => ({
      id: l.id,
      language: l.language,
      proficiency: l.proficiency as LanguageProficiency,
    })),
    experiences: row.experiences.map((e) => ({
      id: e.id,
      title: e.title,
      company: e.company,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate,
      isCurrent: e.isCurrent,
      description: e.description,
      verified: e.verified,
    })),
    education: row.education.map((e) => ({
      id: e.id,
      school: e.school,
      degree: e.degree,
      fieldOfStudy: e.fieldOfStudy,
      startYear: e.startYear,
      endYear: e.endYear,
    })),
    certifications: row.certifications.map((c) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      issuedYear: c.issuedYear,
      credentialUrl: c.credentialUrl,
    })),
    portfolio: row.portfolio.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      linkUrl: p.linkUrl,
    })),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** `countryCode` arrives resolved to a `country` name by the service. */
export interface UpdateProfileBasicsRecord extends UpdateProfileBasicsInput {
  country?: string | null | undefined;
}

/**
 * Prisma reads an explicit `undefined` as "set to undefined" under
 * `exactOptionalPropertyTypes`, so absent keys are dropped before the write.
 */
function definedOnly<T extends object>(input: T): Prisma.CandidateProfileUpdateInput {
  return Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== undefined),
  ) as Prisma.CandidateProfileUpdateInput;
}

export interface SkillRef {
  name: string;
  slug: string;
}

export const candidateProfileRepository = {
  async findByUserId(userId: string): Promise<CandidateProfile | null> {
    const row = await getPrisma().candidateProfile.findFirst({
      where: { userId, user: NOT_DELETED },
      include: fullInclude,
    });

    return row ? toProfile(row) : null;
  },

  async findById(id: string): Promise<CandidateProfile | null> {
    const row = await getPrisma().candidateProfile.findFirst({
      where: { id, user: NOT_DELETED },
      include: fullInclude,
    });

    return row ? toProfile(row) : null;
  },

  async updateBasics(
    profileId: string,
    input: UpdateProfileBasicsRecord,
  ): Promise<CandidateProfile> {
    const row = await getPrisma().candidateProfile.update({
      where: { id: profileId },
      data: definedOnly(input),
      include: fullInclude,
    });

    return toProfile(row);
  },

  /**
   * Attaches the given tags, creating any that do not exist yet. Order of the
   * input is preserved as `sortOrder` so the profile shows them as entered.
   */
  async replaceSkills(
    profileId: string,
    skills: SkillRef[],
  ): Promise<CandidateProfile> {
    const prisma = getPrisma();

    const row = await prisma.$transaction(async (tx) => {
      const ids: string[] = [];
      for (const s of skills) {
        const skill = await tx.skill.upsert({
          where: { slug: s.slug },
          create: { name: s.name, slug: s.slug },
          update: {},
          select: { id: true },
        });
        ids.push(skill.id);
      }

      await tx.candidateSkill.deleteMany({ where: { profileId } });
      if (ids.length > 0) {
        await tx.candidateSkill.createMany({
          data: ids.map((skillId, i) => ({ profileId, skillId, sortOrder: i })),
        });
      }

      return tx.candidateProfile.findUniqueOrThrow({
        where: { id: profileId },
        include: fullInclude,
      });
    });

    return toProfile(row);
  },

  async replaceLanguages(
    profileId: string,
    items: LanguageInput[],
  ): Promise<CandidateProfile> {
    const prisma = getPrisma();
    const row = await prisma.$transaction(async (tx) => {
      await tx.candidateLanguage.deleteMany({ where: { profileId } });
      if (items.length > 0) {
        await tx.candidateLanguage.createMany({
          data: items.map((l, i) => ({ ...l, profileId, sortOrder: i })),
        });
      }
      return tx.candidateProfile.findUniqueOrThrow({
        where: { id: profileId },
        include: fullInclude,
      });
    });
    return toProfile(row);
  },

  async replaceExperiences(
    profileId: string,
    items: WorkExperienceInput[],
  ): Promise<CandidateProfile> {
    const prisma = getPrisma();
    const row = await prisma.$transaction(async (tx) => {
      await tx.workExperience.deleteMany({ where: { profileId } });
      if (items.length > 0) {
        await tx.workExperience.createMany({
          data: items.map((e, i) => ({
            profileId,
            title: e.title,
            company: e.company,
            location: e.location ?? null,
            startDate: e.startDate,
            endDate: e.isCurrent ? null : (e.endDate ?? null),
            isCurrent: e.isCurrent,
            description: e.description ?? null,
            sortOrder: i,
          })),
        });
      }
      return tx.candidateProfile.findUniqueOrThrow({
        where: { id: profileId },
        include: fullInclude,
      });
    });
    return toProfile(row);
  },

  async replaceEducation(
    profileId: string,
    items: EducationInput[],
  ): Promise<CandidateProfile> {
    const prisma = getPrisma();
    const row = await prisma.$transaction(async (tx) => {
      await tx.education.deleteMany({ where: { profileId } });
      if (items.length > 0) {
        await tx.education.createMany({
          data: items.map((e, i) => ({
            profileId,
            school: e.school,
            degree: e.degree ?? null,
            fieldOfStudy: e.fieldOfStudy ?? null,
            startYear: e.startYear ?? null,
            endYear: e.endYear ?? null,
            sortOrder: i,
          })),
        });
      }
      return tx.candidateProfile.findUniqueOrThrow({
        where: { id: profileId },
        include: fullInclude,
      });
    });
    return toProfile(row);
  },

  async replaceCertifications(
    profileId: string,
    items: CertificationInput[],
  ): Promise<CandidateProfile> {
    const prisma = getPrisma();
    const row = await prisma.$transaction(async (tx) => {
      await tx.certification.deleteMany({ where: { profileId } });
      if (items.length > 0) {
        await tx.certification.createMany({
          data: items.map((c, i) => ({
            profileId,
            name: c.name,
            issuer: c.issuer ?? null,
            issuedYear: c.issuedYear ?? null,
            credentialUrl: c.credentialUrl ?? null,
            sortOrder: i,
          })),
        });
      }
      return tx.candidateProfile.findUniqueOrThrow({
        where: { id: profileId },
        include: fullInclude,
      });
    });
    return toProfile(row);
  },

  async replacePortfolio(
    profileId: string,
    items: PortfolioItemInput[],
  ): Promise<CandidateProfile> {
    const prisma = getPrisma();
    const row = await prisma.$transaction(async (tx) => {
      await tx.portfolioItem.deleteMany({ where: { profileId } });
      if (items.length > 0) {
        await tx.portfolioItem.createMany({
          data: items.map((p, i) => ({
            profileId,
            title: p.title,
            description: p.description ?? null,
            imageUrl: p.imageUrl ?? null,
            linkUrl: p.linkUrl ?? null,
            sortOrder: i,
          })),
        });
      }
      return tx.candidateProfile.findUniqueOrThrow({
        where: { id: profileId },
        include: fullInclude,
      });
    });
    return toProfile(row);
  },

  /** Prefix search over the shared tag vocabulary, for the builder's typeahead. */
  async searchSkills(query: string, limit: number): Promise<Skill[]> {
    const rows = await getPrisma().skill.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      orderBy: [{ candidates: { _count: "desc" } }, { name: "asc" }],
      take: limit,
    });
    return rows.map(toSkill);
  },
};
