/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        buddyPrimary: "#3AAFA9",
        buddyPrimarySoft: "#6BCBC7",
        buddyBg: "#F3F5F6",
        buddyCard: "#FFFFFF",
        buddyText: "#2F3A40",
        buddySubText: "#6C7A80",
        buddyLine: "#E2E6E8",
        buddyMintLight: "#DFF5F3",
        buddyDanger: "#E05A5A"
      },
      borderRadius: {
        buddyCard: "16px",
        buddyInput: "12px",
        buddyButton: "12px"
      },
      boxShadow: {
        buddyCard: "0 6px 14px rgba(0,0,0,0.05)",
        buddyButton: "0 6px 12px rgba(58,175,169,0.20)"
      },
      maxWidth: {
        buddy: "420px"
      }
    }
  },
  plugins: []
};
