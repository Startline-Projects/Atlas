interface RefundWorkflowRailProps {
  variant?: 'urgent' | 'warn' | 'default';
}

export function RefundWorkflowRail({ variant = 'default' }: RefundWorkflowRailProps) {
  const stages = [
    { num: '✓', label: 'Filed', status: 'done' },
    { num: '✓', label: 'Eligibility check', status: 'done' },
    { num: '3', label: 'Admin decision', status: 'current' },
    { num: '4', label: 'Issue + notify', status: 'pending' },
  ];

  return (
    <>
      <div className="grid grid-cols-4 bg-[var(--paper-deep)] border-b border-[var(--line-soft)]">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className={`py-[8px] px-[14px] border-r border-dashed border-r-[var(--line-soft)] last:border-r-0 flex items-center gap-[8px] font-mono text-[9.5px] tracking-[0.06em] uppercase font-bold ${
              stage.status === 'done'
                ? 'text-[var(--ink-soft)]'
                : stage.status === 'current'
                  ? 'text-[var(--ink)]'
                  : 'text-[var(--ink-mute)]'
            } ${
              stage.status === 'current'
                ? variant === 'urgent'
                  ? 'bg-[var(--danger-bg)]'
                  : 'bg-[var(--amber-bg)]'
                : ''
            }`}
          >
            {/* Stage number circle */}
            <div
              className={`w-[16px] h-[16px] rounded-full grid place-items-center text-[9px] flex-shrink-0 ${
                stage.status === 'done' || stage.status === 'current'
                  ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] border-[1.5px]'
                  : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-mute)] border-[1.5px]'
              } ${
                stage.status === 'current'
                  ? 'animate-pulse-rail'
                  : ''
              }`}
            >
              {stage.num}
            </div>
            {stage.label}
          </div>
        ))}
      </div>

      {/* Scoped keyframe for pulse-rail animation */}
      <style>{`
        @keyframes pulse-rail {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,14,12,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(14,14,12,0); }
        }
        .animate-pulse-rail {
          animation: pulse-rail 1.8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
