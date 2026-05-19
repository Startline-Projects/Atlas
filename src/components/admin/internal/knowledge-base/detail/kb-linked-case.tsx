'use client';

/* admin.html lines 66994-67022 + CSS 31779-31807: single linked-case row
   id arrow (super) + title + meta · dashed bottom border · click → toast */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { KbLinkedCase } from '@/lib/mock-data/admin/knowledge-base-data';

interface KbLinkedCaseRowProps {
  linkedCase: KbLinkedCase;
}

export function KbLinkedCaseRow({ linkedCase }: KbLinkedCaseRowProps) {
  const { showAction } = useAdminActionToast();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => showAction(`Open case ${linkedCase.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showAction(`Open case ${linkedCase.id}`);
        }
      }}
      className="grid grid-cols-1 gap-[4px] py-[9px] border-b border-b-dashed border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] -mx-[16px] px-[16px]"
    >
      <div className="font-mono text-[10.5px] font-bold text-[var(--super)] tracking-[0.02em]">
        {linkedCase.id} →
      </div>
      <div className="text-[11.5px] font-semibold text-[var(--ink)] tracking-[-0.005em] leading-[1.4]">
        {linkedCase.title}
      </div>
      <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] font-medium">
        {linkedCase.meta}
      </div>
    </div>
  );
}
