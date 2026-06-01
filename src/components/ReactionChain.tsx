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

// ── chart geometry ──────────────────────────────────────────
const CX0 = 54, CX1 = 372, CY0 = 22, CY1 = 188;
const CW = CX1 - CX0; // 318
const CH = CY1 - CY0; // 166

// exponential decay: v(t) = A·e^(−k·t) + B
const K = 3.0;
function vOf(t: number) { return 0.82 * Math.exp(-K * t) + 0.08; }
function xOf(t: number) { return CX0 + t * CW; }
function yOf(t: number) { return CY0 + (1 - vOf(t)) * CH; }

function makePath(n = 70): string {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push(`${i === 0 ? 'M' : 'L'}${xOf(t).toFixed(1)},${yOf(t).toFixed(1)}`);
  }
  return pts.join(' ');
}

const CURVE = makePath();

// traditional stage t-positions
const TT = [0, 0.22, 0.40, 0.57, 0.72];
// connected (compressed) stage t-positions
const TC = [0, 0.06, 0.11, 0.16, 0.22];

// Pre-computed stage dots (px)
// traditional: (54,37), (124,104), (182,134), (236,151), (284,160)
// connected:   (54,37), (73,60),   (89,76),   (105,90),  (124,104)

// Left-panel callout label positions [labelX, labelY, line1, line2]
// labelY = SVG baseline of first text line
const LEFT_CALLOUTS: [number, number, string, string][] = [
  [58,  28, 'Event', 'production out of spec.'],
  [66,  60, 'Insights available —', 'deviation is known'],
  [124, 93, 'Analysis completed —', 'deviation understood'],
  [178, 112, 'Measure approved —', 'change defined'],
  [230, 130, 'Measure takes effect —', 'process adapted'],
];

// Dot → label connector endpoints (from dot, to label bottom-center)
// computed to roughly match the label positions above
const LEFT_CONNECTORS: [number, number, number, number][] = [
  // no connector for stage 0 (label is directly beside dot)
  [xOf(TT[1]), yOf(TT[1]) - 2, 110, 70],
  [xOf(TT[2]), yOf(TT[2]) - 2, 168, 103],
  [xOf(TT[3]), yOf(TT[3]) - 2, 222, 122],
  [xOf(TT[4]), yOf(TT[4]) - 2, 274, 140],
];

const LAT_COLORS = ['#1466E015', '#17B8C915', '#d9770610', '#FF6B4A10'];
const ENABLER_LETTERS = ['A', 'B', 'C', 'D'];

// ── SVG axis helpers ─────────────────────────────────────────
function Axes({ yLabel }: { yLabel: string }) {
  return (
    <g>
      {/* Y axis */}
      <line x1={CX0} y1={CY1 + 4} x2={CX0} y2={CY0 - 10} stroke="#C8D4E3" strokeWidth="1.5" />
      <polygon points={`${CX0 - 3},${CY0 - 10} ${CX0 + 3},${CY0 - 10} ${CX0},${CY0 - 16}`} fill="#C8D4E3" />
      {/* X axis */}
      <line x1={CX0 - 4} y1={CY1} x2={CX1 + 10} y2={CY1} stroke="#C8D4E3" strokeWidth="1.5" />
      <polygon points={`${CX1 + 10},${CY1 - 3} ${CX1 + 10},${CY1 + 3} ${CX1 + 16},${CY1}`} fill="#C8D4E3" />
      <text x={CX1 + 18} y={CY1 + 4} fill="#5A6B7B" fontSize="11" fontFamily="JetBrains Mono, monospace" fontStyle="italic">t</text>
      {/* Y label rotated */}
      <text
        transform={`translate(14,${(CY0 + CY1) / 2}) rotate(-90)`}
        textAnchor="middle" fill="#5A6B7B" fontSize="7.5"
        fontFamily="Hanken Grotesk, sans-serif"
      >
        {yLabel}
      </text>
    </g>
  );
}

// ── Left panel ───────────────────────────────────────────────
interface LeftProps {
  title: string;
  latencies: string[];
  latencyMeanings: string[];
}

function LeftPanel({ title, latencies, latencyMeanings }: LeftProps) {
  const [hov, setHov] = useState<number | null>(null);
  const VH = 252;

  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-mono text-center text-gb-navy font-semibold mb-1">{title}</p>
      <svg viewBox={`0 0 400 ${VH}`} className="w-full" role="img" aria-label={title}>
        <Axes yLabel="Value of measure / action" />

        {/* Latency hover zones */}
        {TT.slice(0, -1).map((t, i) => (
          <rect key={i}
            x={xOf(t)} y={CY0} width={xOf(TT[i + 1]) - xOf(t)} height={CH}
            fill={hov === i ? LAT_COLORS[i] : 'transparent'}
            className="cursor-pointer"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          />
        ))}

        {/* Lost-output fill */}
        <path
          d={`M${xOf(TT[0]).toFixed(1)},${yOf(TT[0]).toFixed(1)} ${CURVE.slice(1)} L${xOf(1).toFixed(1)},${yOf(0).toFixed(1)} Z`}
          fill="rgba(255,107,74,0.06)"
          clipPath="url(#chartClip)"
        />
        <defs>
          <clipPath id="chartClip">
            <rect x={CX0} y={CY0} width={CW} height={CH} />
          </clipPath>
        </defs>

        {/* Exponential curve */}
        <path d={CURVE} fill="none" stroke="#1466E0" strokeWidth="2.4" strokeLinejoin="round" />

        {/* Dashed vertical lines from each stage dot to x-axis */}
        {TT.map((t, i) => (
          <line key={i}
            x1={xOf(t).toFixed(1)} y1={yOf(t).toFixed(1)}
            x2={xOf(t).toFixed(1)} y2={CY1}
            stroke="#C8D4E3" strokeWidth="0.9" strokeDasharray="3 2"
          />
        ))}

        {/* Connector lines: label → dot (stages 1-4) */}
        {LEFT_CONNECTORS.map(([dx, dy, lx, ly], i) => (
          <line key={i}
            x1={lx} y1={ly} x2={dx} y2={dy}
            stroke="#94a3b8" strokeWidth="0.75" strokeDasharray="3 2"
          />
        ))}

        {/* Callout labels */}
        {LEFT_CALLOUTS.map(([lx, ly, l1, l2], i) => (
          <g key={i}>
            <text x={lx} y={ly} fill="#0E2233" fontSize="8.5" fontFamily="Hanken Grotesk, sans-serif" fontWeight="500">{l1}</text>
            <text x={lx} y={ly + 11} fill="#5A6B7B" fontSize="8" fontFamily="Hanken Grotesk, sans-serif">{l2}</text>
          </g>
        ))}

        {/* Stage dots */}
        {TT.map((t, i) => (
          <circle key={i}
            cx={xOf(t).toFixed(1)} cy={yOf(t).toFixed(1)} r={i === 0 ? 5.5 : 4.5}
            fill="white"
            stroke={i === 0 ? '#FF6B4A' : '#1466E0'}
            strokeWidth="2"
          />
        ))}

        {/* "Lost output" orange annotation */}
        <text x={372} y={38} textAnchor="end" fill="#FF6B4A" fontSize="8" fontFamily="Hanken Grotesk, sans-serif">Production of out-spec</text>
        <text x={372} y={49} textAnchor="end" fill="#FF6B4A" fontSize="8" fontFamily="Hanken Grotesk, sans-serif">product / lost output</text>
        <text x={372} y={65} textAnchor="end" fill="#FF6B4A" fontSize="20" fontFamily="sans-serif">↓</text>

        {/* Latency brackets + labels below x-axis */}
        {TT.slice(0, -1).map((t, i) => {
          const x1 = xOf(t), x2 = xOf(TT[i + 1]);
          const mx = (x1 + x2) / 2;
          const by = CY1 + 12;
          const word = latencies[i].split(' ');
          return (
            <g key={i}>
              {/* bracket line */}
              <line x1={x1 + 3} y1={by} x2={x2 - 3} y2={by} stroke="#FF6B4A" strokeWidth="1" />
              <line x1={x1 + 3} y1={by - 3} x2={x1 + 3} y2={by + 3} stroke="#FF6B4A" strokeWidth="1" />
              <line x1={x2 - 3} y1={by - 3} x2={x2 - 3} y2={by + 3} stroke="#FF6B4A" strokeWidth="1" />
              {/* label */}
              <text x={mx} y={by + 12} textAnchor="middle" fill="#FF6B4A" fontSize="7.5" fontFamily="Hanken Grotesk, sans-serif">{word[0]}</text>
              <text x={mx} y={by + 21} textAnchor="middle" fill="#FF6B4A" fontSize="7.5" fontFamily="Hanken Grotesk, sans-serif">{word[1]}</text>
            </g>
          );
        })}

        {/* Hover tooltip */}
        {hov !== null && (
          <g>
            <rect x={xOf(TT[hov]) + 4} y={CY0 + 2} width={160} height={28} rx="5" fill="#1466E0" opacity="0.93" />
            <text x={xOf(TT[hov]) + 9} y={CY0 + 14} fill="white" fontSize="8.5" fontFamily="JetBrains Mono, monospace">{latencies[hov]}</text>
            <text x={xOf(TT[hov]) + 9} y={CY0 + 24} fill="white" fontSize="7.5" fontFamily="Hanken Grotesk, sans-serif" opacity="0.85">{latencyMeanings[hov]}</text>
          </g>
        )}
      </svg>
    </div>
  );
}

// ── Right panel ──────────────────────────────────────────────
function RightPanel({ title, rightHighlight }: { title: string; rightHighlight: string }) {
  const VH = 252;
  const txEffect = xOf(TC[4]); // x where connected measure takes effect
  const txTrad   = xOf(TT[4]); // x where traditional measure would take effect
  const yEffect  = yOf(TC[4]);
  const yTrad    = yOf(TT[4]);

  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-mono text-center text-gb-navy font-semibold mb-1">{title}</p>
      <svg viewBox={`0 0 400 ${VH}`} className="w-full" role="img" aria-label={title}>
        <Axes yLabel="Value of countermeasure" />

        {/* Time-saved teal fill */}
        <rect
          x={txEffect} y={CY0}
          width={txTrad - txEffect} height={CH}
          fill="rgba(23,184,201,0.12)"
        />
        {/* Remainder (after traditional would have acted) – lighter */}
        <rect
          x={txTrad} y={CY0}
          width={CX1 - txTrad} height={CH}
          fill="rgba(23,184,201,0.06)"
        />

        {/* Dashed vertical lines from each connected stage to x-axis */}
        {TC.map((t, i) => (
          <line key={i}
            x1={xOf(t).toFixed(1)} y1={yOf(t).toFixed(1)}
            x2={xOf(t).toFixed(1)} y2={CY1}
            stroke="#C8D4E3" strokeWidth="0.9" strokeDasharray="3 2"
          />
        ))}

        {/* Exponential curve */}
        <path d={CURVE} fill="none" stroke="#17B8C9" strokeWidth="2.4" strokeLinejoin="round" />

        {/* Green vertical double-arrow at "takes effect" */}
        <line x1={txEffect} y1={yEffect - 1} x2={txEffect} y2={yTrad + 1}
          stroke="#17B8C9" strokeWidth="2.5" />
        <polygon points={`${txEffect - 4},${yEffect} ${txEffect + 4},${yEffect} ${txEffect},${yEffect - 7}`} fill="#17B8C9" />
        <polygon points={`${txEffect - 4},${yTrad} ${txEffect + 4},${yTrad} ${txEffect},${yTrad + 7}`} fill="#17B8C9" />
        {/* label beside it */}
        <text x={txEffect + 7} y={(yEffect + yTrad) / 2 - 5} fill="#17B8C9" fontSize="8" fontFamily="Hanken Grotesk, sans-serif" fontWeight="500">Counter-measure</text>
        <text x={txEffect + 7} y={(yEffect + yTrad) / 2 + 5} fill="#17B8C9" fontSize="8" fontFamily="Hanken Grotesk, sans-serif" fontWeight="500">takes effect</text>
        {/* "time saved / increased value" top-right */}
        <text x={372} y={36} textAnchor="end" fill="#17B8C9" fontSize="8" fontFamily="Hanken Grotesk, sans-serif" fontWeight="500">time saved /</text>
        <text x={372} y={47} textAnchor="end" fill="#17B8C9" fontSize="8" fontFamily="Hanken Grotesk, sans-serif" fontWeight="500">increased value</text>
        <text x={372} y={62} textAnchor="end" fill="#17B8C9" fontSize="20">↑</text>

        {/* Stage dots with A/B/C/D labels */}
        {TC.map((t, i) => (
          <g key={i}>
            <circle
              cx={xOf(t).toFixed(1)} cy={yOf(t).toFixed(1)} r={5}
              fill="white"
              stroke={i === 0 ? '#FF6B4A' : '#17B8C9'}
              strokeWidth="2"
            />
            {i > 0 && (
              <text
                x={xOf(t)} y={yOf(t) + 3.5}
                textAnchor="middle" fill="#17B8C9"
                fontSize="6.5" fontFamily="Hanken Grotesk, sans-serif" fontWeight="700"
              >
                {ENABLER_LETTERS[i - 1]}
              </text>
            )}
          </g>
        ))}

        {/* Time-saved bracket at bottom */}
        <g>
          <line x1={txEffect + 2} y1={CY1 + 12} x2={txTrad - 2} y2={CY1 + 12}
            stroke="#17B8C9" strokeWidth="1.2" />
          <line x1={txEffect + 2} y1={CY1 + 9} x2={txEffect + 2} y2={CY1 + 15} stroke="#17B8C9" strokeWidth="1.2" />
          <line x1={txTrad - 2}   y1={CY1 + 9} x2={txTrad - 2}   y2={CY1 + 15} stroke="#17B8C9" strokeWidth="1.2" />
          <text x={(txEffect + txTrad) / 2} y={CY1 + 24} textAnchor="middle"
            fill="#17B8C9" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
            {rightHighlight}
          </text>
        </g>

        {/* Enabler letter labels near bottom at their stage x positions (stages 1-4) */}
        {TC.slice(1).map((t, i) => (
          <g key={i}>
            <text x={xOf(t)} y={CY1 + 12} textAnchor="middle"
              fill="#17B8C9" fontSize="8" fontFamily="Hanken Grotesk, sans-serif" fontWeight="600">
              {ENABLER_LETTERS[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export function ReactionChain({ data }: { data: ReactionChainData }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal my-8">
      <div className="rounded-card bg-gb-surface border border-gb-line p-5 sm:p-7 shadow-card">
        <h3 className="font-display font-bold text-gb-navy text-xl mb-2">{data.heading}</h3>
        <p className="text-gb-muted text-sm leading-relaxed mb-2 max-w-2xl">{data.caption}</p>
        <p className="text-xs font-mono text-gb-muted/50 mb-6">Hover the coloured latency zones to explore each phase</p>

        <div className="flex flex-col sm:flex-row gap-2 items-start">
          <LeftPanel
            title={data.leftPanelTitle}
            latencies={data.leftLatencies}
            latencyMeanings={data.leftLatencyMeanings}
          />

          {/* separator */}
          <div className="hidden sm:flex items-center self-center px-1 text-gb-line text-4xl select-none leading-none mt-[-30px]">›</div>

          <RightPanel title={data.rightPanelTitle} rightHighlight={data.rightHighlight} />
        </div>

        <p className="text-gb-muted text-xs italic mt-1 mb-5">{data.leftEndNote}</p>

        {/* Enablers list */}
        <div className="border-t border-gb-line pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
          {data.enablers.map((e, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full border border-gb-blue/40 flex items-center justify-center text-gb-blue text-xs font-mono font-semibold">
                {e[0]}
              </span>
              <span className="text-gb-ink text-xs leading-relaxed">{e.slice(3)}</span>
            </div>
          ))}
        </div>

        <p className="text-gb-muted/40 text-xs mt-4 italic">{data.credit}</p>
      </div>
    </div>
  );
}
