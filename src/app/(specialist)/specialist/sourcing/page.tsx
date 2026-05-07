import { Suspense } from "react";
import { SourcingApp } from "@/components/specialist/sourcing/sourcing-app";

/**
 * Sourcing pipeline view. URL state: `?id=<prospect-...>` opens the
 * slide-over detail. Direct URL load like
 * `/specialist/sourcing?id=prospect-tomas-reyes` opens that prospect.
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+. Empty
 * fallback because the boundary resolves on the client almost
 * instantly.
 */
export default function SourcingPage() {
  return (
    <Suspense fallback={null}>
      <SourcingApp />
    </Suspense>
  );
}
