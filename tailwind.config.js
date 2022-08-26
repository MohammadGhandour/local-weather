/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "weather-primary": "#0D1321",
        // "weather-secondary": "#087E8B",
        // "weather-teritiary": "#EFF9F0",
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
        "weather-teritiary": "#EFF9F0",
      }
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}
