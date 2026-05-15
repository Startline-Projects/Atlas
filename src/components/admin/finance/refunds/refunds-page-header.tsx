import { refundsPageHeader } from '@/lib/mock-data/admin/refunds-data';

export function RefundsPageHeader() {
  return (
    <div className="flex items-end justify-between gap-[18px] mb-[22px] pb-[18px] border-b border-[var(--line)] flex-wrap px-[28px] py-[22px] max-[720px]:px-[18px] max-[720px]:py-[18px]">
      <div className="min-w-0">
        <h1 className="font-display text-[32px] font-medium tracking-[-0.02em] leading-[1.1] m-0 mb-[4px] text-[var(--ink)]">
          {refundsPageHeader.title}
        </h1>
        <div className="font-mono text-[11px] tracking-[0.04em] text-[var(--ink-mute)] flex items-center gap-[12px] flex-wrap">
          {refundsPageHeader.meta}
          {refundsPageHeader.metaPulses?.map((pulse, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[999px] text-[var(--ink-soft)] font-semibold"
              style={{
                backgroundColor:
                  pulse.variant === 'danger'
                    ? 'var(--danger-bg)'
                    : pulse.variant === 'warn'
                      ? 'var(--amber-bg)'
                      : 'var(--success-bg)',
                color:
                  pulse.variant === 'danger'
                    ? 'var(--danger)'
                    : pulse.variant === 'warn'
                      ? 'var(--amber)'
                      : 'var(--success)',
              }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full animate-pulse-fr"
                style={{
                  backgroundColor:
                    pulse.variant === 'danger'
                      ? 'var(--danger)'
                      : pulse.variant === 'warn'
                        ? 'var(--amber)'
                        : 'var(--success)',
                }}
              />
              {pulse.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
