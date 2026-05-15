/**
 * Phase 14d — LEFT column · data sources sidebar.
 *
 * admin.html markup: L38899-38961
 * admin.html CSS: L14887-14961
 */
import { cn } from '@/lib/utils/cn';
import { SourceIcon } from './reports-builder-icons';
import type { ReportsBuilderSourceGroup } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsBuilderSourcesProps {
  groups: ReportsBuilderSourceGroup[];
}

export function ReportsBuilderSources({ groups }: ReportsBuilderSourcesProps) {
  return (
    // rb-sources — L14888-14892
    <div className="p-[16px] bg-[var(--paper-deep)] border-r border-[var(--line)] max-[720px]:border-r-0">
      <h4 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[10px]">
        Data sources
      </h4>
      {groups.map((group, gidx) => (
        <div key={gidx} className="mb-[14px] last:mb-0">
          {/* source-group-label — L14906-14917 */}
          <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold pb-[6px] mb-[6px] border-b border-dashed border-[var(--line-soft)] opacity-80">
            {group.label}
          </div>
          {group.chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              draggable
              data-rep-source={chip.key}
              className={cn(
                // rb-source-chip — L14918-14948
                'w-full flex items-center gap-[8px] py-[7px] px-[10px] border rounded-[5px] font-body text-[12px] font-medium tracking-[-0.01em] cursor-grab select-none mb-[4px] transition-all duration-[120ms] ease active:cursor-grabbing hover:translate-x-[2px]',
                chip.inUse
                  ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] [&_svg]:text-[var(--paper)]'
                  : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] [&_svg]:text-[var(--ink-mute)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:[&_svg]:text-[var(--ink)]'
              )}
            >
              <SourceIcon icon={chip.iconKey} />
              <span>{chip.label}</span>
              {chip.inUse && (
                <span aria-hidden="true" className="ml-auto text-[11px] text-[var(--lime)] font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
