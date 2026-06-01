import { ExternalLink } from 'lucide-react';

interface GapChartProps {
  chartNote: string;
  chartSourceLabel: string;
  chartSourceUrl: string;
}

// ── chart geometry ───────────────────────────────────────────
const VW = 730, VH = 340;
const CX0 = 68, CX1 = 618;
const CY0 = 285, CY1 = 52;   // CY0=bottom, CY1=top (SVG y inverted)
const END_MONTH = 40;         // Jan 2023 → May 2026
const Y_MIN = 107, Y_MAX = 164;

function xPos(month: number) {
  return CX0 + (month / END_MONTH) * (CX1 - CX0);
}
function yPos(score: number) {
  return CY0 - ((score - Y_MIN) / (Y_MAX - Y_MIN)) * (CY0 - CY1);
}

interface ModelPoint {
  name: string;
  month: number;
  score: number;
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'end';
}

// Closed weights — teal (#17B8C9)
const CLOSED: ModelPoint[] = [
  { name: 'GPT-4 (Mar 2023)',  month: 2,  score: 126, dx: 6,  dy: -6  },
  { name: 'Claude 3.5 Sonnet', month: 17, score: 129, dx: 6,  dy: -6  },
  { name: 'o1-mini',           month: 20, score: 136, dx: 6,  dy: -6  },
  { name: 'o1',                month: 21, score: 143, dx: 6,  dy: -18 },
  { name: 'o3',                month: 27, score: 148, dx: 6,  dy: -6  },
  { name: 'GPT-5 Pro',         month: 29, score: 150, dx: 6,  dy: -6  },
  { name: 'GPT-5.3 Codex',     month: 33, score: 155, dx: 6,  dy: -6  },
  { name: 'GPT-5.5 Pro',       month: 38, score: 160, dx: -6, dy: -6, anchor: 'end' },
];

// Open weights — magenta (#D946A8)
const OPEN: ModelPoint[] = [
  { name: '',                   month: 1,    score: 109 },
  { name: 'Llama 2-70B',        month: 6,    score: 110, dx: 6,  dy: 14  },
  { name: 'Yi-34B',             month: 10,   score: 114, dx: 6,  dy: 14  },
  { name: 'Mixtral 8x7B',       month: 11,   score: 116, dx: 6,  dy: -6  },
  { name: 'Mixtral 8x22B',      month: 15,   score: 118, dx: 6,  dy: -6  },
  { name: '',                   month: 16.5, score: 122 },
  { name: '',                   month: 17,   score: 124 },
  { name: 'Llama 3.1-405B',     month: 18,   score: 129, dx: 6,  dy: -6  },
  { name: 'DeepSeek-V3',        month: 24,   score: 130, dx: 6,  dy: 14  },
  { name: 'DeepSeek-R1',        month: 25,   score: 140, dx: 6,  dy: -6  },
  { name: 'Qwen3-235B-A22B',    month: 28,   score: 145, dx: 6,  dy: -6  },
  { name: 'Kimi K2.6',          month: 38.5, score: 151, dx: -6, dy: -6, anchor: 'end' },
];

function stepPath(pts: ModelPoint[], endMonth: number): string {
  const sorted = [...pts].sort((a, b) => a.month - b.month);
  const parts: string[] = [`M${xPos(sorted[0].month).toFixed(1)},${yPos(sorted[0].score).toFixed(1)}`];
  for (let i = 1; i < sorted.length; i++) {
    const x    = xPos(sorted[i].month).toFixed(1);
    const yPrv = yPos(sorted[i - 1].score).toFixed(1);
    const yCur = yPos(sorted[i].score).toFixed(1);
    parts.push(`L${x},${yPrv}`, `L${x},${yCur}`);
  }
  parts.push(`L${xPos(endMonth).toFixed(1)},${yPos(sorted[sorted.length - 1].score).toFixed(1)}`);
  return parts.join(' ');
}

const X_LABELS = [
  { month: 0,  label: 'Jan. 2023' },
  { month: 6,  label: 'July 2023' },
  { month: 12, label: 'Jan. 2024' },
  { month: 18, label: 'July 2024' },
  { month: 24, label: 'Jan. 2025' },
  { month: 30, label: 'July 2025' },
  { month: 36, label: 'Jan. 2026' },
];

const Y_GRID = [110, 120, 130, 140, 150, 160];

export function GapChart({ chartNote, chartSourceLabel, chartSourceUrl }: GapChartProps) {
  return (
    <div className="rounded-card bg-gb-surface border border-gb-line p-4 shadow-card overflow-x-auto">
      <p className="font-display font-bold text-gb-navy text-sm sm:text-base leading-snug mb-0.5">
        Open models lag state-of-the-art closed models by 4 months
      </p>
      <p className="text-gb-muted text-xs font-semibold mb-1">Epoch Capabilities Index score</p>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full min-w-[520px]"
        role="img"
        aria-label="Step chart showing closed and open-weight model capability over time"
      >
        {/* Horizontal grid lines */}
        {Y_GRID.map(score => (
          <g key={score}>
            <line x1={CX0} y1={yPos(score)} x2={CX1} y2={yPos(score)}
              stroke="#eef2f8" strokeWidth="1" />
            <text x={CX0 - 5} y={yPos(score) + 4} textAnchor="end"
              fill="#5A6B7B" fontSize="11" fontFamily="Hanken Grotesk, sans-serif">
              {score}
            </text>
          </g>
        ))}

        {/* Vertical grid lines at x-labels */}
        {X_LABELS.map(({ month }) => (
          <line key={month} x1={xPos(month)} y1={CY1} x2={xPos(month)} y2={CY0}
            stroke="#f4f7fb" strokeWidth="1" />
        ))}

        {/* Step chart paths */}
        <path d={stepPath(CLOSED, END_MONTH)}
          fill="none" stroke="#17B8C9" strokeWidth="2.4" strokeLinejoin="miter" />
        <path d={stepPath(OPEN, END_MONTH + 0.5)}
          fill="none" stroke="#D946A8" strokeWidth="2.4" strokeLinejoin="miter" />

        {/* Closed dots + labels */}
        {CLOSED.map(m => {
          const x = xPos(m.month), y = yPos(m.score);
          return (
            <g key={m.name}>
              <circle cx={x} cy={y} r={4.5} fill="#17B8C9" />
              {m.name && (
                <text
                  x={x + (m.dx ?? 6)} y={y + (m.dy ?? -6)}
                  textAnchor={m.anchor ?? 'start'}
                  fill="#17B8C9" fontSize="10.5" fontFamily="Hanken Grotesk, sans-serif"
                >
                  {m.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Open dots + labels */}
        {OPEN.map((m, i) => {
          const x = xPos(m.month), y = yPos(m.score);
          return (
            <g key={`open-${i}`}>
              {m.name && <circle cx={x} cy={y} r={4.5} fill="#D946A8" />}
              {m.name && (
                <text
                  x={x + (m.dx ?? 6)} y={y + (m.dy ?? -6)}
                  textAnchor={m.anchor ?? 'start'}
                  fill="#D946A8" fontSize="10.5" fontFamily="Hanken Grotesk, sans-serif"
                >
                  {m.name}
                </text>
              )}
            </g>
          );
        })}

        {/* X-axis labels */}
        {X_LABELS.map(({ month, label }) => (
          <text key={month} x={xPos(month)} y={CY0 + 16}
            textAnchor="middle" fill="#5A6B7B" fontSize="10.5" fontFamily="Hanken Grotesk, sans-serif">
            {label}
          </text>
        ))}

        {/* X-axis title */}
        <text x={(CX0 + CX1) / 2} y={VH - 4} textAnchor="middle"
          fill="#0A2540" fontSize="12" fontFamily="Hanken Grotesk, sans-serif" fontWeight="600">
          Release Date
        </text>

        {/* Legend — top right */}
        <rect x={CX1 - 124} y={CY1 + 2}  width={11} height={11} rx="2" fill="#17B8C9" />
        <text x={CX1 - 109} y={CY1 + 12} fill="#0A2540" fontSize="11" fontFamily="Hanken Grotesk, sans-serif">Closed weights</text>
        <rect x={CX1 - 124} y={CY1 + 18} width={11} height={11} rx="2" fill="#D946A8" />
        <text x={CX1 - 109} y={CY1 + 28} fill="#0A2540" fontSize="11" fontFamily="Hanken Grotesk, sans-serif">Open weights</text>
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <p className="text-gb-muted text-xs">{chartNote}</p>
        <a href={chartSourceUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-gb-blue-bright text-xs hover:underline">
          {chartSourceLabel}
          <ExternalLink className="w-3 h-3" />
        </a>
        <p className="text-gb-muted text-xs">Epoch AI (CC-BY) · epoch.ai</p>
      </div>
    </div>
  );
}
