'use client';

import type { AdminProfile, AdminActionBtn, AdminActionKey } from '@/lib/mock-data/admin/admin-profiles-data';
import { ADMIN_ACTIONS } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminActionsRowProps {
  profile: AdminProfile;
}

// admin.html lines 21270 / 21275 / 21279 / 21283 / 21288 / 21292 — per-action SVG icons
function ActionIcon({ keyName }: { keyName: AdminActionKey }) {
  switch (keyName) {
    case 'modify-role':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'modify-permissions':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'reset-2fa':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      );
    case 'force-logout':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    case 'suspend':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
      );
    case 'terminate':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      );
    default:
      return null;
  }
}

function ActionButton({ btn, profileId }: { btn: AdminActionBtn; profileId: string }) {
  const isDanger = btn.variant === 'danger';
  return (
    <button
      type="button"
      data-adm-action={btn.key}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log(`[admin-action] ${btn.key} clicked for ${profileId}`);
      }}
      className={cn(
        // admin.html line 5382: .cd-action-btn base
        'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer transition-all duration-150 ease whitespace-nowrap [&>svg]:flex-shrink-0 [&>svg]:transition-colors [&>svg]:duration-150',
        isDanger
          // admin.html line 5422: .cd-action-btn.danger
          ? 'bg-[var(--paper)] text-[var(--danger)] border-[rgba(194,65,43,0.3)] [&>svg]:text-[var(--danger)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)] hover:[&>svg]:text-[var(--danger)]'
          : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] [&>svg]:text-[var(--ink-mute)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] hover:[&>svg]:text-[var(--ink)]'
      )}
    >
      <ActionIcon keyName={btn.key} />
      {btn.label}
      {btn.superOnly && (
        // admin.html line 9073: .super-only-badge (Phase 9a reuse)
        <span
          className="inline-flex items-center gap-[4px] font-mono text-[8.5px] tracking-[0.12em] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[6px] rounded-[3px] font-semibold ml-[6px]"
          style={{ verticalAlign: '3px' }}
        >
          SUPER
        </span>
      )}
    </button>
  );
}

export function AdminActionsRow({ profile }: AdminActionsRowProps) {
  // 4 default + divider + 2 danger
  const defaults = ADMIN_ACTIONS.filter((a) => a.variant !== 'danger');
  const dangers = ADMIN_ACTIONS.filter((a) => a.variant === 'danger');

  return (
    // admin.html line 9054: .adm-actions-row — strip with top-border + paper-deep bg
    <div
      id="admActionsRow"
      className="flex flex-wrap gap-[8px] py-[18px] px-[26px] pb-[26px] border-t border-[var(--line)] bg-[var(--paper-deep)] items-center max-[720px]:py-[16px] max-[720px]:px-[18px] max-[720px]:pb-[22px]"
    >
      <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mr-[8px]">
        ADMIN ACTIONS
      </span>
      {defaults.map((btn) => (
        <ActionButton key={btn.key} btn={btn} profileId={profile.id} />
      ))}
      {/* admin.html line 5447: .cd-action-divider */}
      <div aria-hidden="true" className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" />
      {dangers.map((btn) => (
        <ActionButton key={btn.key} btn={btn} profileId={profile.id} />
      ))}
    </div>
  );
}
