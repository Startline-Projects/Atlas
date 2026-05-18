'use client';

import { useState } from 'react';
import { PsPageHeader } from './ps-page-header';
import { PsCategoryNav } from './ps-category-nav';
import { PsModalDemo } from './ps-modal-demo';
import { PsFooter } from './ps-footer';
import { PsOperationalSection } from './sections/ps-operational-section';
import { PsFinancialSection } from './sections/ps-financial-section';
import { PsCommsSection } from './sections/ps-comms-section';
import { PsBrandingSection } from './sections/ps-branding-section';
import { PsSecuritySection } from './sections/ps-security-section';
import type { PsPageData } from '@/lib/mock-data/admin/platform-settings-data';
import { psDemoModal } from '@/lib/mock-data/admin/platform-settings-data';

interface PsShellProps {
  data: PsPageData;
}

export function PsShell({ data }: PsShellProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    data.categoryNavChips[0]?.value || 'operational'
  );

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <PsPageHeader
        title={data.meta.title}
        metaText={data.meta.metaText}
        restrictionLabel={data.meta.restrictionLabel}
        searchPlaceholder={data.searchPlaceholder}
        actions={data.headerActions}
      />

      {/* Category navigation */}
      <PsCategoryNav
        chips={data.categoryNavChips}
        activeValue={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Demo modal */}
      <PsModalDemo data={psDemoModal} />

      {/* Category sections */}
      <div className="space-y-[32px]">
        <PsOperationalSection />
        <PsFinancialSection />
        <PsCommsSection />
        <PsBrandingSection />
        <PsSecuritySection />
      </div>

      {/* Footer */}
      <PsFooter
        meta={data.footerMeta}
        buttonLabel={data.footerButtonLabel}
      />
    </div>
  );
}
