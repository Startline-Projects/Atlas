/**
 * Candidate profile domain — ARCHITECTURE §6 step 1.
 *
 * The full profile a candidate builds after signup (PROJECT_SCOPE §2.2):
 * basics, skills, languages, work history, education, certifications and
 * portfolio. Pure types and constants — importable from any layer.
 */

import type { RoleCategory } from "./candidate";

/* -------------------------------------------------------------------------- */
/* Enumerations                                                               */
/* -------------------------------------------------------------------------- */

export const AVAILABILITY_OPTIONS = [
  { value: "IMMEDIATELY", label: "Available now" },
  { value: "WITHIN_2_WEEKS", label: "Within 2 weeks" },
  { value: "WITHIN_1_MONTH", label: "Within a month" },
  { value: "NOT_AVAILABLE", label: "Not looking right now" },
] as const;

export type Availability = (typeof AVAILABILITY_OPTIONS)[number]["value"];

export const AVAILABILITY_VALUES = AVAILABILITY_OPTIONS.map((o) => o.value) as
  readonly Availability[];

export function availabilityLabel(value: Availability): string {
  return AVAILABILITY_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export const LANGUAGE_PROFICIENCIES = [
  { value: "BASIC", label: "Basic" },
  { value: "CONVERSATIONAL", label: "Conversational" },
  { value: "FLUENT", label: "Fluent" },
  { value: "NATIVE", label: "Native / bilingual" },
] as const;

export type LanguageProficiency =
  (typeof LANGUAGE_PROFICIENCIES)[number]["value"];

export const LANGUAGE_PROFICIENCY_VALUES = LANGUAGE_PROFICIENCIES.map(
  (o) => o.value,
) as readonly LanguageProficiency[];

export function languageProficiencyLabel(value: LanguageProficiency): string {
  return (
    LANGUAGE_PROFICIENCIES.find((o) => o.value === value)?.label ?? value
  );
}

/* -------------------------------------------------------------------------- */
/* Limits — one place, shared by validator, service and UI copy               */
/* -------------------------------------------------------------------------- */

export const PROFILE_LIMITS = {
  headline: 120,
  bio: 2000,
  skills: 30,
  languages: 10,
  experiences: 20,
  education: 10,
  certifications: 20,
  /** PROJECT_SCOPE §2.2 — "Portfolio (up to 6 items)". */
  portfolio: 6,
  hourlyRateMinCents: 100,
  hourlyRateMaxCents: 100_000,
  hoursPerWeekMax: 80,
} as const;

/* -------------------------------------------------------------------------- */
/* Entities                                                                   */
/* -------------------------------------------------------------------------- */

export interface Skill {
  id: string;
  name: string;
  slug: string;
}

export interface CandidateLanguage {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  description: string | null;
  verified: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startYear: number | null;
  endYear: number | null;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string | null;
  issuedYear: number | null;
  credentialUrl: string | null;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
}

/** The whole profile, as the builder and the client-facing view both read it. */
export interface CandidateProfile {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  roleCategory: RoleCategory;
  headline: string | null;
  bio: string | null;
  photoUrl: string | null;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  hourlyRateCents: number | null;
  hoursPerWeek: number | null;
  availability: Availability | null;
  skills: Skill[];
  languages: CandidateLanguage[];
  experiences: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  portfolio: PortfolioItem[];
  createdAt: Date;
  updatedAt: Date;
}

/* -------------------------------------------------------------------------- */
/* Inputs                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Every field optional: a PATCH sends only what changed. `null` clears.
 * `| undefined` is spelled out because the project compiles with
 * `exactOptionalPropertyTypes` and these are fed straight from Zod output.
 */
export interface UpdateProfileBasicsInput {
  fullName?: string | undefined;
  headline?: string | null | undefined;
  bio?: string | null | undefined;
  photoUrl?: string | null | undefined;
  countryCode?: string | null | undefined;
  city?: string | null | undefined;
  hourlyRateCents?: number | null | undefined;
  hoursPerWeek?: number | null | undefined;
  availability?: Availability | null | undefined;
}

export interface LanguageInput {
  language: string;
  proficiency: LanguageProficiency;
}

export interface WorkExperienceInput {
  title: string;
  company: string;
  location?: string | null | undefined;
  startDate: Date;
  endDate?: Date | null | undefined;
  isCurrent: boolean;
  description?: string | null | undefined;
}

export interface EducationInput {
  school: string;
  degree?: string | null | undefined;
  fieldOfStudy?: string | null | undefined;
  startYear?: number | null | undefined;
  endYear?: number | null | undefined;
}

export interface CertificationInput {
  name: string;
  issuer?: string | null | undefined;
  issuedYear?: number | null | undefined;
  credentialUrl?: string | null | undefined;
}

export interface PortfolioItemInput {
  title: string;
  description?: string | null | undefined;
  imageUrl?: string | null | undefined;
  linkUrl?: string | null | undefined;
}

/**
 * The list-shaped parts of the profile are saved whole ("replace this
 * section") rather than row by row — the lists are short and the builder
 * edits them locally, so one PUT per section is simpler for both sides.
 */
export const PROFILE_SECTIONS = [
  "skills",
  "languages",
  "experiences",
  "education",
  "certifications",
  "portfolio",
] as const;

export type ProfileSection = (typeof PROFILE_SECTIONS)[number];

export interface ProfileSectionInputs {
  /** Skill names — resolved to `Skill` rows by the service. */
  skills: string[];
  languages: LanguageInput[];
  experiences: WorkExperienceInput[];
  education: EducationInput[];
  certifications: CertificationInput[];
  portfolio: PortfolioItemInput[];
}

/* -------------------------------------------------------------------------- */
/* Profile strength                                                           */
/* -------------------------------------------------------------------------- */

export interface ProfileStrengthItem {
  key: string;
  label: string;
  points: number;
  done: boolean;
}

export interface ProfileStrength {
  /** 0–100. */
  score: number;
  items: ProfileStrengthItem[];
}

export interface CandidateProfileView {
  profile: CandidateProfile;
  strength: ProfileStrength;
}
