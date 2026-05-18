/* admin.html lines 60997-61005: .cs-cat-card.add-new dashed card variant */

import type { CsAddCategoryCard } from '@/lib/mock-data/admin/categories-skills-data';

interface CsCatAddCardProps {
  card: CsAddCategoryCard;
}

export function CsCatAddCard({ card }: CsCatAddCardProps) {
  return (
    <div className="grid place-items-center min-h-[220px] border-[2px] border-dashed border-[var(--line)] bg-[var(--paper-deep)] cursor-pointer hover:border-[var(--ink-mute)] hover:bg-[var(--paper)] transition-all rounded-[var(--r-md)]">
      <div className="text-center p-[20px]">
        {/* Icon */}
        <div className="w-[44px] h-[44px] rounded-full bg-[var(--ink)] text-[var(--paper)] grid place-items-center mx-auto mb-[12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>

        {/* Title */}
        <div className="font-display text-[15px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px]">
          {card.title}
        </div>

        {/* Meta */}
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          {card.meta}
        </div>
      </div>
    </div>
  );
}
