/* admin.html group-head icons + CSS 32263-32281: 28px rounded-7px square, 8 type variants */

import type { GsGroupIconType } from '@/lib/mock-data/admin/search-results-data';

interface GsGroupIconProps {
  type: GsGroupIconType;
}

const variantClasses: Record<GsGroupIconType, string> = {
  users: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  audit: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  compliance: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  fraud: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  suspensions: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  transactions: 'bg-[var(--success-bg)] text-[var(--success)]',
  notifications: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  internal: 'bg-[var(--ink)] text-[var(--paper)]',
};

function renderIcon(type: GsGroupIconType) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (type) {
    case 'users':
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>;
    case 'fraud':
      return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    case 'suspensions':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>;
    case 'audit':
      return <svg {...common}><polyline points="4 4 4 20 20 20" /><polyline points="4 12 12 4 16 8 20 4" /></svg>;
    case 'compliance':
      return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case 'internal':
      return <svg {...common}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
    case 'notifications':
      return <svg {...common}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    case 'transactions':
      return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
    default:
      return null;
  }
}

export function GsGroupIcon({ type }: GsGroupIconProps) {
  return (
    <div
      className={`w-[28px] h-[28px] rounded-[7px] grid place-items-center flex-shrink-0 ${variantClasses[type]}`}
    >
      {renderIcon(type)}
    </div>
  );
}
