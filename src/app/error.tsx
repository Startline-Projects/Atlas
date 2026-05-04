"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: capture in Sentry once observability is wired up.
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <Eyebrow className="mb-4">{"// Error"}</Eyebrow>
      <h1 className="display mb-4 text-[clamp(48px,7vw,92px)]">
        Something <span className="serif-italic">broke.</span>
      </h1>
      <p className="text-ink-soft mb-8 max-w-md text-lg">
        We couldn&rsquo;t finish loading this page. Try again — and if it keeps
        happening, let us know.
      </p>
      <Button variant="primary" size="lg" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
