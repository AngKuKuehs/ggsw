/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#58A639',      // Leafy green
        secondary: '#F9F9F9',    // Light gray background
        accent: '#FCD34D',       // Soft yellow (used in CTAs, badges)
        dark: '#1A1A1A',         // For text or footer background
        muted: '#E5E7EB',        // Border or card background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
}