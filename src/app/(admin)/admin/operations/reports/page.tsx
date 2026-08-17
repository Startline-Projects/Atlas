import { REPORTS_ANALYTICS_DATA } from '@/lib/mock-data/admin/reports-analytics-data';
import { ReportsAnalyticsShell } from '@/components/admin/operations/reports/reports-analytics-shell';

export const metadata = {
  title: 'Reports & analytics · Atlas',
  description: 'Atlas platform reports & analytics · KPIs, charts, and custom report builder',
};

export default function ReportsAnalyticsPage() {
  return <ReportsAnalyticsShell data={REPORTS_ANALYTICS_DATA} />;
}
