import { ExternalLink } from 'lucide-react';

interface GapChartProps {
  chartNote: string;
  chartSourceLabel: string;
  chartSourceUrl: string;
}

export function GapChart({ chartNote, chartSourceLabel, chartSourceUrl }: GapChartProps) {
  const W = 560, H = 240;
  const ml = 48, mr = 20, mt = 20, mb = 52;
  const cw = W - ml - mr;
  const ch = H - mt - mb;

  // Months on x axis: 18 points
  const months = ['Jan \'25','','Mar','','May','','Jul','','Sep','','Nov','','Jan \'26','','Mar','','May','Jun'];
  const n = months.length - 1;
  const xOf = (i: number) => ml + (i / n) * cw;

  // Closed frontier capability (upward trend, 0=bottom, 1=top of chart)
  const closed = [0.18, 0.22, 0.28, 0.33, 0.38, 0.43, 0.49, 0.55, 0.60, 0.64, 0.68, 0.73, 0.77, 0.81, 0.85, 0.88, 0.91, 0.93];
  // Open-weight: trails by ~4 months and ~8 capability points (~0.08 in 0-1 scale)
  const open =   [0.10, 0.14, 0.19, 0.24, 0.28, 0.33, 0.38, 0.43, 0.49, 0.54, 0.58, 0.62, 0.67, 0.71, 0.75, 0.78, 0.82, 0.85];

  const yOf = (v: number) => mt + ch * (1 - v);

  const closedPath = closed.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');
  const openPath   = open.map(  (v, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');

  // Gap annotation at i=17
  const gx = xOf(17);
  const gy1 = yOf(closed[17]);
  const gy2 = yOf(open[17]);

  return (
    <div className="rounded-card bg-gb-surface border border-gb-line p-5 shadow-card">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl" role="img" aria-label="Capability gap between closed and open models">
        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
          <line key={v} x1={ml} x2={ml + cw} y1={yOf(v)} y2={yOf(v)} stroke="#E2E9F2" strokeWidth="1" />
        ))}

        {/* Gap fill area */}
        <path
          d={[
            ...closed.map((v, i) => `${i === 0 ? 'M' : 'L'}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`),
            ...[...open].reverse().map((v, i) => `L${xOf(n - i).toFixed(1)},${yOf(v).toFixed(1)}`),
            'Z',
          ].join(' ')}
          fill="#1466E015"
        />

        {/* Axes */}
        <line x1={ml} y1={mt} x2={ml} y2={mt + ch} stroke="#C8D4E3" strokeWidth="1.5" />
        <line x1={ml} y1={mt + ch} x2={ml + cw} y2={mt + ch} stroke="#C8D4E3" strokeWidth="1.5" />

        {/* Lines */}
        <path d={closedPath} fill="none" stroke="#1466E0" strokeWidth="2.5" strokeLinejoin="round" />
        <path d={openPath}   fill="none" stroke="#17B8C9" strokeWidth="2" strokeDasharray="5 3" strokeLinejoin="round" />

        {/* Gap annotation */}
        <line x1={gx} y1={gy1} x2={gx} y2={gy2} stroke="#FF6B4A" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowDown)" markerStart="url(#arrowUp)" />
        <text x={gx + 6} y={(gy1 + gy2) / 2 + 4} fill="#FF6B4A" fontSize="9" fontFamily="JetBrains Mono, monospace">~8 pts</text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowDown" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
            <path d="M0,0 L5,0 L2.5,5 Z" fill="#FF6B4A" />
          </marker>
          <marker id="arrowUp" markerWidth="5" markerHeight="5" refX="2.5" refY="0" orient="auto-start-reverse">
            <path d="M0,5 L5,5 L2.5,0 Z" fill="#FF6B4A" />
          </marker>
        </defs>

        {/* X axis labels - sparse */}
        {[0, 6, 12, 17].map((i) => (
          <text key={i} x={xOf(i)} y={H - 8} textAnchor="middle" fill="#5A6B7B" fontSize="9" fontFamily="JetBrains Mono, monospace">
            {months[i]}
          </text>
        ))}

        {/* Y axis label */}
        <text transform={`translate(12,${mt + ch / 2}) rotate(-90)`} textAnchor="middle" fill="#5A6B7B" fontSize="9" fontFamily="JetBrains Mono, monospace">
          Capability index
        </text>

        {/* Legend */}
        <line x1={ml + 4}  y1={H - 32} x2={ml + 22} y2={H - 32} stroke="#1466E0" strokeWidth="2.5" />
        <text x={ml + 26} y={H - 29} fill="#0A2540" fontSize="9" fontFamily="Hanken Grotesk, sans-serif">Closed (frontier)</text>
        <line x1={ml + 100} y1={H - 32} x2={ml + 118} y2={H - 32} stroke="#17B8C9" strokeWidth="2" strokeDasharray="5 3" />
        <text x={ml + 122} y={H - 29} fill="#0A2540" fontSize="9" fontFamily="Hanken Grotesk, sans-serif">Open-weight</text>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <p className="text-gb-muted text-xs">{chartNote}</p>
        <a
          href={chartSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-gb-blue-bright text-xs hover:underline"
        >
          {chartSourceLabel}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
