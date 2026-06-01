import { ExternalLink } from 'lucide-react';

interface GapChartProps {
  chartNote: string;
  chartSourceLabel: string;
  chartSourceUrl: string;
}

export function GapChart({ chartNote, chartSourceLabel, chartSourceUrl }: GapChartProps) {
  return (
    <div className="rounded-card bg-gb-surface border border-gb-line p-4 shadow-card">
      <img
        src="/open-closed-eci-gap.png"
        alt="Step chart showing closed and open-weight model capability over time. Open models lag state-of-the-art closed models by 4 months."
        className="w-full"
      />
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
