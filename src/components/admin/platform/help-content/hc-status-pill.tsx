/* admin.html CSS lines 29347-29370: status pill — published / draft (pulse-fr dot) / review-needed (super) / archived */

import type { HcArticleStatus } from '@/lib/mock-data/admin/help-content-data';

interface HcStatusPillProps {
  status: HcArticleStatus;
  label: string;
}

export function HcStatusPill({ status, label }: HcStatusPillProps) {
  const pillClasses =
    status === 'published'
      ? 'bg-[var(--success-bg)] text-[var(--success)]'
      : status === 'draft'
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : status === 'review-needed'
      ? 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]'
      : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';

  const dotAnimation = status === 'draft' ? 'animate-[pulse-fr_1.4s_ease-in-out_infinite]' : '';

  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[4px] whitespace-nowrap ${pillClasses}`}
    >
      <span className={`w-[6px] h-[6px] rounded-full bg-current ${dotAnimation}`} />
      {label}
    </span>
  );
}
