/**
 * Layout for `/specialist/clients/[id]/...`.
 *
 * Server Component. Resolves the canonical `client-*` id at the
 * layout level so the header band and sub-nav don't need to
 * re-resolve. Each child page ALSO resolves its own params — Next.js
 * App Router gives each segment its own params (no auto prop-
 * drilling from layout to page). Lookup is O(1) against a 12-element
 * array; no `cache()` wrapper needed.
 *
 * `notFound()` here triggers the global `not-found.tsx` for invalid
 * IDs. Mirrors the candidate-profile precedent
 * (`src/app/(specialist)/specialist/candidates/[id]/page.tsx`).
 *
 * Sub-nav badge counts computed here once per cross-client mount;
 * layouts stay mounted across child-segment navigations (so
 * Overview ↔ future Contracts/Briefs tab clicks won't re-run this).
 *
 * Renders, top to bottom:
 *   1. `ClientPageHeader`  — NOT sticky (scrolls under topbar+sub-nav)
 *   2. `ClientSubNavTabs`  — sticky at `top-[calc(36px+57px)] z-[5]`
 *   3. `{children}`        — the page body
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
import { getManagedClient } from "@/lib/mock-data/specialist/my-clients";
import {
  ClientPageHeader,
  ClientSubNavTabs,
  type ClientSubNavCounts,
} from "@/components/specialist/clients-shared";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export default async function ClientLayout({ params, children }: LayoutProps) {
  const { id } = await params;
  const client = getManagedClient(id);
  if (!client) notFound();

  const counts: ClientSubNavCounts = {
    contracts: getClientContracts(id).length,
    briefsOpen: splitBriefs(getClientBriefs(id)).open.length,
    hiresActive: getClientHires(id).filter((h) => h.status === "active").length,
    talentPool: rankPoolForClient(id).length,
    tagsApplied: getClientTagKeys(id).length,
  };

  return (
    <>
      <ClientPageHeader client={client} />
      <ClientSubNavTabs clientId={client.id} counts={counts} />
      {children}
    </>
  );
}
