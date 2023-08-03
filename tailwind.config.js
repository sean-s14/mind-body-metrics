const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui-",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#cbd5e1",
              foreground: "#334155",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#334155",
              foreground: "#cbd5e1",
            },
          },
        },
      },
    }),
  ],
};
