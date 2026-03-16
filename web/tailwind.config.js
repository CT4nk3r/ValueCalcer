/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        surface: 'var(--color-surface)',
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
