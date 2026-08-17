import type { ReactNode } from 'react';

interface FeesPricingSectionHeadProps {
  title: string;
  meta: string;
  action?: ReactNode;
}

export function FeesPricingSectionHead({ title, meta, action }: FeesPricingSectionHeadProps) {
  return (
    <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
      <div>
        <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] mb-[4px] text-[var(--ink)] leading-[1.2] m-0">
          {title}
        </h2>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">{meta}</div>
      </div>
      {action && <div className="inline-flex gap-[8px]">{action}</div>}
    </div>
  );
}
