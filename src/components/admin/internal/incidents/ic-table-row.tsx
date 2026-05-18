'use client';

/* admin.html lines 65009-65111 + CSS 30476-30541: single incident row
   Canonical row gets amber tint + 3px amber left border on first cell
   Row click navigates to detail route */

import { useRouter } from 'next/navigation';
import type { IcIncidentRow, IcPmStatusVariant } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcSevBadge } from './ic-sev-badge';

interface IcTableRowProps {
  row: IcIncidentRow;
}

const pmColorClass: Record<IcPmStatusVariant, string> = {
  complete: 'text-[var(--success)]',
  pending: 'text-[var(--amber)]',
  'not-required': 'text-[var(--ink-mute)]',
};

export function IcTableRow({ row }: IcTableRowProps) {
  const router = useRouter();
  const navigate = () => router.push(`/admin/internal/incidents/${row.id}`);

  const rowBg = row.isCanonical
    ? 'bg-[rgba(232,118,58,0.04)] relative cursor-pointer transition-colors hover:bg-[var(--paper-deep)]'
    : 'cursor-pointer transition-colors hover:bg-[var(--paper-deep)]';

  const firstTdBorder = row.isCanonical
    ? 'border-l-[3px] border-l-[var(--amber)] !pl-[14px]'
    : '';

  return (
    <tr
      className={rowBg}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Open incident ${row.displayId}`}
    >
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[11px] font-bold text-[var(--ink)] tracking-[0.04em] ${firstTdBorder}`}
      >
        {row.displayId}
      </td>
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        <IcSevBadge sev={row.sev} />
      </td>
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-bold text-[var(--ink)] tracking-[-0.01em] text-[13px]">
        {row.title}
        <span
          className="block mt-[3px] font-mono text-[10px] font-medium text-[var(--ink-mute)] tracking-[0.02em]"
          dangerouslySetInnerHTML={{ __html: row.metaHtml }}
        />
      </td>
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[11.5px] font-bold text-[var(--ink-soft)] tracking-[0.04em] tabular-nums">
        {row.duration}
      </td>
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
        {row.resolvedDate}
        <span className="block text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
          {row.resolvedRel}
        </span>
      </td>
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[11px] tracking-[0.02em] font-bold ${pmColorClass[row.pmStatus]}`}
      >
        {row.pmText}
      </td>
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate();
          }}
          className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-[4px] bg-transparent border-0 text-[var(--ink-mute)] hover:text-[var(--ink)] hover:bg-[var(--paper-deep)] cursor-pointer transition-colors"
          aria-label={`Open ${row.displayId}`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
