// Admin.html lines 47681-47780
import type { DsrGroundsBalance } from '@/lib/mock-data/admin/data-subject-rights-data';

interface DsrGroundsBalanceProps {
  balance: DsrGroundsBalance;
}

export function DsrGroundsBalance({ balance }: DsrGroundsBalanceProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head */}
      <div className="py-[14px] px-[20px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-center justify-between gap-[14px] flex-wrap">
        <div>
          <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[3px] leading-[1.2]">
            Balancing test · Art. 17(1) vs Art. 17(3)
          </h3>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {balance.metaLabel}
          </div>
        </div>
        <span className="font-mono text-[10px] tracking-[0.06em] uppercase font-bold py-[4px] px-[9px] rounded-[3px] bg-[var(--amber-bg)] text-[var(--amber)]">
          {balance.statusLabel}
        </span>
      </div>

      {/* Balance grid */}
      <div className="grid grid-cols-[1fr_60px_1fr] gap-0 relative max-[880px]:grid-cols-1">
        {/* LEFT - Subject side */}
        <div
          className="py-[18px] px-[20px]"
          style={{ background: 'linear-gradient(135deg, rgba(110,63,224,0.03), var(--paper))' }}
        >
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase font-bold mb-[8px] text-[var(--super)]">
            {balance.subject.eyebrow}
          </div>
          <div className="font-display text-[13.5px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px] leading-[1.3]">
            {balance.subject.title}
          </div>

          <div className="flex flex-col gap-[8px]">
            {balance.subject.grounds.map((ground, idx) => (
              <div
                key={idx}
                className="p-[10px_12px] bg-[var(--paper)] border border-[var(--line-soft)] rounded-[var(--r-sm)]"
              >
                <div className="flex items-center gap-[8px] mb-[5px]">
                  {ground.article && (
                    <span className="font-mono text-[10px] font-bold tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] bg-[rgba(110,63,224,0.10)] text-[var(--super)]">
                      {ground.article}
                    </span>
                  )}
                  {ground.strength && (
                    <span
                      className={`ml-auto font-mono text-[9px] tracking-[0.08em] uppercase font-bold ${
                        ground.strength === 'strong' ? 'text-[var(--success)]' : 'text-[var(--ink-mute)]'
                      }`}
                    >
                      {ground.strength === 'strong' ? 'Valid right' : ground.strength}
                    </span>
                  )}
                </div>
                <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] leading-[1.35] mb-[4px]">
                  {ground.name}
                </div>
                <div
                  className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: ground.descHtml }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CENTER - Pivot */}
        <div className="grid place-items-center border-l border-r border-dashed border-l-[var(--line)] border-r-[var(--line)] bg-[var(--paper-deep)] relative max-[880px]:border-l-0 max-[880px]:border-r-0 max-[880px]:border-t max-[880px]:border-b max-[880px]:border-t-[var(--line)] max-[880px]:border-b-[var(--line)] max-[880px]:py-[10px]">
          <div>
            <div className="font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.02em]">vs</div>
            <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mt-[4px] text-center">
              Balancing<br />test
            </div>
          </div>
        </div>

        {/* RIGHT - Atlas side */}
        <div
          className="py-[18px] px-[20px]"
          style={{ background: 'linear-gradient(225deg, rgba(232,118,58,0.04), var(--paper))' }}
        >
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase font-bold mb-[8px] text-[var(--amber)]">
            {balance.atlas.eyebrow}
          </div>
          <div className="font-display text-[13.5px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px] leading-[1.3]">
            {balance.atlas.title}
          </div>

          <div className="flex flex-col gap-[8px]">
            {balance.atlas.grounds.map((ground, idx) => (
              <div
                key={idx}
                className="p-[10px_12px] bg-[var(--paper)] border border-[var(--line-soft)] rounded-[var(--r-sm)]"
              >
                <div className="flex items-center gap-[8px] mb-[5px]">
                  <span className="font-mono text-[10px] font-bold tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] bg-[rgba(232,118,58,0.10)] text-[var(--amber)]">
                    {ground.article}
                  </span>
                  <span
                    className={`ml-auto font-mono text-[9px] tracking-[0.08em] uppercase font-bold ${
                      ground.strength === 'strong' ? 'text-[var(--success)]' : 'text-[var(--ink-mute)]'
                    }`}
                  >
                    {ground.strength === 'strong' ? 'Strong' : ground.strength}
                  </span>
                </div>
                <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] leading-[1.35] mb-[4px]">
                  {ground.name}
                </div>
                <div
                  className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: ground.descHtml }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation footer */}
      <div className="py-[16px] px-[20px] bg-[var(--lime-bg)] border-t border-t-[rgba(74,109,65,0.25)] flex items-start gap-[14px]">
        <div className="w-[32px] h-[32px] rounded-full bg-[var(--lime-deep)] text-[var(--paper)] grid place-items-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--lime-deep)] font-bold mb-[3px]">
            DPO RECOMMENDATION
          </div>
          <div className="font-display text-[14.5px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[4px] leading-[1.3]">
            {balance.recommendation.title}
          </div>
          <div
            className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: balance.recommendation.detailHtml }}
          />
        </div>
      </div>
    </div>
  );
}
