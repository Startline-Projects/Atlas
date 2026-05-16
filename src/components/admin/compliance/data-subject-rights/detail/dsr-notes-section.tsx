// Admin.html lines 48089-48130
import type { DsrNote, DsrNoteComposer } from '@/lib/mock-data/admin/data-subject-rights-data';

interface DsrNotesSectionProps {
  existing: DsrNote[];
  composer: DsrNoteComposer;
}

export function DsrNotesSection({ existing, composer }: DsrNotesSectionProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      {/* Existing notes */}
      {existing.map((note, idx) => (
        <div key={idx} className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[14px] px-[18px]">
          <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
            <div
              className="w-[32px] h-[32px] rounded-full grid place-items-center text-[var(--paper)] font-display text-[11px] font-medium flex-shrink-0"
              style={{ background: note.avatarGradient }}
            >
              {note.initials}
            </div>
            <span className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
              {note.author}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
              {note.role}
            </span>
            <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] ml-auto">
              {note.time}
            </span>
          </div>
          <div className="font-body text-[12.5px] text-[var(--ink-soft)] leading-[1.65] tracking-[-0.005em]">
            {note.text}
          </div>
        </div>
      ))}

      {/* Composer */}
      <div className="bg-[var(--paper)] border border-[var(--line)] border-l-[3px] border-l-[var(--super)] rounded-[var(--r-md)] py-[14px] px-[18px]">
        <div className="flex items-center gap-[10px] mb-[10px] flex-wrap">
          <div
            className="w-[32px] h-[32px] rounded-full grid place-items-center text-[var(--paper)] font-display text-[11px] font-medium flex-shrink-0"
            style={{ background: composer.avatarGradient }}
          >
            {composer.initials}
          </div>
          <span className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
            {composer.author}
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
            {composer.role}
          </span>
        </div>

        <div className="mt-[10px]">
          <textarea
            className="w-full bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] py-[10px] px-[12px] font-body text-[12px] text-[var(--ink)] leading-[1.6] resize-none min-h-[80px] outline-none focus:border-[var(--ink)] placeholder:text-[var(--ink-mute)]"
            placeholder={composer.placeholder}
          />
          <div className="flex items-center justify-between gap-[12px] mt-[10px] flex-wrap">
            <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
              Internal · privileged · Art. 30 record
            </span>
            <button className="inline-flex items-center justify-center gap-[6px] py-[5px] px-[12px] font-mono text-[11.5px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[var(--ink-soft)]">
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
