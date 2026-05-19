'use client';

/* admin.html lines 65859-65861: stateless filter buttons (no .active state per admin.html) */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { IcmFilterButton as IcmFilterButtonData } from '@/lib/mock-data/admin/communications-data';

interface IcmFilterButtonProps {
  button: IcmFilterButtonData;
}

export function IcmFilterButton({ button }: IcmFilterButtonProps) {
  const { showAction } = useAdminActionToast();
  return (
    <button
      type="button"
      onClick={() => showAction(`Filter announcements: ${button.label}`)}
      className="inline-flex items-center gap-[6px] py-[7px] px-[14px] font-mono text-[10.5px] font-semibold tracking-[0.04em] uppercase rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-soft)] cursor-pointer transition-colors hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
    >
      {button.label}
    </button>
  );
}
