import type { SbInternalNote } from '@/lib/mock-data/admin/suspensions-bans-data';

interface SbInternalNotesProps {
  notes: SbInternalNote[];
  sectionNum: string;
}

export function SbInternalNotes({ notes, sectionNum }: SbInternalNotesProps) {
  return (
    <section className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[20px_24px] mb-[16px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-b-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] tracking-[0.06em] bg-[var(--cream-deep)] text-[var(--ink-mute)] px-[6px] py-[2px] rounded-[3px] font-bold">
            {sectionNum}
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] leading-[1.2] m-0">
              Internal admin notes
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              admin-only · not visible to the user · audit logged
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        {notes.map((note, i) => (
          <div
            key={i}
            className="p-[14px_16px] bg-[var(--paper-deep)] border border-[var(--line-soft)] border-l-[3px] border-l-[var(--ink-soft)] rounded-[var(--r-sm)]"
          >
            <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
              <div
                className="w-[24px] h-[24px] rounded-full grid place-items-center flex-shrink-0 font-display text-[9px] font-medium text-[var(--paper)]"
                style={{ background: note.gradient }}
              >
                {note.initials}
              </div>
              <span className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
                {note.author}
              </span>
              <span className="font-mono text-[9px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-bold px-[5px] py-[2px] bg-[var(--cream-deep)] rounded-[3px]">
                {note.role}
              </span>
              <span className="ml-auto font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
                {note.time}
              </span>
            </div>
            <div className="text-[13px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em]">
              {note.body}
            </div>
          </div>
        ))}

        {/* Composer */}
        <div className="p-[14px_16px] bg-[rgba(110,63,224,0.03)] border border-[var(--line-soft)] border-l-[3px] border-l-[var(--super)] rounded-[var(--r-sm)]">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <div
              className="w-[24px] h-[24px] rounded-full grid place-items-center flex-shrink-0 font-display text-[9px] font-medium text-[var(--paper)]"
              style={{ background: 'linear-gradient(135deg, #C9A87A, #6E4F2F)' }}
            >
              AO
            </div>
            <span className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
              Add note as Aïsha
            </span>
            <span className="font-mono text-[9px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-bold px-[5px] py-[2px] bg-[var(--cream-deep)] rounded-[3px]">
              You
            </span>
          </div>
          <div className="mt-[12px] p-[12px_14px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)]">
            <textarea
              placeholder="Internal note · admin-only · audit logged · context the user can't see (e.g., decision rationale)"
              className="w-full min-h-[60px] font-body text-[13px] text-[var(--ink)] bg-transparent border-0 resize-y outline-none tracking-[-0.005em] leading-[1.5] placeholder:text-[var(--ink-mute)]"
            />
            <div className="flex justify-between items-center gap-[8px] mt-[8px] pt-[8px] border-t border-dashed border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
              <span>Internal · audit logged on save</span>
              <button
                type="button"
                className="inline-flex items-center gap-[6px] py-[5px] px-[12px] font-body text-[11.5px] font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap hover:bg-black transition-all"
              >
                Save note
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
