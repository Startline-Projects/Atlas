import { HcShell } from '@/components/admin/platform/help-content/hc-shell';
import {
  hcPageMeta,
  hcMetaPulseHtml,
  hcSearchPlaceholder,
  hcHeaderActions,
  hcTopStats,
  hcCategories,
  hcCategorySections,
  hcListFooterText,
} from '@/lib/mock-data/admin/help-content-data';

export const metadata = {
  title: 'Help Center content',
};

export default function HelpContentPage() {
  return (
    <HcShell
      meta={hcPageMeta}
      metaPulseHtml={hcMetaPulseHtml}
      searchPlaceholder={hcSearchPlaceholder}
      actions={hcHeaderActions}
      topStats={hcTopStats}
      categories={hcCategories}
      sections={hcCategorySections}
      listFooterText={hcListFooterText}
    />
  );
}
