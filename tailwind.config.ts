import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgBase: 'var(--color-bg-base)',
        bgSurface: 'var(--color-bg-surface)',
        bgElevated: 'var(--color-bg-elevated)',
        borderDefault: 'var(--color-border)',
        borderAccent: 'var(--color-border-accent)',
        navy700: 'var(--color-navy-700)',
        navy600: 'var(--color-navy-600)',
        gold400: 'var(--color-gold-400)',
        gold300: 'var(--color-gold-300)',
        gold200: 'var(--color-gold-200)',
        teal400: 'var(--color-teal-400)',
        amber400: 'var(--color-amber-400)',
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        textMuted: 'var(--color-text-muted)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Arabic"', '"Noto Sans Arabic"', 'sans-serif']
      },
      boxShadow: {
        goldGlow: '0 0 0 1px rgba(212,168,83,0.2), 0 0 24px rgba(212,168,83,0.16)'
      }
    }
  },
  plugins: []
} satisfies Config;