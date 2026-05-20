/* admin.html ob-section-badge · markup 68139-68142 + CSS 32898-32915
   VERBATIM: admin.html hardcodes ONE circle SVG for every badge — the tour JS
   (81314-81322) only swaps the label text, never the icon. So all badges use the
   same circle glyph (matches fixture iconKey: 'circle'). No invented icon variants. */

import type { ObTourStepBadge } from '@/lib/mock-data/admin/onboarding-data';

interface ObSectionBadgeProps {
  badge: ObTourStepBadge;
}

export function ObSectionBadge({ badge }: ObSectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-[7px] py-[3px] px-[9px] bg-[rgba(110,63,224,0.10)] rounded-[4px] font-mono text-[10px] font-bold tracking-[0.06em] uppercase text-[var(--super)] mb-[8px]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[11px] h-[11px]"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
      <span>{badge.label}</span>
    </div>
  );
}
