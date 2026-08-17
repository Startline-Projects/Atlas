'use client';

import { Fragment } from 'react';
import type {
  ManagerProfile,
  ManagerNoteEntry,
  ManagerNoteBlockType,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionNotesProps {
  profile: ManagerProfile;
}

// admin.html lines 7755-7768 — sp-notes-body em + p + ul + li (mirror Phase 7g)
function NoteBlockView({ block }: { block: ManagerNoteBlockType }) {
  if (block.type === 'list') {
    return (
      <ul className="m-0 mb-[10px] pl-[20px] last:mb-0">
        {block.items.map((item, idx) => (
          <li key={idx} className="mb-[4px] last:mb-0">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="m-0 mb-[10px] last:mb-0">
      {block.emphasis ? (
        <em className="font-display font-medium italic [font-variation-settings:'opsz'_72]">
          {block.text}
        </em>
      ) : (
        block.text
      )}
    </p>
  );
}

// admin.html lines 7715-7781 — sp-notes-block (mirror Phase 7g)
function NotesBlockCard({ entry }: { entry: ManagerNoteEntry }) {
  const isAdminOnly = entry.visibilityVariant === 'admin-only';
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] mb-[14px] overflow-hidden last:mb-0">
      {/* admin.html line 7722: sp-notes-head — 3 direct flex siblings (title | author | visibility) per Phase 7fg drift fix */}
      <div className="flex flex-wrap items-center justify-between gap-[12px] border-b border-[var(--line-soft)] bg-[var(--paper-deep)] px-[16px] py-[11px] font-mono text-[10.5px] font-semibold tracking-[0.14em] text-[var(--ink-mute)] uppercase">
        <span>{entry.headTitle}</span>
        <span className="font-body text-center text-[11px] font-medium tracking-[0.02em] text-[var(--ink-soft)] normal-case">
          {entry.author}
        </span>
        <span
          className={cn(
            'rounded-[3px] px-[7px] py-[2px] font-mono text-[9px] font-semibold tracking-[0.12em]',
            isAdminOnly
              ? 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]'
              : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
          )}
        >
          {entry.visibility}
        </span>
      </div>
      {/* admin.html line 7755: sp-notes-body — px:18 py:14, 13px / 1.55, ink */}
      <div className="px-[18px] py-[14px] text-[13px] leading-[1.55] text-[var(--ink)]">
        {entry.body.map((block, idx) => (
          <Fragment key={idx}>
            <NoteBlockView block={block} />
          </Fragment>
        ))}
      </div>
      {/* admin.html line 7769: sp-notes-foot — top-dashed, 10.5px mono mute */}
      <div className="flex flex-wrap items-center justify-between gap-[6px] border-t border-dashed border-[var(--line-soft)] px-[16px] py-[10px] font-mono text-[10.5px] tracking-[0.02em] text-[var(--ink-mute)]">
        <span>{entry.footLabel}</span>
        {entry.editAction ? (
          // admin.html line 7045: cd-doc-action button (admin block only)
          <button
            type="button"
            data-mgr-action={entry.editAction}
            onClick={() => {
              if (typeof window !== 'undefined') {
                // eslint-disable-next-line no-console
                console.log(`[manager-notes] ${entry.editAction} clicked`);
              }
            }}
            className="font-body bg-transparent border-0 py-[4px] px-[8px] rounded-full cursor-pointer transition-colors duration-[150ms] ease text-[11px] whitespace-nowrap text-[var(--ink-mute)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
          >
            Edit →
          </button>
        ) : entry.readOnlyLabel ? (
          // admin.html line 20171: inline-styled read-only label (self-eval block)
          <span className="text-[var(--ink-mute)]">{entry.readOnlyLabel}</span>
        ) : null}
      </div>
    </div>
  );
}

export function ManagerSectionNotes({ profile }: ManagerSectionNotesProps) {
  const notesData = profile.notes;
  if (!notesData) {
    return null;
  }

  const { sectionStatus, notes } = notesData;

  return (
    // admin.html line 20126: <section id="mgr-section-notes">
    <section
      id="mgr-section-notes"
      className="scroll-mt-[80px] border-t border-[var(--line)] py-[36px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 20127-20133 */}
      <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-[16px]">
        <div className="flex min-w-0 items-baseline gap-[14px]">
          <span className="font-mono text-[10.5px] font-medium tracking-[0.14em] text-[var(--ink-mute)]">
            05 · 08
          </span>
          <h2 className="font-display text-[24px] leading-[1.1] font-medium tracking-[-0.02em] [font-variation-settings:'opsz'_96]">
            Notes
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] rounded-full pt-[3px] pr-[9px] pb-[3px] pl-[8px] font-mono text-[10px] font-semibold tracking-[0.14em] uppercase before:h-[5px] before:w-[5px] before:rounded-full before:bg-[currentColor] before:content-['']",
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {/* 2 notes blocks: admin + self-eval */}
      {notes.map((entry, idx) => (
        <NotesBlockCard key={idx} entry={entry} />
      ))}
    </section>
  );
}
