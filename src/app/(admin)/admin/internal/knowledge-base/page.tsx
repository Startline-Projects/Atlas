import { KbShell } from '@/components/admin/internal/knowledge-base/kb-shell';
import {
  kbPageMeta,
  kbMetaPulseHtml,
  kbSearchPlaceholder,
  kbHeaderActions,
  kbTopStats,
  kbCategories,
  kbCategorySections,
  kbFooterText,
} from '@/lib/mock-data/admin/knowledge-base-data';

export const metadata = {
  title: 'Knowledge base',
};

export default function KnowledgeBasePage() {
  return (
    <KbShell
      meta={kbPageMeta}
      metaPulseHtml={kbMetaPulseHtml}
      searchPlaceholder={kbSearchPlaceholder}
      actions={kbHeaderActions}
      topStats={kbTopStats}
      categories={kbCategories}
      sections={kbCategorySections}
      footerText={kbFooterText}
    />
  );
}
