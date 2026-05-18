import { hcCategorySections, hcVettingCallDetail } from '@/lib/mock-data/admin/help-content-data';
import { HcDetailShell } from '@/components/admin/platform/help-content/detail/hc-detail-shell';

const allArticles = hcCategorySections.flatMap((s) => s.articles);

export async function generateStaticParams() {
  return allArticles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = allArticles.find((a) => a.id === id);
  return { title: `${article?.title ?? 'Article'} · Help Center` };
}

export default async function HelpContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = allArticles.find((a) => a.id === id);

  if (id === 'hc-vetting-call') {
    return <HcDetailShell detail={hcVettingCallDetail} />;
  }

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center">
        <h2 className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          {article?.title ?? 'Article'} · detail
        </h2>
        <p className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] max-w-[480px] mx-auto">
          Detail content available for &quot;How to schedule your vetting call&quot; canonical only in admin.html. Other articles follow the same frontmatter + markdown editor pattern.
        </p>
      </div>
    </div>
  );
}
