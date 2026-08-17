import type { AdminProfile, AdminPermStatus } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminSubPermissionsProps {
  profile: AdminProfile;
}

// admin.html lines 8943-8954 — perm-status variants
function statusVariantClass(status: AdminPermStatus): string {
  switch (status) {
    case 'allow':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'deny-locked':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'deny':
    default:
      return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
  }
}

function StatusIcon({ status }: { status: AdminPermStatus }) {
  if (status === 'allow') {
    // admin.html line 20949 — checkmark stroke 3
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  // deny / deny-locked — × stroke 2.6
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function AdminSubPermissions({ profile }: AdminSubPermissionsProps) {
  const { permissions } = profile;

  return (
    // admin.html line 20932: adm-sub wrapper (mirrors Sub 1 dashed-bottom + 22 mb/pb)
    <div className="mb-[22px] pb-[22px] border-b border-dashed border-[var(--line-soft)]" id="admSubPerms">
      <div className="flex items-baseline justify-between gap-[12px] mb-[12px] flex-wrap">
        <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] m-0 flex items-center gap-[10px]">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold">
            02 · 04
          </span>
          Permissions matrix
        </h3>
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {permissions.meta}
        </span>
      </div>

      {/* admin.html line 8890: .adm-perm-matrix — single unified card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {permissions.groups.map((group, gIdx) => (
          // admin.html line 8896: .adm-perm-group
          <div key={gIdx} className="border-b border-[var(--line)] last:border-b-0">
            {/* admin.html line 8900: .adm-perm-group-head */}
            <div className="py-[9px] px-[16px] bg-[var(--paper-deep)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold border-b border-dashed border-[var(--line-soft)]">
              {group.title}
            </div>
            {group.rows.map((row) => (
              // admin.html line 8911: .adm-perm-row
              <div
                key={row.id}
                data-perm={row.id}
                className="grid grid-cols-[1fr_auto] gap-[12px] items-center py-[11px] px-[16px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]"
              >
                <div>
                  <div className="text-[var(--ink)] font-medium">{row.label}</div>
                  <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] font-normal">
                    {row.reason}
                  </div>
                </div>
                <span
                  className={cn(
                    // admin.html line 8930: .perm-status base
                    'inline-flex items-center gap-[5px] font-mono text-[9.5px] tracking-[0.12em] uppercase font-semibold py-[3px] px-[9px] rounded-[3px] whitespace-nowrap',
                    statusVariantClass(row.status)
                  )}
                >
                  <StatusIcon status={row.status} />
                  {row.statusLabel}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
