/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nuetral: {
         
          DEFAULT: '#171212',
        },
        primary: {
          DEFAULT: '#18A048',
        },
        tertiary: {
          DEFAULT: '#5CDB95', 
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["forest"],
  },

}

