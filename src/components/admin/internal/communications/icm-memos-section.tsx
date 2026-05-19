'use client';

/* admin.html lines 66044-66146: Section 04 Memos
   Section head with "Publish new memo" primary action (handled by parent shell rightSlot) + table + footer */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { IcmMemosData } from '@/lib/mock-data/admin/communications-data';
import { IcmMemosTable } from './icm-memos-table';

interface IcmMemosSectionProps {
  data: IcmMemosData;
}

export function IcmMemosSection({ data }: IcmMemosSectionProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div>
      <IcmMemosTable rows={data.rows} />
      <div className="mt-[14px] flex items-center justify-between gap-[12px] flex-wrap font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
        <span>{data.footerText}</span>
        <button
          type="button"
          onClick={() => showAction('Open memos archive')}
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {data.footerActionLabel}
        </button>
      </div>
    </div>
  );
}
