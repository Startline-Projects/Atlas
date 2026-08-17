import type { AdminStatTile } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface AdminStatsRowProps {
  stats: AdminStatTile[];
}

// admin.html lines 4338-4340 — delta variants
function deltaColorClass(variant: 'up' | 'down' | 'flat'): string {
  switch (variant) {
    case 'up': return 'text-[var(--success)]';
    case 'down': return 'text-[var(--danger)]';
    case 'flat':
    default: return 'text-[var(--ink-mute)]';
  }
}

// admin.html lines 4354-4355 — meta variants
function metaColorClass(variant?: 'warn' | 'danger'): string {
  if (variant === 'warn') return 'text-[var(--amber)]';
  if (variant === 'danger') return 'text-[var(--danger)]';
  return 'text-[var(--ink-mute)]';
}

export function AdminStatsRow({ stats }: AdminStatsRowProps) {
  return (
    // admin.html line 4291: .users-stats — single unified card with internal cell separators
    <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[22px] max-[720px]:grid-cols-2">
      {stats.map((tile, idx) => (
        // admin.html line 4302: .users-stat
        <div
          key={idx}
          className="px-[20px] py-[16px] border-r border-[var(--line-soft)] last:border-r-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(-n+2)]:border-b max-[720px]:[&:nth-child(-n+2)]:border-[var(--line-soft)]"
        >
          {/* admin.html line 4311: .us-label */}
          <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] mb-[7px]">
            {tile.label}
          </div>
          {/* admin.html line 4319: .us-value */}
          <div className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1] [font-variant-numeric:tabular-nums] [font-variation-settings:'opsz'_64] flex items-baseline gap-[6px] text-[var(--ink)]">
            <span>{tile.value}</span>
            {tile.vSuffix && (
              <span className="font-mono text-[13px] text-[var(--ink-mute)] font-normal">
                {tile.vSuffix}
              </span>
            )}
            {tile.delta && (
              <span className={cn('font-mono text-[11px] font-semibold tracking-[0.02em]', deltaColorClass(tile.delta.variant))}>
                {tile.delta.text}
              </span>
            )}
          </div>
          {/* admin.html line 4347: .us-meta */}
          <div className={cn('mt-[7px] font-mono text-[10.5px] tracking-[0.04em]', metaColorClass(tile.metaVariant))}>
            {tile.meta}
          </div>
        </div>
      ))}
    </div>
  );
}
