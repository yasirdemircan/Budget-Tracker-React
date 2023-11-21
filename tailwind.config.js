/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#a855f7",
        
"secondary": "#7c3aed",
        
"accent": "#0080ff",
        
"neutral": "#1b1b1b",
        
"base-100": "#2d1d14",
        
"info": "#009fff",
        
"success": "#84cc16",
        
"warning": "#ff6900",
        
"error": "#be2132",
        },
      },
    ],
  },
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

