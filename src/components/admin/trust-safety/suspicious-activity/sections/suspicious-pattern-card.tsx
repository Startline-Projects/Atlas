import Link from 'next/link';
import type { SuspiciousActivityProfile } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousPatternCardProps {
  pattern: NonNullable<SuspiciousActivityProfile['pattern']>;
}

export function SuspiciousPatternCard({ pattern }: SuspiciousPatternCardProps) {
  const isDanger = pattern.variant === 'danger';

  const cardBg = isDanger ? 'bg-[var(--danger-bg)]' : 'bg-[var(--lime-bg)]';
  const cardBorder = isDanger ? 'border-[rgba(194,65,43,0.3)]' : 'border-[rgba(74,109,65,0.25)]';
  const stripBg = isDanger ? 'bg-[var(--danger)]' : 'bg-[var(--lime-deep)]';
  const headBorder = isDanger ? 'border-b-[rgba(194,65,43,0.2)]' : 'border-b-[rgba(74,109,65,0.3)]';
  const iconColor = isDanger ? 'text-[var(--danger)]' : 'text-[var(--lime-deep)]';
  const eyebrowColor = isDanger ? 'text-[var(--danger)]' : 'text-[var(--lime-deep)]';

  return (
    <section className="mb-[18px]">
      <div className={`${cardBg} border ${cardBorder} rounded-[var(--r-md)] p-[18px_20px] relative`}>
        {/* Left accent strip (was ::before in admin.html) */}
        <span
          aria-hidden="true"
          className={`absolute top-0 left-0 w-[4px] h-full ${stripBg} rounded-tl-[var(--r-md)] rounded-bl-[var(--r-md)]`}
        />

        <div className={`flex items-start gap-[12px] mb-[14px] pb-[12px] border-b border-dashed ${headBorder}`}>
          <div className={`w-[36px] h-[36px] rounded-[8px] bg-[var(--paper)] grid place-items-center ${iconColor} flex-shrink-0`}>
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
            <div className={`font-mono text-[9px] tracking-[0.16em] uppercase ${eyebrowColor} font-bold mb-[3px]`}>
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
          {pattern.narrative}
          {pattern.linkedFraudId && (
            <>
              {' '}
              <Link
                href={`/admin/trust-safety/fraud-abuse/${pattern.linkedFraudId}`}
                className="text-[var(--ink)] underline cursor-pointer font-semibold hover:text-[var(--super)]"
              >
                {pattern.linkedFraudLabel ?? pattern.linkedFraudId.toUpperCase()} →
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
