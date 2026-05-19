'use client';

/* admin.html lines 66224-66277: sticky category sidebar — head "CATEGORIES · 6" + 7 nav items with icon + label + count
   Mirrors Step 33's HcCatSide Tailwind patterns; Step 37 needs distinct icon set + "CATEGORIES · 6" head label */

import type {
  KbCategoryItem,
  KbCategoryIconKey,
} from '@/lib/mock-data/admin/knowledge-base-data';

interface KbCatSideProps {
  categories: KbCategoryItem[];
  active: string;
  onChange: (value: string) => void;
}

function CategoryIcon({ icon }: { icon: KbCategoryIconKey }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    width: 14,
    height: 14,
  };
  if (icon === 'square') {
    return (
      <svg {...common}>
        <path d="M3 3h18v18H3z" />
      </svg>
    );
  }
  if (icon === 'user') {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    );
  }
  if (icon === 'clipboard') {
    return (
      <svg {...common}>
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    );
  }
  if (icon === 'lock') {
    return (
      <svg {...common}>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (icon === 'triangle-alert') {
    return (
      <svg {...common}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (icon === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  // book
  return (
    <svg {...common}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function KbCatSide({ categories, active, onChange }: KbCatSideProps) {
  return (
    <aside className="sticky top-[12px] self-start bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden max-[980px]:static">
      <div className="py-[10px] px-[14px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
        CATEGORIES · 6
      </div>
      <div className="flex flex-col">
        {categories.map((cat) => {
          const isActive = cat.value === active;
          const itemClasses = isActive
            ? 'bg-[var(--ink)] text-[var(--paper)]'
            : 'text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]';
          const countClasses = isActive
            ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
            : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-[9px] py-[9px] px-[14px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors font-body text-[12.5px] font-semibold tracking-[-0.005em] text-left ${itemClasses}`}
            >
              <span className="w-[18px] h-[18px] grid place-items-center flex-shrink-0">
                <CategoryIcon icon={cat.iconKey} />
              </span>
              <span>{cat.label}</span>
              <span
                className={`font-mono text-[9.5px] font-bold tracking-[0.04em] py-[1px] px-[7px] rounded-full ${countClasses}`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
