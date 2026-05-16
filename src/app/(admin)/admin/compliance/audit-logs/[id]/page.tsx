import { AudDetailShell } from '@/components/admin/compliance/audit-logs/detail/aud-detail-shell';
import { audRows, audDetails, getAudDetail } from '@/lib/mock-data/admin/audit-logs-data';

export const metadata = {
  title: 'Audit log entry - Atlas',
};

export function generateStaticParams() {
  // Clone pattern: all 15 entry IDs render with the canonical detail
  return audRows.map((row) => ({
    id: row.id,
  }));
}

interface AuditLogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AuditLogDetailPage({ params }: AuditLogDetailPageProps) {
  const { id } = await params;
  const detail = getAudDetail(id);

  return <AudDetailShell detail={detail} />;
}
