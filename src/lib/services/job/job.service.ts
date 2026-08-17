import type {
  CreateJobInput,
  Job,
  JobList,
  ListJobsFilters,
} from "@/lib/domain/job";
import { JOB_LIMITS } from "@/lib/domain/job";
import { dedupeSkillNames, skillSlug } from "@/lib/domain/skill";
import { BusinessRuleError, ForbiddenError, NotFoundError } from "@/lib/errors";
import { clientRepository } from "@/lib/repositories/client";
import { jobRepository } from "@/lib/repositories/job";

/**
 * Job service — ARCHITECTURE §6 step 5.
 *
 * All the rules about a posting live here: who may post (an active client),
 * what a valid rate range is, that a job goes live on creation, that only its
 * owner may see it on the client side or close it, and that candidates only
 * browse `OPEN` jobs. Routes stay thin; the UI renders what this returns.
 *
 * TODO(audit): `create` and `close` should write an audit entry once the
 * audit-log module (§7.7) exists — tracked with the admin follow-ups.
 */

export const jobService = {
  /**
   * Posts a job on behalf of a client. Live (`OPEN`) immediately — the MVP
   * auto-approves postings; Talent-Specialist review is Phase 2.
   */
  async create(clientUserId: string, input: CreateJobInput): Promise<Job> {
    const client = await clientRepository.findById(clientUserId);
    if (!client) throw new NotFoundError("No client account was found for this session.");
    if (client.status !== "ACTIVE") {
      throw new ForbiddenError("This account is not active. Please contact support.");
    }

    const clientProfileId = await clientRepository.profileIdForUser(clientUserId);
    if (!clientProfileId) throw new NotFoundError("No client account was found for this session.");

    if (input.hourlyRateMinCents > input.hourlyRateMaxCents) {
      throw new BusinessRuleError("The maximum rate must be at least the minimum.", {
        hourlyRateMaxCents: "Must be at least the minimum rate.",
      });
    }

    const skillNames = dedupeSkillNames(input.skills);
    if (skillNames.length > JOB_LIMITS.skills) {
      throw new BusinessRuleError(`Add up to ${JOB_LIMITS.skills} skills.`, {
        skills: `Add up to ${JOB_LIMITS.skills} skills.`,
      });
    }

    return jobRepository.create({
      clientProfileId,
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category,
      skills: skillNames.map((name) => ({ name, slug: skillSlug(name) })),
      hourlyRateMinCents: input.hourlyRateMinCents,
      hourlyRateMaxCents: input.hourlyRateMaxCents,
      hoursPerWeek: input.hoursPerWeek,
      duration: input.duration,
      timezoneNote: input.timezoneNote?.trim() || null,
    });
  },

  /** Everything the signed-in client has posted, newest first. */
  async listForClient(clientUserId: string): Promise<Job[]> {
    const clientProfileId = await clientRepository.profileIdForUser(clientUserId);
    if (!clientProfileId) throw new NotFoundError("No client account was found for this session.");
    return jobRepository.listByClientProfile(clientProfileId);
  },

  /**
   * One of the client's own jobs. Someone else's job is a 404, not a 403 —
   * the existence of a posting is not the caller's business.
   */
  async getForClient(clientUserId: string, jobId: string): Promise<Job> {
    const clientProfileId = await clientRepository.profileIdForUser(clientUserId);
    const job = await jobRepository.findById(jobId);
    if (!job || !clientProfileId || job.client.id !== clientProfileId) {
      throw new NotFoundError("That job could not be found.");
    }
    return job;
  },

  /** Withdraws a posting. Idempotence is deliberate: closing twice is a rule error. */
  async close(clientUserId: string, jobId: string): Promise<Job> {
    const job = await jobService.getForClient(clientUserId, jobId);
    if (job.status !== "OPEN") {
      throw new BusinessRuleError("This job is already closed.");
    }
    return jobRepository.close(jobId);
  },

  /** Candidate browse: open jobs, filtered and paged. */
  async listOpen(filters: ListJobsFilters): Promise<JobList> {
    return jobRepository.listOpen(filters);
  },

  /**
   * Candidate detail. Closed jobs stay readable so a bookmarked link explains
   * itself instead of 404ing; the UI reads `status` and disables applying.
   */
  async getForCandidate(jobId: string): Promise<Job> {
    const job = await jobRepository.findById(jobId);
    if (!job) throw new NotFoundError("That job could not be found.");
    return job;
  },
};
