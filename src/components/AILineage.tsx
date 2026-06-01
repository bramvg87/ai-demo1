import { useState, useMemo } from 'react';
import {
  NODES, EDGES, MILESTONES,
  FAMILY_COLOR, MILESTONE_COLOR,
  type NodeDef, type MilestoneDef,
} from '../data/lineage';

// ── Utilities ─────────────────────────────────────────────────
function wrapText(text: string, maxChars = 32): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if (cur.length + w.length + (cur ? 1 : 0) <= maxChars) {
      cur = cur ? `${cur} ${w}` : w;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── Layout constants ───────────────────────────────────────────
const START_YEAR  = 1983;
const END_YEAR    = 2025.5;
const PX_PER_YEAR = 24;
const ML          = 80;   // margin left
const MR          = 60;   // margin right
const INNER_W     = (END_YEAR - START_YEAR) * PX_PER_YEAR;
const SVG_W       = ML + INNER_W + MR;

// Y tracks
const TRACK_Y: Record<0|1|2|3, number> = { 0: 88, 1: 188, 2: 278, 3: 358 };
const AXIS_Y  = 430;   // main time axis
const MS_Y    = 440;   // milestone marker strip (below axis)
const SVG_H   = 540;   // total height

const NODE_R  = 36;    // node circle radius

// ── Coordinate helpers ────────────────────────────────────────
function xOf(year: number)        { return ML + (year - START_YEAR) * PX_PER_YEAR; }
function yOf(track: 0|1|2|3)      { return TRACK_Y[track]; }
function nodeX(n: NodeDef)        { return xOf(n.year); }
function nodeY(n: NodeDef)        { return yOf(n.track as 0|1|2|3); }

// ── Lineage computation ───────────────────────────────────────
function buildLineage(nodeId: string) {
  const allNodes  = new Set<string>([nodeId]);
  const allEdgeIds = new Set<string>();

  // ancestors (walk backwards)
  const q1 = [nodeId];
  while (q1.length) {
    const curr = q1.shift()!;
    for (const e of EDGES) {
      if (e.to === curr && !allNodes.has(e.from)) {
        allNodes.add(e.from);
        q1.push(e.from);
      }
    }
  }
  // descendants (walk forwards)
  const q2 = [nodeId];
  while (q2.length) {
    const curr = q2.shift()!;
    for (const e of EDGES) {
      if (e.from === curr && !allNodes.has(e.to)) {
        allNodes.add(e.to);
        q2.push(e.to);
      }
    }
  }
  // collect edge ids that connect active nodes
  for (const e of EDGES) {
    if (allNodes.has(e.from) && allNodes.has(e.to)) {
      allEdgeIds.add(`${e.from}->${e.to}`);
    }
  }
  return { nodes: allNodes, edges: allEdgeIds };
}

// ── Edge SVG path ─────────────────────────────────────────────
// Cubic bezier: horizontal departure from source, horizontal arrival at target
function edgePath(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.abs(x2 - x1);
  const cp = dx * 0.55;
  return `M ${x1} ${y1} C ${x1 + cp} ${y1}, ${x2 - cp} ${y2}, ${x2} ${y2}`;
}

// For short near-vertical drops (same x, different y: DL -> CV, DL -> Gen)
// we offset the control point slightly right so the curve is visible
function shortEdgePath(x1: number, y1: number, x2: number, y2: number) {
  const dy = Math.abs(y2 - y1);
  const offX = Math.max(40, dy * 0.4);
  return `M ${x1} ${y1} C ${x1 + offX} ${y1}, ${x2 + offX} ${y2}, ${x2} ${y2}`;
}

function getPath(src: NodeDef, tgt: NodeDef) {
  const x1 = nodeX(src) + NODE_R, y1 = nodeY(src);
  const x2 = nodeX(tgt) - NODE_R, y2 = nodeY(tgt);
  // nodes at very close x: use offset curve to the right
  return Math.abs(x2 - x1) < 50
    ? shortEdgePath(x1, y1, x2, y2)
    : edgePath(x1, y1, x2, y2);
}

// ── Video modal ───────────────────────────────────────────────
function VideoModal({ m, onClose }: { m: MilestoneDef; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gb-navy/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-label={m.label}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-gb-surface rounded-card shadow-card-hover w-full max-w-2xl overflow-hidden">
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${m.youtubeId}?autoplay=1&rel=0`}
            title={m.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-display font-semibold text-gb-navy text-sm">{m.label}</p>
          <button
            onClick={onClose}
            className="text-gb-muted hover:text-gb-navy transition-colors text-sm font-mono"
            aria-label="Close"
          >
            ✕ close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Node component ────────────────────────────────────────────
interface NodeCircleProps {
  node: NodeDef;
  dimmed: boolean;
  highlighted: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
}

function NodeCircle({ node, dimmed, highlighted, hovered, onHover }: NodeCircleProps) {
  const cx = nodeX(node), cy = nodeY(node);
  const color = FAMILY_COLOR[node.family];
  const opacity = dimmed ? 0.12 : 1;

  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={`${node.label}: ${node.desc}`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      style={{ opacity, cursor: 'pointer' }}
    >
      {/* Outer glow ring when highlighted */}
      {(highlighted || hovered) && (
        <circle cx={cx} cy={cy} r={NODE_R + 6} fill={color} opacity={0.15} />
      )}

      {/* Main circle */}
      <circle
        cx={cx} cy={cy} r={NODE_R}
        fill={hovered ? color : `${color}1A`}
        stroke={color}
        strokeWidth={hovered ? 2.5 : 1.5}
      />

      {/* Short label inside */}
      <text
        x={cx} y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={hovered ? 'white' : color}
        fontSize="9.5"
        fontFamily="Hanken Grotesk, sans-serif"
        fontWeight="600"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.shortLabel.split(' ').map((word, i, arr) => (
          <tspan key={i} x={cx} dy={i === 0 ? (arr.length > 1 ? '-0.5em' : '0') : '1.1em'}>
            {word}
          </tspan>
        ))}
      </text>

      {/* Label below node */}
      <text
        x={cx} y={cy + NODE_R + 13}
        textAnchor="middle"
        fill="#0A2540"
        fontSize="9"
        fontFamily="Hanken Grotesk, sans-serif"
        fontWeight="500"
        opacity={dimmed ? 0.15 : 0.85}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.label.split(' ').map((word, i, arr) => (
          <tspan key={i} x={cx} dy={i === 0 ? 0 : '1.15em'}>
            {word}{i < arr.length - 1 ? ' ' : ''}
          </tspan>
        ))}
      </text>

      {/* Year label above node (first occurrence only) */}
      <text
        x={cx} y={cy - NODE_R - 6}
        textAnchor="middle"
        fill={color}
        fontSize="8.5"
        fontFamily="JetBrains Mono, monospace"
        opacity={dimmed ? 0.15 : 0.7}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        ~{Math.round(node.year)}
      </text>
    </g>
  );
}

// ── Milestone marker ──────────────────────────────────────────
interface MilestoneMarkerProps {
  m: MilestoneDef;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onClickVideo: (m: MilestoneDef) => void;
}

function MilestoneMarker({ m, hovered, onHover, onClickVideo }: MilestoneMarkerProps) {
  const cx = xOf(m.year);
  const cy = MS_Y;
  const color = MILESTONE_COLOR[m.type];
  const hasVideo = !!m.youtubeId;

  function handleClick() {
    if (hasVideo) onClickVideo(m);
  }

  return (
    <g
      tabIndex={0}
      role="button"
      aria-label={`${m.label}${hasVideo ? ' (click to watch video)' : ''}`}
      onMouseEnter={() => onHover(m.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(m.id)}
      onBlur={() => onHover(null)}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      style={{ cursor: hasVideo ? 'pointer' : 'default' }}
    >
      {/* Tick line from axis down */}
      <line x1={cx} y1={AXIS_Y} x2={cx} y2={cy - 7}
        stroke={color} strokeWidth={hovered ? 1.5 : 0.8} opacity={hovered ? 0.9 : 0.4} />

      {/* Marker shape: diamond=research, circle=cultural */}
      {m.type === 'research' ? (
        <rect
          x={cx - 5} y={cy - 5} width={10} height={10}
          fill={hovered ? color : 'white'}
          stroke={color}
          strokeWidth="1.5"
          transform={`rotate(45 ${cx} ${cy})`}
        />
      ) : (
        <circle cx={cx} cy={cy} r={5.5}
          fill={hovered ? color : 'white'}
          stroke={color}
          strokeWidth="1.5"
        />
      )}

      {/* Video badge */}
      {hasVideo && (
        <text x={cx + 8} y={cy + 2} fill={color} fontSize="8" fontFamily="sans-serif" opacity="0.8">▶</text>
      )}

      {/* Floating tooltip on hover */}
      {hovered && (() => {
        const full = m.desc + (hasVideo ? ' Click to watch.' : '');
        const lines = wrapText(full, 30);
        const tipW = 195, tipH = 18 + lines.length * 12;
        const tipX = cx + tipW + 20 > SVG_W ? cx - tipW - 8 : cx + 8;
        return (
          <g>
            <rect x={tipX} y={cy - tipH - 4} width={tipW} height={tipH} rx="7"
              fill="#0A2540" opacity="0.93" />
            <text x={tipX + 9} y={cy - tipH + 13} fill="white" fontSize="9.5"
              fontFamily="Hanken Grotesk, sans-serif" fontWeight="600">
              {m.label}
            </text>
            <text x={tipX + 9} y={cy - tipH + 24} fill="rgba(230,238,248,0.82)"
              fontSize="8" fontFamily="Hanken Grotesk, sans-serif">
              {lines.map((ln, i) => (
                <tspan key={i} x={tipX + 9} dy={i === 0 ? 0 : '1.35em'}>{ln}</tspan>
              ))}
            </text>
          </g>
        );
      })()}
    </g>
  );
}

// ── Main component ────────────────────────────────────────────
export function AILineage() {
  const [hoveredNode, setHoveredNode]   = useState<string | null>(null);
  const [hoveredMs,   setHoveredMs]     = useState<string | null>(null);
  const [activeVideo, setActiveVideo]   = useState<MilestoneDef | null>(null);

  const lineage = useMemo(
    () => hoveredNode ? buildLineage(hoveredNode) : null,
    [hoveredNode]
  );

  // x-axis tick years
  const xTicks = [1990, 1995, 2000, 2005, 2010, 2015, 2017, 2018, 2019, 2020, 2022, 2023, 2024];

  return (
    <div className="relative">
      {/* Scroll wrapper for mobile */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2" role="region" aria-label="AI evolution timeline">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width={SVG_W}
          style={{ minWidth: SVG_W, display: 'block' }}
          aria-label="Interactive diagram of AI paradigm evolution"
        >
          {/* ── Arrowhead defs ── */}
          <defs>
            {Object.entries(FAMILY_COLOR).map(([fam, col]) => (
              <marker
                key={fam}
                id={`arrow-${fam}`}
                markerWidth="8" markerHeight="8"
                refX="6" refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L8,3 Z" fill={col} opacity="0.7" />
              </marker>
            ))}
          </defs>

          {/* ── Y-track guide lines (very faint) ── */}
          {([0, 1, 2, 3] as const).map(t => (
            <line key={t}
              x1={ML - 10} y1={TRACK_Y[t]} x2={ML + INNER_W + 10} y2={TRACK_Y[t]}
              stroke="#E2E9F2" strokeWidth="1" strokeDasharray="4 6"
            />
          ))}

          {/* ── Edges ── */}
          {EDGES.map(e => {
            const src = NODES.find(n => n.id === e.from)!;
            const tgt = NODES.find(n => n.id === e.to)!;
            if (!src || !tgt) return null;
            const edgeId = `${e.from}->${e.to}`;
            const active  = lineage ? lineage.edges.has(edgeId) : false;
            const dimmed  = lineage ? !active : false;
            const color   = FAMILY_COLOR[src.family];
            return (
              <path
                key={edgeId}
                d={getPath(src, tgt)}
                fill="none"
                stroke={color}
                strokeWidth={active ? 2.2 : 1.2}
                opacity={dimmed ? 0.07 : active ? 0.85 : 0.35}
                markerEnd={`url(#arrow-${src.family})`}
                strokeDasharray={active ? undefined : '5 4'}
              />
            );
          })}

          {/* ── Nodes ── */}
          {NODES.map(node => {
            const dimmed      = lineage ? !lineage.nodes.has(node.id) : false;
            const highlighted = lineage ? lineage.nodes.has(node.id) && node.id !== hoveredNode : false;
            return (
              <NodeCircle
                key={node.id}
                node={node}
                dimmed={dimmed}
                highlighted={highlighted}
                hovered={node.id === hoveredNode}
                onHover={setHoveredNode}
              />
            );
          })}

          {/* ── Hovering node tooltip ── */}
          {hoveredNode && (() => {
            const n = NODES.find(x => x.id === hoveredNode)!;
            if (!n) return null;
            const cx = nodeX(n);
            const lines = wrapText(n.desc, 32);
            const tipW = 215, tipH = 22 + lines.length * 12;
            const tipX = cx + tipW + NODE_R + 4 > SVG_W ? cx - tipW - NODE_R - 4 : cx + NODE_R + 4;
            const tipY = nodeY(n) - tipH / 2;
            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="8"
                  fill="#0A2540" opacity="0.94" />
                <text x={tipX + 10} y={tipY + 15} fill="white" fontSize="10.5"
                  fontFamily="Hanken Grotesk, sans-serif" fontWeight="600">
                  {n.label}
                </text>
                <text x={tipX + 10} y={tipY + 27} fill="rgba(230,238,248,0.85)"
                  fontSize="8.5" fontFamily="Hanken Grotesk, sans-serif">
                  {lines.map((ln, i) => (
                    <tspan key={i} x={tipX + 10} dy={i === 0 ? 0 : '1.4em'}>{ln}</tspan>
                  ))}
                </text>
              </g>
            );
          })()}

          {/* ── Time axis ── */}
          <line x1={ML - 10} y1={AXIS_Y} x2={ML + INNER_W + 20} y2={AXIS_Y}
            stroke="#C8D4E3" strokeWidth="1.5" />
          <polygon
            points={`${ML + INNER_W + 18},${AXIS_Y - 4} ${ML + INNER_W + 18},${AXIS_Y + 4} ${ML + INNER_W + 26},${AXIS_Y}`}
            fill="#C8D4E3"
          />

          {/* Axis ticks + labels */}
          {xTicks.map(yr => {
            const x = xOf(yr);
            return (
              <g key={yr}>
                <line x1={x} y1={AXIS_Y - 3} x2={x} y2={AXIS_Y + 3} stroke="#C8D4E3" strokeWidth="1" />
                <text x={x} y={AXIS_Y + 14} textAnchor="middle" fill="#5A6B7B"
                  fontSize="9" fontFamily="JetBrains Mono, monospace">
                  {yr}
                </text>
              </g>
            );
          })}

          {/* ── Milestone markers ── */}
          {MILESTONES.map(m => (
            <MilestoneMarker
              key={m.id}
              m={m}
              hovered={hoveredMs === m.id}
              onHover={setHoveredMs}
              onClickVideo={setActiveVideo}
            />
          ))}

          {/* Milestone strip label */}
          <text x={ML - 12} y={MS_Y + 4} textAnchor="end"
            fill="#5A6B7B" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            events
          </text>

          {/* ── Legend ── */}
          {[
            { family: 'symbolic',   label: 'Symbolic / rule-based' },
            { family: 'learning',   label: 'Learning (ML + DL)' },
            { family: 'perception', label: 'Perception' },
            { family: 'generative', label: 'Generative' },
            { family: 'language',   label: 'Language models' },
            { family: 'agentic',    label: 'Agentic / RL' },
          ].map(({ family, label }, i) => {
            const col = FAMILY_COLOR[family as keyof typeof FAMILY_COLOR];
            const lx = ML + i * 138;
            const ly = SVG_H - 28;
            return (
              <g key={family}>
                <circle cx={lx + 6} cy={ly + 5} r={5} fill={`${col}33`} stroke={col} strokeWidth="1.5" />
                <text x={lx + 16} y={ly + 9} fill="#5A6B7B" fontSize="9"
                  fontFamily="Hanken Grotesk, sans-serif">
                  {label}
                </text>
              </g>
            );
          })}
          {/* Milestone legend */}
          <g>
            <rect x={ML + 6 * 138 - 4} y={SVG_H - 29} width={9} height={9}
              fill="white" stroke="#17B8C9" strokeWidth="1.5"
              transform={`rotate(45 ${ML + 6 * 138} ${SVG_H - 24})`} />
            <text x={ML + 6 * 138 + 12} y={SVG_H - 19} fill="#5A6B7B" fontSize="9"
              fontFamily="Hanken Grotesk, sans-serif">Research</text>
          </g>
          <g>
            <circle cx={ML + 6 * 138 + 72} cy={SVG_H - 24} r={4.5}
              fill="white" stroke="#FF6B4A" strokeWidth="1.5" />
            <text x={ML + 6 * 138 + 81} y={SVG_H - 20} fill="#5A6B7B" fontSize="9"
              fontFamily="Hanken Grotesk, sans-serif">Cultural moment</text>
          </g>
        </svg>
      </div>

      {/* ── Instruction hint ── */}
      <p className="text-center text-gb-muted/60 text-xs font-mono mt-2">
        Hover a node to highlight its lineage path. Click a milestone to watch the video.
      </p>

      {/* ── Video modal ── */}
      {activeVideo && (
        <VideoModal m={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
