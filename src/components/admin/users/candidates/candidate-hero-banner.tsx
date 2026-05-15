import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface CandidateHeroBannerProps {
  profile: CandidateProfile;
}

export function CandidateHeroBanner({ profile }: CandidateHeroBannerProps) {
  // Only render for suspended or banned candidates
  if (profile.status !== 'suspended' && profile.status !== 'banned') {
    return null;
  }

  // Don't render if no statusBanner data
  if (!profile.statusBanner) {
    return null;
  }

  // Determine color variant: suspended = amber, banned = danger/red
  const isSuspended = profile.status === 'suspended';
  const containerClass = isSuspended
    ? 'flex items-start gap-[14px] py-[13px] px-[32px] bg-[var(--color-amber-bg)] border-t border-[rgba(232,118,58,0.2)] border-b border-[rgba(232,118,58,0.2)] mt-[4px] mb-[20px]'
    : 'flex items-start gap-[14px] py-[13px] px-[32px] bg-[var(--color-danger-bg)] border-t border-[rgba(194,65,43,0.2)] border-b border-[rgba(194,65,43,0.2)] mt-[4px] mb-[20px]';

  const iconClass = isSuspended
    ? 'flex-shrink-0 text-[var(--color-amber)] mt-[2px]'
    : 'flex-shrink-0 text-[var(--color-danger)] mt-[2px]';

  return (
    <div className={containerClass}>
      <span className={iconClass} aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </span>
      <div className="flex-1 min-w-0 text-[13px] leading-[1.5]">
        <strong className="font-semibold text-[var(--color-ink)]">
          {profile.statusBanner.title}
        </strong>
        <div className="font-mono text-[11px] text-[var(--color-ink-mute)] mt-[4px] tracking-[0.02em]">
          {profile.statusBanner.detail}
        </div>
      </div>
    </div>
  );
}
