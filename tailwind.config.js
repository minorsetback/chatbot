/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      inter: ["Inter"],
    },
    minHeight: {
      "chat-h": "calc(100svh - 121px - 63px - 10px)",
    },
    maxHeight: {
      "messages-h": "calc(100svh - 121px - 63px - 35px - 55px - 10px)",
    },
    borderRadius: {
      reseived: "19px 19px 19px 0px",
      send: "19px 19px 0px 19px",
    },
    boxShadow: {
      "input-shadow":
        "0px 3px 10px 0px rgba(129, 121, 121, 0.5), 0px 2px 8px 0px rgba(201, 187, 187, 0.25)",
    },
    screens: {
      md: "960px",
    },
  },

  plugins: [],
};
