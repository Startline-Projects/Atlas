/**
 * Phase 16a/16c — Security team coordination card.
 *
 * admin.html markup: L41289-41341
 * admin.html CSS:    L17276-17352 (.si-team-card, .si-team-row, .tr-status)
 *
 * Card chrome: bg paper, border line, r-md, p 18/20.
 * h3: MONO 9.5px tracking 0.16em uppercase ink-mute bold, m-0 mb-14.
 * 5 team rows with status dots (online=success, away=amber).
 * Footer: war-room channel + standup cadence.
 *
 * When data is undefined (stub profiles), renders placeholder.
 */
import type { IncidentSecurityTeamData, TeamMemberStatus } from '@/lib/mock-data/admin/incidents-data';

const STATUS_DOT: Record<TeamMemberStatus, string> = {
  online: 'bg-[var(--success)]',
  away: 'bg-[var(--amber)]',
  offline: 'bg-[var(--ink-mute)]',
};

const STATUS_TEXT: Record<TeamMemberStatus, string> = {
  online: 'text-[var(--success)]',
  away: 'text-[var(--amber)]',
  offline: 'text-[var(--ink-mute)]',
};

interface IncidentSecurityTeamCardProps {
  data?: IncidentSecurityTeamData;
}

export function IncidentSecurityTeamCard({ data }: IncidentSecurityTeamCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      <h3 className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold m-0 mb-[14px]">
        Security team · response
      </h3>

      {data ? (
        <>
          {/* Team rows */}
          <div className="flex flex-col">
            {data.members.map((member, i) => (
              <div
                key={member.initials + member.name}
                className={`flex items-center gap-[10px] py-[8px] ${
                  i < data.members.length - 1 ? 'border-b border-dashed border-[var(--line-soft)]' : ''
                }`}
              >
                {/* Avatar */}
                <span
                  className="w-[30px] h-[30px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium flex-shrink-0"
                  style={{ background: member.gradient }}
                >
                  {member.initials}
                </span>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                  <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                    {member.name}
                  </div>
                  <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] uppercase font-semibold">
                    {member.role}
                  </div>
                </div>

                {/* Status */}
                <span className={`inline-flex items-center gap-[5px] font-mono text-[9.5px] tracking-[0.04em] font-semibold flex-shrink-0 ${STATUS_TEXT[member.statusKey]}`}>
                  <span className={`w-[6px] h-[6px] rounded-full ${STATUS_DOT[member.statusKey]}`} aria-hidden="true" />
                  {member.statusLabel}
                </span>
              </div>
            ))}
          </div>

          {/* Footer meta */}
          <div className="mt-[12px] pt-[12px] border-t border-dashed border-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
            {data.footerText}
            <strong className="text-[var(--ink-soft)]">{data.footerHighlight}</strong>
            {' · standup every 4h · last update 47m ago.'}
          </div>
        </>
      ) : (
        /* Placeholder for stub profiles */
        <div className="flex items-center justify-center py-[24px] border-t border-dashed border-[var(--line-soft)]">
          <span className="font-mono text-[10px] tracking-[0.04em] text-[var(--ink-mute)] text-center">
            5 team members · details not available for this incident
          </span>
        </div>
      )}
    </div>
  );
}
