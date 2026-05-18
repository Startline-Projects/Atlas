import type { PsCategoryVariant } from '@/lib/mock-data/admin/platform-settings-data';

interface PsCategoryHeadProps {
  variant: PsCategoryVariant;
  eyebrow: string;
  title: string;
  meta: string;
}

function getCategoryIcon(variant: PsCategoryVariant) {
  const icons: Record<PsCategoryVariant, string> = {
    operational: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    financial: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    comms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    branding: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    security: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  };
  return icons[variant];
}

function getIconGradient(variant: PsCategoryVariant): string {
  const gradients: Record<PsCategoryVariant, string> = {
    operational: 'bg-gradient-to-br from-[var(--super)] to-[#3D2B5A]',
    financial:   'bg-gradient-to-br from-[var(--success)] to-[#1F5C3B]',
    comms:       'bg-gradient-to-br from-[var(--amber)] to-[#A35A2C]',
    branding:    'bg-gradient-to-br from-[#B8A0C9] to-[#6E4F8B]',
    security:    'bg-gradient-to-br from-[var(--danger)] to-[#7E1525]',
  };
  return gradients[variant];
}

export function PsCategoryHead({
  variant,
  eyebrow,
  title,
  meta,
}: PsCategoryHeadProps) {
  return (
    <div className="flex items-center gap-[14px] py-[16px] px-[22px] bg-gradient-to-r from-[var(--paper-deep)] to-[var(--paper)] border-b border-b-[var(--line)]">
      <div className={`w-[40px] h-[40px] rounded-[8px] grid place-items-center flex-shrink-0 text-[var(--paper)] ${getIconGradient(variant)}`}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g dangerouslySetInnerHTML={{ __html: getCategoryIcon(variant) }} />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
          {eyebrow}
        </div>
        <h2 className="font-display text-[19px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 mb-[3px] leading-[1.2]">
          {title}
        </h2>
        <div
          className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: meta }}
        />
      </div>
    </div>
  );
}
