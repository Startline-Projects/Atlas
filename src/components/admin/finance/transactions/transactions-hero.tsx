import Link from 'next/link';
import type { TxDetailProfile, TxValueVariant } from '@/lib/mock-data/admin/transactions-data';
import { TransactionStatusPill } from './transaction-status-pill';
import { TransactionTypePill } from './transaction-type-pill';
import { TransactionsMoreMenu } from './transactions-more-menu';

interface TransactionsHeroProps {
  profile: TxDetailProfile;
}

const HERO_BORDER_TOP: Record<TxDetailProfile['heroVariant'], string> = {
  high: 'border-t-[var(--amber)]',
  medium: 'border-t-[var(--lime-deep)]',
  danger: 'border-t-[var(--danger)]',
};

const STAT_COLOR: Record<TxValueVariant, string> = {
  normal: 'text-[var(--ink)]',
  danger: 'text-[var(--danger)]',
  warn: 'text-[var(--amber)]',
};

export function TransactionsHero({ profile }: TransactionsHeroProps) {
  return (
    <div
      className={`bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_26px] mb-[22px] relative overflow-hidden border-t-[4px] ${HERO_BORDER_TOP[profile.heroVariant]}`}
    >
      <div className="flex items-start justify-between gap-[18px] flex-wrap mb-[14px]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px] flex-wrap mb-[8px]">
            <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
              {profile.atlasId}
            </span>
            <TransactionStatusPill status={profile.status} label={profile.statusLabel} />
            <TransactionTypePill type={profile.type} label={profile.typeLabel} />
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
              {profile.timestamp} · {profile.relativeTime}
            </span>
          </div>

          <h1 className="font-display text-[26px] font-medium tracking-[-0.02em] mb-[6px] leading-[1.2] text-[var(--ink)]">
            {profile.title}
          </h1>

          <div className="font-mono text-[11.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
            Invoice{' '}
            <span className="text-[var(--ink-soft)] underline font-semibold">{profile.refInvoiceId}</span>{' '}
            for Daniel Kovács&apos;s design engagement (
            <span className="text-[var(--ink-soft)] underline font-semibold">{profile.refEngagementId}</span>
            ) with{' '}
            <span className="text-[var(--ink-soft)] underline font-semibold">
              {profile.refClientName} ({profile.refClientId})
            </span>
            . Stripe declined the charge with code{' '}
            {profile.declineCode && (
              <code className="font-mono text-[11px] bg-[var(--paper-deep)] px-[5px] py-[1px] rounded-[3px]">
                {profile.declineCode}
              </code>
            )}
            . Auto-retry scheduled in 24h. Client notified.{' '}
            <strong className="text-[var(--amber)] font-bold">Note:</strong> This client also has an active
            suspension appeal (
            {profile.refSanctionId ? (
              <Link
                href={`/admin/trust-safety/suspensions-bans/${profile.refSanctionId}`}
                className="text-[var(--ink-soft)] underline cursor-pointer font-semibold hover:text-[var(--ink)]"
              >
                {profile.refSanctionId.toUpperCase()}
              </Link>
            ) : (
              <span className="text-[var(--ink-soft)] font-semibold">no sanction</span>
            )}
            ) for late-payment pattern.
          </div>
        </div>

        <div className="inline-flex gap-[8px] flex-wrap items-start flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer whitespace-nowrap hover:border-[var(--amber)] hover:bg-[var(--amber-bg)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Retry now
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 14 4 9 9 4" />
              <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
            </svg>
            Initiate refund
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-[6px] py-[8px] pr-[14px] pl-[12px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--danger)] cursor-pointer whitespace-nowrap hover:border-[var(--danger)] hover:bg-[var(--danger-bg)] transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Mark fraudulent
          </button>
          <TransactionsMoreMenu menu={profile.moreMenu} />
        </div>
      </div>

      {/* Hero stats grid */}
      <div className="grid grid-cols-4 max-[720px]:grid-cols-2 gap-0 mt-[16px] pt-[14px] border-t border-t-[var(--line-soft)]">
        {profile.heroStats.map((stat) => (
          <div
            key={stat.label}
            className="pr-[16px] border-r border-r-[var(--line-soft)] last:border-r-0 last:pr-0 max-[720px]:[&:nth-child(2n)]:border-r-0 max-[720px]:[&:nth-child(2n)]:pr-0"
          >
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[4px]">
              {stat.label}
            </div>
            <div className={`font-display text-[18px] font-medium tracking-[-0.01em] leading-[1.1] ${STAT_COLOR[stat.variant ?? 'normal']}`}>
              {stat.value}
            </div>
            <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
              {stat.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
