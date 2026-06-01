import { useState } from 'react';
import { useReveal } from '../lib/useReveal';

interface ReactionChainData {
  heading: string;
  caption: string;
  leftPanelTitle: string;
  leftStages: string[];
  leftLatencies: string[];
  leftLatencyMeanings: string[];
  leftEndNote: string;
  rightPanelTitle: string;
  rightNote: string;
  rightHighlight: string;
  enablers: string[];
  credit: string;
}

const W = 380, H = 210;
const ML = 32, MR = 16, MT = 18, MB = 42;
const CW = W - ML - MR;
const CH = H - MT - MB;
const TLY = MT + CH; // timeline y

// Traditional stage x positions (0-1 of CW)
const T_STAGE_PCT = [0, 0.22, 0.42, 0.58, 0.74];
// Connected stage x positions (compressed)
const C_STAGE_PCT = [0, 0.10, 0.18, 0.26, 0.34];

// Value curve y (0=low/bottom, 1=high/top of chart area)
const T_VALUE = [0.88, 0.64, 0.42, 0.28, 0.18];
const C_VALUE = [0.88, 0.78, 0.72, 0.66, 0.76]; // recovers quickly

const LAT_COLORS = ['#EAF2FE', '#D4EFFC', '#FFF4E6', '#FFF0ED'];
const LAT_STROKE = ['#1466E0', '#17B8C9', '#d97706', '#FF6B4A'];

function xOf(pct: number) { return ML + pct * CW; }
function yOf(v: number)   { return TLY - v * CH; }

function curvePath(stages: number[], values: number[]) {
  return stages.map((pct, i) => `${i === 0 ? 'M' : 'L'}${xOf(pct).toFixed(1)},${yOf(values[i]).toFixed(1)}`).join(' ');
}

function recoveryPath(lastX: number, lastY: number, endX: number, topY: number) {
  const cx1 = lastX + (endX - lastX) * 0.4;
  const cy1 = lastY;
  const cx2 = lastX + (endX - lastX) * 0.6;
  const cy2 = topY;
  return `M${lastX.toFixed(1)},${lastY.toFixed(1)} C${cx1.toFixed(1)},${cy1.toFixed(1)} ${cx2.toFixed(1)},${cy2.toFixed(1)} ${endX.toFixed(1)},${topY.toFixed(1)}`;
}

interface PanelProps {
  title: string;
  stagePct: number[];
  values: number[];
  latencies: string[];
  latencyMeanings: string[];
  isConnected?: boolean;
  rightHighlight?: string;
  hoveredLat: number | null;
  onHover: (i: number | null) => void;
}

function Panel({ title, stagePct, values, latencies, latencyMeanings, isConnected, rightHighlight, hoveredLat, onHover }: PanelProps) {
  const lastStage = stagePct[stagePct.length - 1];
  const lastValue = values[values.length - 1];
  const endPct = 0.98;

  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-mono text-gb-muted mb-2 text-center">{title}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={title}>
        {/* Timeline */}
        <line x1={ML} y1={TLY} x2={ML + CW} y2={TLY} stroke="#C8D4E3" strokeWidth="1.5" />
        <polygon points={`${ML + CW - 2},${TLY - 4} ${ML + CW + 6},${TLY} ${ML + CW - 2},${TLY + 4}`} fill="#C8D4E3" />

        {/* Lost value shading (left panel) or saved value shading (right panel) */}
        {!isConnected && (
          <path
            d={`M${xOf(stagePct[0]).toFixed(1)},${yOf(values[0]).toFixed(1)} ${stagePct.slice(1).map((p, i) => `L${xOf(p).toFixed(1)},${yOf(values[i+1]).toFixed(1)}`).join(' ')} L${xOf(lastStage).toFixed(1)},${yOf(values[0]).toFixed(1)} Z`}
            fill="#FF6B4A10"
          />
        )}
        {isConnected && rightHighlight && (
          <rect
            x={xOf(C_STAGE_PCT[4]) + 4}
            y={MT}
            width={xOf(endPct) - xOf(C_STAGE_PCT[4]) - 4}
            height={CH}
            fill="#17B8C920"
            rx="4"
          />
        )}

        {/* Latency segments (hover areas) */}
        {latencies.map((lat, i) => {
          const x1 = xOf(stagePct[i]);
          const x2 = xOf(stagePct[i + 1]);
          const isHovered = hoveredLat === i;
          return (
            <g key={lat}>
              <rect
                x={x1} y={MT} width={x2 - x1} height={CH}
                fill={LAT_COLORS[i]}
                opacity={isHovered ? 0.7 : 0.3}
                rx="2"
                className="cursor-pointer"
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
              />
              {isHovered && (
                <g>
                  <rect
                    x={x1 - 4} y={MT - 34} width={Math.max(x2 - x1 + 8, 120)} height={28}
                    rx="6" fill={LAT_STROKE[i]} opacity="0.93"
                  />
                  <text x={x1} y={MT - 20} fill="white" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    {lat}
                  </text>
                  <text x={x1} y={MT - 10} fill="white" fontSize="7.5" fontFamily="Hanken Grotesk, sans-serif" opacity="0.85">
                    {latencyMeanings[i]}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Value curve */}
        <path
          d={curvePath(stagePct, values)}
          fill="none"
          stroke={isConnected ? '#17B8C9' : '#1466E0'}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Recovery curve */}
        <path
          d={recoveryPath(xOf(lastStage), yOf(lastValue), xOf(endPct), yOf(values[0]))}
          fill="none"
          stroke={isConnected ? '#17B8C9' : '#1466E0'}
          strokeWidth="2"
          strokeDasharray={isConnected ? 'none' : '5 3'}
          opacity="0.6"
        />

        {/* Stage dots */}
        {stagePct.map((pct, i) => (
          <circle
            key={i}
            cx={xOf(pct)} cy={TLY}
            r="4" fill={i === 0 ? '#FF6B4A' : '#ffffff'}
            stroke={i === 0 ? '#FF6B4A' : '#1466E0'}
            strokeWidth="2"
          />
        ))}

        {/* Time saved label */}
        {isConnected && rightHighlight && (
          <>
            <line
              x1={xOf(C_STAGE_PCT[4]) + 4} y1={TLY + 12}
              x2={xOf(endPct) - 2}          y2={TLY + 12}
              stroke="#17B8C9" strokeWidth="1.5"
              markerEnd="url(#arrowR)" markerStart="url(#arrowL)"
            />
            <text x={(xOf(C_STAGE_PCT[4]) + xOf(endPct)) / 2} y={TLY + 24} textAnchor="middle"
              fill="#17B8C9" fontSize="8" fontFamily="JetBrains Mono, monospace">
              {rightHighlight}
            </text>
          </>
        )}

        {/* Event label */}
        <text x={xOf(stagePct[0])} y={TLY + 14} textAnchor="middle" fill="#FF6B4A" fontSize="8" fontFamily="JetBrains Mono, monospace">
          Event
        </text>

        {/* Arrow markers for time-saved annotation */}
        <defs>
          <marker id="arrowR" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#17B8C9" strokeWidth="1.5" />
          </marker>
          <marker id="arrowL" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="#17B8C9" strokeWidth="1.5" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export function ReactionChain({ data }: { data: ReactionChainData }) {
  const [hoveredLat, setHoveredLat] = useState<number | null>(null);
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal my-8">
      <div className="rounded-card bg-gb-surface border border-gb-line p-5 sm:p-7 shadow-card">
        <h3 className="font-display font-bold text-gb-navy text-xl mb-2">{data.heading}</h3>
        <p className="text-gb-muted text-sm leading-relaxed mb-6 max-w-2xl">{data.caption}</p>

        <p className="text-xs font-mono text-gb-muted/60 mb-3">Hover the coloured segments to explore each latency phase</p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Panel
            title={data.leftPanelTitle}
            stagePct={T_STAGE_PCT}
            values={T_VALUE}
            latencies={data.leftLatencies}
            latencyMeanings={data.leftLatencyMeanings}
            isConnected={false}
            hoveredLat={hoveredLat}
            onHover={setHoveredLat}
          />
          <Panel
            title={data.rightPanelTitle}
            stagePct={C_STAGE_PCT}
            values={C_VALUE}
            latencies={data.leftLatencies}
            latencyMeanings={data.leftLatencyMeanings}
            isConnected={true}
            rightHighlight={data.rightHighlight}
            hoveredLat={hoveredLat}
            onHover={setHoveredLat}
          />
        </div>

        <p className="text-gb-muted text-xs italic mt-2">{data.leftEndNote}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.enablers.map((e, i) => (
            <div key={i} className="flex gap-2 items-start text-xs text-gb-muted">
              <span className="shrink-0 font-mono text-gb-blue font-medium">{e.charAt(0)}.</span>
              <span>{e.slice(3)}</span>
            </div>
          ))}
        </div>

        <p className="text-gb-muted/50 text-xs mt-4 italic">{data.credit}</p>
      </div>
    </div>
  );
}
