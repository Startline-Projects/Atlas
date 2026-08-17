/**
 * Phase 15b — Network graph (NEW PRIMITIVE).
 *
 * admin.html CSS: .fr-network + .net-* (L16106-16204)
 * admin.html markup: L39788-39847
 *
 * SVG viewBox 700×300. 5 nodes (1 center + 4 flagged satellites) + 8 edges
 * (4 shared red + 4 weak gray dashed) + 4 edge labels.
 * Uses inline style for SVG paint props (fill/stroke/strokeWidth/strokeDasharray)
 * because Tailwind arbitrary values for SVG attributes are not reliable.
 */
import type { FraudNetworkGraph } from '@/lib/mock-data/admin/fraud-alerts-data';

interface FraudNetworkGraphProps {
  graph: FraudNetworkGraph;
}

export function FraudNetworkGraphEl({ graph }: FraudNetworkGraphProps) {
  return (
    <div className="relative w-full h-[300px] bg-[var(--paper-deep)] border border-[var(--line-soft)] rounded-[var(--r-sm)] overflow-hidden">
      <svg
        viewBox={graph.viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full block"
        aria-label="Related-accounts network graph"
      >
        {/* Edges — rendered first so nodes layer above */}
        {graph.edges.map((edge, i) => (
          <line
            key={`edge-${i}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            style={
              edge.strength === 'shared'
                ? { stroke: 'var(--danger)', strokeWidth: 2 }
                : { stroke: 'var(--ink-mute)', strokeWidth: 1.5, strokeDasharray: '3 3' }
            }
          />
        ))}

        {/* Edge labels */}
        {graph.edgeLabels.map((label, i) => (
          <text
            key={`elabel-${i}`}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fill: 'var(--ink-mute)',
              letterSpacing: '0.04em',
              fontWeight: 600,
            }}
          >
            {label.text}
          </text>
        ))}

        {/* Nodes */}
        {graph.nodes.map((node) => {
          const isCenter = node.variant === 'center';
          const circleStyle = isCenter
            ? { fill: 'var(--ink)', stroke: 'var(--ink)', strokeWidth: 2 }
            : { fill: 'var(--danger-bg)', stroke: 'var(--danger)', strokeWidth: 2 };
          const iconFill = isCenter ? 'var(--paper)' : 'var(--danger)';
          const label1Fill = isCenter ? 'var(--ink)' : 'var(--ink-soft)';
          return (
            <g key={node.id}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                style={{ ...circleStyle, cursor: 'pointer' }}
              />
              <text
                x={node.cx}
                y={node.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fill: iconFill,
                  fontWeight: 700,
                  pointerEvents: 'none',
                }}
              >
                {node.initials}
              </text>
              <text
                x={node.cx}
                y={node.labelLine1Y}
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9.5px',
                  fill: label1Fill,
                  letterSpacing: '0.02em',
                  fontWeight: 600,
                  pointerEvents: 'none',
                }}
              >
                {node.labelLine1}
              </text>
              <text
                x={node.cx}
                y={node.labelLine2Y}
                textAnchor="middle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9.5px',
                  fill: 'var(--ink-soft)',
                  letterSpacing: '0.02em',
                  fontWeight: 600,
                  pointerEvents: 'none',
                }}
              >
                {node.labelLine2}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
