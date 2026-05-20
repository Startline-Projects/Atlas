/* admin.html channel-card icons — markup lines 68393/68429/68465/68501/68537/68573 (14px SVG,
   stroke-width 2.2). CSS 33279-33291 (.rtch-icon 28px rounded-7px; .subscribed → success tint).
   6 verbatim glyphs, one per channel domain. */

import type { RtChannelIconKey } from '@/lib/mock-data/admin/realtime-data';

function Glyph({ icon }: { icon: RtChannelIconKey }) {
  switch (icon) {
    case 'payments':
      return (
        <>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </>
      );
    case 'audit':
      return (
        <>
          <polyline points="4 4 4 20 20 20" />
          <polyline points="4 12 12 4 16 8 20 4" />
        </>
      );
    case 'users':
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </>
      );
    case 'safety':
      return (
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      );
    case 'performance':
      return <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />;
    case 'incidents':
    default:
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
      );
  }
}

export function RtChannelIcon({ icon }: { icon: RtChannelIconKey }) {
  return (
    <span className="w-[28px] h-[28px] rounded-[7px] grid place-items-center flex-shrink-0 bg-[var(--success-bg)] text-[var(--success)]">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <Glyph icon={icon} />
      </svg>
    </span>
  );
}
