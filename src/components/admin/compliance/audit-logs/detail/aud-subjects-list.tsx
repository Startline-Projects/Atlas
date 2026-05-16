// Admin.html lines 58166-58230: Subjects affected
// 5 entities: Vorona Capital / Eastline Holdings / Meridian Ventures / Polar Flow / Northstar Strategies

interface Subject {
  initials: string;
  name: string;
  id: string;
  ref: string;
  avatarGradient: string;
}

interface AudSubjectsListProps {
  subjects: Subject[];
}

export function AudSubjectsList({ subjects }: AudSubjectsListProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      {subjects.map((subject, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[26px_minmax(0,1fr)_90px_30px] gap-[10px] items-center py-[8px] px-[12px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)]"
        >
          {/* Avatar */}
          <div
            className="w-[26px] h-[26px] rounded-full grid place-items-center font-display text-[10px] text-[var(--paper)] font-medium"
            style={{ background: subject.avatarGradient }}
          >
            {subject.initials}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <div className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em] truncate">
              {subject.name}
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px]">
              {subject.id}
            </div>
          </div>

          {/* Ref */}
          <div className="font-mono text-[10px] font-bold text-[var(--super)] tracking-[0.04em] text-right underline">
            {subject.ref}
          </div>

          {/* Open button */}
          <div className="flex justify-center">
            <button className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-full hover:bg-[var(--paper)] transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--ink-soft)]">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
