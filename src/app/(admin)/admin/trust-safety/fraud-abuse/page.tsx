import { FraudAlertsShell } from '@/components/admin/trust-safety/fraud-abuse/fraud-alerts-shell';

export const metadata = {
  title: 'Fraud & abuse – Atlas',
  description: 'Fraud alerts across Atlas — critical / high / medium / low · investigation pipeline.',
};

export default function FraudAbusePage() {
  return <FraudAlertsShell />;
}
