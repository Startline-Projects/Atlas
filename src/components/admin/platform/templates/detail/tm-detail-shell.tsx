/* admin.html lines 62727-63117: full Vetting-call-invite canonical detail view.
   Pass B: breadcrumb + hero + detail-stats + approval card.
   Pass C: fr-main section heads + editor card + variables panel.
   Pass D will populate fr-rail (preview + testsend + linked). */

import { TmBreadcrumb } from './tm-breadcrumb';
import { TmDetailHero } from './tm-detail-hero';
import { TmDetailStats } from './tm-detail-stats';
import { TmApprovalCardComponent } from './tm-approval-card';
import { TmSectionHead } from './tm-section-head';
import { TmEditorCard } from './tm-editor-card';
import { TmVariablesPanel } from './tm-variables-panel';
import { TmDetailRail } from './tm-detail-rail';
import type { TmDetailData } from '@/lib/mock-data/admin/templates-data';

interface TmDetailShellProps {
  detail: TmDetailData;
}

const FR_SECTION_CLASSES = 'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px]';

export function TmDetailShell({ detail }: TmDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <TmBreadcrumb items={detail.breadcrumb} />
      <TmDetailHero hero={detail.hero} />
      <TmDetailStats stats={detail.detailStats} />
      <TmApprovalCardComponent approval={detail.approval} />

      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[22px] items-start max-[1080px]:grid-cols-1">
        {/* LEFT — main: editor + variables sections */}
        <div className="flex flex-col gap-[16px]">
          <section className={FR_SECTION_CLASSES}>
            <TmSectionHead head={detail.editor.sectionHead} />
            <TmEditorCard editor={detail.editor} />
          </section>

          <section className={FR_SECTION_CLASSES}>
            <TmSectionHead head={detail.variables.sectionHead} />
            <TmVariablesPanel variables={detail.variables} />
          </section>
        </div>

        {/* RIGHT — rail with preview + test send + linked context */}
        <TmDetailRail
          preview={detail.preview}
          testSend={detail.testSend}
          linked={detail.linked}
        />
      </div>
    </div>
  );
}
