import { TransactionsListShell } from '@/components/admin/finance/transactions/transactions-list-shell';

export const metadata = {
  title: 'All transactions – Atlas',
  description: 'Atlas finance transactions: payments, payouts, fees, refunds.',
};

export default function TransactionsPage() {
  return <TransactionsListShell />;
}
