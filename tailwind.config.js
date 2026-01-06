module.exports = {
  theme: {
    extend: {
      keyframes: {
        logoZoomIn: {
          "0%": {
            transform: "scale(0.2)",
            opacity: "0",
          },
          "60%": {
            transform: "scale(1.15)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
        animation: {
      logoZoomIn: "logoZoomIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite",
    },
    },
  },
};


  
