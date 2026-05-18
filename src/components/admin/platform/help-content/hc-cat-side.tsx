'use client';

/* admin.html lines 63190-63257: sticky category sidebar — head "CATEGORIES · 8" + 9 nav items with icon + label + count badge */

import type { HcCategoryItem, HcIconKey } from '@/lib/mock-data/admin/help-content-data';

interface HcCatSideProps {
  categories: HcCategoryItem[];
  active: string;
  onChange: (id: string) => void;
}

function CategoryIcon({ icon }: { icon: HcIconKey }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: 14,
    height: 14,
  };
  if (icon === 'square') return <svg {...common}><path d="M3 3h18v18H3z" /></svg>;
  if (icon === 'bolt') return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
  if (icon === 'user') return <svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
  if (icon === 'building') return <svg {...common}><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /></svg>;
  if (icon === 'star') return <svg {...common}><path d="M12 1l3 6 6 1-4.5 4 1 6L12 16l-5.5 2 1-6L3 8l6-1 3-6z" /></svg>;
  if (icon === 'dollar') return <svg {...common}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
  if (icon === 'alert-circle') return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
  if (icon === 'lock') return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
  return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}

export function HcCatSide({ categories, active, onChange }: HcCatSideProps) {
  return (
    <aside className="sticky top-[12px] self-start bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden max-[980px]:static">
      <div className="py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
        CATEGORIES · 8
      </div>
      <div className="flex flex-col">
        {categories.map((cat) => {
          const isActive = cat.id === active;
          const itemClasses = isActive
            ? 'bg-[var(--ink)] text-[var(--paper)]'
            : 'text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]';
          const countClasses = isActive
            ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
            : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={`grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-[9px] py-[9px] px-[14px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors font-body text-[12.5px] font-semibold tracking-[-0.005em] text-left ${itemClasses}`}
            >
              <span className="w-[18px] h-[18px] grid place-items-center flex-shrink-0">
                <CategoryIcon icon={cat.iconKey} />
              </span>
              <span>{cat.label}</span>
              <span className={`font-mono text-[9.5px] font-bold tracking-[0.04em] py-[1px] px-[7px] rounded-full ${countClasses}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
