import { RsSeverityDot } from './rs-severity-dot';
import { RsTag } from './rs-tag';
import { RsStatusPill } from './rs-status-pill';
import type { RsSubmissionRow } from '@/lib/mock-data/admin/regulatory-submissions-data';

interface RsSubmissionRowProps {
  row: RsSubmissionRow;
}

export function RsSubmissionRowComponent({ row }: RsSubmissionRowProps) {
  return (
    <div
      className={`grid grid-cols-[22px_minmax(0,1fr)_140px_110px_100px] gap-[14px] items-center py-[14px] px-[20px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] relative ${
        row.variant === 'urgent'
          ? 'bg-[rgba(194,65,43,0.03)] before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[var(--danger)]'
          : row.variant === 'warn'
            ? 'bg-[rgba(232,118,58,0.03)] before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[var(--amber)]'
            : ''
      } max-[980px]:grid-cols-[22px_minmax(0,1fr)_100px] max-[980px]:before:hidden max-[720px]:grid-cols-[22px_minmax(0,1fr)] max-[720px]:py-[12px] max-[720px]:px-[16px]`}
    >
      {/* Severity dot */}
      <div className="grid place-items-center">
        <RsSeverityDot variant={row.variant || undefined} />
      </div>

      {/* Title block */}
      <div className="min-w-0">
        <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.01em] leading-[1.3] mb-[3px]">
          {row.name}
        </div>
        <div
          className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mb-[5px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold"
          dangerouslySetInnerHTML={{ __html: row.metaHtml }}
        />
        <div className="inline-flex items-center gap-[5px] flex-wrap">
          {row.tags.map((tag, idx) => (
            <RsTag key={idx} label={tag.label} variant={tag.variant || undefined} />
          ))}
        </div>
      </div>

      {/* Deadline column */}
      <div
        className={`font-mono text-[11px] font-bold tracking-[0.02em] font-variant-numeric-tabular-nums ${
          row.variant === 'urgent'
            ? 'text-[var(--danger)]'
            : row.variant === 'warn'
              ? 'text-[var(--amber)]'
              : row.variant === 'done'
                ? 'text-[var(--success)]'
                : 'text-[var(--ink-soft)]'
        } max-[720px]:hidden`}
      >
        {row.variant === 'done' && <span>✓ </span>}
        {row.deadlineDate}
        <div
          className={`block text-[9.5px] font-medium tracking-[0.04em] mt-[3px] ${
            row.variant === 'urgent'
              ? 'text-[var(--danger)] font-bold'
              : row.variant === 'warn'
                ? 'text-[var(--amber)]'
                : row.variant === 'done'
                  ? 'text-[var(--success)]'
                  : 'text-[var(--ink-mute)]'
          }`}
        >
          {row.deadlineRel}
        </div>
      </div>

      {/* Status pill */}
      <div className="max-[980px]:hidden">
        <RsStatusPill variant={row.statusPill} label={row.statusLabel} />
      </div>

      {/* Action button */}
      <div className="grid place-items-end max-[980px]:hidden">
        <button
          type="button"
          aria-label="Open"
          className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
