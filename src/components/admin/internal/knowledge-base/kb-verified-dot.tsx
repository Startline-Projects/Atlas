/* admin.html CSS lines 31644-31651: verified-dot 3 variants (fresh/aging/stale) */

import type { KbVerifiedDotVariant } from '@/lib/mock-data/admin/knowledge-base-data';

interface KbVerifiedDotProps {
  variant: KbVerifiedDotVariant;
}

const variantClasses: Record<KbVerifiedDotVariant, string> = {
  fresh: 'bg-[var(--success)]',
  aging: 'bg-[var(--amber)]',
  stale: 'bg-[var(--danger)] animate-[pulse-fr_1.4s_ease-in-out_infinite]',
};

export function KbVerifiedDot({ variant }: KbVerifiedDotProps) {
  return (
    <span
      className={`w-[8px] h-[8px] rounded-full flex-shrink-0 ${variantClasses[variant]}`}
    />
  );
}
