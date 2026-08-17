/**
 * Candidate job browse — PROJECT_SCOPE §2.2 "Browse open jobs (filter by
 * category, rate, hours)". Server Component: the filters are a plain GET form
 * so every state is a URL (shareable, back-button friendly, no client state),
 * and the list is whatever the API returned for that URL.
 */
import { Briefcase, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

import type { JobListDto } from "@/lib/api/dto/job.dto";
import { ROLE_CATEGORIES } from "@/lib/domain/candidate";
import { HOURS_PER_WEEK_OPTIONS } from "@/lib/domain/job";
import { cn } from "@/lib/utils/cn";

import { CandidateJobCard } from "./job-card";

/** The browse page's URL parameters — dollars in the URL, cents on the API. */
export interface BrowseParams {
  category?: string | undefined;
  minRate?: string | undefined;
  maxRate?: string | undefined;
  minHours?: string | undefined;
  q?: string | undefined;
  page?: string | undefined;
}

export const BROWSE_PAGE_SIZE = 20;

const SELECT_CLASS =
  "w-full appearance-none rounded-md border border-line bg-[#FFFDF7] px-3 py-2.5 text-[14px] text-ink outline-none transition-[border-color,box-shadow] focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)]";

export function JobsBrowser({
  list,
  params,
  page,
  now,
}: {
  list: JobListDto;
  params: BrowseParams;
  page: number;
  now: Date;
}) {
  const { jobs, total } = list;
  const pageCount = Math.max(1, Math.ceil(total / BROWSE_PAGE_SIZE));
  const hasFilters = Boolean(
    params.category || params.minRate || params.maxRate || params.minHours || params.q,
  );

  return (
    <div className="mx-auto flex max-w-[840px] flex-col gap-8">
      <header>
        <div className="text-ink-mute mb-3 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// Open roles"}
        </div>
        <h1 className="display mb-2 text-[clamp(34px,4.4vw,50px)] leading-[1.05]">
          Find your next <span className="serif-italic">contract</span>.
        </h1>
        <p className="text-ink-soft text-[15px]">
          {total === 0
            ? "No open roles match right now."
            : total === 1
              ? "1 open role"
              : `${total.toLocaleString("en-US")} open roles`}
          {hasFilters ? " · filtered" : " · posted by vetted clients"}
        </p>
      </header>

      <form
        method="get"
        action="/candidate/jobs"
        className="bg-paper border-line shadow-card rounded-xl border p-4 sm:rounded-[18px] sm:p-5"
        aria-label="Filter roles"
      >
        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[1.6fr_1fr_0.8fr_0.8fr_1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <Search
              className="text-ink-mute pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Title, skill or keyword"
              className={cn(SELECT_CLASS, "pl-9")}
            />
          </label>

          <label className="block">
            <span className="sr-only">Category</span>
            <select name="category" defaultValue={params.category ?? ""} className={SELECT_CLASS}>
              <option value="">Any category</option>
              {ROLE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="relative block">
            <span className="sr-only">Minimum hourly rate</span>
            <span
              aria-hidden="true"
              className="text-ink-mute pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[14px]"
            >
              $
            </span>
            <input
              type="number"
              name="minRate"
              min={1}
              max={1000}
              step={1}
              inputMode="numeric"
              defaultValue={params.minRate ?? ""}
              placeholder="Min /hr"
              className={cn(SELECT_CLASS, "pl-6")}
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Maximum hourly rate</span>
            <span
              aria-hidden="true"
              className="text-ink-mute pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[14px]"
            >
              $
            </span>
            <input
              type="number"
              name="maxRate"
              min={1}
              max={1000}
              step={1}
              inputMode="numeric"
              defaultValue={params.maxRate ?? ""}
              placeholder="Max /hr"
              className={cn(SELECT_CLASS, "pl-6")}
            />
          </label>

          <label className="block">
            <span className="sr-only">Minimum hours per week</span>
            <select name="minHours" defaultValue={params.minHours ?? ""} className={SELECT_CLASS}>
              <option value="">Any hours</option>
              {HOURS_PER_WEEK_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}+ hrs / week
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-2">
            <button type="submit" className="btn btn-primary w-full justify-center sm:w-auto">
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        {hasFilters && (
          <div className="mt-3 text-[13px]">
            <Link
              href="/candidate/jobs"
              className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
            >
              Clear filters
            </Link>
          </div>
        )}
      </form>

      {jobs.length === 0 ? (
        <section className="bg-paper border-line shadow-card rounded-xl border p-8 text-center sm:rounded-[22px]">
          <div className="bg-cream-deep text-ink mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full">
            <Briefcase className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </div>
          <h2 className="font-display mb-2 text-[24px] font-medium tracking-[-0.01em]">
            {hasFilters ? "Nothing matches those filters." : "No open roles yet."}
          </h2>
          <p className="text-ink-soft mx-auto max-w-[420px] text-[14.5px] leading-[1.55]">
            {hasFilters
              ? "Try widening the rate range or clearing the category — new roles are posted daily."
              : "Clients post new roles daily. Check back soon, or keep polishing your profile so you're ready when the right one lands."}
          </p>
        </section>
      ) : (
        <ul className="flex flex-col gap-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <CandidateJobCard job={job} now={now} />
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <nav aria-label="Pages" className="flex items-center justify-between text-[13.5px]">
          <PageLink params={params} page={page - 1} disabled={page <= 1}>
            ← Newer
          </PageLink>
          <span className="text-ink-mute">
            Page {page} of {pageCount}
          </span>
          <PageLink params={params} page={page + 1} disabled={page >= pageCount}>
            Older →
          </PageLink>
        </nav>
      )}
    </div>
  );
}

function PageLink({
  params,
  page,
  disabled,
  children,
}: {
  params: BrowseParams;
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) return <span className="text-ink-mute opacity-50">{children}</span>;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...params, page: String(page) })) {
    if (value) search.set(key, value);
  }
  return (
    <Link
      href={`/candidate/jobs?${search.toString()}`}
      className="text-ink border-line hover:border-ink border-b pb-px transition-colors"
    >
      {children}
    </Link>
  );
}
