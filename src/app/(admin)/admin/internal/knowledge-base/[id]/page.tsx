import { notFound } from 'next/navigation';
import {
  kbCategorySections,
  kbCanonicalDetail,
  buildKbDetailFromDoc,
} from '@/lib/mock-data/admin/knowledge-base-data';
import { KbDetailShell } from '@/components/admin/internal/knowledge-base/detail/kb-detail-shell';

export async function generateStaticParams() {
  return kbCategorySections
    .flatMap((s) => s.docs)
    .map((d) => ({ id: d.id }));
}

export default async function KbDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === 'kb-vorona-ring-sop') {
    return <KbDetailShell detail={kbCanonicalDetail} />;
  }

  for (const section of kbCategorySections) {
    const doc = section.docs.find((d) => d.id === id);
    if (doc) {
      const detail = buildKbDetailFromDoc(doc, section);
      return <KbDetailShell detail={detail} />;
    }
  }

  notFound();
}
