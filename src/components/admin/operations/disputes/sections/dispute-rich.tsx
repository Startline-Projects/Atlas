import { Fragment } from 'react';
import type { RichParagraph } from '@/lib/mock-data/admin/dispute-profiles-data';

/** Render a RichParagraph (text + strong + em segments) inline */
export function RichInline({ paragraph }: { paragraph: RichParagraph }) {
  return (
    <>
      {paragraph.map((seg, i) => {
        if (seg.kind === 'strong') return <strong key={i} className="font-semibold text-[var(--ink)]">{seg.text}</strong>;
        if (seg.kind === 'em') return <em key={i} className="italic">{seg.text}</em>;
        return <Fragment key={i}>{seg.text}</Fragment>;
      })}
    </>
  );
}

/** Render preserve-whitespace text with simple markdown-like **strong** and *em* parsing */
export function RichBlock({ text }: { text: string }) {
  // Split by ** (strong) and * (em) tokens
  const out: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const strongMatch = remaining.match(/\*\*(.+?)\*\*/);
    const emMatch = remaining.match(/(?<!\*)\*([^*]+?)\*(?!\*)/);
    const nextStrong = strongMatch?.index ?? Infinity;
    const nextEm = emMatch?.index ?? Infinity;
    if (nextStrong === Infinity && nextEm === Infinity) {
      out.push(<Fragment key={key++}>{remaining}</Fragment>);
      break;
    }
    if (nextStrong <= nextEm) {
      const m = strongMatch!;
      if (m.index! > 0) out.push(<Fragment key={key++}>{remaining.slice(0, m.index!)}</Fragment>);
      out.push(<strong key={key++} className="font-semibold text-[var(--ink)]">{m[1]}</strong>);
      remaining = remaining.slice(m.index! + m[0].length);
    } else {
      const m = emMatch!;
      if (m.index! > 0) out.push(<Fragment key={key++}>{remaining.slice(0, m.index!)}</Fragment>);
      out.push(<em key={key++} className="italic">{m[1]}</em>);
      remaining = remaining.slice(m.index! + m[0].length);
    }
  }
  return <>{out}</>;
}
