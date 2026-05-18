/* admin.html lines 62816-62858: approval workflow card — amber-gradient outer + head + 3-step flow + actions row */

import type { TmApprovalCard, TmApprovalStep } from '@/lib/mock-data/admin/templates-data';

interface TmApprovalCardProps {
  approval: TmApprovalCard;
}

export function TmApprovalCardComponent({ approval }: TmApprovalCardProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--amber-bg)] to-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-[var(--r-md)] py-[18px] px-[20px] mb-[18px]">
      {/* Head */}
      <div className="flex items-center gap-[10px] mb-[12px]">
        <div className="w-[36px] h-[36px] rounded-full bg-[var(--amber)] text-[var(--paper)] grid place-items-center flex-shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: approval.iconSvgPaths }}
          />
        </div>
        <div className="flex-1">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--amber)] font-bold mb-[3px]">
            {approval.eyebrow}
          </div>
          <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 leading-[1.3]">
            {approval.title}
          </h3>
        </div>
      </div>

      {/* 3-step flow */}
      <div className="grid grid-cols-3 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden mb-[12px] max-[720px]:grid-cols-1">
        {approval.steps.map((step, idx) => (
          <ApprovalStep key={idx} step={step} />
        ))}
      </div>

      {/* Actions row */}
      <div className="flex items-center justify-between gap-[10px] flex-wrap">
        <div
          className="font-mono text-[10.5px] text-[var(--ink-soft)] tracking-[0.02em] [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: approval.actionsMetaHtml }}
        />
        <div className="inline-flex gap-[6px]">
          {approval.actions.map((action, idx) => {
            const btnClasses = action.isPrimary
              ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
              : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';
            return (
              <button
                key={idx}
                type="button"
                className={`inline-flex items-center gap-[6px] py-[6px] px-[11px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ApprovalStep({ step }: { step: TmApprovalStep }) {
  const cellClasses =
    step.status === 'complete'
      ? 'bg-[var(--success-bg)]'
      : step.status === 'active'
      ? 'bg-[var(--amber-bg)]'
      : 'bg-[var(--paper-deep)] opacity-60';

  const numClasses =
    step.status === 'complete'
      ? 'bg-[var(--success)] text-[var(--paper)]'
      : step.status === 'active'
      ? 'bg-[var(--amber)] text-[var(--paper)]'
      : 'bg-[var(--line)] text-[var(--ink-mute)]';

  const labelColor =
    step.status === 'complete'
      ? 'text-[var(--success)]'
      : step.status === 'active'
      ? 'text-[var(--amber)]'
      : 'text-[var(--ink-mute)]';

  return (
    <div
      className={`py-[12px] px-[14px] border-r border-r-[var(--line-soft)] last:border-r-0 text-center relative max-[720px]:!border-r-0 max-[720px]:border-b max-[720px]:border-b-[var(--line-soft)] max-[720px]:last:border-b-0 ${cellClasses}`}
    >
      <div className={`inline-grid place-items-center w-[22px] h-[22px] rounded-full mb-[6px] font-mono text-[11px] font-bold ${numClasses}`}>
        {step.num}
      </div>
      <div className={`font-mono text-[9px] tracking-[0.12em] uppercase font-bold mb-[3px] ${labelColor}`}>
        {step.label}
      </div>
      <div className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[2px]">
        {step.name}
      </div>
      <div
        className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: step.metaHtml }}
      />
    </div>
  );
}
