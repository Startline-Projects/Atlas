interface RsSeverityDotProps {
  variant?: 'urgent' | 'warn' | 'upcoming' | 'done' | undefined;
}

export function RsSeverityDot({ variant }: RsSeverityDotProps) {
  const variantClasses = {
    'urgent':
      'bg-[var(--danger)] animate-[pulse-fr_1.4s_ease-in-out_infinite]',
    'warn': 'bg-[var(--amber)]',
    'upcoming': 'bg-[var(--super)]',
    'done': 'bg-[var(--success)]',
  };

  return (
    <span
      className={`w-[8px] h-[8px] rounded-full bg-[var(--ink-mute)] ${
        variant && variantClasses[variant]
          ? variantClasses[variant]
          : ''
      }`}
    />
  );
}
