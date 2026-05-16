'use client';

// Admin.html lines 58479-58539: Context notes (immutable additions)
// 2 existing notes + composer for new immutable notes

import { useState } from 'react';

interface AudNote {
  author: string;
  role: string;
  time: string;
  textHtml: string;
  initials: string;
  avatarGradient: string;
}

interface AudContextNotesProps {
  meta: string;
  immutBadge: string;
  notes: AudNote[];
  composer: {
    placeholder: string;
    footMetaText: string;
    saveLabel: string;
  };
}

export function AudContextNotes({
  meta,
  immutBadge,
  notes,
  composer,
}: AudContextNotesProps) {
  const [noteText, setNoteText] = useState('');

  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Head */}
      <div className="py-[12px] px-[18px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex items-center justify-between gap-[12px] flex-wrap">
        <div>
          <h3 className="font-display text-[14.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0 mb-[2px]">
            Notes · {notes.length} added · all immutable
          </h3>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
            {meta}
          </div>
        </div>
        <span className="font-mono text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--ink-soft)] py-[3px] px-[8px] bg-[var(--cream-deep)] rounded-[3px] whitespace-nowrap">
          {immutBadge}
        </span>
      </div>

      {/* Existing notes */}
      <div className="py-[14px] px-[18px] flex flex-col gap-[12px]">
        {notes.map((note, idx) => (
          <div key={idx} className="flex gap-[12px] items-start">
            {/* Avatar */}
            <div
              className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium flex-shrink-0"
              style={{ background: note.avatarGradient }}
            >
              {note.initials}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              {/* Head: author, role, time */}
              <div className="flex items-baseline gap-[8px] flex-wrap mb-[4px]">
                <span className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
                  {note.author}
                </span>
                <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em]">
                  {note.role}
                </span>
                <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] ml-auto">
                  {note.time}
                </span>
              </div>

              {/* Body */}
              <div
                className="font-body text-[12.5px] text-[var(--ink-soft)] leading-[1.55] tracking-[-0.005em] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: note.textHtml }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="py-[12px] px-[18px] border-t border-t-dashed border-t-[var(--line-soft)] bg-[var(--paper-deep)]">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={composer.placeholder}
          className="w-full border border-[var(--line)] bg-[var(--paper)] rounded-[var(--r-sm)] py-[8px] px-[10px] font-body text-[12.5px] text-[var(--ink)] resize-y min-h-[50px] outline-none tracking-[-0.005em] focus:border-[var(--ink-soft)] placeholder:text-[var(--ink-mute)]"
        />
        <div className="flex items-center justify-between gap-[10px] mt-[8px]">
          <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em]">
            {composer.footMetaText}
          </span>
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[var(--ink-soft)] whitespace-nowrap">
            {composer.saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
