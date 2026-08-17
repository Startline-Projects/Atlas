import { z } from "zod";

import { ROLE_CATEGORY_VALUES } from "@/lib/domain/candidate";
import { JOB_DURATION_VALUES, JOB_LIMITS, JOB_STATUSES } from "@/lib/domain/job";

/**
 * Job boundary schemas — ARCHITECTURE §7.3.
 *
 * `createJobSchema` is shared by `POST /api/v1/clients/me/jobs` and the
 * client's "Post a job" form; `listJobsQuerySchema` parses the candidate's
 * browse query string. Rates travel as USD cents on the wire — the form
 * converts dollars → cents before it validates.
 */

const roleCategoryEnum = z.enum(
  ROLE_CATEGORY_VALUES as unknown as [string, ...string[]],
  { message: "Pick a category." },
);

const rateCentsSchema = z.coerce
  .number()
  .int("Rates are whole cents.")
  .min(JOB_LIMITS.hourlyRateMinCents, "Enter an hourly rate of at least $1.")
  .max(JOB_LIMITS.hourlyRateMaxCents, "Enter an hourly rate of at most $1,000.");

export const createJobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(4, "Give the role a title.")
      .max(JOB_LIMITS.title, `Keep the title under ${JOB_LIMITS.title} characters.`),

    description: z
      .string()
      .trim()
      .min(
        JOB_LIMITS.descriptionMin,
        `Describe the role in at least ${JOB_LIMITS.descriptionMin} characters.`,
      )
      .max(
        JOB_LIMITS.description,
        `Keep the description under ${JOB_LIMITS.description} characters.`,
      ),

    category: roleCategoryEnum,

    skills: z
      .array(z.string().trim().min(1).max(40, "That skill name is too long."))
      .max(JOB_LIMITS.skills, `Add up to ${JOB_LIMITS.skills} skills.`)
      .default([]),

    hourlyRateMinCents: rateCentsSchema,
    hourlyRateMaxCents: rateCentsSchema,

    hoursPerWeek: z.coerce
      .number()
      .int()
      .min(JOB_LIMITS.hoursPerWeekMin, "Pick the weekly commitment.")
      .max(JOB_LIMITS.hoursPerWeekMax, "That is more than a working week."),

    duration: z.enum(JOB_DURATION_VALUES as unknown as [string, ...string[]], {
      message: "Pick the expected duration.",
    }),

    timezoneNote: z
      .string()
      .trim()
      .max(JOB_LIMITS.timezoneNote, "Keep the timezone note short.")
      .optional()
      .transform((v) => (v ? v : null)),
  })
  .refine((v) => v.hourlyRateMinCents <= v.hourlyRateMaxCents, {
    message: "The maximum rate must be at least the minimum.",
    path: ["hourlyRateMaxCents"],
  });

export type CreateJobInputWire = z.infer<typeof createJobSchema>;

/**
 * Query-string filters for the candidate browse page. Everything is optional
 * and coerced from strings; blanks are dropped so `?category=` means "any".
 */
const blankToUndefined = (v: unknown) => (v === "" || v === null ? undefined : v);

export const listJobsQuerySchema = z.object({
  category: z.preprocess(blankToUndefined, roleCategoryEnum.optional()),
  minRateCents: z.preprocess(
    blankToUndefined,
    z.coerce.number().int().min(0).max(JOB_LIMITS.hourlyRateMaxCents).optional(),
  ),
  maxRateCents: z.preprocess(
    blankToUndefined,
    z.coerce.number().int().min(0).max(JOB_LIMITS.hourlyRateMaxCents).optional(),
  ),
  minHoursPerWeek: z.preprocess(
    blankToUndefined,
    z.coerce.number().int().min(1).max(JOB_LIMITS.hoursPerWeekMax).optional(),
  ),
  q: z.preprocess(blankToUndefined, z.string().trim().max(80).optional()),
  limit: z.coerce.number().int().min(1).max(JOB_LIMITS.pageSize).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type ListJobsQuery = z.infer<typeof listJobsQuerySchema>;

/** The only client-side status change for now: withdrawing the posting. */
export const updateJobStatusSchema = z.object({
  status: z.enum(JOB_STATUSES).refine((s) => s === "CLOSED", {
    message: "Only closing a job is supported.",
  }),
});

export type UpdateJobStatusInput = z.infer<typeof updateJobStatusSchema>;
