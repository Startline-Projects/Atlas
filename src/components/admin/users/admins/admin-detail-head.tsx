import type { AdminProfile, AdminRole } from '@/lib/mock-data/admin/admin-profiles-data';
import { AV_GRADIENTS } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminDetailHeadProps {
  profile: AdminProfile;
}

// Same role-pill mapping as roster card (admin.html lines 8499-8532)
function rolePillClass(role: AdminRole): string {
  switch (role) {
    case 'super':
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)] before:bg-[var(--super)]';
    case 'ops':
      return 'bg-[var(--ink)] text-[var(--paper)] before:bg-[var(--lime)]';
    case 'trust':
      return 'bg-[var(--amber-bg)] text-[var(--amber)] before:bg-[var(--amber)]';
    case 'compliance':
      return 'bg-[var(--navy-bg)] text-[var(--navy)] before:bg-[var(--navy)]';
    case 'finance':
      return 'bg-[var(--success-bg)] text-[var(--success)] before:bg-[var(--success)]';
    case 'readonly':
    default:
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)] before:bg-[var(--ink-mute)]';
  }
}

export function AdminDetailHead({ profile }: AdminDetailHeadProps) {
  return (
    // admin.html line 8773: adm-detail-head — 3-col grid + gradient bg + bottom border
    <div
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[16px] items-center px-[26px] pt-[22px] pb-[18px] border-b border-[var(--line)] max-[720px]:grid-cols-1 max-[720px]:gap-[12px]"
      style={{ background: 'linear-gradient(180deg, var(--paper-deep) 0%, var(--paper) 100%)' }}
    >
      {/* admin.html line 8785: adm-detail-avatar 56x56 with av-N gradient */}
      <div
        className="w-[56px] h-[56px] rounded-full grid place-items-center font-display text-[18px] font-medium text-[var(--paper)] tracking-[-0.01em]"
        style={{ background: AV_GRADIENTS[profile.avatarVariant] }}
        aria-hidden="true"
      >
        {profile.initials}
      </div>

      {/* admin.html line 8796: adm-detail-meta */}
      <div className="min-w-0">
        <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] m-0">
          {profile.name}
          {profile.isYou && (
            <span
              className="font-mono text-[9px] tracking-[0.14em] uppercase bg-[var(--lime)] text-[var(--ink)] py-[2px] px-[7px] rounded-[3px] font-semibold ml-[8px]"
              style={{ verticalAlign: '3px' }}
            >
              YOU
            </span>
          )}
        </h2>
        {/* admin.html line 8804: detail-tags — flex wrap with role-pill + 2 id-mono chips */}
        <div className="flex items-center gap-[8px] flex-wrap mt-[8px]">
          <span
            className={cn(
              "inline-flex items-center gap-[6px] py-[4px] pl-[9px] pr-[11px] rounded-full font-mono text-[10.5px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:flex-shrink-0",
              rolePillClass(profile.role)
            )}
          >
            {profile.roleLabel}
          </span>
          <span className="font-mono text-[10.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[3px] px-[8px] rounded-[3px] tracking-[0.04em] font-medium">
            {profile.atlasId}
          </span>
          <span className="font-mono text-[10.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[3px] px-[8px] rounded-[3px] tracking-[0.04em] font-medium">
            {profile.hireLabel}
          </span>
        </div>
      </div>

      {/* admin.html line 8821: last-login-hint right-aligned */}
      <div className="font-mono text-[10.5px] tracking-[0.02em] text-[var(--ink-soft)] text-right whitespace-nowrap max-[720px]:text-left">
        <div className="font-semibold text-[var(--success)] text-[12px]">{profile.lastLogin.time}</div>
        <div>{profile.lastLogin.location}</div>
        <div>{profile.lastLogin.device}</div>
      </div>
    </div>
  );
}
