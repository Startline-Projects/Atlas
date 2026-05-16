type Variant = 'verified' | 'pending' | 'failed';

interface DsrIdPillProps {
  variant: Variant;
  label: string;
}

const variantClass: Record<Variant, string> = {
  verified: 'text-[var(--success)] bg-[var(--success-bg)]',
  pending: 'text-[var(--amber)] bg-[var(--amber-bg)]',
  failed: 'text-[var(--danger)] bg-[var(--danger-bg)]',
};

export function DsrIdPill({ variant, label }: DsrIdPillProps) {
  return (
    <>
      {variant === 'failed' && (
        <style>{`@keyframes dsr-pulse-fr { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      )}
      <span
        className={`inline-flex items-center gap-[4px] py-[2px] px-[7px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[3px] ${variantClass[variant]}`}
      >
        <span
          className="w-[6px] h-[6px] rounded-full bg-current inline-block"
          style={variant === 'failed' ? { animation: 'dsr-pulse-fr 1.4s ease-in-out infinite' } : undefined}
        />
        {label}
      </span>
    </>
  );
}
