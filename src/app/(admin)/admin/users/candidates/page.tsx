import { UsersShell } from '@/components/admin/users/users-shell';

export const metadata = {
  title: 'Candidates - Atlas',
  description: 'Manage all candidates.',
};

export default function UsersCandidatesPage() {
  return <UsersShell initialTab="candidates" />;
}
