import type { SuspiciousSignalStrength } from '@/lib/mock-data/admin/suspicious-activity-data';

interface SuspiciousSignalMeterProps {
  strength: SuspiciousSignalStrength;
  label: string;
}

const BAR_HEIGHTS = ['h-[30%]', 'h-[50%]', 'h-[70%]', 'h-[85%]', 'h-[100%]'];

function getFilledColor(strength: SuspiciousSignalStrength): string {
  if (strength <= 2) return 'bg-[var(--ink-mute)]';
  if (strength === 3) return 'bg-[var(--lime-deep)]';
  if (strength === 4) return 'bg-[var(--amber)]';
  return 'bg-[var(--danger)]';
}

function getValueColor(strength: SuspiciousSignalStrength): string {
  if (strength === 4) return 'text-[var(--amber)]';
  if (strength === 5) return 'text-[var(--danger)]';
  return 'text-[var(--ink-soft)]';
}

export function SuspiciousSignalMeter({ strength, label }: SuspiciousSignalMeterProps) {
  const filledColor = getFilledColor(strength);
  return (
    <div className="flex items-center gap-[8px]">
      <div className="inline-flex gap-[2px] items-end h-[14px]">
        {BAR_HEIGHTS.map((heightClass, i) => (
          <span
            key={i}
            className={`w-[4px] rounded-[1px] transition-colors ${heightClass} ${i < strength ? filledColor : 'bg-[var(--cream-deep)]'}`}
          />
        ))}
      </div>
      <span
        className={`font-mono text-[11.5px] font-bold tracking-[0.02em] tabular-nums ${getValueColor(strength)}`}
      >
        {label}
      </span>
    </div>
  );
}
