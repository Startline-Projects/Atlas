import { z } from "zod";

import {
  AVAILABILITY_VALUES,
  LANGUAGE_PROFICIENCY_VALUES,
  PROFILE_LIMITS,
  PROFILE_SECTIONS,
} from "@/lib/domain/candidate-profile";
import { isCountryCode } from "@/lib/domain/countries";

/**
 * Candidate profile boundary schemas — ARCHITECTURE §7.3.
 *
 * Shared by the API routes and the profile builder. Optional text fields
 * accept `""` from a form and store it as `null`, so "cleared" and "never set"
 * look the same in the database.
 */

const CURRENT_YEAR = new Date().getFullYear();

/** `""` → null; otherwise trimmed and length-checked. */
function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max, `Keep this under ${max} characters.`)
    .transform((v) => (v === "" ? null : v))
    .nullable()
    .optional();
}

function optionalUrl() {
  return z
    .string()
    .trim()
    .transform((v) => (v === "" ? null : v))
    .pipe(z.url("Enter a valid link, starting with https://").nullable())
    .nullable()
    .optional();
}

function optionalYear() {
  return z.coerce
    .number()
    .int()
    .min(1950, "Enter a year after 1950.")
    .max(CURRENT_YEAR + 6, "That year is too far in the future.")
    .nullable()
    .optional();
}

/** "YYYY-MM" from `<input type="month">` → first day of that month, UTC. */
const monthDate = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Pick a month.")
  .transform((v) => new Date(`${v}-01T00:00:00.000Z`));

const enumOf = <T extends string>(values: readonly T[], message: string) =>
  z.enum(values as unknown as [T, ...T[]], { message });

/* -------------------------------------------------------------------------- */
/* Basics                                                                     */
/* -------------------------------------------------------------------------- */

export const updateProfileBasicsSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "That name is too long.")
      .optional(),
    headline: optionalText(PROFILE_LIMITS.headline),
    bio: optionalText(PROFILE_LIMITS.bio),
    photoUrl: optionalUrl(),
    countryCode: z
      .string()
      .trim()
      .toUpperCase()
      .transform((v) => (v === "" ? null : v))
      .refine((v) => v === null || isCountryCode(v), "Pick a country.")
      .nullable()
      .optional(),
    city: optionalText(80),
    hourlyRateCents: z.coerce
      .number()
      .int()
      .min(PROFILE_LIMITS.hourlyRateMinCents, "Enter a rate of at least $1.")
      .max(PROFILE_LIMITS.hourlyRateMaxCents, "That rate is above the limit.")
      .nullable()
      .optional(),
    hoursPerWeek: z.coerce
      .number()
      .int()
      .min(1, "Enter at least 1 hour.")
      .max(PROFILE_LIMITS.hoursPerWeekMax, "That is more than a week has.")
      .nullable()
      .optional(),
    availability: enumOf(AVAILABILITY_VALUES, "Pick your availability.")
      .nullable()
      .optional(),
  })
  .strict();

export type UpdateProfileBasicsPayload = z.input<
  typeof updateProfileBasicsSchema
>;

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

export const skillsSectionSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1, "Enter a skill.")
      .max(60, "Keep each skill under 60 characters."),
  )
  .max(PROFILE_LIMITS.skills, `Add up to ${PROFILE_LIMITS.skills} skills.`);

export const languagesSectionSchema = z
  .array(
    z.object({
      language: z
        .string()
        .trim()
        .min(2, "Enter a language.")
        .max(60, "That name is too long."),
      proficiency: enumOf(
        LANGUAGE_PROFICIENCY_VALUES,
        "Pick a proficiency level.",
      ),
    }),
  )
  .max(PROFILE_LIMITS.languages, `Add up to ${PROFILE_LIMITS.languages} languages.`);

export const workExperienceSchema = z
  .object({
    title: z.string().trim().min(2, "Enter the job title.").max(120),
    company: z.string().trim().min(1, "Enter the company.").max(120),
    location: optionalText(120),
    startDate: monthDate,
    endDate: z
      .string()
      .transform((v) => (v === "" ? null : v))
      .pipe(monthDate.nullable())
      .nullable()
      .optional(),
    isCurrent: z.boolean().default(false),
    description: optionalText(1500),
  })
  .superRefine((v, ctx) => {
    if (!v.isCurrent && !v.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "Add an end date, or mark this as your current role.",
      });
    }
    if (v.endDate && v.endDate < v.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "The end date is before the start date.",
      });
    }
  });

export const experiencesSectionSchema = z
  .array(workExperienceSchema)
  .max(PROFILE_LIMITS.experiences, `Add up to ${PROFILE_LIMITS.experiences} roles.`);

export const educationSchema = z
  .object({
    school: z.string().trim().min(2, "Enter the school.").max(160),
    degree: optionalText(120),
    fieldOfStudy: optionalText(120),
    startYear: optionalYear(),
    endYear: optionalYear(),
  })
  .refine((v) => !v.startYear || !v.endYear || v.endYear >= v.startYear, {
    path: ["endYear"],
    message: "The end year is before the start year.",
  });

export const educationSectionSchema = z
  .array(educationSchema)
  .max(PROFILE_LIMITS.education, `Add up to ${PROFILE_LIMITS.education} entries.`);

export const certificationSchema = z.object({
  name: z.string().trim().min(2, "Enter the certification name.").max(160),
  issuer: optionalText(120),
  issuedYear: optionalYear(),
  credentialUrl: optionalUrl(),
});

export const certificationsSectionSchema = z
  .array(certificationSchema)
  .max(
    PROFILE_LIMITS.certifications,
    `Add up to ${PROFILE_LIMITS.certifications} certifications.`,
  );

export const portfolioItemSchema = z.object({
  title: z.string().trim().min(2, "Give this item a title.").max(120),
  description: optionalText(600),
  imageUrl: optionalUrl(),
  linkUrl: optionalUrl(),
});

export const portfolioSectionSchema = z
  .array(portfolioItemSchema)
  .max(PROFILE_LIMITS.portfolio, `Your portfolio holds up to ${PROFILE_LIMITS.portfolio} items.`);

/** One lookup so the section route can validate by name. */
export const PROFILE_SECTION_SCHEMAS = {
  skills: skillsSectionSchema,
  languages: languagesSectionSchema,
  experiences: experiencesSectionSchema,
  education: educationSectionSchema,
  certifications: certificationsSectionSchema,
  portfolio: portfolioSectionSchema,
} as const;

export const profileSectionNameSchema = z.enum(
  PROFILE_SECTIONS as unknown as [string, ...string[]],
);

/* -------------------------------------------------------------------------- */
/* Skills search + uploads                                                    */
/* -------------------------------------------------------------------------- */

export const searchSkillsSchema = z.object({
  q: z.string().trim().min(1).max(60),
  limit: z.coerce.number().int().min(1).max(20).default(8),
});

export const UPLOAD_KINDS = ["avatar", "portfolio"] as const;
export type UploadKind = (typeof UPLOAD_KINDS)[number];

export const uploadKindSchema = z.enum(UPLOAD_KINDS, {
  message: "Unknown upload kind.",
});

export const IMAGE_UPLOAD = {
  maxBytes: 5 * 1024 * 1024,
  contentTypes: ["image/jpeg", "image/png", "image/webp"] as const,
} as const;
