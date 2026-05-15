interface RefundSlaPipProps {
  variant: 'ok' | 'warn' | 'urgent';
  text: string;
}

export function RefundSlaPip({ variant, text }: RefundSlaPipProps) {
  const variantStyles = {
    ok: 'bg-[var(--success-bg)] text-[var(--success)]',
    warn: 'bg-[var(--amber-bg)] text-[var(--amber)]',
    urgent: 'bg-[var(--danger-bg)] text-[var(--danger)]',
  };

  const shouldPulse = variant === 'urgent';

  return (
    <>
      <span
        className={`inline-flex items-center gap-[5px] py-[3px] px-[9px] font-mono text-[10px] tracking-[0.08em] uppercase font-bold rounded-full ${variantStyles[variant]}`}
      >
        <span
          className={`w-[6px] h-[6px] rounded-full ${shouldPulse ? 'animate-pulse-fr' : ''}`}
          style={{ backgroundColor: 'currentColor' }}
        />
        {text}
      </span>

      {/* Scoped keyframe for pulse-fr animation */}
      <style>{`
        @keyframes pulse-fr {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-fr {
          animation: pulse-fr 1.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
