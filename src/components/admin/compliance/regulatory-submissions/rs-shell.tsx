'use client';

import { useState } from 'react';
import { RsPageHeader } from './rs-page-header';
import { RsToolbar } from './rs-toolbar';
import { RsJurisdictionPane } from './sections/rs-jurisdiction-pane';
import { RsCalendarPane } from './sections/rs-calendar-pane';
import { RsStatusPane } from './sections/rs-status-pane';
import { RsFooter } from './rs-footer';
import { PrStatStrip } from '../privacy-reports/pr-stat-strip';
import type { RsPageData } from '@/lib/mock-data/admin/regulatory-submissions-data';
import { rsCalendarMonths, rsStatusPaneText } from '@/lib/mock-data/admin/regulatory-submissions-data';

interface RsShellProps {
  data: RsPageData;
}

export function RsShell({ data }: RsShellProps) {
  const [activeView, setActiveView] = useState<
    'jurisdiction' | 'calendar' | 'status'
  >('jurisdiction');

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <RsPageHeader
        title={data.title}
        metaText={data.metaText}
        pulseText={data.pulseText}
        actions={data.headerActions}
      />

      {/* Stats strip */}
      <PrStatStrip stats={data.topStats} />

      {/* Toolbar with view toggle */}
      <RsToolbar
        toggles={data.viewToggles}
        active={activeView}
        onChange={(value) =>
          setActiveView(value as 'jurisdiction' | 'calendar' | 'status')
        }
      />

      {/* Panes */}
      {activeView === 'jurisdiction' && (
        <RsJurisdictionPane cards={data.jurisdictions} />
      )}
      {activeView === 'calendar' && <RsCalendarPane months={rsCalendarMonths} />}
      {activeView === 'status' && <RsStatusPane text={rsStatusPaneText} />}

      {/* Footer */}
      <RsFooter meta={data.footerMeta} />
    </div>
  );
}
