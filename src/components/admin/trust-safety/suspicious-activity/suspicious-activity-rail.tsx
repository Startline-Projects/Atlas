import Link from 'next/link';
import type { SuspiciousActivityProfile, SuspiciousQuickStatRow } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousActivityRailProps {
  profile: SuspiciousActivityProfile;
}

const VALUE_VARIANT: Record<'normal' | 'warn' | 'danger', string> = {
  normal: 'text-[var(--ink)]',
  warn: 'text-[var(--amber)]',
  danger: 'text-[var(--danger)]',
};

function QuickstatRow({ row }: { row: SuspiciousQuickStatRow }) {
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

export function SuspiciousActivityRail({ profile }: SuspiciousActivityRailProps) {
  return (
    <aside className="sticky top-[80px] flex flex-col gap-[14px] max-[1100px]:static max-[1100px]:order-[-1]">
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

      {/* Decision rubric */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[18px_20px]">
        <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
          Decision rubric
        </h3>
        <div className="flex flex-col">
          {profile.decisionRubric.map((row, i) => (
            <QuickstatRow key={i} row={row} />
          ))}
        </div>
        <div className="mt-[10px] pt-[10px] border-t border-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
          <a
            href="#"
            className="text-[var(--ink-soft)] underline cursor-pointer font-semibold hover:text-[var(--ink)]"
          >
            View full decision rubric →
          </a>
        </div>
      </div>
    </aside>
  );
}
