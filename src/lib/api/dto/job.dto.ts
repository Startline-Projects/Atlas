import type { RoleCategory } from "@/lib/domain/candidate";
import type {
  Job,
  JobClientSummary,
  JobDuration,
  JobList,
  JobStatus,
} from "@/lib/domain/job";

/**
 * The over-the-wire shape of a job. Money stays in integer cents; dates
 * become ISO strings; the client is the same restricted summary the domain
 * exposes (company, country — never the contact's email).
 */
export interface JobDto {
  id: string;
  client: JobClientSummary;
  title: string;
  description: string;
  category: RoleCategory;
  skills: string[];
  hourlyRateMinCents: number;
  hourlyRateMaxCents: number;
  hoursPerWeek: number;
  duration: JobDuration;
  timezoneNote: string | null;
  status: JobStatus;
  publishedAt: string;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobListDto {
  jobs: JobDto[];
  total: number;
}

export function toJobDto(job: Job): JobDto {
  return {
    id: job.id,
    client: job.client,
    title: job.title,
    description: job.description,
    category: job.category,
    skills: job.skills,
    hourlyRateMinCents: job.hourlyRateMinCents,
    hourlyRateMaxCents: job.hourlyRateMaxCents,
    hoursPerWeek: job.hoursPerWeek,
    duration: job.duration,
    timezoneNote: job.timezoneNote,
    status: job.status,
    publishedAt: job.publishedAt.toISOString(),
    closedAt: job.closedAt?.toISOString() ?? null,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

export function toJobListDto(list: JobList): JobListDto {
  return { jobs: list.jobs.map(toJobDto), total: list.total };
}
