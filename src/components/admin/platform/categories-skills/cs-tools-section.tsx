/* admin.html lines 61236-61308 (and similar): single tools section card with head + grid */

import { CsToolCard } from './cs-tool-card';
import { CsToolAddCard } from './cs-tool-add-card';
import type { CsToolSection } from '@/lib/mock-data/admin/categories-skills-data';

interface CsToolsSectionProps {
  section: CsToolSection;
}

export function CsToolsSectionComponent({ section }: CsToolsSectionProps) {
  return (
    <section
      id={section.id}
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden"
    >
      {/* Section head */}
      <div className="py-[14px] px-[20px] bg-gradient-to-r from-[var(--paper-deep)] to-[var(--paper)] border-b border-b-[var(--line-soft)] flex items-center justify-between gap-[12px] flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[2px]">
            {section.title}
          </h3>
          <div
            className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: section.metaHtml }}
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {section.viewAllLabel}
        </button>
      </div>

      {/* Tool grid: 4 cols at 1081+, 3 at 720-1080, 2 at 480-720, 1 at <480 */}
      <div className="grid grid-cols-4 gap-0 max-[1080px]:grid-cols-3 max-[720px]:grid-cols-2 max-[480px]:grid-cols-1">
        {section.tools.map((tool) => (
          <CsToolCard key={tool.id} tool={tool} />
        ))}
        <CsToolAddCard label={section.addCardLabel} />
      </div>
    </section>
  );
}
