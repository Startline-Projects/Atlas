import type {
  ManagerProfile,
  ManagerHrCard,
  ManagerHrDdValue,
  ManagerComplianceRow,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionHrProps {
  profile: ManagerProfile;
}

// Inline color for emphasized dd values — extended with 'super' variant for Manager · elevated
function ddInlineStyle(dd: ManagerHrDdValue): React.CSSProperties | undefined {
  if (!dd.emphasisColor) return undefined;
  const color =
    dd.emphasisColor === 'success' ? 'var(--success)'
    : dd.emphasisColor === 'warn'  ? 'var(--amber)'
    : dd.emphasisColor === 'super' ? 'var(--super)'
    :                                'var(--danger)';
  return { color, fontWeight: 600 };
}

// admin.html lines 7886-7923 — sp-hr-card with h4 + dl
function HrCardView({ card }: { card: ManagerHrCard }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[18px] py-[16px]">
      {/* admin.html line 7892: h4 — mono uppercase 10px + dashed bottom */}
      <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[12px] pb-[8px] border-b border-dashed border-[var(--line-soft)] m-0">
        {card.title}
      </h4>
      {/* admin.html line 7903: dl — grid auto/1fr cols, gap 7/14, 12.5px */}
      <dl className="grid grid-cols-[auto_1fr] gap-x-[14px] gap-y-[7px] text-[12.5px] m-0">
        {card.entries.map((entry, idx) => (
          <div key={idx} className="contents">
            {/* admin.html line 7910: dt — mono 9.5px uppercase mute pt-1 */}
            <dt className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-[var(--ink-mute)] pt-[1px] font-medium m-0">
              {entry.dt}
            </dt>
            {/* admin.html line 7919: dd — ink medium m-0 (with optional emphasis color inline) */}
            <dd className="text-[var(--ink)] font-medium m-0" style={ddInlineStyle(entry.dd)}>
              {entry.dd.text}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// admin.html lines 7953-8003 — compliance row
function ComplianceRowView({ row }: { row: ManagerComplianceRow }) {
  const isDue = row.variant === 'due';
  const isOverdue = row.variant === 'overdue';
  const isCheck = !isDue && !isOverdue;

  const iconClass = isOverdue
    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
    : isDue
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : 'bg-[var(--success-bg)] text-[var(--success)]';

  const dueClass = isOverdue
    ? 'text-[var(--danger)] font-semibold'
    : isDue
      ? 'text-[var(--amber)] font-semibold'
      : 'text-[var(--ink-mute)]';

  const statusClass = isOverdue
    ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
    : isDue
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : 'bg-[var(--success-bg)] text-[var(--success)]';

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-[12px] items-center px-[16px] py-[11px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px]">
      {/* admin.html line 7963: c-icon — 28x28 circle with success/amber/danger variant */}
      <span
        className={cn(
          'w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0',
          iconClass
        )}
        aria-hidden="true"
      >
        {isCheck ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        )}
      </span>
      <div className="min-w-0">
        <div className="font-semibold text-[var(--ink)]">{row.name}</div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
          {row.meta}
        </div>
      </div>
      <span className={cn('font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap', dueClass)}>
        {row.due}
      </span>
      <span
        className={cn(
          'font-mono text-[9px] tracking-[0.1em] uppercase py-[2px] px-[7px] rounded-[3px] font-semibold whitespace-nowrap',
          statusClass
        )}
      >
        {row.statusLabel}
      </span>
    </div>
  );
}

export function ManagerSectionHr({ profile }: ManagerSectionHrProps) {
  const hr = profile.hr;
  if (!hr) {
    return null;
  }

  const { sectionStatus, hrCards, compliance, disciplinary } = hr;

  return (
    // admin.html line 20273: <section id="mgr-section-hr">
    <section
      id="mgr-section-hr"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 20274-20280 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            07 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            HR record
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor]",
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {/* Block A — Employment + access (admin.html lines 20282-20319) */}
      <div className="grid grid-cols-2 gap-[14px] mb-[14px] max-[880px]:grid-cols-1">
        {hrCards.map((card, idx) => (
          <HrCardView key={idx} card={card} />
        ))}
      </div>

      {/* Block B — Compliance training (admin.html lines 20322-20395) */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mt-[14px]">
        <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
          <span>{compliance.headTitle}</span>
          <span
            className={cn(
              'font-mono text-[10.5px] tracking-[0.02em] normal-case',
              compliance.summaryVariant === 'warn'
                ? 'text-[var(--amber)]'
                : 'text-[var(--success)]'
            )}
          >
            {compliance.summaryLabel}
          </span>
        </div>
        {compliance.rows.map((row, idx) => (
          <ComplianceRowView key={idx} row={row} />
        ))}
      </div>

      {/* Block C — Disciplinary clean state (admin.html lines 20398-20404) */}
      <div className="bg-[var(--paper)] border border-dashed border-[var(--line-strong)] rounded-[var(--r-md)] px-[20px] py-[24px] text-center mt-[14px]">
        <div
          className="w-[36px] h-[36px] mx-auto mb-[10px] rounded-full bg-[var(--success-bg)] text-[var(--success)] grid place-items-center"
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="font-display text-[16px] font-medium mb-[4px] tracking-[-0.01em]">
          {disciplinary.title}
        </div>
        <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          {disciplinary.detail}
        </div>
      </div>
    </section>
  );
}
