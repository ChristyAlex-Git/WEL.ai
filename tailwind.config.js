/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/bg_img1.avif')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins:[
    require('@tailwindcss/forms')
    // ...
  ],
}