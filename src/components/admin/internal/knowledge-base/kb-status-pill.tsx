/* admin.html CSS lines 31683-31708: status pill with 5 variants (live/needs-verify/critical-stale/draft/archived)
   Pulsing on needs-verify (1.4s) + critical-stale (1s faster = more urgent) */

import type { KbDocStatusVariant } from '@/lib/mock-data/admin/knowledge-base-data';

interface KbStatusPillProps {
  variant: KbDocStatusVariant;
  label: string;
}

const variantClasses: Record<KbDocStatusVariant, string> = {
  live: 'bg-[var(--success-bg)] text-[var(--success)]',
  'needs-verify': 'bg-[var(--amber-bg)] text-[var(--amber)]',
  'critical-stale': 'bg-[var(--danger-bg)] text-[var(--danger)]',
  draft: 'bg-[rgba(110,63,224,0.10)] text-[var(--super)]',
  archived: 'bg-[var(--cream-deep)] text-[var(--ink-mute)]',
};

const dotAnim: Record<KbDocStatusVariant, string> = {
  live: '',
  'needs-verify': 'animate-[pulse-fr_1.4s_ease-in-out_infinite]',
  'critical-stale': 'animate-[pulse-fr_1s_ease-in-out_infinite]',
  draft: '',
  archived: '',
};

export function KbStatusPill({ variant, label }: KbStatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[4px] whitespace-nowrap ${variantClasses[variant]}`}
    >
      <span
        className={`w-[6px] h-[6px] rounded-full bg-current flex-shrink-0 ${dotAnim[variant]}`}
      />
      {label}
    </span>
  );
}
