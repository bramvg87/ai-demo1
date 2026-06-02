export function InboxMockup() {
  const low = [
    { title: 'RE: Software thread',  note: 'discussion, no clear ask yet' },
    { title: 'Change request flow',  note: 'owned by a colleague, indirectly yours' },
    { title: 'Training / surveys',   note: 'deadlines exist, not operationally critical' },
  ];

  const top3 = [
    { label: 'FW: Budget 2026',           note: 'decision needed, flagged' },
    { label: 'Vendor shutdown notice',    note: 'deadline tomorrow' },
    { label: 'External / project follow-ups', note: '' },
  ];

  return (
    <div className="mt-1">
      <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mb-3">Example output</p>

      {/* Phone frame */}
      <div className="mx-auto w-64 rounded-[2.2rem] bg-gb-navy p-[5px] shadow-xl">
        {/* Screen */}
        <div className="rounded-[1.85rem] overflow-hidden bg-gb-bg flex flex-col">

          {/* App header */}
          <div className="bg-white px-4 py-2.5 flex items-center gap-2 border-b border-gb-line shrink-0">
            <div className="w-5 h-5 rounded-md bg-gb-blue/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                <rect x="1" y="1" width="6" height="6" rx="1.2" fill="#1466E0" />
                <rect x="9" y="1" width="6" height="6" rx="1.2" fill="#17B8C9" />
                <rect x="1" y="9" width="6" height="6" rx="1.2" fill="#17B8C9" />
                <rect x="9" y="9" width="6" height="6" rx="1.2" fill="#1466E0" opacity=".5" />
              </svg>
            </div>
            <span className="font-display font-semibold text-gb-navy text-xs">Copilot</span>
            <span className="ml-auto text-[10px] font-mono text-gb-muted">Outlook</span>
          </div>

          {/* Chat */}
          <div className="px-3 py-3 space-y-3 overflow-y-auto max-h-[420px]">

            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-gb-blue text-white text-[11px] leading-snug rounded-2xl rounded-br-[4px] px-3 py-2 max-w-[82%]">
                What is the most urgent mail to reply to?
              </div>
            </div>

            {/* Assistant response */}
            <div className="space-y-2.5">
              <p className="text-[10px] text-gb-muted font-mono leading-none">Copilot &middot; AI generated</p>

              {/* Low-priority muted rows */}
              <div className="space-y-1.5">
                {low.map((item) => (
                  <div key={item.title} className="flex items-start gap-1.5 opacity-50">
                    <span className="text-[10px] text-gb-muted mt-0.5 shrink-0 leading-none">&#8595;</span>
                    <p className="text-[10px] text-gb-ink leading-snug">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-gb-muted"> - {item.note}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Priority block */}
              <div className="rounded-xl bg-gb-soft border border-gb-cyan/30 border-l-2 border-l-gb-cyan px-3 py-2.5 space-y-2">
                <p className="text-[11px] font-display font-bold text-gb-navy leading-snug">
                  Clear priority recommendation
                </p>
                <p className="text-[10px] text-gb-muted leading-snug">
                  If you want a fast, pragmatic action order:
                </p>
                <ol className="space-y-1.5">
                  {top3.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[11px] font-mono font-bold text-gb-coral shrink-0 leading-snug">
                        {i + 1}
                      </span>
                      <p className="text-[10px] text-gb-ink leading-snug">
                        <span className="font-semibold">{item.label}</span>
                        {item.note && <span className="text-gb-muted"> - {item.note}</span>}
                      </p>
                    </li>
                  ))}
                </ol>
                <p className="text-[10px] text-gb-muted leading-snug italic">
                  If useful, I can draft a ready-to-send reply for the budget email so you can clear it in one minute.
                </p>
              </div>

            </div>
          </div>

          {/* Input bar stub */}
          <div className="bg-white border-t border-gb-line px-3 py-2 flex items-center gap-2 shrink-0">
            <div className="flex-1 rounded-full bg-gb-bg border border-gb-line h-7" />
            <div className="w-6 h-6 rounded-full bg-gb-blue/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                <path d="M2 8h12M8 3l5 5-5 5" stroke="#1466E0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
