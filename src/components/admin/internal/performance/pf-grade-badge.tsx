/* admin.html CSS lines 30010-30027: pf-grade pill — 5 variants A/A-/B/B-/C with hardcoded hex for A-/B- */

import type { PfGrade } from '@/lib/mock-data/admin/performance-data';

interface PfGradeBadgeProps {
  grade: PfGrade;
}

export function PfGradeBadge({ grade }: PfGradeBadgeProps) {
  const bgClass =
    grade === 'A'
      ? 'bg-[var(--success)]'
      : grade === 'A-'
      ? 'bg-[#4D9F75]'
      : grade === 'B'
      ? 'bg-[var(--amber)]'
      : grade === 'B-'
      ? 'bg-[#C9893E]'
      : 'bg-[var(--danger)]';

  return (
    <span
      className={`inline-flex items-center justify-center w-[36px] h-[36px] rounded-[8px] font-display text-[18px] font-medium tracking-[-0.02em] text-[var(--paper)] ${bgClass}`}
    >
      {grade}
    </span>
  );
}
