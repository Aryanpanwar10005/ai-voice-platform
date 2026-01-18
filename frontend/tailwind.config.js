/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

const config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-hover': '#1D4ED8',
        'sidebar-active-bg': '#DBEAFE',
        'sidebar-active-text': '#1E40AF',
        'sidebar-inactive-text': '#64748B',
        'border-slate': '#CBD5E1',
        'bg-light-gray': '#F8FAFC',
        'text-primary': '#1F2937',
        'text-secondary': '#64748B',
        
        // Dark Mode Tokens
        'dark-bg': '#020617',         // Slate 950 - Main App Background
        'dark-surface': '#0F172A',    // Slate 900 - Components (Sidebar, Header, Cards)
        'dark-hover': '#1E293B',      // Slate 800 - Interactive/Hover states
        'dark-border': '#334155',     // Slate 700 - Borders
        'dark-text-secondary': '#94A3B8' // Slate 400 - Secondary text
      },
      fontFamily: {
        display: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true }),
  ],
}

export default config
