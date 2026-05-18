import { CsShell } from '@/components/admin/platform/categories-skills/cs-shell';
import {
  csPageMeta,
  csHeaderActions,
  csSearchPlaceholder,
  csTabNav,
  csCategories,
  csAddCategoryCard,
  csConsolidation,
  csSkillFilters,
  csSkillSearchPlaceholder,
  csSkillRows,
  csSkillFooterMeta,
  csSkillLoadMoreLabel,
  csToolSections,
  csToolsFooterMeta,
  csToolsFooterButtonLabel,
} from '@/lib/mock-data/admin/categories-skills-data';

export const metadata = {
  title: 'Categories & Skills',
};

export default function CategoriesSkillsPage() {
  return (
    <CsShell
      meta={csPageMeta}
      tabNav={csTabNav}
      searchPlaceholder={csSearchPlaceholder}
      headerActions={csHeaderActions}
      categories={csCategories}
      addCategoryCard={csAddCategoryCard}
      consolidation={csConsolidation}
      skillFilters={csSkillFilters}
      skillSearchPlaceholder={csSkillSearchPlaceholder}
      skillRows={csSkillRows}
      skillFooterMeta={csSkillFooterMeta}
      skillLoadMoreLabel={csSkillLoadMoreLabel}
      toolSections={csToolSections}
      toolsFooterMeta={csToolsFooterMeta}
      toolsFooterButtonLabel={csToolsFooterButtonLabel}
    />
  );
}
