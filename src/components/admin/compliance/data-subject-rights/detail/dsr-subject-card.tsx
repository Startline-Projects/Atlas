import type { DsrSubjectCard } from '@/lib/mock-data/admin/data-subject-rights-data';

interface DsrSubjectCardProps {
  card: Partial<DsrSubjectCard> & {
    title?: string;
    hideActions?: boolean;
    iconSvg?: string;
    role?: string;
    name: string;
    initials: string;
    avatarGradient: string;
  };
  actionLabels?: string[];
}

export function DsrSubjectCardSection({ card, actionLabels }: DsrSubjectCardProps) {
  const variantClass = (v?: 'warn' | 'danger' | 'success') => {
    if (v === 'warn') return 'text-[var(--amber)]';
    if (v === 'danger') return 'text-[var(--danger)]';
    if (v === 'success') return 'text-[var(--success)]';
    return 'text-[var(--ink-soft)]';
  };

  const title = card.title ?? 'Subject';
  const showActions = card.hideActions !== true;

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[16px] px-[18px]">
      <h3 className="font-display text-[13px] font-medium text-[var(--ink)] tracking-[-0.005em] m-0 mb-[10px] pb-[8px] border-b border-dashed border-[var(--line-soft)]">
        {title}
      </h3>

      <div className="flex items-center gap-[10px] mb-[12px]">
        <div
          className="w-[40px] h-[40px] rounded-full text-[var(--paper)] grid place-items-center font-display text-[13px] font-medium flex-shrink-0"
          style={{ background: card.avatarGradient }}
        >
          {card.iconSvg ? (
            <span dangerouslySetInnerHTML={{ __html: card.iconSvg }} />
          ) : (
            card.initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-bold text-[var(--ink)] tracking-[-0.01em]">{card.name}</div>
          {(card.role || (card as any).subjectId) && (
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">
              {card.role || (card as any).subjectId}
            </div>
          )}
        </div>
      </div>

      {('metaRows' in card && card.metaRows && Array.isArray(card.metaRows)) && (
        <div className="flex flex-col gap-[4px] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] mb-[12px] pb-[10px] border-b border-dashed border-[var(--line-soft)]">
          {(card.metaRows as any[]).map((row, idx) => (
            <div key={idx} className="flex justify-between gap-[8px] py-[3px]">
              <span className="text-[var(--ink-mute)]">{row.label}</span>
              <span className={`font-semibold text-right ${variantClass(row.variant)}`}>{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {showActions && (
        <div className="flex gap-[6px]">
          {actionLabels && actionLabels.length > 0 ? (
            actionLabels.map((label, idx) => (
              <button
                key={idx}
                className="flex-1 inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
              >
                {label}
              </button>
            ))
          ) : (
            <>
              <button className="flex-1 inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
                Profile →
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
                Message
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
