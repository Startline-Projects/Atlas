import { jurisdictionCards } from '@/lib/mock-data/admin/tax-documents-data';

const jurisdictionSectionHead = {
  title: 'By jurisdiction',
  meta: 'Staffva LLC files only with US IRS · foreign candidates receive 1042-S · no UK/EU filing obligations without local establishment',
};

const statusColors: Record<string, string> = {
  complete: 'bg-[var(--success-bg)] text-[var(--success)]',
  partial: 'bg-[var(--amber-bg)] text-[var(--amber)]',
  blocked: 'bg-[var(--danger-bg)] text-[var(--danger)]',
};

export function TdJurisdictionGrid() {
  return (
    <section className="mb-[28px]" id="td-section-jurisdiction">
      {/* Section head */}
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            {jurisdictionSectionHead.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {jurisdictionSectionHead.meta}
          </div>
        </div>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-2 gap-[14px] max-[720px]:grid-cols-1">
        {jurisdictionCards.map((card) => (
          <div
            key={card.title}
            className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]"
          >
            {/* Card head */}
            <div className="flex items-start justify-between gap-[12px] mb-[14px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
              <div>
                <h3 className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] mb-[3px] leading-[1.2] m-0">
                  {card.title}
                </h3>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
                  {card.meta}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display text-[26px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none tabular-nums">
                  {card.count}
                </div>
                <div className="font-mono text-[9px] text-[var(--ink-mute)] tracking-[0.14em] uppercase font-bold mt-[3px]">
                  {card.formType}
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-[8px]">
              {card.rows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[32px_minmax(0,1fr)_60px_70px] gap-[10px] items-center py-[6px] border-b border-dashed border-b-[var(--line-soft)] last:border-b-0"
                >
                  <span
                    className="font-mono text-[9px] font-bold tracking-[0.06em] py-[3px] px-0 rounded-[3px] text-center"
                    style={{
                      background: row.flagBg ?? 'var(--ink)',
                      color: row.flagColor ?? 'var(--paper)',
                      border: row.flagBorder,
                      padding: row.flagBorder ? '2px 6px' : undefined,
                    }}
                  >
                    {row.flag}
                  </span>
                  <span className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {row.country}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em] tabular-nums text-right">
                    {row.count}
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-[0.06em] uppercase font-bold py-[2px] px-[6px] rounded-[3px] text-center ${
                      statusColors[row.statusVariant] ?? ''
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
