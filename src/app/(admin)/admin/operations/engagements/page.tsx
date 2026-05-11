import { EngagementsShell } from '@/components/admin/operations/engagements/engagements-shell';

export const metadata = {
  title: 'Active Engagements - Atlas',
  description: 'All live contracts on Atlas — client × candidate engagements with status, rate, owner, and payment state.',
};

export default function EngagementsPage() {
  return <EngagementsShell />;
}
