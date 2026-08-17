import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface IdentityPhotoCardProps {
  profile: CandidateProfile;
  variant: 'front' | 'back';
}

export function IdentityPhotoCard({ profile, variant }: IdentityPhotoCardProps) {
  const isBack = variant === 'back';

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
      <div className="flex items-center justify-between p-[10px_14px] font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold bg-[var(--color-paper-deep)] border-b border-[var(--color-line-soft)]">
        <span>ID — {isBack ? 'Back' : 'Front'}</span>
        <button type="button" className="bg-none border-0 text-[var(--color-ink-mute)] cursor-pointer p-0 inline-flex items-center gap-[4px] font-body text-[11px] font-medium transition-colors duration-[150ms] hover:text-[var(--color-ink)]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          Zoom
        </button>
      </div>

      <div className="relative aspect-[1.6] bg-[linear-gradient(135deg,#E4DDCE_0%,#C4BCA9_100%)] overflow-hidden">
        {!isBack && (
          <span className="absolute top-[14%] left-[16%] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] font-semibold">Federal Republic of Nigeria · NIMC</span>
        )}

        <div className="absolute inset-[12%_14%] bg-[var(--color-paper-deep)] rounded-[4px] border border-[var(--color-line-strong)] p-[10px_12px] flex flex-col gap-[6px]">
          {!isBack ? (
            <>
              <span className="h-[4px] bg-[var(--color-ink)] rounded-[1px] w-[60%]"></span>
              <span className="h-[4px] bg-[var(--color-ink)] rounded-[1px] w-[40%]"></span>
              <span className="h-[2px] bg-[var(--color-ink-mute)] rounded-[1px] w-[60%] opacity-[0.4]"></span>
              <span className="h-[4px] bg-[var(--color-ink)] rounded-[1px] w-[30%]"></span>
              <span className="h-[2px] bg-[var(--color-ink-mute)] rounded-[1px] w-[60%] opacity-[0.4]"></span>
            </>
          ) : (
            <>
              <span className="h-[4px] bg-[var(--color-ink)] rounded-[1px] w-[60%]"></span>
              <span className="w-full h-[32px] bg-[repeating-linear-gradient(to_right,var(--color-ink)_0,var(--color-ink)_1px,transparent_1px,transparent_3px,var(--color-ink)_3px,var(--color-ink)_5px,transparent_5px,transparent_8px)] rounded-[2px] mt-auto"></span>
            </>
          )}
        </div>

        {!isBack && (
          <div className="absolute w-[24%] aspect-[0.78] top-[30%] right-[20%] bg-[linear-gradient(135deg,#D9A77F,#8B5A3C)] rounded-[2px] grid place-items-center text-[var(--color-paper)] font-display text-[14px] font-medium">
            {profile.initials}
          </div>
        )}

        <span className="absolute bottom-[10px] right-[10px] font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--color-paper)] font-semibold bg-[rgba(14,14,12,0.85)] px-[7px] py-[3px] rounded-[3px]">
          Mar 4, 2024
        </span>
      </div>
    </div>
  );
}
