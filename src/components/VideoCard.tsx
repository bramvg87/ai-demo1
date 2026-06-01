import { useState } from 'react';
import { Play } from 'lucide-react';
import type { Milestone } from '../data/content';

export function VideoCard({ milestone }: { milestone: Milestone }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-card overflow-hidden bg-gb-surface border border-gb-line shadow-card hover:shadow-card-hover transition-shadow">
      {playing ? (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${milestone.youtubeId}?autoplay=1&rel=0`}
            title={milestone.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative w-full aspect-video block group focus:outline-none"
          aria-label={`Play: ${milestone.title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${milestone.youtubeId}/hqdefault.jpg`}
            alt={milestone.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gb-navy/40 group-hover:bg-gb-navy/30 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gb-coral/90 group-hover:bg-gb-coral flex items-center justify-center shadow-lg transition-colors">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        </button>
      )}
      <div className="px-4 py-4">
        <p className="font-display font-semibold text-gb-navy text-sm mb-1">{milestone.title}</p>
        <p className="text-gb-muted text-xs leading-relaxed">{milestone.significance}</p>
      </div>
    </div>
  );
}
