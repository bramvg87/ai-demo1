import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gb-navy':        '#0A2540',
        'gb-blue':        '#1466E0',
        'gb-blue-bright': '#2E8FFF',
        'gb-cyan':        '#17B8C9',
        'gb-coral':       '#FF6B4A',
        'gb-ink':         '#0E2233',
        'gb-muted':       '#5A6B7B',
        'gb-bg':          '#F6F9FD',
        'gb-surface':     '#FFFFFF',
        'gb-soft':        '#EAF2FE',
        'gb-line':        '#E2E9F2',
        'gb-code-bg':     '#0B2138',
        'gb-code-fg':     '#E6EEF8',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body:    ['"Hanken Grotesk"',    'sans-serif'],
        mono:    ['"JetBrains Mono"',    'monospace'],
      },
      borderRadius: {
        card: '20px',
        pill: '999px',
        btn:  '12px',
      },
      boxShadow: {
        card:       '0 2px 12px 0 rgba(10,37,64,0.07)',
        'card-hover': '0 8px 32px 0 rgba(10,37,64,0.13)',
      },
    },
  },
  plugins: [],
} satisfies Config;
