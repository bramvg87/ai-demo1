# CLAUDE.md - Genabyte AI Demo 1

This single file is everything needed to build, run and deploy the app in one go.

- **Project:** AI Demo 1, the first interactive example on the new Genabyte portal
- **Live URL (target):** https://aidemo1.genabyte.be
- **Repo:** https://github.com/bramvg87/ai-demo1
- **Host:** Vercel
- **What it is:** a self-contained, interactive single-page web app that doubles as a hands-on AI training. It explains what AI is, how it creates value, the state of LLMs, and gives copy-ready prompts and labs for using AI in daily office work. No backend, no database.

> How to use this file: Part A is for you (set up locally and deploy). Part B is the build spec that Claude Code reads to generate the whole app. Save this file as `CLAUDE.md` in the repo root, then tell Claude Code: "Read CLAUDE.md and build the entire app per the spec in Part B and Part C, in one go."

---

# PART A - HUMAN SETUP (do this first)

## A1. Install the tools (once)

1. **Node.js 22 LTS** (required for Vite and for the npm install of Claude Code). Download from nodejs.org, or use nvm. Verify:
   ```
   node --version    # expect v22.x
   ```
2. **Git** (verify with `git --version`).
3. **VS Code** with the **Claude Code** extension (search "Claude Code" in the Extensions panel), or the Claude Code CLI.
   - Native installer (recommended), macOS/Linux: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
   - Or npm (do not use sudo): `npm install -g @anthropic-ai/claude-code`
   - Verify: `claude --version`. First run opens a browser to authenticate (needs a paid Claude plan or an API key).

## A2. Clone the repo and add this file

```
git clone https://github.com/bramvg87/ai-demo1.git
cd ai-demo1
```
Save this document as `CLAUDE.md` in the repo root.

## A3. Build the app with Claude Code

Open the folder in VS Code, open Claude Code, and run one instruction:

> "Read CLAUDE.md. Scaffold the project and build the complete app exactly per Part B and Part C, including all sections, all prompt content, all demo files and the design system. Then run `npm install`."

Claude Code will scaffold Vite + React + TypeScript + Tailwind, create the file structure, write all components and content, and generate the demo files in `public/demo-files/`.

## A4. Run it locally

```
npm install      # if not already done
npm run dev      # opens http://localhost:5173
```
Check every section, every copy button, the videos, and the file downloads.

## A5. Push to GitHub

```
git add -A
git commit -m "Build AI Demo 1"
git push origin main
```

## A6. Deploy to Vercel

1. Go to vercel.com, sign in with GitHub, **Add New Project**, import `bramvg87/ai-demo1`.
2. Vercel auto-detects **Vite**. Confirm: Build Command `npm run build`, Output Directory `dist`. No environment variables needed.
3. Deploy. You get a `*.vercel.app` URL.

## A7. Connect the domain aidemo1.genabyte.be

1. In the Vercel project: **Settings > Domains > Add** `aidemo1.genabyte.be`.
2. Vercel shows the DNS record to add. At your genabyte.be DNS provider, add a **CNAME**:
   - Name/host: `aidemo1`
   - Value/target: `cname.vercel-dns.com`
   (If your DNS does not allow CNAME on subdomains, use the A record Vercel shows instead.)
3. Wait for propagation (minutes to a couple of hours). Vercel issues HTTPS automatically.

Done. From now on, every `git push` to `main` redeploys automatically.

---

# PART B - BUILD SPEC FOR CLAUDE CODE

## B1. Goal and audience

Build a polished, interactive, single-page training site. It is presented live to an operations and supply chain leadership team (engineering, procurement, R&D, supply chain, operational excellence) and afterwards lives on the Genabyte portal as a self-serve reference. It must feel like a Genabyte product: confident, clear, blue, curious, value-oriented. Tone: practical, optimistic, non-technical.

Two purposes in one page:
1. Give context: what AI is (a broad term), how it creates value, and the current state of LLMs, so a non-technical leader can follow and join AI discussions on the floor.
2. Be hands-on: ready-to-copy prompts and small labs for real office productivity, with demo files.

## B2. Hard constraints

- **No confidential information and no company-specific references.** Do not name or imply any specific employer. Use a **generic food manufacturing** context for all examples (lines, plants, S&OP, suppliers, products). Fictional company and product names only.
- **"Factory of the Future" (FOTF)** may be mentioned, but always define it briefly the first time, because not everyone knows the term or uses it the same way.
- **Self-contained. No backend, no database, no runtime API calls.** All content is static. The only external requests are: Google Fonts, YouTube thumbnails/embeds for the milestone videos, and outbound links the user clicks (Epoch AI, the playground).
- Must build and deploy as a **static site on Vercel** (Vite `dist` output).
- Fully **responsive** (works on a projector at 1080p and on a phone).
- **No em-dashes** anywhere in the visible copy. Use commas, colons, parentheses or a single spaced hyphen.
- **Copyright:** the Industry 4.0 value diagram must be an **original recreation** of the concept, not a copy of any source image. Include the credit line: "Concept based on the Industrie 4.0 framework, RWTH Aachen University."
- Accessible: semantic HTML, keyboard-navigable, sufficient contrast, `alt` text, focus states.
- Progress state (which labs are done) may use `localStorage`, with a graceful fallback. Nothing else persists.

## B3. Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS (custom theme, see design system)
- No UI component library required. Build small components. Optional: `recharts` only for the one small line chart in the LLM section, or draw it as inline SVG to stay dependency-free.
- Icons: inline SVG or `lucide-react`.

## B4. Commands

```
npm run dev       # local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## B5. Project structure

```
ai-demo1/
  CLAUDE.md
  index.html
  package.json
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
  tsconfig.json
  public/
    favicon.svg
    demo-files/
      sample-snop-data.csv
      sample-contract-excerpt.md
      sample-meeting-notes.md
      ops-report-template.md
      budget-presentation-outline.md
      project-octopus-logo.svg
  src/
    main.tsx
    App.tsx
    index.css
    data/content.ts            # ALL text, prompts and labs live here as typed data
    lib/useReveal.ts           # IntersectionObserver reveal hook
    lib/useCopy.ts             # copy-to-clipboard hook with "copied" feedback
    lib/useProgress.ts         # optional localStorage progress
    components/
      Nav.tsx
      ProgressBar.tsx          # scroll progress bar
      Hero.tsx
      Section.tsx              # section shell: number, title, intro, anchor id
      TypesOfAI.tsx            # Part 1 concept chips
      Milestone.tsx + VideoCard.tsx
      LLMState.tsx + GapChart.tsx
      ReactionChain.tsx        # the Industry 4.0 value mechanism diagram (original, Aachen-credited)
      ValueMatrix.tsx          # 2x2 efficiency vs effectiveness
      FotfNote.tsx
      Category.tsx             # wraps a category with its value tag and labs
      Lab.tsx                  # one collapsible lab
      PromptBlock.tsx          # code-style prompt, copy button, placeholder highlighting
      HowToUse.tsx             # "how to use" steps
      FileChip.tsx             # demo-file download chip
      ToolBadge.tsx            # Copilot / Claude / ChatGPT badge
      PlaygroundCard.tsx
      Rules.tsx                # learning-experience rules
      Footer.tsx
```

Keep all copy and prompts in `src/data/content.ts` so the page is easy to edit later.

## B6. Design system (Genabyte BV)

Brand idea: blue as the lead colour, representing consultancy, digital transformation, strategy, value, user experience, leading by example, curiosity, learning, transparency and collaboration. The look is light, clean and airy, with confident blue and one warm accent for energy. Avoid generic AI looks: no purple-on-white gradients, no glowing-brain clipart, no Inter/Roboto/Arial.

**Fonts (Google Fonts):**
- Display / headings: **Bricolage Grotesque** (600/700)
- Body / UI: **Hanken Grotesk** (400/500/600)
- Mono / prompts / labels: **JetBrains Mono** (400/500)

**Color tokens** (CSS variables in `index.css`, mapped into `tailwind.config.ts`):
```
--gb-navy:        #0A2540   /* headings, deep brand */
--gb-blue:        #1466E0   /* primary brand blue */
--gb-blue-bright: #2E8FFF   /* links, highlights */
--gb-cyan:        #17B8C9   /* curiosity / secondary accent */
--gb-coral:       #FF6B4A   /* warm CTA / copy-button accent */
--gb-ink:         #0E2233   /* body text */
--gb-muted:       #5A6B7B   /* secondary text */
--gb-bg:          #F6F9FD   /* page background, cool near-white */
--gb-surface:     #FFFFFF   /* cards */
--gb-soft:        #EAF2FE   /* soft blue tint blocks */
--gb-line:        #E2E9F2   /* borders */
--gb-code-bg:     #0B2138   /* dark navy for prompt blocks */
--gb-code-fg:     #E6EEF8   /* prompt text */
```

**Visual language:** rounded corners (cards 20px, pills 999px, buttons 12px); soft low shadows; cards lift on hover; generous whitespace; max width ~1100px; a faint dot grid or soft blue radial glow top-right; large mono section numbers in cyan; "LAB" badges as small cyan/blue pills (inspired by, not copied from, common lab UIs); copy buttons and primary CTAs in coral; prompt blocks on dark navy with mono text and placeholders in coral.

**Motion:** one orchestrated hero load (staggered fade-rise); on-scroll fade-up via IntersectionObserver (once); hover lifts; a thin blue-to-cyan scroll-progress bar at the very top; tasteful and fast (200-600ms); respect `prefers-reduced-motion`.

## B7. Page structure and behaviour

Sticky translucent nav with the Genabyte wordmark and smooth-scroll anchors: Intro, What is AI, Value, LLMs, Hands-on, Playground. A coral "Start hands-on" link jumps to the hands-on section. Scroll-progress bar above the nav. Active section highlights on scroll.

Sections in order:
1. **Hero** (B8.1)
2. **01 What is AI** - concepts + types + milestone videos (B8.2)
3. **02 How AI creates value** - the Industry 4.0 mechanism + the office framing (B8.3)
4. **03 The state of LLMs** - tools, SOTA closed, open models, gap chart (B8.4)
5. **04 Hands-on: AI in the office** - four labelled categories with labs (B8.5)
6. **Playground** - external link card (B8.6)
7. **How to get the most out of this** - learning rules (B8.7)
8. **Footer**

Interactivity required: copy-to-clipboard on every prompt (visible "Copied" state), collapsible labs, tabs where noted, clickable video cards that load an embed on click, the interactive reaction-chain diagram and value 2x2, the gap chart, demo-file downloads, and the scroll/reveal behaviour.

## B8. Section content

All exact copy and prompts are in **Part C**. B8 describes layout and intent; pull the words from Part C.

### B8.1 Hero
Genabyte wordmark (cyan dot + "Genabyte" in Bricolage). Eyebrow (mono, cyan): "Genabyte - AI Demo 1". Big headline and a one-paragraph purpose statement (Part C `hero`). Two buttons: "Start hands-on" (coral, to section 04) and "What is AI" (outline, to section 01).

### B8.2 What is AI (Part 1)
- Short intro (Part C `whatIsAI.intro`).
- **Types of AI**: a row/grid of concept chips, each a one-line plain explanation (Part C `whatIsAI.types`). Light, covered briefly.
- **Milestone moments**: `VideoCard`s (Part C `whatIsAI.milestones`). Each: title, one-line significance, YouTube thumbnail (`https://img.youtube.com/vi/<id>/hqdefault.jpg`), play button that swaps in a `youtube-nocookie.com/embed/<id>` iframe on click (lazy). Three milestones: Watson on Jeopardy, AlphaGo vs Lee Sedol, reinforcement learning playing Atari by trial and error. Show the bridge line under them.

### B8.3 How AI creates value (Part 2)
This section carries the value story. Three blocks:
- **The mechanism** (`ReactionChain`, Part C `value.mechanism`): an original, two-panel diagram of the Industry 4.0 reaction chain. Left panel "Traditional reaction": a value curve that decays from an "Event" across four latency segments (Insight, Analysis, Decision, Action), with stage dots and a note that output is lost while you wait. Right panel "Connected (Industry 4.0) reaction": the same curve but the stages are compressed near the event, the counter-measure takes effect early, and a highlighted bar shows "time saved / value gained". List the enablers A to D beside the right panel. Add the caption and the **credit line to RWTH Aachen**. Make it an original recreation, not a copy of any image. Keep it interactive: hovering a latency segment shows its label and a one-line meaning; a small toggle or animation can morph the traditional curve into the compressed one.
- **FOTF note** (`FotfNote`, Part C `value.fotf`): a short defined explanation of Factory of the Future, and that the AI applied there today is mostly machine learning (vision systems that detect and react), versus today's focus on LLMs for office productivity.
- **The office framing** (`ValueMatrix` + note, Part C `value.office` and `value.matrix`): an honest note that office value is mostly efficiency and effectiveness (faster and better), with tangible euro savings hard to isolate, followed by the interactive 2x2 (efficiency on X, effectiveness on Y, the top-right "both" quadrant is the goal; hovering a quadrant shows an example).

### B8.4 The state of LLMs (Part 3)
- Intro (Part C `llm.intro`).
- **Copilot card** (Part C `llm.copilot`): runs frontier models inside an enterprise environment with commercial data protection, so it can be used with confidential company information within the organisation's IT policy. The reason it is the default for company data.
- **SOTA closed models** (Part C `llm.sota`): OpenAI (GPT-5.5), Anthropic (Claude Opus 4.8), Google (Gemini 3.1 Pro), one line each.
- **Open vs closed** (Part C `llm.gap`): short explanation plus `GapChart` (closed frontier line and open-weight line trailing by a few months, small steady gap). Label "Illustrative, based on Epoch AI tracking" and link the live source: https://epoch.ai/data-insights/open-closed-eci-gap . Key fact: open-weight models trail the frontier by roughly 4 months (about 8 points on Epoch AI's capability index), down from years not long ago.
- **Open models** (Part C `llm.open`): DeepSeek (V4), Alibaba Qwen, Google Gemma, with newer open frontiers (Kimi, GLM) close behind. Message: capable AI is becoming cheap and widely available, fast.

### B8.5 Hands-on: AI in the office (Part 4)
Four categories, each a `Category` block that shows, near its intro, a **value tag** ("what we expect to win", Part C `categories[*].valueTag`) and a small efficiency/effectiveness marker. Then a set of collapsible `Lab`s. Each `Lab` contains as relevant: a short scenario, what you will learn, a `PromptBlock` (copyable, with example fill-ins already inside the brackets), a `HowToUse` step list, an optional `FileChip` plus a "generate your own" prompt, and a tip. `ToolBadge`s show Copilot / Claude / ChatGPT.

Add a short framing line above the categories (Part C `categories_intro`): most of these are efficiency and effectiveness gains (faster and better), and the tangible savings are usually hard to isolate in office work, so we focus on the time and quality you can feel.

Categories (full content in Part C `categories`):
1. **Text** - review and spellcheck; change tone; ideation; sparring partner; summarise and analyse (contract demo file); email in your style; agentic AI (a reusable, generic assistant prompt using the trainee analogy, with the Copilot agent build as an optional level-up).
2. **Images** - prompt-first; reference image or sketch; editable SVG logo for "Project Octopus", then refine in Affinity Designer (with the example SVG demo file).
3. **Analysis** - generate a sample S&OP dataset, download it (or use the demo file), then ask questions about the data.
4. **Full document generation** - generate a reusable report template; generate a presentation outline for a fictive budget round; then build it out in Claude and test it in Office/Outlook.

### B8.6 Playground
A single `PlaygroundCard` linking out to the playground (Part C `playground`). External sandbox for further practice and Copilot-style examples. Open in a new tab. Do not embed or replicate it.

### B8.7 How to get the most out of this
Render the learning rules (`Rules`, Part C `rules`) as a clean numbered list. These rules govern how the labs behave.

## B9. Demo files (provided, place in public/demo-files/)
The demo files are PROVIDED ready-made alongside this document. Place them in `public/demo-files/` exactly as given and do not regenerate them: `sample-snop-data.csv`, `sample-contract-excerpt.md`, `sample-meeting-notes.md`, `ops-report-template.md`, `budget-presentation-outline.md`, `project-octopus-logo.svg`. The only file you need to create is a simple `favicon.svg` for the site. The content of each provided file is also described in Part C `demoFiles` for reference.

## B10. Quality bar
Looks like a designed product, not a generated template. Every interactive element works (copy actually copies, downloads actually download, videos load on click). No console errors. Builds clean with `npm run build`. Reads well on a projector and on mobile.

---

# PART C - CONTENT DATA (the words and prompts)

Put this into `src/data/content.ts`. All copy is final and uses no em-dashes. Render placeholders in `[brackets]` in coral. Note: prompt brackets already contain a usable example, so a prompt runs as-is for a demo, and the example doubles as a hint of what to put.

## hero
- eyebrow: "Genabyte - AI Demo 1"
- title: "AI in the office, hands on"
- intro: "A practical look at what AI is, how it creates value, where it stands today, and how to use it to work faster and better. No code, no hype. Try the prompts as you go: copy, paste, and see what changes."

## whatIsAI

**intro:** "AI is a broad umbrella term, not one thing. It covers everything from simple rules to systems that learn. You do not need the maths. You do need a feel for the main building blocks, so you can follow the conversation and judge where AI fits on the floor."

**types** (chip: one-liner):
- Rule-based systems: "Hand-written if-this-then-that rules. Reliable, but they cannot learn."
- Machine learning: "Finds patterns in data instead of being told the rules. Forecasting, predictive maintenance."
- Deep learning: "Layered machine learning that spots patterns too subtle to write down."
- Computer vision: "Machines that see. Inspecting shape, fill, labels and dates on a line."
- Reinforcement learning: "Learns by trial and reward, by trial and error."
- Transformers: "The 2017 design that finally cracked language. The engine under modern chatbots."
- Generative AI: "Creates text, images and plans on demand. ChatGPT, Copilot, Claude."
- AI agents: "Does not just answer, it acts: takes steps and uses tools to finish a task."

**milestones** (title, significance, youtubeId):
- "IBM Watson wins Jeopardy (2011)" / "A computer beat the best human quiz champions at understanding tricky natural language. The moment machines handling language went mainstream." / "Sp4q60BsHoY"
- "AlphaGo beats Lee Sedol (2016)" / "An AI mastered Go, a game thought to need human intuition, and beat a world champion 4 to 1. It learned partly by playing itself, millions of times." / "8tq1C8spV_g"
- "Learning games by trial and error" / "DeepMind agents learned to play Atari games from scratch, with no instructions, just trial, reward and repetition. The same reinforcement-learning idea behind AlphaGo." / "Ih8EfvOzBOY"

**bridge:** "The thread connecting these: from following rules, to learning from data, to learning by trial and error. Each step needed less hand-holding from us."

## value

**mechanism** (the Industry 4.0 reaction chain):
- heading: "How value gets created: act sooner"
- caption: "The core idea behind Industry 4.0 is simple. When a problem occurs, value leaks away while you wait: time to notice it, time to analyse it, time to decide, and time to act. The longer that chain, the more output you lose. Shorten the chain and you protect value. In a plant that shows up as better quality, higher labour efficiency, better reliability, less waste and less energy use."
- leftPanelTitle: "Traditional reaction"
- leftStages: ["Event: production out of spec", "Insights available: deviation is known", "Analysis completed: deviation understood", "Measure approved: change defined", "Measure takes effect: process adapted"]
- leftLatencies: ["Insight latency", "Analysis latency", "Decision latency", "Action latency"]
- leftEndNote: "Lost output and out-of-spec product while the chain runs."
- rightPanelTitle: "Connected (Industry 4.0) reaction"
- rightNote: "The same steps, compressed close to the event. The counter-measure takes effect early."
- rightHighlight: "time saved / value gained"
- enablers: [
    "A. Real-time capability and systems integration",
    "B. Big data analytics, machine learning and AI",
    "C. Decision support and automated decision making",
    "D. Vertical and horizontal process integration, cyber-physical systems"
  ]
- credit: "Concept based on the Industrie 4.0 framework, RWTH Aachen University."

**fotf:** "Factory of the Future, or FOTF, is shorthand for plants that run on connected, real-time data so they can react faster and decide better. (Not everyone uses the term the same way, so when it comes up, this is what we mean.) The AI applied in these programmes today is mostly machine learning, for example vision systems that spot a defect and trigger a response. That is detect-and-react. Today we look at a different lever: using LLMs to make everyday office work faster and better."

**office:** "On the shopfloor you can often put a number on that value. In the office it is harder. Most of what follows makes you work faster (efficiency) and produce better outcomes (effectiveness). The time saved is real, but hard cash savings are debatable and easy to overclaim. So be honest: aim for faster and better, and treat tangible euro savings as a bonus you prove case by case."

**matrix:**
- xAxis: "Efficiency (cheaper, less time)"
- yAxis: "Effectiveness (better quality)"
- quadrants:
  - bottomLeft: { label: "Low value", example: "Effort with no real gain. Skip it." }
  - bottomRight: { label: "Faster", example: "Same output, less time. Example: drafting a routine email in seconds." }
  - topLeft: { label: "Better", example: "Higher quality, similar effort. Example: a sharper risk review of a contract." }
  - topRight: { label: "Both, the goal", example: "Better and faster together. Example: a better plan in less time." }

## llm

**intro:** "Now zoom in on the tools we actually use. Today's most useful AI for office work is the large language model, or LLM. Here is the landscape and where our tools sit in it."

**copilot:** "The default tool for company work is Microsoft 365 Copilot. It runs leading models inside Microsoft's enterprise environment with commercial data protection, which means it can be used with confidential company information within the organisation's IT policy. That safe boundary is the main reason it is the default for anything touching company data."

**sota** (provider, model, line):
- OpenAI / "GPT-5.5" / "The broad all-rounder with the largest ecosystem."
- Anthropic / "Claude Opus 4.8" / "Strongest at long, careful writing, analysis and reasoning."
- Google / "Gemini 3.1 Pro" / "Huge context window and strong multimodal reasoning, native to Google."

**gap:** "There are two families: closed models you reach through a service (the three above), and open models anyone can download and run. The open ones used to be years behind. Today they trail the frontier by roughly 4 months, about 8 points on Epoch AI's capability index. The gap is small and fairly steady, and the whole field is moving very fast."
- chartNote: "Illustrative, based on Epoch AI tracking."
- chartSourceLabel: "Source: Epoch AI"
- chartSourceUrl: "https://epoch.ai/data-insights/open-closed-eci-gap"

**open:** "Open models worth knowing: DeepSeek (V4) and Alibaba's Qwen from China, and Google's Gemma family. Newer open frontiers like Kimi and GLM are close behind. The takeaway is not which one wins. It is that capable AI is becoming cheap and widely available, fast."

## categories_intro
"In value terms, almost everything here is an efficiency and effectiveness gain: you work faster and the outcome is better. The tangible euro savings are usually hard to isolate in office work, so each category is labelled with the win you can actually feel."

## categories

### Text
- valueTag: "Win: faster drafts and sharper thinking. Mostly time saved, plus better quality on everything you read and write."
- marker: "Efficiency + Effectiveness"
- intro: "Text is where the quickest wins are. Most office work is reading and writing. Here are seven ways to speed it up and sharpen it."

labs:

**Review and spellcheck** (tools: Copilot, Claude)
- scenario: "You have written something and want it clean before it goes out."
- prompt:
```
Proofread the text below. Fix spelling, grammar and punctuation, and improve clarity and flow without changing my meaning or my tone. Return the corrected version first, then a short list of the main changes you made.

Text:
[paste your draft, for example: "Hi team, following up on yesterdays meeting about the line 3 changover. We descided to trial the new setup proceedure next week, can everyone confirm there availability."]
```
- howToUse: ["Open Copilot (or Claude).", "Paste the prompt.", "Keep the example or replace it with your own draft.", "Send."]
- tip: "Ask for British or US English if it matters."

**Change tone of voice** (tools: Copilot, Claude)
- prompt:
```
Rewrite the message below in three versions: (1) formal and executive, (2) warm and collaborative, (3) short and direct. Keep the core message identical in all three.

Message:
[your message, for example: "We need the maintenance report by Thursday or we cannot close the monthly review."]
```
- howToUse: ["Paste into Copilot.", "Keep or swap the message.", "Pick the version that fits the reader."]
- tip: "Name the reader, for example 'for the executive committee' or 'for a supplier', to tune it better."

**Ideation: what am I missing** (tools: Copilot, Claude, ChatGPT)
- scenario: "You have a plan and want a second pair of eyes before you commit."
- prompt:
```
I am preparing [what you are working on, for example: a proposal to reduce changeover time on a snack packaging line]. My current thinking:
[your points, for example: "1) standardise tools at each station, 2) pre-stage materials before the line stops, 3) train a small SMED team"]

Act as a critical, experienced colleague. What am I missing? List blind spots, risks, stakeholders I may have overlooked, and the hard questions leadership will likely ask.
```

**Sparring partner** (tools: Copilot, Claude, ChatGPT)
- prompt:
```
We want to achieve this goal: [goal, for example: cut energy use in our frozen storage by 10 percent this year]. Our current approach:
[approach, for example: "raise the setpoint by one degree, fit strip curtains on the doors, and move loading to off-peak hours"]

Be my sparring partner. Challenge the approach, name the assumptions we are making, propose two alternative approaches, and tell me what would make each one succeed or fail.
```
- tip: "Push back on its answer. The second and third exchange is usually where it gets useful."

**Summarise and analyse** (tools: Copilot, Claude)
- scenario: "You have a long document and need to know what matters."
- prompt:
```
Attached is a supplier contract. Do three things:
1. Summarise it in 8 bullet points.
2. List the clauses most relevant to delivery, quality and liability, with the section number.
3. Flag anything unusual or risky for us.
Give the answer first, then show where each point comes from.

[If you have no file handy, use the sample contract from this lab, or paste the contract text here.]
```
- file: "sample-contract-excerpt.md"
- generatePrompt:
```
Write a realistic but fictional one-page supplier service agreement excerpt between a food manufacturer and an ingredient supplier. Use numbered clauses on delivery windows, quality and rejection, pricing, liability and termination. Make one liability clause slightly unfavourable to the buyer. Output as Markdown.
```
- howToUse: ["In Copilot, attach the file (or a real, approved document).", "Paste the prompt.", "For confidential contracts, use Copilot, not a public tool."]

**Email in your style** (tools: Copilot)
- scenario: "You send similar emails often and want them in your own voice, fast."
- prompt:
```
Write an email to [recipient, for example: the plant manager]. I need to convey three things: (a) [for example: the new label printer is installed and live], (b) [for example: two operators still need a 30 minute training], (c) [for example: I propose we run a short test batch on Friday]. Tone: professional and concise, under 150 words. Write it in my style, based on the example emails below.

My past emails for style:
[paste one or two of your own emails here]
```
- tip: "The more you use Copilot in Outlook, the better it learns your style from your own mailbox. Giving examples speeds that up."

**Agentic AI: a reusable assistant** (tools: Copilot, Claude)
- scenario: "You do the same kind of task often. Instead of re-explaining every time, write the instructions once and reuse them. Think of it like briefing a trainee: give the role, the standing instructions and a few examples, and from then on it just does the job. The prompt below is generic, so it works for any operations notes, in any chat, with no special features needed."
- whatYouLearn: "Turn a repeatable task into a reusable prompt you can paste into any chat. Optionally publish it as a Copilot agent later, if your tenant has that enabled."
- reusablePrompt:
```
You are OpsBrief, an assistant for operations managers in a food manufacturing company. Your one job: turn raw notes, data or transcripts into a clear, structured leadership brief.

Whenever I share material, always produce:
1. Headline: the single most important thing leadership must know, in one sentence.
2. Key points: 3 to 5 bullets, each with the fact and why it matters.
3. Risks and watch-outs.
4. Decisions needed, and who must decide.
5. Suggested next actions, each with an owner.

Be concise and factual. Never invent numbers. If something is unclear or missing, say so. Respond in English, unless I write in Dutch, then respond in Dutch.
```
- howToUse: ["Copy the prompt above and keep it handy (a saved note, or a saved prompt in your tool).", "At the start of a chat in Copilot or Claude, paste it once to set up the assistant for the session.", "Then paste your notes or attach a file, and it returns the brief.", "Reuse it any time by pasting it again. It is generic, so it fits any operations notes."]
- followUp:
```
Here are my raw notes from this week's S&OP meeting. Prepare the leadership brief.
[paste your notes, or attach the sample notes file from this lab]
```
- file: "sample-meeting-notes.md"
- optionalAgent: "Level up (only if Microsoft Copilot Agents and the Describe flow are enabled for your tenant): publish this once so the team can reuse it without pasting. Open Copilot Chat, go to Agents, Create a new agent, switch to Describe, paste the prompt, run it, adjust the name, then Publish. Note: in the test view you cannot upload files; publish first, then open the published agent to attach files. This step is optional. The reusable prompt above works on its own."
- tip: "Reusable means write once, use forever. Save it and share it with the team. It needs no special features to work."

### Images
- valueTag: "Win: usable visuals with less back and forth. Mostly better outcomes and quicker iterations."
- marker: "Effectiveness (+ Efficiency)"
- intro: "Image generators are easy to misuse. Three simple techniques get far better, more usable results."

labs:

**Technique 1: prompt first** (tools: Copilot, ChatGPT)
- prompt:
```
I want to create [what, for example: a clean header image for an internal digital transformation newsletter]. Do not generate anything yet. First write me three detailed image prompts, each in a different style (corporate, abstract, photographic). For each, include subject, style, colours, mood and aspect ratio.
```
- howToUse: ["Run this first.", "Pick the prompt you like.", "Paste that prompt into the image generator to create the image."]
- tip: "Letting the model write the prompt usually beats writing it yourself."

**Technique 2: reference image or sketch** (tools: Copilot, ChatGPT)
- prompt:
```
Here is a rough sketch or reference image of what I want [attach your sketch or photo]. Recreate it as a clean, professional [what, for example: a process diagram for a packaging line]. Keep the layout and key elements, improve the styling, and use these brand colours: [hex codes, for example: #1466E0 and #17B8C9].
```
- tip: "Even a phone photo of a whiteboard drawing works as a reference."

**Technique 3: editable SVG logo, then refine in Affinity** (tools: Copilot, Claude)
- scenario: "Image generators give you a flat picture you cannot edit. Ask for SVG instead and you get a true vector you can open and change. Example here: a logo for 'Project Octopus', a fictive programme that connects multiple systems into one and improves the user experience."
- prompt:
```
Create a simple, modern logo for "Project Octopus" as clean SVG code. Project Octopus is an internal programme that connects multiple systems into one and improves the user experience, so an octopus or a connected-nodes motif works well. Style: minimal, geometric, two colours (deep blue #1466E0 and cyan #17B8C9). Requirements: one valid standalone SVG, a set viewBox, no external fonts (use a common web-safe font or convert text to paths), reasonable dimensions. Output only the SVG code in a code block.
```
- workflow:
  1. "Run the prompt in Copilot or Claude."
  2. "Copy the SVG code into a plain text file and save it as project-octopus.svg."
  3. "Open it in Affinity Designer (File, Open). Every shape, colour and curve is now editable."
  4. "Refine, then export to PNG, PDF or SVG."
- file: "project-octopus-logo.svg"
- tip: "Great for first drafts of logos, icons and simple diagrams that you then polish by hand."

### Analysis
- valueTag: "Win: answers from data without waiting on someone else. Time saved and better-informed decisions."
- marker: "Efficiency + Effectiveness"
- intro: "You do not need a data team to get answers from a spreadsheet. Generate or upload data, then just ask."

labs:

**Generate a sample dataset** (tools: Copilot, Claude, ChatGPT)
- prompt:
```
Generate a realistic but fictional S&OP dataset as CSV that I can download. 24 rows: 4 product families (Frozen Pizza, Ready Meals, Snack Bars, Soups) across 6 months. Columns: Month, ProductFamily, ForecastUnits, ActualSalesUnits, ProductionUnits, ClosingStockUnits, ForecastAccuracyPct. Make the numbers plausible with some forecast error and mild seasonality, and make one family clearly less accurate than the others. Output only the CSV.
```
- howToUse: ["Run it, then download or copy the CSV.", "Or skip this and use the ready demo file below."]
- file: "sample-snop-data.csv"

**Ask questions about the data** (tools: Copilot, Claude, ChatGPT)
- prompt:
```
Attached is our S&OP data. Answer these, giving the answer first and the supporting numbers second:
1. Which product family has the worst forecast accuracy, and in which months?
2. Where did production deviate most from sales? Flag possible overproduction or stockout risk.
3. Give me 3 insights and 2 recommended actions for leadership.

[Attach the sample data file from this lab, or your own approved export.]
```
- howToUse: ["Attach the CSV.", "Paste the prompt.", "In Copilot you can do this directly on a real sheet in Excel."]
- tip: "Ask follow-ups. 'Show that as a table by month' or 'which family looks worst' work well."

### Full document generation
- valueTag: "Win: from blank page to a solid draft in minutes. Mostly time saved on structure and first drafts."
- marker: "Efficiency (+ Effectiveness)"
- intro: "From a blank page to a solid first draft in minutes: templates, outlines and full drafts."

labs:

**Generate a reusable template** (tools: Copilot, Claude)
- prompt:
```
Create a reusable template for a monthly operations report for a food manufacturing plant. Include these sections, each with one line of guidance underneath: Safety, Quality and Waste, OEE and Downtime, Energy, Cost and Productivity, Key Risks, Decisions Needed. Output as clean Markdown I can reuse every month.
```
- file: "ops-report-template.md"

**Generate a presentation outline** (tools: Claude, Copilot)
- scenario: "A fictive 2027 budget round for the Operations business unit of a food manufacturer."
- prompt:
```
Create the outline for a 12-slide presentation for a fictive 2027 budget round for the Operations business unit of a food manufacturer. Audience: business unit leadership at executive committee level. For each slide give a title, 3 to 4 bullet points, and a suggested visual. Cover: context and market, last year's performance, productivity initiatives, capex requests, energy and sustainability, key risks, and the ask. Keep it sharp and executive.
```
- file: "budget-presentation-outline.md"
- howToUse: ["Run the prompt to get the outline.", "In Claude: paste the outline and ask it to draft the speaker content per slide, or build the slides.", "In Office: use Copilot in PowerPoint to turn the outline into slides, and Copilot in Outlook to draft the cover note."]
- tip: "Outline first, then build. It keeps the structure tight and saves rework."

## playground
- title: "Practice in the playground"
- body: "Want more reps? The playground is an external sandbox with guided hands-on labs and Copilot-style examples. It is a complement to this page, in a different style. Open it in a new tab and experiment."
- url: "https://playground.rework.company/"
- note: "Login as shared in the session."

## rules
title: "How to get the most out of this"
items:
1. "Every prompt here is copy-ready and already has an example inside the [brackets]. Run it as is to see what happens, then replace the bracketed parts with your own details."
2. "Each lab tells you which tool to use, where to paste, and what to attach. Follow the how-to note."
3. "For anything confidential or with company data, use Copilot. It runs in a safe environment. Do not paste confidential or personal data into public tools."
4. "When a lab needs a file, you have two options: download the ready demo file, or run the generate-your-own prompt. The demo data is always fictional."
5. "Start simple, then add context: who the AI should be (role), the situation (context), the job (task), the format you want, and the tone. More context, better output."
6. "There is no single correct prompt. Iterate. Ask follow-ups. Compare Copilot, Claude and ChatGPT on the same task to feel the differences."
7. "Use it to be both faster and better. Save the time, and raise the quality."

## demoFiles (these files are PROVIDED ready-made; descriptions are for reference)

**sample-snop-data.csv**: header `Month,ProductFamily,ForecastUnits,ActualSalesUnits,ProductionUnits,ClosingStockUnits,ForecastAccuracyPct`. 24 rows: 6 months (2027-01 to 2027-06) x 4 families (Frozen Pizza, Ready Meals, Snack Bars, Soups). Plausible numbers (tens of thousands of units), realistic forecast error (accuracy roughly 78 to 96 percent), mild seasonality. Make Snack Bars clearly the least accurate family so the analysis lab has a clean answer.

**sample-contract-excerpt.md**: a fictional "Supplier Service Agreement, excerpt" between a fictional food manufacturer ("NovaFoods NV") and a fictional ingredient supplier ("Vallee Ingredients SA"). Numbered clauses: 1. Delivery windows and lead times; 2. Quality, inspection and rejection; 3. Pricing and review; 4. Liability and indemnity (include a capped-liability clause that is slightly unfavourable to the buyer, as the "risky" item to flag); 5. Term and termination. About one page.

**sample-meeting-notes.md**: fictional, neutral, raw and unstructured S&OP / operations meeting notes (a few paragraphs about a week on the lines: a forecast miss on one family, a downtime event, a supplier delay, an energy spike, an open decision on overtime). Used as input for the reusable OpsBrief assistant lab. Strictly fictional and non-sensitive, no real names. (It deliberately mirrors the sample S&OP data, for example the Snack Bars forecast miss, so the two demos line up.)

**ops-report-template.md**: the output of the template-generation prompt above, as a clean reusable Markdown template for a food manufacturing plant.

**budget-presentation-outline.md**: the output of the presentation-outline prompt above, a 12-slide outline for the Operations BU of a food manufacturer, with titles, bullets and suggested visuals.

**project-octopus-logo.svg**: a clean, valid, standalone SVG logo for "Project Octopus". Simple geometric motif suggesting connected systems (an abstract octopus whose tentacles link to small nodes, or a central hub with linked nodes), plus the wordmark "Project Octopus". Use --gb-blue (#1466E0) and --gb-cyan (#17B8C9). Editable shapes, set viewBox, no external font dependency.

---

# PART D - NOTES

- The model names and the open-vs-closed figure are accurate as of early June 2026. They move fast. Before presenting later, sanity-check the headline numbers against the Epoch AI link and update `llm.sota` and `llm.gap` in `content.ts`.
- The Industry 4.0 value diagram is an original recreation of a well-known concept. Keep the credit line to RWTH Aachen. Do not paste in or trace any source image.
- Keep everything generic. No employer names, no confidential data. FOTF may appear but always briefly defined.
- Keep the playground as a link only. Do not embed or replicate it.
- A Dutch version is straightforward later: all copy lives in `content.ts`, so duplicate it into `content.nl.ts` and add a toggle.
- This is the first Genabyte portal example, so the design system here is the seed of the Genabyte look. Keep tokens and fonts in one place so the next demos reuse them.
