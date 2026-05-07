import { UsersShell } from '@/components/admin/users/users-shell';

export const metadata = {
  title: 'All users - Atlas',
  description: 'Manage all users: candidates, clients, specialists, manager, and admins.',
};

export default function AdminUsersPage() {
  return <UsersShell />;
}
