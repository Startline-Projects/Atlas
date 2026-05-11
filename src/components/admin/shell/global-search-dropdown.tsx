'use client';

import type { SearchResult, SearchGroup, SearchEntityType } from '@/lib/mock-data/admin/search-index';
import { ENTITY_TYPE_LABELS, ENTITY_TYPE_CHIPS } from '@/lib/mock-data/admin/search-index';
import { AV_GRADIENTS } from '@/lib/mock-data/admin/admin-profiles-data';
import { cn } from '@/lib/utils/cn';

interface GlobalSearchDropdownProps {
  query: string;
  groups: SearchGroup[];
  flatResults: SearchResult[];
  activeIndex: number;
  onSelect: (result: SearchResult) => void;
  onHover: (flatIdx: number) => void;
}

// Per-entity chip color tints (mirror role-pill palette)
function chipVariantClass(type: SearchEntityType): string {
  switch (type) {
    case 'candidate':
      return 'bg-[var(--navy-bg)] text-[var(--navy)]';
    case 'client':
      return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'specialist':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'manager':
      return 'bg-[var(--cream-deep)] text-[var(--ink)]';
    case 'engagement':
      return 'bg-[rgba(214,242,77,0.4)] text-[var(--ink)]';
    case 'job':
      return 'bg-[rgba(232,118,58,0.15)] text-[var(--amber)]';
    case 'dispute':
      return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'review':
      return 'bg-[rgba(77,138,130,0.15)] text-[#4D8A82]';
    case 'admin':
    default:
      return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
  }
}

export function GlobalSearchDropdown({
  query,
  groups,
  flatResults,
  activeIndex,
  onSelect,
  onHover,
}: GlobalSearchDropdownProps) {
  const isEmpty = groups.length === 0;

  return (
    <div
      role="listbox"
      aria-label="Global search results"
      className="absolute top-[calc(100%_+_8px)] left-0 w-full bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-[0_8px_24px_rgba(14,14,12,0.10)] z-50 max-h-[480px] overflow-y-auto"
    >
      {isEmpty ? (
        <div className="py-[24px] px-[16px] text-center font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em]">
          No results match <span className="text-[var(--ink)] font-semibold">{query}</span>
        </div>
      ) : (
        groups.map((group) => {
          const groupStartIdx = flatResults.findIndex((r) => r.entityType === group.type);
          return (
            <div key={group.type}>
              {/* Group header */}
              <div className="py-[9px] px-[16px] bg-[var(--paper-deep)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold border-b border-dashed border-[var(--line-soft)] flex items-center justify-between">
                <span>{ENTITY_TYPE_LABELS[group.type]}</span>
                <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] normal-case">
                  {group.results.length} {group.results.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              {/* Result rows */}
              {group.results.map((result, idx) => {
                const flatIdx = groupStartIdx + idx;
                const isActive = flatIdx === activeIndex;
                return (
                  <button
                    key={result.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => onSelect(result)}
                    onMouseEnter={() => onHover(flatIdx)}
                    className={cn(
                      'w-full text-left grid grid-cols-[32px_minmax(0,1fr)_auto] gap-[12px] items-center py-[10px] px-[16px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors duration-[120ms] ease border-l-2',
                      isActive
                        ? 'bg-[var(--cream-deep)] border-l-[var(--ink)]'
                        : 'border-l-transparent hover:bg-[#FCF9F1]'
                    )}
                  >
                    {/* Avatar */}
                    <span
                      aria-hidden="true"
                      className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[12px] font-medium text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
                      style={{ background: AV_GRADIENTS[result.avatarVariant] }}
                    >
                      {result.initials}
                    </span>
                    {/* Name + meta */}
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-semibold text-[var(--ink)] leading-[1.2] whitespace-nowrap overflow-hidden text-ellipsis">
                        {result.name}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.01em] mt-[2px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {result.meta}
                      </div>
                    </div>
                    {/* Right: type chip + atlasId */}
                    <div className="flex flex-col items-end gap-[3px] flex-shrink-0">
                      <span
                        className={cn(
                          'font-mono text-[9px] tracking-[0.16em] uppercase font-semibold py-[2px] px-[7px] rounded-[3px]',
                          chipVariantClass(result.entityType)
                        )}
                      >
                        {ENTITY_TYPE_CHIPS[result.entityType]}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-mute)] bg-[var(--cream-deep)] py-[1px] px-[6px] rounded-[3px] tracking-[0.02em]">
                        {result.atlasId}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
