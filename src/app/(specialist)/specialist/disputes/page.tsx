import { Suspense } from "react";
import { DisputesApp } from "@/components/specialist/disputes/disputes-app";

/**
 * Disputes view. URL state: `?id=<DSP-...>` controls the active case.
 * Direct URL load like `/specialist/disputes?id=DSP-2026-04-12` opens
 * that case. With no id, the rail's primary case (Sofia / Quill) is
 * selected — empty state appears only if a stale id is passed.
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+. Empty
 * fallback because the boundary resolves on the client almost
 * instantly.
 */
export default function DisputesPage() {
  return (
    <Suspense fallback={null}>
      <DisputesApp />
    </Suspense>
  );
}
