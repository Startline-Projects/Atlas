/* admin.html lines 62937-63041: variables panel — head + var-list with N variable rows.
   Each row: name (super) + description + type badge (Required = danger-bg, else cream-deep). */

import type { TmVariablesPanelData, TmVariable } from '@/lib/mock-data/admin/templates-data';

interface TmVariablesPanelProps {
  variables: TmVariablesPanelData;
}

export function TmVariablesPanel({ variables }: TmVariablesPanelProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Variables head */}
      <div className="py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-center justify-between flex-wrap gap-[10px]">
        <h3 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {variables.headTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {variables.headMeta}
        </div>
      </div>

      {/* Var list */}
      <div className="flex flex-col">
        {variables.vars.map((v, idx) => (
          <VariableRow key={idx} variable={v} />
        ))}
      </div>
    </div>
  );
}

function VariableRow({ variable }: { variable: TmVariable }) {
  const isRequired = variable.type === 'Required';
  const typeClasses = isRequired
    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
    : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-[10px] items-center py-[8px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)]">
      <div className="min-w-0">
        <div className="font-mono text-[11px] font-bold text-[var(--super)] tracking-[0.02em] break-all">
          {variable.name}
        </div>
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] leading-[1.5]">
          {variable.description}
        </div>
      </div>
      <span
        className={`font-mono text-[9px] font-bold tracking-[0.06em] uppercase py-[2px] px-[7px] rounded-[3px] flex-shrink-0 ${typeClasses}`}
      >
        {variable.type}
      </span>
    </div>
  );
}
