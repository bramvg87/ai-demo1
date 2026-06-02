export interface AIType {
  label: string;
  desc: string;
}

export interface Milestone {
  title: string;
  significance: string;
  youtubeId: string;
  year: string;
}

export interface MatrixQuadrant {
  label: string;
  example: string;
}

export interface LLMModel {
  provider: string;
  model: string;
  line: string;
}

export interface LabImage {
  src: string;
  alt: string;
  caption?: string;
  instruction?: string;
  downloadable?: boolean;
  downloadFilename?: string;
}

export interface Lab {
  id: string;
  title: string;
  tools: string[];
  scenario?: string;
  whatYouLearn?: string;
  prompt?: string;
  reusablePrompt?: string;
  howToUse?: string[];
  tip?: string;
  file?: string;
  generatePrompt?: string;
  workflow?: string[];
  followUp?: string;
  optionalAgent?: string;
  extraPrompts?: { label: string; text: string }[];
  labImages?: LabImage[];
  imageFirst?: boolean;
  files?: { filename: string; label: string }[];
  forwardNote?: string;
  bonusTip?: string;
}

export interface Category {
  id: string;
  label: string;
  valueTag: string;
  marker: string;
  intro: string;
  labs: Lab[];
}

// ---- Hero ----

export const hero = {
  eyebrow: 'Genabyte - AI Demo 1',
  title: 'AI in the office, hands on',
  intro:
    'A practical look at what AI is, how it creates value, where it stands today, and how to use it to work faster and better. No code, no hype. Try the prompts as you go: copy, paste, and see what changes.',
};

// ---- What is AI ----

export const whatIsAI = {
  intro:
    'AI is a broad umbrella term, not one thing. It covers everything from simple rules to systems that learn. You do not need the maths. You do need a feel for the main building blocks, so you can follow the conversation and judge where AI fits on the floor.',
  types: [
    { label: 'Rule-based systems', desc: 'Hand-written if-this-then-that rules. Reliable, but they cannot learn.' },
    { label: 'Machine learning', desc: 'Finds patterns in data instead of being told the rules. Forecasting, predictive maintenance.' },
    { label: 'Deep learning', desc: 'Layered machine learning that spots patterns too subtle to write down.' },
    { label: 'Computer vision', desc: 'Machines that see. Inspecting shape, fill, labels and dates on a line.' },
    { label: 'Reinforcement learning', desc: 'Learns by trial and reward, by trial and error.' },
    { label: 'Transformers', desc: 'The 2017 design that finally cracked language. The engine under modern chatbots.' },
    { label: 'Generative AI', desc: 'Creates text, images and plans on demand. ChatGPT, Copilot, Claude.' },
    { label: 'AI agents', desc: 'Does not just answer, it acts: takes steps and uses tools to finish a task.' },
  ] as AIType[],
  milestones: [
    {
      title: 'IBM Watson wins Jeopardy',
      significance:
        'A computer beat the best human quiz champions at understanding tricky natural language. The moment machines handling language went mainstream.',
      youtubeId: 'Sp4q60BsHoY',
      year: '2011',
    },
    {
      title: 'DeepMind learns Atari by trial and error',
      significance:
        'DeepMind agents learned to play Atari games from scratch, with no instructions, just trial, reward and repetition. The same reinforcement-learning idea behind AlphaGo.',
      youtubeId: 'Ih8EfvOzBOY',
      year: '2015',
    },
    {
      title: 'AlphaGo beats Lee Sedol',
      significance:
        'An AI mastered Go, a game thought to need human intuition, and beat a world champion 4 to 1. It learned partly by playing itself, millions of times.',
      youtubeId: '8tq1C8spV_g',
      year: '2016',
    },
  ] as Milestone[],
  bridge:
    'The thread connecting these: from following rules, to learning from data, to learning by trial and error. Each step needed less hand-holding from us.',
};

// ---- Value ----

export const value = {
  mechanism: {
    heading: 'How value gets created: act sooner',
    caption:
      'The core idea behind Industry 4.0 is simple. When a problem occurs, value leaks away while you wait: time to notice it, time to analyse it, time to decide, and time to act. The longer that chain, the more output you lose. Shorten the chain and you protect value. In a plant that shows up as better quality, higher labour efficiency, better reliability, less waste and less energy use.',
    leftPanelTitle: 'Traditional reaction',
    leftStages: [
      'Event: production out of spec',
      'Insights available: deviation is known',
      'Analysis completed: deviation understood',
      'Measure approved: change defined',
      'Measure takes effect: process adapted',
    ],
    leftLatencies: ['Insight latency', 'Analysis latency', 'Decision latency', 'Action latency'],
    leftLatencyMeanings: [
      'Time until the deviation is detected and visible.',
      'Time to understand the root cause.',
      'Time to agree on and approve the response.',
      'Time until the fix actually reaches the process.',
    ],
    leftEndNote: 'Lost output and out-of-spec product while the chain runs.',
    rightPanelTitle: 'Connected (Industry 4.0) reaction',
    rightNote: 'The same steps, compressed close to the event. The counter-measure takes effect early.',
    rightHighlight: 'time saved / value gained',
    enablers: [
      'A. Real-time capability and systems integration',
      'B. Big data analytics, machine learning and AI',
      'C. Decision support and automated decision making',
      'D. Vertical and horizontal process integration, cyber-physical systems',
    ],
    credit: 'Concept based on the Industrie 4.0 framework, RWTH Aachen University.',
  },
  lead: 'In manufacturing, value comes down to one thing: the time between a problem appearing and the right action being taken. Every minute in that gap is lost output, scrap or energy. Going digital is the effort to shrink that gap, and AI is the sharpest tool we have for doing it.',
  diagramCaption: 'Lost output while the chain runs. Shorten the chain, and you protect the value.',
  shiftA_title: 'Where AI has helped so far',
  shiftA: 'Mostly machine learning. Vision systems that spot a defect, models that flag a deviation early. This speeds up the first step, noticing the problem. Useful, but it is detect-and-react.',
  shiftB_title: 'What changes now',
  shiftB: 'As data becomes structured and available, we can tap into vast amounts of it on demand. The newest lever, LLMs, compresses the slowest and most expensive step of all: working out what to do. It puts the judgement of your most experienced expert within reach of everyone, on any question, in seconds. The whole organisation starts to work at the level of its best people.',
  leversLead: 'For office work the value of an LLM is simple: do a task faster and with less input, or to a higher standard, and at best both at once.',
};

// ---- LLM ----

export const llm = {
  intro:
    'Now zoom in on the tools we actually use. Today\'s most useful AI for office work is the large language model, or LLM. Here is the landscape and where our tools sit in it.',
  copilot:
    'The default tool for company work is Microsoft 365 Copilot. It runs OpenAI models (GPT series) inside Microsoft\'s enterprise environment with commercial data protection, which means it can be used with confidential company information within the organisation\'s IT policy. That safe boundary is the main reason it is the default for anything touching company data.',
  sota: [
    { provider: 'OpenAI',     model: 'GPT-5.5',          line: 'The broad all-rounder with the largest ecosystem.' },
    { provider: 'Anthropic',  model: 'Claude Opus 4.8',  line: 'Strongest at long, careful writing, analysis and reasoning.' },
    { provider: 'Google',     model: 'Gemini 3.1 Pro',   line: 'Huge context window and strong multimodal reasoning, native to Google.' },
  ] as LLMModel[],
  gap:
    'There are two families of LLMs. Both matter, and they play different roles.',
  gapPoints: [
    {
      label: 'Closed models',
      tag: 'Closed',
      text: 'You interact via a service (chat, API) but never see or run the underlying model. The three frontier models above are all closed. They are typically the most capable, and for company use we reach them through Copilot, which keeps the data inside a protected environment.',
    },
    {
      label: 'Open-weight models',
      tag: 'Open',
      text: 'Anyone can download and run the model on their own systems. Many leading open models come from China (DeepSeek, Qwen, Kimi). Google and Mistral, the only significant European player, are also open. They are evolving fast: the gap to the closed frontier is now only about 4 months. Capable AI is becoming cheap and widely available.',
    },
  ] as { label: string; text: string; tag: string }[],
  chartNote: 'Illustrative, based on Epoch AI tracking.',
  chartSourceLabel: 'Source: Epoch AI',
  chartSourceUrl: 'https://epoch.ai/data-insights/open-closed-eci-gap',
  open:
    'Open models worth knowing: DeepSeek (V4) and Alibaba\'s Qwen from China, Google\'s Gemma, and Mistral (France), the only significant European player. Newer open frontiers like Kimi and GLM are close behind. The takeaway is not which one wins. It is that capable AI is becoming cheap and widely available, fast.',
};

// ---- Categories intro ----

export const categoriesIntro =
  'In value terms, almost everything here is an efficiency and effectiveness gain: you work faster and the outcome is better. The tangible euro savings are usually hard to isolate in office work, so each category is labelled with the win you can actually feel.';

// ---- Categories ----

export const categories: Category[] = [
  // ---- TEXT ----
  {
    id: 'text',
    label: 'Text',
    valueTag: 'Win: faster drafts and sharper thinking. Mostly time saved, plus better quality on everything you read and write.',
    marker: 'Efficiency + Effectiveness',
    intro: 'Text is where the quickest wins are. Most office work is reading and writing. Here are eight ways to speed it up and sharpen it.',
    labs: [
      {
        id: 'text-spellcheck',
        title: 'Review and spellcheck',
        tools: ['Copilot', 'Claude'],
        scenario: 'You have written something and want it clean before it goes out.',
        prompt: `Proofread the text below. Fix spelling, grammar and punctuation, and improve clarity and flow without changing my meaning or my tone. Return the corrected version first, then a short list of the main changes you made.

Text:
[paste your draft, for example: "Hi team, following up on yesterdays meeting about the line 3 changover. We descided to trial the new setup proceedure next week, can everyone confirm there availability."]`,
        extraPrompts: [
          {
            label: 'Example 2 - improve readability',
            text: `Proofread and improve the message below for clarity and readability. Fix any typos and grammatical errors, and make it easier to read without changing the meaning.

Text:
[paste your draft, for example: "hej just wanted to check in on the suppplier delivery its now 3 days late and we still havent recieved any confirmation from there side. can you maybe follow up with them and let me know what the status is because we need this for the production plan next week or we might have a problem with the schedule"]`,
          },
        ],
        howToUse: [
          'Open Copilot (or Claude).',
          'Paste the prompt.',
          'Keep the example or replace it with your own draft.',
          'Send.',
        ],
        tip: 'Ask for British or US English if it matters.',
      },
      {
        id: 'text-meeting-email',
        title: 'Email from meeting notes',
        tools: ['Copilot'],
        scenario: 'You have handwritten meeting notes or a rough transcript and need to turn them into a clear follow-up email with a summary and action tracker.',
        imageFirst: true,
        labImages: [
          {
            src: '/meeting-notes.png',
            alt: 'Handwritten meeting notes: Go-Live Readiness Meeting Line 7',
            caption: 'Example: handwritten meeting notes from a go-live readiness meeting.',
            instruction: 'Download this image and upload it to Copilot.',
            downloadable: true,
            downloadFilename: 'meeting-notes.png',
          },
        ],
        prompt: `Analyze the attached image of handwritten meeting notes and draft a professional follow-up email.
Requirements:
- Extract the key decisions, risks, deadlines, and action items.
- Organize them into a clear meeting summary.
- Create an action tracker table with Owner, Action, and Due Date.
- Highlight any open issues requiring escalation.
- Use a concise, business-professional tone.
- End with a clear summary of next steps and responsibilities.
Assume the audience consists of project stakeholders who attended the meeting.`,
        howToUse: [
          'Download the image above using the Download button.',
          'Open Copilot Chat.',
          'Upload the image using the attachment icon in the text bar.',
          'Paste the prompt and send.',
          'Use your own meeting notes photo for real situations, via Copilot only.',
        ],
        tip: 'A photo of a whiteboard or handwritten notes works the same way. Use Copilot for anything containing real project or company information.',
      },
      {
        id: 'text-tone',
        title: 'Change tone of voice',
        tools: ['Copilot', 'Claude'],
        prompt: `Rewrite the message below in three versions: (1) formal and executive, (2) warm and collaborative, (3) short and direct. Keep the core message identical in all three.

Message:
[your message, for example: "We need the maintenance report by Thursday or we cannot close the monthly review."]`,
        howToUse: [
          'Paste into Copilot.',
          'Keep or swap the message.',
          'Pick the version that fits the reader.',
        ],
        tip: 'Name the reader, for example "for the executive committee" or "for a supplier", to tune it better.',
      },
      {
        id: 'text-ideation',
        title: 'Ideation: what am I missing',
        tools: ['Copilot', 'Claude', 'ChatGPT'],
        scenario: 'You have a plan and want a second pair of eyes before you commit.',
        prompt: `I am preparing [what you are working on, for example: a proposal to reduce changeover time on a snack packaging line]. My current thinking:
[your points, for example: "1) standardise tools at each station, 2) pre-stage materials before the line stops, 3) train a small SMED team"]

Act as a critical, experienced colleague. What am I missing? List blind spots, risks, stakeholders I may have overlooked, and the hard questions leadership will likely ask.`,
      },
      {
        id: 'text-sparring',
        title: 'Sparring partner',
        tools: ['Copilot', 'Claude', 'ChatGPT'],
        prompt: `We want to achieve this goal: [goal, for example: cut energy use in our frozen storage by 10 percent this year]. Our current approach:
[approach, for example: "raise the setpoint by one degree, fit strip curtains on the doors, and move loading to off-peak hours"]

Be my sparring partner. Challenge the approach, name the assumptions we are making, propose two alternative approaches, and tell me what would make each one succeed or fail.`,
        tip: 'Push back on its answer. The second and third exchange is usually where it gets useful.',
      },
      {
        id: 'text-summarise',
        title: 'Summarise and analyse',
        tools: ['Copilot', 'Claude'],
        scenario: 'You have a long document and need to know what matters.',
        prompt: `Attached is a supplier contract. Do three things:
1. Summarise it in 8 bullet points.
2. List the clauses most relevant to delivery, quality and liability, with the section number.
3. Flag anything unusual or risky for us.
Give the answer first, then show where each point comes from.

[If you have no file handy, use the sample contract from this lab, or paste the contract text here.]`,
        file: 'sample-contract-excerpt.md',
        generatePrompt: `Write a realistic but fictional one-page supplier service agreement excerpt between a food manufacturer and an ingredient supplier. Use numbered clauses on delivery windows, quality and rejection, pricing, liability and termination. Make one liability clause slightly unfavourable to the buyer. Output as Markdown.`,
        howToUse: [
          'In Copilot, attach the file (or a real, approved document).',
          'Paste the prompt.',
          'For confidential contracts, use Copilot, not a public tool.',
        ],
      },
      {
        id: 'text-email',
        title: 'Email in your style',
        tools: ['Copilot'],
        scenario: 'You send similar emails often and want them in your own voice, fast.',
        prompt: `Write an email to [recipient, for example: the plant manager]. I need to convey three things: (a) [for example: the new label printer is installed and live], (b) [for example: two operators still need a 30 minute training], (c) [for example: I propose we run a short test batch on Friday]. Tone: professional and concise, under 150 words. Write it in my style, based on the example emails below.

My past emails for style:
[paste one or two of your own emails here]`,
        tip: 'The more you use Copilot in Outlook, the better it learns your style from your own mailbox. Giving examples speeds that up.',
      },
      {
        id: 'text-inbox',
        title: 'Inbox: process a long email fast',
        tools: ['Copilot', 'Claude'],
        scenario: 'You receive a long email with multiple questions, stakeholders and requested actions. Instead of reading all of it manually, you use AI to summarise it, pull out what is needed from you and draft a reply.',
        forwardNote: 'With Microsoft Copilot Pro and the move towards Agentic AI, it will become possible to search, analyse and prioritise your entire mailbox automatically. An AI agent will be able to identify the important topics, summarise long threads, detect required actions and proactively surface what needs you. That is a powerful example of Agentic AI. For today we focus on the simpler, immediately usable version: optimising a single email.',
        prompt: `You are my executive assistant.

Analyse the email below and give me:
1. A 3-bullet executive summary
2. The actions specifically requested from me
3. Any deadlines or commitments mentioned, with dates
4. Risks or important points that need my attention
5. A professional reply draft in a collaborative tone

Keep it concise and easy to scan.

Email:
[Paste or upload the email here]`,
        howToUse: [
          'Upload the sample email PDF from this lab, or paste a real email.',
          'Paste the prompt and send.',
          'In Outlook with Copilot: you do not need to copy-paste at all. Click the Copilot icon on an open email, or use the Copilot sidebar, and ask the same questions directly.',
        ],
        file: 'sample_email_plant_manager.pdf',
        bonusTip: 'AI helps you process the content, but you still need a way to manage priority. A simple system that works well: use Pinned emails for the few topics that are strategically important and need to stay visible throughout the day, and Flags for emails that require a response within the next 24 hours. AI processes the information, Outlook manages the priority.',
        tip: 'For anything with confidential content or personal data, use Copilot. Do not paste sensitive emails into public tools.',
      },
      {
        id: 'text-agent',
        title: 'Create a Copilot agent',
        tools: ['Copilot'],
        scenario:
          'You do the same kind of task often. Instead of pasting a long prompt every time, create a dedicated Copilot agent with the instructions baked in. Your team opens the agent directly and uses it without any setup. This is available in Microsoft 365 Copilot via Copilot Studio.',
        whatYouLearn:
          'Build and publish a custom agent in Microsoft 365 Copilot Studio. Once published, anyone in your organisation can open the agent and use it without copying prompts.',
        reusablePrompt: `You are OpsBrief, an assistant for operations managers in a food manufacturing company. Your one job: turn raw notes, data or transcripts into a clear, structured leadership brief.

Whenever I share material, always produce:
1. Headline: the single most important thing leadership must know, in one sentence.
2. Key points: 3 to 5 bullets, each with the fact and why it matters.
3. Risks and watch-outs.
4. Decisions needed, and who must decide.
5. Suggested next actions, each with an owner.

Be concise and factual. Never invent numbers. If something is unclear or missing, say so. Respond in English, unless I write in Dutch, then respond in Dutch.`,
        howToUse: [
          'Open Microsoft 365 Copilot (via office.com, Teams, or the Copilot app).',
          'In the Copilot chat sidebar, click the agent icon or go to "Copilot Studio" from the app launcher.',
          'Click "Create agent" and choose "Configure" (not Describe) for full control.',
          'Give the agent a name (for example: OpsBrief) and paste the system prompt above into the Instructions field.',
          'Optionally: add a knowledge source, for example a SharePoint folder with your standard templates or reference documents.',
          'Click "Publish". The agent is now available to share with your organisation.',
          'To use it: open the published agent, attach your notes or data file, and send. No prompt needed.',
        ],
        followUp: `Here are my raw notes from this week's S&OP meeting. Prepare the leadership brief.
[paste your notes, or attach the sample notes file from this lab]`,
        file: 'sample-meeting-notes.md',
        tip: 'One agent serves the whole team. Build it once, share the link, and anyone can use it without ever seeing the prompt.',
      },
    ],
  },

  // ---- IMAGES ----
  {
    id: 'images',
    label: 'Images',
    valueTag: 'Win: usable visuals with less back and forth. Mostly better outcomes and quicker iterations.',
    marker: 'Effectiveness (+ Efficiency)',
    intro: 'You have already seen what image generation can do. Here are a few practical techniques to get more consistent, useful results rather than just hoping the first attempt works.',
    labs: [
      {
        id: 'images-prompt-first',
        title: 'Technique 1: prompt first',
        tools: ['Copilot', 'ChatGPT'],
        prompt: `I want to create [what, for example: a clean header image for an internal digital transformation newsletter]. Do not generate anything yet. First write me three detailed image prompts, each in a different style (corporate, abstract, photographic). For each, include subject, style, colours, mood and aspect ratio.`,
        howToUse: [
          'Run this first.',
          'Pick the prompt you like.',
          'Paste that prompt into the image generator to create the image.',
        ],
        tip: 'Letting the model write the prompt usually beats writing it yourself.',
        extraPrompts: [
          {
            label: 'Example: ask for a prompt first (step 1)',
            text: `I want to generate a photorealistic image of handwritten meeting notes on a piece of paper, it needs to look like a scan, it needs to be a business meeting about a discussion to go live with a new production line with some action items to be taken.

Do not generate the image yet. First write me a detailed image generation prompt I can use, covering: subject, style, visual details, mood, and any relevant text content to include in the notes.`,
          },
          {
            label: 'Example: the resulting detailed prompt (step 2)',
            text: `Create a photorealistic scanned image of a single sheet of white A4 paper lying flat on a desk. The paper contains handwritten business meeting notes in blue ballpoint pen. The handwriting should look natural and human, slightly messy but readable, as if written during a factory project meeting.

The page title at the top: "Go-Live Readiness Meeting - Line 7"
Date: "May 28, 2026"

The handwritten notes should include:
- Mechanical installation complete (checkmark)
- Electrical punch list: 12 items open
- Safety validation scheduled 03/06
- Operator training (shift A & B)
- Dry run planned Friday
- Production trial Monday
- Quality approval pending

A section called "Risks":
- Spare parts not yet on site
- HMI recipe issue
- Packaging conveyor speed mismatch
- Need final sign-off from maintenance

A section called "Actions":
1. Jan: close electrical issues by Thursday
2. Sarah: confirm operator training attendance
3. Peter: validate safety interlocks
4. IT: OPC connection to MES
5. Quality: release trial batch protocol

Include realistic handwritten features: some words underlined, several checkmarks, a few arrows between topics, one item crossed out and rewritten, small margin notes, a circled "GO LIVE" note near the bottom, a rough timeline sketch in one corner.

The image should look like it was scanned on an office scanner: slight paper shadows, very light scanner artifacts, high-resolution, black-and-white scanner appearance with visible blue pen writing. No digital fonts anywhere, entirely handwritten, corporate manufacturing project context.`,
          },
        ],
        labImages: [
          {
            src: '/meeting-notes.png',
            alt: 'AI-generated example: scanned handwritten meeting notes for Go-Live Readiness Meeting Line 7',
            caption: 'Example output from the prompt above.',
          },
        ],
      },
      {
        id: 'images-reference',
        title: 'Technique 2: reference image or sketch',
        tools: ['Copilot', 'ChatGPT'],
        prompt: `Here is a rough sketch or reference image of what I want [attach your sketch or photo]. Recreate it as a clean, professional [what, for example: a process diagram for a packaging line]. Keep the layout and key elements, improve the styling, and use these brand colours: [hex codes, for example: #1466E0 and #17B8C9].`,
        tip: 'Even a phone photo of a whiteboard drawing works as a reference.',
      },
      {
        id: 'images-svg',
        title: 'Technique 3: generate editable SVG code',
        tools: ['Copilot', 'Claude'],
        scenario:
          'Classic image generation gives you a flat picture you cannot edit. Ask for SVG code instead and you get a true vector: every shape, colour and path is editable. This technique is useful when you want control and consistency, for example for logos, icons and diagrams you will reuse. You can paste the code directly into editsvgcode.com to preview and adjust it without any software.',
        prompt: `Create a simple, modern logo for "Project Octopus" as clean SVG code. Project Octopus is an internal programme that connects multiple systems into one and improves the user experience, so an octopus or a connected-nodes motif works well. Style: minimal, geometric, two colours (deep blue #1466E0 and cyan #17B8C9). Requirements: one valid standalone SVG, a set viewBox, no external fonts (use a common web-safe font or convert text to paths), reasonable dimensions. Output only the SVG code in a code block.`,
        workflow: [
          'Run the prompt.',
          'Copy the SVG code.',
          'Go to editsvgcode.com and paste the code. You see the result instantly and can edit any colour, size or shape.',
          'When happy, click Download to save as SVG, then export to PNG or PDF as needed.',
        ],
        file: 'project-octopus-logo.svg',
        tip: 'Great for first drafts of logos, icons and diagrams. The SVG approach gives you something you can actually change, not just a picture.',
      },
    ],
  },

  // ---- ANALYSIS ----
  {
    id: 'analysis',
    label: 'Analysis',
    valueTag: 'Win: answers from data without waiting on someone else. Time saved and better-informed decisions.',
    marker: 'Efficiency + Effectiveness',
    intro: 'You do not need a data team to get answers from a spreadsheet. Generate or upload data, then just ask.',
    labs: [
      {
        id: 'analysis-generate',
        title: 'Generate a sample dataset',
        tools: ['Copilot', 'Claude', 'ChatGPT'],
        prompt: `Generate a realistic but fictional S&OP dataset as CSV that I can download. 24 rows: 4 product families (Frozen Pizza, Ready Meals, Snack Bars, Soups) across 6 months. Columns: Month, ProductFamily, ForecastUnits, ActualSalesUnits, ProductionUnits, ClosingStockUnits, ForecastAccuracyPct. Make the numbers plausible with some forecast error and mild seasonality, and make one family clearly less accurate than the others. Output only the CSV.`,
        howToUse: [
          'Run it, then download or copy the CSV.',
          'Or skip this and use the ready demo files below (CSV or Excel).',
        ],
        files: [
          { filename: 'sample-snop-data.csv',  label: 'CSV' },
          { filename: 'sample-snop-data.xlsx', label: 'Excel' },
        ],
      },
      {
        id: 'analysis-questions',
        title: 'Ask questions about the data',
        tools: ['Copilot', 'Claude', 'ChatGPT'],
        prompt: `Attached is our S&OP data. Answer these, giving the answer first and the supporting numbers second:
1. Which product family has the worst forecast accuracy, and in which months?
2. Where did production deviate most from sales? Flag possible overproduction or stockout risk.
3. Give me 3 insights and 2 recommended actions for leadership.

[Attach the sample data file from this lab, or your own approved export.]`,
        howToUse: [
          'Attach the CSV or Excel file.',
          'Paste the prompt.',
          'In Copilot you can do this directly on a real sheet in Excel.',
        ],
        extraPrompts: [
          {
            label: 'Visualize the data',
            text: `Using the S&OP data attached, create charts to visualize the following:
1. A bar chart comparing ForecastUnits vs ActualSalesUnits per product family across all months.
2. A line chart showing ForecastAccuracyPct per product family over time.
3. A chart showing ClosingStockUnits trend per product family.

For each chart, add a one-sentence interpretation of what it shows.`,
          },
          {
            label: 'Calculate averages and key statistics',
            text: `Using the S&OP data attached, calculate the following statistics per product family:
1. Average forecast accuracy (%) across all 6 months.
2. Average gap between ForecastUnits and ActualSalesUnits (absolute and as a percentage).
3. Average closing stock level and the month with the highest and lowest stock.
4. Month with the largest production deviation from actual sales.

Present the results as a summary table, then highlight the top 2 findings.`,
          },
        ],
        tip: 'Ask follow-ups. "Show that as a table by month" or "which family looks worst" work well.',
      },
    ],
  },

  // ---- FULL DOCUMENT GENERATION ----
  {
    id: 'documents',
    label: 'Full document generation',
    valueTag: 'Win: from blank page to a solid draft in minutes. Mostly time saved on structure and first drafts.',
    marker: 'Efficiency (+ Effectiveness)',
    intro: 'From a blank page to a polished first draft in three steps: design a template, generate the outline, then build the full presentation.',
    labs: [
      {
        id: 'docs-presentation',
        title: 'Build a presentation from scratch',
        tools: ['Copilot', 'Claude'],
        scenario: 'A fictive 2027 budget round for the Operations business unit of a food manufacturer. Three steps: create a template, generate the outline, then build the full deck.',
        extraPrompts: [
          {
            label: 'Step 1 - create (or describe) your template',
            text: `Design a PowerPoint presentation template for a corporate Operations business unit. Describe the template in detail so I can build it:
- Colour scheme: deep navy (#0A2540) for headers, white backgrounds, blue (#1466E0) accents, and coral (#FF6B4A) for highlights and call-to-action elements.
- Font: a clean sans-serif for headings, body text at 18pt minimum for readability on a projector.
- Slide layouts needed: title slide, agenda, section divider, content slide (title + bullets), two-column slide (text + visual), full-image slide with overlay text, and closing slide.
- Each slide has the company name bottom-left and page number bottom-right.
- Tone: confident, executive, not cluttered.

Output a structured description of each layout I can use to build it in PowerPoint, or generate the first 3 slides as an example.`,
          },
          {
            label: 'Step 2 - generate the outline',
            text: `Create the outline for a 12-slide presentation for a fictive 2027 budget round for the Operations business unit of a food manufacturer. Audience: business unit leadership at executive committee level. For each slide give: slide number, title, 3 to 4 bullet points, and a suggested visual or chart type. Cover: context and market, last year's performance, productivity initiatives, capex requests, energy and sustainability, key risks, and the ask. Keep it sharp and executive.`,
          },
          {
            label: 'Step 3 - build the full presentation',
            text: `Using the outline below, write the full speaker content for each slide. For every slide provide:
- The slide title
- The full bullet text (complete sentences, not fragments)
- 2 to 3 lines of speaker notes explaining the key message to deliver
- A specific suggestion for the visual (chart type, data to show, or image idea)

Keep the language executive: confident, concise, data-grounded. Assume the audience has 20 minutes and no patience for filler.

Outline:
[paste your outline from Step 2 here]`,
          },
        ],
        howToUse: [
          'Step 1: run the template prompt to get a detailed design description, then build or apply it in PowerPoint. Or upload your own existing template.',
          'Step 2: run the outline prompt to get a structured 12-slide plan. Review and adjust before going further.',
          'Step 3: paste the outline into the full-presentation prompt and let it write the complete content.',
          'In Copilot for PowerPoint: paste the outline and say "Create a presentation from this outline using my template." Copilot will generate the slides.',
          'In Copilot in Outlook: use the final deck as input to draft the executive summary email.',
        ],
        tip: 'Template first, outline second, content third. Each step is a checkpoint where you can redirect before investing more time.',
      },
      {
        id: 'docs-onepager',
        title: 'From meeting notes to a one-page presentation',
        tools: ['Claude', 'Copilot'],
        scenario: 'A good one-pager, scope, resources, objective and result on a single slide, takes a lot of thinking before you open PowerPoint. This lab shows how to go from long, messy meeting notes to a clean one-page summary in two steps: first draft the content and slide outline, then build the actual slide using your own template.',
        extraPrompts: [
          {
            label: 'Step 1 - draft the content and slide outline',
            text: `Act as a senior continuous improvement consultant.

I will give you the full notes from a meeting. Read them carefully and produce the content for a one-page executive summary presentation.

Generate:
1. A clear slide title
2. Background / problem statement (2 to 3 lines)
3. Objective and scope
4. Key findings and root causes
5. Improvements made
6. Measurable results, shown as before vs after with the key numbers
7. Next steps with owners

Then propose a one-slide OUTLINE: describe how the content should be arranged on a single slide (which sections, where the key KPIs go, which visual elements to use, and the suggested order). Keep the language executive-level and decision focused.

Meeting notes:
[Paste or upload the notes here]`,
          },
          {
            label: 'Step 2 - build the slide from your template',
            text: `I have uploaded a slide that should serve as the visual template (layout, colours, fonts, logo placement).

Using the content and the outline from the previous step, create a one-page presentation that matches the style and structure of the uploaded template slide.

Keep it concise and executive-level. Use short headlines, clear sections, and put the key before/after KPIs in a prominent position. Stay within a single slide.`,
          },
        ],
        howToUse: [
          'Upload the sample Kaizen notes PDF from this lab, or paste your own meeting notes.',
          'Run Step 1 to get the structured content and slide outline. Review and adjust if needed.',
          'Upload a template slide (your house style: layout, colours, logo). Run Step 2 to generate the one-pager.',
          'The same two-step pattern works for any template: project proposals, business cases, one-pagers.',
        ],
        file: 'sample_kaizen_meeting_notes.pdf',
        tip: 'Claude generally produces stronger results than Copilot for conceptual thinking and structured one-pagers. Worth comparing both and keeping the better output.',
      },
    ],
  },
];

// ---- Playground ----

export const playground = {
  title: 'Practice in the playground',
  body:
    'Want more reps? The playground is an external sandbox with guided hands-on labs and Copilot-style examples. It is a complement to this page, in a different style. Open it in a new tab and experiment.',
  url: 'https://playground.rework.company/',
  note: 'Login as shared in the session.',
};

// ---- Rules ----

export const rules = {
  title: 'How to get the most out of this',
  items: [
    'Every prompt here is copy-ready and already has an example inside the [brackets]. Run it as is to see what happens, then replace the bracketed parts with your own details.',
    'Each lab tells you which tool to use, where to paste, and what to attach. Follow the how-to note.',
    'For anything confidential or with company data, use Copilot. It runs in a safe environment. Do not paste confidential or personal data into public tools.',
    'When a lab needs a file, you have two options: download the ready demo file, or run the generate-your-own prompt. The demo data is always fictional.',
    'Start simple, then add context: who the AI should be (role), the situation (context), the job (task), the format you want, and the tone. More context, better output.',
    'There is no single correct prompt. Iterate. Ask follow-ups. Compare Copilot, Claude and ChatGPT on the same task to feel the differences.',
    'Use it to be both faster and better. Save the time, and raise the quality.',
  ],
};
