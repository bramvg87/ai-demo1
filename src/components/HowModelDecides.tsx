import { useState } from 'react';
import { useReveal } from '../lib/useReveal';

const CAT_IMG = '/images/cat-dog-input.png';
const CAT_ONLY = '/images/cat.png';

// ── image with graceful fallback ────────────────────────────────────────────
function CatImg({ cropLeft, className }: { cropLeft?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gb-soft border border-gb-line rounded-lg font-mono text-xs text-gb-muted ${className ?? ''}`}>
        photo
      </div>
    );
  }
  return (
    <img
      src={CAT_IMG}
      alt={cropLeft ? 'Cat, left half' : 'A cat and a dog side by side'}
      className={`rounded-lg object-cover ${cropLeft ? 'object-left' : 'object-center'} ${className ?? ''}`}
      onError={() => setFailed(true)}
    />
  );
}

// ── neural network SVG ───────────────────────────────────────────────────────
function NeuralNet() {
  const W = 160, H = 104;
  const layers = [
    [18, 52, 86],
    [10, 38, 66, 94],
    [10, 38, 66, 94],
    [34, 70],
  ];
  const xs = [22, 60, 100, 138];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[160px]" aria-label="Neural network diagram with input, two hidden layers and output nodes">
      {layers.slice(0, -1).map((src, li) =>
        src.flatMap((sy, si) =>
          layers[li + 1].map((ty, ti) => (
            <line key={`${li}-${si}-${ti}`} x1={xs[li]} y1={sy} x2={xs[li + 1]} y2={ty}
              stroke="#E2E9F2" strokeWidth="0.9" />
          ))
        )
      )}
      {layers.map((layer, li) =>
        layer.map((y, ni) => {
          const isInput = li === 0;
          const isOutput = li === layers.length - 1;
          return (
            <circle key={`n-${li}-${ni}`} cx={xs[li]} cy={y} r={isInput || isOutput ? 7 : 5.5}
              fill={isOutput ? '#1466E0' : isInput ? '#17B8C9' : '#EAF2FE'}
              stroke={isInput ? '#17B8C9' : '#1466E0'} strokeWidth="1.2" />
          );
        })
      )}
    </svg>
  );
}

// ── probability bars ─────────────────────────────────────────────────────────
function ProbBars() {
  return (
    <div className="w-full space-y-2.5 px-1">
      {[
        { label: 'Cat', pct: 92, accent: true },
        { label: 'Dog', pct: 8,  accent: false },
      ].map(({ label, pct, accent }) => (
        <div key={label}>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className={accent ? 'text-gb-navy font-semibold' : 'text-gb-muted'}>{label}</span>
            <span className={accent ? 'text-gb-coral font-semibold' : 'text-gb-muted'}>{pct}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-gb-line overflow-hidden">
            <div
              className={`h-full rounded-full ${accent ? 'bg-gb-coral' : 'bg-gb-muted/40'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── pipeline step box ────────────────────────────────────────────────────────
function PipeStep({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      <div className="w-full rounded-xl bg-gb-surface border border-gb-line shadow-card p-3 flex items-center justify-center min-h-[88px]">
        {children}
      </div>
      <p className="text-gb-muted text-xs text-center leading-snug">{caption}</p>
    </div>
  );
}

// ── arrow between pipeline steps ────────────────────────────────────────────
function PipeArrow() {
  return (
    <>
      <span className="hidden sm:block text-gb-line text-2xl leading-none self-start mt-7 px-1 select-none">›</span>
      <span className="sm:hidden text-gb-line text-2xl leading-none self-center py-0.5 rotate-90 select-none">›</span>
    </>
  );
}

// ── main component ───────────────────────────────────────────────────────────
export function HowModelDecides() {
  const ref1 = useReveal();
  const ref2 = useReveal(80);
  const ref3 = useReveal(160);
  const ref4 = useReveal(220);

  return (
    <div className="mt-10 space-y-8">

      {/* label + title */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-gb-cyan mb-2">
          How a model actually decides
        </p>
        <h3 className="font-display font-bold text-gb-navy text-xl sm:text-2xl">
          Cat or dog? How a model decides
        </h3>
      </div>

      {/* hero image */}
      <div ref={ref1} className="reveal flex flex-col items-center gap-2">
        <CatImg className="w-full max-w-xs h-32 sm:h-40" />
        <p className="text-gb-muted text-xs">The model has learned to tell these two apart.</p>
      </div>

      {/* Part A: pipeline */}
      <div ref={ref2} className="reveal">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2 sm:gap-0">

          <PipeStep caption="A photo goes in.">
            <img
              src={CAT_ONLY}
              alt="A cat"
              className="h-14 w-16 object-contain rounded-lg flex-shrink-0"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </PipeStep>

          <PipeArrow />

          <PipeStep caption="The network weighs the pixels.">
            <NeuralNet />
          </PipeStep>

          <PipeArrow />

          <PipeStep caption="It scores each option.">
            <ProbBars />
          </PipeStep>

          <PipeArrow />

          <PipeStep caption="The top score is the answer.">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="px-3 py-1.5 rounded-full bg-gb-coral text-white text-xs font-mono font-semibold whitespace-nowrap">
                Highest wins
              </span>
              <span className="text-gb-navy font-display font-bold text-lg">Cat</span>
            </div>
          </PipeStep>

        </div>
      </div>

      {/* Part B: three ways */}
      <div ref={ref3} className="reveal space-y-3">
        <p className="text-gb-ink text-sm">There are three ways to get a model that can do this:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              badge: 'Rule-based AI',
              badgeClass: 'bg-[#EDF1F6] text-[#5A6B7B] border-[#5A6B7B]/30',
              title: 'Write rules manually',
              body: 'Spell out every feature: whiskers, ears, fur. It breaks on the first odd photo, and it is very hard.',
            },
            {
              badge: 'Supervised learning',
              badgeClass: 'bg-[#E3EDFD] text-gb-blue border-gb-blue/30',
              title: 'Label thousands of examples',
              body: 'Tag thousands of photos as cat or dog. The model learns the pattern itself. This is the most common approach.',
            },
            {
              badge: 'Unsupervised learning',
              badgeClass: 'bg-[#E2F6F9] text-[#0E9DB0] border-[#0E9DB0]/30',
              title: 'Let it cluster by itself',
              body: 'Give it images with no labels and it clusters similar ones on its own, learning from much larger datasets.',
            },
          ].map(({ badge, badgeClass, title, body }) => (
            <div key={title} className="rounded-xl bg-gb-surface border border-gb-line px-4 py-4 shadow-card">
              <span className={`inline-block px-2 py-0.5 rounded-full border text-xs font-mono font-medium mb-2 ${badgeClass}`}>
                {badge}
              </span>
              <p className="font-display font-semibold text-gb-navy text-sm mb-1">{title}</p>
              <p className="text-gb-muted text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Part C: LLM bridge */}
      <div ref={ref4} className="reveal rounded-xl bg-gb-navy px-6 py-5 space-y-2">
        <p className="font-display font-bold text-white text-base">An LLM works the same way</p>
        <p className="text-gb-code-fg text-sm leading-relaxed max-w-2xl">
          A large language model works the same way, just much bigger. Instead of cat or dog,
          the input is your question plus its context, and the output is the most likely next
          piece: a word, a line of code, a pixel in an image. That scale is the only real
          difference. It is the &ldquo;large&rdquo; in Large Language Model.
        </p>
      </div>

      {/* Part D: takeaway */}
      <div className="rounded-xl border-l-4 border-gb-coral bg-[#FFF8F6] px-5 py-4">
        <p className="font-mono text-xs uppercase tracking-widest text-gb-coral mb-2">Remember this</p>
        <p className="text-gb-ink text-sm leading-relaxed max-w-2xl">
          An LLM is a predictor, not a fact-checker. It returns the most plausible next output
          from a massive training set, and plausible is not the same as correct. Used well it is
          genuinely powerful. But you stay responsible for the result - so know what it is and
          you will not be fooled.
        </p>
      </div>

    </div>
  );
}
