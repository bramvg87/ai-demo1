// lineage.ts - edit here to add nodes, edges or milestones.
// Rules: no em-dashes in any desc string; keep desc to one sentence.

export type Family = 'symbolic' | 'learning' | 'perception' | 'generative' | 'language' | 'agentic';
export type MilestoneType = 'research' | 'cultural';
export type Track = 0 | 1 | 2 | 3; // Y-band, 0 = top spine

export interface NodeDef {
  id: string;
  label: string;       // full label shown below node
  shortLabel: string;  // abbreviated label inside node circle
  desc: string;        // hover tooltip: one sentence, jargon-light
  year: number;        // determines x position
  track: Track;        // determines y position
  family: Family;      // color coding
}

export interface EdgeDef {
  from: string;  // node id
  to: string;    // node id
}

export interface MilestoneDef {
  id: string;
  year: number;
  label: string;
  type: MilestoneType;
  desc: string;
  youtubeId?: string;  // if set, clicking opens the video
}

// ── Node paradigms ────────────────────────────────────────────
export const NODES: NodeDef[] = [
  {
    id: 'rulebased',
    label: 'Rule-based systems',
    shortLabel: 'Rule-based',
    desc: 'Hand-written if-then logic. Fast and predictable, but it cannot learn anything from data.',
    year: 1985,
    track: 0,
    family: 'symbolic',
  },
  {
    id: 'ml',
    label: 'Machine learning',
    shortLabel: 'ML',
    desc: 'Finds patterns in data instead of following hand-coded rules. Used in forecasting, spam filters and search ranking.',
    year: 1993,
    track: 0,
    family: 'learning',
  },
  {
    id: 'deeplearning',
    label: 'Deep learning',
    shortLabel: 'Deep learning',
    desc: 'Layered neural networks that spot patterns too subtle to write down. The 2012 ImageNet result put it on the map.',
    year: 2012,
    track: 0,
    family: 'learning',
  },
  {
    id: 'cv',
    label: 'Computer vision',
    shortLabel: 'Vision',
    desc: 'Machines that see. Inspects shape, fill, labels and expiry dates on a production line.',
    year: 2012,
    track: 1,
    family: 'perception',
  },
  {
    id: 'genmods',
    label: 'Generative models',
    shortLabel: 'Gen. models',
    desc: 'Neural nets trained to generate new images, video or audio. Roots of DALL-E, Sora and Stable Diffusion.',
    year: 2014,
    track: 3,
    family: 'generative',
  },
  {
    id: 'rl',
    label: 'Reinforcement learning',
    shortLabel: 'Reinf. learning',
    desc: 'Learns by trial, reward and repetition, the same idea behind AlphaGo and game-playing agents.',
    year: 2015,
    track: 2,
    family: 'agentic',
  },
  {
    id: 'transformers',
    label: 'Transformers',
    shortLabel: 'Transformers',
    desc: 'The 2017 architecture that finally cracked language. The engine inside every major chatbot today.',
    year: 2017,
    track: 0,
    family: 'language',
  },
  {
    id: 'llms',
    label: 'Large language models',
    shortLabel: 'LLMs',
    desc: 'Transformers scaled to billions of parameters. BERT, GPT, Claude - the text brains of AI today.',
    year: 2018,
    track: 0,
    family: 'language',
  },
  {
    id: 'genai',
    label: 'Generative AI',
    shortLabel: 'Generative AI',
    desc: 'LLMs and image generators reaching everyday users: ChatGPT, Copilot, Midjourney.',
    year: 2022,
    track: 2,
    family: 'generative',
  },
  {
    id: 'agents',
    label: 'AI agents',
    shortLabel: 'AI agents',
    desc: 'Does not just answer. It plans, calls tools and takes multi-step actions to finish a task.',
    year: 2023,
    track: 1,
    family: 'agentic',
  },
];

// ── Directed edges (builds-on / evolved-from) ─────────────────
export const EDGES: EdgeDef[] = [
  { from: 'rulebased',     to: 'ml'           },  // shift from rules to learning from data
  { from: 'ml',            to: 'deeplearning' },  // deeper layers, more capacity
  { from: 'deeplearning',  to: 'cv'           },  // AlexNet applied DL to images
  { from: 'deeplearning',  to: 'rl'           },  // deep RL: neural policy + trial and error
  { from: 'deeplearning',  to: 'genmods'      },  // GANs built on neural nets
  { from: 'deeplearning',  to: 'transformers' },  // attention layers on top of DL principles
  { from: 'transformers',  to: 'llms'         },  // scale up transformers + language data
  { from: 'llms',          to: 'genai'        },  // ChatGPT, Copilot built on LLMs
  { from: 'genmods',       to: 'genai'        },  // image/video gen feeds into GenAI products
  { from: 'llms',          to: 'agents'       },  // agents use LLMs as their reasoning core
  { from: 'rl',            to: 'agents'       },  // RL provides the action/reward loop
];

// ── Milestones ─────────────────────────────────────────────────
// type='research'  = paper / architecture (diamond marker, teal)
// type='cultural'  = public / cultural moment (circle marker, coral)
export const MILESTONES: MilestoneDef[] = [
  {
    id: 'deepblue',
    year: 1997,
    label: 'Deep Blue beats Kasparov',
    type: 'cultural',
    desc: 'A computer beats the world chess champion. The peak of symbolic AI, just before the learning era begins.',
  },
  {
    id: 'watson',
    year: 2011,
    label: 'IBM Watson wins Jeopardy',
    type: 'cultural',
    desc: 'Machines handling tricky natural language questions in public, and winning.',
    youtubeId: 'Sp4q60BsHoY',
  },
  {
    id: 'alexnet',
    year: 2012,
    label: 'AlexNet wins ImageNet',
    type: 'research',
    desc: 'A GPU-trained neural net crushes every other method in image recognition. Deep learning\'s public breakthrough.',
  },
  {
    id: 'gans',
    year: 2014,
    label: 'GANs introduced',
    type: 'research',
    desc: 'Generative adversarial networks: two networks compete to produce realistic synthetic data.',
  },
  {
    id: 'atari',
    year: 2015,
    label: 'DeepMind masters Atari',
    type: 'cultural',
    desc: 'Reinforcement learning agents learn 49 Atari games from scratch with no instructions beyond the score.',
    youtubeId: 'Ih8EfvOzBOY',
  },
  {
    id: 'alphago',
    year: 2016,
    label: 'AlphaGo beats Lee Sedol',
    type: 'cultural',
    desc: 'Go, a game thought to need human intuition, falls to deep reinforcement learning.',
    youtubeId: '8tq1C8spV_g',
  },
  {
    id: 'attention',
    year: 2017,
    label: '"Attention Is All You Need"',
    type: 'research',
    desc: 'Google\'s paper introducing the transformer architecture. Every major AI model today is built on this.',
  },
  {
    id: 'bert_gpt1',
    year: 2018,
    label: 'BERT + GPT-1',
    type: 'research',
    desc: 'First large transformer language models. Pretrain once on huge text, fine-tune for any task.',
  },
  {
    id: 'gpt2',
    year: 2019,
    label: 'GPT-2',
    type: 'research',
    desc: 'Writing quality so good OpenAI debated releasing it. Confirmed that scaling transformers keeps improving results.',
  },
  {
    id: 'gpt3',
    year: 2020,
    label: 'GPT-3',
    type: 'research',
    desc: '175 billion parameters. First model most developers could prompt directly without fine-tuning.',
  },
  {
    id: 'chatgpt',
    year: 2022.9,
    label: 'ChatGPT launched',
    type: 'cultural',
    desc: 'One million users in 5 days. A UX moment, not a new architecture: it ran on GPT-3.5 with instruction tuning.',
  },
  {
    id: 'gpt4',
    year: 2023,
    label: 'GPT-4 and Claude',
    type: 'cultural',
    desc: 'Multimodal reasoning models. The start of the current generation of large commercial AI.',
  },
  {
    id: 'agents2024',
    year: 2024,
    label: 'Reasoning models + agents',
    type: 'research',
    desc: 'Models that plan, use tools and execute multi-step tasks. The current frontier in 2024-2025.',
  },
];

// ── Color palette ─────────────────────────────────────────────
export const FAMILY_COLOR: Record<Family, string> = {
  symbolic:   '#64748b',  // slate  - old-school rules
  learning:   '#1466E0',  // blue   - the learning family
  perception: '#7c3aed',  // violet - seeing the world
  generative: '#FF6B4A',  // coral  - creating content
  language:   '#17B8C9',  // teal   - understanding language
  agentic:    '#059669',  // green  - acting in the world
};

export const MILESTONE_COLOR: Record<MilestoneType, string> = {
  research: '#17B8C9',   // teal  - papers / architectures
  cultural: '#FF6B4A',   // coral - public moments
};
