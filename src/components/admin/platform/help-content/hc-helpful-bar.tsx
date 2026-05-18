/* admin.html CSS lines 29249-29281 + markup ~63294-63296: 8px bar + label + meta. Fill width via inline style. */

import type { HcArticleRow } from '@/lib/mock-data/admin/help-content-data';

interface HcHelpfulBarProps {
  helpful: HcArticleRow['helpful'];
}

export function HcHelpfulBar({ helpful }: HcHelpfulBarProps) {
  const fillColor =
    helpful.variant === 'high'
      ? 'bg-[var(--success)]'
      : helpful.variant === 'medium'
      ? 'bg-[var(--amber)]'
      : 'bg-[var(--danger)]';

  const labelColor =
    helpful.variant === 'high'
      ? 'text-[var(--success)]'
      : helpful.variant === 'medium'
      ? 'text-[var(--amber)]'
      : 'text-[var(--danger)]';

  return (
    <div>
      <div className="h-[8px] bg-[var(--paper-deep)] rounded-full overflow-hidden relative mb-[4px]">
        <div
          className={`h-full rounded-full ${fillColor}`}
          style={{ width: `${helpful.percent}%` }}
        />
      </div>
      <div className={`font-mono text-[10.5px] font-bold tracking-[0.02em] ${labelColor}`}>
        {helpful.label}
      </div>
      <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
        {helpful.meta}
      </div>
    </div>
  );
}
