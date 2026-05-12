import { IncidentsShell } from '@/components/admin/trust-safety/incidents/incidents-shell';

export const metadata = {
  title: 'Security incidents – Atlas',
  description: 'Security incidents across Atlas — breach / unauthorized / malware / login / phishing / DDoS / vendor.',
};

export default function SecurityIncidentsPage() {
  return <IncidentsShell />;
}
