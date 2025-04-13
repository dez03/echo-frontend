const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          colors: {
            navy: {
              700: '#1a237e',
              800: '#0d1437',
              900: '#070b21',
            },
          },
        },
      },
    },
  },
};
export default config;