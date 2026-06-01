import { useReveal } from '../lib/useReveal';
import { VideoCard } from './VideoCard';
import type { Milestone as MilestoneType } from '../data/content';

interface MilestoneProps {
  milestones: MilestoneType[];
  bridge: string;
}

export function Milestone({ milestones, bridge }: MilestoneProps) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal mt-12">
      <p className="font-mono text-xs uppercase tracking-widest text-gb-cyan mb-8">Milestone moments</p>

      {/* Desktop: horizontal timeline */}
      <div className="hidden sm:block">
        {/* Cards row */}
        <div className="grid grid-cols-3 gap-6">
          {milestones.map((m) => (
            <VideoCard key={m.youtubeId} milestone={m} />
          ))}
        </div>

        {/* Stems */}
        <div className="grid grid-cols-3 gap-6 mt-3">
          {milestones.map((m) => (
            <div key={m.youtubeId} className="flex justify-center">
              <div className="w-[2px] h-7 bg-gradient-to-b from-gb-line to-gb-blue/60" />
            </div>
          ))}
        </div>

        {/* Timeline row: connecting line + dots + years */}
        <div className="relative flex items-start">
          {/* Connecting line between first and last dot */}
          <div className="absolute top-[10px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-gb-blue via-gb-cyan to-gb-blue" />

          {milestones.map((m, i) => (
            <div key={m.youtubeId} className="flex-1 flex flex-col items-center gap-2">
              <div className={`relative z-10 w-5 h-5 rounded-full ring-4 ring-gb-bg shadow-sm ${i === 1 ? 'bg-gb-cyan' : 'bg-gb-blue'}`} />
              <span className={`font-mono text-base font-bold ${i === 1 ? 'text-gb-cyan' : 'text-gb-blue'}`}>
                {m.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="sm:hidden space-y-0">
        {milestones.map((m, i) => (
          <div key={m.youtubeId} className="flex gap-4">
            {/* Left: dot + line */}
            <div className="flex flex-col items-center shrink-0 w-12">
              <div className="w-10 h-10 rounded-full bg-gb-soft border-2 border-gb-blue flex items-center justify-center shrink-0">
                <span className="font-mono text-[10px] font-bold text-gb-blue leading-tight text-center">
                  {m.year}
                </span>
              </div>
              {i < milestones.length - 1 && (
                <div className="w-[2px] flex-1 min-h-[24px] bg-gradient-to-b from-gb-blue/40 to-gb-line my-1" />
              )}
            </div>

            {/* Right: card */}
            <div className="flex-1 pb-6">
              <VideoCard milestone={m} />
            </div>
          </div>
        ))}
      </div>

      {/* Bridge text */}
      <div className="mt-6 rounded-xl bg-gb-soft border border-gb-line px-5 py-4">
        <p className="text-gb-ink text-sm leading-relaxed">
          <span className="font-semibold text-gb-navy">The thread: </span>
          {bridge}
        </p>
      </div>
    </div>
  );
}
