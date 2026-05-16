interface AudSeverityDotProps {
  variant: 'info' | 'success' | 'warn' | 'critical' | 'failure';
}

export function AudSeverityDot({ variant }: AudSeverityDotProps) {
  const bgVariant = {
    info: 'bg-[var(--info)]',
    success: 'bg-[var(--success)]',
    warn: 'bg-[var(--amber)]',
    critical: 'bg-[var(--danger)]',
    failure: 'bg-[var(--danger)] animate-[pulse-fr]',
  }[variant];

  return <span className={`inline-flex w-[8px] h-[8px] rounded-full flex-shrink-0 ${bgVariant}`} />;
}
