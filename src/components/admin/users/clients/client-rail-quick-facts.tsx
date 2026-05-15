import type { ClientProfile } from '@/lib/mock-data/admin/client-profiles-data';

interface ClientRailQuickFactsProps {
  profile: ClientProfile;
}

export function ClientRailQuickFacts({ profile }: ClientRailQuickFactsProps) {
  const qf = profile.quickFacts;
  if (!qf) return null;

  const trustTier = profile.snapshot?.trustTier;

  // admin.html line 18190: trust tier dd inline color by tier
  const trustTierClass =
    trustTier?.tier === 'top-client'
      ? 'text-[#B8911E] font-semibold'
      : trustTier?.tier === 'trusted'
        ? 'text-[var(--navy)] font-semibold'
        : trustTier?.tier === 'new'
          ? 'text-[var(--ink-soft)]'
          : 'text-[var(--ink)]';

  // admin.html line 18192: last activity dd inline color by variant
  const lastActivityClass =
    qf.lastActivityVariant === 'success'
      ? 'text-[var(--success)]'
      : qf.lastActivityVariant === 'warn'
        ? 'text-[var(--amber)]'
        : 'text-[var(--ink)]';

  // dd base class (admin.html lines 5576-5582)
  const ddBase = 'm-0 font-mono text-[11.5px] tracking-[0.01em] font-medium';
  // dt class (admin.html lines 5569-5574)
  const dtClass = 'font-mono text-[10px] tracking-[0.08em] uppercase text-[var(--ink-mute)]';

  return (
    // admin.html line 18172: <div class="cd-quick-facts">
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[16px] py-[14px]">
      {/* admin.html line 18173: <h4>Quick facts</h4> */}
      <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[10px] pb-[8px] border-b border-dashed border-[var(--line-soft)]">
        Quick facts
      </h4>
      {/* admin.html line 18174: <dl> */}
      <dl className="m-0 grid grid-cols-[auto_1fr] gap-y-[6px] gap-x-[12px]">
        {/* admin.html line 18175-18176 */}
        <dt className={dtClass}>Atlas client ID</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{profile.atlasId}</dd>

        {/* admin.html line 18177-18178 */}
        <dt className={dtClass}>Joined</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{qf.joinedDate}</dd>

        {/* admin.html line 18179-18180 */}
        <dt className={dtClass}>Type</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{qf.entityType}</dd>

        {/* admin.html line 18181-18182 */}
        <dt className={dtClass}>Industry</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{qf.industryLabel}</dd>

        {/* admin.html line 18183-18184 */}
        <dt className={dtClass}>HQ</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{qf.hqShort}</dd>

        {/* admin.html line 18185-18186 */}
        <dt className={dtClass}>Size</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{profile.companySize ?? '—'}</dd>

        {/* admin.html line 18187-18188 */}
        <dt className={dtClass}>Specialist</dt>
        <dd className={`${ddBase} text-[var(--ink)]`}>{profile.specialist ?? '—'}</dd>

        {/* admin.html line 18189-18190: trust tier dd with tier-specific color */}
        <dt className={dtClass}>Trust tier</dt>
        <dd className={`${ddBase} ${trustTierClass}`}>{trustTier?.label ?? '—'}</dd>

        {/* admin.html line 18191-18192: last activity dd with variant color */}
        <dt className={dtClass}>Last activity</dt>
        <dd className={`${ddBase} ${lastActivityClass}`}>{qf.lastActivity}</dd>
      </dl>
    </div>
  );
}
