import { useState } from 'react';
import { EmailGate } from './components/EmailGate';
import { ProgressBar } from './components/ProgressBar';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import AITimeline from './components/AITimeline';
import { HowModelDecides } from './components/HowModelDecides';
import { ReactionChain } from './components/ReactionChain';
import ValueLevers from './components/ValueLevers';
import { LLMState } from './components/LLMState';
import { Category } from './components/Category';
import { Rules } from './components/Rules';
import { Footer } from './components/Footer';
import {
  hero,
  whatIsAI,
  value,
  llm,
  categoriesIntro,
  categories,
  rules,
} from './data/content';

function loadEmail(): string {
  try { return localStorage.getItem('gb-demo1-email') ?? ''; }
  catch { return ''; }
}

export default function App() {
  const [email, setEmail] = useState<string>(loadEmail);

  if (!email) {
    return (
      <EmailGate
        onEnter={(e) => setEmail(e)}
      />
    );
  }

  return (
    <>
      <ProgressBar />
      <Nav />

      <main>
        {/* Hero */}
        <Hero data={hero} />

        {/* 01 What is AI */}
        <Section id="what-is-ai" number="01" title="What is AI" intro={whatIsAI.intro}>
          {/* -mx-6 cancels the section padding so the 1000px-min SVG never triggers a scrollbar on desktop */}
          <div className="-mx-6">
            <AITimeline />
          </div>

          <HowModelDecides />
        </Section>

        {/* 02 How AI creates value */}
        <Section id="value" number="02" title="How AI creates value" intro={value.lead} className="bg-gb-surface">
          <ReactionChain data={value.mechanism} />

          <p className="text-gb-muted text-sm italic mt-1 mb-8">{value.diagramCaption}</p>

          {/* The shift blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl bg-gb-soft border border-gb-line px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-gb-cyan mb-2">{value.shiftA_title}</p>
              <p className="text-gb-ink text-sm leading-relaxed">{value.shiftA}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gb-soft to-gb-surface border border-gb-blue/20 px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-gb-blue mb-2">{value.shiftB_title}</p>
              <p className="text-gb-ink text-sm leading-relaxed">{value.shiftB}</p>
            </div>
          </div>

          <p className="text-gb-muted leading-relaxed mb-6 max-w-2xl">{value.leversLead}</p>
          <ValueLevers />
        </Section>

        {/* 03 The state of LLMs */}
        <Section id="llms" number="03" title="The state of LLMs" intro={llm.intro}>
          <LLMState llm={llm} />
        </Section>

        {/* 04 Hands-on */}
        <Section id="hands-on" number="04" title="Hands-on: AI in the office" className="bg-gb-surface">
          <p className="text-gb-muted leading-relaxed mb-10 max-w-2xl">{categoriesIntro}</p>
          {categories.map((cat) => (
            <Category key={cat.id} data={cat} />
          ))}
        </Section>

        {/* Rules */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <Rules data={rules} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
