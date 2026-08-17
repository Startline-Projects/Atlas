/**
 * /candidate/jobs/[id]
 *
 * One role, as a candidate sees it. Closed roles still render (with a
 * banner) so a bookmarked link explains itself; unknown ids are a 404.
 */
import { notFound, redirect } from "next/navigation";

import { CandidateJobDetail } from "@/components/candidate/jobs/job-detail";
import { ApiClientError, jobsApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";

export default async function CandidateJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getCandidateSession();
  const { id } = await params;
  if (!session) redirect(candidateSignInPath(`/candidate/jobs/${id}`));

  let job;
  try {
    ({ job } = await jobsApi.get(id, await serverInit()));
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) notFound();
    throw error;
  }

  return <CandidateJobDetail job={job} />;
}
