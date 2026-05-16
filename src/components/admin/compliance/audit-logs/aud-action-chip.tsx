interface AudActionChipProps {
  variant: 'auth' | 'admin' | 'access' | 'modify' | 'system' | 'financial' | 'compliance';
  label: string;
}

export function AudActionChip({ variant, label }: AudActionChipProps) {
  const variants = {
    auth: 'bg-[rgba(100,150,210,0.1)] text-[#4A7BA7] border-[#5A8BB7]',
    admin: 'bg-[rgba(210,100,100,0.1)] text-[#A74A4A] border-[#B75A5A]',
    access: 'bg-[rgba(100,150,210,0.1)] text-[#4A7BA7] border-[#5A8BB7]',
    modify: 'bg-[rgba(210,150,100,0.1)] text-[#A77A4A] border-[#B78A5A]',
    system: 'bg-[rgba(150,150,150,0.1)] text-[#7A7A7A] border-[#8A8A8A]',
    financial: 'bg-[rgba(100,210,100,0.1)] text-[#4AA74A] border-[#5AB75A]',
    compliance: 'bg-[rgba(150,100,210,0.1)] text-[#7A4AA7] border-[#8A5AB7]',
  }[variant];

  return (
    <span className={`inline-flex items-center font-mono text-[10px] font-bold tracking-[0.04em] uppercase px-[8px] py-[3px] rounded-[3px] border border-current ${variants}`}>
      {label}
    </span>
  );
}
