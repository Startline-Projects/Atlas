import Link from 'next/link';
import type { SuspensionDetailProfile, SbQuickStatRow } from '@/lib/mock-data/admin/suspensions-bans-data';
import { SuspensionCountdownCard } from './suspension-countdown-card';

interface SuspensionsBansRailProps {
  profile: SuspensionDetailProfile;
}

const VALUE_VARIANT: Record<'normal' | 'warn' | 'danger', string> = {
  normal: 'text-[var(--ink)]',
  warn: 'text-[var(--amber)]',
  danger: 'text-[var(--danger)]',
};

const LADDER_BORDER: Record<'normal' | 'warn' | 'danger', string> = {
  normal: 'border-l-[var(--line-strong)]',
  warn: 'border-l-[var(--amber)]',
  danger: 'border-l-[var(--danger)]',
};

function QuickstatRow({ row }: { row: SbQuickStatRow }) {
  const valueColor = VALUE_VARIANT[row.variant ?? 'normal'];
  return (
    <div className="flex justify-between items-baseline gap-[12px] py-[8px] border-b border-dashed border-b-[var(--line-soft)] last:border-b-0 text-[12.5px]">
      <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)]">{row.label}</span>
      <span className={`font-body font-semibold tracking-[-0.01em] text-right ${valueColor}`}>
        {row.link ? (
          <Link
            href={row.link}
            className="text-[var(--ink)] underline cursor-pointer hover:text-[var(--super)]"
          >
            {row.value}
          </Link>
        ) : (
          row.value
        )}
      </span>
    </div>
  );
}

export function SuspensionsBansRail({ profile }: SuspensionsBansRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[14px] max-[1100px]:static max-[1100px]:order-[-1]">
      {/* Countdown */}
      <SuspensionCountdownCard countdown={profile.countdown} />

      {/* At a glance */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
        <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
          At a glance
        </h3>
        <div className="flex flex-col">
          {profile.atAGlance.map((row, i) => (
            <QuickstatRow key={i} row={row} />
          ))}
        </div>
      </div>

      {/* Sanction ladder */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
        <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
          Sanction ladder
        </h3>
        <div className="flex flex-col gap-[8px]">
          {profile.sanctionLadder.map((tier, i) => (
            <div
              key={i}
              className={`p-[10px_12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] border-l-[3px] rounded-[var(--r-sm)] ${LADDER_BORDER[tier.variant ?? 'normal']}`}
            >
              <div
                className={`text-[12px] font-semibold tracking-[-0.01em] mb-[2px] ${tier.active ? VALUE_VARIANT[tier.variant ?? 'normal'] : 'text-[var(--ink)]'}`}
              >
                {tier.stage}
              </div>
              <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.4]">
                {tier.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[10px] pt-[10px] border-t border-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          <a
            href="#"
            className="text-[var(--ink-soft)] underline cursor-pointer font-semibold hover:text-[var(--ink)]"
          >
            View full sanction policy →
          </a>
        </div>
      </div>
    </aside>
  );
}
