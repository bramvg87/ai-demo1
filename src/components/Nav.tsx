import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#what-is-ai', label: 'What is AI' },
  { href: '#value',      label: 'Value' },
  { href: '#llms',       label: 'LLMs' },
  { href: '#hands-on',   label: 'Hands-on' },
  { href: '#playground', label: 'Playground' },
];

function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  return (
    <nav
      className="fixed top-[3px] left-0 right-0 z-40 bg-gb-bg/80 backdrop-blur-md border-b border-gb-line/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-1.5 shrink-0" aria-label="Genabyte - home">
          <span className="text-gb-cyan text-xl leading-none font-bold">•</span>
          <span className="font-display text-gb-navy font-semibold text-lg tracking-tight">Genabyte</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`px-3 py-1.5 rounded-btn text-sm font-medium transition-colors ${
                  active === l.href.slice(1)
                    ? 'bg-gb-soft text-gb-blue'
                    : 'text-gb-muted hover:text-gb-navy hover:bg-gb-soft/60'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#hands-on"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-btn bg-gb-coral text-white text-sm font-semibold hover:bg-gb-coral/90 transition-colors"
          >
            Start hands-on
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 rounded-btn text-gb-muted hover:text-gb-navy hover:bg-gb-soft transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gb-line bg-gb-bg/95 px-6 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-btn text-sm font-medium transition-colors ${
                active === l.href.slice(1)
                  ? 'bg-gb-soft text-gb-blue'
                  : 'text-gb-muted hover:text-gb-navy hover:bg-gb-soft/60'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#hands-on"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-2 rounded-btn bg-gb-coral text-white text-sm font-semibold text-center hover:bg-gb-coral/90 transition-colors"
          >
            Start hands-on
          </a>
        </div>
      )}
    </nav>
  );
}
