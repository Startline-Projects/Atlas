/* admin.html lines 61233-61465: tools library pane — 3 sections × 8 cells each + footer */

import { CsToolsSectionComponent } from '../cs-tools-section';
import type { CsToolSection } from '@/lib/mock-data/admin/categories-skills-data';

interface CsToolsPaneProps {
  sections: CsToolSection[];
  footerMeta: string;
  footerButtonLabel: string;
}

export function CsToolsPane({ sections, footerMeta, footerButtonLabel }: CsToolsPaneProps) {
  return (
    <>
      {sections.map((section) => (
        <CsToolsSectionComponent key={section.id} section={section} />
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {footerMeta}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {footerButtonLabel}
        </button>
      </div>
    </>
  );
}
