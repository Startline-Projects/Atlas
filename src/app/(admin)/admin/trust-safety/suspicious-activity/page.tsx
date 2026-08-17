import { SuspiciousActivityListShell } from '@/components/admin/trust-safety/suspicious-activity/suspicious-activity-list-shell';

export const metadata = {
  title: 'Suspicious activity – Atlas',
  description: 'Suspicious activity feed across Atlas — geo / velocity / session / payment / pattern signals · live stream.',
};

export default function SuspiciousActivityPage() {
  return <SuspiciousActivityListShell />;
}
