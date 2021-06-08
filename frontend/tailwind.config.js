const daisyui = require("daisyui")

module.exports = {
  mode: 'jit',
  purge: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      'pastel', // first one will be the default theme
    ],
  },
};
