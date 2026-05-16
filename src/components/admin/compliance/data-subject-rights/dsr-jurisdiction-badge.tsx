import type { CSSProperties } from 'react';

type Variant = 'gdpr' | 'uk-gdpr' | 'ccpa' | 'pipeda' | 'voluntary';

interface DsrJurisdictionBadgeProps {
  variant: Variant;
  label: string;
  flagStyle?: CSSProperties;
}

const variantClass: Record<Variant, string> = {
  gdpr: 'text-[#003399] border-[rgba(0,51,153,0.3)] bg-[var(--paper-deep)]',
  'uk-gdpr': 'text-[#012169] border-[rgba(1,33,105,0.3)] bg-[var(--paper-deep)]',
  ccpa: 'text-[#b22234] border-[rgba(178,34,52,0.3)] bg-[var(--paper-deep)]',
  pipeda: 'text-[#d52b1e] border-[rgba(213,43,30,0.3)] bg-[var(--paper-deep)]',
  voluntary: 'text-[var(--ink-mute)] border-[var(--line-soft)] bg-[var(--paper-deep)]',
};

const defaultFlagStyle: Record<Variant, CSSProperties> = {
  gdpr: { background: 'linear-gradient(to bottom, #003399 50%, #FFCC00 50%)' },
  'uk-gdpr': { background: '#012169' },
  ccpa: { background: 'linear-gradient(to bottom, #b22234, #ffffff 60%, #b22234)', border: '1px solid var(--ink)' },
  pipeda: { background: '#d52b1e' },
  voluntary: { background: 'var(--ink)' },
};

export function DsrJurisdictionBadge({ variant, label, flagStyle }: DsrJurisdictionBadgeProps) {
  const finalFlagStyle = flagStyle ?? defaultFlagStyle[variant];
  return (
    <span
      className={`inline-flex items-center gap-[5px] py-[3px] px-[7px] font-mono text-[9.5px] font-bold tracking-[0.06em] rounded-[3px] border whitespace-nowrap ${variantClass[variant]}`}
    >
      <span className="w-[14px] h-[10px] rounded-[1px] flex-shrink-0 inline-block" style={finalFlagStyle} />
      {label}
    </span>
  );
}
