/**
 * Phase 15a — Severity strip (4 cards: critical / high / medium / low).
 *
 * admin.html CSS: .fr-severity-strip + .fr-sev-card (L15430-15502)
 * admin.html markup: L39194-39247
 *
 * Cards: bg paper, border line, border-top 3px colored, flex-col gap-6,
 * cursor-pointer, hover:translateY(-1px), sev-count 32px (critical = danger),
 * sev-meta with <strong>.
 */
import type { FraudSeverityCard, FraudSeverityKey } from '@/lib/mock-data/admin/fraud-alerts-data';

const SEVERITY_TOP: Record<FraudSeverityKey, string> = {
  critical: 'border-t-[var(--danger)]',
  high: 'border-t-[var(--amber)]',
  medium: 'border-t-[var(--lime-deep)]',
  low: 'border-t-[var(--ink-mute)]',
};

const SEVERITY_HOVER_BORDER: Record<FraudSeverityKey, string> = {
  critical: 'hover:border-[var(--danger)]',
  high: 'hover:border-[var(--amber)]',
  medium: 'hover:border-[var(--lime-deep)]',
  low: 'hover:border-[var(--ink-soft)]',
};

const SEVERITY_ICON_COLOR: Record<FraudSeverityKey, string> = {
  critical: 'text-[var(--danger)]',
  high: 'text-[var(--amber)]',
  medium: 'text-[var(--lime-deep)]',
  low: 'text-[var(--ink-mute)]',
};

const SEVERITY_COUNT_COLOR: Record<FraudSeverityKey, string> = {
  critical: 'text-[var(--danger)]',
  high: 'text-[var(--ink)]',
  medium: 'text-[var(--ink)]',
  low: 'text-[var(--ink)]',
};

/* Severity icon SVGs — admin.html L39196-39242 */
function SevIcon({ sev }: { sev: FraudSeverityKey }) {
  const cls = `w-[14px] h-[14px] ${SEVERITY_ICON_COLOR[sev]}`;
  switch (sev) {
    case 'critical':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
    case 'high':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
    case 'medium':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
    case 'low':
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>);
  }
}

interface FraudSeverityStripProps {
  cards: FraudSeverityCard[];
}

export function FraudSeverityStrip({ cards }: FraudSeverityStripProps) {
  return (
    <div className="grid grid-cols-4 gap-[10px] mb-[22px] max-[720px]:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`bg-[var(--paper)] border border-[var(--line)] border-t-[3px] ${SEVERITY_TOP[card.key]} rounded-[var(--r-md)] py-[14px] px-[16px] flex flex-col gap-[6px] cursor-pointer transition-[transform,border-color] duration-[120ms] ease hover:-translate-y-[1px] ${SEVERITY_HOVER_BORDER[card.key]}`}
        >
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold flex items-center justify-between">
            {card.label}
            <SevIcon sev={card.key} />
          </div>
          <div className={`font-display text-[32px] font-medium tracking-[-0.02em] leading-[1] tabular-nums ${SEVERITY_COUNT_COLOR[card.key]}`}>
            {card.count}
          </div>
          <div className="font-mono text-[10px] tracking-[0.02em] text-[var(--ink-mute)]" dangerouslySetInnerHTML={{ __html: card.meta.replace(/^(\d+ open)/, '<strong class="text-[var(--ink-soft)] font-semibold">$1</strong>') }} />
        </div>
      ))}
    </div>
  );
}
