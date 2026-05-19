'use client';

/* admin.html lines 67480-67483: footer summary + "Load earlier →" button */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { NfcFooterData } from '@/lib/mock-data/admin/notifications-data';

interface NfcFooterProps {
  data: NfcFooterData;
}

export function NfcFooter({ data }: NfcFooterProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
      <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
        {data.summaryText}
      </span>
      <button
        type="button"
        onClick={() => showAction('Load earlier notifications')}
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
      >
        {data.loadEarlierLabel}
      </button>
    </div>
  );
}
