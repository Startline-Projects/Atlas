/**
 * /client/dashboard
 *
 * The signed-in client's home: their posted roles, read through the API
 * client with the visitor's cookies (ARCHITECTURE §5.1). `?state=fresh` is
 * the hand-off from signup.
 */
import { redirect } from "next/navigation";

import { ClientDashboardApp } from "@/components/client/dashboard/dashboard-app";
import { clientsApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { clientSignInPath, getClientSession } from "@/lib/auth";

export default async function ClientDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  // The layout already guards; this re-check covers client-side navigation
  // (layouts do not re-render then) and is free — the lookup is memoised.
  const session = await getClientSession();
  if (!session) redirect(clientSignInPath());

  const [{ jobs }, params] = await Promise.all([
    clientsApi.listJobs(await serverInit()),
    searchParams,
  ]);

  return (
    <ClientDashboardApp
      client={session.client}
      jobs={jobs}
      fresh={params.state === "fresh"}
      now={new Date()}
    />
  );
}
