'use client';

/**
 * Phase 15a — Quick stats rail card ("At a glance").
 *
 * admin.html CSS: .fr-quickstats + .fr-qs-row (L16622-16668)
 * admin.html markup: L40273-40307
 *
 * Padding 18px 20px. h3 = MONO 9.5px tracking 0.16em uppercase ink-mute bold.
 * qs-label: mono 10.5px tracking 0.04em (NOT uppercase).
 * qs-value: font-body 12.5px font-weight 600 ink tracking -0.01em.
 * Border-bottom dashed line-soft.
 * Value variants: danger, warn. Links: underline, hover:super.
 */
import type { FraudQuickStatRow } from '@/lib/mock-data/admin/fraud-alerts-data';

/** Color class for variant values — admin.html uses .qs-value.danger and .qs-value.warn */
function valueVariant(label: string): string {
  if (label === 'Linked disputes' || label === 'Linked review cluster') return 'text-[var(--danger)]';
  if (label === 'Affected talent' || label === 'SLA remaining') return 'text-[var(--amber)]';
  return 'text-[var(--ink)]';
}

interface FraudQuickStatsProps {
  stats: FraudQuickStatRow[];
}

export function FraudQuickStats({ stats }: FraudQuickStatsProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      {/* h3 — mono uppercase (NOT display) */}
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
                className={`font-body font-semibold tracking-[-0.01em] text-right underline cursor-pointer hover:text-[var(--super)] ${valueVariant(row.label)}`}
                onClick={() => console.log('[fraud-quick-stat]', row.label, row.href)}
              >
                {row.value}
              </span>
            ) : (
              <span className={`font-body font-semibold tracking-[-0.01em] text-right ${valueVariant(row.label)}`}>
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
