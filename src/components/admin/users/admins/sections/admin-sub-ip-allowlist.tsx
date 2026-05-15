'use client';

import type { AdminProfile, AdminIpIconVariant, AdminIpRow } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminSubIpAllowlistProps {
  profile: AdminProfile;
}

// admin.html lines 21068 / 21086 / 21104 — 3 icon SVG variants
function IpIcon({ variant }: { variant: AdminIpIconVariant }) {
  if (variant === 'home') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (variant === 'mobile') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    );
  }
  // building (default)
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6v6H9z" />
    </svg>
  );
}

function IpRowView({ row, profileId }: { row: AdminIpRow; profileId: string }) {
  const handleEdit = () => {
    // eslint-disable-next-line no-console
    console.log(`[admin-ip] edit-ip clicked for ${row.id} on ${profileId}`);
  };
  const handleDelete = () => {
    // eslint-disable-next-line no-console
    console.log(`[admin-ip] delete-ip clicked for ${row.id} on ${profileId}`);
  };

  return (
    // admin.html line 8964: .adm-ip-row
    <div className="grid grid-cols-[auto_1fr_auto_auto] gap-[14px] items-center py-[11px] px-[16px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]">
      {/* admin.html line 8974: .ip-icon */}
      <span
        aria-hidden="true"
        className={cn(
          'w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0',
          row.fresh
            ? 'bg-[var(--success-bg)] text-[var(--success)]'
            : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
        )}
      >
        <IpIcon variant={row.iconVariant} />
      </span>

      <div className="min-w-0">
        {/* admin.html line 8984: .ip-addr */}
        <div className="font-mono text-[12.5px] font-semibold text-[var(--ink)] tracking-[0.02em]">
          {row.addr}
        </div>
        {/* admin.html line 8991: .ip-label */}
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
          {row.label}
        </div>
      </div>

      {/* admin.html line 8998: .ip-last */}
      <span
        className={cn(
          'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap',
          row.fresh ? 'text-[var(--success)] font-semibold' : 'text-[var(--ink-mute)]'
        )}
      >
        {row.lastUsed}
      </span>

      {/* admin.html line 9006: .ip-actions */}
      <div className="inline-flex gap-[6px]">
        <button
          type="button"
          onClick={handleEdit}
          aria-label="Edit IP"
          data-adm-action="edit-ip"
          className="w-[26px] h-[26px] rounded-full border border-[var(--line)] bg-[var(--paper)] grid place-items-center cursor-pointer text-[var(--ink-mute)] transition-[background,color] duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Remove IP"
          data-adm-action="delete-ip"
          className="w-[26px] h-[26px] rounded-full border border-[var(--line)] bg-[var(--paper)] grid place-items-center cursor-pointer text-[var(--ink-mute)] transition-[background,color] duration-[120ms] ease hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AdminSubIpAllowlist({ profile }: AdminSubIpAllowlistProps) {
  const { ipAllowlist } = profile;

  const handleAdd = () => {
    // eslint-disable-next-line no-console
    console.log(`[admin-ip] add-ip clicked for ${profile.id}`);
  };

  return (
    // admin.html line 21059: adm-sub wrapper (dashed-bottom + 22 mb/pb)
    <div className="mb-[22px] pb-[22px] border-b border-dashed border-[var(--line-soft)]" id="admSubIPs">
      <div className="flex items-baseline justify-between gap-[12px] mb-[12px] flex-wrap">
        <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] m-0 flex items-center gap-[10px]">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
            03 · 04
          </span>
          IP allowlist
        </h3>
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {ipAllowlist.meta}
        </span>
      </div>

      {/* admin.html line 8958: .adm-allowlist — single unified card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {ipAllowlist.rows.map((row) => (
          <IpRowView key={row.id} row={row} profileId={profile.id} />
        ))}
        {/* admin.html line 9023: .adm-allowlist-foot */}
        <div className="py-[11px] px-[16px] bg-[var(--paper-deep)] border-t border-[var(--line)] flex items-center justify-between flex-wrap gap-[8px]">
          <button
            type="button"
            onClick={handleAdd}
            data-adm-action="add-ip"
            className="font-body text-[12px] bg-transparent border border-dashed border-[var(--line-strong)] text-[var(--ink-soft)] py-[6px] px-[12px] rounded-[var(--r-sm)] cursor-pointer font-medium transition-[background,color] duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
          >
            + Add trusted IP
          </button>
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {ipAllowlist.warningText}
          </span>
        </div>
      </div>
    </div>
  );
}
