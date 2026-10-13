import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy tokens kept for existing components
        navy: '#0F2444',
        blue: '#2563EB',
        'bg-alt': '#F8FAFC',
        text: '#0D1B2A',
        muted: '#4A6585',
        // On-dark text
        'on-dark': '#F0F7FD',
        // Brand — deep structural blue
        brand: {
          DEFAULT: '#0D3268',
          medium: '#1560B8',
          light: '#3A90E0',
          subtle: '#E4F4F7',
          '900': '#071832',
        },
        // Signal — teal accent (logo gradient high stop; replaces terracotta)
        signal: {
          DEFAULT: '#18B8C7',
          hover: '#12A0AE',
          light: '#DFF0F5',
        },
        // Dark surfaces
        'dark-base': '#091828',
        'dark-raised': '#0F2035',
        'dark-overlay': '#162840',
        // Light surfaces
        ground: '#EDF5F9',
        'surface-light': '#F5FAFE',
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
        card: '0 1px 3px rgba(9,24,40,0.06), 0 4px 16px rgba(9,24,40,0.06)',
        'card-hover': '0 2px 6px rgba(9,24,40,0.08), 0 8px 28px rgba(9,24,40,0.10)',
      },
    },
  },
  plugins: [],
}

export default config
