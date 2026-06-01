import { useState } from 'react';
import { EmailGate } from './components/EmailGate';
import { ProgressBar } from './components/ProgressBar';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { TypesOfAI } from './components/TypesOfAI';
import { Milestone } from './components/Milestone';
import { ReactionChain } from './components/ReactionChain';
import { FotfNote } from './components/FotfNote';
import { ValueMatrix } from './components/ValueMatrix';
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
          <TypesOfAI types={whatIsAI.types} />
          <Milestone milestones={whatIsAI.milestones} bridge={whatIsAI.bridge} />
        </Section>

        {/* 02 How AI creates value */}
        <Section id="value" number="02" title="How AI creates value" className="bg-gb-surface">
          <ReactionChain data={value.mechanism} />
          <FotfNote text={value.fotf} />
          <div className="mt-8">
            <p className="text-gb-muted leading-relaxed mb-8 max-w-2xl">{value.office}</p>
            <ValueMatrix matrix={value.matrix} />
          </div>
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
