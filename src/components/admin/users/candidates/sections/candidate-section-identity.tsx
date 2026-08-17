import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';
import { IdentityStatusTile } from './identity/identity-status-tile';
import { IdentityPhotoCard } from './identity/identity-photo-card';
import { IdentityLivenessVideo } from './identity/identity-liveness-video';
import { IdentityFraudCard } from './identity/identity-fraud-card';

interface CandidateSectionIdentityProps {
  profile: CandidateProfile;
}

export function CandidateSectionIdentity({ profile }: CandidateSectionIdentityProps) {
  const { identity } = profile;

  const statusClass = identity.verified ? '' : 'warn';

  return (
    <section className="py-[36px] border-t border-[var(--color-line)] scroll-mt-[80px] first:border-t-0 first:pt-[12px]" id="cd-section-identity">
      {/* Section heading */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--color-ink-mute)] font-medium">01 · 09</span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">Identity verification</h2>
        </div>
        <span className={`inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold px-[9px] pl-[8px] py-[3px] rounded-full ${
          statusClass === 'warn'
            ? 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]'
            : 'bg-[var(--color-success-bg)] text-[var(--color-success)]'
        }`}>
          <span className="w-[5px] h-[5px] rounded-full bg-current" />
          {identity.verified ? 'Verified' : 'Pending'}
        </span>
      </div>

      {/* Identity tiles grid */}
      <div className="grid grid-cols-2 gap-[18px] mb-[24px] max-[880px]:grid-cols-1">
        {/* Status tile */}
        <IdentityStatusTile profile={profile} />

        {/* ID photos */}
        <div className="flex flex-col gap-[12px]">
          <IdentityPhotoCard profile={profile} variant="front" />
          <IdentityPhotoCard profile={profile} variant="back" />
        </div>
      </div>

      {/* Liveness video */}
      <IdentityLivenessVideo profile={profile} />

      {/* Fraud checks */}
      <IdentityFraudCard profile={profile} />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-[6px] mt-[14px]">
        <button className="inline-flex items-center gap-[6px] px-[14px] pl-[12px] py-[8px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full text-[var(--color-ink-soft)] text-[12.5px] font-medium cursor-pointer transition-all duration-[150ms] ease hover:border-[var(--color-ink)] hover:color hover:bg-[var(--color-cream-deep)]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-ink-mute)] transition-colors duration-[150ms]">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/>
            <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/>
          </svg>
          Re-verify identity
        </button>
        <button className="inline-flex items-center gap-[6px] px-[14px] pl-[12px] py-[8px] bg-[var(--color-amber-bg)] border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--color-amber)] text-[12.5px] font-medium cursor-pointer transition-all duration-[150ms] ease hover:bg-[var(--color-amber-bg)] hover:border-[var(--color-amber)]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Override verification
        </button>
        <button className="inline-flex items-center gap-[6px] px-[14px] pl-[12px] py-[8px] bg-transparent border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--color-danger)] text-[12.5px] font-medium cursor-pointer transition-all duration-[150ms] ease hover:bg-[var(--color-danger-bg)] hover:border-[var(--color-danger)]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
          Flag identity
        </button>
      </div>
    </section>
  );
}
