import { TaxDocumentsShell } from '@/components/admin/finance/tax-documents/tax-documents-shell';
import { taxDocumentsPageHeader } from '@/lib/mock-data/admin/tax-documents-data';

export const metadata = {
  title: `${taxDocumentsPageHeader.title} · Atlas Admin`,
};

export default function TaxDocumentsPage() {
  return <TaxDocumentsShell />;
}
