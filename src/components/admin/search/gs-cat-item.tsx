'use client';

/* admin.html lines 67558-67622 markup + CSS 29114-29155 (shared hc-cat-item pattern)
   Single category sidebar row — bare 18px icon + body-font label + pill count
   Active state inverts entire row to ink bg / paper text; count → paper-alpha pill */

import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import type {
  GsSidebarCategory,
  GsCatIconKey,
} from '@/lib/mock-data/admin/search-results-data';

interface GsCatItemProps {
  category: GsSidebarCategory;
  isActive: boolean;
  onSelect: (key: string) => void;
}

function renderIcon(icon: GsCatIconKey) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (icon) {
    case 'square':
      return <svg {...common}><path d="M3 3h18v18H3z" /></svg>;
    case 'users':
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>;
    case 'triangle-alert':
      return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case 'ban-circle':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>;
    case 'bar-chart':
      return <svg {...common}><polyline points="4 4 4 20 20 20" /><polyline points="4 12 12 4 16 8 20 4" /></svg>;
    case 'lock':
      return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case 'card':
      return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
    case 'info':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    case 'briefcase':
      return <svg {...common}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case 'box':
      return <svg {...common}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>;
    case 'help-circle':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case 'book':
      return <svg {...common}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case 'bell':
      return <svg {...common}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    default:
      return null;
  }
}

export function GsCatItem({ category, isActive, onSelect }: GsCatItemProps) {
  const { showAction } = useAdminActionToast();
  const handleClick = () => {
    onSelect(category.key);
    showAction(`Filter results: ${category.label}`);
  };

  const rowClasses = isActive
    ? 'bg-[var(--ink)] text-[var(--paper)]'
    : 'text-[var(--ink-soft)] hover:bg-[var(--paper-deep)]';
  const countClasses = isActive
    ? 'bg-[rgba(251,248,242,0.15)] text-[rgba(251,248,242,0.85)]'
    : 'bg-[var(--paper-deep)] text-[var(--ink-mute)]';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-[9px] py-[9px] px-[14px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors text-left font-body text-[12.5px] font-semibold tracking-[-0.005em] ${rowClasses}`}
    >
      <span className="w-[18px] h-[18px] grid place-items-center flex-shrink-0">
        {renderIcon(category.iconKey)}
      </span>
      <span className="truncate">{category.label}</span>
      <span
        className={`font-mono text-[9.5px] font-bold tracking-[0.04em] py-[1px] px-[7px] rounded-full ${countClasses}`}
      >
        {category.count}
      </span>
    </button>
  );
}
