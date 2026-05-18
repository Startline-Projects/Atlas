/* admin.html lines 61957-61963: breadcrumb — Integrations › Payments › Stripe · production */

import Link from 'next/link';
import type { IntBreadcrumbItem } from '@/lib/mock-data/admin/integrations-data';

interface IntBreadcrumbProps {
  items: IntBreadcrumbItem[];
}

export function IntBreadcrumb({ items }: IntBreadcrumbProps) {
  return (
    <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] mb-[12px] flex items-center gap-[6px] flex-wrap">
      {items.map((item, idx) => (
        <span key={idx} className="inline-flex items-center gap-[6px]">
          {idx > 0 && <span className="text-[var(--ink-mute)]">›</span>}
          {item.isCurrent ? (
            <span className="text-[var(--ink)] font-bold">{item.label}</span>
          ) : item.href ? (
            <Link href={item.href} className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer transition-colors">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
