import type { DsrIdGate } from '@/lib/mock-data/admin/data-subject-rights-data';

interface DsrIdGateProps {
  gate: DsrIdGate;
}

const variantStyles = {
  verified: {
    border: 'border-[var(--success)]',
    strip: 'bg-[var(--success)]',
    headBg: 'bg-[var(--success-bg)]',
    iconBg: 'bg-[var(--success)]',
    iconShadow: 'shadow-[0_0_0_4px_rgba(46,125,84,0.15)]',
    eyebrow: 'text-[var(--success)]',
    confidence: 'text-[var(--success)]',
  },
  pending: {
    border: 'border-[var(--amber)]',
    strip: 'bg-[var(--amber)]',
    headBg: 'bg-[var(--amber-bg)]',
    iconBg: 'bg-[var(--amber)]',
    iconShadow: 'shadow-[0_0_0_4px_rgba(232,118,58,0.15)]',
    eyebrow: 'text-[var(--amber)]',
    confidence: 'text-[var(--amber)]',
  },
  failed: {
    border: 'border-[var(--danger)]',
    strip: 'bg-[var(--danger)]',
    headBg: 'bg-[var(--danger-bg)]',
    iconBg: 'bg-[var(--danger)]',
    iconShadow: 'shadow-[0_0_0_4px_rgba(194,65,43,0.15)]',
    eyebrow: 'text-[var(--danger)]',
    confidence: 'text-[var(--danger)]',
  },
} as const;

export function DsrIdGateSection({ gate }: DsrIdGateProps) {
  const s = variantStyles[gate.variant];

  const renderIcon = () => {
    if (gate.variant === 'verified') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--paper)' }}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    }
    if (gate.variant === 'pending') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--paper)' }}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--paper)' }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  };

  return (
    <div className={`bg-[var(--paper)] border-[1.5px] ${s.border} rounded-[var(--r-md)] mb-[18px] overflow-hidden relative`}>
      <span className={`absolute top-0 left-0 right-0 h-[3px] ${s.strip}`} />

      {/* Head */}
      <div className={`flex items-center gap-[14px] py-[16px] px-[22px] ${s.headBg} border-b border-b-[var(--line-soft)]`}>
        <div className={`w-[42px] h-[42px] rounded-full ${s.iconBg} text-[var(--paper)] grid place-items-center flex-shrink-0 ${s.iconShadow}`}>
          {renderIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-mono text-[9px] tracking-[0.16em] uppercase font-bold mb-[3px] ${s.eyebrow}`}>
            {gate.eyebrow}
          </div>
          <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] m-0 text-[var(--ink)] leading-[1.25]">
            {gate.heading}
          </h3>
        </div>
        <div className="text-right font-mono text-[9.5px] tracking-[0.08em] uppercase text-[var(--ink-mute)] font-bold flex-shrink-0">
          {gate.confidenceLabel}
          <strong className={`block font-display text-[14px] tracking-[-0.01em] mt-[2px] normal-case ${s.confidence}`}>
            {gate.confidence}
          </strong>
        </div>
      </div>

      {/* Body */}
      <div className="py-[18px] px-[22px] grid grid-cols-2 gap-[20px] max-[720px]:grid-cols-1">
        {/* Methods */}
        <div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[10px]">
            Verification methods used
          </div>
          <div className="flex flex-col gap-[8px]">
            {gate.methods.map((m, idx) => (
              <div key={idx} className="flex items-start gap-[10px] py-[8px] px-[12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)]">
                <div className="w-[16px] h-[16px] rounded-full bg-[var(--success)] text-[var(--paper)] grid place-items-center flex-shrink-0 mt-[1px]">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-[var(--ink)] tracking-[-0.01em]">{m.name}</div>
                  <div
                    className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] leading-[1.5] [&_strong]:font-bold [&_strong]:text-[var(--ink-soft)]"
                    dangerouslySetInnerHTML={{ __html: m.metaHtml }}
                  />
                </div>
                <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] flex-shrink-0">{m.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[10px]">
            Verification summary
          </div>
          <div>
            {gate.summary.map((row, idx) => (
              <div key={idx} className="flex justify-between gap-[12px] py-[6px] border-b border-dashed border-[var(--line-soft)] last:border-b-0">
                <span className="text-[var(--ink-mute)] font-mono text-[11px] tracking-[0.02em]">{row.key}</span>
                <span className="text-[var(--ink)] font-bold text-right font-mono text-[11px] tracking-[0.02em]" style={row.valueStyle}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
