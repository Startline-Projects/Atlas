import { IcmShell } from '@/components/admin/internal/communications/icm-shell';
import {
  icmPageMeta,
  icmMetaPulseHtml,
  icmSearchPlaceholder,
  icmHeaderActions,
  icmComposeOptions,
  icmTopStats,
  icmPinned,
  icmMessagingSection,
  icmAnnouncementsSection,
  icmMemosSection,
} from '@/lib/mock-data/admin/communications-data';

export const metadata = {
  title: 'Internal communications',
};

export default function InternalCommunicationsPage() {
  return (
    <IcmShell
      meta={icmPageMeta}
      metaPulseHtml={icmMetaPulseHtml}
      searchPlaceholder={icmSearchPlaceholder}
      headerActions={icmHeaderActions}
      composeOptions={icmComposeOptions}
      topStats={icmTopStats}
      pinned={icmPinned}
      messagingSection={icmMessagingSection}
      announcementsSection={icmAnnouncementsSection}
      memosSection={icmMemosSection}
    />
  );
}
