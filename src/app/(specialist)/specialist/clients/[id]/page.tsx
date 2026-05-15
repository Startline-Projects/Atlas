/**
 * Overview page for `/specialist/clients/[id]`.
 *
 * Server Component. Pre-renders all 12 known client ids at build
 * time via `generateStaticParams` pulling from
 * `ALL_MANAGED_CLIENT_IDS`.
 *
 * Each page re-resolves its own params + calls `getManagedClient` —
 * Next.js doesn't auto-pass params from layout to page; the layout's
 * `notFound()` triggers for invalid ids BEFORE this page renders, but
 * we still need the resolved client for the body component (we don't
 * re-pass via context to keep things simple; the lookup is O(1)).
 *
 * Mirrors the candidate-profile precedent at
 * `src/app/(specialist)/specialist/candidates/[id]/page.tsx`.
 *
 * Session 9 — Checkpoint 1.
 */

import { notFound } from "next/navigation";
import {
  getClientBriefs,
  splitBriefs,
} from "@/lib/mock-data/specialist/client-briefs";
import { getClientContracts } from "@/lib/mock-data/specialist/client-contracts";
import { getClientHires } from "@/lib/mock-data/specialist/client-hires";
import { rankPoolForClient } from "@/lib/mock-data/specialist/client-talent-match";
import { getClientTagKeys } from "@/lib/mock-data/specialist/client-tags";
import {
  ALL_MANAGED_CLIENT_IDS,
  getManagedClient,
} from "@/lib/mock-data/specialist/my-clients";
import {
  ClientOverviewApp,
  type ClientSubNavCounts,
} from "@/components/specialist/clients-shared";

/** Pre-render every known client id at build time. */
export function generateStaticParams() {
  return ALL_MANAGED_CLIENT_IDS.map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientOverviewPage({ params }: PageProps) {
  const { id } = await params;
  const client = getManagedClient(id);
  if (!client) notFound();

  /* Counts also computed in the layout (same 5 calls). Recomputing
     here keeps the page self-contained; the lookups are O(1) so the
     duplication is negligible. If/when this becomes a bottleneck, lift
     to `cache()` or React Context. */
  const counts: ClientSubNavCounts = {
    contracts: getClientContracts(id).length,
    briefsOpen: splitBriefs(getClientBriefs(id)).open.length,
    hiresActive: getClientHires(id).filter((h) => h.status === "active").length,
    talentPool: rankPoolForClient(id).length,
    tagsApplied: getClientTagKeys(id).length,
  };

  return <ClientOverviewApp client={client} counts={counts} />;
}
