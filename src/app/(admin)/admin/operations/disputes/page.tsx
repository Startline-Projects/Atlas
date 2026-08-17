import { DisputesShell } from '@/components/admin/operations/disputes/disputes-shell';

export const metadata = {
  title: 'Disputes - Atlas',
  description: 'All disputes on Atlas — open / in progress / escalated / urgent / resolved · SLA-tracked.',
};

export default function DisputesPage() {
  return <DisputesShell />;
}
