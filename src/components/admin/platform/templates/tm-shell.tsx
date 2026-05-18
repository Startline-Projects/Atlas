'use client';

/* Step 32 LIST shell — header + stats strip + channel tabs (client state) + status filter + active pane */

import { useState, useMemo } from 'react';
import { TmPageHeader } from './tm-page-header';
import { PrStatStrip } from '@/components/admin/compliance/privacy-reports/pr-stat-strip';
import { TmChannelTabs } from './tm-channel-tabs';
import { TmStatusFilter } from './tm-status-filter';
import { TmEmailPane } from './tm-email-pane';
import { TmStubPane } from './tm-stub-pane';
import type { PrStat } from '@/lib/mock-data/admin/privacy-reports-data';
import type {
  TmPageMeta,
  TmHeaderAction,
  TmChannelTab,
  TmStatusFilterChip,
  TmTemplate,
  TmStubPaneContent,
  TmChannelValue,
  TmStatusFilter as TmStatusFilterValue,
} from '@/lib/mock-data/admin/templates-data';

interface TmShellProps {
  meta: TmPageMeta;
  metaPulseHtml: string;
  searchPlaceholder: string;
  actions: TmHeaderAction[];
  topStats: PrStat[];
  channelTabs: TmChannelTab[];
  statusFilters: TmStatusFilterChip[];
  emailTemplates: TmTemplate[];
  smsStub: TmStubPaneContent;
  whatsappStub: TmStubPaneContent;
  emailFooterMeta: string;
  emailFooterButtonLabel: string;
}

export function TmShell({
  meta,
  metaPulseHtml,
  searchPlaceholder,
  actions,
  topStats,
  channelTabs,
  statusFilters,
  emailTemplates,
  smsStub,
  whatsappStub,
  emailFooterMeta,
  emailFooterButtonLabel,
}: TmShellProps) {
  const initialChannel = channelTabs.find((t) => t.active)?.value ?? 'email';
  const initialStatus = statusFilters.find((c) => c.active)?.value ?? 'all';
  const [activeChannel, setActiveChannel] = useState<TmChannelValue>(initialChannel);
  const [activeStatus, setActiveStatus] = useState<TmStatusFilterValue>(initialStatus);

  const filteredEmail = useMemo(() => {
    if (activeStatus === 'all') return emailTemplates;
    return emailTemplates.filter((tpl) => tpl.status === activeStatus);
  }, [emailTemplates, activeStatus]);

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <TmPageHeader
        title={meta.title}
        metaText={meta.metaText}
        metaPulseHtml={metaPulseHtml}
        searchPlaceholder={searchPlaceholder}
        actions={actions}
      />

      <PrStatStrip stats={topStats} />

      <TmChannelTabs tabs={channelTabs} active={activeChannel} onChange={setActiveChannel} />

      <TmStatusFilter chips={statusFilters} active={activeStatus} onChange={setActiveStatus} />

      {activeChannel === 'email' && (
        <TmEmailPane
          templates={filteredEmail}
          footerMeta={emailFooterMeta}
          footerButtonLabel={emailFooterButtonLabel}
        />
      )}
      {activeChannel === 'sms' && <TmStubPane content={smsStub} />}
      {activeChannel === 'whatsapp' && <TmStubPane content={whatsappStub} />}
    </div>
  );
}
