'use client';

/**
 * Phase 16a — Incident quick stats rail card ("At a glance").
 *
 * admin.html CSS: .fr-quickstats + .fr-qs-row (L16622-16668)
 * admin.html markup: L41248-41287
 *
 * Clone of FraudQuickStats with per-row valueColor variant.
 * Padding 18 / 20. h3 MONO 9.5px tracking 0.16em uppercase ink-mute bold.
 * Row: dashed border-b, qs-label mono 10.5px, qs-value body 12.5px 600 ink.
 */
import type { IncidentQuickStatRow, IncidentValueColor } from '@/lib/mock-data/admin/incidents-data';

const VALUE_COLOR: Record<IncidentValueColor, string> = {
  danger: 'text-[var(--danger)]',
  amber: 'text-[var(--amber)]',
  success: 'text-[var(--success)]',
};

interface IncidentQuickStatsProps {
  stats: IncidentQuickStatRow[];
}

export function IncidentQuickStats({ stats }: IncidentQuickStatsProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
        At a glance
      </h3>
      <div className="flex flex-col">
        {stats.map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between items-baseline gap-[12px] py-[8px] text-[12.5px] ${
              i < stats.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''
            }`}
          >
            <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)]">
              {row.label}
            </span>
            {row.href ? (
              <span
                className={`font-body font-semibold tracking-[-0.01em] text-right underline cursor-pointer hover:text-[var(--super)] ${row.valueColor ? VALUE_COLOR[row.valueColor] : 'text-[var(--ink)]'}`}
                onClick={() => console.log('[si-quick-stat]', row.label, row.href)}
              >
                {row.value}
              </span>
            ) : (
              <span className={`font-body font-semibold tracking-[-0.01em] text-right ${row.valueColor ? VALUE_COLOR[row.valueColor] : 'text-[var(--ink)]'}`}>
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
