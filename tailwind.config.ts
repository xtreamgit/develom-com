import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F2444',
        blue: '#2563EB',
        'bg-alt': '#F8FAFC',
        text: '#111827',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        hero: ['56px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '800' }],
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.35', fontWeight: '700' }],
        h3: ['28px', { lineHeight: '1.35', fontWeight: '600' }],
        h4: ['22px', { lineHeight: '1.35', fontWeight: '600' }],
        lg: ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        label: ['13px', { lineHeight: '1.6', fontWeight: '600', letterSpacing: '0.08em' }],
        micro: ['12px', { lineHeight: '1.6', fontWeight: '500' }],
      },
      maxWidth: {
        content: '1100px',
        text: '680px',
        narrow: '520px',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.1)',
        md: '0 4px 16px rgba(0,0,0,0.12)',
        lg: '0 8px 32px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
