'use client';

import { useState } from 'react';

interface Note {
  avatar: string;
  avatarBg: string;
  author: string;
  role: string;
  time: string;
  text: string;
}

interface LrNotesSectionProps {
  notes: Note[];
}

export function LrNotesSection({ notes }: LrNotesSectionProps) {
  const [composerText, setComposerText] = useState('');

  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden">
      {/* Existing notes */}
      {notes.length > 0 && (
        <div className="border-b border-b-[var(--line-soft)]">
          <div className="space-y-0">
            {notes.map((note, idx) => (
              <div
                key={idx}
                className={`p-[14px_20px] ${idx < notes.length - 1 ? 'border-b border-b-[var(--line-soft)]' : ''}`}
              >
                <div className="flex items-start gap-[12px]">
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 w-[32px] h-[32px] rounded-full grid place-items-center text-white font-mono text-[11px] font-bold tracking-[0.02em]"
                    style={{ background: note.avatarBg }}
                  >
                    {note.avatar}
                  </div>

                  {/* Note content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-[8px] mb-[2px]">
                      <span className="font-body text-[12px] font-semibold text-[var(--ink)]">
                        {note.author}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--ink-soft)] tracking-[0.02em]">
                        {note.role}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-[var(--ink-mute)] tracking-[0.02em] mb-[6px]">
                      {note.time}
                    </div>
                    <div className="font-body text-[12px] text-[var(--ink)] leading-[1.5]">
                      {note.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="p-[14px_20px]">
        <div className="mb-[8px]">
          <label className="font-mono text-[8px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold">
            Add note
          </label>
        </div>
        <textarea
          value={composerText}
          onChange={(e) => setComposerText(e.target.value)}
          placeholder="Internal note (visible only to Atlas staff) · linked to this matter for legal record"
          className="w-full px-[12px] py-[10px] font-body text-[12px] border border-[var(--line)] rounded-[6px] bg-[var(--paper)] text-[var(--ink)] placeholder-[var(--ink-mute)] focus:outline-none focus:border-[var(--ink)] resize-vertical min-h-[80px]"
        />
        <div className="flex items-center justify-between gap-[10px] mt-[10px]">
          <div className="font-mono text-[8px] text-[var(--ink-mute)] tracking-[0.02em]">
            Markdown formatting supported
          </div>
          <button
            disabled={!composerText.trim()}
            className="inline-flex items-center px-[12px] py-[7px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
