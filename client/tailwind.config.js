/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "dark-color": "var(--dark-color)",
        "white-color": "var(--white-color)",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://m.al-sharq.com/get/maximage/20171229_1514538423-680920.jpg?t=1514733424')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
