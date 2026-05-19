/* admin.html lines 67171-67475 + CSS 31999-32013: 32px circular icon with 8 type variants
   Color families: danger (fraud/subscription) / amber (platform/performance/pool) / super (compliance/audit) / success (finance) */

import type { NfcIconType } from '@/lib/mock-data/admin/notifications-data';

interface NfcRowIconProps {
  type: NfcIconType;
}

const variantClasses: Record<NfcIconType, string> = {
  fraud: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  finance: 'bg-[var(--success-bg)] text-[var(--success)]',
  platform: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  compliance: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  pool: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  performance: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  audit: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  subscription: 'bg-[var(--danger-bg)] text-[var(--danger)]',
};

function renderIcon(type: NfcIconType) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (type === 'fraud') {
    // triangle-alert (line 67172 — canonical fraud icon for critical rows; sock-puppet row 10 uses star variant in admin.html)
    return (
      <svg {...common}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (type === 'finance') {
    // refresh-arrows (line 67199 — REF refund flow)
    return (
      <svg {...common}>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    );
  }
  if (type === 'platform') {
    // info-circle (line 67226 — canonical platform incident icon; maintenance row 11 uses wrench variant in admin.html)
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  if (type === 'compliance') {
    // lock (line 67253 — canonical DSR/privacy icon; legal row 9 uses file-text variant in admin.html)
    return (
      <svg {...common}>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (type === 'pool') {
    // trending-down arrows (line 67280)
    return (
      <svg {...common}>
        <line x1="23" y1="6" x2="13.5" y2="15.5" />
        <line x1="13.5" y1="15.5" x2="8.5" y2="10.5" />
        <line x1="8.5" y1="10.5" x2="1" y2="18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    );
  }
  if (type === 'performance') {
    // activity-pulse (line 67307)
    return (
      <svg {...common}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
  if (type === 'audit') {
    // bar-chart (line 67334)
    return (
      <svg {...common}>
        <polyline points="4 4 4 20 20 20" />
        <polyline points="4 12 12 4 16 8 20 4" />
      </svg>
    );
  }
  // subscription — credit-card (line 67361)
  return (
    <svg {...common}>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export function NfcRowIcon({ type }: NfcRowIconProps) {
  return (
    <div
      className={`w-[32px] h-[32px] rounded-full grid place-items-center flex-shrink-0 ${variantClasses[type]}`}
    >
      {renderIcon(type)}
    </div>
  );
}
