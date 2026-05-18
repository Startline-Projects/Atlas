import { intCards, intStripeDetail } from '@/lib/mock-data/admin/integrations-data';
import { IntDetailShell } from '@/components/admin/platform/integrations/detail/int-detail-shell';

export async function generateStaticParams() {
  return intCards.map((card) => ({ id: card.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = intCards.find((c) => c.id === id);
  return {
    title: `${card?.name ?? 'Integration'} · Integrations`,
  };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = intCards.find((c) => c.id === id);

  if (id === 'in-stripe') {
    return <IntDetailShell detail={intStripeDetail} name={card?.name ?? 'Stripe'} />;
  }

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center">
        <h2 className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
          {card?.name ?? 'Integration'} · detail
        </h2>
        <p className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] max-w-[480px] mx-auto">
          Detail content available for Stripe canonical only in admin.html. Other integrations follow the same template.
        </p>
      </div>
    </div>
  );
}
