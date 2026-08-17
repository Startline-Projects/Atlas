/**
 * Job domain — ARCHITECTURE §6 step 1.
 *
 * A job is a role a client posts (PROJECT_SCOPE §2.3 "Post a job") and a
 * candidate browses (§2.2 "Browse open jobs — filter by category, rate,
 * hours") before submitting a proposal. Posting is free and, in the MVP, a
 * job goes live the moment it is posted — Talent-Specialist review of a
 * posting is Phase 2 (see the marketing `how-it-works` page).
 *
 * Pure types and constants — no Prisma, no Zod, no React.
 */

import type { RoleCategory } from "./candidate";

/* -------------------------------------------------------------------------- */
/* Enum-likes                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `OPEN`   — accepting proposals; visible to candidates.
 * `CLOSED` — withdrawn by the client; hidden from browse, still viewable by
 *            direct link so nothing a candidate bookmarked 404s.
 * `FILLED` — reserved for the hire → contract slice; not set anywhere yet.
 */
export const JOB_STATUSES = ["OPEN", "CLOSED", "FILLED"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

/** How long the client expects the engagement to run. */
export const JOB_DURATIONS = [
  { value: "SHORT_TERM", label: "Less than a month" },
  { value: "ONE_TO_THREE_MONTHS", label: "1–3 months" },
  { value: "THREE_TO_SIX_MONTHS", label: "3–6 months" },
  { value: "ONGOING", label: "Ongoing / open-ended" },
] as const;

export type JobDuration = (typeof JOB_DURATIONS)[number]["value"];

export const JOB_DURATION_VALUES = JOB_DURATIONS.map((d) => d.value) as
  readonly JobDuration[];

export function jobDurationLabel(value: JobDuration): string {
  return JOB_DURATIONS.find((d) => d.value === value)?.label ?? value;
}

/**
 * The commitment choices a client can post. A candidate's "hours" filter is
 * "at least N hours a week", so the same list drives both selects.
 */
export const HOURS_PER_WEEK_OPTIONS = [10, 20, 30, 40] as const;

/* -------------------------------------------------------------------------- */
/* Limits                                                                     */
/* -------------------------------------------------------------------------- */

export const JOB_LIMITS = {
  title: 100,
  descriptionMin: 80,
  description: 5000,
  skills: 15,
  timezoneNote: 120,
  /** USD cents — same bounds as a candidate's hourly rate. */
  hourlyRateMinCents: 100,
  hourlyRateMaxCents: 100_000,
  hoursPerWeekMin: 1,
  hoursPerWeekMax: 80,
  /** Ceiling on a single browse page, whatever the caller asks. */
  pageSize: 50,
} as const;

/* -------------------------------------------------------------------------- */
/* Entities                                                                   */
/* -------------------------------------------------------------------------- */

/** The slice of the poster a candidate is allowed to see on a job. */
export interface JobClientSummary {
  id: string;
  companyName: string;
  country: string | null;
  countryCode: string | null;
}

export interface Job {
  id: string;
  client: JobClientSummary;
  title: string;
  description: string;
  category: RoleCategory;
  /** Tag names in the order the client entered them. */
  skills: string[];
  hourlyRateMinCents: number;
  hourlyRateMaxCents: number;
  hoursPerWeek: number;
  duration: JobDuration;
  /** Free text — "4h overlap with CET", "Any timezone". */
  timezoneNote: string | null;
  status: JobStatus;
  publishedAt: Date;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobInput {
  title: string;
  description: string;
  category: RoleCategory;
  skills: string[];
  hourlyRateMinCents: number;
  hourlyRateMaxCents: number;
  hoursPerWeek: number;
  duration: JobDuration;
  timezoneNote?: string | null | undefined;
}

/** Candidate-side browse filters (PROJECT_SCOPE §2.2). All optional. */
export interface ListJobsFilters {
  category?: RoleCategory | undefined;
  /** Only jobs whose rate range reaches at least this (USD cents). */
  minRateCents?: number | undefined;
  /** Only jobs whose rate range starts at or below this (USD cents). */
  maxRateCents?: number | undefined;
  /** Only jobs asking for at least this many hours a week. */
  minHoursPerWeek?: number | undefined;
  /** Case-insensitive match on title, description or skill name. */
  q?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface JobList {
  jobs: Job[];
  total: number;
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                 */
/* -------------------------------------------------------------------------- */

/** 2500 → "$25", 2550 → "$25.50". */
export function formatUsdFromCents(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars)
    ? `$${dollars.toLocaleString("en-US")}`
    : `$${dollars.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
}

/** "$25–$40/hr", or "$30/hr" when min equals max. */
export function formatRateRange(minCents: number, maxCents: number): string {
  if (minCents === maxCents) return `${formatUsdFromCents(minCents)}/hr`;
  return `${formatUsdFromCents(minCents)}–${formatUsdFromCents(maxCents)}/hr`;
}
