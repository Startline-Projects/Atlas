/* admin.html lines 61104, 61186: .cs-skill-flag status badge (merge amber / archive cream) */

import type { CsSkillFlagVariant } from '@/lib/mock-data/admin/categories-skills-data';

interface CsSkillFlagProps {
  variant: CsSkillFlagVariant;
  label: string;
  style?: { background: string; color: string } | undefined;
}

export function CsSkillFlag({ variant, label, style }: CsSkillFlagProps) {
  const defaultClasses =
    variant === 'archive'
      ? 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'
      : 'bg-[var(--amber-bg)] text-[var(--amber)]';

  return (
    <span
      className={`inline-flex items-center gap-[4px] py-[3px] px-[8px] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase rounded-[4px] ${defaultClasses}`}
      style={style}
    >
      <span className="w-[6px] h-[6px] rounded-full bg-current" />
      {label}
    </span>
  );
}
