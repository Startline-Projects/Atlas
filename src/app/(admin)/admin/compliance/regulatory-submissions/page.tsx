import { RsShell } from '@/components/admin/compliance/regulatory-submissions/rs-shell';
import { rsPageData } from '@/lib/mock-data/admin/regulatory-submissions-data';

export const metadata = {
  title: 'Regulatory submissions',
  description: 'Regulatory submissions tracker',
};

export default function RegulatorySubmissionsPage() {
  return <RsShell data={rsPageData} />;
}
