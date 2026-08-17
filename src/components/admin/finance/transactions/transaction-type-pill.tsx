import type { TxType } from '@/lib/mock-data/admin/transactions-data';

interface TransactionTypePillProps {
  type: TxType;
  label: string;
}

const VARIANT_CLASSES: Record<TxType, string> = {
  payment:
    'text-[var(--success)] border-[rgba(46,125,84,0.3)] bg-[var(--success-bg)] [&_svg]:text-[var(--success)]',
  refund:
    'text-[var(--amber)] border-[rgba(232,118,58,0.3)] bg-[var(--amber-bg)] [&_svg]:text-[var(--amber)]',
  fee: 'text-[var(--super)] border-[rgba(110,63,224,0.25)] bg-[rgba(110,63,224,0.05)] [&_svg]:text-[var(--super)]',
  payout:
    'text-[var(--ink)] border-[var(--line-strong)] bg-[var(--paper)] [&_svg]:text-[var(--ink)]',
  'failed-pmt':
    'text-[var(--danger)] border-[rgba(194,65,43,0.3)] bg-[var(--danger-bg)] [&_svg]:text-[var(--danger)]',
};

function TypeIcon({ type }: { type: TxType }) {
  const common = {
    width: 11,
    height: 11,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'flex-shrink-0',
  };
  if (type === 'payment') {
    return (
      <svg {...common}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M2 10h20" />
      </svg>
    );
  }
  if (type === 'refund') {
    return (
      <svg {...common}>
        <polyline points="9 14 4 9 9 4" />
        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
      </svg>
    );
  }
  if (type === 'fee') {
    return (
      <svg {...common}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }
  if (type === 'payout') {
    return (
      <svg {...common}>
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    );
  }
  // failed-pmt
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export function TransactionTypePill({ type, label }: TransactionTypePillProps) {
  return (
    <span
      className={`inline-flex items-center gap-[6px] py-[3px] px-[9px] font-mono text-[10px] font-semibold tracking-[0.04em] rounded-[4px] whitespace-nowrap border ${VARIANT_CLASSES[type]}`}
    >
      <TypeIcon type={type} />
      {label}
    </span>
  );
}
