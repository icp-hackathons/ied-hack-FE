import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(180deg, rgba(15, 23, 42, 0.16) 0%, rgba(234, 58, 96, 0.16) 100%)",
        "gradient-linear-2":
          "linear-gradient(306deg, #9813B9 0%, #EF1AAC 49.48%, #E7224C 100%)",
      },
      colors: {
        yellow: "#FFE14C",
        green: "#2C6E49",
        grey: {
          1000: "#0A0A0A",
          900: "#121112",
          800: "#1B1819",
          700: "#262424",
          600: "#3C3839",
          500: "#534D4E",
          400: "#797072",
          300: "#B8B2B3",
          200: "#D6D2D3",
          100: "#E3E1E1",
          50: "#EDEBEC",
          1: "#0A0A0A",
          0: "#FFFFFF",
        },
      },
      screens: {
        md: { min: "880px" },
        lg: { min: "1300px" },
      },
    },
  },
  plugins: [],
}
export default config
