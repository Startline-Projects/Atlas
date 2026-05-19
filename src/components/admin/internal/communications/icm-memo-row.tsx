'use client';

/* admin.html lines 66072-66136 + CSS 31478-31522: single memo table row
   Inline audience cell color: super (Admin/Super Admin) or success (Manager-scoped) */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type { IcmMemoRow as IcmMemoRowData } from '@/lib/mock-data/admin/communications-data';

interface IcmMemoRowProps {
  row: IcmMemoRowData;
}

const TD_BASE = 'py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle';

export function IcmMemoRow({ row }: IcmMemoRowProps) {
  const { showAction } = useAdminActionToast();
  const navigate = () => showAction(`Open memo: ${row.title}`);

  const audienceColor =
    row.audienceColor === 'super' ? 'var(--super)' : 'var(--success)';

  return (
    <tr
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open memo ${row.title}`}
      className="cursor-pointer transition-colors hover:bg-[var(--paper-deep)]"
    >
      <td className={`${TD_BASE} font-bold text-[var(--ink)] tracking-[-0.01em] text-[13px]`}>
        <span className="block mb-[2px] font-mono text-[9px] tracking-[0.12em] uppercase font-bold text-[var(--ink-mute)]">
          {row.eyebrow}
        </span>
        {row.title}
      </td>
      <td className={`${TD_BASE} font-mono text-[11px] text-[var(--ink-soft)] font-bold tracking-[0.02em]`}>
        {row.author}
      </td>
      <td
        className={`${TD_BASE} font-mono text-[10px] font-bold tracking-[0.06em] uppercase`}
        style={{ color: audienceColor }}
      >
        {row.audience}
      </td>
      <td className={`${TD_BASE} font-mono text-[11.5px] text-[var(--ink)] font-bold tracking-[0.02em] text-right tabular-nums`}>
        {row.views}
      </td>
      <td className={`${TD_BASE} font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]`}>
        {row.publishedDate} · {row.publishedRel}
      </td>
    </tr>
  );
}
