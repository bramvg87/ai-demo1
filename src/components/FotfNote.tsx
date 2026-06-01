import { useReveal } from '../lib/useReveal';

export function FotfNote({ text }: { text: string }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal my-10">
      <div className="rounded-card border-l-4 border-gb-cyan bg-gb-soft px-6 py-5">
        <p className="font-mono text-xs uppercase tracking-widest text-gb-cyan mb-2">Factory of the Future</p>
        <p className="text-gb-ink leading-relaxed text-sm sm:text-base">{text}</p>
      </div>
    </div>
  );
}
