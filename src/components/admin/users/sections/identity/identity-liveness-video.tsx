import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface IdentityLivenessVideoProps {
  profile: CandidateProfile;
}

export function IdentityLivenessVideo({ profile }: IdentityLivenessVideoProps) {
  const videoData = profile.identity.livenessVideo;

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden mb-[18px]">
      <div className="flex items-center justify-between p-[10px_14px] font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] font-semibold bg-[var(--color-paper-deep)] border-b border-[var(--color-line-soft)]">
        <span>Liveness recording — 5-point check</span>
        <span className="font-body text-[11px] font-normal tracking-normal text-transform-none text-[var(--color-ink-mute)]">
          Click to play
        </span>
      </div>

      <div className="relative aspect-video bg-[linear-gradient(135deg,#2a2a28_0%,#14140f_100%)] overflow-hidden cursor-pointer group">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30%] aspect-square bg-[linear-gradient(180deg,transparent_0%,rgba(217,167,127,0.4)_100%)] rounded-[50%_50%_0_0]" aria-hidden="true"></div>

        <div className="absolute inset-[14px] border-[2px] border-[rgba(214,242,77,0.7)] rounded-[4px] pointer-events-none" style={{
          clipPath: 'polygon(0 0, 30% 0, 30% 6%, 6% 6%, 6% 30%, 0 30%, 0 70%, 6% 70%, 6% 94%, 30% 94%, 30% 100%, 70% 100%, 70% 94%, 94% 94%, 94% 70%, 100% 70%, 100% 30%, 94% 30%, 94% 6%, 70% 6%, 70% 0, 100% 0)'
        }} aria-hidden="true"></div>

        <div className="absolute inset-0 grid place-items-center z-[2]">
          <button type="button" className="w-[56px] h-[56px] rounded-full bg-[rgba(251,248,242,0.95)] display-grid place-items-center text-[var(--color-ink)] border-0 cursor-pointer box-shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-transform duration-[150ms] group-hover:scale-[1.08]" aria-label="Play liveness recording">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="6 4 20 12 6 20 6 4"/>
            </svg>
          </button>
        </div>

        <div className="absolute bottom-[10px] left-[12px] flex gap-[8px] font-mono text-[10px] text-[var(--color-paper)] tracking-[0.06em] z-[3]">
          <span className="bg-[rgba(14,14,12,0.7)] px-[7px] py-[3px] rounded-[3px]">{videoData?.duration || '0:34'}</span>
          <span className="bg-[var(--color-success)] text-white px-[7px] py-[3px] rounded-[3px] font-semibold">Verified</span>
        </div>
      </div>

      <div className="p-[10px_14px] text-[12.5px]">
        <div className="font-mono text-[10px] text-[var(--color-ink-mute)]">
          Method: {videoData?.method || 'Document + selfie + 5-point liveness'}
        </div>
        <div className="mt-[4px] font-mono text-[10px] text-[var(--color-ink-mute)]">
          Recorded: {videoData?.recordedAt || 'Mar 4, 2024'}
        </div>
      </div>
    </div>
  );
}
