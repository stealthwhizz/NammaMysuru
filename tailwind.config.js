/**
 * KIRO INTEGRATION: Tailwind CSS Configuration for NammaMysuru
 * 
 * This configuration was designed with Kiro's assistance:
 * - Kiro helped create the heritage-inspired color palette reflecting Mysuru Palace and Dasara themes
 * - Kiro guided the selection of appropriate fonts (Playfair Display for titles, Inter for body)
 * - The color scheme (maroon/royal blue primary, muted gold secondary, soft teal accent) was refined with Kiro's input
 * - Kiro assisted in creating the warm off-white background color for authentic heritage feel
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Heritage-inspired color palette for Mysuru
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          500: '#8b1538', // Deep maroon
          600: '#7c1d33',
          700: '#6d1a2e',
          800: '#5e1729',
          900: '#4f1424',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#d97706', // Muted gold/mustard
          600: '#c2620a',
          700: '#ab520d',
          800: '#944210',
          900: '#7d3213',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6', // Soft teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        heritage: {
          paper: '#faf8f5', // Warm off-white/beige background
          text: '#2d2d2d',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], // Decorative serif for titles
        'sans': ['Inter', 'sans-serif'], // Clean sans-serif for body
      }
    },
  },
  plugins: [],
}