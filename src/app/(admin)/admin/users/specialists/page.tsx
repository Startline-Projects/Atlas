import { UsersShell } from '@/components/admin/users/users-shell';

export const metadata = {
  title: 'Talent Specialists - Atlas',
  description: 'Manage all talent specialists.',
};

export default function UsersSpecialistsPage() {
  return <UsersShell initialTab="specialists" />;
}
