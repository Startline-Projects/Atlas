import Link from 'next/link';
import type { SuspiciousActivityProfile } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousPatternCardProps {
  pattern: NonNullable<SuspiciousActivityProfile['pattern']>;
}

export function SuspiciousPatternCard({ pattern }: SuspiciousPatternCardProps) {
  return (
    <section className="mb-[18px]">
      <div className="bg-[var(--lime-bg)] border border-[rgba(74,109,65,0.25)] rounded-[var(--r-md)] p-[18px_20px] relative">
        {/* Left accent strip (was ::before in admin.html) */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 w-[4px] h-full bg-[var(--lime-deep)] rounded-tl-[var(--r-md)] rounded-bl-[var(--r-md)]"
        />

        <div className="flex items-start gap-[12px] mb-[14px] pb-[12px] border-b border-dashed border-b-[rgba(74,109,65,0.3)]">
          <div className="w-[36px] h-[36px] rounded-[8px] bg-[var(--paper)] grid place-items-center text-[var(--lime-deep)] flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--lime-deep)] font-bold mb-[3px]">
              PATTERN DETECTED · {pattern.clusterId}
            </div>
            <div className="font-display text-[17px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.25]">
              {pattern.title}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 max-[720px]:grid-cols-1 gap-[12px] mb-[12px]">
          {pattern.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-[8px_10px] bg-[var(--paper)] rounded-[var(--r-sm)]"
            >
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
                {stat.label}
              </div>
              <div className="font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.01em] leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[3px]">
                {stat.meta}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[12.5px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55]">
          Six accounts — all candidates — have shown rapid geo-traversal patterns within the last hour.
          Three (50%) share a common IP block in Frankfurt that overlaps with the{' '}
          {pattern.linkedFraudId ? (
            <Link
              href={`/admin/trust-safety/fraud-abuse/${pattern.linkedFraudId}`}
              className="text-[var(--ink)] underline cursor-pointer font-semibold hover:text-[var(--super)]"
            >
              Vorona Capital ring ({pattern.linkedFraudId.toUpperCase()})
            </Link>
          ) : (
            <span className="text-[var(--ink)] font-semibold">Vorona Capital ring</span>
          )}
          . This may be coincidence (datacenter VPN, common ISP) or coordination. Recommended:{' '}
          <strong className="text-[var(--ink)] font-bold">watchlist all 6 for 48h</strong> and re-cluster
          after the next round of events. Auto-watchlist already applied to siblings; this event is the most
          recent.
        </div>
      </div>
    </section>
  );
}
