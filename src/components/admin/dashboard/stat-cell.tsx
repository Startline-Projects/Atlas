'use client';

import { Sparkline } from './sparkline';

interface Delta {
  direction: 'up' | 'down' | 'flat';
  value: string;
}

interface BreakdownItem {
  key?: string;
  value: string;
}

interface StatCellProps {
  label: string;
  value: string;
  valueSuffix?: string;
  currencyPrefix?: boolean;
  delta?: Delta;
  breakdown?: BreakdownItem[];
  detail?: string;
  hasSparkline?: boolean;
  sparklineHeights?: readonly number[];
  sparklinePeakIndex?: number;
}

const deltaSymbols = {
  up: '↑',
  down: '↓',
  flat: '↔',
};

const deltaColors = {
  up: 'text-[var(--color-success)]',
  down: 'text-[var(--color-danger)]',
  flat: 'text-[var(--color-ink-mute)]',
};

export function StatCell({
  label,
  value,
  valueSuffix,
  currencyPrefix,
  delta,
  breakdown,
  detail,
  hasSparkline,
  sparklineHeights,
  sparklinePeakIndex,
}: StatCellProps) {
  return (
    <div
      className={`group relative px-[22px] py-[18px] border-r border-b border-[var(--color-line-soft)] transition-all hover:bg-[var(--color-cream-hover)] cursor-default
        [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0
        max-[880px]:[&:nth-child(2n)]:border-r-0 max-[880px]:[&:nth-last-child(-n+2)]:border-b-0
        max-[480px]:[&]:border-r-0 max-[480px]:[&:last-child]:border-b-0`}
    >
      {/* Label */}
      <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--color-ink-mute)] mb-2 flex items-center gap-[6px]">
        {label}
      </div>

      {/* Value */}
      <div className="font-display text-[28px] font-medium text-[var(--color-ink)] leading-none flex items-baseline gap-[6px] -tracking-[0.02em]">
        {currencyPrefix && (
          <span className="text-[16px] text-[var(--color-ink-mute)] font-medium mr-[-2px]">
            $
          </span>
        )}
        <span>{value}</span>
        {valueSuffix && (
          <span className="text-[14px] text-[var(--color-ink-mute)] font-mono tracking-[0.02em]">
            {valueSuffix}
          </span>
        )}
        {delta && (
          <span
            className={`font-mono text-[11.5px] font-semibold tracking-[0.04em] ml-[2px] inline-flex items-center gap-[2px] ${
              deltaColors[delta.direction]
            }`}
          >
            {deltaSymbols[delta.direction]} {delta.value}
          </span>
        )}
      </div>

      {/* Detail or Breakdown */}
      {(breakdown || detail) && (
        <div className="mt-[10px] font-mono text-[11px] tracking-[0.02em] text-[var(--color-ink-mute)] leading-[1.5] flex flex-wrap gap-[4px_12px]">
          {breakdown ? (
            breakdown.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {item.key && (
                  <span className="text-[9.5px] uppercase tracking-[0.1em]">
                    {item.key}
                  </span>
                )}
                <strong className="text-[var(--color-ink-soft)] font-semibold">
                  {item.value}
                </strong>
              </span>
            ))
          ) : (
            <span>{detail}</span>
          )}
        </div>
      )}

      {/* Sparkline */}
      {hasSparkline && sparklineHeights && sparklinePeakIndex !== undefined && (
        <Sparkline
          heights={sparklineHeights}
          peakIndex={sparklinePeakIndex}
        />
      )}
    </div>
  );
}
