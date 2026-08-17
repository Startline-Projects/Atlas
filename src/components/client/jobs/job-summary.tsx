/**
 * Small presentational pieces shared by the client's job list and job detail:
 * the status pill and the meta line (rate · hours · duration · category).
 * Server-safe — no state.
 */
import type { JobDto } from "@/lib/api/dto/job.dto";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { formatRateRange, jobDurationLabel, type JobStatus } from "@/lib/domain/job";
import { cn } from "@/lib/utils/cn";

const STATUS_STYLES: Record<JobStatus, { label: string; className: string }> = {
  OPEN: { label: "Open", className: "bg-success-bg text-success" },
  CLOSED: { label: "Closed", className: "bg-cream-deep text-ink-mute" },
  FILLED: { label: "Filled", className: "bg-navy-bg text-navy" },
};

export function JobStatusPill({ status, className }: { status: JobStatus; className?: string }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase",
        s.className,
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

/** "$25–$40/hr · 20 hrs/week · 1–3 months · Design" */
export function jobMetaLine(job: JobDto): string {
  return [
    formatRateRange(job.hourlyRateMinCents, job.hourlyRateMaxCents),
    `${job.hoursPerWeek} hrs/week`,
    jobDurationLabel(job.duration),
    roleCategoryLabel(job.category),
  ].join(" · ");
}

export function SkillTags({ skills, className }: { skills: string[]; className?: string }) {
  if (skills.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Skills">
      {skills.map((skill) => (
        <li
          key={skill}
          className="bg-cream border-line-soft text-ink-soft rounded-full border px-2.5 py-1 text-[12px]"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}
