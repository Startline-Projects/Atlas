/**
 * Client dashboard. Server Component — everything arrives as props.
 *
 * MVP scope (PROJECT_SCOPE §2.3): the roles this client has posted, with a
 * clear path to posting another. Proposals / contracts / messages arrive with
 * their own slices and slot in below.
 */
import { ArrowRight, Briefcase, PlusCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import type { JobDto } from "@/lib/api/dto/job.dto";
import type { Client } from "@/lib/domain/client";
import { formatRelativeDay } from "@/lib/utils/format-date";

import { JobStatusPill, jobMetaLine, SkillTags } from "../jobs/job-summary";

export function ClientDashboardApp({
  client,
  jobs,
  fresh,
  now,
}: {
  client: Client;
  jobs: JobDto[];
  /** Just signed up — say hello properly. */
  fresh: boolean;
  /** Render time, so "posted X days ago" is stable across server and client. */
  now: Date;
}) {
  const firstName = client.contactName.split(/\s+/)[0] ?? client.contactName;
  const openCount = jobs.filter((j) => j.status === "OPEN").length;

  return (
    <div className="mx-auto flex max-w-[840px] flex-col gap-10">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
            {"// Client dashboard"}
          </div>
          <h1 className="display mb-2 text-[clamp(34px,4.4vw,50px)] leading-[1.05]">
            {fresh ? "Welcome" : "Welcome back"}, <span className="serif-italic">{firstName}</span>.
          </h1>
          <p className="text-ink-soft text-[15px]">
            {client.companyName}
            {client.country ? ` · ${client.country}` : ""}
            {" · "}
            {openCount === 1 ? "1 open role" : `${openCount} open roles`}
          </p>
        </div>
        <Link href="/client/jobs/new" className="btn btn-primary group">
          <PlusCircle className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
          <span>Post a job</span>
        </Link>
      </header>

      {jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <section aria-labelledby="your-roles">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 id="your-roles" className="font-display text-[22px] font-medium tracking-[-0.01em]">
              Your roles
            </h2>
            <span className="text-ink-mute text-[13px]">{jobs.length} total</span>
          </div>
          <ul className="flex flex-col gap-3">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  href={`/client/jobs/${job.id}`}
                  className="bg-paper border-line shadow-card hover:border-ink-mute group block rounded-xl border p-5 transition-colors sm:rounded-[18px] sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-ink text-[17px] leading-snug font-medium">{job.title}</h3>
                      <p className="text-ink-soft mt-1 text-[13.5px]">{jobMetaLine(job)}</p>
                    </div>
                    <JobStatusPill status={job.status} />
                  </div>
                  <SkillTags skills={job.skills.slice(0, 6)} className="mt-3.5" />
                  <div className="text-ink-mute mt-4 flex items-center justify-between text-[12.5px]">
                    <span>Posted {formatRelativeDay(job.publishedAt, now).toLowerCase()}</span>
                    <span className="text-ink inline-flex items-center gap-1 font-medium">
                      View role
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <section className="bg-paper border-line shadow-card rounded-xl border p-6 sm:rounded-[22px] sm:p-8">
      <div className="bg-cream-deep text-ink mb-5 grid h-12 w-12 place-items-center rounded-full">
        <Briefcase className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </div>
      <h2 className="font-display mb-2 text-[26px] leading-[1.15] font-medium tracking-[-0.015em]">
        Post your first role.
      </h2>
      <p className="text-ink-soft mb-6 max-w-[520px] text-[15px] leading-[1.55]">
        Describe the work, the hours and the rate you have in mind. It goes live to vetted
        candidates the moment you post — no fees until you hire.
      </p>
      <ul className="text-ink-soft mb-7 grid gap-2 text-[14px] sm:grid-cols-3">
        {[
          "Takes about three minutes",
          "Edit or close it any time",
          "Only vetted talent can apply",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Sparkles className="text-ink mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link href="/client/jobs/new" className="btn btn-primary btn-lg group">
        <span>Post a job</span>
        <ArrowRight
          className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}
