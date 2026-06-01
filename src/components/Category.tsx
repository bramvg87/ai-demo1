import { useReveal } from '../lib/useReveal';
import { useProgress } from '../lib/useProgress';
import { Lab } from './Lab';
import type { Category as CategoryType } from '../data/content';

const CAT_ICONS: Record<string, string> = {
  text:      '✦',
  images:    '◈',
  analysis:  '◉',
  documents: '▣',
};

const MARKER_STYLES: Record<string, string> = {
  'Efficiency + Effectiveness': 'bg-gb-blue/10 text-gb-blue border-gb-blue/20',
  'Effectiveness (+ Efficiency)': 'bg-gb-cyan/10 text-gb-cyan border-gb-cyan/20',
  'Efficiency (+ Effectiveness)': 'bg-gb-blue/10 text-gb-blue border-gb-blue/20',
};

export function Category({ data }: { data: CategoryType }) {
  const { isDone, toggle } = useProgress();
  const ref = useReveal();

  const icon = CAT_ICONS[data.id] ?? '●';
  const markerCls = MARKER_STYLES[data.marker] ?? 'bg-gb-soft text-gb-muted border-gb-line';

  const doneLabs = data.labs.filter((l) => isDone(l.id)).length;

  return (
    <div ref={ref} className="reveal mb-12">
      <div className="mb-4 flex flex-wrap items-start gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gb-cyan text-lg leading-none">{icon}</span>
          <h3 className="font-display font-bold text-gb-navy text-xl">{data.label}</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-pill text-xs font-mono font-medium border ${markerCls}`}>
          {data.marker}
        </span>
        {doneLabs > 0 && (
          <span className="px-2.5 py-0.5 rounded-pill text-xs font-mono font-medium border bg-gb-blue/10 text-gb-blue border-gb-blue/20">
            {doneLabs}/{data.labs.length} done
          </span>
        )}
      </div>

      <div className="rounded-xl bg-gb-soft border border-gb-line px-4 py-3 mb-4">
        <p className="text-xs font-mono uppercase tracking-widest text-gb-cyan mb-1">Value</p>
        <p className="text-gb-ink text-sm leading-relaxed">{data.valueTag}</p>
      </div>

      <p className="text-gb-muted text-sm leading-relaxed mb-5">{data.intro}</p>

      <div className="space-y-3">
        {data.labs.map((lab) => (
          <Lab
            key={lab.id}
            lab={lab}
            isDone={isDone(lab.id)}
            onToggleDone={() => toggle(lab.id)}
          />
        ))}
      </div>
    </div>
  );
}
