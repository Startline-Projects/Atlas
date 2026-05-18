/* admin.html lines 62480-62699: email pane — table + footer with meta + load-more button */

import { TmTable } from './tm-table';
import type { TmTemplate } from '@/lib/mock-data/admin/templates-data';

interface TmEmailPaneProps {
  templates: TmTemplate[];
  footerMeta: string;
  footerButtonLabel: string;
}

export function TmEmailPane({ templates, footerMeta, footerButtonLabel }: TmEmailPaneProps) {
  return (
    <div>
      <TmTable templates={templates} />
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
    </div>
  );
}
