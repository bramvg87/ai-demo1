import { useState } from "react";

/**
 * AITimeline - the AI lineage infographic (v2).
 *
 * Drop-in, data-driven component. Coordinates are computed from data, not laid
 * out freehand, so it always renders clean. Verified against a rendered reference.
 *
 * v2 adds: an emerging "Physical AI" node (what comes after agents), and a top
 * annotation explaining the shift from a chatbot you visit to AI embedded in your
 * apps and machines that acts for you.
 *
 * Colours use the Genabyte tokens. Click a milestone with a triangle to watch the
 * video. No external dependencies beyond React.
 */

const W = 1320;
const H = 624;
const SPINE_Y = 205;

const C = {
  grey: "#5A6B7B", greyF: "#EDF1F6",
  blue: "#1466E0", blueF: "#E3EDFD",
  blueB: "#2E8FFF", blueBF: "#E6F1FF",
  cyan: "#0E9DB0", cyanF: "#E2F6F9",
  coral: "#E8552F", coralF: "#FFEAE3",
  navy: "#0A2540", navyF: "#E7ECF2",
  ink: "#0E2233", muted: "#5A6B7B", line: "#C9D6E5",
};

const pillW = (label: string) => Math.max(120, label.length * 8.6 + 30);

type Node = {
  x: number; label: string; year: string; desc: [string, string];
  bd: string; fl: string; emerging?: boolean;
  ms: { year: string; text: string; yt?: string };
};

const xs = [105, 290, 475, 660, 845, 1030, 1215];

const nodes: Node[] = [
  { x: xs[0], label: "Rule-based AI", year: "1950s-80s", desc: ["Hand-coded rules.", "No learning."], bd: C.grey, fl: C.greyF, ms: { year: "1997", text: "Deep Blue beats Kasparov" } },
  { x: xs[1], label: "Machine learning", year: "1990s-2000s", desc: ["Learns patterns", "from data."], bd: C.blue, fl: C.blueF, ms: { year: "2011", text: "Watson wins Jeopardy", yt: "Sp4q60BsHoY" } },
  { x: xs[2], label: "Deep learning", year: "2012", desc: ["Many-layered nets.", "The big unlock."], bd: C.blueB, fl: C.blueBF, ms: { year: "2012", text: "AlexNet wins ImageNet" } },
  { x: xs[3], label: "Transformers", year: "2017", desc: ["Cracked language", "and context."], bd: C.coral, fl: C.coralF, ms: { year: "2017", text: "Attention Is All You Need" } },
  { x: xs[4], label: "LLMs & GenAI", year: "2018-22", desc: ["You chat with it.", "Text, images, plans."], bd: C.coral, fl: C.coralF, ms: { year: "2020-22", text: "GPT-3, then ChatGPT" } },
  { x: xs[5], label: "AI agents", year: "2023-26", desc: ["Inside your apps.", "It acts, not just talks."], bd: C.navy, fl: C.navyF, ms: { year: "2024-26", text: "Agents that take action" } },
  { x: xs[6], label: "Physical AI", year: "next \u00b7 2026+", desc: ["Steps off the screen,", "into robots & machines."], bd: C.navy, fl: "#FFFFFF", emerging: true, ms: { year: "2026+", text: "Robots that reason & act" } },
];

const RL_X = 460, RL_Y = 410, RL_W = pillW("Reinforcement learning");
const LANE_Y = RL_Y + 78;
const ATARI_X = 620, AGO_X = 815;
const AGENTS_X = xs[5];
const MLX = xs[1];
const ML_HALF = pillW("Machine learning") / 2;

const branchMilestones = [
  { x: ATARI_X, year: "2013", text: "DQN masters Atari", yt: "Ih8EfvOzBOY" },
  { x: AGO_X, year: "2016", text: "AlphaGo beats Lee Sedol", yt: "8tq1C8spV_g" },
];

const legend = [
  { name: "Rule-based", color: C.grey },
  { name: "Machine & deep learning", color: C.blue },
  { name: "Reinforcement learning", color: C.cyan },
  { name: "Language & generative", color: C.coral },
  { name: "AI agents", color: C.navy },
  { name: "Emerging / next", color: C.navy, dashed: true },
];

export default function AITimeline() {
  const [video, setVideo] = useState<string | null>(null);

  let lx = 150;
  const legendItems = legend.map((l) => {
    const item = { ...l, x: lx };
    lx += 30 + l.name.length * 7 + 26;
    return item;
  });

  const bx1 = xs[4], bx2 = xs[6], bcx = (bx1 + bx2) / 2;

  return (
    <div style={{ width: "100%" }}>
      <div style={{ overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", minWidth: 1000, height: "auto", display: "block", fontFamily: "'Hanken Grotesk', Arial, sans-serif" }}
          role="img"
          aria-label="A simplified timeline of the main building blocks of AI, from rule-based systems to physical AI"
        >
          <defs>
            <marker id="ar" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.line} />
            </marker>
            <marker id="arc" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.cyan} />
            </marker>
          </defs>

          {/* top annotation: the shift from chatbot to embedded + physical */}
          <text x={bcx} y={120} textAnchor="middle" fontSize={13.5} fontWeight={700} fill={C.navy}>The shift happening now</text>
          <text x={bcx} y={139} textAnchor="middle" fontSize={12} fill={C.muted}>from a chatbot you visit, to AI inside your apps and machines that acts for you</text>
          <path d={`M ${bx1} 160 V 151 H ${bx2} V 160`} fill="none" stroke={C.blueB} strokeWidth={1.6} />

          {/* spine arrows */}
          {nodes.slice(0, -1).map((n, i) => {
            const x1 = n.x + pillW(n.label) / 2 + 6;
            const x2 = nodes[i + 1].x - pillW(nodes[i + 1].label) / 2 - 12;
            return <line key={`sp${i}`} x1={x1} y1={SPINE_Y} x2={x2} y2={SPINE_Y} stroke={C.line} strokeWidth={2.5} markerEnd="url(#ar)" />;
          })}

          {/* main nodes + milestones */}
          {nodes.map((n, i) => {
            const w = pillW(n.label);
            const my = SPINE_Y + 82;
            const vid = !!n.ms.yt;
            return (
              <g key={`n${i}`}>
                <text x={n.x} y={SPINE_Y - 36} textAnchor="middle" fontSize={12} fontWeight={600} fill={n.emerging ? C.navy : C.cyan} letterSpacing="0.4">{n.year}</text>
                <rect
                  x={n.x - w / 2} y={SPINE_Y - 23} width={w} height={46} rx={23}
                  fill={n.fl} stroke={n.bd} strokeWidth={2}
                  strokeDasharray={n.emerging ? "5 4" : undefined}
                />
                <text x={n.x} y={SPINE_Y + 5} textAnchor="middle" fontSize={15.5} fontWeight={700} fill={C.ink}>{n.label}</text>
                <text x={n.x} y={SPINE_Y + 42} textAnchor="middle" fontSize={12} fill={C.muted}>{n.desc[0]}</text>
                <text x={n.x} y={SPINE_Y + 58} textAnchor="middle" fontSize={12} fill={C.muted}>{n.desc[1]}</text>
                <line x1={n.x} y1={SPINE_Y + 66} x2={n.x} y2={my - 4} stroke={C.line} strokeWidth={1.5} />
                <g
                  style={{ cursor: vid ? "pointer" : "default" }}
                  onClick={vid ? () => setVideo(n.ms.yt!) : undefined}
                >
                  {n.emerging ? (
                    <circle cx={n.x} cy={my} r={3.5} fill="none" stroke={C.navy} strokeWidth={1.5} />
                  ) : (
                    <circle cx={n.x} cy={my} r={3.5} fill={vid ? C.coral : C.grey} />
                  )}
                  <text x={n.x} y={my + 20} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.ink}>{n.ms.year}</text>
                  <text x={n.x} y={my + 36} textAnchor="middle" fontSize={11} fill={vid ? C.coral : C.muted}>
                    {n.ms.text}{vid ? " \u25B6" : ""}
                  </text>
                </g>
              </g>
            );
          })}

          {/* reinforcement learning branch */}
          <path d={`M ${MLX + ML_HALF} ${SPINE_Y} C ${MLX + ML_HALF + 40} ${SPINE_Y + 72}, ${RL_X} ${RL_Y - 110}, ${RL_X} ${RL_Y - 23}`} fill="none" stroke={C.cyan} strokeWidth={2.5} markerEnd="url(#arc)" />
          <text x={RL_X - RL_W / 2 - 10} y={RL_Y + 4} textAnchor="end" fontSize={12} fontWeight={600} fill={C.cyan}>2013-16</text>
          <rect x={RL_X - RL_W / 2} y={RL_Y - 23} width={RL_W} height={46} rx={23} fill={C.cyanF} stroke={C.cyan} strokeWidth={2} />
          <text x={RL_X} y={RL_Y + 5} textAnchor="middle" fontSize={15.5} fontWeight={700} fill={C.ink}>Reinforcement learning</text>
          <text x={RL_X} y={RL_Y + 42} textAnchor="middle" fontSize={12} fill={C.muted}>Learns by trial and reward.</text>

          {/* branch lane + milestones */}
          <path d={`M ${RL_X + RL_W / 2} ${RL_Y} C ${RL_X + RL_W / 2 + 30} ${RL_Y}, ${ATARI_X - 60} ${LANE_Y}, ${ATARI_X - 30} ${LANE_Y}`} fill="none" stroke={C.cyan} strokeWidth={1.8} />
          <line x1={ATARI_X - 30} y1={LANE_Y} x2={AGO_X} y2={LANE_Y} stroke={C.cyan} strokeWidth={1.8} />
          {branchMilestones.map((m, i) => (
            <g key={`b${i}`} style={{ cursor: "pointer" }} onClick={() => setVideo(m.yt)}>
              <circle cx={m.x} cy={LANE_Y} r={4} fill={C.coral} />
              <text x={m.x} y={LANE_Y + 20} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={C.ink}>{m.year}</text>
              <text x={m.x} y={LANE_Y + 36} textAnchor="middle" fontSize={11} fill={C.coral}>{m.text} {"\u25B6"}</text>
            </g>
          ))}

          {/* feedback line: RL -> agents */}
          <path d={`M ${AGO_X} ${LANE_Y - 8} C ${AGO_X + 120} ${LANE_Y - 120}, ${AGENTS_X} ${SPINE_Y + 150}, ${AGENTS_X} ${SPINE_Y + 25}`} fill="none" stroke={C.cyan} strokeWidth={1.8} strokeDasharray="2 5" />
          <text x={950} y={408} textAnchor="middle" fontSize={11} fill={C.cyan}>reward-based learning (RLHF)</text>
          <text x={950} y={424} textAnchor="middle" fontSize={11} fill={C.cyan}>feeds today's agents</text>

          {/* legend */}
          {legendItems.map((l) => (
            <g key={l.name}>
              {l.dashed ? (
                <circle cx={l.x} cy={588} r={6} fill="none" stroke={l.color} strokeWidth={1.6} strokeDasharray="3 2.5" />
              ) : (
                <circle cx={l.x} cy={588} r={6} fill={l.color} />
              )}
              <text x={l.x + 13} y={592} fontSize={12} fill={C.ink}>{l.name}</text>
            </g>
          ))}

          <text x={W / 2} y={612} textAnchor="middle" fontSize={11.5} fill={C.muted}>
            A simplified lineage. Position shows order, not exact time scale. Click a milestone marked with a triangle to watch the video.
          </text>
        </svg>
      </div>

      {/* video modal */}
      {video && (
        <div
          onClick={() => setVideo(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,37,64,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(880px, 92vw)", aspectRatio: "16 / 9", background: "#000", borderRadius: 14, overflow: "hidden", position: "relative" }}>
            <button
              onClick={() => setVideo(null)}
              aria-label="Close"
              style={{ position: "absolute", top: -42, right: 0, color: "#fff", background: "none", border: 0, fontSize: 30, cursor: "pointer", lineHeight: 1 }}
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1`}
              title="Milestone video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
