'use client';

/* admin.html lines 65500-66149: full view orchestrator (FINAL)
   Pass A: page header + 5-stat strip + pinned card
   Pass B: + Section 02 Messaging
   Pass C: + Section 03 Announcements
   Pass D: + Section 04 Memos archive */

import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';
import { IcmPageHeader } from './icm-page-header';
import { IcmPinnedCard } from './icm-pinned-card';
import { IcmSectionHead } from './icm-section-head';
import { IcmMessagingSection } from './icm-messaging-section';
import { IcmAnnouncementsSection } from './icm-announcements-section';
import { IcmFilterButton } from './icm-filter-button';
import { IcmMemosSection } from './icm-memos-section';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  IcmPageMeta,
  IcmHeaderAction,
  IcmComposeOption,
  IcmPinnedData,
  IcmMessagingSectionData,
  IcmAnnouncementsData,
  IcmMemosData,
} from '@/lib/mock-data/admin/communications-data';

interface IcmShellProps {
  meta: IcmPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  headerActions: IcmHeaderAction[];
  composeOptions: IcmComposeOption[];
  topStats: PrStat[];
  pinned: IcmPinnedData;
  messagingSection: IcmMessagingSectionData;
  announcementsSection: IcmAnnouncementsData;
  memosSection: IcmMemosData;
}

const FR_SECTION_CLASSES =
  'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]';

export function IcmShell({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  headerActions,
  composeOptions,
  topStats,
  pinned,
  messagingSection,
  announcementsSection,
  memosSection,
}: IcmShellProps) {
  const { showAction } = useAdminActionToast();

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <IcmPageHeader
        meta={meta}
        metaPulseHtml={metaPulseHtml}
        searchPlaceholder={searchPlaceholder}
        actions={headerActions}
        composeOptions={composeOptions}
      />

      <PrStatStrip stats={topStats} />

      <IcmPinnedCard pinned={pinned} />

      {/* Section 02 — Messaging */}
      <section className={FR_SECTION_CLASSES}>
        <IcmSectionHead
          head={messagingSection.sectionHead}
          rightSlot={
            <button
              type="button"
              onClick={() => showAction('Open all threads view')}
              className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
            >
              {messagingSection.sectionActionLabel}
            </button>
          }
        />
        <IcmMessagingSection data={messagingSection} />
      </section>

      {/* Section 03 — Announcements */}
      <section className={FR_SECTION_CLASSES}>
        <IcmSectionHead
          head={announcementsSection.sectionHead}
          rightSlot={
            <div className="inline-flex gap-[6px] flex-wrap">
              {announcementsSection.filterButtons.map((btn) => (
                <IcmFilterButton key={btn.value} button={btn} />
              ))}
            </div>
          }
        />
        <IcmAnnouncementsSection data={announcementsSection} />
      </section>

      {/* Section 04 — Memos archive */}
      <section className={FR_SECTION_CLASSES}>
        <IcmSectionHead
          head={memosSection.sectionHead}
          rightSlot={
            <button
              type="button"
              onClick={() => showAction('Open memo composer')}
              className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {memosSection.headerActionLabel}
            </button>
          }
        />
        <IcmMemosSection data={memosSection} />
      </section>
    </div>
  );
}
