import { useReveal } from '../lib/useReveal';

interface SectionProps {
  id: string;
  number?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, number, title, intro, children, className }: SectionProps) {
  const ref = useReveal();

  return (
    <section id={id} className={`py-20 ${className ?? ''}`}>
      <div className="max-w-5xl mx-auto px-6">
        <div ref={ref} className="reveal mb-10">
          {number && (
            <span className="font-mono text-7xl font-bold text-gb-cyan/15 select-none block leading-none mb-1">
              {number}
            </span>
          )}
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gb-navy">{title}</h2>
          {intro && (
            <p className="mt-4 text-gb-muted text-lg leading-relaxed max-w-2xl">{intro}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
