/* admin.html lines 63667-63673: breadcrumb — Help Center › For candidates › How to schedule your vetting call · v4 */

import Link from 'next/link';
import type { HcBreadcrumbItem } from '@/lib/mock-data/admin/help-content-data';

interface HcBreadcrumbProps {
  items: HcBreadcrumbItem[];
}

export function HcBreadcrumb({ items }: HcBreadcrumbProps) {
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
