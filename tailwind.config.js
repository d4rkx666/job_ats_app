module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
          'spin-medium': 'spin 2s linear infinite',
          'spin-fast': 'spin 1s linear infinite',
        }
      },
    },
  plugins: [],
}
