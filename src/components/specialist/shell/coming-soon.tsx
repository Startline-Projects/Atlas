/**
 * Placeholder for specialist routes whose page is not implemented yet.
 *
 * Genuinely minimal by design — no fake content, no stub data, no
 * faux-real charts. The sidebar should not 404 during development, and
 * a reviewer should immediately see "this is unbuilt".
 *
 * Pages render as: <ComingSoon title="Review queue" plannedSession={2} />
 */

import { Eyebrow } from "@/components/ui/eyebrow";

type ComingSoonProps = {
  title: string;
  plannedSession?: number;
};

export function ComingSoon({ title, plannedSession }: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center px-8 py-16 sm:px-12">
      <Eyebrow className="mb-4">{"// Coming soon"}</Eyebrow>
      <h1 className="display mb-4 text-[clamp(40px,5vw,64px)] leading-[0.98]">
        {title}
      </h1>
      <p className="text-ink-soft max-w-md text-base">
        This surface is part of the Specialist console roadmap. It will land in{" "}
        {plannedSession
          ? `Session ${plannedSession}`
          : "a later session"}{" "}
        once the underlying spec section is converted.
      </p>
    </div>
  );
}
