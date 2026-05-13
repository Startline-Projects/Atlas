import type { SuspiciousActivityProfile, SuspiciousEventRow } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousEventDetailsProps {
  rows: SuspiciousEventRow[];
  mapTrail?: SuspiciousActivityProfile['mapTrail'];
}

const VALUE_VARIANT: Record<'normal' | 'warn' | 'danger', string> = {
  normal: 'text-[var(--ink)] font-medium',
  warn: 'text-[var(--amber)] font-bold',
  danger: 'text-[var(--danger)] font-bold',
};

export function SuspiciousEventDetails({ rows, mapTrail }: SuspiciousEventDetailsProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <style>{`
        @keyframes sa-evd-pulse-fr {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Section head with dashed bottom border */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            01
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Event details
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              raw signal data · captured at 10:24:46 UTC · source: auth-service
            </div>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all flex-shrink-0"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy raw JSON
        </button>
      </div>

      {/* 2-column event grid: each row is its own flex-column block with dashed bottom border */}
      <div className="grid grid-cols-2 max-[720px]:grid-cols-1 gap-x-[24px] gap-y-[12px]">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex flex-col gap-[3px] py-[8px] border-b border-dashed border-b-[var(--line-soft)]"
          >
            <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
              {row.label}
            </div>
            <div className={`font-mono text-[12px] tracking-[0.02em] ${VALUE_VARIANT[row.variant ?? 'normal']}`}>
              {row.code && (
                <code className="font-mono text-[11px] bg-[var(--cream-deep)] px-[5px] py-[1px] rounded-[3px]">
                  {row.code}
                </code>
              )}
              {row.value}
            </div>
          </div>
        ))}
      </div>

      {/* Inline map card */}
      {mapTrail && (
        <div className="bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] p-[14px_16px] mt-[14px]">
          <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[8px]">
            Login locations (last 18 min)
          </div>
          <svg
            viewBox="0 0 600 200"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-[200px] block rounded-[4px] border border-[var(--line-soft)]"
            style={{ background: 'linear-gradient(135deg, #f5f1e8, #ede6d6)' }}
          >
            {/* Continental backdrop */}
            <path
              d="M 50 80 Q 100 70 160 75 Q 220 78 280 70 Q 340 65 380 70 Q 410 72 450 75 Q 480 80 510 78 L 510 130 Q 470 135 420 130 Q 360 125 300 132 Q 240 138 180 132 Q 120 128 60 130 Z"
              fill="rgba(180,170,150,0.25)"
              stroke="rgba(110,100,80,0.3)"
              strokeWidth="0.8"
            />
            <path
              d="M 200 130 Q 230 145 250 165 Q 270 175 290 170"
              fill="none"
              stroke="rgba(110,100,80,0.25)"
              strokeWidth="0.8"
            />
            {/* Trail (geo-traversal) */}
            <path
              d="M 480 110 Q 380 70 260 95 Q 220 100 240 105 Q 250 108 260 95"
              fill="none"
              stroke="var(--danger)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            {/* Mumbai · IN */}
            <g>
              <circle cx="480" cy="110" r="6" fill="var(--ink-soft)" stroke="var(--paper)" strokeWidth="2" />
              <text x="480" y="135" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)" textAnchor="middle" fontWeight="700">
                Mumbai · IN
              </text>
              <text x="480" y="146" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)" textAnchor="middle">
                10:06
              </text>
            </g>
            {/* Frankfurt · DE (pulsing) */}
            <g>
              <circle cx="265" cy="80" r="7" fill="var(--danger)" stroke="var(--paper)" strokeWidth="2">
                <animate attributeName="r" values="7;9;7" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <text x="265" y="65" fontFamily="var(--font-mono)" fontSize="9" fill="var(--danger)" textAnchor="middle" fontWeight="700">
                Frankfurt · DE
              </text>
              <text x="265" y="55" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)" textAnchor="middle">
                10:09 · 10:24
              </text>
            </g>
            {/* Paris · FR */}
            <g>
              <circle cx="225" cy="92" r="6" fill="var(--amber)" stroke="var(--paper)" strokeWidth="2" />
              <text x="225" y="115" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)" textAnchor="middle" fontWeight="700">
                Paris · FR
              </text>
              <text x="225" y="126" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-mute)" textAnchor="middle">
                10:18
              </text>
            </g>
          </svg>
          <div className="flex flex-wrap gap-[14px] mt-[10px] font-mono text-[10px] text-[var(--ink-soft)] tracking-[0.02em]">
            <span className="inline-flex items-center gap-[5px]">
              <span className="w-[8px] h-[8px] rounded-full bg-[var(--ink-soft)]" />
              Normal login
            </span>
            <span className="inline-flex items-center gap-[5px]">
              <span
                className="w-[8px] h-[8px] rounded-full bg-[var(--danger)]"
                style={{ animation: 'sa-evd-pulse-fr 1.4s ease-in-out infinite' }}
              />
              Geo-traversal flag
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
