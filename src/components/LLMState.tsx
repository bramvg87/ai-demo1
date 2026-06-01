import { useReveal } from '../lib/useReveal';
import { GapChart } from './GapChart';
import type { LLMModel } from '../data/content';

interface GapPoint {
  label: string;
  text: string;
  tag: string;
}

interface LLMData {
  copilot: string;
  sota: LLMModel[];
  gap: string;
  gapPoints?: GapPoint[];
  chartNote: string;
  chartSourceLabel: string;
  chartSourceUrl: string;
  open: string;
}

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI:    'bg-[#10a37f]/10 text-[#059669] border-[#10a37f]/20',
  Anthropic: 'bg-[#d97706]/10 text-[#b45309] border-[#d97706]/20',
  Google:    'bg-[#4285F4]/10 text-[#2563EB] border-[#4285F4]/20',
};

export function LLMState({ llm }: { llm: LLMData }) {
  const ref1 = useReveal();
  const ref2 = useReveal(100);
  const ref3 = useReveal(200);
  const ref4 = useReveal(300);

  return (
    <div className="space-y-8">
      {/* Copilot card */}
      <div ref={ref1} className="reveal">
        <div className="rounded-card bg-gradient-to-r from-gb-soft to-gb-surface border border-gb-blue/20 p-5 sm:p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12">
              <img src="/copilot-logo.png" alt="Microsoft Copilot" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-display font-semibold text-gb-navy mb-1">Microsoft 365 Copilot - the default for company data</p>
              <p className="text-gb-ink text-sm leading-relaxed">{llm.copilot}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SOTA models */}
      <div ref={ref2} className="reveal">
        <p className="font-mono text-xs uppercase tracking-widest text-gb-muted mb-3">State-of-the-art closed models</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {llm.sota.map((m) => (
            <div key={m.model} className="rounded-card bg-gb-surface border border-gb-line px-4 py-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
              <span className={`inline-block px-2 py-0.5 rounded-pill text-xs font-mono font-medium border mb-2 ${PROVIDER_COLORS[m.provider] ?? 'bg-gb-soft text-gb-muted border-gb-line'}`}>
                {m.provider}
              </span>
              <p className="font-display font-semibold text-gb-navy text-sm mb-1">{m.model}</p>
              <p className="text-gb-muted text-xs leading-relaxed">{m.line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gap section */}
      <div ref={ref3} className="reveal">
        <p className="font-mono text-xs uppercase tracking-widest text-gb-muted mb-3">Open vs closed</p>
        <p className="text-gb-ink text-sm leading-relaxed mb-4 max-w-2xl">{llm.gap}</p>
        {llm.gapPoints && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {llm.gapPoints.map((pt) => (
              <div key={pt.label} className="rounded-card border border-gb-line bg-gb-surface px-5 py-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-pill bg-gb-soft text-gb-blue border border-gb-blue/20 text-xs font-mono font-medium">
                    {pt.tag}
                  </span>
                  <p className="font-display font-semibold text-gb-navy text-sm">{pt.label}</p>
                </div>
                <p className="text-gb-muted text-xs leading-relaxed">{pt.text}</p>
              </div>
            ))}
          </div>
        )}
        <GapChart
          chartNote={llm.chartNote}
          chartSourceLabel={llm.chartSourceLabel}
          chartSourceUrl={llm.chartSourceUrl}
        />
      </div>

      {/* Open models */}
      <div ref={ref4} className="reveal">
        <div className="rounded-card bg-gb-soft border border-gb-cyan/20 px-5 py-4">
          <p className="font-mono text-xs uppercase tracking-widest text-gb-cyan mb-2">Open models</p>
          <p className="text-gb-ink text-sm leading-relaxed">{llm.open}</p>
        </div>
      </div>
    </div>
  );
}
