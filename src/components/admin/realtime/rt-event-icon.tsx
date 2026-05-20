/* admin.html ticker event icons — markup lines 68196-68304 (each rt-event embeds a verbatim
   12px SVG matching its type) + CSS 33125-33138 (rte-icon + 7 type tone variants).
   22px circle; bg/color per type. */

import type { RtEventIconType } from '@/lib/mock-data/admin/realtime-data';

const ICON_TONE: Record<RtEventIconType, string> = {
  payment: 'bg-[var(--success-bg)] text-[var(--success)]',
  metric: 'bg-[var(--success-bg)] text-[var(--success)]',
  candidate: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  dispute: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  audit: 'bg-[var(--paper-deep)] text-[var(--ink-soft)]',
  review: 'bg-[var(--paper-deep)] text-[var(--ink-soft)]',
  fraud: 'bg-[var(--danger-bg)] text-[var(--danger)]',
};

function Glyph({ type }: { type: RtEventIconType }) {
  switch (type) {
    case 'payment':
      return (
        <>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </>
      );
    case 'candidate':
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </>
      );
    case 'metric':
      return <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />;
    case 'review':
      return (
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      );
    case 'dispute':
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
      );
    case 'fraud':
      return (
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      );
    case 'audit':
    default:
      return (
        <>
          <polyline points="4 4 4 20 20 20" />
          <polyline points="4 12 12 4 16 8 20 4" />
        </>
      );
  }
}

export function RtEventIcon({ type }: { type: RtEventIconType }) {
  return (
    <span
      className={`w-[22px] h-[22px] rounded-full grid place-items-center flex-shrink-0 ${ICON_TONE[type]}`}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <Glyph type={type} />
      </svg>
    </span>
  );
}
