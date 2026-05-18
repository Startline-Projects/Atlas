'use client';

/* Step 30 shell orchestrator: manages active tab state, renders header + tab nav + active pane */

import { useState } from 'react';
import { CsPageHeader } from './cs-page-header';
import { CsTabNav } from './cs-tab-nav';
import { CsCategoriesPane } from './sections/cs-categories-pane';
import { CsSkillsPane } from './sections/cs-skills-pane';
import { CsToolsPane } from './sections/cs-tools-pane';
import type {
  CsPageMeta,
  CsHeaderAction,
  CsTabNavItem,
  CsCategoryCard,
  CsAddCategoryCard,
  CsConsolidationData,
  CsSkillFilter,
  CsSkillRow,
  CsToolSection,
  CsTab,
} from '@/lib/mock-data/admin/categories-skills-data';

interface CsShellProps {
  meta: CsPageMeta;
  tabNav: CsTabNavItem[];
  searchPlaceholder: string;
  headerActions: CsHeaderAction[];
  categories: CsCategoryCard[];
  addCategoryCard: CsAddCategoryCard;
  consolidation?: CsConsolidationData;
  skillFilters?: CsSkillFilter[];
  skillSearchPlaceholder?: string;
  skillRows?: CsSkillRow[];
  skillFooterMeta?: string;
  skillLoadMoreLabel?: string;
  toolSections?: CsToolSection[];
  toolsFooterMeta?: string;
  toolsFooterButtonLabel?: string;
}

export function CsShell({
  meta,
  tabNav,
  searchPlaceholder,
  headerActions,
  categories,
  addCategoryCard,
  consolidation,
  skillFilters,
  skillSearchPlaceholder,
  skillRows,
  skillFooterMeta,
  skillLoadMoreLabel,
  toolSections,
  toolsFooterMeta,
  toolsFooterButtonLabel,
}: CsShellProps) {
  const [activeTab, setActiveTab] = useState<CsTab>(
    (tabNav[0]?.value as CsTab) || 'categories'
  );

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Page header */}
      <CsPageHeader
        title={meta.title}
        metaText={meta.metaText}
        restrictionLabel={meta.restrictionLabel}
        searchPlaceholder={searchPlaceholder}
        actions={headerActions}
      />

      {/* Tab navigation */}
      <CsTabNav
        tabs={tabNav}
        activeValue={activeTab}
        onChange={(value) => setActiveTab(value as CsTab)}
      />

      {/* Active pane */}
      {activeTab === 'categories' && (
        <CsCategoriesPane categories={categories} addCard={addCategoryCard} />
      )}
      {activeTab === 'skills' && consolidation && skillFilters && skillSearchPlaceholder && skillRows && skillFooterMeta && skillLoadMoreLabel && (
        <CsSkillsPane
          consolidation={consolidation}
          filters={skillFilters}
          searchPlaceholder={skillSearchPlaceholder}
          rows={skillRows}
          footerMeta={skillFooterMeta}
          loadMoreLabel={skillLoadMoreLabel}
        />
      )}
      {activeTab === 'tools' && toolSections && toolsFooterMeta && toolsFooterButtonLabel && (
        <CsToolsPane
          sections={toolSections}
          footerMeta={toolsFooterMeta}
          footerButtonLabel={toolsFooterButtonLabel}
        />
      )}
    </div>
  );
}
