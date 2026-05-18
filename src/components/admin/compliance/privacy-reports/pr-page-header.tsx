'use client';

import { PrPeriodSelector } from './pr-period-selector';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { PrPageMeta, PrPeriodOption } from '@/lib/mock-data/admin/privacy-reports-data';

interface PrPageHeaderProps {
  meta: PrPageMeta;
  periodOptions: PrPeriodOption[];
  selectedPeriod: string;
  headerActions: { label: string; isPrimary: boolean; icon?: string }[];
}

export function PrPageHeader({
  meta,
  periodOptions,
  selectedPeriod,
  headerActions,
}: PrPageHeaderProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div className="flex items-start justify-between gap-[20px] mb-[18px] flex-wrap">
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] m-0 leading-[1.1] mb-[4px]">
          {meta.title}
        </h1>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] flex items-center gap-[10px] flex-wrap">
          <span>{meta.meta}</span>
          <span className="inline-flex items-center gap-[6px] py-[3px] px-[8px] bg-[var(--cream-deep)] rounded-full font-mono text-[10px] font-bold tracking-[0.04em] text-[var(--ink-soft)]">
            {meta.pulseLabel}
          </span>
        </div>
      </div>
      <div className="inline-flex gap-[8px] flex-wrap items-center flex-shrink-0">
        <PrPeriodSelector options={periodOptions} selectedValue={selectedPeriod} />
        {headerActions.map((action, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => showAction(action.label)}
            className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full cursor-pointer transition-all whitespace-nowrap ${
              action.isPrimary
                ? 'bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]'
                : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
