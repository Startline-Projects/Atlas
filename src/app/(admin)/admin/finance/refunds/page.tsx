import { RefundsShell } from '@/components/admin/finance/refunds/refunds-shell';
import { refundsPageHeader } from '@/lib/mock-data/admin/refunds-data';

export const metadata = {
  title: `${refundsPageHeader.title} · Atlas Admin`,
};

export default function RefundsPage() {
  return <RefundsShell />;
}