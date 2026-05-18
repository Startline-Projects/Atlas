'use client';

/* admin.html lines 62497-62690: 7-column template table row.
   Whole row is clickable via useRouter onClick — chevron renders as visual affordance only. */

import { useRouter } from 'next/navigation';
import { TmStatusPill } from './tm-status-pill';
import type { TmTemplate } from '@/lib/mock-data/admin/templates-data';

interface TmTableRowProps {
  template: TmTemplate;
}

export function TmTableRow({ template }: TmTableRowProps) {
  const router = useRouter();

  const rowClasses = template.isInApproval
    ? 'bg-[rgba(232,118,58,0.04)] relative cursor-pointer transition-colors hover:bg-[var(--paper-deep)]'
    : 'cursor-pointer transition-colors hover:bg-[var(--paper-deep)]';

  const firstTdInApproval = template.isInApproval
    ? 'border-l-[3px] border-l-[var(--amber)] pl-[14px]'
    : '';

  const navigate = () => router.push(`/admin/platform/templates/${template.id}`);

  return (
    <tr
      className={rowClasses}
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`Open template ${template.name}`}
    >
      {/* COL 1: Name + key */}
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-bold tracking-[-0.01em] text-[13px] ${
          template.isArchived ? 'text-[var(--ink-mute)]' : 'text-[var(--ink)]'
        } ${firstTdInApproval}`}
      >
        {template.name}
        <span className="block mt-[3px] font-mono text-[10px] font-medium tracking-[0.02em] text-[var(--ink-mute)]">
          {template.key}
        </span>
      </td>

      {/* COL 2: Flow with arrow separators */}
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[10.5px] tracking-[0.02em] font-semibold ${
          template.isArchived ? 'text-[var(--ink-mute)]' : 'text-[var(--ink-soft)]'
        }`}
      >
        {template.flowParts.map((part, idx) => (
          <span key={idx}>
            {idx > 0 && <span className="text-[var(--ink-mute)] mx-[4px] font-normal">→</span>}
            {part}
          </span>
        ))}
      </td>

      {/* COL 3: Locales + list */}
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[11px] tracking-[0.02em] font-bold tabular-nums ${
          template.isArchived ? 'text-[var(--ink-mute)]' : 'text-[var(--ink-soft)]'
        }`}
      >
        {template.locales.count}
        {template.locales.list && (
          <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
            {template.locales.list}
          </span>
        )}
      </td>

      {/* COL 4: Modified date + author */}
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[11px] tracking-[0.02em] ${
          template.isArchived ? 'text-[var(--ink-mute)]' : 'text-[var(--ink-soft)]'
        }`}
      >
        {template.modified.date}
        <span
          className={`block text-[9.5px] font-bold tracking-[0.02em] mt-[2px] ${
            template.isArchived ? 'text-[var(--ink-mute)]' : 'text-[var(--ink)]'
          }`}
        >
          {template.modified.author}
        </span>
      </td>

      {/* COL 5: Sends + meta (right-aligned) */}
      <td
        className={`py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle font-mono text-[12px] font-bold tracking-[0.02em] tabular-nums text-right ${
          template.isArchived ? 'text-[var(--ink-mute)]' : 'text-[var(--ink)]'
        }`}
      >
        {template.sends.value}
        {template.sends.meta && (
          <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
            {template.sends.meta}
          </span>
        )}
      </td>

      {/* COL 6: Status pill */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle text-left">
        <TmStatusPill status={template.status} label={template.statusLabel} />
      </td>

      {/* COL 7: Chevron affordance (plain SVG, parent row handles click) */}
      <td className="py-[12px] px-[14px] border-b border-b-[var(--line-soft)] align-middle text-right">
        <span
          aria-hidden="true"
          className="inline-grid place-items-center w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full text-[var(--ink-mute)] transition-all group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </td>
    </tr>
  );
}
