import type { SuspiciousActivityType } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousTypePipProps {
  type: SuspiciousActivityType;
  label?: string;
}

const VARIANT_CLASSES: Record<SuspiciousActivityType, string> = {
  geo: 'bg-[rgba(110,63,224,0.05)] border-[rgba(110,63,224,0.25)] text-[var(--super)]',
  velocity: 'bg-[var(--amber-bg)] border-[rgba(232,118,58,0.3)] text-[var(--amber)]',
  session: 'bg-[var(--paper-deep)] border-[var(--line-soft)] text-[var(--ink-soft)]',
  payment: 'bg-[var(--danger-bg)] border-[rgba(194,65,43,0.3)] text-[var(--danger)]',
  pattern: 'bg-[rgba(74,109,65,0.08)] border-[rgba(74,109,65,0.25)] text-[var(--lime-deep)]',
};

const DEFAULT_LABEL: Record<SuspiciousActivityType, string> = {
  geo: 'Geo anomaly',
  velocity: 'Velocity',
  session: 'Session',
  payment: 'Payment',
  pattern: 'Pattern',
};

function TypeIcon({ type }: { type: SuspiciousActivityType }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'flex-shrink-0',
  };

  if (type === 'geo') {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (type === 'velocity') {
    return (
      <svg {...common}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  }
  if (type === 'session') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (type === 'payment') {
    return (
      <svg {...common}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  // pattern → document SVG
  return (
    <svg {...common}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function SuspiciousTypePip({ type, label }: SuspiciousTypePipProps) {
  const text = label || DEFAULT_LABEL[type];
  return (
    <span
      className={`inline-flex items-center gap-[6px] px-[9px] py-[3px] font-mono text-[10.5px] font-semibold tracking-[0.04em] rounded-[4px] whitespace-nowrap border ${VARIANT_CLASSES[type]}`}
    >
      <TypeIcon type={type} />
      {text}
    </span>
  );
}
