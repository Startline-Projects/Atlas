import { Suspense } from "react";
import { ReviewsApp } from "@/components/specialist/reviews-approvals/reviews-app";

/**
 * Reviews & approvals view — co-sign workflow. URL state:
 * `?id=<REV-...>` controls the active case.
 *
 * `useSearchParams` requires a Suspense boundary on Next 15+. Empty
 * fallback because the boundary resolves on the client almost
 * instantly.
 */
export default function ReviewsPage() {
  return (
    <Suspense fallback={null}>
      <ReviewsApp />
    </Suspense>
  );
}
