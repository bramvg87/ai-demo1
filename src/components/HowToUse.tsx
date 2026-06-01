interface HowToUseProps {
  steps: string[];
}

export function HowToUse({ steps }: HowToUseProps) {
  return (
    <div className="mt-4">
      <p className="text-xs font-mono uppercase tracking-widest text-gb-cyan mb-2">How to use</p>
      <ol className="space-y-1.5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm text-gb-ink">
            <span className="shrink-0 w-5 h-5 rounded-full bg-gb-soft border border-gb-line flex items-center justify-center text-xs font-mono text-gb-blue font-medium">
              {i + 1}
            </span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
