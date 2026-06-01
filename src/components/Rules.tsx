import { useReveal } from '../lib/useReveal';

interface RulesProps {
  data: { title: string; items: string[] };
}

export function Rules({ data }: RulesProps) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-gb-navy mb-8">{data.title}</h2>
      <ol className="space-y-4">
        {data.items.map((item, i) => (
          <li key={i} className="flex gap-5 items-start">
            <span className="shrink-0 font-mono text-2xl font-bold text-gb-cyan/40 leading-tight w-7 text-right">
              {i + 1}
            </span>
            <p className="text-gb-ink leading-relaxed pt-0.5">{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
