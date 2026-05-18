'use client';

/* admin.html lines 64857-65123: full LIST view orchestrator
   page-header + 5-stat strip + 7 filter chips + active callout + resolved table + footer */

import { useState } from 'react';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import { IcPageHeader } from './ic-page-header';
import { IcFilterChips } from './ic-filter-chips';
import { IcActiveCalloutCard } from './ic-active-callout';
import { IcTable } from './ic-table';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  IcPageMeta,
  IcHeaderAction,
  IcFilterChip,
  IcActiveCallout,
  IcIncidentRow,
} from '@/lib/mock-data/admin/internal-incidents-data';

interface IcShellProps {
  meta: IcPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  headerActions: IcHeaderAction[];
  topStats: PrStat[];
  filterChips: IcFilterChip[];
  activeCallout: IcActiveCallout;
  resolvedRows: IcIncidentRow[];
  resolvedEyebrow: string;
  resolvedTitle: string;
  resolvedHint: string;
  footerSummaryHtml: string;
  archiveButtonLabel: string;
}

export function IcShell({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  headerActions,
  topStats,
  filterChips,
  activeCallout,
  resolvedRows,
  resolvedEyebrow,
  resolvedTitle,
  resolvedHint,
  footerSummaryHtml,
  archiveButtonLabel,
}: IcShellProps) {
  const initialActive = filterChips.find((c) => c.active)?.value ?? 'all';
  const [activeFilter, setActiveFilter] = useState<string>(initialActive);
  const { showAction } = useAdminActionToast();

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <IcPageHeader
        meta={meta}
        metaPulseHtml={metaPulseHtml}
        searchPlaceholder={searchPlaceholder}
        actions={headerActions}
      />

      <PrStatStrip stats={topStats} />

      <IcFilterChips
        chips={filterChips}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <IcActiveCalloutCard callout={activeCallout} />

      {/* Recently resolved section header */}
      <div className="flex items-center justify-between mb-[12px] flex-wrap gap-[10px]">
        <div>
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
            {resolvedEyebrow}
          </div>
          <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 leading-[1.2]">
            {resolvedTitle}
          </h2>
        </div>
        <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
          {resolvedHint}
        </span>
      </div>

      <IcTable rows={resolvedRows} />

      {/* Footer summary + Archive button */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span
          className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: footerSummaryHtml }}
        />
        <button
          type="button"
          onClick={() => showAction('Show 2024 + earlier incident archive')}
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {archiveButtonLabel}
        </button>
      </div>
    </div>
  );
}
