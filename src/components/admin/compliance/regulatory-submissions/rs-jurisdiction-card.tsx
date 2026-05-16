import { RsSubmissionRowComponent } from './rs-submission-row';
import type { RsJurisdictionCard } from '@/lib/mock-data/admin/regulatory-submissions-data';

interface RsJurisdictionCardProps {
  card: RsJurisdictionCard;
}

export function RsJurisdictionCardComponent({
  card,
}: RsJurisdictionCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between gap-[14px] py-[14px] px-[20px] bg-gradient-to-r from-[var(--paper-deep)] to-[var(--paper)] border-b border-b-[var(--line)] flex-wrap">
        <div className="flex items-center gap-[14px] flex-1 min-w-[200px]">
          {/* Flag */}
          <div
            className="w-[36px] h-[26px] rounded-[4px] flex-shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative overflow-hidden"
            style={card.flagStyle as React.CSSProperties}
          >
            {card.flagOverlays && card.flagOverlays.length > 0 ? (
              <>
                {card.flagOverlays.map((overlay, idx) => {
                const styleObj = overlay.style as React.CSSProperties;
                const shouldRenderText = styleObj.color !== undefined;
                return shouldRenderText ? (
                  <span key={idx} style={styleObj}>
                    ★
                  </span>
                ) : (
                  <span key={idx} style={styleObj} />
                );
              })}
              </>
            ) : null}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[2px] leading-[1.2]">
              {card.name}
            </h3>
            <div
              className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: card.regulatorHtml }}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="inline-flex items-center gap-[10px] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.06em] uppercase font-bold flex-shrink-0">
          <span>
            <span className="font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.02em] normal-case font-variant-numeric-tabular-nums">
              {card.count}
            </span>{' '}
            submissions
          </span>
          <span className="w-[1px] h-[26px] bg-[var(--line)]"></span>
          <span>{card.summary}</span>
        </div>
      </div>

      {/* Submission rows */}
      {card.submissions.map((submission) => (
        <RsSubmissionRowComponent key={submission.id} row={submission} />
      ))}
    </div>
  );
}
