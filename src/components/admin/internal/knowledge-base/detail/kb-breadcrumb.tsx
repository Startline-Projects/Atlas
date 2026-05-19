/* admin.html lines 66717-66724: fr-breadcrumb pattern (3 segments) */

import Link from 'next/link';
import type { KbBreadcrumbItem } from '@/lib/mock-data/admin/knowledge-base-data';

interface KbBreadcrumbProps {
  items: KbBreadcrumbItem[];
}

export function KbBreadcrumb({ items }: KbBreadcrumbProps) {
  return (
    <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)] mb-[12px] flex items-center gap-[6px] flex-wrap">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const node = item.isCurrent ? (
          <span className="text-[var(--ink)] font-bold">{item.label}</span>
        ) : item.href ? (
          <Link
            href={item.href}
            className="text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer transition-colors"
          >
            {item.label}
          </Link>
        ) : (
          <span className="text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer transition-colors">
            {item.label}
          </span>
        );
        return (
          <span key={idx} className="inline-flex items-center gap-[6px]">
            {node}
            {!isLast && <span className="text-[var(--ink-mute)]">›</span>}
          </span>
        );
      })}
    </div>
  );
}
