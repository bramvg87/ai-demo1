import { useState } from 'react';
import { useReveal } from '../lib/useReveal';

interface QuadrantData {
  label: string;
  example: string;
}

interface MatrixData {
  xAxis: string;
  yAxis: string;
  quadrants: {
    bottomLeft:  QuadrantData;
    bottomRight: QuadrantData;
    topLeft:     QuadrantData;
    topRight:    QuadrantData;
  };
}

const QUAD_STYLES = {
  bottomLeft:  { base: 'bg-gb-soft/40 border-gb-line text-gb-muted',                  dot: 'bg-gb-muted/30' },
  bottomRight: { base: 'bg-[#EAF2FE] border-gb-blue/20 text-gb-navy',                 dot: 'bg-gb-blue/40' },
  topLeft:     { base: 'bg-[#EAF2FE] border-gb-blue/20 text-gb-navy',                 dot: 'bg-gb-blue/40' },
  topRight:    { base: 'bg-gradient-to-br from-gb-blue/10 to-gb-cyan/10 border-gb-cyan/30 text-gb-navy', dot: 'bg-gb-cyan' },
};

type QuadKey = keyof typeof QUAD_STYLES;

function Quad({ id, data, style }: { id: QuadKey; data: QuadrantData; style: typeof QUAD_STYLES[QuadKey] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-xl border p-4 cursor-default transition-all duration-200 min-h-[110px] flex flex-col justify-between ${style.base} ${hovered ? 'shadow-card-hover -translate-y-0.5' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="region"
      aria-label={data.label}
    >
      <div className="flex items-start gap-2">
        <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${style.dot}`} />
        <p className="font-display font-semibold text-sm leading-snug">{data.label}</p>
      </div>
      <p
        className={`text-xs leading-relaxed mt-2 transition-all duration-300 ${hovered ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}
        aria-live="polite"
      >
        {data.example}
      </p>
      {id === 'topRight' && (
        <span className="absolute top-2 right-2 text-xs font-mono text-gb-cyan opacity-60">goal</span>
      )}
    </div>
  );
}

export function ValueMatrix({ matrix }: { matrix: MatrixData }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal">
      <div className="relative max-w-xl">
        {/* Y axis label */}
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-mono text-gb-muted whitespace-nowrap hidden sm:block">
          {matrix.yAxis}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Quad id="topLeft"     data={matrix.quadrants.topLeft}     style={QUAD_STYLES.topLeft} />
          <Quad id="topRight"    data={matrix.quadrants.topRight}    style={QUAD_STYLES.topRight} />
          <Quad id="bottomLeft"  data={matrix.quadrants.bottomLeft}  style={QUAD_STYLES.bottomLeft} />
          <Quad id="bottomRight" data={matrix.quadrants.bottomRight} style={QUAD_STYLES.bottomRight} />
        </div>

        {/* X axis label */}
        <p className="text-xs font-mono text-gb-muted text-center mt-2">{matrix.xAxis}</p>
        <p className="text-xs text-gb-muted/60 text-center mt-1">Hover a quadrant to see an example</p>
      </div>
    </div>
  );
}
