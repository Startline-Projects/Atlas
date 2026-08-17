import Link from 'next/link';

interface SuspensionReasonChipProps {
  label: string;
  link?: { label: string; href: string } | undefined;
}

export function SuspensionReasonChip({ label, link }: SuspensionReasonChipProps) {
  return (
    <span className="inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[10px] font-semibold tracking-[0.04em] rounded-[4px] bg-[var(--paper-deep)] border border-[var(--line-soft)] text-[var(--ink-soft)] w-fit max-w-full">
      <span className="truncate">
        {label}
        {link && (
          <>
            {' · '}
            <Link
              href={link.href}
              className="underline hover:text-[var(--ink)] transition-colors"
            >
              {link.label}
            </Link>
          </>
        )}
      </span>
    </span>
  );
}
