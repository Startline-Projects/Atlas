/**
 * A job as a candidate sees it. Server Component. The "Submit a proposal"
 * action is the next slice — it renders as an explicit "coming next" state
 * rather than a dead button, so nothing on this page pretends to work.
 */
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  Globe2,
  Lock,
  Send,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import type { JobDto } from "@/lib/api/dto/job.dto";
import { roleCategoryLabel } from "@/lib/domain/candidate";
import { formatRateRange, jobDurationLabel } from "@/lib/domain/job";
import { formatDay } from "@/lib/utils/format-date";

export function CandidateJobDetail({ job }: { job: JobDto }) {
  const isOpen = job.status === "OPEN";
  const clientLine = [job.client.companyName, job.client.country].filter(Boolean).join(" · ");
  const facts = [
    { icon: Wallet, label: "Rate", value: formatRateRange(job.hourlyRateMinCents, job.hourlyRateMaxCents) },
    { icon: Clock3, label: "Commitment", value: `${job.hoursPerWeek} hrs / week` },
    { icon: CalendarDays, label: "Duration", value: jobDurationLabel(job.duration) },
    { icon: Globe2, label: "Timezone", value: job.timezoneNote ?? "Any timezone" },
  ];

  return (
    <div className="mx-auto flex max-w-[840px] flex-col gap-8">
      <Link
        href="/candidate/jobs"
        className="text-ink-mute hover:text-ink inline-flex items-center gap-1.5 self-start text-[13px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
        All open roles
      </Link>

      {!isOpen && (
        <div
          role="status"
          className="bg-cream-deep text-ink-soft flex items-start gap-2.5 rounded-md px-4 py-3 text-[13.5px] leading-[1.5]"
        >
          <Lock className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span>
            This role is no longer open
            {job.closedAt ? ` — it closed ${formatDay(job.closedAt)}` : ""}. Browse the current
            openings instead.
          </span>
        </div>
      )}

      <header>
        <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// "}{roleCategoryLabel(job.category)} · Posted {formatDay(job.publishedAt)}
        </div>
        <h1 className="display text-[clamp(30px,4vw,44px)] leading-[1.08]">{job.title}</h1>
        <p className="text-ink-soft mt-3 flex items-center gap-1.5 text-[15px]">
          <Building2 className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          {clientLine}
        </p>
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
            <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
              {job.skills.map((skill) => (
                <li
                  key={skill}
                  className="bg-cream border-line-soft text-ink-soft rounded-full border px-2.5 py-1 text-[12px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="bg-ink text-cream flex flex-wrap items-center justify-between gap-5 rounded-xl px-6 py-6 sm:rounded-[22px] sm:px-8">
        <div className="max-w-[460px]">
          <h2 className="font-display mb-1.5 text-[22px] font-medium tracking-[-0.01em]">
            {isOpen ? "Interested?" : "Keep looking."}
          </h2>
          <p className="text-cream/75 text-[14px] leading-[1.55]">
            {isOpen
              ? "Proposals (a short cover note + your rate) are the next thing we're switching on. Until then, make sure your profile is complete — clients see it before they see anything else."
              : "This one's closed, but new roles are posted daily."}
          </p>
        </div>
        {isOpen ? (
          <span
            aria-disabled="true"
            className="bg-cream/10 text-cream/70 inline-flex cursor-not-allowed items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium"
          >
            <Send className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            Submit a proposal — coming next
          </span>
        ) : (
          <Link href="/candidate/jobs" className="btn btn-lime">
            Browse open roles
          </Link>
        )}
      </section>
    </div>
  );
}
