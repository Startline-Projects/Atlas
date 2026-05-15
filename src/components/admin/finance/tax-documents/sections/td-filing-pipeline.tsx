import {
  pipelineSectionHead,
  pipelineHeader,
  pipelineStages,
  deadlineRows,
} from '@/lib/mock-data/admin/tax-documents-data';

export function TdFilingPipeline() {
  return (
    <section className="mb-[28px]" id="td-section-pipeline">
      {/* Section head */}
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px] pb-[12px] border-b border-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] m-0 mb-[4px] text-[var(--ink)]">
            {pipelineSectionHead.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {pipelineSectionHead.meta}
          </div>
        </div>
      </div>

      {/* Pipeline card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_24px] relative overflow-hidden">
        {/* Rainbow top strip */}
        <span
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(to right, var(--lime-deep), var(--super), var(--amber), var(--success))' }}
        />

        {/* Pipeline head */}
        <div className="flex items-baseline justify-between gap-[14px] mb-[22px] pb-[14px] border-b border-dashed border-b-[var(--line-soft)] flex-wrap">
          <div>
            <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] mb-[3px] text-[var(--ink)] leading-[1.2] m-0">
              {pipelineHeader.title}
            </h3>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
              {pipelineHeader.meta}
            </div>
          </div>
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
            {pipelineHeader.updatedAt}
          </span>
        </div>

        {/* Stages grid */}
        <div className="grid grid-cols-4 gap-0 relative max-[980px]:grid-cols-2 max-[980px]:gap-[18px] max-[560px]:grid-cols-1">
          {/* Connector line */}
          <span className="absolute top-[11px] left-[11px] right-[11px] h-[2px] bg-[var(--line)] z-0 max-[980px]:hidden" />

          {pipelineStages.map((stage, idx) => {
            const isComplete = stage.variant === 'complete';
            const isActive = stage.variant === 'active';
            const isFirst = idx === 0;
            const isLast = idx === pipelineStages.length - 1;

            return (
              <div
                key={stage.num}
                className={`px-[18px] border-r border-dashed border-r-[var(--line-soft)] flex flex-col gap-[8px] relative ${
                  isFirst ? 'pl-0' : ''
                } ${isLast ? 'pr-0 border-r-0' : ''} max-[980px]:even:border-r-0 max-[980px]:even:pr-0 max-[980px]:odd:pl-0 max-[560px]:px-0 max-[560px]:border-r-0 max-[560px]:pb-[18px] max-[560px]:border-b max-[560px]:border-dashed max-[560px]:border-b-[var(--line-soft)] max-[560px]:last:border-b-0 max-[560px]:last:pb-0`}
              >
                {/* Stage number */}
                <div
                  className={`w-[22px] h-[22px] rounded-full text-[var(--paper)] grid place-items-center font-mono text-[10px] font-bold tracking-[0.02em] mb-[4px] relative z-[1] ${
                    isComplete
                      ? 'bg-[var(--success)]'
                      : isActive
                        ? 'bg-[var(--amber)]'
                        : 'bg-[var(--ink)]'
                  }`}
                >
                  {stage.num}
                </div>

                {/* Name + desc */}
                <div className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-[1.2]">
                  {stage.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
                  {stage.desc}
                </div>

                {/* Progress bar */}
                <div className="h-[6px] bg-[var(--cream-deep)] rounded-full overflow-hidden mt-[4px]">
                  <div
                    className={`h-full rounded-full ${
                      isComplete
                        ? 'bg-[var(--success)]'
                        : isActive
                          ? 'bg-[var(--amber)]'
                          : 'bg-[var(--ink-soft)]'
                    }`}
                    style={{ width: `${stage.fillPct}%` }}
                  />
                </div>

                {/* Counts */}
                <div className="flex items-baseline justify-between gap-[4px]">
                  <span className="font-display text-[22px] font-medium text-[var(--ink)] tracking-[-0.02em] leading-none tabular-nums">
                    {stage.countDone}
                    <span className="font-mono text-[11px] text-[var(--ink-mute)] font-medium tracking-[0.04em]">
                      {' '}/ {stage.countTotal}
                    </span>
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold tracking-[0.04em] ${
                      isComplete
                        ? 'text-[var(--success)]'
                        : isActive
                          ? 'text-[var(--amber)]'
                          : 'text-[var(--ink-soft)]'
                    }`}
                  >
                    {stage.pct}
                  </span>
                </div>

                {/* Deadline */}
                <div
                  className={`font-mono text-[9.5px] tracking-[0.06em] uppercase font-bold ${
                    isComplete
                      ? 'text-[var(--success)]'
                      : isActive
                        ? 'text-[var(--amber)]'
                        : 'text-[var(--ink-mute)]'
                  }`}
                >
                  {isComplete && <span>✓ </span>}
                  {stage.deadlineText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deadline list */}
      <div className="flex flex-col gap-[8px] mt-[16px]">
        {deadlineRows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[90px_minmax(0,1fr)_auto] gap-[12px] items-center py-[10px] px-[14px] border rounded-[var(--r-sm)] ${
              row.variant === 'urgent'
                ? 'border-[rgba(194,65,43,0.3)] bg-[rgba(194,65,43,0.04)]'
                : row.variant === 'due'
                  ? 'border-[rgba(232,118,58,0.3)] bg-[rgba(232,118,58,0.04)]'
                  : 'border-[var(--line-soft)] bg-[var(--paper-deep)]'
            }`}
          >
            <div
              className={`font-mono text-[11px] font-bold tracking-[0.04em] ${
                row.variant === 'urgent'
                  ? 'text-[var(--danger)]'
                  : row.variant === 'due'
                    ? 'text-[var(--amber)]'
                    : 'text-[var(--ink)]'
              }`}
            >
              {row.date}
              <span className="block text-[9px] text-[var(--ink-mute)] font-semibold mt-[1px] tracking-[0.06em] uppercase">
                {row.relDay}
              </span>
            </div>
            <div>
              <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                {row.name}
              </div>
              <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                {row.meta}
              </div>
            </div>
            <button
              type="button"
              className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase border rounded-full cursor-pointer transition-all ${
                row.variant === 'urgent'
                  ? 'bg-[var(--danger-bg)] border-[rgba(194,65,43,0.3)] text-[var(--danger)] hover:bg-[rgba(194,65,43,0.12)]'
                  : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
              }`}
            >
              {row.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
