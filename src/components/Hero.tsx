import { ArrowRight, Sparkles } from 'lucide-react';
import { hero } from '../data/content';

type HeroData = typeof hero;

export function Hero({ data }: { data: HeroData }) {
  return (
    <div className="relative min-h-[92vh] flex items-center bg-gb-bg dot-grid overflow-hidden pt-14">
      {/* Soft blue glow top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gb-cyan/8 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full bg-gb-blue/6 blur-2xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32">
        <div className="max-w-2xl">
          <p className="hero-anim hero-anim-1 font-mono text-xs sm:text-sm uppercase tracking-widest text-gb-cyan mb-5">
            {data.eyebrow}
          </p>

          <h1 className="hero-anim hero-anim-2 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gb-navy leading-[1.08] tracking-tight mb-6">
            {data.title}
          </h1>

          <p className="hero-anim hero-anim-3 text-gb-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            {data.intro}
          </p>

          <div className="hero-anim hero-anim-4 flex flex-wrap gap-3">
            <a
              href="#hands-on"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-gb-coral text-white font-semibold hover:bg-gb-coral/90 transition-colors shadow-card hover:shadow-card-hover"
            >
              <Sparkles className="w-4 h-4" />
              Start hands-on
            </a>
            <a
              href="#what-is-ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-btn border-2 border-gb-line text-gb-navy font-semibold hover:border-gb-blue hover:text-gb-blue transition-colors"
            >
              What is AI
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
