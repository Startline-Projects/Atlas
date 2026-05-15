"use client";

import { Fragment } from "react";
import type { SpecialistProfile } from "@/lib/mock-data/admin/specialist-profiles-data";
import { cn } from "@/lib/utils/cn";

interface SpecialistSectionNotesProps {
  profile: SpecialistProfile;
}

type Notes = NonNullable<SpecialistProfile["notes"]>;
type NotesEntry = Notes["notes"][number];
type NoteBlock = NotesEntry["body"][number];

// admin.html lines 7755-7768: notes body — 13px, line-height 1.55, ink color, em uses display font
function NoteBlockView({ block }: { block: NoteBlock }) {
  if (block.type === "list") {
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
  // paragraph
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

// admin.html lines 18903-18923 — single notes block (head + body + foot)
function NotesBlockCard({ entry }: { entry: NotesEntry }) {
  const isAdminOnly = entry.visibilityVariant === "admin-only";
  return (
    // admin.html line 18903: sp-notes-block (paper bg, line border, r-md, mb-14)
    <div className="mb-[14px] overflow-hidden rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--paper)] last:mb-0">
      {/* admin.html line 18904: sp-notes-head — flex with title, author, visibility */}
      <div className="flex flex-wrap items-center justify-between gap-[12px] border-b border-[var(--line-soft)] bg-[var(--paper-deep)] px-[16px] py-[11px] font-mono text-[10.5px] font-semibold tracking-[0.14em] text-[var(--ink-mute)] uppercase">
        <span>{entry.headTitle}</span>
        {/* admin.html line 18906: .author — body font, no uppercase. Direct sibling so justify-between distributes title|author|visibility evenly. */}
        <span className="font-body text-center text-[11px] font-medium tracking-[0.02em] text-[var(--ink-soft)] normal-case">
          {entry.author}
        </span>
        {/* admin.html lines 18907 / 18930: .visibility (default cream / admin-only super) */}
        <span
          className={cn(
            "rounded-[3px] px-[7px] py-[2px] font-mono text-[9px] font-semibold tracking-[0.12em]",
            isAdminOnly
              ? "bg-[rgba(110,63,224,0.12)] text-[var(--super)]"
              : "bg-[var(--cream-deep)] text-[var(--ink-mute)]",
          )}
        >
          {entry.visibility}
        </span>
      </div>
      {/* admin.html line 18909: sp-notes-body — px:18 py:14, 13px / 1.55, ink */}
      <div className="px-[18px] py-[14px] text-[13px] leading-[1.55] text-[var(--ink)]">
        {entry.body.map((block, idx) => (
          <Fragment key={idx}>
            <NoteBlockView block={block} />
          </Fragment>
        ))}
      </div>
      {/* admin.html line 18919: sp-notes-foot — top-dashed, 10.5px mono mute */}
      <div className="flex flex-wrap items-center justify-between gap-[6px] border-t border-dashed border-[var(--line-soft)] px-[16px] py-[10px] font-mono text-[10.5px] tracking-[0.02em] text-[var(--ink-mute)]">
        <span>{entry.lastEdited}</span>
        {/* admin.html line 18921: cd-doc-action button */}
        <button
          type="button"
          data-sp-action={entry.editAction}
          onClick={() => {
            if (typeof window !== "undefined") {
              // eslint-disable-next-line no-console
              console.log(
                `[specialist-notes] edit clicked: ${entry.editAction}`,
              );
            }
          }}
          className="font-body ease cursor-pointer rounded-full border-0 bg-transparent px-[8px] py-[4px] text-[11px] whitespace-nowrap text-[var(--ink-mute)] transition-colors duration-[150ms] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
        >
          Edit →
        </button>
      </div>
    </div>
  );
}

export function SpecialistSectionNotes({
  profile,
}: SpecialistSectionNotesProps) {
  const notesData = profile.notes;
  if (!notesData) {
    return null;
  }

  const { sectionStatus, notes } = notesData;

  return (
    // admin.html line 18893: <section id="sp-section-notes">
    <section
      id="sp-section-notes"
      className="scroll-mt-[80px] border-t border-[var(--line)] py-[36px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 18894-18900 */}
      <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-[16px]">
        <div className="flex min-w-0 items-baseline gap-[14px]">
          <span className="font-mono text-[10.5px] font-medium tracking-[0.14em] text-[var(--ink-mute)]">
            05 · 08
          </span>
          <h2 className="font-display text-[24px] leading-[1.1] font-medium tracking-[-0.02em] [font-variation-settings:'opsz'_96]">
            Notes
          </h2>
        </div>
        {/* admin.html line 18899: status pill (neutral default for notes) */}
        <span
          className={cn(
            "inline-flex items-center gap-[6px] rounded-full pt-[3px] pr-[9px] pb-[3px] pl-[8px] font-mono text-[10px] font-semibold tracking-[0.14em] uppercase before:h-[5px] before:w-[5px] before:rounded-full before:bg-[currentColor] before:content-['']",
            sectionStatus.variant === "warn"
              ? "bg-[var(--amber-bg)] text-[var(--amber)]"
              : sectionStatus.variant === "danger"
                ? "bg-[var(--danger-bg)] text-[var(--danger)]"
                : sectionStatus.variant === "neutral"
                  ? "bg-[var(--cream-deep)] text-[var(--ink-soft)]"
                  : "bg-[var(--success-bg)] text-[var(--success)]",
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {/* Notes blocks (manager + admin) */}
      {notes.map((entry, idx) => (
        <NotesBlockCard key={idx} entry={entry} />
      ))}
    </section>
  );
}
