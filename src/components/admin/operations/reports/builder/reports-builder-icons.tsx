/**
 * Phase 14d — Inline SVG icon dictionary for the Custom Report Builder.
 * Centralized to avoid duplicating ~20 SVG paths across sub-components.
 *
 * All icons stroke=currentColor / fill=none / linecap+linejoin round / strokeWidth 2.
 */
import type {
  BuilderTemplateIconKey,
  BuilderSourceIconKey,
  ConfigBlockIconKey,
} from '@/lib/mock-data/admin/reports-analytics-data';

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

const COMMON = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

// — Template strip icons —
export function TemplateIcon({ icon, width = 12, height = 12, className }: IconProps & { icon: BuilderTemplateIconKey }) {
  const props = { ...COMMON, width, height, className };
  switch (icon) {
    case 'activity':
      return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
    case 'info-circle':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    case 'grid':
      return <svg {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
    case 'file-text':
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  }
}

// — Source chip icons —
export function SourceIcon({ icon, width = 14, height = 14, className }: IconProps & { icon: BuilderSourceIconKey }) {
  const props = { ...COMMON, width, height, className };
  switch (icon) {
    case 'signups':
      return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>;
    case 'approvals':
      return <svg {...props}><polyline points="20 6 9 17 4 12" /></svg>;
    case 'hires':
      return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case 'engagements':
      return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case 'disputes':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    case 'reviews':
      return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case 'gmv':
      return <svg {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    case 'revenue':
      return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
    case 'refunds':
      return <svg {...props}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>;
    case 'dsr':
      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
    case 'legal':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
  }
}

// — Canvas config-block icons —
export function ConfigBlockIcon({ icon, width = 14, height = 14, className }: IconProps & { icon: ConfigBlockIconKey }) {
  const props = { ...COMMON, width, height, className };
  switch (icon) {
    case 'activity':
      return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
    case 'filter':
      return <svg {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
    case 'rows':
      return <svg {...props}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
    case 'calendar':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
  }
}

// — Viz picker option icons —
export function VizIcon({ icon, width = 12, height = 12 }: { icon: 'line' | 'bar' | 'table' | 'map' | 'kpi'; width?: number; height?: number }) {
  const props = { ...COMMON, width, height };
  switch (icon) {
    case 'line':
      return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
    case 'bar':
      return <svg {...props}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>;
    case 'table':
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>;
    case 'map':
      return <svg {...props}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>;
    case 'kpi':
      return <svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
  }
}

// — Toolbar action icons —
export function ToolbarIcon({ icon, width = 13, height = 13 }: { icon: 'save' | 'play'; width?: number; height?: number }) {
  const props = { ...COMMON, width, height };
  switch (icon) {
    case 'save':
      return <svg {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>;
    case 'play':
      return <svg {...props}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
  }
}
