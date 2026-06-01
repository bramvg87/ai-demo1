import { useState, type FormEvent } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EmailGateProps {
  onEnter: (email: string) => void;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function EmailGate({ onEnter }: EmailGateProps) {
  const [email, setEmail]   = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      localStorage.setItem('gb-demo1-email', email.trim());
    } catch {
      // ignore quota errors
    }
    setTimeout(() => {
      setLoading(false);
      onEnter(email.trim());
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gb-bg dot-grid overflow-hidden">
      {/* Glow top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gb-cyan/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gb-blue/6 blur-2xl pointer-events-none" aria-hidden="true" />

      <div className="relative w-full max-w-md mx-auto px-6">
        {/* Wordmark */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <span className="text-gb-cyan text-2xl font-bold leading-none">•</span>
          <span className="font-display text-gb-navy font-semibold text-xl tracking-tight">Genabyte</span>
        </div>

        <div className="bg-gb-surface rounded-card border border-gb-line shadow-card-hover p-8">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gb-soft border border-gb-blue/20 flex items-center justify-center mb-6">
            <Sparkles className="w-5 h-5 text-gb-blue" />
          </div>

          <h1 className="font-display text-2xl font-bold text-gb-navy mb-2 leading-tight">
            AI in the office,<br />hands on
          </h1>
          <p className="text-gb-muted text-sm leading-relaxed mb-6">
            Enter your email address to access the training. No password needed.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email-input" className="block text-xs font-mono uppercase tracking-widest text-gb-muted mb-1.5">
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="you@company.com"
              autoFocus
              className="w-full px-4 py-3 rounded-btn border border-gb-line bg-gb-bg text-gb-navy placeholder:text-gb-muted/50 text-sm font-body focus:outline-none focus:border-gb-blue focus:ring-2 focus:ring-gb-blue/20 transition-colors"
              aria-required="true"
              aria-describedby={error ? 'email-error' : undefined}
            />
            {error && (
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-gb-coral">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-btn bg-gb-coral text-white font-semibold text-sm hover:bg-gb-coral/90 disabled:opacity-60 transition-colors"
            >
              {loading ? 'One moment...' : 'Access training'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-4 text-center text-gb-muted/50 text-xs">
            Genabyte BV · internal training use only
          </p>
        </div>
      </div>
    </div>
  );
}
