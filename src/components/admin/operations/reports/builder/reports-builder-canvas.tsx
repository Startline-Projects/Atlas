/**
 * Phase 14d — MIDDLE column · canvas with 5 config blocks.
 *
 * admin.html markup: L38963-39059
 * admin.html CSS: L14963-15140
 *
 * 'use client' — viz picker state (Line/Bar/Table/Map/KPI).
 */
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ConfigBlockIcon, VizIcon } from './reports-builder-icons';
import type {
  ReportsBuilderCanvas,
  ReportsBuilderConfigBlock,
  ReportsBuilderConfigChip,
  ConfigChipVariant,
  VizKey,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsBuilderCanvasProps {
  data: ReportsBuilderCanvas;
}

function chipBg(v: ConfigChipVariant): string {
  switch (v) {
    case 'metric': return 'bg-[var(--ink)]';
    case 'filter': return 'bg-[var(--super)]';
    case 'group':  return 'bg-[var(--ink-soft)]';
    case 'viz':    return 'bg-[var(--success)]';
    case 'range':  return 'bg-[var(--amber)]';
  }
}

function ConfigChip({ chip }: { chip: ReportsBuilderConfigChip }) {
  return (
    // rb-config-chip — L15050-15080
    <span
      className={cn(
        'inline-flex items-center gap-[6px] py-[5px] pl-[10px] pr-[4px] rounded-full text-[var(--paper)] font-body text-[11.5px] font-medium tracking-[-0.005em] whitespace-nowrap max-w-full',
        chipBg(chip.variant)
      )}
    >
      <span className="truncate">{chip.text}</span>
      <button
        type="button"
        aria-label="Remove"
        data-rep-action="remove-config"
        data-config-key={chip.key}
        onClick={() => console.log('[rb-action] remove-config', chip.key)}
        className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[rgba(251,248,242,0.15)] text-[var(--paper)] text-[12px] font-bold leading-none cursor-pointer border-0 transition-colors duration-[120ms] hover:bg-[rgba(251,248,242,0.30)]"
      >
        ×
      </button>
    </span>
  );
}

function ConfigBlockEl({ block }: { block: ReportsBuilderConfigBlock }) {
  return (
    // rb-config-block — L14979-14988
    <div className="mb-[14px] pb-[14px] border-b border-dashed border-[var(--line-soft)] last:mb-0 last:pb-0 last:border-b-0">
      {/* rcb-label — L14989-15016 */}
      <div className="flex items-center gap-[8px] font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
        <ConfigBlockIcon icon={block.iconKey} />
        <span>{block.label}</span>
        {block.required && (
          <span className="ml-auto font-mono text-[9px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[1px] px-[5px] rounded-[3px] font-semibold normal-case">
            required
          </span>
        )}
      </div>
      {/* rb-slot has-content — L15019-15039 */}
      <div className="min-h-[38px] flex flex-wrap gap-[6px] items-center py-[6px] px-[8px] rounded-[6px] border-[1.5px] border-solid border-[var(--line)] bg-transparent">
        {block.chips.map((chip) => (
          <ConfigChip key={chip.key} chip={chip} />
        ))}
        {block.addBtnLabel && (
          <button
            type="button"
            data-rep-action={block.addBtnKey}
            onClick={() => console.log('[rb-action]', block.addBtnKey)}
            className="inline-flex items-center gap-[4px] py-[5px] px-[10px] bg-transparent border border-dashed border-[var(--line-strong)] rounded-full font-mono text-[11px] font-semibold text-[var(--ink-mute)] tracking-[0.02em] cursor-pointer transition-all duration-[120ms] ease hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          >
            {block.addBtnLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export function ReportsBuilderCanvas({ data }: ReportsBuilderCanvasProps) {
  const [activeViz, setActiveViz] = useState<VizKey>(data.vizPicker.defaultActive);

  return (
    // rb-canvas — L14964-14968
    <div className="py-[18px] px-[22px] border-r border-[var(--line)] bg-[var(--paper)] max-[1080px]:border-r-0 max-[720px]:border-l-0 max-[720px]:border-t max-[720px]:border-t-[var(--line)]">
      <h4 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[12px]">
        {data.headerLabel}
      </h4>

      <ConfigBlockEl block={data.metricBlock} />
      <ConfigBlockEl block={data.filtersBlock} />
      <ConfigBlockEl block={data.groupByBlock} />

      {/* Viz picker — L15109-15140 */}
      <div className="mb-[14px] pb-[14px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-center gap-[8px] font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
          <ConfigBlockIcon icon={data.vizPicker.iconKey} />
          <span>{data.vizPicker.label}</span>
        </div>
        <div
          role="tablist"
          className="inline-flex gap-[4px] bg-[var(--paper-deep)] p-[3px] border border-[var(--line)] rounded-[6px] flex-wrap"
        >
          {data.vizPicker.options.map((opt) => {
            const isActive = opt.key === activeViz;
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-rep-viz={opt.key}
                onClick={() => setActiveViz(opt.key)}
                className={cn(
                  'inline-flex items-center gap-[5px] py-[5px] px-[9px] font-body text-[11.5px] tracking-[-0.005em] rounded-[4px] cursor-pointer transition-all duration-[120ms] ease',
                  isActive
                    ? 'bg-[var(--paper)] text-[var(--ink)] font-semibold shadow-[0_1px_2px_rgba(14,14,12,0.06)]'
                    : 'text-[var(--ink-mute)] font-medium hover:text-[var(--ink)]'
                )}
              >
                <VizIcon icon={opt.key} />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <ConfigBlockEl block={data.dateRangeBlock} />
    </div>
  );
}
