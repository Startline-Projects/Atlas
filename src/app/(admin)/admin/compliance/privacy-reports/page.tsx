import { PrShell } from '@/components/admin/compliance/privacy-reports/pr-shell';
import { getPrivacyReportData } from '@/lib/mock-data/admin/privacy-reports-data';

export const metadata = {
  title: 'Privacy reports | Compliance | Atlas',
  description: 'Comprehensive privacy and compliance reporting dashboard',
};

export default function PrivacyReportsPage() {
  const data = getPrivacyReportData();

  return <PrShell data={data} />;
}
