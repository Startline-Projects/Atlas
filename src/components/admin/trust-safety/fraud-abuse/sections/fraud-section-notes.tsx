/**
 * Phase 15c — §06 Admin notes & investigation log (Server component).
 *
 * admin.html CSS: .fr-note + .fr-notes-list (L16419-16478)
 * admin.html markup: L40129-40190
 *
 * 3 prior notes (server-rendered) + composer (client) as 4th item.
 */
import type { FraudNotesData } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudNoteComposer } from '../fraud-note-composer';

interface FraudSectionNotesProps {
  data: FraudNotesData;
}

export function FraudSectionNotes({ data }: FraudSectionNotesProps) {
  return (
    <section
      data-fraud-section="notes"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[20px] px-[24px] mb-[16px]"
    >
      {/* Section head */}
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[16px] pb-[12px] border-b border-dashed border-[var(--line-soft)]">
        <div className="flex items-baseline gap-[10px]">
          <span className="font-mono text-[9.5px] bg-[var(--cream-deep)] text-[var(--ink-mute)] py-[2px] px-[6px] rounded-[3px] font-bold tracking-[0.06em]">
            06
          </span>
          <div>
            <h2 className="font-display text-[18px] font-medium tracking-[-0.01em] m-0 leading-[1.2] text-[var(--ink)]">
              Admin notes &amp; investigation log
            </h2>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em] mt-[4px]">
              3 prior investigators · {data.totalNotes} internal notes · all timestamps in UTC
            </div>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex flex-col gap-[12px]">
        {data.notes.map((note, i) => (
          <div
            key={i}
            className="py-[14px] px-[16px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)] border-l-[3px] border-l-[var(--ink-soft)]"
          >
            {/* note-head */}
            <div className="flex items-center gap-[10px] mb-[8px] flex-wrap">
              <div
                className="w-[24px] h-[24px] rounded-full grid place-items-center flex-shrink-0 font-display text-[9px] text-[var(--paper)] font-medium"
                style={{ background: note.gradient }}
              >
                {note.initials}
              </div>
              <span className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
                {note.author}
              </span>
              <span className="font-mono text-[9px] tracking-[0.06em] uppercase text-[var(--ink-mute)] bg-[var(--cream-deep)] py-[2px] px-[5px] rounded-[3px] font-bold">
                {note.role}
              </span>
              <span className="ml-auto font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
                {note.timestamp}
              </span>
            </div>

            {/* note-text */}
            <div className="text-[13px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em]">
              {note.body}
            </div>
          </div>
        ))}

        {/* Composer — 4th item */}
        <FraudNoteComposer config={data.composer} />
      </div>
    </section>
  );
}
