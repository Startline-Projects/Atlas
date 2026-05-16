'use client';

import { useRouter } from 'next/navigation';
import { AudSeverityDot } from './aud-severity-dot';
import { AudActionChip } from './aud-action-chip';
import { AudResultPill } from './aud-result-pill';
import type { AudRow as AudRowType } from '@/lib/mock-data/admin/audit-logs-data';

interface AudRowProps {
  row: AudRowType;
}

export function AudRow({ row }: AudRowProps) {
  const router = useRouter();

  const baseRow =
    'grid grid-cols-[140px_16px_minmax(0,1fr)_140px_80px_130px_50px] gap-[10px] items-center py-[8px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] relative font-mono text-[11px] max-[1180px]:grid-cols-[130px_16px_minmax(0,1fr)_110px_110px] max-[720px]:grid-cols-[110px_16px_minmax(0,1fr)] max-[720px]:py-[8px] max-[720px]:px-[12px]';

  const variantBg =
    row.rowVariant === 'recent'
      ? 'bg-[linear-gradient(90deg,rgba(46,125,84,0.04),transparent_60%)]'
      : row.rowVariant === 'failure'
        ? 'bg-[rgba(194,65,43,0.03)]'
        : row.rowVariant === 'critical'
          ? 'bg-[rgba(194,65,43,0.04)]'
          : '';

  const stripPseudo =
    row.rowVariant === 'failure' || row.rowVariant === 'critical'
      ? 'before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--danger)]'
      : '';

  const isSystemActor = row.actor.isSystem;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/admin/compliance/audit-logs/${row.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(`/admin/compliance/audit-logs/${row.id}`);
        }
      }}
      className={`${baseRow} ${variantBg} ${stripPseudo}`}
    >
      <div className="font-mono text-[10.5px] text-[var(--ink-soft)] font-semibold tracking-[0.02em] tabular-nums">
        {row.timestamp.time}
        <span className="block text-[9px] text-[var(--ink-mute)] font-medium tracking-[0.04em] mt-[1px]">
          {row.timestamp.dateRel}
        </span>
      </div>
      <div>
        <AudSeverityDot variant={row.severity} />
      </div>
      <div className="flex min-w-0 flex-col gap-[2px] min-[721px]:flex-row min-[721px]:items-center min-[721px]:gap-[8px]">
        <span
          className="font-body text-[11.5px] text-[var(--ink)] font-semibold tracking-[-0.01em] truncate min-w-0 min-[721px]:flex-1 [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: row.action.textHtml }}
        />
        <span
          className="font-mono text-[10px] text-[var(--ink-mute)] font-semibold tracking-[0.02em] shrink-0 [&_a]:text-[var(--super)] [&_a]:underline [&_span]:underline"
          dangerouslySetInnerHTML={{ __html: row.action.subjectHtml }}
        />
      </div>
      <div className="flex items-center gap-[6px] min-w-0 max-[720px]:hidden">
        <div
          className="w-[18px] h-[18px] rounded-full grid place-items-center font-display text-[8.5px] text-[var(--paper)] font-medium flex-shrink-0"
          style={{ background: row.actor.avatarGradient }}
        >
          {row.actor.initials}
        </div>
        <span className={`text-[10.5px] font-bold tracking-[0.02em] truncate ${isSystemActor ? 'text-[var(--ink-mute)] italic' : 'text-[var(--ink)]'}`}>
          {row.actor.name}
        </span>
      </div>
      <div className="max-[1180px]:hidden">
        <AudResultPill variant={row.result.variant} label={row.result.label} />
      </div>
      <div className="max-[720px]:hidden">
        <AudActionChip variant={row.category.variant} label={row.category.label} />
      </div>
      <div className="flex justify-center max-[1180px]:hidden">
        <span className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-full text-[var(--ink-soft)]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
