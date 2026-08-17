/**
 * /client/jobs/[id]
 *
 * One of the client's own roles, read through the API client (ownership is
 * enforced by the service — someone else's id is a 404 here too).
 */
import { notFound, redirect } from "next/navigation";

import { ClientJobDetail } from "@/components/client/jobs/job-detail";
import { ApiClientError, clientsApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { clientSignInPath, getClientSession } from "@/lib/auth";

export default async function ClientJobPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ posted?: string; closed?: string }>;
}) {
  const session = await getClientSession();
  const { id } = await params;
  if (!session) redirect(clientSignInPath(`/client/jobs/${id}`));

  let job;
  try {
    ({ job } = await clientsApi.getJob(id, await serverInit()));
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) notFound();
    throw error;
  }

  const query = await searchParams;
  return (
    <ClientJobDetail
      job={job}
      justPosted={query.posted === "1"}
      justClosed={query.closed === "1"}
    />
  );
}
