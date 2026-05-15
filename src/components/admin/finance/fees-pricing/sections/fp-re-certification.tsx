import { FP_RECERT_ROWS, type FpRecertRow } from '@/lib/mock-data/admin/fees-pricing-data';
import { FeesPricingSectionHead } from '../fees-pricing-section-head';

const ROW_GRID =
  'grid grid-cols-[minmax(0,1fr)_110px_130px_70px] gap-[10px] items-center';

function RecertIcon({ kind }: { kind: FpRecertRow['iconKind'] }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (kind === 'book') {
    return (
      <svg {...common}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }
  if (kind === 'video') {
    return (
      <svg {...common}>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    );
  }
  // video-eye
  return (
    <svg {...common}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      <circle cx="8.5" cy="12" r="1.5" />
    </svg>
  );
}

export function FpReCertification() {
  return (
    <section id="fp-section-recert" className="mb-[28px]">
      <FeesPricingSectionHead
        title="Re-certification fees"
        meta="paid by candidates · charged only on re-takes after a failed attempt · first attempt always free"
      />
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* Header row */}
        <div className={`${ROW_GRID} bg-[var(--paper-deep)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold py-[10px] px-[18px]`}>
          <div>Test</div>
          <div>Price</div>
          <div>30d volume</div>
          <div />
        </div>
        {/* Data rows */}
        {FP_RECERT_ROWS.map((row, idx) => {
          const isLast = idx === FP_RECERT_ROWS.length - 1;
          return (
            <div
              key={row.id}
              className={`${ROW_GRID} py-[14px] px-[18px] ${isLast ? '' : 'border-b border-b-[var(--line-soft)]'}`}
            >
              <div className="flex items-center gap-[10px]">
                <div className="w-[28px] h-[28px] rounded-[6px] bg-[var(--paper-deep)] grid place-items-center text-[var(--ink-soft)] flex-shrink-0">
                  <RecertIcon kind={row.iconKind} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {row.name}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
                    {row.desc}
                  </div>
                </div>
              </div>
              <div className="font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.01em] tabular-nums">
                {row.price}
                <span className="font-mono text-[10px] text-[var(--ink-mute)] ml-[3px] font-semibold">
                  {row.unit}
                </span>
              </div>
              <div className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] font-semibold">
                {row.volume}
                <span className="block text-[9.5px] text-[var(--ink-mute)] font-medium mt-[1px]">
                  {row.volumeMeta}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="font-mono text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.06em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-[4px] py-[4px] px-[9px] cursor-pointer transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)] inline-flex items-center gap-[4px]"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Modify
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
