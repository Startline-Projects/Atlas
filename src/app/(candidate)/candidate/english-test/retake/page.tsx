/**
 * /candidate/english-test/retake
 *
 * $10 retake checkout (mock — real flow charges via Stripe and
 * unlocks the attempt on webhook confirmation). Reached from the
 * dashboard or the result screen — no waiting period; payment is
 * the only gate.
 */
import { RetakeCheckout } from "@/components/candidate/english-test/retake-checkout";
import { ENGLISH_TEST } from "@/lib/mock-data/candidate";

export default function EnglishTestRetakePage() {
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
      <RetakeCheckout />
    </div>
  );
}
