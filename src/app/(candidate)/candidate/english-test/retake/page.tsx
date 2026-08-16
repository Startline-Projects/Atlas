/**
 * /candidate/english-test/retake
 *
 * $10 retake checkout. Three arrivals:
 *   - plain              → order summary + "Pay with Stripe" (or, when a paid
 *                          retake is already waiting, the unlocked screen)
 *   - ?session_id=…      → back from checkout: confirm with Stripe, show
 *                          unlocked / still-pending / failed
 *   - ?cancelled=1       → back from checkout without paying
 *
 * No waiting period — payment is the only gate. Eligibility is the
 * service's call: a candidate who has passed, or has no attempt yet, is
 * sent to the dashboard rather than sold a retake.
 */
import { redirect } from "next/navigation";

import { RetakeCheckout } from "@/components/candidate/english-test/retake-checkout";
import { ApiClientError, englishTestApi } from "@/lib/api-client";
import { serverInit } from "@/lib/api-client/server";
import { candidateSignInPath, getCandidateSession } from "@/lib/auth";
import { ENGLISH_TEST } from "@/lib/domain/english-test";

type PageProps = {
  searchParams: Promise<{ session_id?: string; cancelled?: string }>;
};

export default async function EnglishTestRetakePage({ searchParams }: PageProps) {
  const session = await getCandidateSession();
  if (!session) redirect(candidateSignInPath("/candidate/english-test/retake"));

  const { session_id: sessionId, cancelled } = await searchParams;
  const init = await serverInit();

  // Returning from checkout: sync the payment first, then read eligibility —
  // a successful confirmation flips it to "retake_unlocked".
  let paymentStatus: "SUCCEEDED" | "PENDING" | "FAILED" | null = null;
  if (sessionId) {
    try {
      const { payment } = await englishTestApi.confirmRetakeCheckout(sessionId, init);
      paymentStatus = payment.status === "REFUNDED" ? "FAILED" : payment.status;
    } catch (error) {
      // Unknown / foreign session id — treat as "nothing to confirm".
      if (!(error instanceof ApiClientError && error.status === 404)) throw error;
    }
  }

  const { eligibility } = await englishTestApi.overview(init);

  if (eligibility.status === "passed" || eligibility.status === "free_available") {
    redirect("/candidate/dashboard");
  }

  return (
    <div className="mx-auto max-w-[560px]">
      <header className="mb-8 text-center">
        <div className="text-ink-mute mb-3.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
          {"// English test · Retake"}
        </div>
        <h1 className="display mb-3.5 text-[clamp(36px,4.6vw,52px)] leading-[1.05]">
          Second <span className="serif-italic">shot</span>.
        </h1>
        <p className="text-ink-soft mx-auto max-w-[420px] text-base leading-[1.55]">
          One flat {ENGLISH_TEST.retakeFeeLabel} — no subscription. Your
          new attempt unlocks the moment payment clears, and your best
          score is the one that counts.
        </p>
      </header>
      <RetakeCheckout
        attemptNumber={eligibility.nextAttemptNumber}
        unlocked={eligibility.status === "retake_unlocked"}
        returnedPaymentStatus={paymentStatus}
        cancelled={cancelled === "1"}
      />
    </div>
  );
}
