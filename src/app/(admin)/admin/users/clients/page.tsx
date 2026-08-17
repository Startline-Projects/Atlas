import { UsersShell } from '@/components/admin/users/users-shell';

export const metadata = {
  title: 'Clients - Atlas',
  description: 'Manage all clients.',
};

export default function UsersClientsPage() {
  return <UsersShell initialTab="clients" />;
}
