import type { TxProcessor } from '@/lib/mock-data/admin/transactions-data';

interface TxProcessorCardProps {
  sectionNum: string;
  meta: string;
  processors: TxProcessor[];
}

const BRAND_BG: Record<TxProcessor['brand'], string> = {
  stripe: 'bg-[linear-gradient(135deg,#635bff,#4a40d4)]',
  wise: 'bg-[linear-gradient(135deg,#2bc25e,#1d8a40)]',
  bank: 'bg-[linear-gradient(135deg,#555,#333)]',
};

const ROW_VALUE_COLOR: Record<'normal' | 'danger' | 'warn', string> = {
  normal: 'text-[var(--ink)]',
  danger: 'text-[var(--danger)]',
  warn: 'text-[var(--amber)]',
};

function ProcessorCard({ processor }: { processor: TxProcessor }) {
  return (
    <div className="bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] p-[16px_18px] mb-[14px]">
      <div className="flex items-center gap-[10px] mb-[12px] pb-[10px] border-b border-dashed border-b-[var(--line-soft)]">
        <div
          className={`w-[32px] h-[32px] rounded-[6px] grid place-items-center font-display text-[13px] font-bold text-[var(--paper)] flex-shrink-0 ${BRAND_BG[processor.brand]}`}
        >
          {processor.logoText}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">{processor.name}</div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[1px]">{processor.meta}</div>
        </div>
        <button
          type="button"
          className="font-mono text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.06em] uppercase bg-transparent border border-[var(--line)] rounded-[4px] py-[5px] px-[10px] cursor-pointer transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)] flex-shrink-0"
        >
          {processor.actionLabel}
        </button>
      </div>

      {/* sa-event-grid: 160px label + 1fr value */}
      <div className="grid grid-cols-[160px_minmax(0,1fr)] max-[720px]:grid-cols-1 gap-x-[16px] gap-y-[10px]">
        {processor.rows.map((row, i) => (
          <div key={i} className="contents">
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold pt-[2px]">
              {row.label}
            </div>
            <div className={`font-mono text-[12px] tracking-[0.02em] leading-[1.5] ${ROW_VALUE_COLOR[row.valueVariant ?? 'normal']} ${row.valueVariant === 'danger' || row.valueVariant === 'warn' ? 'font-bold' : 'font-medium'}`}>
              {row.code && (
                <code className="font-mono text-[11px] bg-[var(--cream-deep)] px-[5px] py-[1px] rounded-[3px] text-[var(--ink)]">
                  {row.code}
                </code>
              )}
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TxProcessorCard({ sectionNum, meta, processors }: TxProcessorCardProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Processor references
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              {meta}
            </div>
          </div>
        </div>
      </div>

      {processors.map((p, i) => (
        <ProcessorCard key={i} processor={p} />
      ))}
    </section>
  );
}
