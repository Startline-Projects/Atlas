import Link from 'next/link';
import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface ProfileBackRowProps {
  profile: CandidateProfile;
}

export function ProfileBackRow({ profile }: ProfileBackRowProps) {
  return (
    <div className="flex items-center gap-[14px] mb-[18px] flex-wrap">
      {/* Back button with arrow (admin.html line 15920-15923) */}
      <Link
        href="/admin/users/candidates"
        className="group inline-flex items-center gap-[6px] text-[12.5px] text-[var(--color-ink-mute)] bg-transparent border-0 pt-[6px] pr-[10px] pb-[6px] pl-[6px] rounded-[var(--radius-sm)] cursor-pointer font-body transition-[background,color] duration-150 ease hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)]"
      >
        {/* Back arrow SVG (admin.html line 15921) */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-150 ease group-hover:-translate-x-[2px]"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to candidates
      </Link>

      {/* Breadcrumb (admin.html lines 15924-15932) */}
      <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] inline-flex items-center gap-[8px]">
        <span className="text-[var(--color-ink-soft)]">/admin</span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span className="text-[var(--color-ink-soft)]">users</span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span className="text-[var(--color-ink-soft)]">candidates</span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span className="text-[var(--color-ink)] font-semibold">{profile.id}</span>
      </div>
    </div>
  );
}
