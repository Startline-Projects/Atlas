import type { RoleCategory } from "@/lib/domain/candidate";
import type {
  Availability,
  CandidateProfile,
  CandidateProfileView,
  Certification,
  Education,
  LanguageProficiency,
  PortfolioItem,
  ProfileStrength,
  Skill,
  WorkExperience,
} from "@/lib/domain/candidate-profile";

/**
 * Wire shape of the candidate profile. Dates become strings once, here;
 * month-precision dates travel as "YYYY-MM" so `<input type="month">` can
 * round-trip them without a parser on the client.
 */

export interface WorkExperienceDto {
  id: string;
  title: string;
  company: string;
  location: string | null;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM" or null */
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  verified: boolean;
}

export interface CandidateLanguageDto {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
}

export type SkillDto = Skill;
export type EducationDto = Education;
export type CertificationDto = Certification;
export type PortfolioItemDto = PortfolioItem;

export interface CandidateProfileDto {
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
  skills: SkillDto[];
  languages: CandidateLanguageDto[];
  experiences: WorkExperienceDto[];
  education: EducationDto[];
  certifications: CertificationDto[];
  portfolio: PortfolioItemDto[];
  createdAt: string;
  updatedAt: string;
}

export type ProfileStrengthDto = ProfileStrength;

export interface CandidateProfileViewDto {
  profile: CandidateProfileDto;
  strength: ProfileStrengthDto;
}

function toMonth(date: Date): string {
  return date.toISOString().slice(0, 7);
}

function toExperienceDto(e: WorkExperience): WorkExperienceDto {
  return {
    id: e.id,
    title: e.title,
    company: e.company,
    location: e.location,
    startDate: toMonth(e.startDate),
    endDate: e.endDate ? toMonth(e.endDate) : null,
    isCurrent: e.isCurrent,
    description: e.description,
    verified: e.verified,
  };
}

export function toCandidateProfileDto(p: CandidateProfile): CandidateProfileDto {
  return {
    id: p.id,
    userId: p.userId,
    email: p.email,
    fullName: p.fullName,
    roleCategory: p.roleCategory,
    headline: p.headline,
    bio: p.bio,
    photoUrl: p.photoUrl,
    country: p.country,
    countryCode: p.countryCode,
    city: p.city,
    hourlyRateCents: p.hourlyRateCents,
    hoursPerWeek: p.hoursPerWeek,
    availability: p.availability,
    skills: p.skills,
    languages: p.languages,
    experiences: p.experiences.map(toExperienceDto),
    education: p.education,
    certifications: p.certifications,
    portfolio: p.portfolio,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export function toCandidateProfileViewDto(
  view: CandidateProfileView,
): CandidateProfileViewDto {
  return {
    profile: toCandidateProfileDto(view.profile),
    strength: view.strength,
  };
}
