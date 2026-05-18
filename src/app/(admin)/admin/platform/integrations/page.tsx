import { IntShell } from '@/components/admin/platform/integrations/int-shell';
import {
  intPageMeta,
  intSearchPlaceholder,
  intHeaderActions,
  intTopStats,
  intCategoryFilters,
  intCards,
  intAddCard,
} from '@/lib/mock-data/admin/integrations-data';

export const metadata = {
  title: 'Integrations',
};

export default function IntegrationsPage() {
  return (
    <IntShell
      meta={intPageMeta}
      searchPlaceholder={intSearchPlaceholder}
      actions={intHeaderActions}
      topStats={intTopStats}
      categoryFilters={intCategoryFilters}
      cards={intCards}
      addCard={intAddCard}
    />
  );
}
