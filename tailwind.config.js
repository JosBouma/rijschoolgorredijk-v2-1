/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./slices/**/*.vue",
    // "./plugins/**/*.{js,ts,mjs}",
    // "./composables/**/*.{js,ts,mjs}",
    // "./utils/**/*.{js,ts,mjs}",
    // "./{A,a}pp.{vue}",
    // "./{E,e}rror.{vue}",
    // "./app.config.{js,ts,mjs}",
    // "./app/spa-loading-template.html"
  ],
  theme: {
    extend: {
      colors: {
        'shade-1': '#3392c5',
        'shade-2': '#66AFD1',
        'shade-3': '#99C7DD',
        'shade-4': '#CCEFF0',
      }
    },
  },
  plugins: [],
}

