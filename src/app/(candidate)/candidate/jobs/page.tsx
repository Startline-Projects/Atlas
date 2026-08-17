/**
 * /candidate/jobs
 *
 * Browse open roles (PROJECT_SCOPE §2.2). Filters live in the URL; the page
 * turns them into the API's query (dollars → cents), reads through the API
 * client with the visitor's cookies (ARCHITECTURE §5.1) and renders.
 */
import { redirect } from "next/navigation";

import {
  BROWSE_PAGE_SIZE,
  JobsBrowser,
  type BrowseParams,
} from "@/components/candidate/jobs/jobs-browser";
import { jobsApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";

/** "25" → 2500; blank / junk → undefined (the filter is simply not applied). */
function dollarsToCents(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : undefined;
}

function positiveInt(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isInteger(n) && n > 0 ? n : undefined;
}

export default async function CandidateJobsPage({
  searchParams,
}: {
  searchParams: Promise<BrowseParams>;
}) {
  const session = await getCandidateSession();
  if (!session) redirect(candidateSignInPath("/candidate/jobs"));

  const params = await searchParams;
  const page = positiveInt(params.page) ?? 1;

  const list = await jobsApi.list(
    {
      category: params.category || undefined,
      minRateCents: dollarsToCents(params.minRate),
      maxRateCents: dollarsToCents(params.maxRate),
      minHoursPerWeek: positiveInt(params.minHours),
      q: params.q?.trim() || undefined,
      limit: BROWSE_PAGE_SIZE,
      offset: (page - 1) * BROWSE_PAGE_SIZE,
    },
    await serverInit(),
  );

  return <JobsBrowser list={list} params={params} page={page} now={new Date()} />;
}
