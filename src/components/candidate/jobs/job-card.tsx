/**
 * One job in the candidate browse list. Server-safe — no state.
 */
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

import type { JobDto } from "@/lib/api/dto/job.dto";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { formatRateRange, jobDurationLabel } from "@/lib/domain/job";
import { formatRelativeDay } from "@/lib/utils/format-date";

export function CandidateJobCard({ job, now }: { job: JobDto; now: Date }) {
  const clientLine = [job.client.companyName, job.client.country].filter(Boolean).join(" · ");
  const shown = job.skills.slice(0, 5);
  const more = job.skills.length - shown.length;

  return (
    <Link
      href={`/candidate/jobs/${job.id}`}
      className="bg-paper border-line shadow-card hover:border-ink-mute group block rounded-xl border p-5 transition-colors sm:rounded-[18px] sm:p-6"
    >
      <div className="text-ink-mute mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase">
        <span>{roleCategoryLabel(job.category)}</span>
        <span aria-hidden="true">·</span>
        <span>{formatRelativeDay(job.publishedAt, now)}</span>
      </div>

      <h3 className="text-ink text-[18px] leading-snug font-medium">{job.title}</h3>

      <p className="text-ink-soft mt-1.5 flex items-center gap-1.5 text-[13.5px]">
        <Building2 className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
        {clientLine}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px]">
        <Fact label="Rate" value={formatRateRange(job.hourlyRateMinCents, job.hourlyRateMaxCents)} />
        <Fact label="Hours" value={`${job.hoursPerWeek} / week`} />
        <Fact label="Duration" value={jobDurationLabel(job.duration)} />
        {job.timezoneNote && <Fact label="Timezone" value={job.timezoneNote} />}
      </dl>

      {shown.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
          {shown.map((skill) => (
            <li
              key={skill}
              className="bg-cream border-line-soft text-ink-soft rounded-full border px-2.5 py-1 text-[12px]"
            >
              {skill}
            </li>
          ))}
          {more > 0 && (
            <li className="text-ink-mute px-1 py-1 text-[12px]">+{more} more</li>
          )}
        </ul>
      )}

      <div className="text-ink mt-4 inline-flex items-center gap-1 text-[13px] font-medium">
        View role
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt className="text-ink-mute font-mono text-[10px] tracking-[0.1em] uppercase">{label}</dt>
      <dd className="text-ink font-medium">{value}</dd>
    </div>
  );
}
