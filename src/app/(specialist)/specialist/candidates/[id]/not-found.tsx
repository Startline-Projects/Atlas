import Link from "next/link";

export default function CandidateNotFound() {
  return (
    <main className="bg-cream flex min-h-[70vh] min-w-0 flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="text-ink-mute mb-4 font-mono text-[10px] tracking-[0.16em] uppercase">
        Candidate not found
      </div>
      <h1
        className="font-display text-ink mb-3 text-[clamp(36px,5vw,52px)] leading-[1.05] tracking-[-0.02em]"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        That candidate <em className="text-ink-soft italic">isn&rsquo;t</em> in your pool.
      </h1>
      <p className="text-ink-soft mb-6 max-w-md text-[15px] leading-[1.55]">
        The id you visited doesn&rsquo;t match any candidate assigned to you.
        They may have been off-boarded, reassigned to another specialist, or
        the link is stale.
      </p>
      <Link
        href="/specialist/my-candidates"
        className="bg-ink text-paper hover:bg-ink-soft inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
      >
        Back to my candidates
      </Link>
    </main>
  );
}
