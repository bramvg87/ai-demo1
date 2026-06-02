import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle, Download } from 'lucide-react';
import { ToolBadge } from './ToolBadge';
import { PromptBlock } from './PromptBlock';
import { HowToUse } from './HowToUse';
import { FileChip } from './FileChip';
import { InboxMockup } from './InboxMockup';
import type { Lab as LabType, LabImage } from '../data/content';

function LabImageBlock({ img }: { img: LabImage }) {
  return (
    <div className="rounded-card border border-gb-line overflow-hidden bg-gb-soft/40">
      <img src={img.src} alt={img.alt} className="w-full object-contain max-h-96" />
      {(img.caption || img.instruction || img.downloadable) && (
        <div className="px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1">
            {img.caption && <p className="text-gb-muted text-xs mb-0.5">{img.caption}</p>}
            {img.instruction && <p className="text-gb-ink text-sm font-medium">{img.instruction}</p>}
          </div>
          {img.downloadable && (
            <a
              href={img.src}
              download={img.downloadFilename ?? img.src.split('/').pop()}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-gb-coral text-white text-xs font-semibold hover:bg-gb-coral/90 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
          )}
        </div>
      )}
    </div>
  );
}

interface LabProps {
  lab: LabType;
  isDone: boolean;
  onToggleDone: () => void;
}

export function Lab({ lab, isDone, onToggleDone }: LabProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-card border transition-all duration-200 ${open ? 'border-gb-blue/30 shadow-card-hover' : 'border-gb-line shadow-card hover:border-gb-blue/20'} bg-gb-surface`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="shrink-0 px-2 py-0.5 rounded-pill bg-gb-cyan/10 text-gb-cyan border border-gb-cyan/20 text-xs font-mono font-medium">
          LAB
        </span>
        {lab.audienceQuestion && (
          <span className="shrink-0 px-2 py-0.5 rounded-pill bg-gb-coral/10 text-gb-coral border border-gb-coral/20 text-xs font-mono font-medium">
            Audience question
          </span>
        )}
        <span className="flex-1 font-display font-semibold text-gb-navy text-sm sm:text-base">{lab.title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleDone(); }}
            className="ml-1 text-gb-muted hover:text-gb-blue transition-colors"
            aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
            title={isDone ? 'Unmark' : 'Mark done'}
          >
            {isDone
              ? <CheckCircle className="w-5 h-5 text-gb-blue" />
              : <Circle className="w-5 h-5" />
            }
          </button>
          {open
            ? <ChevronUp className="w-4 h-4 text-gb-muted shrink-0" />
            : <ChevronDown className="w-4 h-4 text-gb-muted shrink-0" />
          }
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="px-5 pb-6 space-y-4 border-t border-gb-line">
          {lab.scenario && (
            <div className="pt-4">
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mb-1">Scenario</p>
              <p className="text-gb-ink text-sm leading-relaxed">{lab.scenario}</p>
            </div>
          )}
          {lab.whatYouLearn && (
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mb-1">What you will learn</p>
              <p className="text-gb-ink text-sm leading-relaxed">{lab.whatYouLearn}</p>
            </div>
          )}
          {lab.forwardNote && (
            <div className="rounded-xl bg-gb-soft border border-gb-blue/20 px-4 py-3">
              <p className="text-xs font-mono uppercase tracking-widest text-gb-blue mb-1.5">What is coming next</p>
              <p className="text-gb-ink text-sm leading-relaxed">{lab.forwardNote}</p>
            </div>
          )}
          {lab.reusablePrompt && (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted">Reusable assistant prompt</p>
              <PromptBlock text={lab.reusablePrompt} label="Reusable prompt - copy and paste at the start of any chat" />
            </>
          )}
          {lab.imageFirst && lab.labImages && lab.labImages.map((img, i) => (
            <LabImageBlock key={i} img={img} />
          ))}
          {lab.prompt && (
            <PromptBlock text={lab.prompt} />
          )}
          {lab.howToUse && lab.howToUse.length > 0 && (
            <HowToUse steps={lab.howToUse} />
          )}
          {lab.followUp && (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mt-2">Follow-up prompt</p>
              <PromptBlock text={lab.followUp} label="Follow-up" />
            </>
          )}
          {lab.generatePrompt && (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mt-2">Generate your own demo file</p>
              <PromptBlock text={lab.generatePrompt} label="Generate demo data" />
            </>
          )}
          {lab.extraPrompts && lab.extraPrompts.map((ep, i) => (
            <div key={i}>
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mt-2">{ep.label}</p>
              <PromptBlock text={ep.text} label={ep.label} />
            </div>
          ))}
          {lab.showInboxMockup && <InboxMockup />}
          {!lab.imageFirst && lab.labImages && lab.labImages.map((img, i) => (
            <LabImageBlock key={i} img={img} />
          ))}
          {lab.workflow && lab.workflow.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mb-2">Workflow</p>
              <ol className="space-y-1.5">
                {lab.workflow.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gb-ink">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gb-soft border border-gb-line flex items-center justify-center text-xs font-mono text-gb-blue font-medium">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {(lab.file || (lab.files && lab.files.length > 0)) && (
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <span className="text-xs font-mono text-gb-muted">Demo file:</span>
              {lab.file && <FileChip filename={lab.file} />}
              {lab.files && lab.files.map((f) => (
                <FileChip key={f.filename} filename={f.filename} label={f.label} />
              ))}
            </div>
          )}
          {lab.optionalAgent && (
            <div className="rounded-xl bg-gb-soft border border-gb-line px-4 py-3">
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mb-1">Level up (optional)</p>
              <p className="text-gb-ink text-xs leading-relaxed">{lab.optionalAgent}</p>
            </div>
          )}
          {lab.bonusTip && (
            <div className="rounded-xl bg-gb-soft border border-gb-line px-4 py-3">
              <p className="text-xs font-mono uppercase tracking-widest text-gb-muted mb-1">Personal productivity tip</p>
              <p className="text-gb-ink text-sm leading-relaxed">{lab.bonusTip}</p>
            </div>
          )}
          {lab.tip && (
            <div className="flex gap-2 items-start rounded-xl bg-[#FFF8F6] border border-gb-coral/20 px-4 py-3">
              <span className="text-gb-coral text-sm shrink-0 mt-0.5">Tip:</span>
              <p className="text-gb-ink text-sm leading-relaxed">{lab.tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
