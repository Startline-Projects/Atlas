import { NfcShell } from '@/components/admin/notifications/nfc-shell';
import {
  nfcPageMeta,
  nfcMetaPulseHtml,
  nfcHeaderActions,
  nfcTopStats,
  nfcFilterChips,
  nfcTabs,
  nfcDayGroups,
  nfcFooter,
} from '@/lib/mock-data/admin/notifications-data';

export const metadata = {
  title: 'Notifications',
};

export default function NotificationsPage() {
  return (
    <NfcShell
      meta={nfcPageMeta}
      metaPulseHtml={nfcMetaPulseHtml}
      actions={nfcHeaderActions}
      topStats={nfcTopStats}
      filterChips={nfcFilterChips}
      tabs={nfcTabs}
      dayGroups={nfcDayGroups}
      footer={nfcFooter}
    />
  );
}
