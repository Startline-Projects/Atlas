'use client';

/* admin.html lines 67081-67486: full view orchestrator
   Pass A: page header + 5-stat strip + 8 filter chips + 3-tab row
   Pass B: + 2 day-grouped notification feeds (TODAY 8 + YESTERDAY 3) + footer */

import { useState } from 'react';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { NfcPageHeader } from './nfc-page-header';
import { NfcFilterChips } from './nfc-filter-chips';
import { NfcTabRow } from './nfc-tab-row';
import { NfcDayGroup } from './nfc-day-group';
import { NfcFooter } from './nfc-footer';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  NfcPageMeta,
  NfcHeaderAction,
  NfcFilterChip,
  NfcTab,
  NfcTabKey,
  NfcDayGroup as NfcDayGroupData,
  NfcFooterData,
} from '@/lib/mock-data/admin/notifications-data';

interface NfcShellProps {
  meta: NfcPageMeta;
  metaPulseHtml: string;
  actions: NfcHeaderAction[];
  topStats: PrStat[];
  filterChips: NfcFilterChip[];
  tabs: NfcTab[];
  dayGroups: NfcDayGroupData[];
  footer: NfcFooterData;
}

export function NfcShell({
  meta,
  metaPulseHtml,
  actions,
  topStats,
  filterChips,
  tabs,
  dayGroups,
  footer,
}: NfcShellProps) {
  const initialChip = filterChips.find((c) => c.active)?.value ?? 'all';
  const [activeFilter, setActiveFilter] = useState<string>(initialChip);
  const [activeTab, setActiveTab] = useState<NfcTabKey>('unread');

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <NfcPageHeader
        meta={meta}
        metaPulseHtml={metaPulseHtml}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      <NfcFilterChips
        chips={filterChips}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <NfcTabRow tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {dayGroups.map((group, idx) => (
        <NfcDayGroup key={idx} group={group} />
      ))}

      <NfcFooter data={footer} />
    </div>
  );
}
