import { useCopy } from '../lib/useCopy';
import { Check, Copy } from 'lucide-react';

interface PromptBlockProps {
  text: string;
  label?: string;
}

function renderWithPlaceholders(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    /^\[.+\]$/.test(part) ? (
      <span key={i} className="text-gb-coral font-medium">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function PromptBlock({ text, label }: PromptBlockProps) {
  const { copied, copy } = useCopy();

  return (
    <div className="my-4 rounded-card overflow-hidden border border-gb-code-bg/60 shadow-card">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gb-code-bg/80 border-b border-white/5">
        <span className="font-mono text-xs uppercase tracking-widest text-gb-cyan/70">
          {label ?? 'Prompt'}
        </span>
        <button
          onClick={() => copy(text)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-btn bg-gb-coral/90 hover:bg-gb-coral text-white text-xs font-mono font-medium transition-colors"
          aria-label={copied ? 'Copied' : 'Copy prompt'}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-gb-code-bg px-5 py-4 text-gb-code-fg font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
        {renderWithPlaceholders(text)}
      </pre>
    </div>
  );
}
