/**
 * SdBackLink — "← Back to My team" link above the hero.
 * Server Component. Ported from `reference/manager.html` line 27742-27746.
 */

import Link from "next/link";

export function SdBackLink() {
  return (
    <div className="mb-4">
      <Link
        href="/specialist/team"
        className="text-ink-mute hover:text-ink inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m7.5 2.5-3 3.5 3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Back to{" "}
        <em className="text-ink-soft italic">My team</em>
      </Link>
    </div>
  );
}
