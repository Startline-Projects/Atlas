import { Suspense } from "react";
import { PerformanceApp } from "@/components/specialist/performance/performance-app";

/**
 * Performance view — self-evaluation dashboard. URL state:
 * `?period=month|quarter|year` controls the active period.
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+. Empty
 * fallback because the boundary resolves on the client almost
 * instantly.
 */
export default function PerformancePage() {
  return (
    <Suspense fallback={null}>
      <PerformanceApp />
    </Suspense>
  );
}
