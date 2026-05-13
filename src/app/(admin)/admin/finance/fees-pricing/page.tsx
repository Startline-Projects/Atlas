import { FeesPricingShell } from '@/components/admin/finance/fees-pricing/fees-pricing-shell';

export const metadata = {
  title: 'Fees & pricing – Atlas',
  description: 'Atlas fee structure, re-certification fees, pass-through fees, and pricing configuration.',
};

export default function FeesPricingPage() {
  return <FeesPricingShell />;
}
