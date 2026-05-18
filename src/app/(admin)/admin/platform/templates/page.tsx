import { TmShell } from '@/components/admin/platform/templates/tm-shell';
import {
  tmPageMeta,
  tmMetaPulseHtml,
  tmSearchPlaceholder,
  tmHeaderActions,
  tmTopStats,
  tmChannelTabs,
  tmStatusFilters,
  tmEmailTemplates,
  tmSmsStub,
  tmWhatsappStub,
  tmEmailFooterMeta,
  tmEmailFooterButtonLabel,
} from '@/lib/mock-data/admin/templates-data';

export const metadata = {
  title: 'Email & SMS templates',
};

export default function TemplatesPage() {
  return (
    <TmShell
      meta={tmPageMeta}
      metaPulseHtml={tmMetaPulseHtml}
      searchPlaceholder={tmSearchPlaceholder}
      actions={tmHeaderActions}
      topStats={tmTopStats}
      channelTabs={tmChannelTabs}
      statusFilters={tmStatusFilters}
      emailTemplates={tmEmailTemplates}
      smsStub={tmSmsStub}
      whatsappStub={tmWhatsappStub}
      emailFooterMeta={tmEmailFooterMeta}
      emailFooterButtonLabel={tmEmailFooterButtonLabel}
    />
  );
}
