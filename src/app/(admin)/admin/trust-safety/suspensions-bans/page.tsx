import { SuspensionsBansListShell } from '@/components/admin/trust-safety/suspensions-bans/suspensions-bans-list-shell';

export const metadata = {
  title: 'Suspensions & bans – Atlas',
  description: 'Suspensions, bans, and appeal workflow across Atlas Trust & Safety.',
};

export default function SuspensionsBansPage() {
  return <SuspensionsBansListShell />;
}
