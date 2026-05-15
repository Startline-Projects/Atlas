/**
 * Phase 14d — Footer · schedule + recipients + format.
 *
 * admin.html markup: L39100-39157
 * admin.html CSS: L15214-15353
 *
 * 'use client' — schedule + format pill state.
 */
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import type {
  ReportsBuilderFoot,
  ScheduleFreq,
  FormatKey,
  ReportsBuilderRecipient,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsBuilderFootProps {
  data: ReportsBuilderFoot;
}

function RecipientChip({ recipient }: { recipient: ReportsBuilderRecipient }) {
  return (
    // rb-recipient-chip — L15285-15325
    <span className="inline-flex items-center gap-[6px] py-[4px] px-[4px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[11.5px] font-medium text-[var(--ink-soft)] tracking-[-0.005em]">
      <span
        aria-hidden="true"
        className="w-[18px] h-[18px] rounded-full grid place-items-center font-display text-[8px] text-[var(--paper)] font-medium flex-shrink-0"
        style={{ background: recipient.gradient }}
      >
        {recipient.initials}
      </span>
      {recipient.name}
      <button
        type="button"
        aria-label="Remove"
        onClick={() => console.log('[rb-action] remove-recipient', recipient.name)}
        className="w-[14px] h-[14px] rounded-full bg-[var(--cream-deep)] text-[var(--ink-mute)] inline-flex items-center justify-center border-0 text-[11px] font-bold leading-none cursor-pointer mr-[2px] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] transition-colors"
      >
        ×
      </button>
    </span>
  );
}

export function ReportsBuilderFoot({ data }: ReportsBuilderFootProps) {
  const [schedule, setSchedule] = useState<ScheduleFreq>(data.schedule.defaultActive);
  const [format, setFormat] = useState<FormatKey>(data.format.defaultActive);

  return (
    // rep-builder-foot — L15215-15230
    <div className="grid grid-cols-3 bg-[var(--paper-deep)] max-[980px]:grid-cols-1 [&>div]:py-[14px] [&>div]:px-[22px] [&>div]:border-r [&>div]:border-r-[var(--line)] [&>div:last-child]:border-r-0 max-[980px]:[&>div]:!border-r-0 max-[980px]:[&>div]:border-b max-[980px]:[&>div]:border-b-[var(--line)] max-[980px]:[&>div:last-child]:!border-b-0">
      {/* Schedule */}
      <div>
        <h4 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[8px]">
          Schedule
        </h4>
        <div role="radiogroup" aria-label="Schedule frequency" className="flex gap-[4px] flex-wrap mb-[8px]">
          {data.schedule.pills.map((p) => {
            const isActive = p.key === schedule;
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setSchedule(p.key)}
                data-rep-schedule={p.key}
                className={cn(
                  'inline-flex items-center gap-[4px] py-[5px] px-[10px] border rounded-full font-body text-[11.5px] tracking-[-0.005em] cursor-pointer transition-all duration-[120ms] ease',
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-semibold'
                    : 'bg-[var(--paper)] text-[var(--ink-mute)] border-[var(--line)] font-medium hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {data.schedule.metaPrefix}
          <strong className="text-[var(--ink-soft)] font-bold">{data.schedule.metaStrong1}</strong>
          {data.schedule.metaMiddle}
          <strong className="text-[var(--ink-soft)] font-bold">{data.schedule.metaStrong2}</strong>
          {data.schedule.metaSuffix}
        </div>
      </div>

      {/* Recipients */}
      <div>
        <h4 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[8px]">
          Send to
        </h4>
        <div className="flex gap-[6px] flex-wrap items-center">
          {data.recipients.list.map((r, idx) => (
            <RecipientChip key={idx} recipient={r} />
          ))}
          <button
            type="button"
            data-rep-action="add-recipient"
            onClick={() => console.log('[rb-action] add-recipient')}
            className="inline-flex items-center gap-[4px] py-[5px] px-[10px] bg-transparent border border-dashed border-[var(--line-strong)] rounded-full font-mono text-[11px] font-semibold text-[var(--ink-mute)] tracking-[0.02em] cursor-pointer transition-all duration-[120ms] ease hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          >
            {data.recipients.addLabel}
          </button>
        </div>
        <div className="mt-[8px] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {data.recipients.meta}
        </div>
      </div>

      {/* Format */}
      <div>
        <h4 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[8px]">
          Format
        </h4>
        <div role="radiogroup" aria-label="Email format" className="flex gap-[4px] flex-wrap">
          {data.format.pills.map((p) => {
            const isActive = p.key === format;
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setFormat(p.key)}
                data-rep-format={p.key}
                className={cn(
                  'inline-flex items-center gap-[4px] py-[5px] px-[10px] border rounded-[4px] font-mono text-[11px] font-semibold tracking-[0.04em] cursor-pointer transition-all duration-[120ms] ease',
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                    : 'bg-[var(--paper)] text-[var(--ink-mute)] border-[var(--line)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <div className="mt-[8px] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {data.format.meta}
        </div>
      </div>
    </div>
  );
}
