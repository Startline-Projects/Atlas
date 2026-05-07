import type { CandidateProfile } from '@/lib/mock-data/admin/candidate-profiles-data';

interface IdentityStatusTileProps {
  profile: CandidateProfile;
}

export function IdentityStatusTile({ profile }: IdentityStatusTileProps) {
  const { identity } = profile;

  const iconClass = identity.verified ? '' : 'warn';

  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] p-[18px] flex flex-col gap-[14px]">
      <div className="flex items-center gap-[12px] pb-[12px] border-b border-dashed border-[var(--color-line-soft)]">
        <span className={`w-[38px] h-[38px] flex items-center justify-center rounded-full flex-shrink-0 ${
          iconClass === 'warn'
            ? 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]'
            : 'bg-[var(--color-success-bg)] text-[var(--color-success)]'
        }`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        <div className="min-w-0">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[17px] font-medium tracking-[-0.01em] mb-[1px]">
            {identity.verified ? 'Identity verified' : 'Verification pending'}
          </div>
          <div className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.02em]">
            {identity.verifiedDate} · {identity.verificationMethod}
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-[8px_18px] text-[12.5px]">
        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">ID type</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">
          {identity.idType}
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase bg-[var(--color-success-bg)] text-[var(--color-success)] px-[6px] py-[1px] rounded-[3px] font-semibold flex-shrink-0">Verified</span>
        </dd>

        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">Issuing country</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">
          <span className="text-[14px] flex-shrink-0" style={{ marginRight: '4px' }}>🇳🇬</span>
          {identity.issuingCountry}
        </dd>

        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">Name on ID</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">
          {identity.nameOnId}
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase bg-[var(--color-success-bg)] text-[var(--color-success)] px-[6px] py-[1px] rounded-[3px] font-semibold flex-shrink-0">Match</span>
        </dd>

        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">Date of birth</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">
          {identity.dateOfBirth} (age {identity.age})
        </dd>

        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">Liveness check</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">
          {identity.livenessCheck}
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase bg-[var(--color-success-bg)] text-[var(--color-success)] px-[6px] py-[1px] rounded-[3px] font-semibold flex-shrink-0">Match</span>
        </dd>

        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">Biometric match</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">
          {identity.biometricMatch}%
          <span className="inline-flex items-center gap-[8px] ml-auto">
            <span className="flex h-[4px] w-[60px] bg-[var(--color-cream-deep)] rounded-full overflow-hidden">
              <span className="flex h-full w-full relative">
                <span className="h-full bg-[var(--color-success)] rounded-full" style={{ width: `${identity.biometricMatch}%` }} />
              </span>
            </span>
          </span>
        </dd>

        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium pt-[1px]">Method</dt>
        <dd className="m-0 text-[var(--color-ink)] font-medium flex items-center gap-[6px] flex-wrap">{identity.method}</dd>
      </dl>
    </div>
  );
}
