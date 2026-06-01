interface ToolBadgeProps {
  tool: string;
}

const COLORS: Record<string, string> = {
  Copilot:  'bg-[#0078d4]/10 text-[#0078d4] border-[#0078d4]/20',
  Claude:   'bg-[#d97706]/10 text-[#b45309] border-[#d97706]/20',
  ChatGPT:  'bg-[#10a37f]/10 text-[#059669] border-[#10a37f]/20',
};

export function ToolBadge({ tool }: ToolBadgeProps) {
  const cls = COLORS[tool] ?? 'bg-gb-soft text-gb-muted border-gb-line';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-xs font-mono font-medium border ${cls}`}>
      {tool}
    </span>
  );
}
