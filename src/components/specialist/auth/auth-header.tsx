/**
 * Editorial header used above the form card on signin & forgot.
 * Pure server component — no state, no events.
 */
import { Check } from "lucide-react";

type AuthHeaderProps = {
  eyebrow: string;
  /** Headline rendered as a `display` h1; the `italic` portion gets `serif-italic` styling. */
  headline: { lead: string; italic?: string; trail?: string };
  lead: string;
};

export function AuthHeader({ eyebrow, headline, lead }: AuthHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <span className="bg-paper border-line text-ink-mute mb-5 inline-flex items-center gap-2 rounded-full border py-[5px] pr-3 pl-[5px] font-mono text-[11px] tracking-[0.14em] uppercase">
        <span
          aria-hidden="true"
          className="bg-ink text-lime grid h-[18px] w-[18px] place-items-center rounded-full"
        >
          <Check className="h-2 w-2" strokeWidth={2.5} />
        </span>
        {eyebrow}
      </span>
      <h1 className="display mb-3.5 text-[clamp(40px,5.6vw,60px)] leading-[1.02]">
        {headline.lead}
        {headline.italic ? (
          <>
            {" "}
            <span className="serif-italic text-ink mr-px">
              {headline.italic}
            </span>
          </>
        ) : null}
        {headline.trail ?? null}
      </h1>
      <p className="text-ink-soft mx-auto max-w-[380px] text-base leading-[1.5]">
        {lead}
      </p>
    </header>
  );
}
