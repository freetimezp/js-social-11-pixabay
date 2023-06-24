/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        320: "320px",
      },
      width: {
        190: "190px",
        278: "275px",
        300: "300px",
        340: "3400px",
        350: "350px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      color: {
        navBar: "#1d1e25",
        primary: "#555",
        textBase: "#8f9091",
        lightHover: "rgba(0,0,0,0.04)",
        lightHover2: "rgba(255,255,255,0.2)",
        textColor: "#656f79",
        overlay: {
          4: "rgba(0,0,0,0.4)",
          5: "rgba(0,0,0,0.5)",
          6: "rgba(0,0,0,0.6)",
        }
      }
    },
  },
  plugins: [],
}

