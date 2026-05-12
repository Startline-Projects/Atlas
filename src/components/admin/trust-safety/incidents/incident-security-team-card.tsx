/**
 * Phase 16a — Security team coordination card (STUB).
 *
 * admin.html: L41289-41341 (Phase 16c will populate full content)
 *
 * Card chrome matching other rail cards. Empty body w/ placeholder copy.
 */
export function IncidentSecurityTeamCard() {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[18px] px-[20px]">
      <h3 className="font-display text-[14px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[8px]">
        Team coordination
      </h3>
      <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] leading-[1.5]">
        5 team members · placeholder for Phase 16c
      </div>
      <div className="flex items-center justify-center py-[24px] mt-[10px] border-t border-dashed border-[var(--line-soft)]">
        <span className="font-mono text-[10px] tracking-[0.04em] text-[var(--ink-mute)] text-center">
          Team roster + status dots populated in Phase 16c
        </span>
      </div>
    </div>
  );
}
