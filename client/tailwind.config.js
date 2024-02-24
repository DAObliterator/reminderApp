/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Replace "pm", "sd", and "acc" with your chosen color codes
        pm: "#87CEEB", // Primary color (e.g., light blue)
        sd: "#FFFFFF", // Secondary color (e.g., white)
        bg1: "rgba(123, 239, 178)",
        bg2: "rgba(0, 177, 106)",
        bg3: "rgba(4, 147, 114)", // Accent color (e.g., green)
        bg4: "rgba(200, 247, 197)",
      },
    },
  },
  plugins: [],
};
