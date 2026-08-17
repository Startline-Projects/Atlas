/**
 * A client's own job, in full. Server Component — the job arrives as a DTO
 * read through the API client. Applications / proposals will slot in under
 * the description when that slice lands.
 */
import { ArrowLeft, BadgeCheck, CalendarDays, Clock3, Globe2, Wallet } from "lucide-react";
import Link from "next/link";

import type { JobDto } from "@/lib/api/dto/job.dto";
import { CLIENT_HOME_PATH } from "@/lib/auth/redirects";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { formatRateRange, jobDurationLabel } from "@/lib/domain/job";
import { formatDay } from "@/lib/utils/format-date";

import { CloseJobButton } from "./close-job-button";
import { JobStatusPill, SkillTags } from "./job-summary";

export function ClientJobDetail({
  job,
  justPosted,
  justClosed,
}: {
  job: JobDto;
  justPosted: boolean;
  justClosed: boolean;
}) {
  const facts = [
    {
      icon: Wallet,
      label: "Rate",
      value: formatRateRange(job.hourlyRateMinCents, job.hourlyRateMaxCents),
    },
    { icon: Clock3, label: "Commitment", value: `${job.hoursPerWeek} hrs / week` },
    { icon: CalendarDays, label: "Duration", value: jobDurationLabel(job.duration) },
    { icon: Globe2, label: "Timezone", value: job.timezoneNote ?? "Any timezone" },
  ];

  return (
    <div className="mx-auto flex max-w-[840px] flex-col gap-8">
      <Link
        href={CLIENT_HOME_PATH}
        className="text-ink-mute hover:text-ink inline-flex items-center gap-1.5 self-start text-[13px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
        All roles
      </Link>

      {(justPosted || justClosed) && (
        <div
          role="status"
          className="bg-success-bg text-success flex items-start gap-2.5 rounded-md px-4 py-3 text-[13.5px] leading-[1.5]"
        >
          <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span>
            {justPosted
              ? "Your role is live. Vetted candidates can see it and apply from now on."
              : "This role is closed. It no longer appears in candidate search."}
          </span>
        </div>
      )}

      <header className="flex flex-wrap items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="text-ink-mute mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
            <span>{"// "}{roleCategoryLabel(job.category)}</span>
            <JobStatusPill status={job.status} />
          </div>
          <h1 className="display text-[clamp(30px,4vw,44px)] leading-[1.08]">{job.title}</h1>
          <p className="text-ink-soft mt-3 text-[14px]">
            Posted {formatDay(job.publishedAt)}
            {job.closedAt ? ` · Closed ${formatDay(job.closedAt)}` : ""}
          </p>
        </div>
        {job.status === "OPEN" && <CloseJobButton jobId={job.id} />}
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key facts">
        {facts.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-paper border-line shadow-card rounded-xl border px-4 py-3.5 sm:rounded-[16px]"
          >
            <div className="text-ink-mute mb-1.5 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase">
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
              {label}
            </div>
            <div className="text-ink text-[15px] font-medium">{value}</div>
          </div>
        ))}
      </section>

      <section className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
        <h2 className="font-display mb-4 text-[22px] font-medium tracking-[-0.01em]">
          About the role
        </h2>
        <div className="text-ink-soft text-[15px] leading-[1.65] whitespace-pre-line">
          {job.description}
        </div>
        {job.skills.length > 0 && (
          <div className="border-line-soft mt-6 border-t pt-5">
            <div className="text-ink-mute mb-2.5 font-mono text-[10.5px] tracking-[0.12em] uppercase">
              Skills & tools
            </div>
            <SkillTags skills={job.skills} />
          </div>
        )}
      </section>

      <section className="border-line text-ink-mute rounded-xl border border-dashed px-6 py-5 text-[13.5px] leading-[1.55] sm:rounded-[18px]">
        <strong className="text-ink font-medium">Proposals</strong> from candidates will appear
        here — that part of the hiring flow is next on the roadmap.
      </section>
    </div>
  );
}
