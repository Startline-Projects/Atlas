import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <Eyebrow className="mb-4">{"// 404"}</Eyebrow>
      <h1 className="display mb-4 text-[clamp(48px,7vw,92px)]">
        Page not <span className="serif-italic">found.</span>
      </h1>
      <p className="text-ink-soft mb-8 max-w-md text-lg">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Back home
        </Button>
      </Link>
    </Container>
  );
}
