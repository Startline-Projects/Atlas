'use client';

import type { AdminProfile, AdminRole } from '@/lib/mock-data/admin/admin-profiles-data';
import { AV_GRADIENTS } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminRosterCardProps {
  profile: AdminProfile;
  isActive: boolean;
  onClick: () => void;
}

// admin.html lines 8499-8532 — role-pill 6 variants with ::before dot
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

export function AdminRosterCard({ profile, isActive, onClick }: AdminRosterCardProps) {
  return (
    <article
      data-admin={profile.id}
      data-role={profile.role}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        // admin.html line 8649: adm-card base
        'relative bg-[var(--paper)] border rounded-[var(--r-md)] px-[20px] py-[18px] cursor-pointer transition-[border-color,box-shadow,background-color] duration-[120ms] ease',
        isActive
          ? 'border-[var(--ink)] shadow-[inset_0_0_0_2px_var(--ink)]'
          : 'border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[#FCF9F1]'
      )}
      style={
        // admin.html line 8681: .adm-card.you — cream gradient (only when not active, since active overrides bg)
        profile.isYou && !isActive
          ? { background: 'linear-gradient(135deg, var(--paper) 0%, #F9F4E2 100%)' }
          : undefined
      }
    >
      {/* admin.html line 8687: adm-top — 3-col grid */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[12px] items-center mb-[14px]">
        {/* admin.html line 8694: adm-avatar 44x44 with av-N gradient */}
        <div
          className="w-[44px] h-[44px] rounded-full grid place-items-center font-display text-[14px] font-medium text-[var(--paper)] tracking-[-0.01em] flex-shrink-0"
          style={{ background: AV_GRADIENTS[profile.avatarVariant] }}
          aria-hidden="true"
        >
          {profile.initials}
        </div>
        <div className="min-w-0">
          {/* admin.html line 8709: adm-name 15px semibold ellipsis */}
          <div className="text-[15px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
            {profile.name}
            {profile.isYou && (
              <span
                className="font-mono text-[9px] tracking-[0.14em] uppercase bg-[var(--lime)] text-[var(--ink)] py-[2px] px-[7px] rounded-[3px] font-semibold ml-[8px]"
                style={{ verticalAlign: '3px' }}
              >
                YOU
              </span>
            )}
          </div>
          {/* admin.html line 8718: adm-email mono 11px ink-mute */}
          <div className="font-mono text-[11px] text-[var(--ink-mute)] mt-[2px] tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
            {profile.email}
          </div>
        </div>
        {/* admin.html line 8499: role-pill */}
        <span
          className={cn(
            "inline-flex items-center gap-[6px] py-[4px] pl-[9px] pr-[11px] rounded-full font-mono text-[10.5px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:flex-shrink-0",
            rolePillClass(profile.role)
          )}
        >
          {profile.roleLabel}
        </span>
      </div>

      {/* admin.html line 8730: adm-stats 4-col grid */}
      <div className="grid grid-cols-4 gap-0 bg-[var(--paper-deep)] border border-dashed border-[var(--line-soft)] rounded-[var(--r-sm)] px-[12px] py-[10px]">
        {profile.rosterStats.map((stat, idx) => (
          <div
            key={idx}
            className="text-center border-r border-dashed border-[var(--line-soft)] px-[6px] last:border-r-0"
          >
            <div className="font-mono text-[8.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-semibold mb-[3px]">
              {stat.label}
            </div>
            <div
              className={cn(
                'font-mono text-[12px] font-semibold tracking-[0.02em] [font-variant-numeric:tabular-nums]',
                stat.variant === 'fresh'
                  ? 'text-[var(--success)]'
                  : stat.variant === 'muted'
                    ? 'text-[var(--ink-mute)]'
                    : 'text-[var(--ink)]'
              )}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
