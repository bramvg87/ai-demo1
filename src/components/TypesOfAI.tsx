import { useReveal } from '../lib/useReveal';
import type { AIType } from '../data/content';

export function TypesOfAI({ types }: { types: AIType[] }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {types.map((t) => (
          <div
            key={t.label}
            className="rounded-card bg-gb-surface border border-gb-line px-4 py-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
          >
            <p className="font-display font-semibold text-gb-navy text-sm mb-1">{t.label}</p>
            <p className="text-gb-muted text-xs leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
