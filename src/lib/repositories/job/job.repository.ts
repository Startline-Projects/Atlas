import type { Prisma } from "@prisma/client";

import { getPrisma } from "@/lib/db";
import type { RoleCategory } from "@/lib/domain/candidate";
import type {
  Job,
  JobDuration,
  JobList,
  JobStatus,
  ListJobsFilters,
} from "@/lib/domain/job";
import { JOB_LIMITS } from "@/lib/domain/job";

/**
 * Job repository — ARCHITECTURE §6 step 4.
 *
 * The only module that speaks Prisma for jobs. Returns domain objects, never
 * rows. Skills are attached through the shared `Skill` vocabulary exactly the
 * way `candidateProfileRepository.replaceSkills` does, so a job tag and a
 * candidate tag with the same slug are the same row.
 */

const jobInclude = {
  client: { select: { id: true, companyName: true, country: true, countryCode: true } },
  skills: { include: { skill: true }, orderBy: { sortOrder: "asc" } },
} satisfies Prisma.JobInclude;

type JobRow = Prisma.JobGetPayload<{ include: typeof jobInclude }>;

function toJob(row: JobRow): Job {
  return {
    id: row.id,
    client: {
      id: row.client.id,
      companyName: row.client.companyName,
      country: row.client.country,
      countryCode: row.client.countryCode,
    },
    title: row.title,
    description: row.description,
    category: row.category as RoleCategory,
    skills: row.skills.map((s) => s.skill.name),
    hourlyRateMinCents: row.hourlyRateMinCents,
    hourlyRateMaxCents: row.hourlyRateMaxCents,
    hoursPerWeek: row.hoursPerWeek,
    duration: row.duration as JobDuration,
    timezoneNote: row.timezoneNote,
    status: row.status as JobStatus,
    publishedAt: row.publishedAt,
    closedAt: row.closedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** A tag to attach: display name + its slug identity (see `domain/skill`). */
export interface SkillRef {
  name: string;
  slug: string;
}

export interface CreateJobRecord {
  clientProfileId: string;
  title: string;
  description: string;
  category: RoleCategory;
  skills: SkillRef[];
  hourlyRateMinCents: number;
  hourlyRateMaxCents: number;
  hoursPerWeek: number;
  duration: JobDuration;
  timezoneNote: string | null;
}

/** Newest first, whichever list is being read. */
const NEWEST_FIRST = { publishedAt: "desc" } as const;

export const jobRepository = {
  /**
   * Creates the job and its skill tags in one transaction, upserting any tag
   * that does not exist yet. Input order is kept as `sortOrder`.
   */
  async create(input: CreateJobRecord): Promise<Job> {
    const prisma = getPrisma();

    const row = await prisma.$transaction(async (tx) => {
      const skillIds: string[] = [];
      for (const s of input.skills) {
        const skill = await tx.skill.upsert({
          where: { slug: s.slug },
          create: { name: s.name, slug: s.slug },
          update: {},
          select: { id: true },
        });
        skillIds.push(skill.id);
      }

      return tx.job.create({
        data: {
          clientProfileId: input.clientProfileId,
          title: input.title,
          description: input.description,
          category: input.category,
          hourlyRateMinCents: input.hourlyRateMinCents,
          hourlyRateMaxCents: input.hourlyRateMaxCents,
          hoursPerWeek: input.hoursPerWeek,
          duration: input.duration,
          timezoneNote: input.timezoneNote,
          skills: {
            create: skillIds.map((skillId, i) => ({ skillId, sortOrder: i })),
          },
        },
        include: jobInclude,
      });
    });

    return toJob(row);
  },

  async findById(id: string): Promise<Job | null> {
    const row = await getPrisma().job.findUnique({
      where: { id },
      include: jobInclude,
    });
    return row ? toJob(row) : null;
  },

  /**
   * The candidate browse query: open jobs only, newest first, filtered per
   * PROJECT_SCOPE §2.2 (category, rate, hours) plus free text.
   */
  async listOpen(filters: ListJobsFilters): Promise<JobList> {
    const take = Math.min(filters.limit ?? 20, JOB_LIMITS.pageSize);
    const skip = Math.max(filters.offset ?? 0, 0);

    const where: Prisma.JobWhereInput = {
      status: "OPEN",
      ...(filters.category ? { category: filters.category } : {}),
      // "Pays at least X": the job's ceiling reaches X.
      ...(filters.minRateCents !== undefined
        ? { hourlyRateMaxCents: { gte: filters.minRateCents } }
        : {}),
      // "Pays at most X": the job's floor is within X.
      ...(filters.maxRateCents !== undefined
        ? { hourlyRateMinCents: { lte: filters.maxRateCents } }
        : {}),
      ...(filters.minHoursPerWeek !== undefined
        ? { hoursPerWeek: { gte: filters.minHoursPerWeek } }
        : {}),
      ...(filters.q
        ? {
            OR: [
              { title: { contains: filters.q, mode: "insensitive" } },
              { description: { contains: filters.q, mode: "insensitive" } },
              {
                skills: {
                  some: { skill: { name: { contains: filters.q, mode: "insensitive" } } },
                },
              },
            ],
          }
        : {}),
    };

    const prisma = getPrisma();
    const [rows, total] = await Promise.all([
      prisma.job.findMany({ where, include: jobInclude, orderBy: NEWEST_FIRST, take, skip }),
      prisma.job.count({ where }),
    ]);

    return { jobs: rows.map(toJob), total };
  },

  /** Everything one client has posted, any status, newest first. */
  async listByClientProfile(clientProfileId: string): Promise<Job[]> {
    const rows = await getPrisma().job.findMany({
      where: { clientProfileId },
      include: jobInclude,
      orderBy: NEWEST_FIRST,
    });
    return rows.map(toJob);
  },

  async close(id: string): Promise<Job> {
    const row = await getPrisma().job.update({
      where: { id },
      data: { status: "CLOSED", closedAt: new Date() },
      include: jobInclude,
    });
    return toJob(row);
  },
};
