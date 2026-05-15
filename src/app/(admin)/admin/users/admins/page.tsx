import { UsersShell } from '@/components/admin/users/users-shell';

export const metadata = {
  title: 'Admins - Atlas',
  description: 'Other admins of the platform.',
};

export default function UsersAdminsPage() {
  return <UsersShell initialTab="admins" />;
}
