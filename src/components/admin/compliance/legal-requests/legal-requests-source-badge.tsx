interface LrSourceBadgeProps {
  variant: 'court' | 'regulator' | 'agency';
  label: string;
  svgPath: string;
}

export function LrSourceBadge({ variant, label, svgPath }: LrSourceBadgeProps) {
  const variantStyles = {
    court: 'text-[var(--danger)] border-[rgba(194,65,43,0.3)]',
    regulator: 'text-[var(--amber)] border-[rgba(232,118,58,0.3)]',
    agency: 'text-[var(--super)] border-[rgba(110,63,224,0.25)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-[6px] py-[4px] px-[8px] border-[1px] rounded-[4px] font-body text-[11px] tracking-[-0.005em] ${variantStyles[variant]}`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: svgPath.replace('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">', '').replace('</svg>', '') }}
      />
      {label}
    </span>
  );
}
