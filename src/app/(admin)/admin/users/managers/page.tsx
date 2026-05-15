import { UsersShell } from '@/components/admin/users/users-shell';

export const metadata = {
  title: 'Manager - Atlas',
  description: 'Manage the Manager of Talent Specialists.',
};

export default function UsersManagersPage() {
  return <UsersShell initialTab="manager" />;
}
