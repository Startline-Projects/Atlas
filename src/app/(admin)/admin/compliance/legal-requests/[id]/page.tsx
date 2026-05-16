import { LegalRequestDetailShell } from '@/components/admin/compliance/legal-requests/detail/legal-request-detail-shell';
import { LrDetailStub } from '@/components/admin/compliance/legal-requests/detail/lr-detail-stub';
import { legalRequestDetails, legalRequestsRows } from '@/lib/mock-data/admin/legal-requests-data';

export function generateStaticParams() {
  return legalRequestsRows.map((row) => ({
    id: row.id,
  }));
}

interface LegalRequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LegalRequestDetailPage({ params }: LegalRequestDetailPageProps) {
  const { id } = await params;

  // All 9 legal request IDs use the canonical detail
  const canonicalIds = ['LR-2026-0023', 'LR-2026-0022', 'LR-2026-0021', 'LR-2026-0020', 'LR-2026-0019', 'LR-2026-0018', 'LR-2026-0017', 'LR-2026-0016', 'LR-2026-0015'];
  const detail = legalRequestDetails[id] ?? (canonicalIds.includes(id) ? legalRequestDetails['LR-2026-0023'] : undefined);

  if (!detail) {
    return <LrDetailStub id={id} />;
  }

  return <LegalRequestDetailShell detail={detail} />;
}
