import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#124242",
        secondaryColor: "#0FB583",
        silverCity: "#E2E4E9",
        dimGray: "#525866",
        beige: "#EBEBEB",
        headerColor: "#02060E",
        onboardingBorderColor: "#F3F4F7",
        gray100: "#D1D1D1",
        soft200: "#E2E4E9",
        inputRingColor: "#E4E5E7",
        sidemenuActive: "#F2FAEE",
        blue100: "#C2EFFF",
        black900: "#0A0D14",
        rejectred: "#E25353",
        tableHeaderColor: "#F6F8FA",
        darkShadeGray: "#323232",
        green100: "#00A85A",
        lightGreen: "#E1F3D5",
        soft400: "#868C98",
        "custom-rgba": "rgba(242, 250, 238, 1)",
        redLight: "#F8C9D2",
        darkRed: "#710E21",
      },
    },
  },
  plugins: [],
};
export default config;
