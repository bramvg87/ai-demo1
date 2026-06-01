export function Footer() {
  return (
    <footer className="border-t border-gb-line py-12 mt-8 bg-gb-surface">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-gb-cyan text-xl leading-none">•</span>
          <span className="font-display text-gb-navy font-semibold text-lg tracking-tight">Genabyte</span>
        </div>
        <p className="text-gb-muted text-sm text-center">
          &copy; {new Date().getFullYear()} Genabyte BV. For training use.
        </p>
        <p className="text-gb-muted text-xs text-center max-w-xs">
          Concept based on the Industrie 4.0 framework, RWTH Aachen University.
        </p>
      </div>
    </footer>
  );
}
