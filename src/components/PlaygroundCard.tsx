import { ExternalLink } from 'lucide-react';
import { useReveal } from '../lib/useReveal';

interface PlaygroundData {
  title: string;
  body: string;
  url: string;
  note: string;
}

export function PlaygroundCard({ data }: { data: PlaygroundData }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal">
      <div className="rounded-card bg-gradient-to-br from-gb-navy to-[#0d3a6e] p-8 sm:p-10 text-white shadow-card-hover">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-gb-cyan mb-3">External sandbox</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">{data.title}</h2>
          <p className="text-gb-code-fg/80 text-lg leading-relaxed mb-2">{data.body}</p>
          <p className="text-gb-cyan/70 text-sm mb-8">{data.note}</p>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-gb-coral text-white font-semibold hover:bg-gb-coral/90 transition-colors focus-visible:outline-white"
          >
            Open playground
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
