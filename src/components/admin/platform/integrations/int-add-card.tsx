/* admin.html lines 61935-61943: .in-card.add-new — dashed border card with centered plus icon, title, meta */

import type { IntegrationAddCard } from '@/lib/mock-data/admin/integrations-data';

interface IntAddCardProps {
  card: IntegrationAddCard;
}

export function IntAddCardComponent({ card }: IntAddCardProps) {
  return (
    <div className="grid place-items-center min-h-[220px] border-[2px] border-dashed border-[var(--line)] bg-[var(--paper-deep)] rounded-[var(--r-md)] cursor-pointer hover:border-[var(--ink-mute)] hover:bg-[var(--paper)] transition-all">
      <div className="text-center p-[20px]">
        <div className="w-[44px] h-[44px] rounded-full bg-[var(--ink)] text-[var(--paper)] grid place-items-center mx-auto mb-[12px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <div className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px]">
          {card.title}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {card.meta}
        </div>
      </div>
    </div>
  );
}
