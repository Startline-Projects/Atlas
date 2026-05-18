/* admin.html lines 61555-61932: integration card — head (logo + name + purpose + status) + body (4 metrics) + foot (meta + action) */

import Link from 'next/link';
import { IntStatusPill } from './int-status-pill';
import { IntMetric } from './int-metric';
import type { IntegrationCard } from '@/lib/mock-data/admin/integrations-data';

interface IntCardProps {
  card: IntegrationCard;
}

export function IntCardComponent({ card }: IntCardProps) {
  const statusVariantClasses =
    card.status === 'error'
      ? 'border-[rgba(194,65,43,0.4)] bg-[rgba(194,65,43,0.02)] before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[var(--danger)]'
      : card.status === 'warn'
      ? 'border-[rgba(232,118,58,0.35)] before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[var(--amber)]'
      : card.status === 'disconnected'
      ? 'border-[var(--line)] opacity-65'
      : 'border-[var(--line)]';

  const actionClasses =
    card.footAction.variant === 'primary'
      ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
      : card.footAction.variant === 'warn'
      ? 'bg-[var(--amber)] border-[var(--amber)] text-[var(--paper)] hover:bg-[var(--amber-deep,#C7642E)] hover:border-[var(--amber-deep,#C7642E)]'
      : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]';

  return (
    <Link
      href={`/admin/platform/integrations/${card.id}`}
      className={`relative block bg-[var(--paper)] border rounded-[var(--r-md)] overflow-hidden cursor-pointer transition-all hover:border-[var(--line-strong)] ${statusVariantClasses}`}
    >
      {/* Card head */}
      <div className="flex items-center gap-[12px] pt-[16px] px-[18px] pb-[14px] border-b border-b-[var(--line-soft)]">
        <div
          className="w-[38px] h-[38px] rounded-[8px] grid place-items-center font-display text-[14px] font-bold text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
          style={{ background: card.logoGradient }}
        >
          {card.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] mb-[2px]">
            {card.name}
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.4]">
            {card.purpose}
          </div>
        </div>
        <IntStatusPill status={card.status} label={card.statusLabel} />
      </div>

      {/* Card body — 4-metric 2×2 grid */}
      <div className="py-[12px] px-[18px] grid grid-cols-2 gap-y-[12px] gap-x-[18px]">
        {card.metrics.map((metric, idx) => (
          <IntMetric key={idx} metric={metric} />
        ))}
      </div>

      {/* Card foot — meta + action */}
      <div className="flex items-center justify-between gap-[8px] py-[10px] px-[16px] bg-[var(--paper-deep)] border-t border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
        <span
          className="flex-1 min-w-0 [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: card.footMetaHtml }}
        />
        <div className="inline-flex gap-[4px] flex-shrink-0">
          <button
            type="button"
            className={`inline-flex items-center gap-[6px] py-[4px] px-[10px] font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${actionClasses}`}
          >
            {card.footAction.label}
          </button>
        </div>
      </div>
    </Link>
  );
}
