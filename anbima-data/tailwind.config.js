/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        'blue-primary': '#0095D9',
        'blue-dark': '#055276',
        'text-strong': '#1F1F1F',
        'text-medium': '#363636',
        'text-soft': '#666666',
        'text-disabled': '#D4D4D4',
        'border-default': '#D4D4D4',
        'bg-page': '#F5F5F5',
        'bg-card': '#FEFEFE',
        'bg-table-head': '#F5F5F5',
        'curve-aaa': '#0095D9',
        'curve-aa': '#80C342',
        'curve-a': '#FCAF17',
        'curve-di': '#484A4D',
        'footer-bg': '#161616',
      },
    },
  },
  plugins: [],
}

