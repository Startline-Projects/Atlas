/**
 * Phase 16b — Notification card primitive (single card).
 *
 * admin.html CSS: L16830-16966 (.si-notif-card)
 *
 * Variants: default (line border, paper-deep bg), urgent (amber), complete (success).
 * Pill variants: partial, required, complete, pending.
 * Each card: icon + title + subtitle + pill + progress + 4 stats + footer + action.
 */
import type { NotifCardData } from '@/lib/mock-data/admin/incidents-data';

/* ---- variant maps ---- */

const CARD_CLASSES: Record<NotifCardData['variant'], string> = {
  default: 'bg-[var(--paper-deep)] border-[var(--line)]',
  urgent: 'border-[var(--amber)] bg-[var(--amber-bg)]',
  complete: 'border-[var(--success)] bg-[var(--success-bg)]',
};

const ICON_CLASSES: Record<NotifCardData['variant'], string> = {
  default: 'text-[var(--ink-soft)] border-[var(--line)]',
  urgent: 'text-[var(--amber)] border-[rgba(232,118,58,0.4)]',
  complete: 'text-[var(--success)] border-[rgba(46,125,84,0.3)]',
};

const SUB_CLASSES: Record<NotifCardData['variant'], string> = {
  default: 'text-[var(--ink-mute)]',
  urgent: 'text-[var(--amber)]',
  complete: 'text-[var(--success)]',
};

const FILL_CLASSES: Record<NotifCardData['variant'], string> = {
  default: 'bg-[var(--ink-soft)]',
  urgent: 'bg-[var(--amber)]',
  complete: 'bg-[var(--success)]',
};

const FOOT_BORDER: Record<NotifCardData['variant'], string> = {
  default: 'border-[var(--line-soft)]',
  urgent: 'border-[rgba(232,118,58,0.3)]',
  complete: 'border-[rgba(46,125,84,0.3)]',
};

const PILL_CLASSES: Record<NotifCardData['pillVariant'], string> = {
  partial: 'bg-[rgba(232,118,58,0.15)] text-[var(--amber)]',
  required: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  complete: 'bg-[var(--success-bg)] text-[var(--success)]',
  pending: 'bg-[var(--amber-bg)] text-[var(--amber)]',
};

/* ---- icon SVGs ---- */

function UsersIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const ICON_MAP = { users: UsersIcon, shield: ShieldIcon } as const;

/* ---- component ---- */

interface IncidentNotificationCardProps {
  card: NotifCardData;
}

export function IncidentNotificationCard({ card }: IncidentNotificationCardProps) {
  const Icon = ICON_MAP[card.iconKey];

  return (
    <div className={`border rounded-[var(--r-sm)] p-[14px_16px] relative ${CARD_CLASSES[card.variant]}`}>
      {/* Head: icon + title + subtitle + pill */}
      <div className="flex items-center gap-[8px] mb-[10px]">
        <div className={`w-[28px] h-[28px] rounded-[6px] bg-[var(--paper)] grid place-items-center flex-shrink-0 border ${ICON_CLASSES[card.variant]}`}>
          <Icon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-bold text-[var(--ink)] tracking-[-0.01em] leading-[1.2]">
            {card.title}
          </div>
          <div className={`font-mono text-[9.5px] tracking-[0.06em] uppercase font-bold mt-[2px] ${SUB_CLASSES[card.variant]}`}>
            {card.subtitle}
          </div>
        </div>
        <span className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[9.5px] font-bold tracking-[0.08em] uppercase rounded-full flex-shrink-0 ${PILL_CLASSES[card.pillVariant]}`}>
          {card.pillLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[6px] bg-[var(--paper)] rounded-full overflow-hidden m-[8px_0_6px] border border-[var(--line-soft)]">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease ${FILL_CLASSES[card.variant]}`}
          style={{ width: `${card.progressPercent}%` }}
        />
      </div>

      {/* Stats 2×2 grid */}
      <div className="grid grid-cols-2 gap-[8px_12px] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em]">
        {card.stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-[9px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold">
              {stat.label}
            </div>
            <div className={`font-bold [font-variant-numeric:tabular-nums] mt-[2px] ${stat.isWarn ? 'text-[var(--amber)]' : 'text-[var(--ink)]'}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`mt-[10px] pt-[10px] border-t border-dashed flex justify-between items-center flex-wrap gap-[8px] ${FOOT_BORDER[card.variant]}`}>
        <span className="font-mono text-[10px] text-[var(--ink-soft)] tracking-[0.02em]">
          {card.footText}
          {card.footHighlight && (
            <strong className={`font-bold ${card.footHighlight.color === 'amber' ? 'text-[var(--amber)]' : 'text-[var(--danger)]'}`}>
              {card.footHighlight.text}
            </strong>
          )}
          {card.footHighlight && ' remaining (GDPR)'}
        </span>
        <button
          type="button"
          className={`font-mono text-[10.5px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] rounded-[4px] p-[5px_10px] cursor-pointer transition-all duration-[120ms] ease ${
            card.actionVariant === 'warn'
              ? 'border border-[var(--amber)] text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--paper)]'
              : 'border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]'
          }`}
          data-si-action={card.actionKey}
        >
          {card.actionLabel}
        </button>
      </div>
    </div>
  );
}
