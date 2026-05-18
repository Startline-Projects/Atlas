/**
 * /specialist/team/[id] — Manager-only Specialist Detail page.
 *
 * 11 SSG routes via `generateStaticParams(ALL_SPECIALIST_IDS)`.
 * Invalid ids → `notFound()`. Wraps content in `<ManagerRouteGuard>`
 * (reused from Step 4).
 *
 * Page is Server Component; resolves the Specialist record server-
 * side and passes it as a plain prop to the Client orchestrator.
 *
 * Session 1 / Step 5.
 */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ALL_SPECIALIST_IDS,
  getSpecialist,
  type SpecialistId,
} from "@/lib/mock-data/manager/team";
import { ManagerRouteGuard } from "@/components/manager/shell/manager-route-guard";
import { SpecialistDetailApp } from "@/components/manager/specialist-detail/specialist-detail-app";

export function generateStaticParams() {
  return ALL_SPECIALIST_IDS.map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SpecialistDetailPage({ params }: PageProps) {
  const { id } = await params;
  /* Validate against the strict SpecialistId union — any unexpected
     value triggers notFound() (which routes through the global
     not-found.tsx). */
  if (!(ALL_SPECIALIST_IDS as ReadonlyArray<string>).includes(id)) {
    notFound();
  }
  const specialist = getSpecialist(id as SpecialistId);
  if (!specialist) notFound();

  return (
    <ManagerRouteGuard>
      {/* Suspense wrapper required for `useSearchParams()` in
          SpecialistDetailApp under SSG. Fallback is null — the page
          renders immediately on the server with the default tab
          (Overview); the client hydrates and may swap to the
          ?tab= initial state. */}
      <Suspense fallback={null}>
        <SpecialistDetailApp specialist={specialist} />
      </Suspense>
    </ManagerRouteGuard>
  );
}
