/**
 * ValueLevers - the "faster / better / both" value graphic for the
 * "How AI creates value" section. Replaces the old value table.
 *
 * Data-light, fixed layout, verified against a rendered reference. Generic on
 * purpose: no domain examples, just the core idea. Genabyte tokens, no deps.
 */

const W = 820, H = 500;
const C = {
  navy: "#0A2540", ink: "#0E2233", muted: "#5A6B7B",
  cyan: "#0E9DB0", cyanF: "#E2F6F9", coral: "#E8552F",
  line: "#C9D6E5", qf: "#F4F7FB",
};

const x0 = 240, x1 = 620, y0 = 74, y1 = 434;
const xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
const tlc = (y0 + ym) / 2; // 164
const blc = (ym + y1) / 2; // 344
const lcx = (x0 + xm) / 2; // 335
const rcx = (xm + x1) / 2; // 525

export default function ValueLevers() {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", minWidth: 560, height: "auto", display: "block", fontFamily: "'Hanken Grotesk', Arial, sans-serif" }}
        role="img"
        aria-label="A 2 by 2 of AI value: faster, better, or ideally both"
      >
        <defs>
          <marker id="ax" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.muted} />
          </marker>
        </defs>

        <text x={W / 2} y={38} textAnchor="middle" fontSize={19} fontWeight={700} fill={C.navy}>The value of LLMs, simply put</text>

        {/* quadrants */}
        <rect x={x0} y={y0} width={xm - x0} height={ym - y0} fill={C.qf} stroke={C.line} strokeWidth={1} rx={6} />
        <rect x={xm} y={y0} width={x1 - xm} height={ym - y0} fill={C.cyanF} stroke={C.cyan} strokeWidth={2} rx={6} />
        <rect x={x0} y={ym} width={xm - x0} height={y1 - ym} fill={C.qf} stroke={C.line} strokeWidth={1} rx={6} />
        <rect x={xm} y={ym} width={x1 - xm} height={y1 - ym} fill={C.qf} stroke={C.line} strokeWidth={1} rx={6} />

        {/* TL - Better */}
        <text x={lcx} y={tlc - 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={C.ink}>Better</text>
        <text x={lcx} y={tlc + 14} textAnchor="middle" fontSize={11.5} fill={C.muted}>higher quality,</text>
        <text x={lcx} y={tlc + 29} textAnchor="middle" fontSize={11.5} fill={C.muted}>same effort</text>

        {/* TR - both */}
        <text x={rcx} y={tlc - 14} textAnchor="middle" fontSize={15} fill={C.coral}>{"\u2605"}</text>
        <text x={rcx} y={tlc + 8} textAnchor="middle" fontSize={16.5} fontWeight={700} fill={C.navy}>Faster AND better</text>
        <text x={rcx} y={tlc + 27} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.cyan}>the goal</text>

        {/* BL - low */}
        <text x={lcx} y={blc - 2} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.muted}>Low value</text>
        <text x={lcx} y={blc + 16} textAnchor="middle" fontSize={11.5} fill={C.muted}>more effort, no real gain</text>

        {/* BR - Faster */}
        <text x={rcx} y={blc - 6} textAnchor="middle" fontSize={16} fontWeight={700} fill={C.ink}>Faster</text>
        <text x={rcx} y={blc + 14} textAnchor="middle" fontSize={11.5} fill={C.muted}>same result,</text>
        <text x={rcx} y={blc + 29} textAnchor="middle" fontSize={11.5} fill={C.muted}>less time and input</text>

        {/* axes */}
        <line x1={x0} y1={y1} x2={x0} y2={y0 - 16} stroke={C.muted} strokeWidth={2} markerEnd="url(#ax)" />
        <line x1={x0} y1={y1} x2={x1 + 16} y2={y1} stroke={C.muted} strokeWidth={2} markerEnd="url(#ax)" />

        <text x={xm} y={y1 + 34} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.ink}>more efficient: faster, with less input</text>
        <text x={x0 - 22} y={ym} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.ink} transform={`rotate(-90 ${x0 - 22} ${ym})`}>more effective: better outcome</text>

        <text x={W / 2} y={H - 16} textAnchor="middle" fontSize={12} fill={C.muted}>With AI, most tasks move right (faster) or up (better). The win is to push for both.</text>
      </svg>
    </div>
  );
}
